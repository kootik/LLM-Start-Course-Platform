

import { Difficulty, AssignmentType, Lecture, Practice, Assignment, DemoData, AgentProfile, ResourceDoc, Workflow, Diagram, CodeSnippet } from './types';

export const COURSE_STATS = {
  lectures: 8,
  practice: 7,
  assignments: 10,
  hours: '100+',
  completion: 100
};

export const LECTURES: Lecture[] = [
  { 
    id: 1, week: 1, title: "ML Foundations & Transformers", duration: "120 min", level: Difficulty.Intermediate, 
    topics: ["Linear Regression", "Neural Networks", "Attention Mechanism", "Transformer Architecture"], 
    description: "A deep dive into the mathematical foundations of Machine Learning, from scalars and matrices to the specific architecture of Transformer models used in LLMs.",
    outcomes: ["Understand scalar/vector/matrix operations", "Explain Gradient Descent", "Describe Self-Attention mechanism", "Understand Transformer block structure"],
    resources: ["01_Lecture_Theory.md", "transformer_architecture.png", "00_Module_1_Overview.md"]
  },
  { 
    id: 2, week: 1, title: "LLM Architecture", duration: "40 min", level: Difficulty.Intermediate, 
    topics: ["Encoder-Decoder", "Pre-training", "Fine-tuning"], 
    description: "Deep dive into Large Language Model specific architectures like GPT, BERT, and T5.",
    outcomes: ["Compare model families", "Understand pre-training objectives", "Scaling laws"],
    resources: ["Lecture_2_LLM_Architecture.md", "llm_models_comparison.png"]
  },
  { 
    id: 3, week: 2, title: "Prompting Techniques", duration: "40 min", level: Difficulty.Intermediate, 
    topics: ["Zero-shot", "Chain of Thought", "Prompt Optimization"], 
    description: "Master the art of communicating with models to get the best outputs.",
    outcomes: ["Write effective prompts", "Reduce hallucinations", "Structure outputs"],
    resources: ["Lecture_3_Prompting_Techniques.md", "prompting_techniques_comparison.png"]
  },
  { 
    id: 4, week: 2, title: "JavaScript & Code Block", duration: "40 min", level: Difficulty.Intermediate, 
    topics: ["Node.js Integration", "API Handling", "Async Patterns"], 
    description: "Integrating LLMs into JavaScript environments and handling structured code outputs.",
    outcomes: ["Call LLM APIs from JS", "Parse JSON responses", "Error handling"],
    resources: ["Lecture_4_JavaScript_Code_Block.md", "javascript_code_block_structure.png"]
  },
  { 
    id: 5, week: 3, title: "Databases & SQL", duration: "40 min", level: Difficulty.Advanced, 
    topics: ["Vector DBs", "SQL Generation", "Schema Design"], 
    description: "Connecting LLMs to structured and unstructured data sources.",
    outcomes: ["Text-to-SQL", "Vector storage strategies", "Hybrid search setup"],
    resources: ["Lecture_5_Databases_RAG_Qdrant.md", "database_types_comparison.png"]
  },
  { 
    id: 6, week: 3, title: "Advanced RAG", duration: "40 min", level: Difficulty.Advanced, 
    topics: ["Reranking", "Hybrid Search", "Context Window"], 
    description: "Building production-grade Retrieval Augmented Generation systems.",
    outcomes: ["Implement Rerankers", "Optimize retrieval recall", "Manage context limits"],
    resources: ["Lecture_6_Advanced_RAG_Architecture.md", "rag_system_architecture.png"]
  },
  { 
    id: 7, week: 4, title: "Agent Systems", duration: "40 min", level: Difficulty.Advanced, 
    topics: ["ReAct Paradigm", "Tool Use", "Multi-Agent Orchestration"], 
    description: "Creating autonomous agents that can reason and execute tasks.",
    outcomes: ["Build ReAct loop", "Define custom tools", "Orchestrate CrewAI"],
    resources: ["Lecture_7_Agent_Systems_ReAct.md", "react_cycle.png"]
  },
  { 
    id: 8, week: 4, title: "Production & Deployment", duration: "40 min", level: Difficulty.Expert, 
    topics: ["Docker", "Monitoring", "Cost Optimization"], 
    description: "Taking your LLM application from prototype to production at scale.",
    outcomes: ["Containerize apps", "Set up evaluation metrics", "Optimize token usage"],
    resources: ["Lecture_8_Final_Project_Production.md", "deployment_architecture.png"]
  },
];

export const PRACTICE: Practice[] = [
  { 
    id: 1, week: 1, title: "Setup n8n & First AI Agent", duration: "120 min", projectCount: 3, workflowCount: 1, 
    description: "Step-by-step guide to installing n8n via Docker and creating your first OpenAI-powered workflow.",
    outcomes: ["Install n8n via Docker", "Create Manual -> HTTP -> Set workflow", "Integrate OpenAI API", "Handle JSON responses"],
    projects: ["Docker Installation", "First LLM Workflow", "Parameter Experiments"],
    completed: true,
    guide: "02_Practice_Guide_n8n.md"
  },
  { 
    id: 2, week: 2, title: "Data Processing", duration: "60 min", projectCount: 4, workflowCount: 4, 
    description: "Advanced data manipulation and cleaning pipelines.",
    outcomes: ["JSON parsing", "Binary data handling", "Batch processing"],
    projects: ["CSV to JSON", "Web scraping", "Data cleaning"],
    completed: true,
    guide: "Practical_Lesson_2_Data_Processing_n8n.md"
  },
  { 
    id: 3, week: 3, title: "PostgreSQL + Qdrant", duration: "60 min", projectCount: 2, workflowCount: 2, 
    description: "Setting up the storage infrastructure for RAG.",
    outcomes: ["Deploy Vector DB", "Configure SQL DB", "Connect to n8n"],
    projects: ["Docker Compose setup", "Connection testing"],
    completed: true
  },
  { 
    id: 4, week: 4, title: "Hybrid RAG", duration: "60 min", projectCount: 2, workflowCount: 2, 
    description: "Building a retrieval system combining keyword and semantic search.",
    outcomes: ["Ingest pipeline", "Retrieval workflow", "Response generation"],
    projects: ["Knowledge base ingestion", "Chat interface"],
    completed: false
  },
  { 
    id: 5, week: 5, title: "RAG with Reranker", duration: "60 min", projectCount: 1, workflowCount: 1, 
    description: "Improving retrieval quality with a cross-encoder reranker step.",
    outcomes: ["Implement Cohere Rerank", "Evaluate metrics", "Tune parameters"],
    projects: ["Advanced Search Pipeline"],
    completed: false
  },
  { 
    id: 6, week: 6, title: "CrewAI Basics", duration: "60 min", projectCount: 3, workflowCount: 3, 
    description: "First steps with Python-based agent orchestration.",
    outcomes: ["Define Agents", "Define Tasks", "Run Crews"],
    projects: ["News Research Crew", "Content Writer Crew"],
    completed: false
  },
  { 
    id: 7, week: 7, title: "Agent Integrations", duration: "60 min", projectCount: 3, workflowCount: 3, 
    description: "Connecting agents to external tools and APIs.",
    outcomes: ["Custom Tools", "API Tools", "Human in the loop"],
    projects: ["Stock Analyst", "Trip Planner"],
    completed: false
  },
];

export const ASSIGNMENTS: Assignment[] = [
  { id: 1, title: "Module 1: ML & n8n Basics", type: AssignmentType.Code, difficulty: Difficulty.Intermediate, hours: 6, status: 'Not Started', description: "Implement Linear Regression/MLP from scratch and create a creative n8n workflow.", requirements: ["Python (NumPy/PyTorch)", "n8n", "Jupyter Notebook"], files: ["03_Homework_Assignments.md", "00_Module_1_Overview.md"] },
  { id: 2, title: "Module 2: LLM Experiments", type: AssignmentType.Experiments, difficulty: Difficulty.Intermediate, hours: 8, status: 'In Progress', description: "Compare temperature/top_p settings and build strict JSON validators.", requirements: ["OpenAI API", "Zod/Pydantic", "Pandas"], files: ["Homework_2_LLM_Experiments.md"] },
  { id: 10, title: "Module 2: n8n Data Pipeline", type: AssignmentType.Data, difficulty: Difficulty.Advanced, hours: 4, status: 'Not Started', description: "Create complex n8n workflows for filtering, sorting, merging, and aggregating data.", requirements: ["n8n", "JSON", "APIs"], files: ["Homework_2_Data_Processing.md"] },
  { id: 3, title: "JavaScript Validation", type: AssignmentType.Code, difficulty: Difficulty.Intermediate, hours: 6, status: 'In Progress', description: "Create a strict JSON validator for LLM outputs.", requirements: ["Zod", "TypeScript"], files: ["Homework_2_LLM_Experiments.md"] },
  { id: 4, title: "CSV Processing", type: AssignmentType.Data, difficulty: Difficulty.Intermediate, hours: 8, status: 'Not Started', description: "Build a pipeline to clean and format a large dataset for fine-tuning.", requirements: ["Pandas", "CSV"], files: ["Homework_2_LLM_Experiments.md"] },
  { id: 5, title: "Final JS Project", type: AssignmentType.Project, difficulty: Difficulty.Intermediate, hours: 7, status: 'Not Started', description: "Full stack chat application with history.", requirements: ["React", "Node.js"], files: ["project_spec.pdf"] },
  { id: 6, title: "SQL & PostgreSQL", type: AssignmentType.Database, difficulty: Difficulty.Expert, hours: 10, status: 'Not Started', description: "Complex text-to-SQL generation and query optimization.", requirements: ["PostgreSQL", "pgvector"], files: ["schema.sql"] },
  { id: 7, title: "RAG Evaluation", type: AssignmentType.Metrics, difficulty: Difficulty.Expert, hours: 10, status: 'Not Started', description: "Evaluate your RAG pipeline using Ragas metrics.", requirements: ["Ragas", "LangChain"], files: ["eval_dataset.json"] },
  { id: 8, title: "Agent Specification", type: AssignmentType.Design, difficulty: Difficulty.Expert, hours: 8, status: 'Not Started', description: "Design the architecture for a multi-agent customer support system.", requirements: ["Diagramming Tool"], files: ["template.drawio"] },
  { id: 9, title: "Agent Testing", type: AssignmentType.Testing, difficulty: Difficulty.Expert, hours: 8, status: 'Not Started', description: "Write unit and integration tests for agent tools.", requirements: ["PyTest"], files: ["agent_test_suite.py"] },
];

export const DEMOS: DemoData[] = [
  {
    id: 1,
    title: "Vector Embeddings",
    concept: "Semantic similarity search using cosine distance to find related documents.",
    input: "Query: \"What is deep learning?\"",
    process: "Text -> Embedding (1536 dim) -> Cosine Similarity",
    output: "Returns top-3 semantically similar documents regardless of keywords.",
    insight: "Cosine similarity effectively finds similar documents even without matching keywords.",
    rating: 5,
    ranking: [
      { rank: 1, text: "Neural networks have multiple layers", score: 0.9017, relevance: "High" },
      { rank: 2, text: "Python is a programming language", score: 0.8673, relevance: "High" },
      { rank: 3, text: "Machine learning is a subset of AI", score: 0.6695, relevance: "Medium" }
    ]
  },
  {
    id: 2,
    title: "RAG Metrics",
    concept: "Evaluating retrieval quality with Recall, Precision, and MRR.",
    input: "Tech Support Knowledge Base Evaluation",
    process: "Retrieval -> Ragas Evaluation Framework",
    output: "System shows high recall but needs precision optimization.",
    insight: "High recall (67%) but low precision (40%) means too much noise in context.",
    rating: 5,
    metrics: [
      { label: "Recall", value: 67, color: "#32B8C6", suffix: "%" }, 
      { label: "Precision", value: 40, color: "#F59E0B", suffix: "%" }, 
      { label: "MRR", value: 1.0, color: "#22C55E", suffix: "" }
    ]
  },
  {
    id: 3,
    title: "Architecture Comparison",
    concept: "Comparing Vanilla RAG vs Hybrid vs Reranker approaches.",
    input: "Complex Query Set (50 items)",
    process: "Execute queries across 3 architectures",
    output: "Reranker adds latency but drastically improves quality.",
    insight: "Rerankers provide a +62.5% quality improvement for a small latency cost.",
    rating: 4,
    metrics: [
      { label: "Vanilla", value: 45, color: "#9CA3AF", suffix: "% Acc" }, 
      { label: "Hybrid", value: 68, color: "#F59E0B", suffix: "% Acc" },
      { label: "Reranker", value: 89, color: "#32B8C6", suffix: "% Acc" }
    ]
  },
  {
    id: 4,
    title: "ReAct Agent",
    concept: "Reasoning and Acting loop to solve complex multi-step problems.",
    input: "Calculate potential profit of Product X",
    process: "Thought -> Action -> Observation Loop",
    output: "Final answer derived after 3 iterations.",
    insight: "Iterative reasoning allows agents to solve tasks they weren't explicitly trained for.",
    rating: 5,
    steps: [
      { step: "Thought 1", detail: "I need to find the current price of Product X.", status: "complete" },
      { step: "Action 1", detail: "Search: 'Product X price'", status: "complete" },
      { step: "Observation 1", detail: "Price is $45.50", status: "complete" },
      { step: "Thought 2", detail: "Now I need units sold. Search sales data.", status: "active" }
    ]
  },
  {
    id: 5,
    title: "Chunking Strategies",
    concept: "Fixed vs Semantic vs Structure based document splitting.",
    input: "Technical Manual (100 pages)",
    process: "Split document using 3 different strategies",
    output: "Structure chunking maintained context best.",
    insight: "Semantic chunking is slower but preserves meaning better for RAG.",
    rating: 4,
    metrics: [
      { label: "Fixed", value: 40, color: "#DC2626", suffix: "Score" }, 
      { label: "Semantic", value: 88, color: "#22C55E", suffix: "Score" },
      { label: "Recursive", value: 65, color: "#F59E0B", suffix: "Score" }
    ]
  },
  {
    id: 6,
    title: "Multi-Agent System",
    concept: "Specialized agents working together (Researcher -> Analyst -> Advisor).",
    input: "Create 10-year financial plan",
    process: "Sequential Task Execution",
    output: "Comprehensive report with projections.",
    insight: "Agent specialization leads to higher quality outputs than a single generalist model.",
    rating: 5,
    metrics: [
      { label: "Single Agent", value: 15, color: "#9CA3AF", suffix: "Profit" }, 
      { label: "Multi-Agent", value: 115, color: "#32B8C6", suffix: "Profit" }
    ]
  }
];

export const AGENTS: AgentProfile[] = [
  {
    name: "Simple Research Agent",
    role: "Researcher",
    goal: "Find accurate information from verified sources",
    tools: ["Web Search", "Wikipedia"],
    codeSnippet: "agent = Agent(\n  role='Researcher',\n  goal='Find accurate info',\n  tools=[search_tool],\n  verbose=True\n)"
  },
  {
    name: "Multi-Agent Team",
    role: "Team Lead",
    goal: "Coordinate Researcher, Analyst, and Writer",
    tools: ["DelegationTool", "ReviewTool"],
    codeSnippet: "crew = Crew(\n  agents=[researcher, analyst, writer],\n  tasks=[task1, task2],\n  process=Process.sequential\n)"
  },
  {
    name: "Telegram Notifier",
    role: "Notification Manager",
    goal: "Send critical alerts to Telegram channel",
    tools: ["TelegramAPI", "FilterTool"],
    codeSnippet: "agent = Agent(\n  role='Notifier',\n  goal='Send alerts',\n  tools=[telegram_tool],\n  allow_delegation=False\n)"
  },
  {
    name: "CRM Agent",
    role: "Customer Relations",
    goal: "Analyze tickets and update CRM database",
    tools: ["PostgreSQL", "TicketAPI"],
    codeSnippet: "agent = Agent(\n  role='CRM Manager',\n  goal='Update records',\n  tools=[db_tool, ticket_tool],\n  verbose=True\n)"
  },
  {
    name: "Financial Advisor",
    role: "Investment Analyst",
    goal: "Provide data-backed investment recommendations",
    tools: ["StockAPI", "Calculator"],
    codeSnippet: "agent = Agent(\n  role='Analyst',\n  goal='Analyze stocks',\n  tools=[finance_tool],\n  verbose=True\n)"
  },
  {
    name: "Email Campaign Manager",
    role: "Marketing Manager",
    goal: "Create and schedule personalized email campaigns",
    tools: ["EmailAPI", "TemplateEngine"],
    codeSnippet: "agent = Agent(\n  role='Marketer',\n  goal='Send campaigns',\n  tools=[email_tool],\n  verbose=True\n)"
  }
];

export const RESOURCES_DOCS: ResourceDoc[] = [
  // Module 1 (New)
  { id: 22, name: "00_Module_1_Overview.md", category: "Resources", size: "4 KB", type: "MD", downloads: "50", lastUpdated: "2025-11-30" },
  { id: 23, name: "01_Lecture_Theory.md", category: "Lectures", size: "15 KB", type: "MD", downloads: "120", lastUpdated: "2025-11-30" },
  { id: 24, name: "02_Practice_Guide_n8n.md", category: "Practice", size: "12 KB", type: "MD", downloads: "110", lastUpdated: "2025-11-30" },
  { id: 25, name: "03_Homework_Assignments.md", category: "Assignments", size: "8 KB", type: "MD", downloads: "95", lastUpdated: "2025-11-30" },
  // Module 2 (New)
  { id: 26, name: "Homework_2_LLM_Experiments.md", category: "Assignments", size: "10 KB", type: "MD", downloads: "50", lastUpdated: "2025-12-01" },
  { id: 27, name: "Homework_2_Data_Processing.md", category: "Assignments", size: "6 KB", type: "MD", downloads: "40", lastUpdated: "2025-12-01" },

  // Lectures
  { id: 1, name: "Lecture_1_Transformer_Basics.md", category: "Lectures", size: "45 KB", type: "MD", downloads: "1.2K", lastUpdated: "2025-11-24" },
  { id: 2, name: "Lecture_2_LLM_Architecture.md", category: "Lectures", size: "32 KB", type: "MD", downloads: "980", lastUpdated: "2025-11-24" },
  { id: 3, name: "Lecture_3_Prompting_Techniques.md", category: "Lectures", size: "28 KB", type: "MD", downloads: "1.5K", lastUpdated: "2025-11-25" },
  { id: 4, name: "Lecture_4_JavaScript_Code_Block.md", category: "Lectures", size: "35 KB", type: "MD", downloads: "1.1K", lastUpdated: "2025-11-25" },
  { id: 5, name: "Lecture_5_Databases_RAG_Qdrant.md", category: "Lectures", size: "42 KB", type: "MD", downloads: "1.0K", lastUpdated: "2025-11-26" },
  { id: 6, name: "Lecture_6_Advanced_RAG_Architecture.md", category: "Lectures", size: "38 KB", type: "MD", downloads: "1.3K", lastUpdated: "2025-11-27" },
  { id: 7, name: "Lecture_7_Agent_Systems_ReAct.md", category: "Lectures", size: "55 KB", type: "MD", downloads: "1.0K", lastUpdated: "2025-11-28" },
  { id: 8, name: "Lecture_8_Final_Project_Production.md", category: "Lectures", size: "48 KB", type: "MD", downloads: "900", lastUpdated: "2025-11-28" },
  // Practice
  { id: 9, name: "Practical_Lesson_1_n8n.md", category: "Practice", size: "12 KB", type: "MD", downloads: "850", lastUpdated: "2025-11-26" },
  { id: 10, name: "Practical_Lesson_2_Data_Processing_n8n.md", category: "Practice", size: "1.5 MB", type: "PDF", downloads: "800", lastUpdated: "2025-11-26" },
  { id: 11, name: "Practical_Lessons_4_7_RAG_Agents.md", category: "Practice", size: "2.1 MB", type: "PDF", downloads: "750", lastUpdated: "2025-11-27" },
  // Assignments
  { id: 12, name: "Homework_1_2_Complete.md", category: "Assignments", size: "15 KB", type: "MD", downloads: "1.1K", lastUpdated: "2025-11-27" },
  { id: 13, name: "Homework_3_4_5_JavaScript_Integration.md", category: "Assignments", size: "22 KB", type: "MD", downloads: "980", lastUpdated: "2025-11-27" },
  { id: 14, name: "Homework_6_7_SQL_RAG.md", category: "Assignments", size: "18 KB", type: "MD", downloads: "950", lastUpdated: "2025-11-27" },
  { id: 15, name: "Homework_8_9_Agents.md", category: "Assignments", size: "20 KB", type: "MD", downloads: "900", lastUpdated: "2025-11-28" },
  // Resources
  { id: 16, name: "Course_Summary_Index.md", category: "Resources", size: "8 KB", type: "MD", downloads: "3.0K", lastUpdated: "2025-11-29" },
  { id: 17, name: "SQL_Cheatsheet.md", category: "Resources", size: "12 KB", type: "MD", downloads: "2.3K", lastUpdated: "2025-11-20" },
  { id: 18, name: "Quick_Gemini_Prompt.md", category: "Resources", size: "5 KB", type: "MD", downloads: "500", lastUpdated: "2025-11-22" },
  { id: 19, name: "Gemini_Complete_Prompt.md", category: "Resources", size: "7 KB", type: "MD", downloads: "450", lastUpdated: "2025-11-22" },
  { id: 20, name: "Option_2_Visualizations_Guide.md", category: "Resources", size: "25 KB", type: "MD", downloads: "600", lastUpdated: "2025-11-29" },
  { id: 21, name: "Option_3_Ready_Workflows.md", category: "Resources", size: "15 KB", type: "MD", downloads: "550", lastUpdated: "2025-11-29" },
];

export const WORKFLOWS: Workflow[] = [
  // 1. Orders Filter and Sort
  { 
    id: 1, 
    title: "Orders Filter & Sort", 
    description: "Filters orders > $75 and sorts by amount (descending). Use for Lecture 2.", 
    nodes: 4, 
    complexity: "Low", 
    category: "Basic",
    n8nCode: `{\n  "name": "Orders Filter and Sort",\n  "nodes": [\n    {\n      "parameters": {},\n      "name": "Manual Trigger",\n      "type": "n8n-nodes-base.manualTrigger",\n      "typeVersion": 1,\n      "position": [250, 300]\n    },\n    {\n      "parameters": {\n        "options": {},\n        "conditions": {\n          "number": [\n            {\n              "value1": "{{ $json.amount }}",\n              "operation": "greater",\n              "value2": 75\n            }\n          ]\n        }\n      },\n      "name": "Filter Amount > 75",\n      "type": "n8n-nodes-base.filter",\n      "typeVersion": 1,\n      "position": [450, 300]\n    },\n    {\n      "parameters": {\n        "sortBy": {\n          "fields": [\n            {\n              "name": "amount",\n              "direction": "desc"\n            }\n          ]\n        }\n      },\n      "name": "Sort by Amount DESC",\n      "type": "n8n-nodes-base.sort",\n      "typeVersion": 1,\n      "position": [650, 300]\n    },\n    {\n      "parameters": {\n        "mode": "combine",\n        "options": {}\n      },\n      "name": "Set Result",\n      "type": "n8n-nodes-base.set",\n      "typeVersion": 3,\n      "position": [850, 300],\n      "fields": {\n        "assignments": {\n          "assignments": [\n            {\n              "name": "filtered_orders",\n              "value": "{{ $json }}"\n            }\n          ]\n        }\n      }\n    }\n  ],\n  "connections": {\n    "Manual Trigger": {\n      "main": [\n        [\n          {\n            "node": "Filter Amount > 75",\n            "type": "main",\n            "index": 0\n          }\n        ]\n      ]\n    },\n    "Filter Amount > 75": {\n      "main": [\n        [\n          {\n            "node": "Sort by Amount DESC",\n            "type": "main",\n            "index": 0\n          }\n        ]\n      ]\n    },\n    "Sort by Amount DESC": {\n      "main": [\n        [\n          {\n            "node": "Set Result",\n            "type": "main",\n            "index": 0\n          }\n        ]\n      ]\n    }\n  }\n}`,
    structure: {
      nodes: [
        { id: '1', type: 'trigger', label: 'Manual Trigger', position: { x: 250, y: 300 }, status: 'idle' },
        { id: '2', type: 'logic', label: 'Filter > 75', position: { x: 450, y: 300 }, status: 'idle' },
        { id: '3', type: 'action', label: 'Sort Amount', position: { x: 650, y: 300 }, status: 'idle' },
        { id: '4', type: 'end', label: 'Set Result', position: { x: 850, y: 300 }, status: 'idle' }
      ],
      edges: [
        { id: 'e1-2', source: '1', target: '2' },
        { id: 'e2-3', source: '2', target: '3' },
        { id: 'e3-4', source: '3', target: '4' }
      ]
    }
  },
  // 2. Combine User and Order Data
  { 
    id: 2, 
    title: "Combine User & Order", 
    description: "Merges data from User API and Order API into a single object.", 
    nodes: 5, 
    complexity: "Medium", 
    category: "Integration",
    n8nCode: `{\n  "name": "Combine User and Order Data",\n  "nodes": [\n    {\n      "parameters": {},\n      "name": "Manual Trigger",\n      "type": "n8n-nodes-base.manualTrigger",\n      "typeVersion": 1,\n      "position": [250, 200]\n    },\n    {\n      "parameters": {\n        "method": "GET",\n        "url": "https://jsonplaceholder.typicode.com/users/1"\n      },\n      "name": "Get User",\n      "type": "n8n-nodes-base.httpRequest",\n      "typeVersion": 4,\n      "position": [450, 100]\n    },\n    {\n      "parameters": {\n        "method": "GET",\n        "url": "https://jsonplaceholder.typicode.com/posts?userId=1"\n      },\n      "name": "Get Posts",\n      "type": "n8n-nodes-base.httpRequest",\n      "typeVersion": 4,\n      "position": [450, 300]\n    },\n    {\n      "parameters": {\n        "mode": "combine"\n      },\n      "name": "Merge Data",\n      "type": "n8n-nodes-base.merge",\n      "typeVersion": 1,\n      "position": [650, 200]\n    },\n    {\n      "parameters": {\n        "mode": "combine",\n        "options": {}\n      },\n      "name": "Set Combined",\n      "type": "n8n-nodes-base.set",\n      "typeVersion": 3,\n      "position": [850, 200],\n      "fields": {\n        "assignments": {\n          "assignments": [\n            {\n              "name": "user_info",\n              "value": "{{ $json[0] }}"\n            },\n            {\n              "name": "posts_count",\n              "value": "{{ $json[1].length }}"\n            }\n          ]\n        }\n      }\n    }\n  ],\n  "connections": {\n    "Manual Trigger": {\n      "main": [\n        [\n          {"node": "Get User", "type": "main", "index": 0},\n          {"node": "Get Posts", "type": "main", "index": 0}\n        ]\n      ]\n    },\n    "Get User": {\n      "main": [\n        [\n          {"node": "Merge Data", "type": "main", "index": 0}\n        ]\n      ]\n    },\n    "Get Posts": {\n      "main": [\n        [\n          {"node": "Merge Data", "type": "main", "index": 1}\n        ]\n      ]\n    },\n    "Merge Data": {\n      "main": [\n        [\n          {"node": "Set Combined", "type": "main", "index": 0}\n        ]\n      ]\n    }\n  }\n}`,
    structure: {
        nodes: [
            { id: '1', type: 'trigger', label: 'Manual Trigger', position: { x: 250, y: 200 }, status: 'idle' },
            { id: '2', type: 'action', label: 'Get User', position: { x: 450, y: 100 }, status: 'idle' },
            { id: '3', type: 'action', label: 'Get Posts', position: { x: 450, y: 300 }, status: 'idle' },
            { id: '4', type: 'logic', label: 'Merge Data', position: { x: 650, y: 200 }, status: 'idle' },
            { id: '5', type: 'end', label: 'Set Combined', position: { x: 850, y: 200 }, status: 'idle' }
        ],
        edges: [
            { id: 'e1-2', source: '1', target: '2' },
            { id: 'e1-3', source: '1', target: '3' },
            { id: 'e2-4', source: '2', target: '4' },
            { id: 'e3-4', source: '3', target: '4' },
            { id: 'e4-5', source: '4', target: '5' }
        ]
    }
  },
  // 3. Validate Email Addresses
  { 
    id: 3, 
    title: "Validate Email Addresses", 
    description: "Uses JavaScript code node to validate email format via Regex.", 
    nodes: 2, 
    complexity: "Low", 
    category: "Basic",
    n8nCode: `{\n  "name": "Validate Email Addresses",\n  "nodes": [\n    {\n      "parameters": {},\n      "name": "Manual Trigger",\n      "type": "n8n-nodes-base.manualTrigger",\n      "typeVersion": 1,\n      "position": [250, 300]\n    },\n    {\n      "parameters": {\n        "jsCode": "const data = $input.first().json;\\n\\nconst validateEmail = (email) => {\\n  const regex = /^[^\\\\s@]+@[^\\\\s@]+\\\\.[^\\\\s@]+$/;\\n  return regex.test(email);\\n};\\n\\nconst results = data.emails.map(email => ({\\n  email: email,\\n  is_valid: validateEmail(email),\\n  domain: email.includes('@') ? email.split('@')[1] : 'N/A'\\n}));\\n\\nreturn results;"\n      },\n      "name": "Validate Emails Code",\n      "type": "n8n-nodes-base.code",\n      "typeVersion": 2,\n      "position": [450, 300]\n    }\n  ],\n  "connections": {\n    "Manual Trigger": {\n      "main": [\n        [\n          {\n            "node": "Validate Emails Code",\n            "type": "main",\n            "index": 0\n          }\n        ]\n      ]\n    }\n  }\n}`,
    structure: {
        nodes: [
            { id: '1', type: 'trigger', label: 'Manual Trigger', position: { x: 250, y: 300 }, status: 'idle' },
            { id: '2', type: 'action', label: 'Validate JS Code', position: { x: 450, y: 300 }, status: 'idle' }
        ],
        edges: [
            { id: 'e1-2', source: '1', target: '2' }
        ]
    }
  },
  // 4. Transform Orders with Tax
  { 
    id: 4, 
    title: "Transform Orders (Tax)", 
    description: "Calculates subtotal, tax (10%), and total for order items using Code Node.", 
    nodes: 2, 
    complexity: "Medium", 
    category: "Basic",
    n8nCode: `{\n  "name": "Transform Orders with Tax Calculation",\n  "nodes": [\n    {\n      "parameters": {},\n      "name": "Manual Trigger",\n      "type": "n8n-nodes-base.manualTrigger",\n      "typeVersion": 1,\n      "position": [250, 300]\n    },\n    {\n      "parameters": {\n        "jsCode": "const data = $input.first().json;\\n\\nconst TAX_RATE = 0.1; // 10%\\n\\nconst transformed = data.orders.map(order => {\\n  const subtotal = order.price * order.qty;\\n  const tax = subtotal * TAX_RATE;\\n  const total = subtotal + tax;\\n  \\n  return {\\n    order_id: order.id,\\n    product: order.product.toUpperCase(),\\n    subtotal: parseFloat(subtotal.toFixed(2)),\\n    tax: parseFloat(tax.toFixed(2)),\\n    total: parseFloat(total.toFixed(2)),\\n    quantity: order.qty,\\n    price_per_unit: order.price\\n  };\\n});\\n\\nreturn transformed;"\n      },\n      "name": "Transform with Tax Code",\n      "type": "n8n-nodes-base.code",\n      "typeVersion": 2,\n      "position": [450, 300]\n    }\n  ],\n  "connections": {\n    "Manual Trigger": {\n      "main": [\n        [\n          {\n            "node": "Transform with Tax Code",\n            "type": "main",\n            "index": 0\n          }\n        ]\n      ]\n    }\n  }\n}`,
    structure: {
        nodes: [
            { id: '1', type: 'trigger', label: 'Manual Trigger', position: { x: 250, y: 300 }, status: 'idle' },
            { id: '2', type: 'action', label: 'Calc Tax Code', position: { x: 450, y: 300 }, status: 'idle' }
        ],
        edges: [
            { id: 'e1-2', source: '1', target: '2' }
        ]
    }
  },
  // 5. Calculate Sales Statistics
  { 
    id: 5, 
    title: "Calculate Sales Stats", 
    description: "Aggregates sales by category and calculates averages/totals via Code.", 
    nodes: 2, 
    complexity: "Medium", 
    category: "Basic",
    n8nCode: `{\n  "name": "Calculate Sales Statistics",\n  "nodes": [\n    {\n      "parameters": {},\n      "name": "Manual Trigger",\n      "type": "n8n-nodes-base.manualTrigger",\n      "typeVersion": 1,\n      "position": [250, 300]\n    },\n    {\n      "parameters": {\n        "jsCode": "const data = $input.first().json;\\n\\n// Group by category\\nconst byCategory = data.sales.reduce((acc, sale) => {\\n  if (!acc[sale.category]) {\\n    acc[sale.category] = { category: sale.category, total: 0, count: 0 };\\n  }\\n  acc[sale.category].total += sale.amount;\\n  acc[sale.category].count++;\\n  return acc;\\n}, {});\\n\\n// Convert to array and add average\\nconst categoryStats = Object.values(byCategory).map(cat => ({\\n  ...cat,\\n  average: parseFloat((cat.total / cat.count).toFixed(2))\\n}));\\n\\n// Overall stats\\nconst total = data.sales.reduce((sum, s) => sum + s.amount, 0);\\nconst average = parseFloat((total / data.sales.length).toFixed(2));\\n\\nreturn {\\n  by_category: categoryStats,\\n  overall: {\\n    total_sales: total,\\n    number_of_sales: data.sales.length,\\n    average_sale: average\\n  }\\n};"\n      },\n      "name": "Aggregate Statistics Code",\n      "type": "n8n-nodes-base.code",\n      "typeVersion": 2,\n      "position": [450, 300]\n    }\n  ],\n  "connections": {\n    "Manual Trigger": {\n      "main": [\n        [\n          {\n            "node": "Aggregate Statistics Code",\n            "type": "main",\n            "index": 0\n          }\n        ]\n      ]\n    }\n  }\n}`,
    structure: {
        nodes: [
            { id: '1', type: 'trigger', label: 'Manual Trigger', position: { x: 250, y: 300 }, status: 'idle' },
            { id: '2', type: 'action', label: 'Agg Stats Code', position: { x: 450, y: 300 }, status: 'idle' }
        ],
        edges: [
            { id: 'e1-2', source: '1', target: '2' }
        ]
    }
  },
  // 6. ChatGPT Simple Chat
  { 
    id: 6, 
    title: "ChatGPT Simple Chat", 
    description: "Sends a question to OpenAI API and extracts the answer.", 
    nodes: 3, 
    complexity: "Medium", 
    category: "RAG",
    n8nCode: `{\n  "name": "ChatGPT Simple Chat",\n  "nodes": [\n    {\n      "parameters": {},\n      "name": "Manual Trigger",\n      "type": "n8n-nodes-base.manualTrigger",\n      "typeVersion": 1,\n      "position": [250, 300]\n    },\n    {\n      "parameters": {\n        "method": "POST",\n        "url": "https://api.openai.com/v1/chat/completions",\n        "headers": {\n          "Authorization": "Bearer YOUR_OPENAI_API_KEY",\n          "Content-Type": "application/json"\n        },\n        "sendBody": true,\n        "bodyParameters": {\n          "parameters": [\n            {\n              "name": "model",\n              "value": "gpt-4"\n            },\n            {\n              "name": "temperature",\n              "value": "0.7"\n            },\n            {\n              "name": "max_tokens",\n              "value": "200"\n            }\n          ],\n          "json": {\n            "messages": [\n              {\n                "role": "system",\n                "content": "You are a helpful assistant."\n              },\n              {\n                "role": "user",\n                "content": "{{ $json.question }}"\n              }\n            ]\n          }\n        }\n      },\n      "name": "Call ChatGPT",\n      "type": "n8n-nodes-base.httpRequest",\n      "typeVersion": 4,\n      "position": [450, 300]\n    },\n    {\n      "parameters": {\n        "mode": "combine",\n        "options": {}\n      },\n      "name": "Extract Response",\n      "type": "n8n-nodes-base.set",\n      "typeVersion": 3,\n      "position": [650, 300],\n      "fields": {\n        "assignments": {\n          "assignments": [\n            {\n              "name": "answer",\n              "value": "{{ $json.choices[0].message.content }}"\n            },\n            {\n              "name": "tokens_used",\n              "value": "{{ $json.usage.total_tokens }}"\n            }\n          ]\n        }\n      }\n    }\n  ],\n  "connections": {\n    "Manual Trigger": {\n      "main": [\n        [\n          {\n            "node": "Call ChatGPT",\n            "type": "main",\n            "index": 0\n          }\n        ]\n      ]\n    },\n    "Call ChatGPT": {\n      "main": [\n        [\n          {\n            "node": "Extract Response",\n            "type": "main",\n            "index": 0\n          }\n        ]\n      ]\n    }\n  }\n}`,
    structure: {
        nodes: [
            { id: '1', type: 'trigger', label: 'Manual Trigger', position: { x: 250, y: 300 }, status: 'idle' },
            { id: '2', type: 'action', label: 'Call ChatGPT', position: { x: 450, y: 300 }, status: 'idle' },
            { id: '3', type: 'end', label: 'Extract Answer', position: { x: 650, y: 300 }, status: 'idle' }
        ],
        edges: [
            { id: 'e1-2', source: '1', target: '2' },
            { id: 'e2-3', source: '2', target: '3' }
        ]
    }
  },
  // 7. Batch Process Data
  { 
    id: 7, 
    title: "Batch Process Data", 
    description: "Splits large datasets into smaller batches for processing loops.", 
    nodes: 3, 
    complexity: "Medium", 
    category: "Basic",
    n8nCode: `{\n  "name": "Batch Process Data",\n  "nodes": [\n    {\n      "parameters": {},\n      "name": "Manual Trigger",\n      "type": "n8n-nodes-base.manualTrigger",\n      "typeVersion": 1,\n      "position": [250, 300]\n    },\n    {\n      "parameters": {\n        "jsCode": "const data = $input.first().json;\\nconst batchSize = 2;\\n\\nconst batches = [];\\nfor (let i = 0; i < data.items.length; i += batchSize) {\\n  batches.push({\\n    batch_id: Math.floor(i / batchSize) + 1,\\n    items: data.items.slice(i, i + batchSize),\\n    count: Math.min(batchSize, data.items.length - i)\\n  });\\n}\\n\\nreturn batches;"\n      },\n      "name": "Create Batches Code",\n      "type": "n8n-nodes-base.code",\n      "typeVersion": 2,\n      "position": [450, 300]\n    },\n    {\n      "parameters": {\n        "splitIntoItems": true\n      },\n      "name": "Split Batches",\n      "type": "n8n-nodes-base.splitInBatches",\n      "typeVersion": 1,\n      "position": [650, 300]\n    }\n  ],\n  "connections": {\n    "Manual Trigger": {\n      "main": [\n        [\n          {\n            "node": "Create Batches Code",\n            "type": "main",\n            "index": 0\n          }\n        ]\n      ]\n    },\n    "Create Batches Code": {\n      "main": [\n        [\n          {\n            "node": "Split Batches",\n            "type": "main",\n            "index": 0\n          }\n        ]\n      ]\n    }\n  }\n}`,
    structure: {
        nodes: [
            { id: '1', type: 'trigger', label: 'Manual Trigger', position: { x: 250, y: 300 }, status: 'idle' },
            { id: '2', type: 'action', label: 'Create Batches', position: { x: 450, y: 300 }, status: 'idle' },
            { id: '3', type: 'logic', label: 'Split Loop', position: { x: 650, y: 300 }, status: 'idle' }
        ],
        edges: [
            { id: 'e1-2', source: '1', target: '2' },
            { id: 'e2-3', source: '2', target: '3' }
        ]
    }
  },
  // 8. Conditional Order Processing
  { 
    id: 8, 
    title: "Conditional Order Logic", 
    description: "Branching logic (IF node) to handle High Priority vs Normal orders.", 
    nodes: 4, 
    complexity: "Medium", 
    category: "Basic",
    n8nCode: `{\n  "name": "Conditional Order Processing",\n  "nodes": [\n    {\n      "parameters": {},\n      "name": "Manual Trigger",\n      "type": "n8n-nodes-base.manualTrigger",\n      "typeVersion": 1,\n      "position": [250, 300]\n    },\n    {\n      "parameters": {\n        "conditions": {\n          "booleanProperties": [],\n          "number": [\n            {\n              "value1": "{{ $json.amount }}",\n              "operation": "greater",\n              "value2": 1000\n            }\n          ]\n        }\n      },\n      "name": "Is Amount > 1000?",\n      "type": "n8n-nodes-base.if",\n      "typeVersion": 1,\n      "position": [450, 300]\n    },\n    {\n      "parameters": {\n        "mode": "combine",\n        "options": {}\n      },\n      "name": "Priority High",\n      "type": "n8n-nodes-base.set",\n      "typeVersion": 3,\n      "position": [650, 100],\n      "fields": {\n        "assignments": {\n          "assignments": [\n            {\n              "name": "priority",\n              "value": "HIGH"\n            },\n            {\n              "name": "notification",\n              "value": "Alert management"\n            }\n          ]\n        }\n      }\n    },\n    {\n      "parameters": {\n        "mode": "combine",\n        "options": {}\n      },\n      "name": "Priority Normal",\n      "type": "n8n-nodes-base.set",\n      "typeVersion": 3,\n      "position": [650, 500],\n      "fields": {\n        "assignments": {\n          "assignments": [\n            {\n              "name": "priority",\n              "value": "NORMAL"\n            },\n            {\n              "name": "notification",\n              "value": "Process regularly"\n            }\n          ]\n        }\n      }\n    }\n  ],\n  "connections": {\n    "Manual Trigger": {\n      "main": [\n        [\n          {\n            "node": "Is Amount > 1000?",\n            "type": "main",\n            "index": 0\n          }\n        ]\n      ]\n    },\n    "Is Amount > 1000?": {\n      "main": [\n        [\n          {\n            "node": "Priority High",\n            "type": "main",\n            "index": 0\n          }\n        ],\n        [\n          {\n            "node": "Priority Normal",\n            "type": "main",\n            "index": 0\n          }\n        ]\n      ]\n    }\n  }\n}`,
    structure: {
        nodes: [
            { id: '1', type: 'trigger', label: 'Manual Trigger', position: { x: 250, y: 300 }, status: 'idle' },
            { id: '2', type: 'logic', label: 'IF > 1000', position: { x: 450, y: 300 }, status: 'idle' },
            { id: '3', type: 'action', label: 'Set HIGH', position: { x: 650, y: 100 }, status: 'idle' },
            { id: '4', type: 'action', label: 'Set NORMAL', position: { x: 650, y: 500 }, status: 'idle' }
        ],
        edges: [
            { id: 'e1-2', source: '1', target: '2' },
            { id: 'e2-3', source: '2', target: '3', label: 'True' },
            { id: 'e2-4', source: '2', target: '4', label: 'False' }
        ]
    }
  },
  // 9. Real-world Order Processing
  { 
    id: 9, 
    title: "Real-world Order Processing", 
    description: "Complex flow: Fetch -> Validate -> Filter -> Sort -> Limit.", 
    nodes: 5, 
    complexity: "High", 
    category: "Integration",
    n8nCode: `{\n  "name": "Real-world Order Processing",\n  "nodes": [\n    {\n      "parameters": {},\n      "name": "Manual Trigger",\n      "type": "n8n-nodes-base.manualTrigger",\n      "typeVersion": 1,\n      "position": [250, 300]\n    },\n    {\n      "parameters": {\n        "method": "GET",\n        "url": "https://jsonplaceholder.typicode.com/comments?postId=1"\n      },\n      "name": "Fetch Orders",\n      "type": "n8n-nodes-base.httpRequest",\n      "typeVersion": 4,\n      "position": [450, 300]\n    },\n    {\n      "parameters": {\n        "jsCode": "const data = $input.first().json;\\n\\nconst validated = data.map(item => ({\\n  id: item.id,\\n  name: item.name || 'Unknown',\\n  email: item.email || 'N/A',\\n  is_valid: item.email && item.email.includes('@')\\n}));\\n\\nreturn validated.filter(item => item.is_valid);"\n      },\n      "name": "Validate and Filter Code",\n      "type": "n8n-nodes-base.code",\n      "typeVersion": 2,\n      "position": [650, 300]\n    },\n    {\n      "parameters": {\n        "sortBy": {\n          "fields": [\n            {\n              "name": "id",\n              "direction": "asc"\n            }\n          ]\n        }\n      },\n      "name": "Sort by ID",\n      "type": "n8n-nodes-base.sort",\n      "typeVersion": 1,\n      "position": [850, 300]\n    },\n    {\n      "parameters": {\n        "maxItems": 5\n      },\n      "name": "Limit to 5",\n      "type": "n8n-nodes-base.limit",\n      "typeVersion": 1,\n      "position": [1050, 300]\n    }\n  ],\n  "connections": {\n    "Manual Trigger": {\n      "main": [\n        [\n          {\n            "node": "Fetch Orders",\n            "type": "main",\n            "index": 0\n          }\n        ]\n      ]\n    },\n    "Fetch Orders": {\n      "main": [\n        [\n          {\n            "node": "Validate and Filter Code",\n            "type": "main",\n            "index": 0\n          }\n        ]\n      ]\n    },\n    "Validate and Filter Code": {\n      "main": [\n        [\n          {\n            "node": "Sort by ID",\n            "type": "main",\n            "index": 0\n          }\n        ]\n      ]\n    },\n    "Sort by ID": {\n      "main": [\n        [\n          {\n            "node": "Limit to 5",\n            "type": "main",\n            "index": 0\n          }\n        ]\n      ]\n    }\n  }\n}`,
    structure: {
        nodes: [
            { id: '1', type: 'trigger', label: 'Manual Trigger', position: { x: 250, y: 300 }, status: 'idle' },
            { id: '2', type: 'action', label: 'Fetch Orders', position: { x: 450, y: 300 }, status: 'idle' },
            { id: '3', type: 'action', label: 'Validate Code', position: { x: 650, y: 300 }, status: 'idle' },
            { id: '4', type: 'action', label: 'Sort ID', position: { x: 850, y: 300 }, status: 'idle' },
            { id: '5', type: 'end', label: 'Limit 5', position: { x: 1050, y: 300 }, status: 'idle' }
        ],
        edges: [
            { id: 'e1-2', source: '1', target: '2' },
            { id: 'e2-3', source: '2', target: '3' },
            { id: 'e3-4', source: '3', target: '4' },
            { id: 'e4-5', source: '4', target: '5' }
        ]
    }
  },
  // 10. LLM Prompt Comparison
  { 
    id: 10, 
    title: "LLM Prompt Comparison", 
    description: "Runs prompts with Low Temp vs High Temp to compare creativity.", 
    nodes: 4, 
    complexity: "High", 
    category: "Agents",
    n8nCode: `{\n  "name": "LLM Prompt Comparison",\n  "nodes": [\n    {\n      "parameters": {},\n      "name": "Manual Trigger",\n      "type": "n8n-nodes-base.manualTrigger",\n      "typeVersion": 1,\n      "position": [250, 300]\n    },\n    {\n      "parameters": {\n        "method": "POST",\n        "url": "https://api.openai.com/v1/chat/completions",\n        "headers": {\n          "Authorization": "Bearer YOUR_OPENAI_API_KEY",\n          "Content-Type": "application/json"\n        },\n        "sendBody": true,\n        "bodyParameters": {\n          "json": {\n            "model": "gpt-4",\n            "temperature": 0.2,\n            "max_tokens": 100,\n            "messages": [\n              {\n                "role": "system",\n                "content": "You are a concise expert. Answer briefly."\n              },\n              {\n                "role": "user",\n                "content": "Explain {{ $json.topic }} in one sentence."\n              }\n            ]\n          }\n        }\n      },\n      "name": "Low Temperature (0.2)",\n      "type": "n8n-nodes-base.httpRequest",\n      "typeVersion": 4,\n      "position": [450, 100]\n    },\n    {\n      "parameters": {\n        "method": "POST",\n        "url": "https://api.openai.com/v1/chat/completions",\n        "headers": {\n          "Authorization": "Bearer YOUR_OPENAI_API_KEY",\n          "Content-Type": "application/json"\n        },\n        "sendBody": true,\n        "bodyParameters": {\n          "json": {\n            "model": "gpt-4",\n            "temperature": 0.8,\n            "max_tokens": 100,\n            "messages": [\n              {\n                "role": "system",\n                "content": "You are a creative writer. Be expressive."\n              },\n              {\n                "role": "user",\n                "content": "Tell me something interesting about {{ $json.topic }}."\n              }\n            ]\n          }\n        }\n      },\n      "name": "High Temperature (0.8)",\n      "type": "n8n-nodes-base.httpRequest",\n      "typeVersion": 4,\n      "position": [450, 500]\n    },\n    {\n      "parameters": {\n        "mode": "combine"\n      },\n      "name": "Merge Results",\n      "type": "n8n-nodes-base.merge",\n      "typeVersion": 1,\n      "position": [650, 300]\n    },\n    {\n      "parameters": {\n        "jsCode": "const data = $input.all();\\n\\nreturn {\\n  exact_answer: data[0].json.choices[0].message.content,\\n  creative_answer: data[1].json.choices[0].message.content,\\n  comparison: {\\n    exact_tokens: data[0].json.usage.total_tokens,\\n    creative_tokens: data[1].json.usage.total_tokens\\n  }\\n};"\n      },\n      "name": "Compare Outputs Code",\n      "type": "n8n-nodes-base.code",\n      "typeVersion": 2,\n      "position": [850, 300]\n    }\n  ],\n  "connections": {\n    "Manual Trigger": {\n      "main": [\n        [\n          {\n            "node": "Low Temperature (0.2)",\n            "type": "main",\n            "index": 0\n          },\n          {\n            "node": "High Temperature (0.8)",\n            "type": "main",\n            "index": 0\n          }\n        ]\n      ]\n    },\n    "Low Temperature (0.2)": {\n      "main": [\n        [\n          {\n            "node": "Merge Results",\n            "type": "main",\n            "index": 0\n          }\n        ]\n      ]\n    },\n    "High Temperature (0.8)": {\n      "main": [\n        [\n          {\n            "node": "Merge Results",\n            "type": "main",\n            "index": 1\n          }\n        ]\n      ]\n    },\n    "Merge Results": {\n      "main": [\n        [\n          {\n            "node": "Compare Outputs Code",\n            "type": "main",\n            "index": 0\n          }\n        ]\n      ]\n    }\n  }\n}`,
    structure: {
        nodes: [
            { id: '1', type: 'trigger', label: 'Manual Trigger', position: { x: 250, y: 300 }, status: 'idle' },
            { id: '2', type: 'action', label: 'GPT Low Temp', position: { x: 450, y: 100 }, status: 'idle' },
            { id: '3', type: 'action', label: 'GPT High Temp', position: { x: 450, y: 500 }, status: 'idle' },
            { id: '4', type: 'logic', label: 'Merge Results', position: { x: 650, y: 300 }, status: 'idle' },
            { id: '5', type: 'end', label: 'Compare Code', position: { x: 850, y: 300 }, status: 'idle' }
        ],
        edges: [
            { id: 'e1-2', source: '1', target: '2' },
            { id: 'e1-3', source: '1', target: '3' },
            { id: 'e2-4', source: '2', target: '4' },
            { id: 'e3-4', source: '3', target: '4' },
            { id: 'e4-5', source: '4', target: '5' }
        ]
    }
  }
];

export const DIAGRAMS: Diagram[] = [
  // Transformers
  { id: 1, title: "Transformer Architecture", category: "Transformers", relatedLecture: "Lecture #1", filename: "transformer_architecture.png" },
  { id: 2, title: "Token Generation Process", category: "Transformers", relatedLecture: "Lecture #1", filename: "token_generation_process.png" },
  { id: 3, title: "Temperature Effect", category: "Transformers", relatedLecture: "Lecture #2", filename: "temperature_effect_graph.png" },
  { id: 4, title: "Attention Mechanism", category: "Transformers", relatedLecture: "Lecture #1", filename: "attention_mechanism_visualization.png" },
  { id: 5, title: "LLM Models Comparison", category: "Transformers", relatedLecture: "Lecture #2", filename: "llm_models_comparison.png" },
  // Prompting
  { id: 6, title: "Prompting Techniques", category: "Prompting", relatedLecture: "Lecture #3", filename: "prompting_techniques_comparison.png" },
  // n8n
  { id: 7, title: "n8n Workflow Example", category: "n8n", relatedLecture: "Practice #1", filename: "n8n_workflow_example.png" },
  { id: 8, title: "Complex Workflow Pipeline", category: "n8n", relatedLecture: "Practice #2", filename: "complex_workflow_pipeline.png" },
  // JavaScript
  { id: 9, title: "JS Code Block Structure", category: "Workflows", relatedLecture: "Lecture #4", filename: "javascript_code_block_structure.png" },
  // DB
  { id: 10, title: "Database Types Comparison", category: "Database", relatedLecture: "Lecture #5", filename: "database_types_comparison.png" },
  { id: 11, title: "Vector Embeddings Semantic", category: "Database", relatedLecture: "Lecture #5", filename: "vector_embeddings_semantic.png" },
  { id: 12, title: "SQL Query Flow", category: "Database", relatedLecture: "Lecture #5", filename: "sql_query_flow.png" },
  { id: 13, title: "Qdrant Workflow", category: "Database", relatedLecture: "Lecture #5", filename: "qdrant_workflow.png" },
  // RAG
  { id: 14, title: "RAG System Architecture", category: "RAG", relatedLecture: "Lecture #6", filename: "rag_system_architecture.png" },
  { id: 15, title: "RAG vs No RAG", category: "RAG", relatedLecture: "Lecture #6", filename: "rag_vs_no_rag_comparison.png" },
  { id: 16, title: "Chunking Strategies", category: "RAG", relatedLecture: "Lecture #6", filename: "chunking_strategies.png" },
  { id: 17, title: "RAG Architectures", category: "RAG", relatedLecture: "Lecture #6", filename: "rag_architectures_comparison.png" },
  { id: 18, title: "RAG Metrics Comparison", category: "RAG", relatedLecture: "Lecture #6", filename: "rag_metrics_comparison.png" },
  { id: 19, title: "RAG Optimization Flow", category: "RAG", relatedLecture: "Lecture #6", filename: "rag_optimization_flowchart.png" },
  // Agents
  { id: 20, title: "ReAct Cycle", category: "Agents", relatedLecture: "Lecture #7", filename: "react_cycle.png" },
  { id: 21, title: "Agent Frameworks", category: "Agents", relatedLecture: "Lecture #7", filename: "agent_frameworks_comparison.png" },
  { id: 22, title: "Multi-Agent Architectures", category: "Agents", relatedLecture: "Lecture #7", filename: "multiagent_architectures.png" },
  { id: 23, title: "JSON Schema Functions", category: "Agents", relatedLecture: "Lecture #7", filename: "json_schema_functions.png" },
  // Production
  { id: 24, title: "Complete System Architecture", category: "Production", relatedLecture: "Lecture #8", filename: "complete_system_architecture.png" },
  { id: 25, title: "Deployment Architecture", category: "Production", relatedLecture: "Lecture #8", filename: "deployment_architecture.png" },
];

export const CODE_SNIPPETS: CodeSnippet[] = [
  { id: 1, title: "Fetch and Transform Data", language: "JavaScript", complexity: "Medium", description: "Fetch data from API and transform for display", code: "async function fetchData() {\n  const res = await fetch('/api/data');\n  const json = await res.json();\n  return json.map(item => ({\n    id: item.id,\n    value: item.val * 2\n  }));\n}" },
  { id: 2, title: "Basic SQL Query", language: "SQL", complexity: "Low", description: "Select users with filtering", code: "SELECT id, name, email\nFROM users\nWHERE active = true\nORDER BY created_at DESC\nLIMIT 10;" },
  { id: 3, title: "Cosine Similarity", language: "Python", complexity: "Medium", description: "Calculate similarity between two vectors", code: "import numpy as np\n\ndef cosine_similarity(v1, v2):\n    dot_product = np.dot(v1, v2)\n    norm_v1 = np.linalg.norm(v1)\n    norm_v2 = np.linalg.norm(v2)\n    return dot_product / (norm_v1 * norm_v2)" },
  { id: 4, title: "Connect to Qdrant", language: "Python", complexity: "Medium", description: "Initialize Qdrant client", code: "from qdrant_client import QdrantClient\n\nclient = QdrantClient(host='localhost', port=6333)\nclient.get_collections()" },
  { id: 5, title: "Async Error Handling", language: "JavaScript", complexity: "Medium", description: "Try/Catch wrapper", code: "const safeAwait = async (promise) => {\n  try {\n    const data = await promise;\n    return [null, data];\n  } catch (err) {\n    return [err, null];\n  }\n};" },
];