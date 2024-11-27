"use client"

import { useState } from "react"
import DashboardLayout from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search, Plus, Users, MoreHorizontal } from "lucide-react"
import Link from "next/link"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Mock data (replace with actual data fetching)
const audiences = [
  {
    id: "1",
    name: "Enterprise Decision Makers",
    description: "VPs and C-level executives from Fortune 500 companies",
    leadCount: 2500,
    lastUpdated: "2024-03-15T10:00:00Z",
  },
  {
    id: "2",
    name: "Tech Startups",
    description: "Founders and CTOs from seed to Series B startups",
    leadCount: 1200,
    lastUpdated: "2024-03-14T15:30:00Z",
  },
  // Add more mock audiences...
]

export default function AudiencesPage() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <DashboardLayout>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Audiences</h2>
          <Button asChild>
            <Link href="/audiences/create">
              <Plus className="mr-2 h-4 w-4" />
              Create Audience
            </Link>
          </Button>
        </div>

        <div className="flex items-center gap-4 mb-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search audiences..." 
                className="pl-8" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {audiences
            .filter(audience => 
              audience.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              audience.description.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map((audience) => (
              <Card key={audience.id}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-lg font-medium">
                    <Link 
                      href={`/audiences/${audience.id}`}
                      className="hover:underline"
                    >
                      {audience.name}
                    </Link>
                  </CardTitle>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Link href={`/audiences/${audience.id}/import`}>
                          Import Leads
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>Edit Audience</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        Delete Audience
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-4">
                    {audience.description}
                  </CardDescription>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <Users className="mr-1 h-4 w-4" />
                      {audience.leadCount.toLocaleString()} leads
                    </div>
                    <div>
                      Updated {new Date(audience.lastUpdated).toLocaleDateString()}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
        </div>
      </div>
    </DashboardLayout>
  )
} 