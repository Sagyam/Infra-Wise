import { ThemeProvider } from '@/components/app/theme-provider'
import { Toaster } from '@/components/ui/toaster'
import { Analytics } from '@vercel/analytics/react'
import type { Metadata } from 'next'

import './globals.css'

export const metadata: Metadata = {
  title: 'InfraWise - Cloud vs. On-Prem TCO Analysis',
  description:
    'InfraWise is an financial modeling tool to compare the Total Cost of Ownership (TCO) between cloud and on-premise infrastructure. Make informed decisions with detailed cost breakdowns and breakeven analysis.',
  icons: {
    icon: '/favicon.png',
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
    title: 'InfraWise - Cloud vs. On-Prem TCO Analysis',
    description:
      'Compare cloud and on-premise infrastructure costs with this calculator.',
    url: 'https://infrawise.sagyamthapa.com.np',
    siteName: 'InfraWise',
    images: [
      {
        url: 'https://infrawise.sagyamthapa.com.np/og-image.png',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'InfraWise - Cloud vs. On-Prem TCO Analysis',
    description:
      'Make informed infrastructure decisions. Compare cloud vs. on-premise TCO with this tool.',
    // creator: '@sagyam21',
    images: ['https://infrawise.sagyamthapa.com.np/og-image.png'],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=Source+Code+Pro:wght@400;500&family=Space+Grotesk:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
        <title>InfraWise - Cloud vs. On-Prem Analysis</title>
      </head>
      <body className="font-body antialiased" suppressHydrationWarning>
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
