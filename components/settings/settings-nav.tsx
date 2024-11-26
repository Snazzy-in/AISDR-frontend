"use client"

import { Button } from "@/components/ui/button"
import { 
  User, 
  Building2, 
  Megaphone, 
  Users, 
  Plug, 
  Settings2, 
  HelpCircle,
} from 'lucide-react'

const settingsSections = [
  { id: 'account', name: 'Account Settings', icon: User },
  { id: 'organization', name: 'Organization Settings', icon: Building2 },
  { id: 'campaign', name: 'Campaign Defaults', icon: Megaphone },
  { id: 'leads', name: 'Lead Management', icon: Users },
  { id: 'integrations', name: 'Integrations', icon: Plug },
  { id: 'advanced', name: 'Advanced Settings', icon: Settings2 },
  { id: 'support', name: 'Support & Feedback', icon: HelpCircle }
]

interface SettingsNavProps {
  activeSection: string
  onSectionChange: (section: string) => void
}

export default function SettingsNav({ activeSection, onSectionChange }: SettingsNavProps) {
  return (
    <nav className="flex flex-col space-y-1">
      {settingsSections.map((section) => {
        const Icon = section.icon
        return (
          <Button
            key={section.id}
            variant={activeSection === section.id ? "secondary" : "ghost"}
            className="justify-start"
            onClick={() => onSectionChange(section.id)}
          >
            <Icon className="mr-2 h-4 w-4" />
            {section.name}
          </Button>
        )
      })}
    </nav>
  )
} 