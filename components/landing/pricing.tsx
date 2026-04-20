"use client"

import { useState } from "react"
import { Check, X, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { getPaymentLink, type StripeTier } from "@/lib/stripe-links"

const tiers = [
  {
    name: "Basic",
    stripeKey: "basic" as StripeTier,
    tagline: "Written content only",
    description: "Access written educational content for self-directed learning at your own pace. No community access is included in this tier.",
    priceMonthly: 20,
    priceAnnual: 200,
    hook: "Written content only, with no community access.",
    features: [
      { text: "Exclusive Substack content", included: true },
      { text: "Hands-on tutorials with practical code examples", included: true },
      { text: "Trend breakdowns from an engineering perspective", included: true },
      { text: "Curated collection of high-signal social posts", included: true }
    ],
    positioning: "Best for independent builders who prefer self-paced learning. Upgrade to Main for structure, accountability, and community support.",
    highlighted: false,
  },
  {
    name: "Main",
    stripeKey: "main" as StripeTier,
    tagline: "Community access + live learning",
    description: "Everything in Basic, plus full community access, structure, accountability, and peer support to ship your AI projects consistently.",
    priceMonthly: 50,
    priceAnnual: 500,
    hook: "Build with the community through live activities, without course access.",
    features: [
      { text: "Everything in Basic", included: true },
      { text: "Accountability circles with sprint goals and regular live check-ins", included: true },
      { text: "Group learning through member-led research and shared practical takeaways", included: true },
      { text: "Building sessions with live host-led work on real implementation questions", included: true },
      { text: "Trend breakdowns from an engineering perspective with pointers to code and source material", included: true },
      { text: "Career support on interviews, offers, salary questions, LinkedIn, GitHub, and project positioning", included: true },
    ],
    positioning: "Best for builders who want community access, structure, and accountability. Choose Premium if you also want access to mini-courses.",
    highlighted: true,
  },
  {
    name: "Premium",
    stripeKey: "premium" as StripeTier,
    tagline: "Community access + courses",
    description: "Everything in Main, including community access, plus mini-courses and personalized career guidance to accelerate your growth.",
    priceMonthly: 100,
    priceAnnual: 1000,
    hook: "Get community access plus course access for a more structured learning path.",
    features: [
      { text: "Everything in Main", included: true },
      { text: "Access to all mini-courses on specialized topics, with a regularly updated collection (including Python for Data and AI Engineering)", included: true },
      { text: "Personalized career guidance and feedback", included: true },
    ],
    positioning: "Best for builders seeking structured learning paths to complement hands-on projects, plus personalized career guidance.",
    highlighted: false,
  },
]

export function Pricing() {
  const [annual, setAnnual] = useState(true)

  return (
    <section id="tiers" className="border-t border-border bg-card py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-accent">Membership</p>
          <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            Choose your level of engagement
          </h2>
          <p className="mt-6 text-pretty text-lg leading-relaxed text-muted-foreground">
            Each tier is designed for a different type of builder. More investment means more structure, accountability, 
            and support to help you ship your AI projects consistently.
          </p>
          
          <div className="mt-8 flex items-center justify-center gap-4">
            <span className={cn("text-sm", !annual && "text-foreground", annual && "text-muted-foreground")}>
              Monthly
            </span>
            <button
              type="button"
              onClick={() => setAnnual(!annual)}
              className={cn(
                "relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors",
                annual ? "bg-accent" : "bg-secondary"
              )}
              aria-label="Toggle annual pricing"
            >
              <span
                className={cn(
                  "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-foreground shadow ring-0 transition-transform",
                  annual ? "translate-x-5" : "translate-x-0"
                )}
              />
            </button>
            <span className={cn("text-sm", annual && "text-foreground", !annual && "text-muted-foreground")}>
              Annual <span className="text-accent">(Save ~17%)</span>
            </span>
          </div>
        </div>

        <div className="mx-auto mt-10 max-w-4xl rounded-2xl border border-accent/40 bg-accent/10 p-5 sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="flex items-center gap-1.5 text-sm font-semibold uppercase tracking-wide text-accent">
                <Star className="h-4 w-4" />
                Limited Time
              </p>
              <p className="mt-1 text-sm font-medium text-foreground">
                Personal action plan included in Main and Premium
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Get clear priorities for what to build and learn next. Available for early members only.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-flex rounded-full border border-accent/50 bg-background px-3 py-1 text-xs font-medium text-accent">
                Main
              </span>
              <span className="inline-flex rounded-full border border-accent/50 bg-background px-3 py-1 text-xs font-medium text-accent">
                Premium
              </span>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-12 grid max-w-7xl gap-6 lg:grid-cols-3">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={cn(
                "relative flex flex-col rounded-xl border p-8 transition-all",
                tier.highlighted
                  ? "border-accent bg-background shadow-xl shadow-accent/10 ring-2 ring-accent/20 lg:scale-105"
                  : "border-border bg-background"
              )}
            >
              {tier.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1 rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground">
                    <Star className="h-3 w-3" />
                    Most Popular
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-foreground">{tier.name}</h3>
                <p className="mt-1 text-sm text-accent">{tier.tagline}</p>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline">
                  <span className="text-4xl font-semibold text-foreground">
                    €{annual ? tier.priceAnnual : tier.priceMonthly}
                  </span>
                  <span className="ml-2 text-muted-foreground">
                    /{annual ? "year" : "month"}
                  </span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{tier.hook}</p>
              </div>

              <p className="mb-6 text-sm text-muted-foreground">{tier.description}</p>

              <ul className="mb-8 flex-1 space-y-3">
                {tier.features.map((feature, index) => (
                  <li key={feature.text} className="flex items-start gap-3">
                    {feature.included ? (
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                    ) : (
                      <X className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground/50" />
                    )}
                    <span
                      className={cn(
                        "text-sm",
                        feature.included ? "text-foreground" : "text-muted-foreground/50"
                      )}
                    >
                      {feature.text}
                    </span>
                  </li>
                ))}
                {(tier.name === "Main" || tier.name === "Premium") && (
                  <li className="mt-4 flex items-start gap-3 rounded-lg border border-accent/30 bg-accent/5 p-3">
                    <Star className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                    <span className="text-sm font-medium text-accent">
                      Personal action plan included (limited time)
                    </span>
                  </li>
                )}
              </ul>

              <div className="mt-auto space-y-4">
                <p className="text-xs text-muted-foreground">{tier.positioning}</p>
                <Button
                  asChild
                  className={cn(
                    "w-full",
                    tier.highlighted
                      ? "bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg shadow-accent/20"
                      : "bg-secondary text-foreground hover:bg-secondary/80"
                  )}
                >
                  <a href={getPaymentLink(tier.stripeKey, annual)} target="_blank" rel="noopener noreferrer">
                    {tier.highlighted ? "Get Started" : `Choose ${tier.name}`}
                  </a>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
