"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Plus } from 'lucide-react'

interface AdvancedSettingsProps {
  onChange: () => void
}

export default function AdvancedSettings({ onChange }: AdvancedSettingsProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>API Access</CardTitle>
          <CardDescription>
            Manage API keys and access tokens
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Enable API Access</Label>
              <p className="text-sm text-muted-foreground">
                Allow external applications to access your data
              </p>
            </div>
            <Switch onCheckedChange={onChange} />
          </div>
          <Button variant="outline" className="w-full" onClick={onChange}>
            <Plus className="mr-2 h-4 w-4" />
            Generate New API Key
          </Button>
          <div className="space-y-4">
            {[
              { name: "Production API Key", created: "Created on Apr 1, 2024" },
              { name: "Development API Key", created: "Created on Mar 15, 2024" },
            ].map((key, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="font-medium">{key.name}</p>
                  <p className="text-sm text-muted-foreground">{key.created}</p>
                </div>
                <Button variant="ghost" size="sm" onClick={onChange}>Revoke</Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Data Management</CardTitle>
          <CardDescription>
            Manage your data and export options
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <p className="font-medium">Export All Data</p>
                <p className="text-sm text-muted-foreground">Download all your data in CSV format</p>
              </div>
              <Button variant="outline" onClick={onChange}>Export</Button>
            </div>
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <p className="font-medium">Delete Account</p>
                <p className="text-sm text-muted-foreground">Permanently delete your account and all data</p>
              </div>
              <Button variant="destructive" onClick={onChange}>Delete</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Security Settings</CardTitle>
          <CardDescription>
            Configure advanced security options
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Two-Factor Authentication</Label>
              <p className="text-sm text-muted-foreground">
                Add an extra layer of security to your account
              </p>
            </div>
            <Switch onCheckedChange={onChange} />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Session Timeout</Label>
              <p className="text-sm text-muted-foreground">
                Automatically log out after period of inactivity
              </p>
            </div>
            <Switch onCheckedChange={onChange} defaultChecked />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="timeout">Session Timeout Duration (minutes)</Label>
            <Input 
              id="timeout" 
              type="number" 
              defaultValue="30" 
              onChange={onChange}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 