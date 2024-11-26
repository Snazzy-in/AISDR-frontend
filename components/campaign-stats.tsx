import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface CampaignStatsProps {
  campaignId: string
}

export default function CampaignStats({ campaignId }: CampaignStatsProps) {
  // Mock stats data
  const stats = {
    totalLeads: 1000,
    emailsSent: 5000,
    emailsOpened: 2500,
    replies: 750,
    meetings: 50,
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Campaign Statistics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium">Total Leads</p>
            <p className="text-2xl font-bold">{stats.totalLeads}</p>
          </div>
          <div>
            <p className="text-sm font-medium">Emails Sent</p>
            <p className="text-2xl font-bold">{stats.emailsSent}</p>
          </div>
          <div>
            <p className="text-sm font-medium">Emails Opened</p>
            <p className="text-2xl font-bold">{stats.emailsOpened}</p>
          </div>
          <div>
            <p className="text-sm font-medium">Replies</p>
            <p className="text-2xl font-bold">{stats.replies}</p>
          </div>
          <div>
            <p className="text-sm font-medium">Meetings Booked</p>
            <p className="text-2xl font-bold">{stats.meetings}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

