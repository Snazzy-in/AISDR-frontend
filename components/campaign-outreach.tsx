"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Trash2, Pencil, Plus } from 'lucide-react'

interface CTAMessage {
  id: number
  content: string
}

interface PersonalizationSource {
  id: string
  title: string
  description: string
  icon: string
  enabled: boolean
}

export default function CampaignOutreach({ data, onUpdate }) {
  const [selectedLanguage, setSelectedLanguage] = useState("en-US")
  const [ctaMessages, setCTAMessages] = useState<CTAMessage[]>([
    {
      id: 1,
      content: "Is this a priority for you at the moment?"
    },
    {
      id: 2,
      content: "Are you free for a quick call next week? Feel free to book in at https://artisan.na.chilipiper.com/book/intro-meeting if easier :)"
    },
    {
      id: 3,
      content: "Feel free to book a slot on my cal if you'd like to chat: https://artisan.na.chilipiper.com/book/intro-meeting"
    }
  ])
  const [editingCTA, setEditingCTA] = useState<CTAMessage | null>(null)

  const voiceStyles = [
    {
      id: "direct",
      title: "Direct",
      description: "Straightforward and to the point.",
      icon: "🎯"
    },
    {
      id: "supportive",
      title: "Supportive",
      description: "Encouraging and helpful, offering assistance.",
      icon: "💝"
    },
    {
      id: "sincere",
      title: "Sincere",
      description: "Genuine and honest, building trust through authenticity.",
      icon: "🖤"
    },
    {
      id: "storytelling",
      title: "Storytelling",
      description: "Engaging and narrative, telling a compelling story.",
      icon: "📖"
    },
    {
      id: "challenging",
      title: "Challenging",
      description: "Provocative and bold, pushing the recipient to think differently.",
      icon: "💪"
    }
  ]

  const [personalizationSources, setPersonalizationSources] = useState<PersonalizationSource[]>([
    {
      id: "website",
      title: "Website Scrape",
      description: "Analyze the lead's website for achievements, product updates, and recent blog posts.",
      icon: "🌐",
      enabled: true
    },
    {
      id: "x-posts",
      title: "X Posts",
      description: "Highlight recent X (formerly Twitter) posts published by your prospects.",
      icon: "𝕏",
      enabled: true
    },
    {
      id: "linkedin",
      title: "LinkedIn Posts",
      description: "Feature recent LinkedIn updates shared by your prospects.",
      icon: "in",
      enabled: true
    },
    {
      id: "press",
      title: "Press Releases",
      description: "Mention notable press coverage about your prospects.",
      icon: "📰",
      enabled: true
    },
    {
      id: "funding",
      title: "Funding Announcements",
      description: "Compliment prospects on recent funding news, powered by Crunchbase data.",
      icon: "💰",
      enabled: true
    },
    {
      id: "school",
      title: "Mutual Previous School",
      description: "Mention that you attended the same university as your prospect.",
      icon: "🎓",
      enabled: true
    },
    {
      id: "job",
      title: "Mutual Previous Job",
      description: "Highlight that you worked at the same company as your prospect in the past.",
      icon: "💼",
      enabled: true
    }
  ])

  const handleAddCTA = () => {
    const newCTA = {
      id: Date.now(),
      content: ""
    }
    setEditingCTA(newCTA)
  }

  const handleEditCTA = (message: CTAMessage) => {
    setEditingCTA(message)
  }

  const handleDeleteCTA = (id: number) => {
    setCTAMessages(ctaMessages.filter(msg => msg.id !== id))
  }

  const handleSaveCTA = () => {
    if (editingCTA) {
      if (ctaMessages.find(msg => msg.id === editingCTA.id)) {
        setCTAMessages(ctaMessages.map(msg => msg.id === editingCTA.id ? editingCTA : msg))
      } else {
        setCTAMessages([...ctaMessages, editingCTA])
      }
      setEditingCTA(null)
    }
  }

  const handlePersonalizationSourceToggle = (id: string) => {
    setPersonalizationSources(sources => 
      sources.map(source => 
        source.id === id ? { ...source, enabled: !source.enabled } : source
      )
    )
  }

  return (
    <div className="space-y-8">
      {/* Campaign Language */}
      <div className="space-y-4">
        <Label className="text-base">Campaign Language</Label>
        <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
          <SelectTrigger className="w-[300px]">
            <SelectValue>
              <div className="flex items-center gap-2">
                🇺🇸 English (United States)
              </div>
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="en-US">
              <div className="flex items-center gap-2">
                🇺🇸 English (United States)
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Tone of Voice */}
      <div className="space-y-4">
        <Label className="text-base">Tone of Voice</Label>
        <Select value={data.toneOfVoice} onValueChange={(value) => onUpdate({ ...data, toneOfVoice: value })}>
          <SelectTrigger className="w-[300px]">
            <SelectValue placeholder="Select tone of voice" />
          </SelectTrigger>
          <SelectContent>
            {voiceStyles.map((style) => (
              <SelectItem key={style.id} value={style.id}>
                <div className="flex items-center">
                  <span className="mr-2">{style.icon}</span>
                  {style.title}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* CTA Messages */}
      <div className="space-y-4">
        <Label className="text-base">CTA Messages</Label>
        {ctaMessages.map((message) => (
          <div key={message.id} className="flex items-start gap-2 rounded-lg border p-4">
            <input
              type="checkbox"
              className="mt-1.5"
              checked
              onChange={() => {}}
            />
            <div className="flex-1">
              <p className="text-sm">{message.content}</p>
            </div>
            <Button variant="ghost" size="icon" onClick={() => handleEditCTA(message)}>
              <Pencil className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => handleDeleteCTA(message.id)}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
        {editingCTA && (
          <div className="flex items-start gap-2 rounded-lg border p-4">
            <Input
              value={editingCTA.content}
              onChange={(e) => setEditingCTA({ ...editingCTA, content: e.target.value })}
              placeholder="Enter CTA message"
            />
            <Button onClick={handleSaveCTA}>Save</Button>
          </div>
        )}
        <Button
          variant="outline"
          className="w-full"
          onClick={handleAddCTA}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add CTA
        </Button>
      </div>

      {/* Personalization Sources */}
      <div className="space-y-4">
        <Label className="text-base">Personalization Sources</Label>
        <p className="text-sm text-muted-foreground">
          Select which personalization sources you want Ava to use in your outbound emails. Ava will automatically choose the personalization most likely to generate a response from the lead.
        </p>
        <div className="space-y-4">
          {personalizationSources.map((source) => (
            <div key={source.id} className="flex items-start gap-4 p-4 rounded-lg border">
              <span className="text-xl mt-1">{source.icon}</span>
              <div className="flex-1">
                <h4 className="font-medium">{source.title}</h4>
                <p className="text-sm text-muted-foreground">{source.description}</p>
              </div>
              <Switch
                checked={source.enabled}
                onCheckedChange={() => handlePersonalizationSourceToggle(source.id)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

