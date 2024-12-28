"use client"

import { useState } from "react"
import DashboardLayout from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import CampaignTargeting from "@/components/campaign-targeting"
import CampaignPitch from "@/components/campaign-pitch"
import CampaignOutreach from "@/components/campaign-outreach"
import CampaignWorkflow from "@/components/campaign-workflow"
import CampaignSettings from "@/components/campaign-settings"


const steps = [
  { id: 1, name: "Targeting" },
  { id: 2, name: "Pitch" },
  { id: 3, name: "Outreach" },
  { id: 4, name: "Workflow" },
  { id: 5, name: "Settings" },
]

export default function CreateCampaignPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [campaignData, setCampaignData] = useState({
    name: "New Campaign",
    targeting: {},
    pitch: {},
    outreach: {},
    workflow: [],
    settings: {},
  })

  const updateCampaignData = (section: string, data: any) => {
    setCampaignData((prev) => ({
      ...prev,
      [section]: { ...prev[section], ...data },
    }))
  }

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="border-b">
          <div className="container mx-auto px-4 h-16 flex items-center">
            <h1 className="text-lg font-semibold">{campaignData.name}</h1>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8">
          {/* Steps */}
          <div className="mb-8">
            <nav className="flex justify-center" aria-label="Progress">
              <ol className="flex items-center space-x-8">
                {steps.map((step) => (
                  <li key={step.id} className="relative">
                    <button
                      className={`flex items-center ${
                        step.id === currentStep
                          ? "text-primary"
                          : step.id < currentStep
                          ? "text-muted-foreground"
                          : "text-muted-foreground"
                      }`}
                      onClick={() => setCurrentStep(step.id)}
                    >
                      <span
                        className={`flex h-8 w-8 items-center justify-center rounded-full border-2 ${
                          step.id === currentStep
                            ? "border-primary"
                            : "border-muted"
                        }`}
                      >
                        {step.id}
                      </span>
                      <span className="ml-2">{step.name}</span>
                    </button>
                    {step.id !== steps.length && (
                      <div
                        className={`absolute top-4 left-full h-[2px] w-8 -translate-y-1/2 ${
                          step.id < currentStep
                            ? "bg-primary"
                            : "bg-muted"
                        }`}
                      />
                    )}
                  </li>
                ))}
              </ol>
            </nav>
          </div>

          {/* Step Content */}
          <div className="max-w-4xl mx-auto">
            {currentStep === 1 && (
              <CampaignTargeting
                data={campaignData.targeting}
                onUpdate={(data) => updateCampaignData("targeting", data)}
              />
            )}
            {currentStep === 2 && (
              <CampaignPitch
                data={campaignData.pitch}
                onUpdate={(data) => updateCampaignData("pitch", data)}
              />
            )}
            {currentStep === 3 && (
              <CampaignOutreach
                data={campaignData.outreach}
                onUpdate={(data) => updateCampaignData("outreach", data)}
              />
            )}
            {currentStep === 4 && (
              <CampaignWorkflow
                data={campaignData.workflow}
                onUpdate={(data) => updateCampaignData("workflow", data)}
              />
            )}
            {currentStep === 5 && (
              <CampaignSettings
                data={campaignData.settings}
                onUpdate={(data) => updateCampaignData("settings", data)}
              />
            )}

            {/* Navigation Buttons */}
            <div className="mt-8 flex justify-between">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 1}
              >
                Previous
              </Button>
              <Button
                onClick={handleNext}
                disabled={currentStep === steps.length}
              >
                {currentStep === steps.length ? "Finish" : "Next"}
              </Button>
            </div>
          </div>
        </main>
      </div>
    </DashboardLayout>
  )
}

