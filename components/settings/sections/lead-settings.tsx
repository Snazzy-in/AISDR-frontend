"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Plus, MoreHorizontal } from 'lucide-react'

interface LeadSettingsProps {
  onChange: () => void
}

export default function LeadSettings({ onChange }: LeadSettingsProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Lead Scoring</CardTitle>
          <CardDescription>
            Configure how leads are scored and prioritized
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Enable Lead Scoring</Label>
                <p className="text-sm text-muted-foreground">
                  Automatically score leads based on engagement
                </p>
              </div>
              <Switch onCheckedChange={onChange} defaultChecked />
            </div>
            <div className="grid gap-2">
              <Label>Scoring Factors</Label>
              <div className="space-y-2">
                {[
                  { name: "Email Opens", value: "10" },
                  { name: "Link Clicks", value: "20" },
                  { name: "Reply Rate", value: "30" },
                  { name: "Company Size", value: "15" },
                ].map((factor, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Input 
                      type="number" 
                      defaultValue={factor.value}
                      className="w-20"
                      onChange={onChange}
                    />
                    <span className="text-sm">{factor.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Lead Enrichment</CardTitle>
          <CardDescription>
            Configure automatic lead data enrichment
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Auto-enrich New Leads</Label>
              <p className="text-sm text-muted-foreground">
                Automatically enrich lead data using third-party services
              </p>
            </div>
            <Switch onCheckedChange={onChange} defaultChecked />
          </div>
          <div className="grid gap-2">
            <Label>Enrichment Sources</Label>
            <div className="space-y-2">
              {[
                { name: "LinkedIn", enabled: true },
                { name: "Clearbit", enabled: true },
                { name: "Apollo", enabled: false },
              ].map((source, index) => (
                <div key={index} className="flex items-center justify-between border p-2 rounded">
                  <span className="text-sm">{source.name}</span>
                  <Switch 
                    defaultChecked={source.enabled}
                    onCheckedChange={onChange}
                  />
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Lead Management Rules</CardTitle>
          <CardDescription>
            Set up automated rules for lead management
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button variant="outline" className="w-full" onClick={onChange}>
            <Plus className="mr-2 h-4 w-4" />
            Add New Rule
          </Button>
          <div className="space-y-4">
            {[
              { name: "Auto-archive Cold Leads", description: "Archive leads with no engagement after 30 days" },
              { name: "High Priority Assignment", description: "Assign high-scoring leads to senior team members" },
            ].map((rule, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="font-medium">{rule.name}</p>
                  <p className="text-sm text-muted-foreground">{rule.description}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Switch defaultChecked onCheckedChange={onChange} />
                  <Button variant="ghost" size="icon" onClick={onChange}>
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 