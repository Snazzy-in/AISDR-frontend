"use client"

import { useState } from "react"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ArrowLeft, Search, MoreHorizontal, Filter, Mail, Send } from 'lucide-react'
import Link from "next/link"
import Sidebar from "@/components/sidebar"

// Mock data (replace with actual data fetching)
const campaignData = {
  id: "1",
  name: "Q2 Cold Outreach",
  status: "Active",
  description: "Targeting new leads in the SaaS industry",
  stats: {
    emailsSent: 1000,
    opened: 250,
    replied: 50,
    meetings: 10,
  },
  leads: [
    {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      company: "Acme Inc.",
      status: "contacted",
      lastActivity: "2024-03-15",
      avatar: "/avatars/01.png",
      emailThread: [
        {
          id: "e1",
          type: "outbound",
          content: "Hi John, I noticed your recent post about scaling AI operations...",
          date: "2024-03-15 09:00",
          subject: "Quick question about AI scaling"
        },
        {
          id: "e2",
          type: "inbound",
          content: "Thanks for reaching out! Yes, we're actively looking into this...",
          date: "2024-03-15 10:30",
          subject: "Re: Quick question about AI scaling"
        }
      ]
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane@example.com",
      company: "Tech Corp",
      status: "replied",
      lastActivity: "2024-03-14",
      avatar: "/avatars/02.png",
      emailThread: [
        {
          id: "e3",
          type: "outbound",
          content: "Hi Jane, I saw your company's recent expansion announcement...",
          date: "2024-03-14 11:00",
          subject: "Congratulations on the expansion"
        }
      ]
    }
  ]
}

interface EmailThreadPanelProps {
  lead: any
  onClose: () => void
}

function EmailThreadPanel({ lead, onClose }: EmailThreadPanelProps) {
  const [reply, setReply] = useState("")

  const handleSend = () => {
    console.log("Sending reply to", lead.name, ":", reply)
    setReply("")
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-auto p-4">
        <div className="space-y-6">
          {lead.emailThread.map((email: any) => (
            <div
              key={email.id}
              className={`p-4 rounded-lg ${
                email.type === "inbound"
                  ? "bg-blue-50 dark:bg-blue-900/20"
                  : "bg-gray-50 dark:bg-gray-800/50"
              }`}
            >
              <div className="flex justify-between mb-2">
                <p className="font-medium">{email.subject}</p>
                <span className="text-sm text-muted-foreground">{email.date}</span>
              </div>
              <p className="text-sm whitespace-pre-wrap">{email.content}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="border-t p-4 space-y-4">
        <Input
          placeholder="Type your reply..."
          value={reply}
          onChange={(e) => setReply(e.target.value)}
        />
        <div className="flex justify-end">
          <Button onClick={handleSend} disabled={!reply.trim()}>
            <Send className="h-4 w-4 mr-2" />
            Send Reply
          </Button>
        </div>
      </div>
    </div>
  )
}

export default function CampaignPage({ params }: { params: { id: string } }) {
  const [selectedLead, setSelectedLead] = useState<any>(null)
  const [filter, setFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  // Filter leads based on status and search query
  const filteredLeads = campaignData.leads.filter(lead => {
    const matchesFilter = filter === "all" || lead.status === filter
    const matchesSearch = lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         lead.company.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesFilter && matchesSearch
  })

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1">
        <div className="p-8">
          <div className="flex items-center justify-between mb-8">
            <div className="space-y-1">
              <div className="flex items-center gap-4">
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/campaigns">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Campaigns
                  </Link>
                </Button>
              </div>
              <h1 className="text-3xl font-bold">{campaignData.name}</h1>
              <p className="text-muted-foreground">{campaignData.description}</p>
            </div>
            <Badge variant={campaignData.status === "Active" ? "default" : "secondary"}>
              {campaignData.status}
            </Badge>
          </div>

          <div className="grid gap-4 md:grid-cols-4 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Emails Sent</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{campaignData.stats.emailsSent}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Opened</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{campaignData.stats.opened}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Replied</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{campaignData.stats.replied}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Meetings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{campaignData.stats.meetings}</div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Campaign Leads</CardTitle>
              <CardDescription>Manage and track all leads in this campaign</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="relative w-64">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search leads..."
                      className="pl-8"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline">
                        <Filter className="mr-2 h-4 w-4" />
                        {filter === "all" ? "All Leads" : filter}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => setFilter("all")}>
                        All Leads
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setFilter("contacted")}>
                        Contacted
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setFilter("replied")}>
                        Replied
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setFilter("meeting_booked")}>
                        Meeting Booked
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Activity</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLeads.map((lead) => (
                    <TableRow key={lead.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-9 w-9">
                            <AvatarImage src={lead.avatar} alt={lead.name} />
                            <AvatarFallback>{lead.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="flex flex-col">
                            <span className="font-medium">{lead.name}</span>
                            <span className="text-sm text-muted-foreground">{lead.email}</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{lead.company}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{lead.status}</Badge>
                      </TableCell>
                      <TableCell>{lead.lastActivity}</TableCell>
                      <TableCell>
                        <Sheet>
                          <SheetTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => setSelectedLead(lead)}
                            >
                              <Mail className="h-4 w-4" />
                            </Button>
                          </SheetTrigger>
                          <SheetContent side="right" className="w-[400px] sm:w-[540px]">
                            <SheetHeader>
                              <SheetTitle>Email Thread with {lead.name}</SheetTitle>
                            </SheetHeader>
                            <EmailThreadPanel
                              lead={lead}
                              onClose={() => setSelectedLead(null)}
                            />
                          </SheetContent>
                        </Sheet>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

