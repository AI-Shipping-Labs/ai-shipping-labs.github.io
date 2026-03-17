"use client"

import Link from "next/link"
import { useState } from "react"
import {
  ArrowLeft,
  Calendar,
  Users,
  Award,
  ListChecks,
  CheckCircle2,
  Clock,
  Target,
  Zap,
  MessageSquare,
  BarChart3,
  Layers,
  Rocket,
  ChevronDown,
  Send,
  ExternalLink,
} from "lucide-react"
import { Header } from "@/components/landing/header"
import { Footer } from "@/components/landing/footer"

// ─── Mailchimp Form ──────────────────────────────────────────────────────────

const MAILCHIMP_ACTION =
  "https://club.us19.list-manage.com/subscribe/post?u=0d7822ab98152f5afc118c176&id=9e48436651"
const MAILCHIMP_TAG = "6399033"
const MAILCHIMP_BOT_FIELD_NAME = "b_0d7822ab98152f5afc118c176_97178021aa"

function SignupForm({ id, cta = "Get Free Course" }: { id: string; cta?: string }) {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle")

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)
    const email = formData.get("EMAIL") as string

    if (!email || !email.includes("@")) {
      setStatus("error")
      return
    }

    fetch(MAILCHIMP_ACTION, {
      method: "POST",
      body: formData,
      mode: "no-cors",
    })
      .then(() => {
        setStatus("success")
        form.reset()
      })
      .catch(() => {
        setStatus("success")
        form.reset()
      })

    setTimeout(() => setStatus("idle"), 5000)
  }

  return (
    <form method="post" onSubmit={handleSubmit} noValidate>
      <div className="flex flex-col sm:flex-row gap-3">
        <label className="sr-only" htmlFor={id}>
          Email
        </label>
        <input
          type="email"
          name="EMAIL"
          id={id}
          placeholder="Enter your email address"
          required
          className="flex-1 rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-colors"
        />
        <button
          type="submit"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent/90 whitespace-nowrap"
        >
          <Send className="h-4 w-4" />
          {cta}
        </button>
      </div>

      {/* Hidden Mailchimp fields */}
      <div hidden>
        <input type="hidden" name="tags" value={MAILCHIMP_TAG} />
      </div>
      <div style={{ position: "absolute", left: "-5000px" }} aria-hidden="true">
        <input type="text" name={MAILCHIMP_BOT_FIELD_NAME} tabIndex={-1} defaultValue="" />
      </div>

      {status === "success" && (
        <p className="mt-3 text-sm text-accent font-medium">
          Welcome! Check your email for the first lesson.
        </p>
      )}
      {status === "error" && (
        <p className="mt-3 text-sm text-red-500 font-medium">Please enter a valid email address.</p>
      )}
    </form>
  )
}

// ─── FAQ Accordion ───────────────────────────────────────────────────────────

const faqItems = [
  {
    q: "What makes this different from other AI tutorials?",
    a: "This course focuses on YOUR actual GitHub project, not generic examples. You'll build something meaningful and portfolio-worthy that showcases your real work. Plus, it's structured as a daily email course that fits into your busy schedule.",
  },
  {
    q: "How does the email course work?",
    a: "Each day for 7 days, you'll receive a focused email with that day's lesson, code examples, and exercises. Each lesson takes 1-2 hours to complete. You work at your own pace, but the daily structure keeps you motivated and progressing.",
  },
  {
    q: "What if I don't have a GitHub project?",
    a: "No problem! We'll help you choose an existing open-source project that interests you, or you can use one of our suggested sample repositories. The key is learning with real code, not toy examples.",
  },
  {
    q: "Do I need an OpenAI API key?",
    a: "Yes, you'll need an OpenAI API key for the hands-on exercises. The total cost for the 7-day course is typically $3-8, depending on your project size. We'll show you how to minimize costs and use free tiers when possible.",
  },
  {
    q: "What technical skills do I need?",
    a: "Basic Python programming (functions, classes, pip install) and comfort with the command line. If you can clone a GitHub repo and run a Python script, you're ready! We'll guide you through everything else.",
  },
  {
    q: "How much time does each day require?",
    a: "Plan for 1-2 hours per day. The lessons are designed to be focused and actionable — no fluff, just practical steps toward building your AI agent. Perfect for busy professionals.",
  },
  {
    q: "What's the catch? Why is it free?",
    a: "No catch! This course showcases the quality of our teaching and gives you a solid foundation. If you love it and want to go deeper, you can join our comprehensive AI Bootcamp later (with a discount for email course graduates).",
  },
  {
    q: "Can I do this on mobile/tablet?",
    a: "The emails are mobile-friendly for reading, but you'll need a computer (Mac, Windows, or Linux) to complete the coding exercises. A standard laptop is perfect — no special hardware required.",
  },
  {
    q: "What will I have at the end?",
    a: "A fully functional AI agent that understands your GitHub project, deployed on the web, with documentation and demos. Plus the skills and confidence to build more AI applications on your own.",
  },
]

function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className="space-y-3">
      {faqItems.map((item, i) => {
        const isOpen = openIndex === i
        return (
          <div key={i} className="rounded-xl border border-border bg-card/40 overflow-hidden">
            <button
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left text-sm font-medium text-foreground transition-colors hover:bg-card/60"
              aria-expanded={isOpen}
            >
              <span>{item.q}</span>
              <ChevronDown
                className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform ${isOpen ? "rotate-180" : ""}`}
              />
            </button>
            {isOpen && (
              <div className="px-6 pb-4 text-sm text-muted-foreground leading-relaxed">{item.a}</div>
            )}
          </div>
        )
      })}
    </div>
  )
}

// ─── Data ────────────────────────────────────────────────────────────────────

const curriculum = [
  {
    day: 1,
    title: "Ingest and Index Your Data",
    intro: "Extract documentation and code from any GitHub repo",
    actions: ["Fetch GitHub repository content", "Extract documentation", "Prepare data for search"],
    deliverable: "Your project data downloaded and ready to be processed",
  },
  {
    day: 2,
    title: "Intelligent Processing for Data",
    intro: "Use AI to prepare data for search",
    actions: [
      "Cut and chunk your data for better search",
      "Split big documents using paragraphs and sections",
      "Apply intelligent chunking with AI",
    ],
    deliverable: "Your project data fully processed and ready for search",
  },
  {
    day: 3,
    title: "Add Search",
    intro: "Implement both lexical and semantic search capabilities",
    actions: [
      "Build lexical search for exact matches and keywords",
      "Implement semantic search using embeddings",
      "Combine them with hybrid search",
    ],
    deliverable: "Working search system you can query about your project",
  },
  {
    day: 4,
    title: "Agents and Tools",
    intro: "Add reasoning and function calling for intelligent responses",
    actions: [
      "Use OpenAI API for function calling",
      "Define tools for the agent",
      "Build agents with Pydantic AI",
    ],
    deliverable: "Agent that can answer questions about your codebase",
  },
  {
    day: 5,
    title: "Offline Evaluation and Testing",
    intro: "Test, interpret, and improve before deploying",
    actions: [
      "Create evaluation datasets for your specific use case",
      "Evaluate your search",
      "Use AI to evaluate your agents",
    ],
    deliverable: "Thoroughly tested agent with performance metrics",
  },
  {
    day: 6,
    title: "Publish Your Agent",
    intro: "Deploy the application with accessibility in mind",
    actions: ["Create UI for your agent with Streamlit", "Publish it on the Internet"],
    deliverable: "Live, accessible AI agent available on the web",
  },
  {
    day: 7,
    title: "Share Results & Peer Review",
    intro: "Create portfolio content, review peers' projects, and receive your certificate",
    actions: [
      "Write a project README",
      "Create demo videos and screenshots",
      "Review three fellow participants' projects",
      "Add to your portfolio with technical details",
      "Share progress on social media",
      "Receive your signed certificate of completion",
    ],
    deliverable: "Portfolio-ready project with peer feedback and signed certificate of completion",
  },
]

const cohortHighlights = [
  {
    icon: Calendar,
    title: "Cohort Timeline",
    description: "Join our cohort for focused learning with peers",
  },
  {
    icon: Users,
    title: "Peer Review Process",
    description: "Review 3 fellow participants' projects and get feedback on yours",
  },
  {
    icon: Award,
    title: "Verifiable Signed Certificate",
    description:
      "Get a signed, verifiable certificate with unique ID - accessible by anyone with the link",
  },
  {
    icon: ListChecks,
    title: "7-Day Curriculum",
    description: "Complete structured learning path from data ingestion to deployment",
  },
]

const capabilities = [
  {
    icon: CheckCircle2,
    title: "Read and understand any GitHub repository",
    description: "Using GitHub API to parse code, docs, issues, and comments with AI-powered chunking",
  },
  {
    icon: MessageSquare,
    title: "Answer complex questions about your code",
    description: "Combine lexical search with semantic embeddings using hybrid search and RAG",
  },
  {
    icon: Zap,
    title: "Take autonomous actions and make decisions",
    description: "Built with Pydantic AI for function calling and agentic reasoning capabilities",
  },
  {
    icon: Layers,
    title: "Deploy as web app using Streamlit",
    description: "Create accessible UI and publish on the internet with modern deployment",
  },
  {
    icon: BarChart3,
    title: "Measure and improve performance continuously",
    description: "AI-powered evaluation systems with custom datasets and automated testing",
  },
  {
    icon: Target,
    title: "Handle context and maintain conversation memory",
    description: "Advanced prompt engineering with OpenAI and alternative LLM integrations",
  },
]

const certificateFeatures = [
  {
    emoji: "signature",
    title: "Personally Signed",
    description: "Hand-signed by Alexey Grigorev, the course instructor",
  },
  {
    emoji: "link",
    title: "Verifiable & Shareable",
    description: "Unique ID and public link - anyone can verify its authenticity",
  },
  {
    emoji: "qr",
    title: "QR Code Verification",
    description: "Instant verification via QR code for employers and colleagues",
  },
  {
    emoji: "rocket",
    title: "Project Showcase",
    description: "Includes your actual GitHub project URL as proof of work",
  },
]

// ─── Page ────────────────────────────────────────────────────────────────────

export default function AIHeroPage() {
  return (
    <main className="min-h-screen">
      <Header />

      {/* Hero */}
      <section className="px-6 pt-32 pb-12 lg:px-8 lg:pt-40 lg:pb-16">
        <div className="mx-auto max-w-3xl">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Link>

          <div className="text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/5 px-4 py-1.5 text-sm text-accent">
            <Clock className="h-3.5 w-3.5" />
            7-Day Cohort Course
          </div>

          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            AI Agents Email Crash-Course
          </h1>

          <p className="mt-4 text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Join our cohort to build a complete AI agent from data ingestion to deployment. Complete
            the project + review three submissions to receive a certificate signed by me.
          </p>

          {/* Signup Form */}
          <div className="mt-8 mx-auto max-w-lg rounded-2xl border border-border bg-card/40 p-6">
            <SignupForm id="hero-email" />
            <div className="mt-4 flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
              <span>Cohort-based learning with peer reviews</span>
              <span>Verifiable signed certificate</span>
            </div>
          </div>
          </div>
        </div>
      </section>

      {/* Cohort Highlights */}
      <section className="border-t border-border px-6 py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl text-center">
            Cohort Now Open
          </h2>
          <p className="mt-2 text-muted-foreground text-center max-w-2xl mx-auto">
            This time it runs as a cohort: complete the project + review three submissions, and
            you&apos;ll receive a certificate signed by me.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {cohortHighlights.map((item) => {
              const Icon = item.icon
              return (
                <div
                  key={item.title}
                  className="flex items-start gap-4 rounded-xl border border-border bg-card/40 p-5 transition-colors hover:border-accent/40 hover:bg-card/60"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10">
                    <Icon className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{item.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Certificate Preview */}
          <div className="mt-12 rounded-xl border border-border bg-card/40 overflow-hidden">
            <div className="border-b border-border bg-secondary/50 px-6 py-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Your Cohort Certificate
              </span>
            </div>
            <div className="grid gap-8 p-6 md:grid-cols-2 items-center">
              <div className="rounded-xl border border-border bg-background p-8 text-center">
                <div className="text-4xl mb-4">
                  <Award className="h-12 w-12 mx-auto text-accent" />
                </div>
                <h3 className="text-lg font-bold">Certificate of Completion</h3>
                <p className="mt-2 text-sm text-muted-foreground">This certifies that</p>
                <div className="mt-2 text-lg font-semibold text-accent">[Your Name]</div>
                <p className="mt-2 text-sm text-muted-foreground">has successfully completed the</p>
                <div className="mt-1 font-semibold">7-Day AI Agents Crash-Course</div>
                <div className="mt-6 flex justify-between text-xs text-muted-foreground">
                  <div>
                    <div className="border-t border-border pt-2">Alexey Grigorev</div>
                    <div className="text-[10px]">Course Instructor</div>
                  </div>
                  <div>
                    <div className="border-t border-border pt-2">[Completion Date]</div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-4">What Makes This Certificate Special</h4>
                <div className="space-y-3">
                  {certificateFeatures.map((f) => (
                    <div
                      key={f.title}
                      className="flex items-start gap-3 rounded-lg border border-border bg-background p-3 transition-colors hover:border-accent/40"
                    >
                      <CheckCircle2 className="h-5 w-5 shrink-0 text-accent mt-0.5" />
                      <div>
                        <div className="text-sm font-semibold text-foreground">{f.title}</div>
                        <div className="text-xs text-muted-foreground">{f.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <a
              href="#signup-bottom"
              className="inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent/90"
            >
              Join the Cohort Now
            </a>
          </div>
        </div>
      </section>

      {/* Why You Need This Course */}
      <section className="border-t border-border px-6 py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl text-center">
            Why You Need This Course
          </h2>
          <p className="mt-2 text-muted-foreground text-center max-w-2xl mx-auto">
            LLMs are smart but they don&apos;t know anything about recent developments or private
            codebases. Learn to solve this by building an AI agent that understands your specific
            GitHub project.
          </p>

          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            <div className="rounded-xl border-l-4 border-l-red-500 border border-border bg-card/40 p-6">
              <h4 className="font-semibold text-red-500 mb-2">The Challenge</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Try asking ChatGPT about a framework released in 2025, or something from your
                private repository. It will fail because it doesn&apos;t have access to that
                information.
              </p>
            </div>
            <div className="rounded-xl border-l-4 border-l-accent border border-border bg-card/40 p-6">
              <h4 className="font-semibold text-accent mb-2">Our Solution</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Build a simple search engine that can answer questions about any modern framework —
                directly from its GitHub repository. Make AI work with your specific codebase.
              </p>
            </div>
          </div>

          <div className="mt-8 rounded-xl border border-accent/30 bg-accent/5 p-6 text-center">
            <p className="text-muted-foreground">
              <strong className="text-accent">End Result:</strong> A portfolio-ready project that
              showcases your AI development skills, complete with documentation, demos, deployment,
              and a certificate of completion to validate your expertise.
            </p>
          </div>
        </div>
      </section>

      {/* 7-Day Curriculum */}
      <section className="border-t border-border px-6 py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl text-center">
            What We Will Build Together In The Next 7 Days
          </h2>
          <p className="mt-2 text-muted-foreground text-center max-w-3xl mx-auto">
            Join our cohort to build an AI assistant that understands your GitHub project. Through
            step-by-step lessons and peer collaboration, you&apos;ll implement data ingestion,
            search capabilities, and intelligent reasoning to create a working AI agent.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {curriculum.map((day) => (
              <div
                key={day.day}
                className="rounded-xl border border-border bg-card/40 p-6 transition-colors hover:border-accent/40 hover:bg-card/60 flex flex-col"
              >
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/10 text-sm font-bold text-accent">
                    {day.day}
                  </div>
                  <h3 className="font-semibold text-foreground text-sm">
                    Day {day.day}: {day.title}
                  </h3>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{day.intro}</p>
                <ul className="space-y-1.5 mb-4 flex-1">
                  {day.actions.map((action) => (
                    <li key={action} className="flex items-start gap-2 text-xs text-muted-foreground">
                      <span className="text-accent mt-0.5">&#8226;</span>
                      {action}
                    </li>
                  ))}
                </ul>
                <div className="rounded-lg bg-accent/5 border-l-2 border-accent p-3 text-xs text-foreground">
                  <strong className="text-accent">Deliverable:</strong> {day.deliverable}
                </div>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="mt-10 grid grid-cols-3 gap-4">
            {[
              { value: "7", label: "Focused Days" },
              { value: "1-2h", label: "Daily Time" },
              { value: "100%", label: "Practical" },
            ].map((stat) => (
              <div key={stat.label} className="rounded-xl border border-border bg-card/40 p-4 text-center">
                <div className="text-2xl font-bold text-accent">{stat.value}</div>
                <div className="mt-1 text-xs text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Instructor */}
      <section className="border-t border-border px-6 py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl text-center mb-10">
            Meet Your Instructor
          </h2>

          <div className="flex flex-col gap-8 lg:flex-row lg:gap-12 items-center">
            <div className="shrink-0">
              <div className="h-40 w-40 rounded-full overflow-hidden border-2 border-border">
                <img
                  src="https://alexeygrigorev.com/aihero/images/Alexey-photo.jpeg"
                  alt="Alexey Grigorev"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold tracking-tight">Alexey Grigorev</h3>
              <p className="mt-1 text-sm text-accent">
                Principal Data Scientist | Book Author | Instructor to 100k+ Students
              </p>
              <div className="mt-4 space-y-3 text-sm text-muted-foreground leading-relaxed">
                <p>
                  Alexey Grigorev is the founder of DataTalks.Club and the creator of the popular
                  Zoomcamp series. With <strong className="text-foreground">15 years of experience in software engineering</strong> and
                  over <strong className="text-foreground">12 years in machine learning</strong>, he has built and deployed large-scale ML
                  systems at companies like OLX Group and Simplaex.
                </p>
                <p>
                  An advocate for practical, hands-on education, Alexey has
                  taught over <strong className="text-foreground">100,000 students</strong>, focusing on a code-first approach to help
                  learners build real-world skills.
                </p>
              </div>
              <div className="mt-4 flex gap-3">
                <a
                  href="https://www.linkedin.com/in/agrigorev/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-xs text-muted-foreground transition-colors hover:text-foreground hover:border-accent/40"
                >
                  LinkedIn
                  <ExternalLink className="h-3 w-3" />
                </a>
                <a
                  href="https://x.com/Al_Grigor"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-xs text-muted-foreground transition-colors hover:text-foreground hover:border-accent/40"
                >
                  Twitter
                  <ExternalLink className="h-3 w-3" />
                </a>
                <a
                  href="https://datatalks.club/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-xs text-muted-foreground transition-colors hover:text-foreground hover:border-accent/40"
                >
                  DataTalks.Club
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Certificate Section */}
      <section className="border-t border-border px-6 py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Certificate of Completion
          </h2>
          <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">
            Upon successfully completing all 7 days of the course, you&apos;ll receive a
            professional certificate to validate your AI development skills.
          </p>
        </div>
      </section>

      {/* Mid-page Signup */}
      <section className="px-6 py-8 lg:px-8">
        <div className="mx-auto max-w-lg rounded-2xl border border-border bg-card/40 p-6">
          <SignupForm id="mid-email" />
        </div>
      </section>

      {/* Agent Capabilities */}
      <section className="border-t border-border px-6 py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl text-center">
            Your AI Agent Will Be Able To
          </h2>
          <p className="mt-2 text-muted-foreground text-center max-w-2xl mx-auto">
            Build a complete AI agent that deeply understands your codebase and can help with real
            development tasks.
          </p>
          <div className="mt-2 text-center">
            <span className="text-sm text-accent font-medium">
              Portfolio-Ready Project: Showcase modern AI development skills
            </span>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {capabilities.map((cap) => {
              const Icon = cap.icon
              return (
                <div
                  key={cap.title}
                  className="flex items-start gap-4 rounded-xl border border-border bg-card/40 p-5 transition-colors hover:border-accent/40 hover:bg-card/60"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10">
                    <Icon className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground text-sm">{cap.title}</h4>
                    <p className="mt-1 text-xs text-muted-foreground">{cap.description}</p>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Example Interaction */}
          <div className="mt-10 rounded-xl border border-border bg-card/40 overflow-hidden max-w-2xl mx-auto">
            <div className="border-b border-border bg-secondary/50 px-6 py-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Example Interaction
              </span>
            </div>
            <div className="p-6 space-y-4">
              <div className="rounded-lg bg-accent/10 border border-accent/20 p-4 ml-8 text-sm">
                <strong className="text-accent">You:</strong>{" "}
                <span className="text-foreground">
                  &quot;How does authentication work in this project?&quot;
                </span>
              </div>
              <div className="rounded-lg bg-secondary/50 border border-border p-4 mr-8 text-sm">
                <strong className="text-foreground">Agent:</strong>{" "}
                <span className="text-muted-foreground">
                  &quot;Based on the codebase analysis, this project uses JWT authentication with
                  middleware in auth.js. The login flow starts in LoginController.js and uses bcrypt
                  for password hashing. Here are the key files involved...&quot;
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bootcamp Upsell */}
      <section className="border-t border-border px-6 py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl text-center">
            Continue Your AI Development Journey
          </h2>
          <p className="mt-2 text-muted-foreground text-center max-w-2xl mx-auto">
            This free email course provides the foundation for advanced AI agent development. Take
            the next step with our comprehensive bootcamp program.
          </p>

          <div className="mt-10 max-w-2xl mx-auto space-y-4">
            <div className="flex items-start gap-4 rounded-xl border-2 border-accent/40 bg-accent/5 p-6">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent text-sm font-bold text-accent-foreground">
                1
              </div>
              <div>
                <h4 className="font-semibold text-foreground">
                  7-Day AI Agents Email Crash-Course
                </h4>
                <p className="mt-1 text-sm text-muted-foreground">
                  Build your first AI agent - Learn core concepts - Create portfolio project
                </p>
                <span className="mt-2 inline-block rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
                  You are here
                </span>
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-xl border border-border bg-card/40 p-6 transition-colors hover:border-accent/40">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-secondary text-sm font-bold text-muted-foreground">
                2
              </div>
              <div>
                <h4 className="font-semibold text-foreground">
                  AI Bootcamp: From RAG to Agents
                </h4>
                <p className="mt-1 text-sm text-muted-foreground">
                  Advanced systems - Production deployment - Enterprise solutions
                </p>
                <a
                  href="https://maven.com/alexey-grigorev/from-rag-to-agents"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center gap-1 text-sm text-accent hover:text-accent/80 transition-colors"
                >
                  View Details and Enroll
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          </div>

          <div className="mt-8 rounded-xl border border-accent/30 bg-accent/5 p-6 max-w-2xl mx-auto text-center">
            <h4 className="font-semibold text-foreground">
              Email Course Graduates Get 15% Off
            </h4>
            <p className="mt-2 text-sm text-muted-foreground">
              Complete this free 7-day course and receive a{" "}
              <strong className="text-accent">15% discount</strong> on the full AI Bootcamp
              enrollment. Your promo code will be included in one of the course emails.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-border px-6 py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl text-center">
            Frequently Asked Questions
          </h2>
          <p className="mt-2 text-muted-foreground text-center">
            Click any question to expand the answer.
          </p>

          <div className="mt-10">
            <FaqAccordion />
          </div>
        </div>
      </section>

      {/* Bottom Signup */}
      <section id="signup-bottom" className="px-6 py-12 lg:px-8 lg:py-16">
        <div className="mx-auto max-w-lg rounded-2xl border border-border bg-card/40 p-6">
          <SignupForm id="bottom-email" cta="Start Free Course" />
          <p className="mt-3 text-center text-xs text-muted-foreground">
            Questions answered? Let&apos;s get started!
          </p>
        </div>
      </section>

      <Footer />
    </main>
  )
}
