import type * as React from 'react'

/** The InfraWise mark: cloud cost climbs, on-prem stays flat, and the dot is where they break even. */
export const Logo = ({
  id = 'logo',
  ...props
}: React.SVGProps<SVGSVGElement> & { id?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 256 256"
    aria-label="InfraWise Logo"
    {...props}
  >
    <title>InfraWise Logo</title>
    <defs>
      <linearGradient id={`${id}-bg`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#5b5bd6" />
        <stop offset="1" stopColor="#1f1d4f" />
      </linearGradient>
    </defs>
    <rect width="256" height="256" rx="58" fill={`url(#${id}-bg)`} />
    <path
      d="M56 52 V200 H208"
      fill="none"
      stroke="#f4f1ea"
      strokeOpacity="0.35"
      strokeWidth="12"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M84 180 L204 72"
      fill="none"
      stroke="#f4f1ea"
      strokeWidth="22"
      strokeLinecap="round"
    />
    <path
      d="M84 112 L204 136"
      fill="none"
      stroke="#f2b134"
      strokeWidth="22"
      strokeLinecap="round"
    />
    <circle
      cx="146"
      cy="124"
      r="21"
      fill="#f2b134"
      stroke="#2f2d78"
      strokeWidth="9"
    />
  </svg>
)
