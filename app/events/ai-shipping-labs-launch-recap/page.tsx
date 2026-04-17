import type { Metadata } from "next"
import { EventRecapLandingPage } from "@/components/events/EventRecapLandingPage"

export const metadata: Metadata = {
  title: "AI Shipping Labs Launch Stream Recap",
  description:
    "A visual recap of the AI Shipping Labs launch stream with key highlights and clear next steps to join the community.",
}

export default function AIShippingLabsLaunchRecapPage() {
  return <EventRecapLandingPage />
}
