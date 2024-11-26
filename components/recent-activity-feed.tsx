import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, UserPlus, Eye, MousePointerClick } from "lucide-react"

const activities = [
  { type: "new_lead", message: "New lead added: John Doe", icon: UserPlus, time: "2 minutes ago" },
  { type: "email_opened", message: "Email opened by Alice Johnson", icon: Eye, time: "5 minutes ago" },
  { type: "email_clicked", message: "Link clicked by Bob Smith", icon: MousePointerClick, time: "10 minutes ago" },
  { type: "email_replied", message: "Reply received from Charlie Brown", icon: Mail, time: "15 minutes ago" },
  { type: "new_lead", message: "New lead added: Diana Ross", icon: UserPlus, time: "20 minutes ago" },
]

export default function RecentActivityFeed() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Latest updates and interactions</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {activities.map((activity, index) => (
            <div key={index} className="flex items-center">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-muted">
                <activity.icon className="h-5 w-5" />
              </div>
              <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none">{activity.message}</p>
                <p className="text-sm text-muted-foreground">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

