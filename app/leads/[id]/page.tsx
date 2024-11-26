"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ArrowLeft, Mail, Building2, MapPin, Globe, ExternalLink, Plus, Trash2, Calendar, ArrowUpRight, Send, Linkedin, Clock, MessageSquare } from 'lucide-react'
import Link from "next/link"
import Sidebar from "@/components/sidebar"
import { cn } from "@/lib/utils"

export default function LeadProfile({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState("overview")
  const [notes, setNotes] = useState([
    { id: 1, content: "Interested in our enterprise plan. Follow up next week.", date: "2024-05-15", author: "John Smith" },
    { id: 2, content: "Attended our webinar on AI in cybersecurity. Very engaged.", date: "2024-06-01", author: "Sarah Lee" },
  ])
  const [newNote, setNewNote] = useState("")
  const [replyContent, setReplyContent] = useState("")

  // Mock data for the lead
  const lead = {
    name: "Katherine Desy",
    email: "katherine.desy@blackkite.com",
    title: "Director, Growth Marketing",
    company: "Black Kite",
    location: "Boston, Massachusetts, United States",
    avatar: "https://i.pravatar.cc/150?img=23",
    linkedinAvatar: "/placeholder.svg?height=48&width=48",
    linkedinUrl: "https://www.linkedin.com/in/katherinedesy",
    jobHistory: [
      { title: "Director, Growth Marketing", company: "Black Kite", period: "2022 - Present" },
      { title: "Senior Channel Marketing Manager", company: "Black Kite", period: "2022 - 2022" },
      { title: "Channel Marketing Manager", company: "Black Kite", period: "2021 - 2022" }
    ],
    education: [
      { school: "Syracuse University", degree: "Bachelor of Science (B.S.), Marketing, Entrepreneurship + Minor: Psychology", period: "2011 - 2015" }
    ],
    companyInfo: {
      name: "Black Kite",
      website: "http://www.blackkite.com",
      employeeCount: "51-200",
      industry: "Information technology & services",
      address: "800 Boylston St, Boston, Massachusetts, United States, 02199",
      description: "Black Kite is redefining vendor risk management with the world's first global third-party cyber risk monitoring platform, built from a hacker's perspective.",
      logo: "https://logo.clearbit.com/blackkite.com"
    },
    activity: [
      { type: "email_sent", date: "2024-03-15", description: "Sent follow-up email" },
      { type: "linkedin_view", date: "2024-03-14", description: "Viewed LinkedIn profile" },
      { type: "note_added", date: "2024-03-13", description: "Added note about product interest" }
    ],
    linkedInPosts: [
      { content: "The Black Kite team is ready to help you level up!! Check out their booth and learn how!!", date: "Apr 11, 2024" },
      { content: "Check out this week's Focus Friday, highlighting the questions your security team should be asking vendors", date: "Feb 16, 2024" }
    ],
    recentNews: [
      { source: "Globe Newswire", date: "Jul 23, 2024", title: "Black Kite Successfully Achieves SOC 2 Type II Compliance", logo: "/placeholder.svg?height=24&width=24" },
      { source: "Globe Newswire", date: "Jul 16, 2024", title: "Black Kite Automates EU DORA Compliance for Financial Services", logo: "/placeholder.svg?height=24&width=24" }
    ],
    fundingRounds: [
      { amount: "$22M", series: "Series B", date: "Oct 2021", investor: "Volition Capital", participants: 4 },
      { amount: "$7.5M", series: "Series A", date: "Oct 2020", investor: "Moore Strategic Ventures", participants: 3 }
    ]
  }

  const emailThread = [
    {
      id: "e1",
      type: "outbound",
      sender: "John Smith",
      recipient: "Katherine Desy",
      date: "Mar 15, 2024",
      subject: "Black Kite + Our Platform",
      content: "Hi Katherine,\n\nI noticed Black Kite's recent expansion in the cybersecurity space. Our AI platform could help accelerate your growth initiatives.\n\nWould you be interested in a quick chat about how we're helping similar companies?",
      avatar: "/avatars/john.jpg"
    },
    {
      id: "e2",
      type: "inbound",
      sender: "Katherine Desy",
      recipient: "John Smith",
      date: "Mar 15, 2024",
      subject: "Re: Black Kite + Our Platform",
      content: "Hi John,\n\nThanks for reaching out. This sounds interesting - could you share more details about your platform and how it specifically helps cybersecurity companies?",
      avatar: "https://i.pravatar.cc/150?img=23"
    }
  ]

  const addNote = () => {
    if (newNote.trim()) {
      setNotes([
        ...notes,
        {
          id: Date.now(),
          content: newNote,
          date: new Date().toISOString().split('T')[0],
          author: "John Smith"
        }
      ])
      setNewNote("")
    }
  }

  const deleteNote = (id: number) => {
    setNotes(notes.filter(note => note.id !== id))
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 overflow-auto">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/leads">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Leads
                </Link>
              </Button>
            </div>
            <div className="flex items-center space-x-2">
              <Button>
                <Mail className="mr-2 h-4 w-4" />
                Send Email
              </Button>
              <Button variant="outline">Add to Campaign</Button>
            </div>
          </div>

          {/* Lead Profile Header */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start gap-6">
                <Avatar className="h-24 w-24 border-4 border-background">
                  <AvatarImage src={lead.avatar} alt={lead.name} />
                  <AvatarFallback>{lead.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-1">
                  <h1 className="text-2xl font-bold">{lead.name}</h1>
                  <p className="text-lg text-muted-foreground">{lead.title}</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Building2 className="h-4 w-4" />
                      {lead.company}
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {lead.location}
                    </div>
                  </div>
                  <div className="flex items-center gap-4 mt-4">
                    <a
                      href={lead.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-blue-600 hover:underline"
                    >
                      <Linkedin className="h-4 w-4" />
                      LinkedIn Profile
                    </a>
                    <a
                      href={`mailto:${lead.email}`}
                      className="flex items-center gap-2 text-sm text-blue-600 hover:underline"
                    >
                      <Mail className="h-4 w-4" />
                      {lead.email}
                    </a>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tabs Navigation */}
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
              <TabsTrigger value="emails">Email Thread</TabsTrigger>
              <TabsTrigger value="notes">Notes</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Company Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src={lead.companyInfo.logo} alt={lead.companyInfo.name} />
                        <AvatarFallback>{lead.companyInfo.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="text-xl font-bold">{lead.companyInfo.name}</h3>
                        <a
                          href={lead.companyInfo.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline flex items-center"
                        >
                          {lead.companyInfo.website}
                          <ExternalLink className="ml-1 h-3 w-3" />
                        </a>
                      </div>
                    </div>
                    <div className="grid gap-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">Employees</Badge>
                        <span>{lead.companyInfo.employeeCount}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">Industry</Badge>
                        <span>{lead.companyInfo.industry}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">Location</Badge>
                        <span>{lead.companyInfo.address}</span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mt-4">
                      {lead.companyInfo.description}
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Professional Background</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h3 className="font-semibold mb-2">Work History</h3>
                      <div className="space-y-3">
                        {lead.jobHistory.map((job, i) => (
                          <div key={i} className="text-sm">
                            <p className="font-medium">{job.title}</p>
                            <p className="text-muted-foreground">
                              {job.company} • {job.period}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Education</h3>
                      <div className="space-y-3">
                        {lead.education.map((edu, i) => (
                          <div key={i} className="text-sm">
                            <p className="font-medium">{edu.school}</p>
                            <p className="text-muted-foreground">
                              {edu.degree} • {edu.period}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>LinkedIn Activity</CardTitle>
                    <CardDescription>Recent posts and engagements</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[300px]">
                      <div className="space-y-4">
                        {lead.linkedInPosts.map((post, index) => (
                          <div key={index} className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                            <div className="flex items-center gap-2 mb-2">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={lead.avatar} alt={lead.name} />
                                <AvatarFallback>{lead.name[0]}</AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium text-sm">{lead.name}</p>
                                <p className="text-xs text-muted-foreground">{post.date}</p>
                              </div>
                            </div>
                            <p className="text-sm">{post.content}</p>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>

                <div className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Company News</CardTitle>
                      <CardDescription>Latest announcements and press</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ScrollArea className="h-[200px]">
                        <div className="space-y-4">
                          {lead.recentNews.map((news, index) => (
                            <div key={index} className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                              <div className="flex items-center gap-2 mb-2">
                                <Avatar className="h-6 w-6">
                                  <AvatarImage src={news.logo} alt={news.source} />
                                  <AvatarFallback>{news.source[0]}</AvatarFallback>
                                </Avatar>
                                <span className="text-xs text-muted-foreground">{news.source}</span>
                              </div>
                              <a href="#" className="font-medium hover:underline flex items-center">
                                {news.title}
                                <ArrowUpRight className="ml-1 h-3 w-3" />
                              </a>
                              <p className="text-xs text-muted-foreground mt-1">{news.date}</p>
                            </div>
                          ))}
                        </div>
                      </ScrollArea>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Funding History</CardTitle>
                      <CardDescription>Investment rounds and details</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {lead.fundingRounds.map((round, index) => (
                          <div key={index} className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                              <div>
                                <p className="font-medium">{round.series}</p>
                                <p className="text-sm text-muted-foreground">{round.date}</p>
                              </div>
                              <Badge variant="secondary" className="text-lg font-semibold">
                                {round.amount}
                              </Badge>
                            </div>
                            <div className="text-sm">
                              <p>Lead Investor: {round.investor}</p>
                              <p className="text-muted-foreground">{round.participants} participants</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* Activity Tab */}
            <TabsContent value="activity">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Track all interactions with this lead</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-8">
                    {lead.activity.map((item, index) => (
                      <div key={index} className="flex gap-4">
                        <div className="flex-none">
                          <div className="bg-blue-100 dark:bg-blue-900 h-8 w-8 rounded-full flex items-center justify-center">
                            {item.type === 'email_sent' && <Mail className="h-4 w-4 text-blue-600" />}
                            {item.type === 'linkedin_view' && <Linkedin className="h-4 w-4 text-blue-600" />}
                            {item.type === 'note_added' && <MessageSquare className="h-4 w-4 text-blue-600" />}
                          </div>
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">{item.description}</p>
                          <p className="text-sm text-muted-foreground">
                            <Clock className="h-3 w-3 inline mr-1" />
                            {item.date}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Email Thread Tab */}
            <TabsContent value="emails">
              <Card>
                <CardHeader>
                  <CardTitle>Email Communication</CardTitle>
                  <CardDescription>Email thread history</CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[600px] pr-4">
                    <div className="space-y-8">
                      {emailThread.map((email) => (
                        <div key={email.id} className={cn(
                          "rounded-lg p-4",
                          email.type === "inbound" ? "bg-blue-50 dark:bg-blue-900/20" : "bg-gray-50 dark:bg-gray-800/50"
                        )}>
                          <div className="flex items-start gap-4">
                            <Avatar className="h-10 w-10">
                              <AvatarImage src={email.avatar} alt={email.sender} />
                              <AvatarFallback>{email.sender[0]}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1 space-y-2">
                              <div className="flex items-center justify-between">
                                <div>
                                  <p className="font-medium">{email.sender}</p>
                                  <p className="text-sm text-muted-foreground">To: {email.recipient}</p>
                                </div>
                                <span className="text-sm text-muted-foreground">{email.date}</span>
                              </div>
                              <p className="font-medium">{email.subject}</p>
                              <div className="text-sm whitespace-pre-wrap">{email.content}</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                  <div className="mt-4 space-y-2">
                    <Input
                      placeholder="Type your reply here..."
                      value={replyContent}
                      onChange={(e) => setReplyContent(e.target.value)}
                    />
                    <div className="flex justify-end">
                      <Button disabled={!replyContent.trim()}>
                        <Send className="mr-2 h-4 w-4" />
                        Send Reply
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Notes Tab */}
            <TabsContent value="notes">
              <Card>
                <CardHeader>
                  <CardTitle>Notes & Comments</CardTitle>
                  <CardDescription>Keep track of important information</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {notes.map((note) => (
                      <div key={note.id} className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>{note.author[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <p className="font-medium text-sm">{note.author}</p>
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-muted-foreground">{note.date}</span>
                              <Button variant="ghost" size="sm" onClick={() => deleteNote(note.id)}>
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                          <p className="mt-1 text-sm">{note.content}</p>
                        </div>
                      </div>
                    ))}
                    <div className="flex gap-2">
                      <Input
                        placeholder="Add a new note..."
                        value={newNote}
                        onChange={(e) => setNewNote(e.target.value)}
                      />
                      <Button onClick={addNote} disabled={!newNote.trim()}>
                        <Plus className="h-4 w-4 mr-2" />
                        Add Note
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

