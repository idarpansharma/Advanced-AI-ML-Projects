# 🎯 Tutorial 8: Simple Multi‑Agent Researcher (Runs with ADK)

## 🎯 What You'll Learn
- **Multi‑agent orchestration** using a coordinator agent with specialized sub‑agents
- **Sequential workflow** where agents build upon each other's outputs
- **Web search integration** for real-time research capabilities
- **Running with ADK Web** to interactively test the multi‑agent system

## 🧠 Core Concept: Multi-Agent Research Pipeline
A coordinator `LlmAgent` orchestrates three specialized agents in a sequential workflow: Research → Summarize → Critique. Each agent contributes to building a comprehensive research report.

```
User Query → Coordinator Agent
                │
                ├──▶ Research Agent (web search + analysis)
                │           │
                │           └──▶ Research Findings
                │
                ├──▶ Summarizer Agent (synthesis)
                │           │
                │           └──▶ Key Insights
                │
                └──▶ Critic Agent (quality analysis)
                            │
                            └──▶ Final Report with Recommendations
```

## 📁 Project Structure
```
8_simple_multi_agent/
├── README.md                    # This file
├── requirements.txt             # Dependencies
├── multi_agent_researcher/      # Main implementation
│   ├── agent.py                # Multi-agent system (exports root_agent)
└── .env                        # Environment variables (create this)
```

## 🚀 Getting Started

### 1. Install Dependencies
Navigate to the `8_simple_multi_agent` folder and install the required libraries:
```bash
cd 8_simple_multi_agent
pip install -r requirements.txt
```

### 2. Set Up Environment
Create a `.env` file in the `8_simple_multi_agent` folder:
```bash
# Create .env file
echo "GOOGLE_API_KEY=your_ai_studio_key_here" > .env
```

**Important**: Replace `your_ai_studio_key_here` with your actual Google AI Studio API key from [https://aistudio.google.com/](https://aistudio.google.com/)

### 3. Run with ADK Web (Recommended)
From the `8_simple_multi_agent` folder:
```bash
adk web
```

**ADK Web Setup:**
- Open the local URL printed in the terminal
- In the import section, use this path:
  ```
  framework_fundamentals.google_adk_crash_course.8_simple_multi_agent.multi_agent_researcher
  ```
- Select the `root_agent` object
- Start chatting with your multi-agent researcher!

## 🧪 Sample Prompts to Try

### **Comprehensive Research Query:**
```
Research the future of renewable energy integration in smart cities, including current technologies, implementation challenges, economic feasibility, and policy requirements. Provide a critique and suggestions.
```

### **Other Test Queries:**
```
"Research the current state of AI regulation in the European Union and its impact on business innovation"
```

```
"Investigate the latest developments in CRISPR gene editing technology and its potential applications in medicine"
```

```
"Research the effectiveness of personalized learning platforms in K-12 education, including current implementations and learning outcomes"
```

## 🔍 How It Works

### **Research Agent:**
- Conducts comprehensive web research using Google Search
- Gathers current information, trends, and developments
- Provides structured findings with sources and outlines

### **Summarizer Agent:**
- Synthesizes research into clear, actionable insights
- Creates executive summaries and key bullet points
- Identifies critical patterns and takeaways

### **Critic Agent:**
- Performs quality analysis and gap identification
- Provides risk assessment and opportunity analysis
- Gives actionable recommendations and next steps

### **Coordinator:**
- Orchestrates the entire research workflow
- Ensures proper sequence: Research → Summarize → Critique
- Integrates all outputs into a cohesive final report

## 📝 Tips for Best Results
- **Be specific** in your research queries for better agent coordination
- **Allow completion** of the full workflow for comprehensive results
- The system automatically follows the research pipeline for thorough analysis
- Each agent builds upon the previous agent's work for better insights

## 🔗 Next Steps
After mastering this tutorial, explore:
- **Tutorial 9**: Workflow Agents (Sequential, Parallel, Branching)
- **Advanced Patterns**: Custom tools and agent communication
- **Integration**: Connect with external data sources and APIs

## 🚨 Troubleshooting
- **API Key Issues**: Ensure your `.env` file is in the correct location and contains a valid `GOOGLE_API_KEY`
- **Import Errors**: Make sure you're using the exact import path shown above
- **Agent Not Found**: Verify that `root_agent` is properly exported from the module
