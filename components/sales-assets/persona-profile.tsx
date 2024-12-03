"use client"

import React from "react"
import { Persona, Trait } from "../../app/types"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Plus, Trash2, Lightbulb, AlertCircle } from 'lucide-react'
import { Alert, AlertDescription } from "@/components/ui/alert"

interface PersonaProfileProps {
  data: Persona
  onUpdate: (data: Partial<Persona>) => void
}

export default function PersonaProfile({ data, onUpdate }: PersonaProfileProps) {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <Label htmlFor="name" className="text-base">Persona Name</Label>
        <Input
          id="name"
          value={data.name}
          onChange={(e) => onUpdate({ name: e.target.value })}
          placeholder="Enter persona name"
        />
      </div>

      <div className="space-y-4">
        <Label htmlFor="description" className="text-base">Persona Description</Label>
        <Textarea
          id="description"
          value={data.description}
          onChange={(e) => onUpdate({ description: e.target.value })}
          placeholder="Describe this AI SDR's personality and approach"
          className="min-h-[100px]"
        />
      </div>

      <div className="space-y-4">
        <Label className="text-base">Personality Traits & Examples</Label>
        {data.traits.map((trait, index) => (
          <Card key={index}>
            <CardContent className="p-4 space-y-4">
              <div className="space-y-2">
                <Label htmlFor={`trait-${index}`}>Trait</Label>
                <Input
                  id={`trait-${index}`}
                  value={trait.trait}
                  onChange={(e) => {
                    const updatedTraits = [...data.traits]
                    updatedTraits[index] = { ...trait, trait: e.target.value }
                    onUpdate({ traits: updatedTraits })
                  }}
                  placeholder="e.g., Professional and courteous"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`example-${index}`}>Example Message</Label>
                <Textarea
                  id={`example-${index}`}
                  value={trait.example}
                  onChange={(e) => {
                    const updatedTraits = [...data.traits]
                    updatedTraits[index] = { ...trait, example: e.target.value }
                    onUpdate({ traits: updatedTraits })
                  }}
                  placeholder="Provide an example message showing this trait"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`context-${index}`}>Context</Label>
                <Input
                  id={`context-${index}`}
                  value={trait.context}
                  onChange={(e) => {
                    const updatedTraits = [...data.traits]
                    updatedTraits[index] = { ...trait, context: e.target.value }
                    onUpdate({ traits: updatedTraits })
                  }}
                  placeholder="When is this trait most relevant?"
                />
              </div>
              <Button variant="destructive" size="sm" onClick={() => {
                const updatedTraits = data.traits.filter((_, i) => i !== index)
                onUpdate({ traits: updatedTraits })
              }}>
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </Button>
            </CardContent>
          </Card>
        ))}
        <div className="mt-4">
          <Button onClick={() => {
            onUpdate({ 
              traits: [...data.traits, { trait: "", example: "", context: "" }]
            })
          }}>
            <Plus className="h-4 w-4 mr-2" />
            Add Trait
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        <Label className="text-base">Voice & Tone Guidelines</Label>
        {data.voiceTone.map((tone, index) => (
          <div key={index} className="flex gap-2">
            <Input
              value={tone}
              onChange={(e) => onUpdate({ voiceTone: data.voiceTone.map((t, i) => i === index ? e.target.value : t) })}
              className="flex-1"
              placeholder="Add a voice & tone guideline"
            />
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => onUpdate({ voiceTone: data.voiceTone.filter((_, i) => i !== index) })}
              className="h-10 w-10 p-0"
            >
              <Trash2 className="h-4 w-4 text-gray-500 hover:text-red-500" />
            </Button>
          </div>
        ))}
        <div className="mt-4">
          <Button onClick={() => {
            onUpdate({ 
              voiceTone: [...data.voiceTone, ""]
            })
          }}>
            <Plus className="h-4 w-4 mr-2" />
            Add Guideline
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Label className="text-base flex items-center gap-2">
            AI-Generated Insights
            <Lightbulb className="h-4 w-4 text-yellow-500" />
          </Label>
        </div>
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Persona insights are generated in RocketLab training. Head over to the RocketLab section to train your AI and generate insights.
          </AlertDescription>
        </Alert>
        {data.insights.length > 0 && (
          <div className="space-y-2">
            {data.insights.map((insight, index) => (
              <div key={index} className="p-3 bg-gray-50 rounded-lg text-sm flex justify-between items-start">
                <span>{insight}</span>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => onUpdate({ 
                    insights: data.insights.filter((_, i) => i !== index)
                  })}
                  className="h-8 w-8 p-0"
                >
                  <Trash2 className="h-4 w-4 text-gray-500 hover:text-red-500" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
} 