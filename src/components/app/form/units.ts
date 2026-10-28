/**
 * Field labels carry their unit in a trailing parenthesis, as in "Unit Cost ($)" or
 * "Hot Storage Cost ($/GB/month)". The inputs show that unit inside the box instead, a currency
 * sign before the figure and the rest after it, so the label reads as plain words.
 */

// A trailing parenthesis is a unit only if it is one of these; "(Inbound)" or
// "(Uninterruptible Power Supply)" are part of the name.
const UNIT = /^(\$|%)(\/[\w/]+)?$|^(TB|GB|Watts|meters|Years|L)(\/\w+)?$/

const SHORT: Record<string, string> = {
  month: 'mo',
  hour: 'hr',
  year: 'yr',
  meter: 'm',
  meters: 'm',
  Watts: 'W',
  Years: 'yrs',
}

export function splitLabel(label: string): { text: string; unit?: string } {
  const match = label.match(/^(.*\S)\s*\(([^()]+)\)$/)
  if (!match || !UNIT.test(match[2])) return { text: label }
  return { text: match[1], unit: match[2] }
}

export function unitAdornments(unit?: string): {
  prefix?: string
  suffix?: string
} {
  if (!unit) return {}
  const short = unit
    .split('/')
    .map((part) => SHORT[part] ?? part)
    .join('/')
  if (short === '$') return { prefix: '$' }
  if (short.startsWith('$/')) return { prefix: '$', suffix: short.slice(1) }
  return { suffix: short }
}
