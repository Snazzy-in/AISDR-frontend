"use client"

import { useState } from "react"
import DashboardLayout from "@/components/dashboard-layout"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Search, Download, Trash2, MoreHorizontal, Filter, Upload } from 'lucide-react'
import Link from "next/link"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils"

const leads = [
  {
    id: "1",
    name: "Deepa Sharma",
    email: "deepa@parietech.com",
    company: "Parie Technologies",
    workflowStage: 33,
    engaged: false,
    sentiment: "neutral",
    lastContact: "28th May 2024 10:40 AM",
    avatar: "/avatars/01.png"
  },
  {
    id: "2",
    name: "Brian Kolb",
    email: "brian@rapidcanvas.ai",
    company: "RapidCanvas",
    workflowStage: 66,
    engaged: true,
    sentiment: "positive",
    lastContact: "11th Jun 2024 09:28 AM",
    avatar: "/avatars/02.png"
  },
]

export default function LeadsPage() {
  const [selectedLeads, setSelectedLeads] = useState<string[]>([])
  const [filters, setFilters] = useState({
    engagement: {
      engaged: false,
      notEngaged: false
    },
    sentiment: {
      positive: false,
      negative: false,
      neutral: false
    }
  })

  const filteredLeads = leads.filter(lead => {
    // If no engagement filters are selected, show all
    const engagementFilterActive = filters.engagement.engaged || filters.engagement.notEngaged
    const passesEngagementFilter = !engagementFilterActive || 
      (filters.engagement.engaged && lead.engaged) ||
      (filters.engagement.notEngaged && !lead.engaged)

    // If no sentiment filters are selected, show all
    const sentimentFilterActive = filters.sentiment.positive || 
      filters.sentiment.negative || 
      filters.sentiment.neutral
    const passesSentimentFilter = !sentimentFilterActive ||
      (filters.sentiment.positive && lead.sentiment === "positive") ||
      (filters.sentiment.negative && lead.sentiment === "negative") ||
      (filters.sentiment.neutral && lead.sentiment === "neutral")

    return passesEngagementFilter && passesSentimentFilter
  })

  return (
    <DashboardLayout>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Leads</h1>
          <div className="flex items-center space-x-2">
            <Button asChild>
              <Link href="/leads/import">
                <Upload className="mr-2 h-4 w-4" />
                Import Leads
              </Link>
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Filter className="mr-2 h-4 w-4" />
                  Filters
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Filter Leads</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label>Engagement Status</Label>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <Checkbox 
                          id="status-engaged" 
                          checked={filters.engagement.engaged}
                          onCheckedChange={(checked) => 
                            setFilters(prev => ({
                              ...prev,
                              engagement: { ...prev.engagement, engaged: checked as boolean }
                            }))
                          }
                        />
                        <label htmlFor="status-engaged" className="ml-2 text-sm">Engaged</label>
                      </div>
                      <div className="flex items-center">
                        <Checkbox 
                          id="status-not-engaged"
                          checked={filters.engagement.notEngaged}
                          onCheckedChange={(checked) => 
                            setFilters(prev => ({
                              ...prev,
                              engagement: { ...prev.engagement, notEngaged: checked as boolean }
                            }))
                          }
                        />
                        <label htmlFor="status-not-engaged" className="ml-2 text-sm">Not Engaged</label>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Sentiment</Label>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <Checkbox 
                          id="sentiment-positive"
                          checked={filters.sentiment.positive}
                          onCheckedChange={(checked) => 
                            setFilters(prev => ({
                              ...prev,
                              sentiment: { ...prev.sentiment, positive: checked as boolean }
                            }))
                          }
                        />
                        <label htmlFor="sentiment-positive" className="ml-2 text-sm">Positive</label>
                      </div>
                      <div className="flex items-center">
                        <Checkbox 
                          id="sentiment-negative"
                          checked={filters.sentiment.negative}
                          onCheckedChange={(checked) => 
                            setFilters(prev => ({
                              ...prev,
                              sentiment: { ...prev.sentiment, negative: checked as boolean }
                            }))
                          }
                        />
                        <label htmlFor="sentiment-negative" className="ml-2 text-sm">Negative</label>
                      </div>
                      <div className="flex items-center">
                        <Checkbox 
                          id="sentiment-neutral"
                          checked={filters.sentiment.neutral}
                          onCheckedChange={(checked) => 
                            setFilters(prev => ({
                              ...prev,
                              sentiment: { ...prev.sentiment, neutral: checked as boolean }
                            }))
                          }
                        />
                        <label htmlFor="sentiment-neutral" className="ml-2 text-sm">Neutral</label>
                      </div>
                    </div>
                  </div>
                  <Button 
                    onClick={() => setFilters({
                      engagement: { engaged: false, notEngaged: false },
                      sentiment: { positive: false, negative: false, neutral: false }
                    })}
                    variant="outline"
                    className="w-full"
                  >
                    Reset Filters
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            {selectedLeads.length > 0 && (
              <Button variant="outline" size="sm" className="text-red-500">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </Button>
            )}
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search by name or email..." className="pl-8" />
          </div>
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Workflow Stage</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Engaged</TableHead>
                <TableHead>Sentiment</TableHead>
                <TableHead>Last Contact</TableHead>
                <TableHead />
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
                        <Link href={`/leads/${lead.id}`} className="font-medium hover:underline">
                          {lead.name}
                        </Link>
                        <span className="text-sm text-muted-foreground">{lead.email}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="flex flex-col gap-0.5">
                        <div className="h-2 w-24 rounded-full bg-purple-200">
                          <div 
                            className="h-full rounded-full bg-purple-500" 
                            style={{ width: `${lead.workflowStage}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{lead.company}</TableCell>
                  <TableCell>
                    <Badge 
                      variant="secondary"
                      className="bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
                    >
                      {lead.engaged ? "Engaged" : "Not Engaged"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant="outline"
                      className={
                        lead.sentiment === "positive" ? "border-none bg-emerald-100 text-emerald-800 hover:bg-emerald-100 dark:bg-emerald-900 dark:text-emerald-100 dark:hover:bg-emerald-900" :
                        lead.sentiment === "negative" ? "border-none bg-rose-100 text-rose-800 hover:bg-rose-100 dark:bg-rose-900 dark:text-rose-100 dark:hover:bg-rose-900" :
                        "border-none bg-gray-100 text-gray-800 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-800"
                      }
                    >
                      {lead.sentiment.charAt(0).toUpperCase() + lead.sentiment.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>{lead.lastContact}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Send Email</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-between space-x-2 py-4">
          <div className="flex-1 text-sm text-muted-foreground">
            Showing {filteredLeads.length} of {leads.length} leads
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">Previous</Button>
            <Button variant="outline" size="sm">Next</Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

