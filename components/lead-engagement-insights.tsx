import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const topEngagedLeads = [
  { name: "Alice Johnson", email: "alice@example.com", score: 95 },
  { name: "Bob Smith", email: "bob@example.com", score: 88 },
  { name: "Charlie Brown", email: "charlie@example.com", score: 82 },
  { name: "Diana Ross", email: "diana@example.com", score: 79 },
  { name: "Ethan Hunt", email: "ethan@example.com", score: 75 },
]

export default function LeadEngagementInsights({ className }: React.ComponentProps<typeof Card>) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Lead Engagement Insights</CardTitle>
        <CardDescription>Top engaged leads based on interaction score</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {topEngagedLeads.map((lead) => (
            <div key={lead.email} className="flex items-center">
              <Avatar className="h-9 w-9">
                <AvatarImage src={`https://avatar.vercel.sh/${lead.email}`} alt={lead.name} />
                <AvatarFallback>{lead.name.split(" ").map((n) => n[0]).join("")}</AvatarFallback>
              </Avatar>
              <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none">{lead.name}</p>
                <p className="text-sm text-muted-foreground">{lead.email}</p>
              </div>
              <div className="ml-auto flex items-center space-x-2">
                <div className="w-24 h-2 bg-blue-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-500 rounded-full"
                    style={{ width: `${lead.score}%` }}
                  />
                </div>
                <span className="text-sm font-medium">{lead.score}%</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

