"use client"

import RocketLab from "@/components/sales-assets/rocket-lab"
import DashboardLayout from "@/components/dashboard-layout"

export default function RocketLabPage() {
  const handleInsightGenerated = (insights) => {
    // Handle new insights
    console.log("New insights generated:", insights)
  }

  return (
    <DashboardLayout>
      <div className="container mx-auto py-4 md:py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl md:text-2xl font-bold">RocketLab Training</h1>
        </div>

        <RocketLab onInsightGenerated={handleInsightGenerated} />
      </div>
    </DashboardLayout>
  )
} 