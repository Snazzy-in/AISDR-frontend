"use client"

import { Button } from "@/components/ui/button"
import { Save } from 'lucide-react'

interface SettingsHeaderProps {
  title: string
  description: string
  hasChanges: boolean
  onSave: () => void
  onCancel: () => void
}

export default function SettingsHeader({ 
  title, 
  description, 
  hasChanges, 
  onSave, 
  onCancel 
}: SettingsHeaderProps) {
  return (
    <div className="flex items-center justify-between border-b pb-4">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
        <p className="text-muted-foreground">
          {description}
        </p>
      </div>
      {hasChanges && (
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button onClick={onSave}>
            <Save className="mr-2 h-4 w-4" />
            Save Changes
          </Button>
        </div>
      )}
    </div>
  )
} 