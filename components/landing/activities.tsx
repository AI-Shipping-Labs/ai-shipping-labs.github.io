"use client"

import React from "react"

import { useState } from "react"
import { 
  Video, 
  MessageCircleQuestion, 
  FileEdit, 
  Eye, 
  BookOpen, 
  Percent, 
  FolderKanban, 
  Trophy,
  Check,
  Users,
  Star
} from "lucide-react"
import { cn } from "@/lib/utils"

type TierKey = "supporter" | "community" | "inner"

interface Activity {
  icon: React.ElementType
  title: string
  description: string
  tiers: TierKey[]
}

const activities: Activity[] = [
  {
    icon: Video,
    title: "Biweekly Expert Sessions",
    description: "Regular sessions focused on one narrow, practical topic, led by Alexey or a trusted expert. Each session includes a written summary with key insights, decisions, and action points—turning every session into a long-term asset.",
    tiers: ["supporter", "community", "inner"],
  },
  {
    icon: MessageCircleQuestion,
    title: "Structured Q&A with Alexey",
    description: "Recurring Q&A sessions where members submit questions ahead of time. Alexey answers by explaining reasoning, trade-offs, and priorities rather than giving quick fixes. Community members can join live and ask questions directly.",
    tiers: ["community", "inner"],
  },
  {
    icon: FileEdit,
    title: "Influence Content Direction",
    description: "Propose, vote on, or refine upcoming newsletter topics and workshop themes. Option to collaborate with Alexey and publish articles on the Alexey on Data newsletter.",
    tiers: ["community", "inner"],
  },
  {
    icon: Eye,
    title: "Early Access to Drafts",
    description: "See draft content, talk outlines, and early ideas before they go public. Get first access to materials that will appear on the newsletter and YouTube channel.",
    tiers: ["community", "inner"],
  },
  {
    icon: BookOpen,
    title: "Curated Resource Library",
    description: "A members-only collection of carefully selected resources with short annotations explaining why each one matters and when to use it.",
    tiers: ["community", "inner"],
  },
  {
    icon: Percent,
    title: "Discounts & Promo Access",
    description: "Occasional access to discounts for relevant tools, courses, and resources—positioned as a bonus rather than a core benefit.",
    tiers: ["community", "inner"],
  },
  {
    icon: FolderKanban,
    title: "Project of the Month",
    description: "Similar to Project of the Week at DataTalks.Club, but exclusive to community members. Work on focused, practical projects with structured guidance.",
    tiers: ["community", "inner"],
  },
  {
    icon: Trophy,
    title: "Internal Hackathons",
    description: "Build alongside other practitioners in focused hackathons. Present your solutions to the whole group on video and get feedback from peers and Alexey.",
    tiers: ["community", "inner"],
  },
  {
    icon: Users,
    title: "Calibration Sessions",
    description: "Exclusive sessions with Alexey: resume, LinkedIn, or GitHub teardowns focused on patterns, positioning, and decision quality. Sessions are shared within the Inner Circle to maximize learning.",
    tiers: ["inner"],
  },
  {
    icon: Star,
    title: "1-on-1 & Small Group Access",
    description: "Eligibility for limited 1-on-1 or small-group conversations with Alexey. Participation rotates across members. Conversations are exploratory and reflective.",
    tiers: ["inner"],
  },
]

const tierConfig = {
  supporter: {
    name: "Supporter",
    color: "border-muted-foreground/30",
    bgActive: "bg-muted-foreground/20",
    textActive: "text-muted-foreground",
  },
  community: {
    name: "Community",
    color: "border-accent",
    bgActive: "bg-accent",
    textActive: "text-accent-foreground",
  },
  inner: {
    name: "Inner Circle",
    color: "border-foreground",
    bgActive: "bg-foreground",
    textActive: "text-background",
  },
}

export function Activities() {
  const [selectedTier, setSelectedTier] = useState<TierKey | "all">("all")

  const filteredActivities = selectedTier === "all" 
    ? activities 
    : activities.filter(a => a.tiers.includes(selectedTier))

  return (
    <section id="activities" className="border-t border-border bg-background py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-accent">What You Get</p>
          <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            Activities and access by tier
          </h2>
          <p className="mt-6 text-pretty text-lg leading-relaxed text-muted-foreground">
            Each tier unlocks more ways to learn, build, and get feedback. Filter by tier to see what's included.
          </p>
        </div>

        {/* Tier Filter */}
        <div className="mx-auto mt-10 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => setSelectedTier("all")}
            className={cn(
              "rounded-full px-4 py-2 text-sm font-medium transition-colors",
              selectedTier === "all"
                ? "bg-accent text-accent-foreground"
                : "bg-secondary text-muted-foreground hover:text-foreground"
            )}
          >
            All Activities
          </button>
          {(Object.keys(tierConfig) as TierKey[]).map((tier) => (
            <button
              key={tier}
              type="button"
              onClick={() => setSelectedTier(tier)}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                selectedTier === tier
                  ? "bg-accent text-accent-foreground"
                  : "bg-secondary text-muted-foreground hover:text-foreground"
              )}
            >
              {tierConfig[tier].name}
            </button>
          ))}
        </div>

        {/* Activities Grid */}
        <div className="mx-auto mt-12 grid max-w-6xl gap-6 md:grid-cols-2">
          {filteredActivities.map((activity) => (
            <div
              key={activity.title}
              className="group rounded-xl border border-border bg-card p-6 transition-colors hover:border-accent/50"
            >
              <div className="flex items-start gap-4">
                <div className="shrink-0 rounded-lg bg-secondary p-3">
                  <activity.icon className="h-5 w-5 text-accent" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">{activity.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {activity.description}
                  </p>
                  
                  {/* Tier badges */}
                  <div className="mt-4 flex flex-wrap gap-2">
                    {(Object.keys(tierConfig) as TierKey[]).map((tier) => {
                      const included = activity.tiers.includes(tier)
                      return (
                        <span
                          key={tier}
                          className={cn(
                            "inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium",
                            included
                              ? cn(tierConfig[tier].bgActive, tierConfig[tier].textActive, "border-transparent")
                              : "border-border text-muted-foreground/40"
                          )}
                        >
                          {included && <Check className="h-3 w-3" />}
                          {tierConfig[tier].name}
                        </span>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tier Breakdown Cards */}
        <div className="mx-auto mt-20 max-w-6xl">
          <h3 className="mb-8 text-center text-xl font-semibold text-foreground">
            Quick comparison
          </h3>
          <div className="grid gap-6 md:grid-cols-3">
            {/* Supporter */}
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="mb-4 flex items-center gap-3">
                <div className="rounded-full bg-muted-foreground/20 p-2">
                  <Eye className="h-4 w-4 text-muted-foreground" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">Supporter</h4>
                  <p className="text-xs text-muted-foreground">Read and watch</p>
                </div>
              </div>
              <ul className="space-y-2">
                {activities.filter(a => a.tiers.includes("supporter")).map(a => (
                  <li key={a.title} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check className="h-3.5 w-3.5 shrink-0 text-accent" />
                    {a.title}
                  </li>
                ))}
              </ul>
              <div className="mt-4 border-t border-border pt-4">
                <p className="text-xs text-muted-foreground">
                  {activities.filter(a => a.tiers.includes("supporter")).length} activities
                </p>
              </div>
            </div>

            {/* Community */}
            <div className="rounded-xl border border-accent bg-card p-6">
              <div className="mb-4 flex items-center gap-3">
                <div className="rounded-full bg-accent p-2">
                  <Users className="h-4 w-4 text-accent-foreground" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">Community</h4>
                  <p className="text-xs text-accent">Build together</p>
                </div>
              </div>
              <ul className="space-y-2">
                {activities.filter(a => a.tiers.includes("community")).map(a => (
                  <li key={a.title} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check className="h-3.5 w-3.5 shrink-0 text-accent" />
                    {a.title}
                  </li>
                ))}
              </ul>
              <div className="mt-4 border-t border-border pt-4">
                <p className="text-xs text-muted-foreground">
                  {activities.filter(a => a.tiers.includes("community")).length} activities
                </p>
              </div>
            </div>

            {/* Inner Circle */}
            <div className="rounded-xl border border-foreground bg-card p-6">
              <div className="mb-4 flex items-center gap-3">
                <div className="rounded-full bg-foreground p-2">
                  <Star className="h-4 w-4 text-background" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">Inner Circle</h4>
                  <p className="text-xs text-muted-foreground">Direct access</p>
                </div>
              </div>
              <ul className="space-y-2">
                {activities.filter(a => a.tiers.includes("inner")).map(a => (
                  <li key={a.title} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check className="h-3.5 w-3.5 shrink-0 text-accent" />
                    {a.title}
                  </li>
                ))}
              </ul>
              <div className="mt-4 border-t border-border pt-4">
                <p className="text-xs text-muted-foreground">
                  All {activities.filter(a => a.tiers.includes("inner")).length} activities
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
