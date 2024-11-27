"use client"

import { useState } from "react"
import { notFound } from "next/navigation"
import DashboardLayout from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
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
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
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
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, Search, MoreHorizontal, Filter, Mail, Send, User, Building2, Globe, Phone, MapPin, ThumbsUp, ThumbsDown, Clock, Linkedin, Trash2, ExternalLink, Check, Pause, Play, Power } from 'lucide-react'
import Link from "next/link"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Label } from "@/components/ui/label"

// Mock data (replace with actual data fetching)
const campaignData = {
  id: "1",
  name: "Q4 Enterprise Outreach",
  status: "active",
  metrics: {
    totalLeads: 500,
    contacted: 350,
    remaining: 150,
    openRate: 45.2,
    clickRate: 12.8,
    bounceRate: 2.1,
    replyRate: 28.5,
    positiveEngagement: 18.2,
    negativeEngagement: 10.3,
  },
  leads: [
    {
      id: "1",
      name: "Sarah Johnson",
      title: "VP of Sales",
      company: "TechCorp Inc",
      email: "sarah@techcorp.com",
      engagementStatus: "replied",
      sentiment: "positive",
      lastActivity: "2 hours ago",
      enrichment: {
        company: {
          name: "TechCorp Inc",
          website: "techcorp.com",
          industry: "Software",
          size: "1000-5000",
          revenue: "$50M-$100M",
          location: "San Francisco, CA"
        },
        social: {
          linkedin: "linkedin.com/in/sarah-johnson",
          twitter: "@sarahj"
        }
      },
      engagement: [
        {
          type: "email_opened",
          date: "2024-01-15T10:30:00Z",
          details: "Opened follow-up email"
        },
        {
          type: "email_clicked",
          date: "2024-01-15T10:32:00Z",
          details: "Clicked pricing page link"
        },
        {
          type: "email_replied",
          date: "2024-01-15T11:15:00Z",
          details: "Positive response, requesting demo"
        }
      ],
      notes: [
        {
          id: "n1",
          text: "Showed interest in enterprise features",
          author: "John",
          date: "2024-01-14T15:30:00Z"
        },
        {
          id: "n2",
          text: "Follow up about team size and budget",
          author: "Emma",
          date: "2024-01-15T09:20:00Z"
        }
      ],
      emails: [
        {
          id: "e1",
          type: "outbound",
          subject: "Introducing RocketSDR's Enterprise Features",
          content: "Hi Sarah,\n\nI noticed TechCorp's recent expansion announcement and wanted to reach out about how RocketSDR could help scale your sales development efforts.\n\nWould you be interested in learning how our enterprise customers are achieving 3x more qualified meetings?\n\nBest,\nJohn",
          date: "2024-01-15T09:00:00Z"
        },
        {
          id: "e2",
          type: "inbound",
          subject: "Re: Introducing RocketSDR's Enterprise Features",
          content: "Hi John,\n\nThanks for reaching out! Yes, we're actually in the process of evaluating new sales tools for our expanding team.\n\nCould you share more details about your enterprise features and pricing?\n\nBest,\nSarah",
          date: "2024-01-15T11:15:00Z"
        },
        {
          id: "e3",
          type: "outbound",
          subject: "Re: Introducing RocketSDR's Enterprise Features",
          content: "Hi Sarah,\n\nGreat to hear from you! I'd be happy to share more details.\n\nOur enterprise plan includes:\n- Custom AI training\n- Advanced team collaboration\n- Priority support\n- Custom integrations\n\nWould you be available for a quick demo this week?\n\nBest,\nJohn",
          date: "2024-01-15T11:45:00Z"
        }
      ]
    },
    {
      id: "2",
      name: "Michael Chen",
      title: "CTO",
      company: "DataFlow Systems",
      email: "michael@dataflow.io",
      engagementStatus: "opened",
      sentiment: "neutral",
      lastActivity: "5 days ago",
      enrichment: {
        company: {
          name: "DataFlow Systems",
          website: "dataflow.io",
          industry: "Data Analytics",
          size: "50-200",
          revenue: "$10M-$50M",
          location: "Boston, MA"
        },
        social: {
          linkedin: "linkedin.com/in/michael-chen",
          twitter: "@mchen"
        }
      },
      engagement: [
        {
          type: "email_opened",
          date: "2024-01-10T14:20:00Z",
          details: "Opened initial email"
        }
      ],
      notes: [],
      emails: [
        {
          id: "e1",
          type: "outbound",
          subject: "Streamline Your Sales Process with RocketSDR",
          content: "Hi Michael,\n\nI noticed DataFlow's recent expansion into predictive analytics and wanted to reach out about how RocketSDR could help optimize your sales operations.\n\nWould you be interested in learning how we're helping similar companies improve their sales efficiency?\n\nBest,\nJohn",
          date: "2024-01-10T09:00:00Z"
        }
      ]
    },
    {
      id: "3",
      name: "Rachel Martinez",
      title: "Head of Sales",
      company: "GrowthBase",
      email: "rachel@growthbase.com",
      engagementStatus: "clicked",
      sentiment: "neutral",
      lastActivity: "1 week ago",
      enrichment: {
        company: {
          name: "GrowthBase",
          website: "growthbase.com",
          industry: "Marketing Technology",
          size: "20-50",
          revenue: "$5M-$10M",
          location: "Austin, TX"
        },
        social: {
          linkedin: "linkedin.com/in/rachel-martinez",
          twitter: "@rachelmtz"
        }
      },
      engagement: [
        {
          type: "email_opened",
          date: "2024-01-08T11:15:00Z",
          details: "Opened initial email"
        },
        {
          type: "email_clicked",
          date: "2024-01-08T11:16:00Z",
          details: "Clicked blog link"
        }
      ],
      notes: [
        {
          id: "n1",
          text: "Company recently raised seed round",
          author: "Emma",
          date: "2024-01-07T10:00:00Z"
        }
      ],
      emails: [
        {
          id: "e1",
          type: "outbound",
          subject: "Scale Your Sales Team with RocketSDR",
          content: "Hi Rachel,\n\nCongratulations on GrowthBase's recent funding round! As you plan to scale your sales team, I wanted to introduce you to RocketSDR.\n\nWould you be open to a quick chat about how we're helping similar post-seed companies build efficient sales processes?\n\nBest,\nJohn",
          date: "2024-01-08T09:00:00Z"
        }
      ]
    },
    {
      id: "4",
      name: "David Kim",
      title: "Director of Operations",
      company: "CloudScale",
      email: "david@cloudscale.io",
      engagementStatus: "cold",
      sentiment: "neutral",
      lastActivity: "2 weeks ago",
      enrichment: {
        company: {
          name: "CloudScale",
          website: "cloudscale.io",
          industry: "Cloud Infrastructure",
          size: "10-50",
          revenue: "$1M-$5M",
          location: "Seattle, WA"
        },
        social: {
          linkedin: "linkedin.com/in/david-kim",
          twitter: "@dkim"
        }
      },
      engagement: [],
      notes: [],
      emails: [
        {
          id: "e1",
          type: "outbound",
          subject: "Improve Your Sales Efficiency with RocketSDR",
          content: "Hi David,\n\nI noticed CloudScale's focus on operational excellence and wanted to share how RocketSDR could help streamline your sales processes.\n\nWould you be interested in seeing how we're helping similar companies?\n\nBest,\nJohn",
          date: "2024-01-01T09:00:00Z"
        }
      ]
    }
  ]
}

function LeadSheet({ lead, onClose }) {
  const [newNote, setNewNote] = useState("")
  const [notes, setNotes] = useState(lead.notes)
  const [emails, setEmails] = useState(lead.emails)
  const [reply, setReply] = useState("")
  const [replyTo, setReplyTo] = useState(null)

  const addNote = () => {
    if (!newNote.trim()) return
    const note = {
      id: `n${Date.now()}`,
      text: newNote,
      author: "John",
      date: new Date().toISOString()
    }
    setNotes([note, ...notes])
    setNewNote("")
  }

  const deleteNote = (noteId) => {
    setNotes(notes.filter(note => note.id !== noteId))
  }

  const handleSendReply = () => {
    if (!reply.trim() || !replyTo) return
    
    const newEmail = {
      id: `e${Date.now()}`,
      type: "outbound",
      subject: replyTo.subject.startsWith("Re:") ? replyTo.subject : `Re: ${replyTo.subject}`,
      content: reply,
      date: new Date().toISOString()
    }
    
    setEmails([...emails, newEmail])
    setReply("")
    setReplyTo(null)
  }

  return (
    <div className="space-y-8">
      {/* Lead Overview */}
      <div className="space-y-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-14 w-14">
              <AvatarFallback>{lead.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <h3 className="text-lg font-semibold">{lead.name}</h3>
              <p className="text-sm text-muted-foreground">{lead.title}</p>
            </div>
          </div>
          {lead.engagementStatus === 'replied' ? (
            <Badge 
              variant={lead.sentiment === 'positive' ? 'success' : 'destructive'}
              className="px-4 py-1 text-sm"
            >
              {lead.sentiment === 'positive' ? 'Positive' : 'Negative'} Engagement
            </Badge>
          ) : (
            <Badge 
              variant="outline" 
              className={
                lead.engagementStatus === 'meeting_booked' ? 'bg-purple-50 text-purple-700 border-purple-300' :
                lead.engagementStatus === 'clicked' ? 'bg-blue-50 text-blue-700 border-blue-300' :
                lead.engagementStatus === 'opened' ? 'bg-yellow-50 text-yellow-700 border-yellow-300' :
                'bg-gray-50 text-gray-700 border-gray-300'
              }
            >
              {lead.engagementStatus === 'meeting_booked' ? 'Meeting Booked' :
               lead.engagementStatus === 'clicked' ? 'Clicked' :
               lead.engagementStatus === 'opened' ? 'Opened' :
               'No Activity'}
            </Badge>
          )}
        </div>

        {/* Contact & Company Info */}
        <div className="grid grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm">
              <Mail className="h-4 w-4" />
              {lead.email}
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Building2 className="h-4 w-4" />
              {lead.enrichment.company.name}
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Globe className="h-4 w-4" />
              <a href={`https://${lead.enrichment.company.website}`} target="_blank" rel="noopener noreferrer" className="hover:underline">
                {lead.enrichment.company.website}
              </a>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Linkedin className="h-4 w-4" />
              <a href={`https://${lead.enrichment.social.linkedin}`} target="_blank" rel="noopener noreferrer" className="hover:underline">
                View LinkedIn Profile <ExternalLink className="h-3 w-3 inline" />
              </a>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm">
              <User className="h-4 w-4" />
              {lead.enrichment.company.size} employees
            </div>
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="h-4 w-4" />
              {lead.enrichment.company.location}
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="activity">
        <TabsList className="w-full">
          <TabsTrigger value="activity" className="flex-1">Activity</TabsTrigger>
          <TabsTrigger value="notes" className="flex-1">Notes</TabsTrigger>
          <TabsTrigger value="emails" className="flex-1">Emails</TabsTrigger>
        </TabsList>
        <TabsContent value="activity" className="space-y-4">
          <ScrollArea className="h-[400px]">
            {[
              // Add outbound emails as activities
              ...lead.emails
                .filter(email => email.type === 'outbound')
                .map(email => ({
                  type: 'email_sent',
                  date: email.date,
                  details: `Sent email: ${email.subject}`
                })),
              // Add existing engagement activities
              ...lead.engagement
            ]
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
            .map((item, index) => (
              <div key={index} className="flex items-start gap-3 py-3 border-b last:border-0">
                <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                  {item.type === 'email_sent' && <Send className="h-4 w-4" />}
                  {item.type.includes('opened') && <Mail className="h-4 w-4" />}
                  {item.type.includes('clicked') && <Globe className="h-4 w-4" />}
                  {item.type.includes('replied') && <Send className="h-4 w-4 rotate-180" />}
                </div>
                <div>
                  <p className="font-medium">{item.details}</p>
                  <p className="text-sm text-muted-foreground">
                    <Clock className="h-3 w-3 inline mr-1" />
                    {new Date(item.date).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </ScrollArea>
        </TabsContent>
        <TabsContent value="notes" className="space-y-4">
          <div className="flex gap-2">
            <Input 
              placeholder="Add a note..." 
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addNote()}
            />
            <Button onClick={addNote}>Add</Button>
          </div>
          <ScrollArea className="h-[400px]">
            <div className="space-y-4">
              {notes.map((note) => (
                <div key={note.id} className="p-3 border rounded-lg group">
                  <div className="flex justify-between items-start">
                    <p className="text-sm">{note.text}</p>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => deleteNote(note.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Added by {note.author} • {new Date(note.date).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>
        <TabsContent value="emails">
          <ScrollArea className="h-[600px]">
            <div className="space-y-4">
              {emails.map((email) => (
                <div
                  key={email.id}
                  className={`p-4 rounded-lg ${
                    email.type === "inbound"
                      ? "bg-blue-50 dark:bg-blue-900/20"
                      : "bg-gray-50 dark:bg-gray-800/50"
                  }`}
                >
                  <div className="flex justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Badge variant={email.type === "inbound" ? "secondary" : "outline"}>
                        {email.type === "inbound" ? "Received" : "Sent"}
                      </Badge>
                      <p className="font-medium">{email.subject}</p>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {new Date(email.date).toLocaleString()}
                    </span>
                  </div>
                  <p className="text-sm whitespace-pre-wrap">{email.content}</p>
                  {replyTo?.id !== email.id && (
                    <div className="mt-2 flex items-center gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setReplyTo(email)}
                      >
                        <Mail className="h-4 w-4 mr-2" />
                        {email.type === "inbound" ? "Reply" : "Follow Up"}
                      </Button>
                      <span className="text-sm text-muted-foreground">
                        {email.type === "inbound" ? "Reply to this message" : "Send a follow-up message"}
                      </span>
                    </div>
                  )}
                </div>
              ))}
              {replyTo && (
                <div className="space-y-4 p-4 border rounded-lg">
                  <div className="flex justify-between items-center">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">
                        {replyTo.type === "inbound" ? "Replying to" : "Following up on"}:
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {replyTo.subject}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setReplyTo(null)}
                    >
                      Cancel
                    </Button>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Input 
                        id="subject"
                        value={replyTo.subject.startsWith("Re:") ? replyTo.subject : `Re: ${replyTo.subject}`}
                        disabled
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <textarea
                        id="message"
                        className="w-full min-h-[200px] p-3 text-sm rounded-md border resize-none focus:outline-none focus:ring-2 focus:ring-ring"
                        placeholder={`Type your ${replyTo.type === "inbound" ? "reply" : "follow-up"}...`}
                        value={reply}
                        onChange={(e) => setReply(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <Button onClick={handleSendReply} disabled={!reply.trim()}>
                      <Send className="h-4 w-4 mr-2" />
                      {replyTo.type === "inbound" ? "Send Reply" : "Send Follow-up"}
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default function CampaignDetail({ params }: { params: { id: string } }) {
  const [selectedLead, setSelectedLead] = useState(null)
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterSentiment, setFilterSentiment] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [campaignStatus, setCampaignStatus] = useState(campaignData.status)

  if (!campaignData) {
    notFound()
  }

  const filteredLeads = campaignData.leads.filter(lead => {
    // First check if it matches the status filter
    const matchesStatus = 
      filterStatus === "all" || 
      (filterStatus === "engaged" && lead.engagementStatus === "replied") ||
      (filterStatus === "cold" && ["opened", "clicked", "cold"].includes(lead.engagementStatus))

    // Separately check if it matches the sentiment filter
    const matchesSentiment = 
      filterSentiment === "all" || 
      (filterSentiment === "positive" && lead.sentiment === "positive") ||
      (filterSentiment === "negative" && lead.sentiment === "negative")

    // Check if it matches the search query
    const matchesSearch = 
      lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchQuery.toLowerCase())

    // All conditions must be true for the lead to be included
    return (matchesStatus && matchesSentiment) && matchesSearch
  })

  const handleCampaignStatusToggle = () => {
    setCampaignStatus(campaignStatus === 'active' ? 'paused' : 'active')
  }

  return (
    <DashboardLayout>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/campaigns">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Link>
            </Button>
            <h2 className="text-3xl font-bold tracking-tight">{campaignData.name}</h2>
            <Badge variant={campaignStatus === 'active' ? 'default' : 'secondary'}>
              {campaignStatus.charAt(0).toUpperCase() + campaignStatus.slice(1)}
            </Badge>
          </div>
          <div className="flex items-center space-x-2">
            <Button 
              variant={campaignStatus === 'active' ? 'outline' : 'default'}
              onClick={handleCampaignStatusToggle}
            >
              {campaignStatus === 'active' ? (
                <>
                  <Pause className="mr-2 h-4 w-4" />
                  Pause Campaign
                </>
              ) : (
                <>
                  <Play className="mr-2 h-4 w-4" />
                  Resume Campaign
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Campaign Metrics */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Progress value={(campaignData.metrics.contacted / campaignData.metrics.totalLeads) * 100} />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>{campaignData.metrics.contacted} contacted</span>
                  <span>{campaignData.metrics.remaining} remaining</span>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Engagement</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Open Rate</span>
                  <span className="font-medium">{campaignData.metrics.openRate}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Click Rate</span>
                  <span className="font-medium">{campaignData.metrics.clickRate}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Reply Rate</span>
                  <span className="font-medium">{campaignData.metrics.replyRate}%</span>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Sentiment</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <ThumbsUp className="mr-2 h-4 w-4 text-green-500" />
                    <span className="text-sm text-muted-foreground">Positive</span>
                  </div>
                  <span className="font-medium">{campaignData.metrics.positiveEngagement}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <ThumbsDown className="mr-2 h-4 w-4 text-red-500" />
                    <span className="text-sm text-muted-foreground">Negative</span>
                  </div>
                  <span className="font-medium">{campaignData.metrics.negativeEngagement}%</span>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Health</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Bounce Rate</span>
                  <span className="font-medium">{campaignData.metrics.bounceRate}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Spam Reports</span>
                  <span className="font-medium">0</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Leads Table */}
        <Card>
          <CardHeader>
            <CardTitle>Campaign Leads</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4 mb-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search leads..." 
                    className="pl-8" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Filter className="mr-2 h-4 w-4" />
                    Filter
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>Engagement Status</DropdownMenuLabel>
                  <DropdownMenuCheckboxItem 
                    checked={filterStatus === "all"}
                    onCheckedChange={() => setFilterStatus("all")}
                  >
                    All Statuses
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem 
                    checked={filterStatus === "engaged"}
                    onCheckedChange={() => setFilterStatus("engaged")}
                  >
                    Engaged Only
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem 
                    checked={filterStatus === "cold"}
                    onCheckedChange={() => setFilterStatus("cold")}
                  >
                    Cold Only
                  </DropdownMenuCheckboxItem>

                  <DropdownMenuSeparator />
                  
                  <DropdownMenuLabel>Sentiment</DropdownMenuLabel>
                  <DropdownMenuCheckboxItem 
                    checked={filterSentiment === "all"}
                    onCheckedChange={() => setFilterSentiment("all")}
                  >
                    All Sentiment
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem 
                    checked={filterSentiment === "positive"}
                    onCheckedChange={() => setFilterSentiment("positive")}
                  >
                    Positive Only
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem 
                    checked={filterSentiment === "negative"}
                    onCheckedChange={() => setFilterSentiment("negative")}
                  >
                    Negative Only
                  </DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <Tabs defaultValue="engaged">
              <TabsList>
                <TabsTrigger value="engaged">Active (Replied/Booked)</TabsTrigger>
                <TabsTrigger value="warming">Warming Up (Opened/Clicked)</TabsTrigger>
                <TabsTrigger value="cold">Cold (No Activity)</TabsTrigger>
              </TabsList>
              <TabsContent value="engaged">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Company</TableHead>
                      <TableHead>Engagement Status</TableHead>
                      <TableHead>Last Activity</TableHead>
                      <TableHead>Sentiment</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredLeads.filter(lead => ['replied', 'meeting_booked'].includes(lead.engagementStatus)).map((lead) => (
                      <TableRow key={lead.id} className="cursor-pointer hover:bg-muted/50">
                        <TableCell onClick={() => setSelectedLead(lead)}>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback>{lead.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium hover:underline">{lead.name}</div>
                              <div className="text-sm text-muted-foreground">{lead.title}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell onClick={() => setSelectedLead(lead)}>{lead.company}</TableCell>
                        <TableCell onClick={() => setSelectedLead(lead)}>
                          <Badge variant="outline" className={
                            lead.engagementStatus === 'replied' ? 'bg-green-50 text-green-700 border-green-300' :
                            lead.engagementStatus === 'meeting_booked' ? 'bg-purple-50 text-purple-700 border-purple-300' :
                            lead.engagementStatus === 'clicked' ? 'bg-blue-50 text-blue-700 border-blue-300' :
                            lead.engagementStatus === 'opened' ? 'bg-yellow-50 text-yellow-700 border-yellow-300' :
                            'bg-gray-50 text-gray-700 border-gray-300'
                          }>
                            {lead.engagementStatus === 'replied' ? 'Replied' :
                             lead.engagementStatus === 'meeting_booked' ? 'Meeting Booked' :
                             lead.engagementStatus === 'clicked' ? 'Clicked' :
                             lead.engagementStatus === 'opened' ? 'Opened' :
                             'Cold'}
                          </Badge>
                        </TableCell>
                        <TableCell onClick={() => setSelectedLead(lead)}>{lead.lastActivity}</TableCell>
                        <TableCell onClick={() => setSelectedLead(lead)}>
                          <Badge 
                            variant={lead.sentiment === 'positive' ? 'success' : 'destructive'}
                            className={
                              lead.sentiment === 'positive' 
                                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100' 
                                : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100'
                            }
                          >
                            {lead.sentiment === 'positive' ? 'Positive' : 'Negative'}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>
              <TabsContent value="warming">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Company</TableHead>
                      <TableHead>Engagement Status</TableHead>
                      <TableHead>Last Activity</TableHead>
                      <TableHead>Sentiment</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredLeads.filter(lead => ['opened', 'clicked'].includes(lead.engagementStatus)).map((lead) => (
                      <TableRow key={lead.id} className="cursor-pointer hover:bg-muted/50">
                        <TableCell onClick={() => setSelectedLead(lead)}>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback>{lead.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium hover:underline">{lead.name}</div>
                              <div className="text-sm text-muted-foreground">{lead.title}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell onClick={() => setSelectedLead(lead)}>{lead.company}</TableCell>
                        <TableCell onClick={() => setSelectedLead(lead)}>
                          <Badge variant="outline" className={
                            lead.engagementStatus === 'replied' ? 'bg-green-50 text-green-700 border-green-300' :
                            lead.engagementStatus === 'meeting_booked' ? 'bg-purple-50 text-purple-700 border-purple-300' :
                            lead.engagementStatus === 'clicked' ? 'bg-blue-50 text-blue-700 border-blue-300' :
                            lead.engagementStatus === 'opened' ? 'bg-yellow-50 text-yellow-700 border-yellow-300' :
                            'bg-gray-50 text-gray-700 border-gray-300'
                          }>
                            {lead.engagementStatus === 'replied' ? 'Replied' :
                             lead.engagementStatus === 'meeting_booked' ? 'Meeting Booked' :
                             lead.engagementStatus === 'clicked' ? 'Clicked' :
                             lead.engagementStatus === 'opened' ? 'Opened' :
                             'Cold'}
                          </Badge>
                        </TableCell>
                        <TableCell onClick={() => setSelectedLead(lead)}>{lead.lastActivity}</TableCell>
                        <TableCell onClick={() => setSelectedLead(lead)}>
                          <Badge 
                            variant="secondary"
                            className="bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
                          >
                            Neutral
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>
              <TabsContent value="cold">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Company</TableHead>
                      <TableHead>Engagement Status</TableHead>
                      <TableHead>Last Activity</TableHead>
                      <TableHead>Sentiment</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredLeads.filter(lead => lead.engagementStatus === 'cold').map((lead) => (
                      <TableRow key={lead.id} className="cursor-pointer hover:bg-muted/50">
                        <TableCell onClick={() => setSelectedLead(lead)}>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback>{lead.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium hover:underline">{lead.name}</div>
                              <div className="text-sm text-muted-foreground">{lead.title}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell onClick={() => setSelectedLead(lead)}>{lead.company}</TableCell>
                        <TableCell onClick={() => setSelectedLead(lead)}>
                          <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-300">
                            No Activity
                          </Badge>
                        </TableCell>
                        <TableCell onClick={() => setSelectedLead(lead)}>{lead.lastActivity}</TableCell>
                        <TableCell onClick={() => setSelectedLead(lead)}>
                          <Badge 
                            variant="secondary"
                            className="bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
                          >
                            Neutral
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Lead Details Sheet */}
        <Sheet open={selectedLead !== null} onOpenChange={() => setSelectedLead(null)}>
          <SheetContent 
            side="right" 
            className="w-[90%] sm:max-w-[200px] md:max-w-[300px] lg:max-w-[400px] xl:max-w-[600px] p-6 overflow-y-auto"
          >
            <SheetHeader className="mb-6">
              <SheetTitle>Lead Details</SheetTitle>
            </SheetHeader>
            <div className="pr-2">
              {selectedLead && (
                <LeadSheet 
                  lead={selectedLead} 
                  onClose={() => setSelectedLead(null)} 
                />
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </DashboardLayout>
  )
}

