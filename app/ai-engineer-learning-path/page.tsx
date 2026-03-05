import Link from "next/link"
import {
  ArrowLeft,
  Code2,
  Cloud,
  Database,
  Cpu,
  Layers,
  Wrench,
  Briefcase,
  FlaskConical,
  CheckCircle2,
  Circle,
  ArrowRight,
} from "lucide-react"
import { Header } from "@/components/landing/header"
import { Footer } from "@/components/landing/footer"

export const metadata = {
  title: "AI Engineer Learning Path | AI Shipping Labs",
  description:
    "A visual learning path for becoming an AI engineer in 2026, based on analysis of 1,000+ job descriptions. Covers skills, tools, responsibilities, and portfolio projects.",
}

// ─── Data ────────────────────────────────────────────────────────────────────

const skillCategories = [
  {
    id: "genai",
    icon: Cpu,
    label: "GenAI Skills",
    color: "accent",
    description: "The core of the AI engineer role — working with foundation models in real products.",
    skills: [
      { name: "RAG (Retrieval-Augmented Generation)", pct: 35.9, priority: "essential" },
      { name: "Prompt Engineering", pct: 29.1, priority: "essential" },
      { name: "LLM Integration", pct: 25.4, priority: "essential" },
      { name: "Agents & Agentic Workflows", pct: 14.4, priority: "important" },
      { name: "Fine-Tuning", pct: 8.5, priority: "nice-to-have" },
    ],
  },
  {
    id: "languages",
    icon: Code2,
    label: "Programming Languages",
    color: "blue",
    description: "Python is the structural foundation. Web skills let you expose AI through services.",
    skills: [
      { name: "Python", pct: 82.5, priority: "essential" },
      { name: "TypeScript", pct: 23.4, priority: "important" },
      { name: "React", pct: 14.8, priority: "nice-to-have" },
      { name: "FastAPI", pct: 10.7, priority: "important" },
    ],
  },
  {
    id: "cloud",
    icon: Cloud,
    label: "Cloud & Infrastructure",
    color: "purple",
    description: "Deployment, automation, and infrastructure are core expectations — not optional extras.",
    skills: [
      { name: "Docker", pct: 31.0, priority: "essential" },
      { name: "CI/CD", pct: 29.3, priority: "essential" },
      { name: "Kubernetes", pct: 29.1, priority: "important" },
      { name: "AWS", pct: 40.1, priority: "essential" },
      { name: "Azure", pct: 23.9, priority: "nice-to-have" },
      { name: "GCP", pct: 23.0, priority: "nice-to-have" },
    ],
  },
  {
    id: "ml",
    icon: FlaskConical,
    label: "ML Foundations",
    color: "orange",
    description: "Supportive context rather than the core of the role. Useful for understanding model behavior.",
    skills: [
      { name: "PyTorch", pct: 22.0, priority: "important" },
      { name: "TensorFlow", pct: 12.9, priority: "nice-to-have" },
      { name: "Model Evaluation", pct: 4.5, priority: "important" },
      { name: "Model Training", pct: 6.4, priority: "nice-to-have" },
    ],
  },
  {
    id: "databases",
    icon: Database,
    label: "Databases",
    color: "teal",
    description: "Retrieval infrastructure matters. No single vendor dominates — understand the concepts.",
    skills: [
      { name: "Vector Databases", pct: 10.8, priority: "essential" },
      { name: "PostgreSQL", pct: 9.3, priority: "important" },
    ],
  },
]

const toolCategories = [
  {
    icon: Layers,
    label: "GenAI Frameworks",
    note: "No single framework dominates. Architectural understanding matters more than library loyalty.",
    tools: [
      { name: "LangChain", pct: 18.8 },
      { name: "LangGraph", pct: 8.0 },
      { name: "LlamaIndex", pct: 5.8 },
    ],
  },
  {
    icon: Cpu,
    label: "LLM Providers",
    note: "Vendor familiarity helps, but system design skills like RAG and safe integration matter more.",
    tools: [
      { name: "OpenAI API", pct: 8.7 },
      { name: "Anthropic API", pct: 5.5 },
    ],
  },
  {
    icon: Cloud,
    label: "Infrastructure Tooling",
    note: "These form the operational baseline for reproducible, scalable, production-ready AI deployments.",
    tools: [
      { name: "Docker", pct: 31.0 },
      { name: "CI/CD", pct: 29.3 },
      { name: "Kubernetes", pct: 29.1 },
      { name: "Terraform", pct: 11.6 },
    ],
  },
  {
    icon: Database,
    label: "Vector Stores",
    note: "The key skill is choosing and operating the right retrieval approach, not vendor lock-in.",
    tools: [
      { name: "Vector stores (general)", pct: 10.8 },
      { name: "Pinecone", pct: 5.9 },
      { name: "Weaviate", pct: 4.6 },
    ],
  },
]

const responsibilities = {
  core: [
    {
      title: "Build AI Systems",
      description:
        "Design and deliver end-to-end LLM-powered applications: RAG systems, agent workflows, and structured prompt pipelines that solve real business problems.",
    },
    {
      title: "Productionize AI",
      description:
        "Transform prototypes into reliable services. Package models behind APIs, deploy to cloud infrastructure, add monitoring, and handle failures gracefully.",
    },
    {
      title: "Evaluation & Quality",
      description:
        "Establish evaluation pipelines, observability, and guardrails. Make system behavior measurable and ensure outputs meet reliability standards over time.",
    },
    {
      title: "Use Provider APIs",
      description:
        "Integrate and operate external model APIs (OpenAI, Anthropic). Handle rate limits, cost control, retries, streaming, and fallback strategies.",
    },
  ],
  common: [
    {
      title: "RAG & Retrieval",
      description:
        "Build retrieval systems over proprietary data using vector search, hybrid retrieval, metadata filtering, and re-ranking.",
    },
    {
      title: "Data Processing",
      description:
        "Ingest, clean, chunk, and manage datasets for retrieval, evaluation, and fine-tuning workflows.",
    },
    {
      title: "Infrastructure & Platforms",
      description:
        "Operate GPU resources, vector databases, experiment tracking, and internal AI platforms that support multiple applications.",
    },
    {
      title: "Agents & Multi-Step Workflows",
      description:
        "Design systems where models call tools, maintain state, and execute multi-step reasoning or task flows.",
    },
    {
      title: "Collaboration & Communication",
      description:
        "Translate business needs into AI system designs. Explain trade-offs and limitations to non-technical stakeholders.",
    },
  ],
  secondary: [
    "Frontend / UI development to expose AI capabilities",
    "Performance optimization of inference latency and cost",
    "Fine-tuning models for domain-specific tasks",
    "Self-hosting LLMs for privacy or cost control",
    "Security, compliance, and responsible AI oversight",
  ],
}

const portfolioProjects = [
  {
    number: "01",
    title: "Production RAG System",
    description:
      "Build a production-ready RAG system over a real dataset. Include chunking strategy, retrieval method, evaluation plan, and deployment architecture.",
    skills: ["RAG", "Vector DB", "Python", "Docker", "Evaluation"],
    difficulty: "Foundational",
  },
  {
    number: "02",
    title: "Multi-Step AI Agent",
    description:
      "Build an agent that automates a repetitive workflow in your industry. Include data ingestion, tool use, logging, and error handling.",
    skills: ["Agents", "LLM APIs", "Python", "LangChain/LangGraph"],
    difficulty: "Intermediate",
  },
  {
    number: "03",
    title: "Cloud-Native AI Deployment",
    description:
      "Design a cloud-native deployment architecture for an LLM-powered service, including Docker, CI/CD, monitoring, and scaling.",
    skills: ["Docker", "CI/CD", "AWS/GCP/Azure", "Kubernetes", "Monitoring"],
    difficulty: "Intermediate",
  },
  {
    number: "04",
    title: "AI for Risk or Compliance",
    description:
      "Build an AI system that assists with risk or compliance decisions in a regulated industry. Include architecture, evaluation, and monitoring.",
    skills: ["LLM Integration", "Evaluation", "RAG", "Production Ops"],
    difficulty: "Advanced",
  },
]

const learningStages = [
  {
    stage: "1",
    title: "Python & LLM Foundations",
    items: [
      "Python fluency (data structures, async, APIs)",
      "How LLMs work (tokenization, context windows, costs)",
      "Calling OpenAI / Anthropic APIs",
      "Prompt engineering basics",
    ],
  },
  {
    stage: "2",
    title: "RAG & Retrieval Systems",
    items: [
      "Embeddings and semantic search",
      "Vector databases (Pinecone, Weaviate, pgvector)",
      "Chunking strategies and document processing",
      "Hybrid retrieval and re-ranking",
    ],
  },
  {
    stage: "3",
    title: "Agents & Workflows",
    items: [
      "Tool use and function calling",
      "Multi-step reasoning and state management",
      "LangChain / LangGraph / LlamaIndex",
      "Error handling and fallback strategies",
    ],
  },
  {
    stage: "4",
    title: "Production & Deployment",
    items: [
      "FastAPI for serving AI endpoints",
      "Docker and containerization",
      "CI/CD pipelines",
      "Cloud deployment (AWS / GCP / Azure)",
    ],
  },
  {
    stage: "5",
    title: "Evaluation & Observability",
    items: [
      "Building evaluation datasets and test sets",
      "LLM-as-judge patterns",
      "Monitoring drift and output quality",
      "Guardrails and safety checks",
    ],
  },
  {
    stage: "6",
    title: "Scale & Specialization",
    items: [
      "Kubernetes and infrastructure at scale",
      "Inference optimization (latency, cost, throughput)",
      "Fine-tuning for domain-specific tasks",
      "Security, compliance, and responsible AI",
    ],
  },
]

// ─── Sub-components ───────────────────────────────────────────────────────────

function PriorityBadge({ priority }: { priority: string }) {
  if (priority === "essential") {
    return (
      <span className="rounded-full bg-accent/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-accent">
        Essential
      </span>
    )
  }
  if (priority === "important") {
    return (
      <span className="rounded-full bg-foreground/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-foreground/60">
        Important
      </span>
    )
  }
  return (
    <span className="rounded-full bg-border/60 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
      Nice to have
    </span>
  )
}

function SkillBar({ pct, color }: { pct: number; color: string }) {
  const colorMap: Record<string, string> = {
    accent: "bg-accent",
    blue: "bg-blue-400",
    purple: "bg-purple-400",
    orange: "bg-orange-400",
    teal: "bg-teal-400",
  }
  return (
    <div className="h-1.5 w-full rounded-full bg-secondary">
      <div
        className={`h-1.5 rounded-full ${colorMap[color] ?? "bg-accent"} transition-all`}
        style={{ width: `${Math.min(pct, 100)}%` }}
      />
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AIEngineerLearningPath() {
  return (
    <main className="min-h-screen">
      <Header />

      {/* Hero */}
      <section className="px-6 pt-32 pb-12 lg:px-8 lg:pt-40 lg:pb-16">
        <div className="mx-auto max-w-5xl">
          <Link
            href="/blog/what-is-an-ai-engineer-based-on-job-descriptions"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Based on: What Is an AI Engineer? (2026 Analysis)
          </Link>

          <div className="max-w-3xl">
            <a
              href="https://aishippinglabs.com/blog/what-is-an-ai-engineer-based-on-job-descriptions"
              target="_blank"
              rel="noreferrer"
              className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/5 px-4 py-1.5 text-sm text-accent transition-colors hover:bg-accent/10"
            >
              <Briefcase className="h-3.5 w-3.5" />
              Based on 1,000+ job descriptions · January 2026
            </a>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              AI Engineer Learning Path
            </h1>
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
              A visual map of the skills, tools, responsibilities, and portfolio projects that define the AI
              engineer role in 2026 — derived from real market data, not opinions.
            </p>
          </div>

          {/* Key stats */}
          <div className="mt-10">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {[
                { value: "95.6%", label: "Production-focused roles" },
                { value: "82.5%", label: "Require Python" },
                { value: "35.9%", label: "Mention RAG" },
                { value: "~70%", label: "Are AI-first roles" },
              ].map((stat) => (
                <div key={stat.label} className="rounded-xl border border-border bg-card/40 p-4 text-center">
                  <div className="text-2xl font-bold text-accent">{stat.value}</div>
                  <div className="mt-1 text-xs text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <Link
                href="/blog/what-is-an-ai-engineer-based-on-job-descriptions"
                className="inline-flex items-center gap-2 text-sm text-accent transition-colors hover:text-accent/80"
              >
                Read the full analysis
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Learning Stages ─────────────────────────────────────────────────── */}
      <section className="border-t border-border px-6 py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Learning Stages</h2>
          <p className="mt-2 text-muted-foreground">
            A suggested progression from fundamentals to production-grade specialization.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {learningStages.map((stage) => (
              <div
                key={stage.stage}
                className="relative rounded-xl border border-border bg-card/40 p-6 transition-colors hover:border-accent/40 hover:bg-card/60"
              >
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/10 text-sm font-bold text-accent">
                    {stage.stage}
                  </div>
                  <h3 className="font-semibold text-foreground">{stage.title}</h3>
                </div>
                <ul className="space-y-2">
                  {stage.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Circle className="mt-0.5 h-3 w-3 shrink-0 text-accent/40" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Skill Stack ─────────────────────────────────────────────────────── */}
      <section className="border-t border-border px-6 py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Skill Stack</h2>
          <p className="mt-2 text-muted-foreground">
            Skills ranked by frequency in job descriptions. Bar width = % of roles mentioning that skill.
          </p>

          <div className="mt-4 flex flex-wrap gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <span className="inline-block h-2 w-2 rounded-full bg-accent" />
              Essential — appears in core role definitions
            </span>
            <span className="flex items-center gap-1.5">
              <span className="inline-block h-2 w-2 rounded-full bg-foreground/40" />
              Important — frequently expected
            </span>
            <span className="flex items-center gap-1.5">
              <span className="inline-block h-2 w-2 rounded-full bg-border" />
              Nice to have — role or domain dependent
            </span>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            {skillCategories.map((cat) => {
              const Icon = cat.icon
              return (
                <div
                  key={cat.id}
                  className="rounded-xl border border-border bg-card/40 p-6"
                >
                  <div className="mb-1 flex items-center gap-2">
                    <Icon className="h-4 w-4 text-accent" />
                    <h3 className="font-semibold text-foreground">{cat.label}</h3>
                  </div>
                  <p className="mb-5 text-xs text-muted-foreground">{cat.description}</p>
                  <div className="space-y-4">
                    {cat.skills.map((skill) => (
                      <div key={skill.name}>
                        <div className="mb-1.5 flex items-center justify-between gap-2">
                          <span className="text-sm text-foreground/90">{skill.name}</span>
                          <div className="flex items-center gap-2 shrink-0">
                            <PriorityBadge priority={skill.priority} />
                            <span className="w-10 text-right text-xs tabular-nums text-muted-foreground">
                              {skill.pct}%
                            </span>
                          </div>
                        </div>
                        <SkillBar pct={skill.pct} color={cat.color} />
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Tooling ─────────────────────────────────────────────────────────── */}
      <section className="border-t border-border px-6 py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Tooling & Tech Stack</h2>
          <p className="mt-2 text-muted-foreground">
            AI frameworks are interchangeable and ecosystem-driven. DevOps tools are standardized and
            production-critical.
          </p>

          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {toolCategories.map((cat) => {
              const Icon = cat.icon
              return (
                <div key={cat.label} className="rounded-xl border border-border bg-card/40 p-6">
                  <div className="mb-1 flex items-center gap-2">
                    <Icon className="h-4 w-4 text-accent" />
                    <h3 className="font-semibold text-foreground">{cat.label}</h3>
                  </div>
                  <p className="mb-5 text-xs text-muted-foreground italic">{cat.note}</p>
                  <div className="space-y-3">
                    {cat.tools.map((tool) => (
                      <div key={tool.name} className="flex items-center gap-3">
                        <Wrench className="h-3.5 w-3.5 shrink-0 text-muted-foreground/50" />
                        <span className="flex-1 text-sm text-foreground/90">{tool.name}</span>
                        <span className="text-xs tabular-nums text-muted-foreground">{tool.pct}%</span>
                        <div className="h-1.5 w-20 rounded-full bg-secondary">
                          <div
                            className="h-1.5 rounded-full bg-accent/60"
                            style={{ width: `${Math.min(tool.pct * 2.5, 100)}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Responsibilities ────────────────────────────────────────────────── */}
      <section className="border-t border-border px-6 py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Responsibilities</h2>
          <p className="mt-2 text-muted-foreground">
            What AI engineers actually own day-to-day, from non-negotiable core work to domain-specific extras.
          </p>

          <div className="mt-8 space-y-8">
            {/* Core */}
            <div>
              <div className="mb-4 flex items-center gap-2">
                <span className="rounded-full bg-accent px-3 py-0.5 text-xs font-semibold text-accent-foreground">
                  Core
                </span>
                <span className="text-sm text-muted-foreground">
                  Non-negotiable — most AI engineer roles expect you to own these
                </span>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {responsibilities.core.map((r) => (
                  <div
                    key={r.title}
                    className="rounded-xl border border-accent/20 bg-accent/5 p-5"
                  >
                    <div className="mb-2 flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-accent" />
                      <h4 className="font-semibold text-foreground">{r.title}</h4>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{r.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Common */}
            <div>
              <div className="mb-4 flex items-center gap-2">
                <span className="rounded-full bg-secondary px-3 py-0.5 text-xs font-semibold text-foreground">
                  Common
                </span>
                <span className="text-sm text-muted-foreground">
                  Appear frequently and support the full lifecycle of AI features
                </span>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {responsibilities.common.map((r) => (
                  <div
                    key={r.title}
                    className="rounded-xl border border-border bg-card/40 p-5"
                  >
                    <div className="mb-2 flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-foreground/40" />
                      <h4 className="font-semibold text-foreground">{r.title}</h4>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{r.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Secondary */}
            <div>
              <div className="mb-4 flex items-center gap-2">
                <span className="rounded-full bg-border px-3 py-0.5 text-xs font-semibold text-muted-foreground">
                  Secondary
                </span>
                <span className="text-sm text-muted-foreground">
                  Role or domain dependent — less universal but still important in many contexts
                </span>
              </div>
              <div className="flex flex-wrap gap-3">
                {responsibilities.secondary.map((r) => (
                  <div
                    key={r}
                    className="flex items-center gap-2 rounded-lg border border-border bg-card/40 px-4 py-2.5 text-sm text-muted-foreground"
                  >
                    <Circle className="h-3 w-3 shrink-0 text-muted-foreground/40" />
                    {r}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Portfolio Projects ───────────────────────────────────────────────── */}
      <section className="border-t border-border px-6 py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Portfolio Projects</h2>
          <p className="mt-2 text-muted-foreground">
            End-to-end, production-like projects that mirror real-world demand. Build these to demonstrate AI
            engineering skill beyond isolated prompt tricks.
          </p>

          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {portfolioProjects.map((project) => (
              <div
                key={project.number}
                className="group relative rounded-xl border border-border bg-card/40 p-6 transition-colors hover:border-accent/40 hover:bg-card/60"
              >
                <div className="mb-4 flex items-start justify-between gap-4">
                  <span className="text-4xl font-bold tabular-nums text-accent/20 group-hover:text-accent/30 transition-colors">
                    {project.number}
                  </span>
                  <span className="rounded-full border border-border px-2.5 py-0.5 text-xs text-muted-foreground">
                    {project.difficulty}
                  </span>
                </div>
                <h3 className="mb-2 font-semibold text-foreground">{project.title}</h3>
                <p className="mb-4 text-sm text-muted-foreground leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {project.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full bg-secondary px-2.5 py-0.5 text-xs text-muted-foreground"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-sm text-accent transition-colors hover:text-accent/80"
            >
              Browse all project ideas
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────────────────── */}
      <section className="border-t border-border px-6 py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-5xl">
          <div className="rounded-2xl border border-accent/30 bg-accent/5 p-8 text-center">
            <h2 className="text-xl font-semibold">Ready to start building?</h2>
            <p className="mt-3 text-muted-foreground max-w-xl mx-auto leading-relaxed">
              Join AI Shipping Labs to get structure, accountability, and peer support as you work through
              this learning path and ship real AI projects.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/#tiers"
                className="inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent/90"
              >
                View Membership Tiers
              </Link>
              <Link
                href="/blog/what-is-an-ai-engineer-based-on-job-descriptions"
                className="inline-flex items-center gap-2 rounded-lg border border-border px-5 py-2.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                Read the full analysis
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
