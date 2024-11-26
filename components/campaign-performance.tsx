"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, Legend } from "recharts"

const data = [
  { name: "Jan", sent: 400, opened: 240, responded: 100 },
  { name: "Feb", sent: 300, opened: 180, responded: 80 },
  { name: "Mar", sent: 500, opened: 300, responded: 120 },
  { name: "Apr", sent: 450, opened: 270, responded: 110 },
  { name: "May", sent: 600, opened: 360, responded: 150 },
  { name: "Jun", sent: 550, opened: 330, responded: 140 },
]

export default function CampaignPerformance({ className }: React.ComponentProps<typeof Card>) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Campaign Performance</CardTitle>
        <CardDescription>Email metrics over the last 6 months</CardDescription>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="sent" stroke="#8884d8" />
              <Line type="monotone" dataKey="opened" stroke="#82ca9d" />
              <Line type="monotone" dataKey="responded" stroke="#ffc658" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

