"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Plus, Bot, Check } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils"
import Image from "next/image"

export default function CampaignSettings({ data, onUpdate }) {
  const [settings, setSettings] = useState({
    fullAutopilot: false,
    useThisCampaign: true,
    shareCampaign: true,
    doNotContactIf: {
      sameLeadsInCRM: true,
      sameLeadsInTeammates: true
    }
  })

  const handleToggle = (field: string, value: boolean) => {
    setSettings(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const googleIconUrl = "https://www.google.com/favicon.ico"

  return (
    <div className="space-y-8">
      {/* Full Autopilot */}
      <div className="flex items-start gap-4 p-4 rounded-lg border">
        <Bot className="h-5 w-5 mt-1" />
        <div className="flex-1">
          <h3 className="font-medium">Full Autopilot</h3>
          <p className="text-sm text-muted-foreground">
            Ava will automatically send outbound emails without your approval. She will not automatically respond to messages.
          </p>
        </div>
        <Switch
          checked={settings.fullAutopilot}
          onCheckedChange={(checked) => handleToggle('fullAutopilot', checked)}
        />
      </div>

      {/* Campaign Settings */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium">Use This Campaign</h3>
            <p className="text-sm text-muted-foreground">
              Your monthly leads will be split between each active campaign.
            </p>
          </div>
          <Switch
            checked={settings.useThisCampaign}
            onCheckedChange={(checked) => handleToggle('useThisCampaign', checked)}
          />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium">Share Campaign</h3>
            <p className="text-sm text-muted-foreground">
              Share this campaign with your teammates
            </p>
          </div>
          <Switch
            checked={settings.shareCampaign}
            onCheckedChange={(checked) => handleToggle('shareCampaign', checked)}
          />
        </div>
      </div>

      {/* Do not contact leads if */}
      <div className="space-y-4">
        <h3 className="font-medium">Do not contact leads if</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="same-leads-crm">Same leads found in other campaigns</Label>
            <Switch
              id="same-leads-crm"
              checked={settings.doNotContactIf.sameLeadsInCRM}
              onCheckedChange={(checked) => 
                setSettings(prev => ({
                  ...prev,
                  doNotContactIf: {
                    ...prev.doNotContactIf,
                    sameLeadsInCRM: checked
                  }
                }))
              }
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="same-leads-teammates">Same leads in teammates' campaigns</Label>
            <Switch
              id="same-leads-teammates"
              checked={settings.doNotContactIf.sameLeadsInTeammates}
              onCheckedChange={(checked) => 
                setSettings(prev => ({
                  ...prev,
                  doNotContactIf: {
                    ...prev.doNotContactIf,
                    sameLeadsInTeammates: checked
                  }
                }))
              }
            />
          </div>
        </div>
      </div>

      {/* Campaign Senders */}
      <div className="border-t pt-8 mt-8">
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium">Campaign Senders</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Send emails from your teammates' accounts.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" className="rounded-full h-10 w-10 flex-shrink-0">
              <Plus className="h-4 w-4" />
            </Button>
            <Avatar className="h-10 w-10 border-2 border-primary relative flex-shrink-0">
              <AvatarFallback className="bg-primary text-primary-foreground text-sm">JC</AvatarFallback>
              <div className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full text-xs w-4 h-4 flex items-center justify-center">
                2
              </div>
            </Avatar>
            <span className="text-sm font-medium">Add a Team Member</span>
          </div>

          <div className="space-y-4 mt-6">
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Select Jasper Carmichael-Jack's Mailboxes for this campaign
              </p>
              
              <div className="space-y-3">
                <div className="flex items-center">
                  <Checkbox id="select-all" className="rounded" />
                  <label htmlFor="select-all" className="text-sm ml-2 flex-1">
                    Select All (5)
                  </label>
                  <span className="text-sm text-muted-foreground">Signature</span>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center">
                    <Checkbox id="email-1" className="rounded" />
                    <label htmlFor="email-1" className="text-sm ml-2 flex items-center gap-2 flex-1">
                      <img 
                        src={googleIconUrl}
                        alt="Google" 
                        className="w-4 h-4 flex-shrink-0" 
                      />
                      j@artisanoutbound.com
                    </label>
                    <span className="text-sm text-muted-foreground">Plain signature</span>
                  </div>

                  <div className="flex items-center">
                    <Checkbox id="email-2" className="rounded" />
                    <label htmlFor="email-2" className="text-sm ml-2 flex items-center gap-2 flex-1">
                      <img 
                        src={googleIconUrl}
                        alt="Google" 
                        className="w-4 h-4 flex-shrink-0" 
                      />
                      jasper@artisanoutbound.com
                    </label>
                    <span className="text-sm text-muted-foreground">Plain signature</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

