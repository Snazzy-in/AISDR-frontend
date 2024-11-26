"use client"

import { useState } from "react"
import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent } from "@/components/ui/card"
import SettingsNav from "@/components/settings/settings-nav"
import SettingsHeader from "@/components/settings/settings-header"
import AccountSettings from "@/components/settings/sections/account-settings"
import OrganizationSettings from "@/components/settings/sections/organization-settings"
import CampaignSettings from "@/components/settings/sections/campaign-settings"
import LeadSettings from "@/components/settings/sections/lead-settings"
import IntegrationSettings from "@/components/settings/sections/integration-settings"
import AdvancedSettings from "@/components/settings/sections/advanced-settings"
import SupportSettings from "@/components/settings/sections/support-settings"

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState('account')
  const [hasChanges, setHasChanges] = useState(false)

  const handleSave = () => {
    // Implement save functionality
    setHasChanges(false)
  }

  const handleCancel = () => {
    setHasChanges(false)
  }

  const renderSection = () => {
    switch (activeSection) {
      case 'account':
        return <AccountSettings onChange={() => setHasChanges(true)} />
      case 'organization':
        return <OrganizationSettings onChange={() => setHasChanges(true)} />
      case 'campaign':
        return <CampaignSettings onChange={() => setHasChanges(true)} />
      case 'leads':
        return <LeadSettings onChange={() => setHasChanges(true)} />
      case 'integrations':
        return <IntegrationSettings onChange={() => setHasChanges(true)} />
      case 'advanced':
        return <AdvancedSettings onChange={() => setHasChanges(true)} />
      case 'support':
        return <SupportSettings onChange={() => setHasChanges(true)} />
      default:
        return null
    }
  }

  return (
    <DashboardLayout>
      <div className="flex-1 space-y-8 p-8 pt-6">
        <SettingsHeader
          title="Settings"
          description="Manage your preferences, integrations, and account settings."
          hasChanges={hasChanges}
          onSave={handleSave}
          onCancel={handleCancel}
        />

        <div className="flex gap-8">
          {/* Settings Navigation - Fixed width, sticky */}
          <div className="w-64 flex-shrink-0">
            <div className="sticky top-8">
              <Card>
                <CardContent className="p-6">
                  <SettingsNav
                    activeSection={activeSection}
                    onSectionChange={setActiveSection}
                  />
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Main Content Area - Flexible width */}
          <div className="flex-1 max-w-4xl">
            {renderSection()}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
} 