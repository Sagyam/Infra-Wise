'use client'

import * as React from 'react'
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'

export interface FormFieldItem {
  id: string
  label: string
  category?: string
}

interface FormFieldSearchProps {
  fields: FormFieldItem[]
  open?: boolean
  onOpenChange?: (open: boolean) => void
  onNavigate?: (category: string, fieldId: string) => void
}

export function FormFieldSearch({
  fields,
  open: controlledOpen,
  onOpenChange,
  onNavigate,
}: FormFieldSearchProps) {
  const [internalOpen, setInternalOpen] = React.useState(false)
  const open = controlledOpen !== undefined ? controlledOpen : internalOpen
  const setOpen = onOpenChange || setInternalOpen

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen(!open)
      }
    }

    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [open, setOpen])

  const navigateToField = (fieldId: string, category?: string) => {
    // Use custom navigation handler if provided (for section switching)
    if (onNavigate && category) {
      onNavigate(category, fieldId)
      setOpen(false)
      return
    }

    // Fallback to direct navigation
    const element = document.getElementById(fieldId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' })

      // Focus the input if it exists
      const input = element.querySelector('input, textarea, select')
      if (input instanceof HTMLElement) {
        setTimeout(() => input.focus(), 100)
      }
    }
    setOpen(false)
  }

  // Group fields by category
  const groupedFields = fields.reduce(
    (acc, field) => {
      const category = field.category || 'Other'
      if (!acc[category]) {
        acc[category] = []
      }
      acc[category].push(field)
      return acc
    },
    {} as Record<string, FormFieldItem[]>,
  )

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Search form fields..." />
      <CommandList>
        <CommandEmpty>No fields found.</CommandEmpty>
        {Object.entries(groupedFields).map(([category, categoryFields]) => (
          <CommandGroup key={category} heading={category}>
            {categoryFields.map((field) => (
              <CommandItem
                key={field.id}
                onSelect={() => navigateToField(field.id, field.category)}
              >
                {field.label}
              </CommandItem>
            ))}
          </CommandGroup>
        ))}
      </CommandList>
    </CommandDialog>
  )
}
