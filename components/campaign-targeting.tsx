"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Globe, Building2, Upload, Plus, X } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const countryFlags = {
  "United States": "🇺🇸",
  "Canada": "🇨🇦",
  "United Kingdom": "🇬🇧",
  "Australia": "🇦🇺",
  // Add more countries and their flags as needed
}

export default function CampaignTargeting({ data, onUpdate }) {
  const [selectedLocations, setSelectedLocations] = useState([
    "United States",
    "Canada",
    "United Kingdom",
    "Australia",
  ])
  const [jobTitles, setJobTitles] = useState([
    "VP of Sales",
    "BDR Leader",
    "SDR Leader",
    "SDR Manager",
    "BDR Manager",
    "Chief Revenue Officer",
    "CRO",
    "VP Sales",
  ])
  const [newLocation, setNewLocation] = useState("")
  const [newJobTitle, setNewJobTitle] = useState("")
  const [keywords, setKeywords] = useState([])
  const [newKeyword, setNewKeyword] = useState("")
  const [dataType, setDataType] = useState("b2b")

  const handleLocationAdd = () => {
    if (newLocation && !selectedLocations.includes(newLocation)) {
      setSelectedLocations([...selectedLocations, newLocation])
      setNewLocation("")
    }
  }

  const handleLocationRemove = (location: string) => {
    setSelectedLocations(selectedLocations.filter((l) => l !== location))
  }

  const handleJobTitleAdd = () => {
    if (newJobTitle && !jobTitles.includes(newJobTitle)) {
      setJobTitles([...jobTitles, newJobTitle])
      setNewJobTitle("")
    }
  }

  const handleJobTitleRemove = (title: string) => {
    setJobTitles(jobTitles.filter((t) => t !== title))
  }

  const handleKeywordAdd = () => {
    if (newKeyword && !keywords.includes(newKeyword)) {
      setKeywords([...keywords, newKeyword])
      setNewKeyword("")
    }
  }

  const handleKeywordRemove = (keyword: string) => {
    setKeywords(keywords.filter((k) => k !== keyword))
  }

  const handleFileUpload = (event) => {
    // Handle file upload logic here
  }

  const handleImportCSV = () => {
    // Handle CSV import logic here
  }

  return (
    <div className="space-y-6">
      {/* Data Type Selection */}
      <div className="space-y-4">
        <Label className="text-base">Select Data Type</Label>
        <Select defaultValue="b2b" onValueChange={(value) => setDataType(value)}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="b2b" className="flex items-start">
              <div className="flex items-center gap-2">
                <Building2 className="h-4 w-4" />
                <div className="text-left">
                  <p className="font-medium">B2B</p>
                  <p className="text-sm text-muted-foreground">
                    Search from a database of over 100M verified contacts
                  </p>
                </div>
              </div>
            </SelectItem>
            <SelectItem value="ecommerce" className="flex items-start">
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4" />
                <div className="text-left">
                  <p className="font-medium">E-Commerce</p>
                  <p className="text-sm text-muted-foreground">
                    Search leads from 12M stores across 300 platforms
                  </p>
                </div>
              </div>
            </SelectItem>
            <SelectItem value="csv" className="flex items-start">
              <div className="flex items-center gap-2">
                <Upload className="h-4 w-4" />
                <div className="text-left">
                  <p className="font-medium">CSV Upload</p>
                  <p className="text-sm text-muted-foreground">
                    Upload your own list of contacts
                  </p>
                </div>
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      {dataType === 'csv' ? (
        <div className="space-y-4">
          <Label className="text-base">Import CSV</Label>
          <Input type="file" accept=".csv" onChange={handleFileUpload} />
          <Button onClick={handleImportCSV}>Import CSV</Button>
        </div>
      ) : (
        <>
          {/* Locations */}
          <div className="space-y-4">
            <Label className="text-base">Locations</Label>
            <div className="flex flex-wrap gap-2">
              {selectedLocations.map((location) => (
                <Badge
                  key={location}
                  variant="secondary"
                  className="flex items-center gap-1"
                >
                  {countryFlags[location]} {location}
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => handleLocationRemove(location)}
                  />
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                placeholder="Add location"
                value={newLocation}
                onChange={(e) => setNewLocation(e.target.value)}
              />
              <Button onClick={handleLocationAdd}>Add</Button>
            </div>
          </div>

          {/* Job Titles */}
          <div className="space-y-4">
            <Label className="text-base">Job Titles</Label>
            <div className="flex flex-wrap gap-2">
              {jobTitles.map((title) => (
                <Badge
                  key={title}
                  variant="secondary"
                  className="flex items-center gap-1"
                >
                  {title}
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => handleJobTitleRemove(title)}
                  />
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                placeholder="Add job title"
                value={newJobTitle}
                onChange={(e) => setNewJobTitle(e.target.value)}
              />
              <Button onClick={handleJobTitleAdd}>Add</Button>
            </div>
          </div>

          {/* Employee Range */}
          <div className="space-y-4">
            <Label className="text-base">Number Of Employees</Label>
            <div className="flex items-center gap-4">
              <Input
                type="number"
                placeholder="Min"
                className="w-32"
                defaultValue={5}
              />
              <span>—</span>
              <Input
                type="number"
                placeholder="Max"
                className="w-32"
                defaultValue={100000}
              />
            </div>
          </div>

          {/* Keywords */}
          <div className="space-y-4">
            <Label className="text-base">Outbound Keywords</Label>
            <div className="flex flex-wrap gap-2">
              {keywords.map((keyword) => (
                <Badge
                  key={keyword}
                  variant="secondary"
                  className="flex items-center gap-1"
                >
                  {keyword}
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => handleKeywordRemove(keyword)}
                  />
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                placeholder="Add keyword"
                value={newKeyword}
                onChange={(e) => setNewKeyword(e.target.value)}
              />
              <Button onClick={handleKeywordAdd}>Add</Button>
            </div>
          </div>
        </>
      )}

      {/* Preview */}
      <Card className="mt-8">
        <CardContent className="p-6">
          <Tabs defaultValue="leads">
            <TabsList>
              <TabsTrigger value="leads">Preview Leads</TabsTrigger>
              <TabsTrigger value="domains">Preview Domains</TabsTrigger>
            </TabsList>
            <TabsContent value="leads" className="mt-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Leads</span>
                  <span className="text-sm text-purple-600">36,255</span>
                </div>
                <div className="space-y-2">
                  {[...Array(5)].map((_, index) => (
                    <div key={index} className="flex items-center space-x-4">
                      <Avatar>
                        <AvatarImage src={`https://i.pravatar.cc/150?img=${index + 1}`} />
                        <AvatarFallback>LD</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">John Doe</p>
                        <p className="text-xs text-muted-foreground">VP of Sales at Acme Inc.</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
            <TabsContent value="domains" className="mt-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Domains</span>
                  <span className="text-sm text-purple-600">12,438</span>
                </div>
                {/* Sample domains list would go here */}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

