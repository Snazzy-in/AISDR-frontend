"use client"

import { useState } from "react"
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
import { Search, Download, Trash2, MoreHorizontal, Filter } from 'lucide-react'
import Link from "next/link"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Sidebar from "@/components/sidebar"
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
    workflowStage: "Not Started",
    engaged: false,
    lastContact: "28th May 2024 10:40 AM",
    avatar: "/avatars/01.png"
  },
  {
    id: "2",
    name: "Brian Kolb",
    email: "brian@rapidcanvas.ai",
    company: "RapidCanvas",
    workflowStage: "Not Started",
    engaged: false,
    lastContact: "11th Jun 2024 09:28 AM",
    avatar: "/avatars/02.png"
  },
  // Add more mock data here if needed
]

export default function LeadsPage() {
  const [selectedLeads, setSelectedLeads] = useState<string[]>([])

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-auto">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Leads (19651)</h2>
            <div className="flex items-center space-x-2">
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
                      <Label>Status</Label>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <Checkbox id="status-warm" />
                          <label htmlFor="status-warm" className="ml-2 text-sm">Warm</label>
                        </div>
                        <div className="flex items-center">
                          <Checkbox id="status-cold" />
                          <label htmlFor="status-cold" className="ml-2 text-sm">Cold</label>
                        </div>
                        <div className="flex items-center">
                          <Checkbox id="status-hot" />
                          <label htmlFor="status-hot" className="ml-2 text-sm">Hot</label>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Source</Label>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <Checkbox id="source-website" />
                          <label htmlFor="source-website" className="ml-2 text-sm">Website</label>
                        </div>
                        <div className="flex items-center">
                          <Checkbox id="source-linkedin" />
                          <label htmlFor="source-linkedin" className="ml-2 text-sm">LinkedIn</label>
                        </div>
                        <div className="flex items-center">
                          <Checkbox id="source-referral" />
                          <label htmlFor="source-referral" className="ml-2 text-sm">Referral</label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Button className="w-full">Apply Filters</Button>
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
                  <TableHead>Last Contact</TableHead>
                  <TableHead />
                </TableRow>
              </TableHeader>
              <TableBody>
                {leads.map((lead) => (
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
                            <div className="h-full w-1/3 rounded-full bg-purple-500" />
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{lead.company}</TableCell>
                    <TableCell>
                      <Badge variant={lead.engaged ? "default" : "secondary"}>
                        {lead.engaged ? "Engaged" : "Not Engaged"}
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
              Showing 10 of 19651 leads
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">Previous</Button>
              <Button variant="outline" size="sm">Next</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

