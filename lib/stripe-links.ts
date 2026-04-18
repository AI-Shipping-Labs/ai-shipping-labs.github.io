export type StripeTier = "basic" | "main" | "premium"

const paymentLinks: Record<StripeTier, { monthly: string; annual: string }> = {
  basic: {
    monthly: "https://buy.stripe.com/aFa6oGdrN8XT8oFcoJgbm0c",
    annual: "https://buy.stripe.com/eVq7sK5Zl2zveN388tgbm0b",
  },
  main: {
    monthly: "https://buy.stripe.com/7sYbJ0afBb61gVbfAVgbm0a",
    annual: "https://buy.stripe.com/3cI00ifzV6PL7kB0G1gbm07",
  },
  premium: {
    monthly: "https://buy.stripe.com/7sY3cudrNeid6gx9cxgbm09",
    annual: "https://buy.stripe.com/cNi9AS2N96PLbARagBgbm08",
  },
}

export const CUSTOMER_PORTAL_URL = "https://billing.stripe.com/p/login/14A4gy0F1b610WdewRgbm00"

export function getPaymentLink(tier: StripeTier, annual: boolean): string {
  return annual ? paymentLinks[tier].annual : paymentLinks[tier].monthly
}
