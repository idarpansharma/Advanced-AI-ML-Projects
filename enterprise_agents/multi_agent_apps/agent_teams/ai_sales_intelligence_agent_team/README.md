# 👨🏻‍💼 AI Sales Intelligence Agent Team 

A multi-agent AI pipeline that generates competitive sales battle cards in real-time, built with [Google ADK](https://google.github.io/adk-docs/) and Gemini 3.

**Give it a competitor + your product** → Get a complete battle card with positioning strategies, objection handling scripts, and visual comparisons.

## Features

- 🔍 **Live Research** - Real-time web search for competitor intelligence
- 📊 **Feature Analysis** - Deep dive into competitor product capabilities
- 🎯 **Positioning Intel** - Uncover how competitors position against you
- ⚖️ **SWOT Analysis** - Honest strengths/weaknesses comparison
- 💬 **Objection Scripts** - Ready-to-use responses for sales calls
- 📄 **Battle Card** - Professional HTML battle card for reps
- 📈 **Comparison Infographic** - AI-generated visual comparison (Gemini image)

## What It Does

Given a competitor and your product, the pipeline automatically:

1. **Researches the competitor** - Company, funding, customers, reviews
2. **Analyzes their features** - Capabilities, integrations, pricing
3. **Uncovers positioning** - Their messaging, personas, analyst coverage
4. **Creates SWOT analysis** - Where you win, where they win
5. **Generates objection scripts** - Top 10 objections with responses
6. **Builds battle card** - Professional HTML for sales reps
7. **Creates comparison chart** - Visual feature-by-feature comparison

## Quick Start

### 1. Navigate to Project
```bash
cd awesome-llm-apps/enterprise_agents/multi_agent_apps/agent_team/ai_sales_intelligence_team
```

### 2. Set Environment
```bash
export GOOGLE_API_KEY=your_api_key
```

### 3. Install & Run
```bash
pip install -r requirements.txt
adk web
```

### 4. Try It
Open `http://localhost:8000` and try:
- *"Create a battle card for Salesforce. We sell HubSpot."*
- *"Battle card against Slack - we're selling Microsoft Teams"*
- *"Help me compete against Zendesk, I sell Freshdesk"*

## Example Prompts

| Your Product | Competitor | Prompt |
|--------------|------------|--------|
| HubSpot | Salesforce | "Create a battle card for Salesforce. We sell HubSpot." |
| Asana | Monday.com | "Battle card against Monday.com, I sell Asana" |
| Zoom | Microsoft Teams | "Competitive analysis: Zoom vs our product Teams" |
| Notion | Confluence | "Help me compete against Confluence, we're Notion" |

---

## Pipeline Architecture

```
User Query: "Battle card for Salesforce. We sell HubSpot."
    │
    ▼
┌─────────────────────────────────────────────────────────────────┐
│               BattleCardPipeline (SequentialAgent)              │
│                                                                 │
│  ┌─────────────────┐    ┌─────────────────┐    ┌─────────────┐  │
│  │    Stage 1      │    │    Stage 2      │    │   Stage 3   │  │
│  │   Competitor    │───▶│    Product      │───▶│ Positioning │  │
│  │   Research      │    │    Features     │    │  Analyzer   │  │
│  └─────────────────┘    └─────────────────┘    └─────────────┘  │
│           │                     │                     │         │
│           ▼                     ▼                     ▼         │
│  ┌─────────────────┐    ┌─────────────────┐    ┌─────────────┐  │
│  │    Stage 4      │    │    Stage 5      │    │   Stage 6   │  │
│  │      SWOT       │───▶│   Objection     │───▶│ Battle Card │  │
│  │    Analysis     │    │    Handler      │    │  Generator  │  │
│  └─────────────────┘    └─────────────────┘    └─────────────┘  │
│                                                       │         │
│                                                       ▼         │
│                                              ┌─────────────┐    │
│                                              │   Stage 7   │    │
│                                              │ Comparison  │    │
│                                              │    Chart    │    │
│                                              └─────────────┘    │
└─────────────────────────────────────────────────────────────────┘
    │
    ▼
Artifacts: battle_card.html, comparison_chart.png
```

---

## Agent Details

### Stage 1: Competitor Research Agent

**Purpose:** Gathers comprehensive competitor intelligence through web search.

| Property | Value |
|----------|-------|
| Model | `gemini-3-flash-preview` |
| Tools | `google_search` |
| Output Key | `competitor_profile` |

**Researches:**
- Company overview (founded, HQ, size, funding)
- Target market and ideal customers
- Products and pricing tiers
- Recent news, launches, acquisitions
- Customer reviews (G2, Capterra, TrustRadius)

---

### Stage 2: Product Feature Agent

**Purpose:** Deep analysis of competitor product capabilities.

| Property | Value |
|----------|-------|
| Model | `gemini-3-flash-preview` |
| Tools | `google_search` |
| Output Key | `feature_analysis` |

**Analyzes:**
- Core features and capabilities
- Integrations and ecosystem
- Technical architecture (cloud, API, mobile)
- Pricing details and hidden costs
- Known limitations from reviews

---

### Stage 3: Positioning Analyzer Agent

**Purpose:** Uncovers competitor positioning and messaging strategy.

| Property | Value |
|----------|-------|
| Model | `gemini-3-pro-preview` |
| Tools | `google_search` |
| Output Key | `positioning_intel` |

**Discovers:**
- Marketing messaging and taglines
- Target personas they focus on
- How they position against YOUR product
- Analyst coverage (Gartner, Forrester, G2)
- Social proof and case studies

---

### Stage 4: SWOT Analysis Agent

**Purpose:** Creates honest strengths/weaknesses analysis.

| Property | Value |
|----------|-------|
| Model | `gemini-3-pro-preview` |
| Tools | None (synthesis) |
| Output Key | `swot_analysis` |

**Produces:**
- Top 5 competitor strengths (with evidence)
- Top 5 competitor weaknesses
- Where YOU win against them
- Competitive landmines to set in deals

---

### Stage 5: Objection Handler Agent

**Purpose:** Creates scripts for handling competitive objections.

| Property | Value |
|----------|-------|
| Model | `gemini-3-pro-preview` |
| Tools | None (synthesis) |
| Output Key | `objection_scripts` |

**Creates:**
- Top 10 objections with scripted responses
- Proof points for each response
- Killer questions to ask prospects
- Trap-setting phrases for early in deals

---

### Stage 6: Battle Card Generator Agent

**Purpose:** Generates professional HTML battle card.

| Property | Value |
|----------|-------|
| Model | `gemini-3-flash-preview` |
| Tools | `generate_battle_card_html` |
| Output Key | `battle_card_result` |

**Battle Card Includes:**
- Quick stats header
- At-a-glance comparison (We Win / They Win / Toss-up)
- Feature comparison table
- Objection handling cheat sheet
- Killer questions
- Landmines to set

**Artifact:** `battle_card_TIMESTAMP.html`

---

### Stage 7: Comparison Chart Agent

**Purpose:** Creates visual comparison infographic using Gemini image generation.

| Property | Value |
|----------|-------|
| Model | `gemini-3-flash-preview` |
| Tools | `generate_comparison_chart` (uses `gemini-2.0-flash-exp`) |
| Output Key | `chart_result` |

**Infographic Features:**
- AI-generated professional comparison graphic
- Side-by-side feature comparison visualization
- Color-coded scores (green = you, red = competitor)
- Key differentiators highlighted
- Overall verdict badge

**Artifact:** `comparison_infographic_TIMESTAMP.png`

---

## Project Structure

```
ai_battle_card_agent/
├── __init__.py        # Exports root_agent
├── agent.py           # All 7 agents + pipeline
├── tools.py           # Battle card HTML + comparison chart tools
├── outputs/           # Generated artifacts saved here
├── requirements.txt   # Dependencies
└── README.md          # This file
```

## Generated Artifacts

All artifacts are saved to the **Artifacts tab** in ADK web and the **`outputs/`** folder:

```
outputs/
├── battle_card_20260104_143052.html         # Full battle card document
└── comparison_infographic_20260104_143105.png # AI-generated comparison visual
```

| Artifact | Format | Description |
|----------|--------|-------------|
| Battle Card | HTML | Sales-ready competitive battle card |
| Comparison Infographic | PNG/JPG | AI-generated visual comparison (Gemini image) |

---

## Battle Card Sections

The generated HTML battle card includes:

1. **Header** - Competitor name, last updated date
2. **Quick Stats** - 5-6 one-liner facts
3. **At a Glance** - Three columns: We Win | They Win | Toss-up
4. **Feature Comparison** - Table with checkmarks
5. **Their Strengths** - Red indicators (be honest!)
6. **Their Weaknesses** - Green indicators (opportunities)
7. **Objection Handling** - Top 5 with quick responses
8. **Killer Questions** - Questions to ask prospects
9. **Landmines** - Traps to set in competitive deals

---

## ADK Features Demonstrated

| Feature | Usage |
|---------|-------|
| **SequentialAgent** | 7-stage pipeline orchestration |
| **google_search** | Real-time competitor research |
| **Custom Tools** | HTML battle card, AI-generated infographics |
| **Image Generation** | Gemini image model for comparison visuals |
| **Artifacts** | Saving battle cards per session |
| **State Management** | Passing research between stages via `output_key` |
| **Coordinator Pattern** | Root agent routes to pipeline |

## Models Used

| Agent | Model | Why |
|-------|-------|-----|
| CompetitorResearch | `gemini-3-flash-preview` | Fast web search |
| ProductFeature | `gemini-3-flash-preview` | Fast web search |
| PositioningAnalyzer | `gemini-3-pro-preview` | Strategic analysis |
| SWOT | `gemini-3-pro-preview` | Deep synthesis |
| ObjectionHandler | `gemini-3-pro-preview` | Script quality |
| BattleCardGenerator | `gemini-3-flash-preview` | HTML generation |
| ComparisonChart Agent | `gemini-3-flash-preview` | Orchestration |
| Comparison Tool | `gemini-3-pro-image-preview` | Image generation |

---

## Learn More

- [Google ADK Documentation](https://google.github.io/adk-docs/)
- [Multi-Agent Patterns in ADK](https://developers.googleblog.com/developers-guide-to-multi-agent-patterns-in-adk/)
- [Gemini API](https://ai.google.dev/gemini-api/docs)

