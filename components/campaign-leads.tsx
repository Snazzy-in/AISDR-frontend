"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { MoreHorizontal, Search } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

interface CampaignLeadsProps {
  campaignId: string
}

interface Lead {
  id: string
  name: string
  email: string
  company: string
  status: string
  avatar: string
}

function EmailThreadSidepanel({ lead }: { lead: Lead }) {
  const [reply, setReply] = useState("")

  const handleReply = () => {
    // Implement reply functionality here
    console.log(`Replying to ${lead.name}: ${reply}`)
    setReply("")
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-auto p-4 space-y-4">
        {/* Placeholder for email thread */}
        <div className="bg-muted p-2 rounded">
          <p className="font-semibold">From: {lead.name}</p>
          <p>Subject: Regarding our product</p>
          <p className="mt-2">Hello, I'm interested in learning more about your offering...</p>
        </div>
      </div>
      <div className="p-4 border-t">
        <Input
          placeholder="Type your reply..."
          value={reply}
          onChange={(e) => setReply(e.target.value)}
          className="mb-2"
        />
        <Button onClick={handleReply}>Send Reply</Button>
      </div>
    </div>
  )
}

export default function CampaignLeads({ campaignId }: CampaignLeadsProps) {
  const [filter, setFilter] = useState("all")
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null)

  // Mock lead data
  const leads: Lead[] = [
    { id: "1", name: "John Doe", email: "john@example.com", company: "Acme Inc.", status: "contacted", avatar: "/avatars/01.png" },
    { id: "2", name: "Jane Smith", email: "jane@example.com", company: "Tech Co.", status: "replied", avatar: "/avatars/02.png" },
    { id: "3", name: "Bob Johnson", email: "bob@example.com", company: "Innovative LLC", status: "meeting_booked", avatar: "/avatars/03.png" },
  ]

  const filteredLeads = filter === "all" ? leads : leads.filter(lead => lead.status === filter)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Campaign Leads</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex items-center justify-between">
          <Input
            placeholder="Search leads..."
            className="max-w-sm"
            onChange={(e) => {/* Implement search functionality */}}
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Filter: {filter}</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onSelect={() => setFilter("all")}>All</DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setFilter("contacted")}>Contacted</DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setFilter("replied")}>Replied</DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setFilter("meeting_booked")}>Meeting Booked</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredLeads.map((lead) => (
              <TableRow key={lead.id}>
                <TableCell>
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button variant="ghost" className="p-0 hover:bg-transparent" onClick={() => setSelectedLead(lead)}>
                        <div className="flex items-center space-x-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={lead.avatar} alt={lead.name} />
                            <AvatarFallback>{lead.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <span>{lead.name}</span>
                        </div>
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="right" className="w-[400px] sm:w-[540px]">
                      <SheetHeader>
                        <SheetTitle>Email Thread with {lead.name}</SheetTitle>
                      </SheetHeader>
                      <EmailThreadSidepanel lead={lead} />
                    </SheetContent>
                  </Sheet>
                </TableCell>
                <TableCell>{lead.email}</TableCell>
                <TableCell>{lead.company}</TableCell>
                <TableCell>
                  <Badge variant="outline">{lead.status}</Badge>
                </TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

