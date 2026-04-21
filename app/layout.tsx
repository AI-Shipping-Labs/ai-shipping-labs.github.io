import React from "react"
import type { Metadata } from "next"
import Script from "next/script"
import { Inter, JetBrains_Mono, Dancing_Script } from 'next/font/google'

import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
})

const dancingScript = Dancing_Script({
  subsets: ['latin'],
  variable: '--font-script',
})

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://aishippinglabs.com'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'AI Shipping Labs | A Technical Community',
    template: '%s | AI Shipping Labs',
  },
  description: 'An invite-only community for action-oriented builders who want to turn AI ideas into real projects.',
  keywords: ['AI community', 'AI engineering', 'machine learning', 'data engineering', 'AI tools', 'technical community', 'Alexey Grigorev'],
  authors: [{ name: 'Alexey Grigorev' }],
  creator: 'Alexey Grigorev',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'AI Shipping Labs',
    title: 'AI Shipping Labs | A Technical Community',
    description: 'An invite-only community for action-oriented builders who want to turn AI ideas into real projects.',
    images: [
      {
        url: '/ai-shipping-labs.jpg',
        width: 1200,
        height: 630,
        alt: 'AI Shipping Labs — Turn AI ideas into real projects',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Shipping Labs | A Technical Community',
    description: 'An invite-only community for action-oriented builders who want to turn AI ideas into real projects.',
    images: ['/ai-shipping-labs.jpg'],
    creator: '@alexeygrigorev', // Update with actual Twitter handle if available
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/logo.jpeg',
    apple: '/logo.jpeg',
  },
  verification: {
    // Add verification codes when available
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'AI Shipping Labs',
    description: 'An invite-only community for action-oriented builders who want to turn AI ideas into real projects.',
    url: siteUrl,
    founder: {
      '@type': 'Person',
      name: 'Alexey Grigorev',
    },
    sameAs: [
      // Add social media links when available
      // 'https://twitter.com/alexeygrigorev',
      // 'https://linkedin.com/in/agrigorev',
    ],
  }

  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} ${dancingScript.variable}`}>
      <head>
        {/* Google Tag Manager */}
        <Script
          id="gtm-script"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-MMDSSVMX');`,
          }}
        />
        <Script
          id="mathjax-config"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.MathJax = {
                tex: {
                  inlineMath: [['\\\\(','\\\\)'], ['$', '$']],
                  displayMath: [['\\\\[','\\\\]'], ['$$', '$$']],
                  processEscapes: true
                }
              };
            `,
          }}
        />
        <Script
          id="mathjax-script"
          src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"
          strategy="afterInteractive"
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="font-sans antialiased bg-background text-foreground">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-MMDSSVMX"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {children}
      </body>
    </html>
  )
}
