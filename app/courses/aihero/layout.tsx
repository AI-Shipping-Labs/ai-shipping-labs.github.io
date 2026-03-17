import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "7-Day AI Agents Email Crash-Course | AI Shipping Labs",
  description:
    "Learn to build a production-ready AI agent for your GitHub project in just 7 days. From data ingestion to deployment and sharing results.",
  openGraph: {
    title: "7-Day AI Agents Email Crash-Course",
    description:
      "Learn to build a production-ready AI agent for your GitHub project in just 7 days. From data ingestion to deployment and sharing results.",
    url: "https://aishippinglabs.com/courses/aihero",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "7-Day AI Agents Email Crash-Course",
    description:
      "Learn to build a production-ready AI agent for your GitHub project in just 7 days. From data ingestion to deployment and sharing results.",
  },
}

export default function AIHeroLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
