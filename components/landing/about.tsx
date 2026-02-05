import { Zap, Target, Users, Brain } from "lucide-react"

const features = [
  {
    icon: Zap,
    title: "Signal, not noise",
    description: "Opinionated briefs on tools and practices. Filtered through real-world experience, not hype cycles.",
  },
  {
    icon: Target,
    title: "Calibration over content",
    description: "Feedback on positioning, decisions, and work-in-progress. Learn through shared reasoning.",
  },
  {
    icon: Users,
    title: "Practitioners only",
    description: "Engineers, data scientists, and AI builders who are actively shipping. No lurkers, no tourists.",
  },
  {
    icon: Brain,
    title: "Judgment over frameworks",
    description: "Develop better instincts for technical decisions. Context matters more than best practices.",
  },
]

export function About() {
  return (
    <section id="about" className="border-t border-border bg-background py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-accent">Why this community</p>
          <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            Built for builders who want more than content
          </h2>
          <p className="mt-6 text-pretty text-lg leading-relaxed text-muted-foreground">
            Most communities optimize for engagement. This one optimizes for calibration—helping you make 
            better technical decisions by exposing you to Alexey's judgment and reasoning process.
          </p>
        </div>
        
        <div className="mx-auto mt-16 grid max-w-5xl gap-8 sm:grid-cols-2">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group rounded-lg border border-border bg-card p-8 transition-colors hover:border-accent/50"
            >
              <div className="mb-4 inline-flex rounded-lg bg-secondary p-3">
                <feature.icon className="h-6 w-6 text-accent" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">{feature.title}</h3>
              <p className="mt-2 text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
