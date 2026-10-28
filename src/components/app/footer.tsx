'use client'

import { Monitor, Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { GithubIcon } from '@/components/icons/github'
import { Logo } from '@/components/icons/logo'

const themes = [
  { value: 'system', label: 'System', icon: Monitor },
  { value: 'light', label: 'Light', icon: Sun },
  { value: 'dark', label: 'Dark', icon: Moon },
]

/** The System / Light / Dark switch shared with the other portfolio sites. */
function ThemeSwitch() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // The stored theme is only known on the client; mark nothing pressed until then.
  useEffect(() => setMounted(true), [])

  return (
    <fieldset
      aria-label="Theme"
      className="inline-flex rounded-lg border border-edge/10 bg-edge/[0.03] p-0.5"
    >
      {themes.map(({ value, label, icon: Icon }) => (
        <button
          key={value}
          type="button"
          onClick={() => setTheme(value)}
          aria-pressed={mounted && theme === value}
          title={label}
          className="inline-flex h-7 items-center gap-1.5 rounded-md px-2.5 text-xs text-muted-foreground transition-colors hover:text-foreground aria-pressed:bg-background aria-pressed:text-foreground aria-pressed:shadow-sm aria-pressed:ring-1 aria-pressed:ring-edge/10"
        >
          <Icon className="size-3.5" aria-hidden="true" />
          {label}
        </button>
      ))}
    </fieldset>
  )
}

export function Footer() {
  return (
    <footer className="border-t border-edge/5">
      <div className="flex flex-wrap items-center justify-between gap-6 px-4 py-6 sm:px-6">
        <div className="flex items-center gap-3">
          <Logo className="size-6" id="footer-logo" />
          <p className="text-sm text-muted-foreground">
            Built by{' '}
            <a
              href="https://sagyamthapa.com.np"
              className="font-medium text-foreground hover:text-primary"
            >
              Sagyam Thapa
            </a>
            {' · '}
            <a
              href="https://github.com/Sagyam/Infra-Wise"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 hover:text-foreground"
            >
              <GithubIcon className="size-3.5" />
              Source
            </a>
          </p>
        </div>
        <ThemeSwitch />
      </div>
    </footer>
  )
}
