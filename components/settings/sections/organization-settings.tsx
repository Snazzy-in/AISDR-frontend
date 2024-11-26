"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Plus, MoreHorizontal, CreditCard } from 'lucide-react'

interface OrganizationSettingsProps {
  onChange: () => void
}

export default function OrganizationSettings({ onChange }: OrganizationSettingsProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Organization Details</CardTitle>
          <CardDescription>
            Update your organization's information
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback>AO</AvatarFallback>
            </Avatar>
            <Button variant="outline">Change Logo</Button>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="org-name">Organization Name</Label>
              <Input 
                id="org-name" 
                defaultValue="Artisan Outbound" 
                onChange={onChange} 
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="org-website">Website</Label>
              <Input 
                id="org-website" 
                type="url" 
                defaultValue="https://artisanoutbound.com" 
                onChange={onChange} 
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="org-industry">Industry</Label>
              <Input 
                id="org-industry" 
                defaultValue="Software & Technology" 
                onChange={onChange} 
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Team Members</CardTitle>
          <CardDescription>
            Manage your team and their permissions
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button variant="outline" className="w-full" onClick={onChange}>
            <Plus className="mr-2 h-4 w-4" />
            Add Team Member
          </Button>
          <div className="space-y-4">
            {[
              { name: "John Doe", email: "john@artisanoutbound.com", role: "Admin" },
              { name: "Jane Smith", email: "jane@artisanoutbound.com", role: "Member" },
            ].map((member, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{member.name}</p>
                    <p className="text-sm text-muted-foreground">{member.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    {member.role}
                  </Button>
                  <Button variant="ghost" size="icon" onClick={onChange}>
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Billing & Subscription</CardTitle>
          <CardDescription>
            Manage your subscription and billing information
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <p className="font-medium">Current Plan: Professional</p>
              <p className="text-sm text-muted-foreground">$99/month • Renews on May 1, 2024</p>
            </div>
            <Button onClick={onChange}>Upgrade Plan</Button>
          </div>
          <div className="space-y-2">
            <Label>Payment Method</Label>
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-2">
                <CreditCard className="h-4 w-4" />
                <span>•••• 4242</span>
              </div>
              <Button variant="ghost" size="sm" onClick={onChange}>Update</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 