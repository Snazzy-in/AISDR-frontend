import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, UserPlus, Eye, MousePointerClick } from 'lucide-react'

const metrics = [
  { name: "Total Leads", value: "2,345", icon: UserPlus, trend: "+5.2%" },
  { name: "Emails Sent", value: "12,543", icon: Mail, trend: "+10.5%" },
  { name: "Responses", value: "1,234", icon: Mail, trend: "+3.2%" },
  { name: "Open Rate", value: "45.2%", icon: Eye, trend: "+2.1%" },
  { name: "Click Rate", value: "12.5%", icon: MousePointerClick, trend: "+1.8%" },
]

export default function KeyMetrics() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
      {metrics.map((metric) => (
        <Card key={metric.name}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{metric.name}</CardTitle>
            <metric.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metric.value}</div>
            <p className="text-xs text-muted-foreground">{metric.trend} from last month</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

