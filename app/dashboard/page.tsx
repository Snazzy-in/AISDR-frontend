import { Metadata } from "next"
import DashboardLayout from "@/components/dashboard-layout"
import KeyMetrics from "@/components/key-metrics"
import CampaignPerformance from "@/components/campaign-performance"
import LeadEngagementInsights from "@/components/lead-engagement-insights"
import RecentActivityFeed from "@/components/recent-activity-feed"
import ActionButtons from "@/components/action-buttons"

export const metadata: Metadata = {
  title: "Dashboard",
  description: "AI SDR Dashboard",
}

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0 sm:space-x-4 pb-4 sm:pb-6">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Dashboard</h2>
          <div className="w-full sm:w-auto">
            <ActionButtons />
          </div>
        </div>
        <KeyMetrics />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <CampaignPerformance className="col-span-4" />
          <LeadEngagementInsights className="col-span-3" />
        </div>
        <RecentActivityFeed />
      </div>
    </DashboardLayout>
  )
}

