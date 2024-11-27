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
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, ArrowLeft, Upload, Filter } from "lucide-react"
import Link from "next/link"
import LeadsList from "@/components/leads-list"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu"

// Mock data (replace with actual data fetching)
const audienceData = {
  id: "1",
  name: "Enterprise Decision Makers",
  description: "VPs and C-level executives from Fortune 500 companies",
  leadCount: 2500,
  lastUpdated: "2024-03-15T10:00:00Z",
  leads: [] // Use the same lead structure as in your existing leads list
}

export default function AudienceDetail({ params }: { params: { id: string } }) {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")

  if (!audienceData) {
    notFound()
  }

  return (
    <DashboardLayout>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/audiences">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Link>
            </Button>
            <h2 className="text-3xl font-bold tracking-tight">{audienceData.name}</h2>
            <Badge variant="secondary" className="ml-2">
              {audienceData.leadCount.toLocaleString()} leads
            </Badge>
          </div>
          <div className="flex items-center space-x-2">
            <Button asChild>
              <Link href={`/audiences/${params.id}/import`}>
                <Upload className="mr-2 h-4 w-4" />
                Import Leads
              </Link>
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Audience Leads</CardTitle>
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
                  <DropdownMenuLabel>Lead Status</DropdownMenuLabel>
                  <DropdownMenuCheckboxItem 
                    checked={filterStatus === "all"}
                    onCheckedChange={() => setFilterStatus("all")}
                  >
                    All Statuses
                  </DropdownMenuCheckboxItem>
                  {/* Add more filter options */}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <LeadsList 
              leads={audienceData.leads}
              searchQuery={searchQuery}
              filterStatus={filterStatus}
            />
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
} 