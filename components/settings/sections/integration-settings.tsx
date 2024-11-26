"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus } from 'lucide-react'

interface IntegrationSettingsProps {
  onChange: () => void
}

export default function IntegrationSettings({ onChange }: IntegrationSettingsProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Email Integration</CardTitle>
          <CardDescription>
            Connect your email accounts to send campaigns
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button variant="outline" className="w-full" onClick={onChange}>
            <Plus className="mr-2 h-4 w-4" />
            Connect Email Account
          </Button>
          <div className="space-y-4">
            {[
              { provider: "Google", email: "john@artisanoutbound.com", connected: true },
              { provider: "Google", email: "sales@artisanoutbound.com", connected: true },
            ].map((account, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <img 
                    src="https://www.google.com/favicon.ico"
                    alt="Google"
                    className="w-5 h-5"
                  />
                  <div>
                    <p className="font-medium">{account.email}</p>
                    <p className="text-sm text-muted-foreground">Connected via {account.provider}</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" onClick={onChange}>Disconnect</Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>CRM Integration</CardTitle>
          <CardDescription>
            Connect your CRM to sync leads and activities
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { name: "Salesforce", connected: false, icon: "🔌" },
              { name: "HubSpot", connected: true, icon: "🔌" },
              { name: "Pipedrive", connected: false, icon: "🔌" },
              { name: "Close", connected: false, icon: "🔌" },
            ].map((crm, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="text-2xl">{crm.icon}</div>
                  <span className="font-medium">{crm.name}</span>
                </div>
                <Button 
                  variant={crm.connected ? "outline" : "default"}
                  onClick={onChange}
                >
                  {crm.connected ? "Configure" : "Connect"}
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Data Enrichment</CardTitle>
          <CardDescription>
            Connect data providers for lead enrichment
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4">
            {[
              { name: "Clearbit", status: "Connected", credits: "4,500 credits remaining" },
              { name: "Apollo", status: "Not Connected", credits: null },
            ].map((provider, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="font-medium">{provider.name}</p>
                  {provider.credits && (
                    <p className="text-sm text-muted-foreground">{provider.credits}</p>
                  )}
                </div>
                <Button 
                  variant={provider.credits ? "outline" : "default"}
                  onClick={onChange}
                >
                  {provider.credits ? "Configure" : "Connect"}
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 