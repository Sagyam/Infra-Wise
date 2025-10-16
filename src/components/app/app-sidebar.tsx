'use client'

import {
  BarChart3,
  Boxes,
  Code,
  Cpu,
  HardDrive,
  ListTree,
  Network,
  PieChart,
  Settings,
  Users,
  Zap,
} from 'lucide-react'
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
  useSidebar,
} from '@/components/ui/sidebar'

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
      { title: 'Software', icon: Code, id: 'software' },
    ],
  },
  {
    title: 'Analysis',
    items: [
      { title: 'Charts', icon: PieChart, id: 'results-charts' },
      { title: 'Cumulative', icon: BarChart3, id: 'results-cumulative' },
      { title: 'Breakdown', icon: ListTree, id: 'results-breakdown' },
    ],
  },
]

interface AppSidebarProps {
  activeSection: string
  onSectionChange: (section: string) => void
}

export function AppSidebar({
  activeSection,
  onSectionChange,
}: AppSidebarProps) {
  const { isMobile, setOpenMobile } = useSidebar()

  const handleSectionChange = (section: string) => {
    onSectionChange(section)
    // Close the mobile sidebar after selecting an item
    if (isMobile) {
      setOpenMobile(false)
    }
  }

  return (
    <Sidebar collapsible="offcanvas">
      <SidebarHeader className="border-b px-6 py-4">
        <div className="font-semibold text-lg">Menu</div>
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
                      onClick={() => handleSectionChange(item.id)}
                      tooltip={item.title}
                      className="md:text-base text-lg"
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
