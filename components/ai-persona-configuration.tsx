"use client"

import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Bot, Wand2 } from 'lucide-react'

export default function AIPersonaConfiguration({ campaignData, updateCampaignData }) {
  const handleChange = (field, value) => {
    updateCampaignData("aiPersona", { ...campaignData.aiPersona, [field]: value })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bot className="h-5 w-5" />
          Configure AI Persona
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <Tabs defaultValue="preset" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="preset">
              Preset Personas
            </TabsTrigger>
            <TabsTrigger value="custom">
              Custom Persona
            </TabsTrigger>
          </TabsList>

          <TabsContent value="preset" className="space-y-6">
            <div className="grid grid-cols-3 gap-4 mt-4">
              {[
                {
                  title: "Professional Expert",
                  description: "Formal and knowledgeable approach",
                  tone: "Professional",
                  style: "Authoritative",
                },
                {
                  title: "Friendly Consultant",
                  description: "Warm and approachable style",
                  tone: "Casual",
                  style: "Conversational",
                },
                {
                  title: "Strategic Partner",
                  description: "Solution-focused approach",
                  tone: "Business",
                  style: "Strategic",
                },
              ].map((persona, index) => (
                <Card
                  key={persona.title}
                  className={`cursor-pointer transition-all hover:border-primary ${
                    campaignData.aiPersona?.preset === persona.title ? "border-primary" : ""
                  }`}
                  onClick={() => handleChange("preset", persona.title)}
                >
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-2">
                      {persona.title}
                    </h3>
                    <p
                      className="text-sm text-muted-foreground mb-3"
                    >
                      {persona.description}
                    </p>
                    <div className="flex gap-2">
                      <Badge variant="secondary">
                        {persona.tone}
                      </Badge>
                      <Badge variant="secondary">
                        {persona.style}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="custom" className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Communication Style</Label>
                <Select
                  value={campaignData.aiPersona?.style}
                  onValueChange={(value) => handleChange("style", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select style" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="formal">
                      Formal
                    </SelectItem>
                    <SelectItem value="casual">
                      Casual
                    </SelectItem>
                    <SelectItem value="professional">
                      Professional
                    </SelectItem>
                    <SelectItem value="friendly">
                      Friendly
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Tone Characteristics</Label>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm">
                        Professional
                      </span>
                      <span className="text-sm">
                        Casual
                      </span>
                    </div>
                    <Slider
                      value={[campaignData.aiPersona?.professionalTone || 50]}
                      onValueChange={(value) =>
                        handleChange("professionalTone", value[0])
                      }
                      max={100}
                      step={1}
                    />
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm">
                        Direct
                      </span>
                      <span className="text-sm">
                        Consultative
                      </span>
                    </div>
                    <Slider
                      value={[campaignData.aiPersona?.directness || 50]}
                      onValueChange={(value) =>
                        handleChange("directness", value[0])
                      }
                      max={100}
                      step={1}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Industry Knowledge Level</Label>
                <Select
                  value={campaignData.aiPersona?.knowledgeLevel}
                  onValueChange={(value) =>
                    handleChange("knowledgeLevel", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue
                      placeholder="Select knowledge level"
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="expert">
                      Expert
                    </SelectItem>
                    <SelectItem value="intermediate">
                      Intermediate
                    </SelectItem>
                    <SelectItem value="basic">
                      Basic
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div
          className="flex items-center justify-between pt-6 border-t"
        >
          <Button variant="outline" className="gap-2">
            <Wand2 className="h-4 w-4" />
            Generate Sample Message
          </Button>
          <div className="space-x-4">
            <Button variant="outline">
              Back
            </Button>
            <Button>Continue</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

