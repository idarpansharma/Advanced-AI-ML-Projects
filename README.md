<div align="center">

# 🌌 AWESOME LLM APPS
### *The Ultimate Collection of AI Agents & RAG Applications*

[![Follow on LinkedIn](https://img.shields.io/badge/Follow%20on%20LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/darpansharma/)
[![Follow on X](https://img.shields.io/badge/Follow%20on%20𝕏-000000?style=for-the-badge&logo=x&logoColor=white)](https://twitter.com/Darpan_Sharma_)

<br/>

**100+ AI Agent & RAG apps you can actually run — clone, customize, ship.**  
*AI Agents · Multi-agent Teams · MCP Agents · RAG · Voice Agents · Agent Skills · Fine-tuning*

[![Stars](https://img.shields.io/github/stars/DarpanSharma/awesome-llm-apps?style=for-the-badge&logo=github&color=FFD700)](https://github.com/DarpanSharma/awesome-llm-apps/stargazers)
[![Forks](https://img.shields.io/github/forks/DarpanSharma/awesome-llm-apps?style=for-the-badge&logo=github&color=4FC3F7)](https://github.com/DarpanSharma/awesome-llm-apps/network/members)
[![Contributors](https://img.shields.io/github/contributors/DarpanSharma/awesome-llm-apps?style=for-the-badge&color=22C55E)](https://github.com/DarpanSharma/awesome-llm-apps/graphs/contributors)
[![License](https://img.shields.io/github/license/DarpanSharma/awesome-llm-apps?style=for-the-badge&color=8B5CF6)](LICENSE)

<br/>

<a href="#-quick-start"><kbd> &nbsp; 🚀 Quick Start &nbsp; </kbd></a>
<a href="#-featured-ai-projects"><kbd> &nbsp; 📂 Browse Templates &nbsp; </kbd></a>

</div>

---

## 💡 Why this exists

You shouldn't have to rebuild the same RAG pipeline, agent loop, or MCP integration from scratch every time you start a new LLM project.

**Awesome LLM Apps is a cookbook of ready-to-run templates** - starter code you can fork, customize, and ship as a production LLM app. Every template here is self-contained with full source code, not collected from elsewhere.

- 🛠️ **Hand-built, not curated** - every template is original work, tested end-to-end before it ships.
- 🧪 **Runs in 3 commands** - no broken `requirements.txt`, no "figure it out yourself" scaffolding.
- 🧠 **Covers the modern AI stack** - AI Agents, Multi-agent Teams, MCP Agents, Voice AI Agents, RAG, Agent Skills, Fine-tuning.
- 🌐 **Provider-agnostic** - switch between Claude, Gemini, GPT, Llama, Qwen, xAI and others with a config change.
- 📚 **Step-by-step tutorials** - every featured template comes with a free walkthrough.
- 💸 **Apache-2.0** - fork it, ship it, sell it. No paywall, no signup, no telemetry.

> ⭐ **If this saves you time, [star the repo](https://github.com/DarpanSharma/awesome-llm-apps/stargazers) - that's how the next developer discovers it.**

## 🚀 Quick Start

Run your first agent in **30 seconds**:

```bash
git clone https://github.com/DarpanSharma/awesome-llm-apps.git
cd awesome-llm-apps/foundation_agents/ai_travel_agent
pip install -r requirements.txt
streamlit run travel_agent.py
```


## 🔥 Featured This Month

| Template | What it does | Stack |
|---|---|---|
| [📡 Earnings Call Analyst Agent](enterprise_agents/single_agent_apps/earnings_call_analyst_agent/) | YouTube earnings calls become quote-synced analyst cards with ADK, Gemini, filings, and grounded market news | ADK + Gemini |
| [🛡️ Insurance Claim Live Agent Team](voice_intelligence/insurance_claim_live_agent_team/) | Real-time voice claim intake with Gemini Live and ADK | Voice + ADK |
| [🏠 Home Renovation Agent](enterprise_agents/multi_agent_apps/ai_home_renovation_agent) | Photo → AI redesign with Nano Banana Pro | Vision + Multi-agent |
| [♾️ Self-Improving Agent Skills](core_skills_library/self-improving-agent-skills/) | Automatically optimize agent skills using Gemini and ADK | Agent Skills + ADK |

> 📬 **Follow to get new template drops + tutorials** directly in your feed.

## 📑 Table of Contents

| 🚀 **Core Agents** | 🧠 **Advanced Architectures** | 🛠️ **Infrastructure & Skills** |
|:---|:---|:---|
| [🌱 Starter AI Agents](#-starter-ai-agents) | [🚀 Advanced AI Agents](#-advanced-ai-agents) | [♾️ MCP AI Agents](#-mcp-ai-agents) |
| [🗣️ Voice AI Agents](#️-voice-ai-agents) | [🤝 Multi-agent Teams](#-multi-agent-teams) | [📀 RAG Tutorials](#-rag-retrieval-augmented-generation) |
| [🖼️ Generative UI & Frontends](#️-generative-ui-and-agentic-frontends) | [🎮 Game-Playing Agents](#-autonomous-game-playing-agents) | [🧩 Awesome Agent Skills](#-awesome-agent-skills) |
| [💬 Chat with X Tutorials](#-chat-with-x-tutorials) | [💾 LLM Apps with Memory](#-llm-apps-with-memory-tutorials) | [🎯 Optimization & Fine-tuning](#-llm-optimization-tools) |
| [🧑‍🏫 Agent Framework Crash Courses](#-ai-agent-framework-crash-course) | | |

## 📂 Featured AI Projects

### 🌱 Starter AI Agents
*Single-file agents that run with just an API key - a great place to start.*

*   [🎙️ AI Blog to Podcast Agent](foundation_agents/ai_blog_to_podcast_agent/)
*   [❤️‍🩹 AI Breakup Recovery Agent](foundation_agents/ai_breakup_recovery_agent/)
*   [📊 AI Data Analysis Agent](foundation_agents/ai_data_analysis_agent/)
*   [🩻 AI Medical Imaging Agent](foundation_agents/ai_medical_imaging_agent/)
*   [😂 AI Meme Generator Agent (Browser)](foundation_agents/ai_meme_generator_agent_browseruse/)
*   [🎵 AI Music Generator Agent](foundation_agents/ai_music_generator_agent/)
*   [🛫 AI Travel Agent (Local & Cloud)](foundation_agents/ai_travel_agent/)
*   [✨ Gemini Multimodal Agent](foundation_agents/multimodal_ai_agent/)
*   [🔄 Mixture of Agents](foundation_agents/mixture_of_agents/)
*   [📊 xAI Finance Agent](foundation_agents/xai_finance_agent/)
*   [🔍 OpenAI Research Agent](foundation_agents/openai_research_agent/)
*   [🕸️ Web Scraping AI Agent](foundation_agents/web_scraping_ai_agent/)

### 🚀 Advanced AI Agents
*Production-style agents with tools, memory, and multi-step reasoning.*

*   [🏚️ 🍌 AI Home Renovation Agent with Nano Banana Pro](enterprise_agents/multi_agent_apps/ai_home_renovation_agent)
*   [🧠 DevPulse AI - Multi-Agent Signal Intelligence](enterprise_agents/multi_agent_apps/devpulse_ai/)
*   [🔍 AI Deep Research Agent](enterprise_agents/single_agent_apps/ai_deep_research_agent/)
*   [📊 AI VC Due Diligence Agent Team](enterprise_agents/multi_agent_apps/agent_teams/ai_vc_due_diligence_agent_team)
*   [🔬 AI Research Planner & Executor (Google Interactions API)](enterprise_agents/single_agent_apps/research_agent_gemini_interaction_api)
*   [🤝 AI Consultant Agent](enterprise_agents/single_agent_apps/ai_consultant_agent)
*   [🏗️ AI System Architect Agent](enterprise_agents/single_agent_apps/ai_system_architect_r1/)
*   [💰 AI Financial Coach Agent](enterprise_agents/multi_agent_apps/ai_financial_coach_agent/)
*   [🎬 AI Movie Production Agent](enterprise_agents/single_agent_apps/ai_movie_production_agent/)
*   [📈 AI Investment Agent](enterprise_agents/single_agent_apps/ai_investment_agent/)
*   [📡 Earnings Call Analyst Agent](enterprise_agents/single_agent_apps/earnings_call_analyst_agent/)
*   [🏋️‍♂️ AI Health & Fitness Agent](enterprise_agents/single_agent_apps/ai_health_fitness_agent/)
*   [🚀 AI Product Launch Intelligence Agent](enterprise_agents/multi_agent_apps/product_launch_intelligence_agent)
*   [🔍 AI Fraud Investigation Agent](enterprise_agents/single_agent_apps/ai_fraud_investigation_agent/)
*   [🗞️ AI Journalist Agent](enterprise_agents/single_agent_apps/ai_journalist_agent/)
*   [🧠 AI Mental Wellbeing Agent](enterprise_agents/multi_agent_apps/ai_mental_wellbeing_agent/)
*   [📑 AI Meeting Agent](enterprise_agents/single_agent_apps/ai_meeting_agent/)
*   [🧬 AI Self-Evolving Agent](enterprise_agents/multi_agent_apps/ai_self_evolving_agent/)
*   [👨🏻‍💼 AI Sales Intelligence Agent Team](enterprise_agents/multi_agent_apps/agent_teams/ai_sales_intelligence_agent_team)
*   [🎧 AI Social Media News and Podcast Agent](enterprise_agents/multi_agent_apps/ai_news_and_podcast_agents/)
*   [🌐 Openwork - Open Browser Automation Agent](https://github.com/DarpanSharma/openwork) <sub>↗ external</sub>
*   [🛡️ Trust-Gated Multi-Agent Research Team](enterprise_agents/multi_agent_apps/trust_gated_agent_team/)

### 🤝 Multi-agent Teams
*Multiple agents collaborating to accomplish complex, cross-domain tasks.*

*   [🧲 AI Competitor Intelligence Agent Team](enterprise_agents/multi_agent_apps/agent_teams/ai_competitor_intelligence_agent_team/)
*   [💲 AI Finance Agent Team](enterprise_agents/multi_agent_apps/agent_teams/ai_finance_agent_team/)
*   [🎨 AI Game Design Agent Team](enterprise_agents/multi_agent_apps/agent_teams/ai_game_design_agent_team/)
*   [🧭 AG2 Adaptive Research Team](enterprise_agents/multi_agent_apps/agent_teams/ag2_adaptive_research_team/)
*   [👨‍⚖️ AI Legal Agent Team (Cloud & Local)](enterprise_agents/multi_agent_apps/agent_teams/ai_legal_agent_team/)
*   [💼 AI Recruitment Agent Team](enterprise_agents/multi_agent_apps/agent_teams/ai_recruitment_agent_team/)
*   [🏠 AI Real Estate Agent Team](enterprise_agents/multi_agent_apps/agent_teams/ai_real_estate_agent_team)
*   [👨‍💼 AI Services Agency (CrewAI)](enterprise_agents/multi_agent_apps/agent_teams/ai_services_agency/)
*   [👨‍🏫 AI Teaching Agent Team](enterprise_agents/multi_agent_apps/agent_teams/ai_teaching_agent_team/)
*   [💻 Multimodal Coding Agent Team](enterprise_agents/multi_agent_apps/agent_teams/multimodal_coding_agent_team/)
*   [✨ Multimodal Design Agent Team](enterprise_agents/multi_agent_apps/agent_teams/multimodal_design_agent_team/)
*   [🎨 🍌 Multimodal UI/UX Feedback Agent Team with Nano Banana](enterprise_agents/multi_agent_apps/agent_teams/multimodal_uiux_feedback_agent_team/)
*   [🌏 AI Travel Planner Agent Team](/enterprise_agents/multi_agent_apps/agent_teams/ai_travel_planner_agent_team/)

### 🗣️ Voice AI Agents
*Speech-in, speech-out agents using real-time voice APIs.*

*   [🗣️ AI Audio Tour Agent](voice_intelligence/ai_audio_tour_agent/)
*   [📞 Customer Support Voice Agent](voice_intelligence/customer_support_voice_agent/)
*   [🛡️ Insurance Claim Live Agent Team](voice_intelligence/insurance_claim_live_agent_team/)
*   [🔊 Voice RAG Agent (OpenAI SDK)](voice_intelligence/voice_rag_openaisdk/)
*   [🎙️ OpenSource Voice Dictation Agent (Wispr Flow clone)](https://github.com/DarpanSharma/jarvis-ai-assistant) <sub>↗ external</sub>

### 🖼️ Generative UI and Agentic Frontends
*Agents that render interactive UI components — forms, cards, charts, editable plans — not just text.*

*   [🗂️ Generative UI Starter Project](generative_interfaces/generative-ui-starter-project/)
*   [🪙 AI Financial Coach Agent](generative_interfaces/ai-financial-coach-agent/)
*   [📊 AI Dashboard Canvas Agent](generative_interfaces/ai-dashboard-canvas-agent/)
*   [🛠️ AI MCP App Builder](generative_interfaces/ai-mcp-app-builder/)
*   [✈️ MCP Apps Generative UI Showcase](generative_interfaces/mcp-apps-generative-ui-showcase/)
*   [🎛️ AI Shadcn Component Generator](generative_interfaces/ai-shadcn-component-generator/)
*   [🔍 AI Deep Research Agent](generative_interfaces/ai-deep-research-agent/)

### 🎮 Autonomous Game-Playing Agents
*Agents that play games end-to-end - reasoning, strategy, and action.*

*   [🎮 AI 3D Pygame Agent](enterprise_agents/autonomous_game_playing_agent_apps/ai_3dpygame_r1/)
*   [♜ AI Chess Agent](enterprise_agents/autonomous_game_playing_agent_apps/ai_chess_agent/)
*   [🎲 AI Tic-Tac-Toe Agent](enterprise_agents/autonomous_game_playing_agent_apps/ai_tic_tac_toe_agent/)

### ♾️ MCP AI Agents
*Agents that connect to external tools and data via Model Context Protocol.*

*   [♾️ Browser MCP Agent](mcp_integrations/browser_mcp_agent/)
*   [🐙 GitHub MCP Agent](mcp_integrations/github_mcp_agent/)
*   [📑 Notion MCP Agent](mcp_integrations/notion_mcp_agent)
*   [🌍 AI Travel Planner MCP Agent](mcp_integrations/ai_travel_planner_mcp_agent_team)
*   [🔀 Multi-MCP Agent Router](mcp_integrations/multi_mcp_agent_router/)

### 📀 RAG (Retrieval Augmented Generation)
*Retrieval pipelines - from simple chains to agentic and multi-source.*

*   [🔥 Agentic RAG with Embedding Gemma](rag_implementations/agentic_rag_embedding_gemma)
*   [🧐 Agentic RAG with Reasoning](rag_implementations/agentic_rag_with_reasoning/)
*   [📰 AI Blog Search (RAG)](rag_implementations/ai_blog_search/)
*   [🔍 Autonomous RAG](rag_implementations/autonomous_rag/)
*   [🔄 Contextual AI RAG Agent](rag_implementations/contextualai_rag_agent/)
*   [🔄 Corrective RAG (CRAG)](rag_implementations/corrective_rag/)
*   [🐋 Deepseek Local RAG Agent](rag_implementations/deepseek_local_rag_agent/)
*   [🤔 Gemini Agentic RAG](rag_implementations/gemini_agentic_rag/)
*   [👀 Hybrid Search RAG (Cloud)](rag_implementations/hybrid_search_rag/)
*   [🔄 Llama 3.1 Local RAG](rag_implementations/llama3.1_local_rag/)
*   [🖥️ Local Hybrid Search RAG](rag_implementations/local_hybrid_search_rag/)
*   [🧬 Multimodal Agentic RAG](rag_implementations/multimodal_agentic_rag/)
*   [🦙 Local RAG Agent](rag_implementations/local_rag_agent/)
*   [🧩 RAG-as-a-Service](rag_implementations/rag-as-a-service/)
*   [✨ RAG Agent with Cohere](rag_implementations/rag_agent_cohere/)
*   [⛓️ Basic RAG Chain](rag_implementations/rag_chain/)
*   [📠 RAG with Database Routing](rag_implementations/rag_database_routing/)
*   [🖼️ Vision RAG](rag_implementations/vision_rag/)
*   [🩺 RAG Failure Diagnostics Clinic](rag_implementations/rag_failure_diagnostics_clinic/)
*   [🕸️ Knowledge Graph RAG with Citations](rag_implementations/knowledge_graph_rag_citations/)

### 🧩 Awesome Agent Skills
*Ready-to-use agent skill files you can plug into any AI agent or LLM workflow.*

*   [♾️ Self-Improving Agent Skills](core_skills_library/self-improving-agent-skills/) - Automatically optimize agent skills using Gemini and ADK

<details>
<summary><strong>📋 Browse all 19 skills</strong></summary>

| Skill | Description |
|---|---|
| [🎓 Academic Researcher](core_skills_library/academic-researcher/) | Literature reviews, paper analysis, citation management |
| [🔍 Code Reviewer](core_skills_library/code-reviewer/) | Automated code review with best-practice checks |
| [✍️ Content Creator](core_skills_library/content-creator/) | Blog posts, social media, marketing copy |
| [📊 Data Analyst](core_skills_library/data-analyst/) | Data exploration, statistical analysis, insights |
| [🐛 Debugger](core_skills_library/debugger/) | Systematic bug hunting and root-cause analysis |
| [🤔 Decision Helper](core_skills_library/decision-helper/) | Structured decision frameworks and trade-off analysis |
| [🔬 Deep Research](core_skills_library/deep-research/) | Multi-source research with synthesis |
| [📝 Editor](core_skills_library/editor/) | Proofreading, style, and clarity improvements |
| [📧 Email Drafter](core_skills_library/email-drafter/) | Professional email composition |
| [✅ Fact Checker](core_skills_library/fact-checker/) | Claim verification and source validation |
| [💻 Fullstack Developer](core_skills_library/fullstack-developer/) | End-to-end web app development |
| [📋 Meeting Notes](core_skills_library/meeting-notes/) | Meeting summaries, action items, follow-ups |
| [📅 Project Planner](core_skills_library/project-planner/) | Roadmaps, milestones, resource planning |
| [🐍 Python Expert](core_skills_library/python-expert/) | Pythonic code, packaging, performance |
| [🏃 Sprint Planner](core_skills_library/sprint-planner/) | Agile sprint planning and backlog grooming |
| [🧭 Strategy Advisor](core_skills_library/strategy-advisor/) | Business strategy and competitive analysis |
| [📖 Technical Writer](core_skills_library/technical-writer/) | Documentation, API docs, guides |
| [🎨 UX Designer](core_skills_library/ux-designer/) | UI/UX design feedback and wireframes |
| [📈 Visualization Expert](core_skills_library/visualization-expert/) | Charts, dashboards, data storytelling |

</details>

### 💾 LLM Apps with Memory Tutorials
*Agents and chatbots that remember conversations and user state across sessions.*

*   [💾 AI ArXiv Agent with Memory](enterprise_applications/llm_apps_with_memory_tutorials/ai_arxiv_agent_memory/)
*   [🛩️ AI Travel Agent with Memory](enterprise_applications/llm_apps_with_memory_tutorials/ai_travel_agent_memory/)
*   [💬 Llama3 Stateful Chat](enterprise_applications/llm_apps_with_memory_tutorials/llama3_stateful_chat/)
*   [📝 LLM App with Personalized Memory](enterprise_applications/llm_apps_with_memory_tutorials/llm_app_personalized_memory/)
*   [🗄️ Local ChatGPT Clone with Memory](enterprise_applications/llm_apps_with_memory_tutorials/local_chatgpt_with_memory/)
*   [🧠 Multi-LLM Application with Shared Memory](enterprise_applications/llm_apps_with_memory_tutorials/multi_llm_memory/)

### 💬 Chat with X Tutorials
*Turn any data source into a chat interface.*

*   [💬 Chat with GitHub (GPT & Llama3)](enterprise_applications/chat_with_X_tutorials/chat_with_github/)
*   [📨 Chat with Gmail](enterprise_applications/chat_with_X_tutorials/chat_with_gmail/)
*   [📄 Chat with PDF (GPT & Llama3)](enterprise_applications/chat_with_X_tutorials/chat_with_pdf/)
*   [📚 Chat with Research Papers (ArXiv) (GPT & Llama3)](enterprise_applications/chat_with_X_tutorials/chat_with_research_papers/)
*   [📝 Chat with Substack](enterprise_applications/chat_with_X_tutorials/chat_with_substack/)
*   [📽️ Chat with YouTube Videos](enterprise_applications/chat_with_X_tutorials/chat_with_youtube_videos/)

### 🎯 LLM Optimization Tools
*Reduce token usage, context size, and API cost without losing quality.*

*   [🎯 Toonify Token Optimization](enterprise_applications/llm_optimization_tools/toonify_token_optimization/) - Reduce LLM API costs by 30–60% using TOON format
*   [🧠 Headroom Context Optimization](enterprise_applications/llm_optimization_tools/headroom_context_optimization/) - Reduce LLM API costs by 50–90%

### 🔧 LLM Fine-tuning Tutorials
*End-to-end fine-tuning recipes for open-source models.*

* [Gemma 3 Fine-tuning](enterprise_applications/llm_finetuning_tutorials/gemma3_finetuning/)
* [Llama 3.2 Fine-tuning](enterprise_applications/llm_finetuning_tutorials/llama3.2_finetuning/)

### 🧑‍🏫 AI Agent Framework Crash Course
*Deep-dive tutorials on the major agent frameworks.*

[Google ADK Crash Course](framework_fundamentals/google_adk_crash_course/)
  - Starter agent; model‑agnostic (OpenAI, Claude)
  - Structured outputs (Pydantic)
  - Tools: built‑in, function, third‑party, MCP tools
  - Memory; callbacks; Plugins
  - Simple multi‑agent; Multi‑agent patterns

[OpenAI Agents SDK Crash Course](framework_fundamentals/openai_sdk_crash_course/)
  - Starter agent; function calling; structured outputs
  - Tools: built‑in, function, third‑party integrations
  - Memory; callbacks; evaluation
  - Multi‑agent patterns; agent handoffs
  - Swarm orchestration; routing logic


## 🙏 Built by

<p>Created and maintained by <a href="https://twitter.com/Darpan_Sharma_"><strong>Darpan Sharma</strong></a> with contributions from the amazing community members.</p>

<a href="https://github.com/DarpanSharma/awesome-llm-apps/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=DarpanSharma/awesome-llm-apps&max=40&columns=10&anon=0" alt="Top contributors" />
</a>

## ⭐ Star History

[![Star History Chart](https://api.star-history.com/svg?repos=DarpanSharma/awesome-llm-apps&type=Date)](https://star-history.com/#DarpanSharma/awesome-llm-apps&Date)

> 🌟 **Don't miss future drops - [star the repo](https://github.com/DarpanSharma/awesome-llm-apps) to get notified when new templates ship.**

## 📜 License

Apache-2.0. See [LICENSE](LICENSE). Fork it, ship it, sell it.
