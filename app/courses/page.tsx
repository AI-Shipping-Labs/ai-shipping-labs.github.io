import Link from "next/link"
import { ArrowLeft, ExternalLink, Users, Calendar, GraduationCap } from "lucide-react"
import { Header } from "@/components/landing/header"
import { Footer } from "@/components/landing/footer"

export const metadata = {
  title: "Courses | AI Shipping Labs",
  description:
    "Free and paid courses on AI engineering, machine learning, data engineering, and more. From the creators of DataTalks.Club Zoomcamps.",
}

const courses = [
  {
    name: "AI Engineering Buildcamp: from RAG to Agents",
    url: "https://maven.com/alexey-grigorev/from-rag-to-agents",
    free: false,
    description:
      "Build production-ready AI systems from core concepts. Learn LLMs, RAG, agentic flows, testing, evaluation, and monitoring.",
    topics: ["LLMs", "RAG", "OpenAI", "PydanticAI", "MCP", "Grafana", "OpenTelemetry", "Testing"],
    students: "50+",
    period: "2025-present",
    internal: false,
  },
  {
    name: "AI Agents 7-Day Crash-Course",
    url: "/courses/aihero",
    free: true,
    description:
      "7-day email course to build a complete AI agent from data ingestion to deployment based on your GitHub project.",
    topics: ["OpenAI", "Data Ingestion", "Chunking", "Search", "PydanticAI", "Streamlit"],
    students: "1,500+",
    period: "2025-present",
    internal: true,
  },
]

export default function CoursesPage() {
  return (
    <main className="min-h-screen">
      <Header />

      <section className="px-6 pt-32 pb-16 lg:px-8 lg:pt-40 lg:pb-24">
        <div className="mx-auto max-w-4xl">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Link>

          <div className="mb-12">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Courses</h1>
            <p className="mt-4 text-muted-foreground leading-relaxed max-w-2xl">
              Free and paid courses on AI engineering, machine learning, data engineering, and more.
              From the creators of DataTalks.Club Zoomcamps.
            </p>
          </div>

          <div className="space-y-4">
            {courses.map((course) => {
              const LinkOrA = course.internal ? Link : "a"
              const linkProps = course.internal
                ? { href: course.url }
                : { href: course.url, target: "_blank", rel: "noopener noreferrer" }

              return (
                <LinkOrA
                  key={course.name}
                  {...(linkProps as any)}
                  className="group block rounded-xl border border-border bg-card/40 p-6 transition-colors hover:border-accent/40 hover:bg-card/60"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 flex-wrap">
                        <h2 className="font-semibold text-foreground group-hover:text-accent transition-colors">
                          {course.name}
                        </h2>
                        {course.free && (
                          <span className="rounded-full bg-accent/10 px-2.5 py-0.5 text-xs font-semibold text-accent">
                            Free
                          </span>
                        )}
                        {!course.internal && (
                          <ExternalLink className="h-4 w-4 text-muted-foreground" />
                        )}
                      </div>
                      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                        {course.description}
                      </p>
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {course.topics.map((topic) => (
                          <span
                            key={topic}
                            className="rounded-full bg-secondary px-2.5 py-0.5 text-xs text-muted-foreground"
                          >
                            {topic}
                          </span>
                        ))}
                      </div>
                      <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Users className="h-3.5 w-3.5" />
                          {course.students} students
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3.5 w-3.5" />
                          {course.period}
                        </span>
                      </div>
                    </div>
                  </div>
                </LinkOrA>
              )
            })}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
