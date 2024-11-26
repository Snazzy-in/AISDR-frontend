"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, Linkedin, MapPin, Building, Globe, Send, Plus } from 'lucide-react'

// Mock data for demonstration
const leadData = {
  id: "1",
  name: "John Doe",
  jobTitle: "CEO",
  company: "Acme Inc.",
  email: "john@example.com",
  phone: "+1 (555) 123-4567",
  linkedIn: "https://www.linkedin.com/in/johndoe",
  location: "San Francisco, CA",
  tags: ["High Priority", "Follow Up"],
  profilePicture: "/placeholder-avatar.jpg",
  companyInfo: {
    name: "Acme Inc.",
    industry: "Technology",
    revenue: "$10M - $50M",
    employees: "50-200",
    website: "https://www.acmeinc.com",
  },
  recentNews: [
    { title: "Acme Inc. Launches New Product", date: "2023-06-15" },
    { title: "Acme Inc. Expands to Europe", date: "2023-05-22" },
  ],
  linkedInPosts: [
    { content: "Excited to announce our new product launch!", date: "2023-06-16" },
    { content: "Just returned from an amazing tech conference. So many great insights!", date: "2023-06-10" },
  ],
  jobHistory: [
    { title: "CTO", company: "Tech Innovators", duration: "2015-2020" },
    { title: "Senior Developer", company: "CodeCraft", duration: "2010-2015" },
  ],
  education: [
    { school: "Stanford University", degree: "MS in Computer Science", year: "2010" },
    { school: "MIT", degree: "BS in Computer Science", year: "2008" },
  ],
  engagementHistory: [
    { type: "Email", content: "Followed up on product demo", date: "2023-06-18" },
    { type: "Call", content: "Introductory call", date: "2023-06-10" },
    { type: "Meeting", content: "Product demonstration", date: "2023-06-05" },
  ],
}

export default function LeadProfile({ id }: { id: string }) {
  const [note, setNote] = useState("")

  const handleAddNote = () => {
    // Logic to add note
    console.log("Adding note:", note)
    setNote("")
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <div className="flex items-start space-x-4">
            <Avatar className="h-20 w-20">
              
<AvatarImage src={leadData.profilePicture} alt={leadData.name} />
              <AvatarFallback>{leadData.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <h2 className="text-2xl font-bold">{leadData.name}</h2>
              <p className="text-muted-foreground">{leadData.jobTitle} at {leadData.company}</p>
              <div className="flex space-x-2">
                {leadData.tags.map(tag => (
                  <Badge key={tag} variant="secondary">{tag}</Badge>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-6 flex space-x-4">
            <Button>
              <Mail className="mr-2 h-4 w-4" />
              Email
            </Button>
            <Button variant="outline">Add to Campaign</Button>
            <Button variant="outline">Edit Profile</Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>{leadData.email}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>{leadData.phone}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Linkedin className="h-4 w-4 text-muted-foreground" />
                <a href={leadData.linkedIn} className="text-blue-500 hover:underline">{leadData.linkedIn}</a>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>{leadData.location}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Company Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Building className="h-4 w-4 text-muted-foreground" />
                <span>{leadData.companyInfo.name}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Globe className="h-4 w-4 text-muted-foreground" />
                <a href={leadData.companyInfo.website} className="text-blue-500 hover:underline">{leadData.companyInfo.website}</a>
              </div>
              <p>Industry: {leadData.companyInfo.industry}</p>
              <p>Revenue: {leadData.companyInfo.revenue}</p>
              <p>Employees: {leadData.companyInfo.employees}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Professional Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="news">
            <TabsList>
              <TabsTrigger value="news">Recent News</TabsTrigger>
              <TabsTrigger value="posts">LinkedIn Posts</TabsTrigger>
              <TabsTrigger value="history">Job History</TabsTrigger>
              <TabsTrigger value="education">Education</TabsTrigger>
            </TabsList>
            <TabsContent value="news">
              <ul className="list-disc pl-4 space-y-2">
                {leadData.recentNews.map((news, index) => (
                  <li key={index}>{news.title} - {news.date}</li>
                ))}
              </ul>
            </TabsContent>
            <TabsContent value="posts">
              <ul className="space-y-4">
                {leadData.linkedInPosts.map((post, index) => (
                  <li key={index} className="border-b pb-2">
                    <p>{post.content}</p>
                    <span className="text-sm text-muted-foreground">{post.date}</span>
                  </li>
                ))}
              </ul>
            </TabsContent>
            <TabsContent value="history">
              <ul className="space-y-2">
                {leadData.jobHistory.map((job, index) => (
                  <li key={index}>
                    <strong>{job.title}</strong> at {job.company}, {job.duration}
                  </li>
                ))}
              </ul>
            </TabsContent>
            <TabsContent value="education">
              <ul className="space-y-2">
                {leadData.education.map((edu, index) => (
                  <li key={index}>
                    <strong>{edu.degree}</strong> from {edu.school}, {edu.year}
                  </li>
                ))}
              </ul>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Engagement History</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {leadData.engagementHistory.map((engagement, index) => (
              <li key={index} className="flex items-start space-x-2 border-b pb-2">
                <Badge>{engagement.type}</Badge>
                <div>
                  <p>{engagement.content}</p>
                  <span className="text-sm text-muted-foreground">{engagement.date}</span>
                </div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Notes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Textarea
              placeholder="Add a note..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
            <Button onClick={handleAddNote}>
              <Plus className="mr-2 h-4 w-4" />
              Add Note
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

