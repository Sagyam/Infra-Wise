import { Analytics } from '@vercel/analytics/react'
import type { Metadata } from 'next'
import { JetBrains_Mono, Space_Grotesk, Work_Sans } from 'next/font/google'
import { ThemeProvider } from '@/components/app/theme-provider'
import { Toaster } from '@/components/ui/toaster'

import './globals.css'

// The type of sagyamthapa.com.np: Work Sans for text, Space Grotesk for headings, JetBrains Mono for figures.
const workSans = Work_Sans({ variable: '--font-work-sans', subsets: ['latin'] })
const spaceGrotesk = Space_Grotesk({
  variable: '--font-space-grotesk',
  subsets: ['latin'],
})
const jetbrainsMono = JetBrains_Mono({
  variable: '--font-jetbrains-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'InfraWise - Cloud vs. On-Prem Analysis',
  description:
    'InfraWise is an financial modeling tool to compare the Total Cost of Ownership (TCO) between cloud and on-premise infrastructure. Make informed decisions with detailed cost breakdowns and breakeven analysis.',
  icons: {
    icon: [
      { url: '/logo.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: '32x32' },
    ],
    apple: '/apple-touch-icon.png',
  },
  keywords: [
    'TCO calculator',
    'cloud vs on-premise',
    'cost analysis',
    'financial modeling',
    'infrastructure cost',
    'AI',
  ],
  openGraph: {
    title: 'InfraWise - Cloud vs. On-Prem Cost Analysis',
    description:
      'Compare cloud and on-premise infrastructure costs with this calculator.',
    url: 'https://infrawise.sagyamthapa.com.np',
    siteName: 'InfraWise',
    images: [
      {
        url: './og-image.png',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'InfraWise - Cloud vs. On-Prem Cost Analysis',
    description:
      'Make informed infrastructure decisions. Compare cloud vs. on-premise TCO with this tool.',
    creator: '@sagyam21',
    images: ['./og-image.png'],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${workSans.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
