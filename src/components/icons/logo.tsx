import type * as React from 'react'

export const Logo = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M20 20h-4V4h4v16zM12 20h-4V12h4v8zM4 20H2v-4a2 2 0 012-2h2v6z" />
    <path d="M2 10h12" />
    <path d="M18 8h2" />
    <path d="M18 12h4" />
    <path d="M18 16h2" />
  </svg>
)
