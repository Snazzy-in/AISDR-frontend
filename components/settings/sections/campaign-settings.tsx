"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

interface CampaignSettingsProps {
  onChange: () => void
}

export default function CampaignSettings({ onChange }: CampaignSettingsProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Email Settings</CardTitle>
          <CardDescription>
            Configure default settings for campaign emails
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="sender-name">Default Sender Name</Label>
              <Input 
                id="sender-name" 
                defaultValue="John from Artisan Outbound" 
                onChange={onChange} 
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email-signature">Default Email Signature</Label>
              <Input 
                id="email-signature" 
                defaultValue="Best regards," 
                onChange={onChange} 
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Track Email Opens</Label>
                <p className="text-sm text-muted-foreground">
                  Monitor when recipients open your emails
                </p>
              </div>
              <Switch onCheckedChange={onChange} defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Track Link Clicks</Label>
                <p className="text-sm text-muted-foreground">
                  Track when recipients click links in your emails
                </p>
              </div>
              <Switch onCheckedChange={onChange} defaultChecked />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Campaign Defaults</CardTitle>
          <CardDescription>
            Set default values for new campaigns
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="follow-up-days">Follow-up Wait Time (days)</Label>
              <Input 
                id="follow-up-days" 
                type="number" 
                defaultValue="3" 
                onChange={onChange} 
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="max-follow-ups">Maximum Follow-ups</Label>
              <Input 
                id="max-follow-ups" 
                type="number" 
                defaultValue="3" 
                onChange={onChange} 
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Auto-archive After Campaign End</Label>
                <p className="text-sm text-muted-foreground">
                  Automatically archive leads when campaign ends
                </p>
              </div>
              <Switch onCheckedChange={onChange} />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>AI Settings</CardTitle>
          <CardDescription>
            Configure AI behavior for campaigns
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>AI-powered Response Generation</Label>
              <p className="text-sm text-muted-foreground">
                Let AI generate response suggestions
              </p>
            </div>
            <Switch onCheckedChange={onChange} defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>AI Email Personalization</Label>
              <p className="text-sm text-muted-foreground">
                Use AI to personalize email content
              </p>
            </div>
            <Switch onCheckedChange={onChange} defaultChecked />
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 