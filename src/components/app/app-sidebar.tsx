'use client'

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import {BarChart3, Boxes, Cpu, HardDrive, Network, Settings, Users, Zap,} from 'lucide-react'

const sections = [
  {
    title: 'Configuration',
    items: [
      { title: 'General', icon: Settings, id: 'general' },
      { title: 'Energy', icon: Zap, id: 'energy' },
      { title: 'Storage', icon: HardDrive, id: 'storage' },
      { title: 'Compute', icon: Cpu, id: 'compute' },
      { title: 'GPU', icon: Boxes, id: 'gpu' },
      { title: 'Networking', icon: Network, id: 'networking' },
      { title: 'Human Cost', icon: Users, id: 'human-cost' },
    ],
  },
  {
    title: 'Analysis',
    items: [{ title: 'Results', icon: BarChart3, id: 'results' }],
  },
]

interface AppSidebarProps {
  activeSection: string
  onSectionChange: (section: string) => void
}

export function AppSidebar({ activeSection, onSectionChange }: AppSidebarProps) {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b px-6 py-4">
        <h2 className="text-lg font-headline font-bold">InfraWise</h2>
        <p className="text-xs text-muted-foreground">TCO Calculator</p>
      </SidebarHeader>
      <SidebarContent>
        {sections.map((section) => (
          <SidebarGroup key={section.title}>
            <SidebarGroupLabel>{section.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {section.items.map((item) => (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton
                      isActive={activeSection === item.id}
                      onClick={() => onSectionChange(item.id)}
                      tooltip={item.title}
                    >
                      <item.icon />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  )
}
