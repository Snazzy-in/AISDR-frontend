"use client"

import Link from "next/link"
import { PlusCircle, Search, MoreHorizontal } from 'lucide-react'

import Sidebar from "@/components/sidebar"
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
import { StatusTag } from "@/components/status-tag"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const campaigns = [
  {
    id: "1",
    name: "Cold Outreach Q2",
    status: "Active",
    emailsSent: 1000,
    responses: 50,
    openRate: "25%",
    clickRate: "5%",
  },
  {
    id: "2",
    name: "Follow-up Campaign",
    status: "Draft",
    emailsSent: 0,
    responses: 0,
    openRate: "0%",
    clickRate: "0%",
  },
  {
    id: "3",
    name: "Product Launch",
    status: "Sent",
    emailsSent: 5000,
    responses: 250,
    openRate: "30%",
    clickRate: "8%",
  },
]

export default function CampaignsPage() {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        <div className="p-6 space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">Campaigns</h1>
            <Button asChild>
              <Link href="/campaigns/create">
                <PlusCircle className="mr-2 h-4 w-4" /> Create Campaign
              </Link>
            </Button>
          </div>
          <div className="flex justify-between items-center">
            <div className="relative w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search campaigns" className="pl-8" />
            </div>
            <Button variant="outline">Filter</Button>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Campaign Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Emails Sent</TableHead>
                <TableHead>Responses</TableHead>
                <TableHead>Open Rate</TableHead>
                <TableHead>Click Rate</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {campaigns.map((campaign) => (
                <TableRow key={campaign.id}>
                  <TableCell className="font-medium">
                    <Link href={`/campaigns/${campaign.id}`} className="hover:underline">
                      {campaign.name}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <StatusTag status={campaign.status} />
                  </TableCell>
                  <TableCell>{campaign.emailsSent}</TableCell>
                  <TableCell>{campaign.responses}</TableCell>
                  <TableCell>{campaign.openRate}</TableCell>
                  <TableCell>{campaign.clickRate}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => navigator.clipboard.writeText(campaign.name)}>
                          Copy campaign name
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <Link href={`/campaigns/${campaign.id}`}>View details</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>Edit campaign</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </main>
    </div>
  )
}

