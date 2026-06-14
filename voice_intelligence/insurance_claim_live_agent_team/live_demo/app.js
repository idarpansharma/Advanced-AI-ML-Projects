const transcriptEl = document.querySelector("#transcript");
const claimFieldsEl = document.querySelector("#claimFields");
const timelineEl = document.querySelector("#timeline");
const handoffEl = document.querySelector("#handoff");
const packetMarkdownEl = document.querySelector("#packetMarkdown");
const packetDialog = document.querySelector("#packetDialog");
const packetProgress = document.querySelector("#packetProgress");
const callStatus = document.querySelector("#callStatus");
const micButton = document.querySelector("#micButton");
const newIntakeButton = document.querySelector("#newIntakeButton");
const resetButton = document.querySelector("#resetButton");
const textForm = document.querySelector("#textForm");
const textInput = document.querySelector("#textInput");
const modelLabel = document.querySelector("#modelLabel");

const DEFAULT_API_ORIGIN = "http://127.0.0.1:4177";
const API_ORIGIN = window.location.protocol === "file:" ? DEFAULT_API_ORIGIN : window.location.origin;
const WS_ORIGIN = API_ORIGIN.replace(/^http/, "ws");

if (window.location.protocol === "file:") {
  window.location.replace(`${API_ORIGIN}/index.html`);
}

let liveSocket = null;
let audioContext = null;
let inputProcessor = null;
let inputSource = null;
let audioStream = null;
let isRecording = false;
let nextPlaybackTime = 0;
let sessionId = null;
let state = null;
let closeAfterAgentTurn = false;

const initialFields = [
  { title: "Identity", fields: [["claimant", "Claimant name"], ["policy", "Policy number"], ["contact", "Contact method"]] },
  { title: "Loss", fields: [["type", "Claim type"], ["date", "Date of loss"], ["time", "Reported date"], ["location", "Location"], ["description", "Loss description"]] },
  { title: "Safety", fields: [["injuries", "Injuries"], ["hazards", "Hazards present"], ["medical", "Medical attention"]] },
  { title: "Evidence", fields: [["police", "Report number"], ["photos", "Evidence available"], ["tow", "Tow info"], ["otherDriver", "Other driver info"]] },
];

const emptyState = {
  route: "needs_docs",
  progress: 0,
  fields: Object.fromEntries(
    initialFields.flatMap((group) =>
      group.fields.map(([id, label]) => [
        id,
        { label, value: `Missing: ${label.toLowerCase()}`, status: "missing", source: "-" },
      ])
    )
  ),
  transcript: [{ speaker: "Agent", text: `Connecting to the live intake backend at ${API_ORIGIN}...` }],
  events: [{ tone: "warning", title: "Connecting", detail: `Waiting for ${API_ORIGIN}/api/sessions.`, rule: "API-000" }],
  handoff: {
    Summary: "Backend session not started yet.",
    Priority: "Pending",
    "Required actions": "Start a live intake session.",
    Attachments: "None",
    "Next best action": "Connect to the backend API.",
  },
  packet_markdown: "# Initial Adjuster Handoff\n\nWaiting for backend session.",
};

const routeLabels = {
  emergency_escalation: "Emergency escalation",
  needs_docs: "Needs documents",
  special_investigation: "Special investigation",
  ready_for_adjuster: "Ready for adjuster",
};

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function now() {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });
}

function setState(nextState) {
  state = nextState || emptyState;
  if (state.model) {
    modelLabel.innerHTML = `<span class="dot ok"></span> ${escapeHtml(state.model)}`;
  }
  render();
}

function render() {
  renderTranscript();
  renderFields();
  renderTimeline();
  renderHandoff();
  renderPacket();
}

function renderTranscript() {
  transcriptEl.innerHTML = state.transcript
    .map((turn) => {
      const initials = turn.speaker === "Agent" ? "AI" : "CL";
      return `
        <article class="turn ${turn.speaker === "Agent" ? "agent" : "claimant"}">
          <div class="speaker-icon">${initials}</div>
          <div class="bubble">
            <strong>${escapeHtml(turn.speaker)}</strong><time>${escapeHtml(turn.time || now())}</time>
            <p>${escapeHtml(turn.text)}</p>
          </div>
        </article>
      `;
    })
    .join("");
  transcriptEl.scrollTop = transcriptEl.scrollHeight;
}

function renderFields() {
  claimFieldsEl.innerHTML = initialFields
    .map((group) => {
      const rows = group.fields
        .map(([id, label]) => {
          const field = state.fields[id] || { label, value: `Missing: ${label.toLowerCase()}`, status: "missing", source: "-" };
          return `
            <div class="field-row">
              <div class="field-label">${escapeHtml(field.label)}</div>
              <div class="field-value ${escapeHtml(field.status)}">${escapeHtml(field.value)}</div>
              <div class="field-source">${escapeHtml(field.source)}</div>
            </div>
          `;
        })
        .join("");
      return `
        <section class="field-group">
          <div class="group-title"><h3>${escapeHtml(group.title)}</h3><span class="status-line">Live</span></div>
          ${rows}
        </section>
      `;
    })
    .join("");
}

function renderTimeline() {
  const guidance = buildOperatorGuidance();
  timelineEl.innerHTML = `
    <section class="decision-card ${escapeHtml(guidance.routeTone)}">
      <div class="decision-label">Current disposition</div>
      <strong>${escapeHtml(guidance.routeLabel)}</strong>
      <p>${escapeHtml(guidance.priority)}</p>
    </section>

    <section class="operator-card ask-card">
      <div class="operator-card-label">Ask or confirm next</div>
      <p>${escapeHtml(guidance.nextAction)}</p>
    </section>

    <section class="operator-card">
      <div class="operator-card-label">Blocking items</div>
      <div class="missing-chips">
        ${guidance.missingItems.map((item) => `<span>${escapeHtml(item)}</span>`).join("")}
      </div>
    </section>

    <section class="operator-card">
      <div class="operator-card-label">Handoff readiness</div>
      <div class="readiness-meter" aria-label="Packet completion ${escapeHtml(String(state.progress || 0))}%">
        <div style="width: ${Math.max(0, Math.min(100, Number(state.progress || 0)))}%"></div>
      </div>
      <p class="readiness-copy">${escapeHtml(guidance.readinessCopy)}</p>
    </section>

    <details class="audit-details">
      <summary>Audit trail</summary>
      <div class="audit-list">
        ${guidance.auditEvents
          .map(
            (event) => `
              <article class="event ${escapeHtml(event.tone || "")}">
                <div class="event-time">${escapeHtml(event.time || now())}</div>
                <div class="event-body">
                  <div class="event-title">${escapeHtml(event.title)}</div>
                  <div class="event-detail">${escapeHtml(event.detail)}</div>
                </div>
                <div class="rule-id">${escapeHtml(event.rule || "")}</div>
              </article>
            `
          )
          .join("")}
      </div>
    </details>
  `;
  timelineEl.scrollTop = timelineEl.scrollHeight;
}

function buildOperatorGuidance() {
  const route = state.route || "needs_docs";
  const handoff = state.handoff || {};
  const missingEvent = [...(state.events || [])].reverse().find((event) => event.rule === "INTAKE-001" && event.title === "Missing intake facts");
  const missingItems = missingEvent?.detail
    ? missingEvent.detail.split(",").map((item) => item.trim()).filter(Boolean)
    : Object.values(state.fields || {})
        .filter((field) => field.status === "missing")
        .map((field) => field.label)
        .slice(0, 6);
  const requiredActions = splitList(handoff["Required actions"]);
  const routeTone = route === "emergency_escalation" ? "danger" : route === "ready_for_adjuster" ? "success" : "warning";
  const readinessCopy =
    route === "ready_for_adjuster"
      ? "Core intake is ready for assignment."
      : requiredActions.length
        ? `Collect or confirm: ${requiredActions.slice(0, 2).join(", ")}.`
        : "Continue collecting the highlighted intake facts.";
  return {
    routeLabel: routeLabels[route] || route,
    routeTone,
    priority: handoff.Priority || "Waiting for claim facts.",
    nextAction: handoff["Next best action"] || "Ask for the next missing intake fact.",
    missingItems: missingItems.length ? missingItems : ["No blocking intake items"],
    readinessCopy,
    auditEvents: state.events || [],
  };
}

function splitList(value) {
  return String(value || "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function renderHandoff() {
  handoffEl.innerHTML = Object.entries(state.handoff)
    .map(([label, value]) => `<div class="handoff-row"><dt>${escapeHtml(label)}</dt><dd>${escapeHtml(value)}</dd></div>`)
    .join("");
  packetProgress.textContent = `${state.progress}%`;
}

function renderPacket() {
  packetMarkdownEl.textContent = state.packet_markdown || "# Initial Adjuster Handoff\n\nNo packet generated yet.";
}

function appendLocalError(message) {
  setState({
    ...state,
    transcript: [...state.transcript, { speaker: "Agent", text: message, time: now() }],
    events: [...state.events, { tone: "danger", title: "Backend API error", detail: message, rule: "API-ERR", time: now() }],
  });
}

function sameTranscriptTurn(left, right) {
  const leftText = String(left?.text || "").trim();
  const rightText = String(right?.text || "").trim();
  if (!leftText || !rightText || left?.speaker !== right?.speaker) return false;
  return leftText === rightText || leftText.includes(rightText) || rightText.includes(leftText);
}

function mergeLiveTranscript(authoritative, local) {
  const merged = [...(authoritative || [])];
  for (const turn of local || []) {
    if (!turn.streaming || !String(turn.text || "").trim()) continue;
    if (merged.some((item) => sameTranscriptTurn(item, turn))) continue;
    merged.push(turn);
  }
  return merged;
}

function applyServerState(nextState) {
  setState({
    ...nextState,
    transcript: mergeLiveTranscript(nextState.transcript, state?.transcript),
  });
}

function upsertStreamingTurn(speaker, text, final = false) {
  if (!String(text || "").trim()) return;
  const transcript = [...state.transcript];
  const last = transcript[transcript.length - 1];
  if (last && last.speaker === speaker && last.streaming) {
    transcript[transcript.length - 1] = { speaker, text, time: last.time, streaming: !final };
  } else if (final && last && !last.streaming && sameTranscriptTurn(last, { speaker, text })) {
    return;
  } else {
    transcript.push({ speaker, text, time: now(), streaming: !final });
  }
  setState({ ...state, transcript });
}

function claimantAskedToClose(text) {
  return /\b(that'?s all|nothing else|no,?\s*that'?s it|that is it|i'?m done|goodbye|bye)\b/i.test(text);
}

function agentClosedConversation(text) {
  return /\b(have a good|adjuster will|will be in touch|claim packet|initial intake|next steps)\b/i.test(text);
}

function applyRealtimeHints(text) {
  const lower = text.toLowerCase();
  const nextFields = { ...state.fields };
  const nextEvents = [...state.events];
  let nextRoute = state.route;
  let changed = false;

  const update = (id, value, status = "pending", source = "live audio") => {
    const current = nextFields[id];
    if (!current || current.value === value) return;
    nextFields[id] = { ...current, value, status, source };
    changed = true;
  };

  const event = (rule, title, detail, tone = "warning") => {
    const key = `${rule}:${title}`;
    if (nextEvents.some((item) => `${item.rule}:${item.title}` === key)) return;
    nextEvents.push({ rule, title, detail, tone, time: now() });
    changed = true;
  };

  const phone = text.match(/\b(?:\+?1[-.\s]?)?\(?\d{3}\)?[-.\s]\d{3}[-.\s]\d{4}\b/);
  if (phone) {
    update("contact", phone[0], "pending", "live transcript");
    event("LIVE-INFO", "Contact detected", "Phone number heard in live audio.", "success");
  }

  const policy = text.match(/\b(?:policy|auto|home|claim)\s*(?:number|#|is|:)?\s*([A-Z0-9][A-Z0-9-]{3,})\b/i);
  if (policy && /\d/.test(policy[1])) {
    update("policy", policy[1].toUpperCase(), "pending", "live transcript");
    event("LIVE-INFO", "Policy candidate detected", "Policy-like identifier heard in live audio.", "success");
  }

  const name = text.match(/\b(?:my name is|this is)\s+([a-z]+(?:\s+[a-z]+){0,1})(?=\s+(?:and|with|from|calling|phone|policy|$))/i)
    || text.match(/\b(?:i am|i'm)\s+([a-z]+(?:\s+[a-z]+){0,1})(?=\s+(?:and|with|from|calling|phone|policy|$))/i);
  if (name) {
    update("claimant", toTitleCase(name[1]), "pending", "live transcript");
    event("LIVE-INFO", "Claimant name detected", "Name candidate heard in live audio.", "success");
  }

  if (/\b(hit|rear ended|rear-ended|crash|accident|collision|side[- ]?swiped)\b/.test(lower)) {
    update("type", "auto collision", "pending", "live transcript");
    update("description", compactText(text), "pending", "live transcript");
    event("LIVE-CLASSIFY", "Auto collision signal", "Crash language detected before final extraction.", "warning");
  } else if (/\b(flood|water|leak|pipe|basement|sump)\b/.test(lower)) {
    update("type", "home water damage", "pending", "live transcript");
    update("description", compactText(text), "pending", "live transcript");
    event("LIVE-CLASSIFY", "Home water signal", "Water damage language detected before final extraction.", "warning");
  } else if (/\b(stolen|theft|robbed|missing laptop|taken)\b/.test(lower)) {
    update("type", "theft property loss", "pending", "live transcript");
    update("description", compactText(text), "pending", "live transcript");
    event("LIVE-CLASSIFY", "Theft signal", "Theft language detected before final extraction.", "warning");
  }

  const safetyText = stripNegatedSafety(lower);
  if (/\b(neck pain|injur|hurt|ambulance|hospital|urgent care|bleeding|pain)\b/.test(safetyText)) {
    update("injuries", compactText(text), "urgent", "live transcript");
    event("SAFE-002", "Injury signal detected", "Live audio mentions injury or medical concern.", "danger");
    nextRoute = "emergency_escalation";
    changed = true;
  } else if (safetyText !== lower) {
    update("injuries", "No injuries reported", "pending", "live transcript");
    event("SAFE-OK", "No injury reported", "Live audio negated injury or medical concern.", "success");
  }

  if (/\b(police|officer|report|case number|incident number)\b/.test(lower)) {
    update("police", compactText(text), "pending", "live transcript");
    event("DOC-001", "Police/report signal detected", "Police or report language heard in live audio.", "warning");
  }

  if (/\b(photo|photos|picture|video|receipt|estimate|tow|towed|storage)\b/.test(lower)) {
    update("photos", compactText(text), "pending", "live transcript");
    if (/\b(tow|towed|storage)\b/.test(lower)) {
      update("tow", compactText(text), "pending", "live transcript");
    }
    event("DOC-001", "Evidence signal detected", "Document or evidence language heard in live audio.", "warning");
  }

  const location = text.match(/\b(?:on|at|near)\s+([A-Z0-9][A-Za-z0-9 .'-]*(?:street|st|road|rd|avenue|ave|highway|hwy|i-\d+|mile marker \d+|intersection|exit \d+))/i);
  if (location) {
    update("location", location[1].trim(), "pending", "live transcript");
    event("LIVE-INFO", "Location candidate detected", "Location heard in live audio.", "success");
  }

  if (/\b(today|yesterday|last night|this morning|minutes ago|\d{1,2}:\d{2})\b/.test(lower)) {
    update("date", compactText(text), "pending", "live transcript");
    event("LIVE-INFO", "Loss timing detected", "Date or time language heard in live audio.", "success");
  }

  if (changed) {
    const completed = Object.values(nextFields).filter((field) => field.status === "complete" || field.status === "urgent" || field.status === "pending").length;
    setState({
      ...state,
      route: nextRoute,
      fields: nextFields,
      events: nextEvents.slice(-14),
      progress: Math.max(state.progress, Math.round((completed / Object.keys(nextFields).length) * 100)),
    });
  }
}

function stripNegatedSafety(text) {
  return text
    .replace(/\b(?:no|not|none|without|denies|denied)\s+(?:one\s+)?(?:was\s+)?(?:injur\w*|hurt|pain|medical attention|ambulance|hospital|unsafe|hazard\w*|danger)\b/gi, " ")
    .replace(/\b(?:injur\w*|hurt|pain|medical attention|ambulance|hospital|unsafe|hazard\w*|danger)\s+(?:was|were|is|are)?\s*(?:reported\s+)?(?:no|none|not reported|denied)\b/gi, " ");
}

function compactText(text) {
  const trimmed = text.trim().replace(/\s+/g, " ");
  return trimmed.length > 96 ? `${trimmed.slice(0, 93)}...` : trimmed;
}

function toTitleCase(value) {
  return value
    .trim()
    .split(/\s+/)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join(" ");
}

async function api(path, options = {}) {
  const response = await fetch(`${API_ORIGIN}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(payload.detail || `Request failed with status ${response.status}`);
  }
  return payload;
}

async function createSession() {
  stopLiveVoice(false);
  callStatus.textContent = "Connecting to backend";
  textInput.disabled = true;
  setState(emptyState);
  try {
    const payload = await api("/api/sessions", { method: "POST" });
    sessionId = payload.session_id;
    setState(payload.state);
    modelLabel.innerHTML = `<span class="dot ok"></span> ${escapeHtml(payload.model)}`;
    callStatus.textContent = payload.has_api_key ? "Active - API connected" : "API key required";
    textInput.disabled = false;
    textInput.focus();
  } catch (error) {
    callStatus.textContent = "Backend unavailable";
    appendLocalError(error.message);
  }
}

async function sendClaimantTurn(text) {
  if (liveSocket && liveSocket.readyState === WebSocket.OPEN) {
    liveSocket.send(JSON.stringify({ type: "text", text }));
    upsertStreamingTurn("Claimant", text, true);
    return;
  }
  if (!sessionId) {
    appendLocalError("No backend session is active. Start a new intake first.");
    return;
  }
  upsertStreamingTurn("Claimant", text, true);
  callStatus.textContent = "Processing with Gemini";
  textInput.disabled = true;
  try {
    const payload = await api("/api/message", {
      method: "POST",
      body: JSON.stringify({ session_id: sessionId, text }),
    });
    setState(payload.state);
    modelLabel.innerHTML = `<span class="dot ok"></span> ${escapeHtml(payload.model)}`;
    callStatus.textContent = "Active - API connected";
  } catch (error) {
    callStatus.textContent = "API error";
    appendLocalError(error.message);
  } finally {
    textInput.disabled = false;
    textInput.focus();
  }
}

async function startLiveVoice() {
  if (!navigator.mediaDevices?.getUserMedia || !window.AudioContext) {
    appendLocalError("This browser cannot capture microphone audio. Type the claimant turn instead.");
    return;
  }
  try {
    await connectLiveVoice();
    audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });
    audioContext = audioContext || new AudioContext();
    await audioContext.resume();
    inputSource = audioContext.createMediaStreamSource(audioStream);
    inputProcessor = audioContext.createScriptProcessor(4096, 1, 1);
    inputProcessor.onaudioprocess = (event) => {
      event.outputBuffer.getChannelData(0).fill(0);
      if (!liveSocket || liveSocket.readyState !== WebSocket.OPEN) return;
      const input = event.inputBuffer.getChannelData(0);
      const pcm16 = resampleToPcm16(input, audioContext.sampleRate, 16000);
      liveSocket.send(JSON.stringify({ type: "audio", data: arrayBufferToBase64(pcm16.buffer) }));
    };
    inputSource.connect(inputProcessor);
    inputProcessor.connect(audioContext.destination);
    isRecording = true;
    micButton.classList.add("recording");
    micButton.setAttribute("aria-label", "Stop live voice");
    callStatus.textContent = "Live voice streaming";
  } catch (error) {
    const denied = error.name === "NotAllowedError" || /denied|permission/i.test(error.message);
    appendLocalError(
      denied
        ? "Microphone access was denied by the browser or macOS. Allow microphone access for http://127.0.0.1:4177, or use the text box for this turn."
        : `Live voice failed: ${error.message}`
    );
    stopLiveVoice(false);
  }
}

function stopLiveVoice(sendClose = true) {
  isRecording = false;
  closeAfterAgentTurn = false;
  micButton.classList.remove("recording");
  micButton.setAttribute("aria-label", "Start live voice");
  inputProcessor?.disconnect();
  inputSource?.disconnect();
  audioStream?.getTracks().forEach((track) => track.stop());
  inputProcessor = null;
  inputSource = null;
  audioStream = null;
  if (sendClose) {
    liveSocket?.send(JSON.stringify({ type: "close" }));
  }
  liveSocket?.close();
  liveSocket = null;
  if (sendClose) callStatus.textContent = "Live voice stopped";
}

async function connectLiveVoice() {
  if (liveSocket && liveSocket.readyState === WebSocket.OPEN) return;
  liveSocket = new WebSocket(`${WS_ORIGIN}/ws/live`);
  liveSocket.onopen = () => {
    callStatus.textContent = "Gemini Live connected";
    modelLabel.innerHTML = '<span class="dot ok"></span> Gemini Live connecting';
  };
  liveSocket.onmessage = (event) => {
    const message = JSON.parse(event.data);
    if (message.type === "session") {
      sessionId = message.session_id;
      modelLabel.innerHTML = `<span class="dot ok"></span> ${escapeHtml(message.model)}`;
    } else if (message.type === "transcript") {
      upsertStreamingTurn(message.speaker, message.text, message.final);
      if (message.speaker === "Claimant") {
        applyRealtimeHints(message.text);
        if (message.final && claimantAskedToClose(message.text)) {
          closeAfterAgentTurn = true;
        }
      }
      if (message.speaker === "Agent" && message.final && closeAfterAgentTurn && agentClosedConversation(message.text)) {
        window.setTimeout(() => stopLiveVoice(), 800);
      }
    } else if (message.type === "audio") {
      playPcm24(message.data);
    } else if (message.type === "state") {
      applyServerState(message.state);
    } else if (message.type === "interrupted") {
      nextPlaybackTime = audioContext?.currentTime || 0;
    } else if (message.type === "error") {
      appendLocalError(message.message);
    }
  };
  liveSocket.onclose = () => {
    if (isRecording) callStatus.textContent = "Live voice disconnected";
  };
  liveSocket.onerror = () => appendLocalError("Live voice WebSocket failed. Check the backend server.");
  await new Promise((resolve, reject) => {
    const timeout = setTimeout(() => reject(new Error("Live voice connection timed out.")), 8000);
    liveSocket.addEventListener("open", () => {
      clearTimeout(timeout);
      resolve();
    }, { once: true });
    liveSocket.addEventListener("error", () => {
      clearTimeout(timeout);
      reject(new Error("Live voice connection failed."));
    }, { once: true });
  });
}

function resampleToPcm16(input, inputRate, outputRate) {
  const ratio = inputRate / outputRate;
  const outputLength = Math.floor(input.length / ratio);
  const output = new Float32Array(outputLength);
  for (let i = 0; i < outputLength; i += 1) {
    const index = i * ratio;
    const before = Math.floor(index);
    const after = Math.min(before + 1, input.length - 1);
    const weight = index - before;
    output[i] = input[before] * (1 - weight) + input[after] * weight;
  }
  return floatToPcm16(output);
}

function floatToPcm16(float32) {
  const pcm = new Int16Array(float32.length);
  for (let i = 0; i < float32.length; i += 1) {
    const sample = Math.max(-1, Math.min(1, float32[i]));
    pcm[i] = sample < 0 ? sample * 0x8000 : sample * 0x7fff;
  }
  return pcm;
}

function arrayBufferToBase64(buffer) {
  let binary = "";
  const bytes = new Uint8Array(buffer);
  for (let i = 0; i < bytes.byteLength; i += 1) binary += String.fromCharCode(bytes[i]);
  return btoa(binary);
}

function base64ToInt16Array(base64) {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i);
  return new Int16Array(bytes.buffer);
}

function playPcm24(base64) {
  audioContext = audioContext || new AudioContext();
  const pcm = base64ToInt16Array(base64);
  const audioBuffer = audioContext.createBuffer(1, pcm.length, 24000);
  const channel = audioBuffer.getChannelData(0);
  for (let i = 0; i < pcm.length; i += 1) channel[i] = pcm[i] / 32768;
  const source = audioContext.createBufferSource();
  source.buffer = audioBuffer;
  source.connect(audioContext.destination);
  const startAt = Math.max(audioContext.currentTime, nextPlaybackTime);
  source.start(startAt);
  nextPlaybackTime = startAt + audioBuffer.duration;
}

micButton.addEventListener("click", () => {
  if (isRecording) stopLiveVoice();
  else startLiveVoice();
});

newIntakeButton.addEventListener("click", createSession);
resetButton.addEventListener("click", createSession);

textForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const value = textInput.value.trim();
  if (!value) return;
  textInput.value = "";
  sendClaimantTurn(value);
});

document.querySelector("#openPacket").addEventListener("click", () => packetDialog.showModal());
document.querySelector("#closePacket").addEventListener("click", () => packetDialog.close());

createSession();
