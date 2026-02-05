import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-balance text-2xl font-semibold tracking-tight sm:text-3xl">
            Ready to join the conversation?
          </h2>
          <p className="mt-4 text-muted-foreground">
            This community is invite-only. Request access and tell us about what you're building.
          </p>
          <Button size="lg" className="mt-8 bg-accent text-accent-foreground hover:bg-accent/90">
            Request Invite
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        <div className="mt-16 grid gap-8 border-t border-border pt-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded bg-accent" />
              <span className="font-semibold">AI Engineering Lab</span>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              A technical community for AI, data, and engineering practitioners.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground">Community</h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link href="/about" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  About Alexey Grigorev
                </Link>
              </li>
              <li>
                <Link href="/topics" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  Topics
                </Link>
              </li>
              <li>
                <Link href="/#tiers" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  Membership Tiers
                </Link>
              </li>
              <li>
                <Link href="/#faq" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground">Connect</h3>
            <ul className="mt-4 space-y-3">
              <li>
                <a href="https://Alexey Grigorevondata.substack.com" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  Substack
                </a>
              </li>
              <li>
                <a href="https://youtube.com/@datatalksclub" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  YouTube
                </a>
              </li>
              <li>
                <a href="https://linkedin.com/in/agrigorev" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href="https://datatalks.club" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  DataTalks.Club
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground">Legal</h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-border pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} AI Engineering Lab by Alexey Grigorev. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
