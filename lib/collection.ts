export type CollectionCategory = "tools" | "models" | "courses" | "other"

export interface CollectionItem {
  id: string
  title: string
  description: string
  url: string
  category: CollectionCategory
  /** Optional: display name for repo or source, e.g. "github.com/..." */
  source?: string
}

export const COLLECTION_CATEGORIES: Record<
  CollectionCategory,
  { label: string; description: string }
> = {
  tools: { label: "Tools", description: "GitHub repos, CLIs, and dev tools" },
  models: { label: "Models", description: "Model hubs, runtimes, and inference" },
  courses: { label: "Courses", description: "Courses and learning tracks" },
  other: { label: "Other", description: "Datasets, APIs, and more" },
}

/** Curated links to GitHub tools, models, courses, and other resources. */
export const COLLECTION_ITEMS: CollectionItem[] = [
  {
    id: "sphinx-ai",
    title: "Sphinx",
    description: "AI copilot for data science. One prompt runs the full workflow: EDA, cleaning, feature engineering, model selection and fitting, evaluation, and feature importance—in about 5 minutes. Free to get started.",
    url: "https://www.sphinx.ai/",
    category: "tools",
    source: "sphinx.ai",
  },
  {
    id: "lovable",
    title: "Lovable",
    description: "AI-powered app builder. Design in the browser, export to GitHub.",
    url: "https://lovable.dev",
    category: "tools",
    source: "lovable.dev",
  },
  {
    id: "cursor",
    title: "Cursor",
    description: "AI-first code editor. Built on VS Code, with Copilot-style assistance.",
    url: "https://cursor.com",
    category: "tools",
    source: "cursor.com",
  },
  {
    id: "claude-code",
    title: "Claude Code",
    description: "Command-line coding agent. Scaffold and edit projects from natural language.",
    url: "https://claude.com/claude-code",
    category: "tools",
    source: "claude.com",
  },
  {
    id: "llm-course",
    title: "LLM Course by Maxime Labonne",
    description: "Large language model course. From basics to RAG, agents, and fine-tuning.",
    url: "https://github.com/mlabonne/llm-course",
    category: "courses",
    source: "GitHub",
  },
  {
    id: "awesome-ml",
    title: "Awesome ML",
    description: "Curated list of ML resources. Frameworks, papers, and tools.",
    url: "https://github.com/josephmisiti/awesome-machine-learning",
    category: "other",
    source: "GitHub",
  },
  {
    id: "pydantic-ai",
    title: "PydanticAI",
    description: "Structured AI agents in Python. Type-safe, testable agent workflows.",
    url: "https://github.com/pydantic/pydantic-ai",
    category: "tools",
    source: "GitHub",
  },
  {
    id: "langchain",
    title: "LangChain",
    description: "Framework for LLM applications. Chains, agents, and integrations.",
    url: "https://github.com/langchain-ai/langchain",
    category: "tools",
    source: "GitHub",
  },
  {
    id: "pal-mcp",
    title: "PAL MCP",
    description: "Provider-agnostic MCP server that turns your AI CLI or IDE into a coordinator for multiple models: spawn isolated sub-agents, run cross-model debates and code reviews, and hand off full context between models for planning and implementation.",
    url: "https://github.com/BeehiveInnovations/pal-mcp-server",
    category: "tools",
    source: "GitHub",
  },
  {
    id: "agents-md",
    title: "AGENTS.md",
    description: "Open standard for AI coding agents: a consistent location for project setup, build steps, tests, and coding conventions. Used by 60,000+ open-source projects; keeps READMEs clean while improving agent reliability across tools.",
    url: "https://agents.md",
    category: "other",
    source: "agents.md",
  },
  {
    id: "promptify",
    title: "Promptify",
    description: "Developer-friendly NLP wrapper for LLMs. Run NER, classification, and more with minimal code and zero training data. Converts unstructured model output into reliable, structured Python objects for production.",
    url: "https://github.com/promptslab/Promptify",
    category: "tools",
    source: "GitHub",
  },
  {
    id: "minimax-m1",
    title: "MiniMax-M1",
    description: "Open-weight reasoning model: large MoE backbone with hybrid attention, up to 1M-token context, less test-time compute than comparable models. Strong in software engineering and extended-input settings.",
    url: "https://github.com/MiniMax-AI/MiniMax-M1",
    category: "models",
    source: "GitHub",
  },
  {
    id: "collaborating-with-codex",
    title: "collaborating-with-codex",
    description: "Agent Skill that lets Claude delegate coding tasks to the OpenAI Codex CLI for multi-model collaboration. Claude coordinates and refines; Codex handles implementation, debugging, and code analysis in a sandbox.",
    url: "https://github.com/eddiearc/codex-delegator",
    category: "tools",
    source: "GitHub",
  },
  {
    id: "happy-coder",
    title: "Happy Coder",
    description: "Mobile, web, and CLI client for Claude Code and Codex. Run and monitor from anywhere with E2E encryption, push notifications when the agent needs attention, and seamless switching between desktop and phone.",
    url: "https://github.com/slopus/happy",
    category: "tools",
    source: "GitHub",
  },
  {
    id: "docker-sandboxes-claude-code",
    title: "Docker Sandboxes for Claude Code",
    description: "Run Claude Code in an isolated, reproducible Docker environment without changing how you use the CLI. Sandboxed file access and credentials for security and reliability; supports all Claude Code options.",
    url: "https://docs.docker.com/ai/sandboxes/claude-code/",
    category: "tools",
    source: "Docker Docs",
  },
  {
    id: "playwriter-mcp",
    title: "Playwriter MCP",
    description: "Lets AI agents control your Chrome browser via a lightweight extension using the full Playwright API with minimal context. Reliable browser automation: screenshots, flow validation, logged-in pages—no custom automation to maintain.",
    url: "https://github.com/remorses/playwriter",
    category: "tools",
    source: "GitHub",
  },
  {
    id: "oh-my-claude-sisyphus",
    title: "oh-my-claude-sisyphus",
    description: "Claude Code plugin for native multi-agent orchestration: specialized subagents, hooks, and slash commands for parallel coding tasks. Automates delegation, search, planning, and “keep going until done” workflows with smart model routing.",
    url: "https://github.com/Yeachan-Heo/oh-my-claude-sisyphus",
    category: "tools",
    source: "GitHub",
  },
  {
    id: "dlt-fundamentals",
    title: "dlt Fundamentals",
    description: "Course from dlthub on building robust ELT pipelines. Includes a holiday lesson (Dec 22) on integrating LLMs into your workflow, with 50 swag packs to compete for.",
    url: "https://dlthub.com/docs/tutorial/fundamentals-course",
    category: "courses",
    source: "dlthub.com",
  },
  {
    id: "freecodecamp-dlt-certification",
    title: "FreeCodeCamp Course Certification: Data Engineering with Python and AI/LLMs – Data Loading Tutorial",
    description: "Learn how to build modern, scalable data pipelines using Python and AI-assisted tools. This hands-on tutorial starts from the basics of data ingestion and takes you all the way to advanced techniques in data loading, transformation, deployment, and automation. By freeCodeCamp, featuring Alexey Grigoriev and Adrian Brudaru.",
    url: "https://community.dlthub.com/course-freecodecamp-certification?utm_source=alexey_linkedin",
    category: "courses",
    source: "freeCodeCamp / dlthub",
  },
  {
    id: "ai-agents-email-crash-course",
    title: "AI Agents Email Crash-Course (Cohort Edition)",
    description: "Free cohort-based version running December and January. Complete the project and review three other submissions to receive a certificate of completion signed by Alexey.",
    url: "https://alexeygrigorev.com/aihero/",
    category: "courses",
    source: "alexeygrigorev.com",
  },
  {
    id: "claude-use-cases",
    title: "Claude Use Cases",
    description: "Curated library of real-world Claude use cases across research, writing, coding, analysis, and everyday work. Organized by role, industry, and feature with concrete, end-to-end examples.",
    url: "https://www.claude.com/resources/use-cases",
    category: "other",
    source: "claude.com",
  },
  {
    id: "ai-engineering-hub",
    title: "AI Engineering Hub",
    description: "Large open-source GitHub repo: 90+ production-ready projects, tutorials, and reference implementations for LLMs, RAG, agents, MCP, multimodal systems, and evaluation. Structured by difficulty and use case.",
    url: "https://github.com/patchy631/ai-engineering-hub",
    category: "other",
    source: "GitHub",
  },
  {
    id: "agentic-ai-crash-course",
    title: "Agentic AI Crash Course",
    description:
      "A free introductory crash course on agentic AI that explains how modern AI agents work in practice, from tools and RAG to memory, planning, MCP, and multi-agent systems. Designed as a clear, realistic starting point focused on real-world system design and limitations rather than hype.",
    url: "https://github.com/aishwaryanr/awesome-generative-ai-guide/tree/main/free_courses/agentic_ai_crash_course",
    category: "courses",
    source: "GitHub",
  },
  {
    id: "cs146s-modern-software-developer",
    title: "Assignments for CS146S: The Modern Software Developer",
    description:
      "Programming assignments for CS146S: The Modern Software Developer (Stanford University), focused on AI-assisted software development. Includes hands-on work with modern tooling and workflows like LLM-based coding, testing, and documentation (Fall 2025).",
    url: "https://github.com/mihail911/modern-software-dev-assignments?tab=readme-ov-file",
    category: "courses",
    source: "GitHub",
  },
  {
    id: "data-engineering-zoomcamp",
    title: "Data Engineering Zoomcamp",
    description:
      "New cohort starts on January 12, 2026. A free 9-week course on building production-ready data pipelines: ingestion, orchestration, warehousing, analytics, and more.",
    url: "https://github.com/DataTalksClub/data-engineering-zoomcamp",
    category: "courses",
    source: "GitHub",
  },
  {
    id: "llm-fine-tuning-roadmap",
    title: "LLM Fine-Tuning roadmap",
    description: "Curated resource for practitioners: core fine-tuning concepts, transformer internals, training infrastructure, data preparation, PEFT and alignment methods, and tools for training and deploying LLMs.",
    url: "https://github.com/Curated-Awesome-Lists/awesome-llms-fine-tuning",
    category: "courses",
    source: "GitHub",
  },
  {
    id: "claude-code-large-context-reasoning",
    title: "Claude Code and Large-Context Reasoning",
    description: "Materials from Tim Warner's O'Reilly Live Learning course: production-ready AI-assisted development with Claude Code, large-context reasoning, MCP-based memory, agents, and custom skills. Code review, automation, and CI/CD examples.",
    url: "https://learning.oreilly.com/live-events/",
    category: "courses",
    source: "O'Reilly",
  },
  {
    id: "awesome-slash",
    title: "awesome-slash",
    description: "Curated list of tools, patterns, and projects built around slash-command interfaces. Practical reference for command-driven workflows, bots, and developer tools.",
    url: "https://github.com/avifenesh/awesome-slash",
    category: "other",
    source: "GitHub",
  },
  {
    id: "astronomer-agents",
    title: "astronomer/agents",
    description: "Open-source agent skills for data engineering: 13 skills to extend and automate data workflows with AI agents.",
    url: "https://github.com/astronomer/agents",
    category: "tools",
    source: "GitHub",
  },
  {
    id: "500-ai-agents-projects",
    title: "500+ AI Agent Projects",
    description: "Curated collection of AI agent use cases across healthcare, finance, education, retail, and more. Maps practical applications to open-source implementations and frameworks (CrewAI, AutoGen, Agno, LangGraph). Hands-on inspiration hub for builders and practitioners.",
    url: "https://github.com/ashishpatel26/500-AI-Agents-Projects",
    category: "other",
    source: "GitHub",
  },
  {
    id: "paperbanana",
    title: "PaperBanana",
    description:
      "Agentic framework that automates publication-ready methodology diagrams and statistical plots directly from paper text, references, or rough sketches—optimized for scientific accuracy and visual consistency.",
    url: "https://github.com/dwzhu-pku/PaperBanana",
    category: "tools",
    source: "GitHub",
  },
  {
    id: "dexter-financial-research-agent",
    title: "Dexter",
    description:
      "Autonomous financial research agent that plans, executes, and validates analysis using real-time market data, with safety features like loop detection and step limits.",
    url: "https://github.com/virattt/dexter",
    category: "tools",
    source: "GitHub",
  },
  {
    id: "pro-workflow",
    title: "Pro Workflow",
    description:
      "Battle-tested AI coding practices for Claude Code and Cursor to keep an effective 80/20 AI-to-review ratio using disciplined context management and intentional review rituals.",
    url: "https://github.com/rohitg00/pro-workflow",
    category: "tools",
    source: "GitHub",
  },
  {
    id: "openclaw-persistent-assistant",
    title: "You Could've Invented OpenClaw",
    description:
      "Tutorial by Nader Dabit for building a persistent AI assistant from scratch (starting with a Telegram bot + Anthropic API) and iteratively adding sessions, memory, tool use, and scheduled tasks.",
    url: "https://gist.github.com/dabit3/bc60d3bea0b02927995cd9bf53c3db32",
    category: "courses",
    source: "Gist",
  },
  {
    id: "cs336-language-modeling-from-scratch",
    title: "CS336: Language Modeling from Scratch",
    description:
      "Implementation-heavy Stanford course that walks through building a language model end to end: data processing and tokenization, training, systems optimization, scaling laws, and alignment. Includes Python lecture scripts and slides, five programming assignments with public leaderboards, handouts, starter code, and the full schedule.",
    url: "https://stanford-cs336.github.io/spring2025/",
    category: "courses",
    source: "Stanford University",
  },
  {
    id: "planning-with-files",
    title: "planning-with-files",
    description:
      "Claude Code skill that turns long, complex tasks into a file-based workflow using persistent Markdown files. Stores plans, progress, and errors on disk to reduce goal drift and repeated mistakes across many tool calls or sessions.",
    url: "https://github.com/othmanadi/planning-with-files",
    category: "tools",
    source: "GitHub",
  },
  {
    id: "claude-codex-file-based-debugging-skill",
    title: "CLAUDE_CODEX_SKILL",
    description:
      "Workflow showing how to use the OpenAI Codex CLI for deep, non-interactive debugging via a file-based question-and-answer process: write a detailed problem description and full code context into a file, then let Codex produce a structured written analysis.",
    url: "https://gist.github.com/antirez/2e07727fb37e7301247e568b6634beff",
    category: "tools",
    source: "Gist",
  },
  {
    id: "a-day-of-an-ai-engineer-talk-materials",
    title: "Materials from my talk, \"A Day of an AI Engineer\"",
    description:
      "Practical resource that combines a live webinar recording with the full planned write-up and a demo project. It also compares the AI Engineer role to traditional data team roles and maps modern AI projects to CRISP-DM.",
    url: "https://docs.google.com/document/d/1fmm_DQyuZbiaViGqVVkgaET1wLjMdRz3m-ghPFnPgf8/edit?tab=t.0",
    category: "other",
    source: "Google Docs",
  },
  {
    id: "locality-sensitive-hashing-illustrated-guide",
    title: "Locality Sensitive Hashing: The Illustrated Guide",
    description:
      "In-depth tutorial from Pinecone's FAISS learning series that covers LSH (theory + Python implementation) for approximate nearest-neighbor search.",
    url: "https://www.pinecone.io/learn/series/faiss/locality-sensitive-hashing/",
    category: "other",
    source: "Pinecone",
  },
  {
    id: "atomic-agents",
    title: "Atomic Agents",
    description:
      "Lightweight, modular framework for building AI agent pipelines emphasizing atomic, single-purpose components that are reusable, composable, and predictable (built on Instructor and Pydantic).",
    url: "https://github.com/BrainBlend-AI/atomic-agents",
    category: "tools",
    source: "GitHub",
  },
  {
    id: "gas-town",
    title: "Gas Town",
    description:
      "Orchestration system for managing multiple Claude Code instances simultaneously. Coordinates parallel tasks, tracks work across agent instances, manages merge queues, and keeps persistent agent identities (tmux-based workflow).",
    url: "https://github.com/steveyegge/gastown",
    category: "tools",
    source: "GitHub",
  },
]

export function getCollectionByCategory(
  category: CollectionCategory | "all"
): CollectionItem[] {
  if (category === "all") return [...COLLECTION_ITEMS]
  return COLLECTION_ITEMS.filter((item) => item.category === category)
}

export function getAllCollectionCategories(): CollectionCategory[] {
  return ["tools", "models", "courses", "other"]
}
