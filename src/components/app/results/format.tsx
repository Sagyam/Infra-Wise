const whole = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
})

/** $1,234,567, with a true minus sign. */
export function dollars(value: number) {
  return whole.format(value).replace('-', '−')
}

/** $1.2M, $345K, $980: for axis ticks and anywhere space is short. */
export function compactDollars(value: number) {
  const sign = value < 0 ? '−' : ''
  const abs = Math.abs(value)
  if (abs >= 1_000_000) return `${sign}$${(abs / 1_000_000).toFixed(1)}M`
  if (abs >= 1_000) return `${sign}$${Math.round(abs / 1_000)}K`
  return `${sign}$${Math.round(abs)}`
}

export const SIDES = {
  onPrem: { label: 'On-premise', color: 'var(--on-prem)', dot: 'bg-on-prem' },
  cloud: { label: 'Cloud', color: 'var(--cloud)', dot: 'bg-cloud' },
} as const

export function SideDot({ side }: { side: keyof typeof SIDES }) {
  return (
    <span
      aria-hidden="true"
      className={`inline-block size-2.5 shrink-0 rounded-full ${SIDES[side].dot}`}
    />
  )
}
