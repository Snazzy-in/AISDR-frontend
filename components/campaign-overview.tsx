import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CalendarDays } from 'lucide-react'

interface CampaignOverviewProps {
  campaign: {
    name: string
    description: string
    startDate: string
    endDate: string
    status: string
  }
}

export default function CampaignOverview({ campaign }: CampaignOverviewProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Campaign Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold">Description</h3>
            <p className="text-sm text-muted-foreground">{campaign.description}</p>
          </div>
          <div className="flex items-center space-x-2">
            <CalendarDays className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">
              {campaign.startDate} - {campaign.endDate}
            </span>
          </div>
          <div>
            <Badge
              variant={campaign.status === "active" ? "default" : "secondary"}
            >
              {campaign.status}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

