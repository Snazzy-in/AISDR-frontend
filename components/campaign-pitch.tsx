"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Trash2 } from 'lucide-react'

export default function CampaignPitch({ data, onUpdate }) {
  const [features, setFeatures] = useState([
    { painPoint: "You would normally need 10s of SaaS subscriptions to do cold outbound.", solution: "Artisan consolidates every tool you need for outbound - from 300M B2B contacts to a sequence builder." },
    { painPoint: "Human BDRs are expensive and the work they do is repetitive.", solution: "Our AI BDR costs less than 10% of what a human would and gets more work done." },
  ])
  const [proofPoints, setProofPoints] = useState([
    "We are backed by top VCs including Y Combinator and HubSpot.",
    "100s of companies have hired Ava to automate their outbound.",
  ])

  const addFeature = () => {
    setFeatures([...features, { painPoint: "", solution: "" }])
  }

  const updateFeature = (index, field, value) => {
    const updatedFeatures = [...features]
    updatedFeatures[index][field] = value
    setFeatures(updatedFeatures)
    onUpdate({ features: updatedFeatures })
  }

  const removeFeature = (index) => {
    const updatedFeatures = features.filter((_, i) => i !== index)
    setFeatures(updatedFeatures)
    onUpdate({ features: updatedFeatures })
  }

  const addProofPoint = () => {
    setProofPoints([...proofPoints, ""])
  }

  const updateProofPoint = (index, value) => {
    const updatedProofPoints = [...proofPoints]
    updatedProofPoints[index] = value
    setProofPoints(updatedProofPoints)
    onUpdate({ proofPoints: updatedProofPoints })
  }

  const removeProofPoint = (index) => {
    const updatedProofPoints = proofPoints.filter((_, i) => i !== index)
    setProofPoints(updatedProofPoints)
    onUpdate({ proofPoints: updatedProofPoints })
  }

  const [coachingPoints, setCoachingPoints] = useState([
    "Focus on the pain points our AI solves",
    "Highlight the time and cost savings",
  ])

  const addCoachingPoint = () => {
    setCoachingPoints([...coachingPoints, ""])
  }

  const updateCoachingPoint = (index, value) => {
    const updatedCoachingPoints = [...coachingPoints]
    updatedCoachingPoints[index] = value
    setCoachingPoints(updatedCoachingPoints)
    onUpdate({ coachingPoints: updatedCoachingPoints })
  }

  const removeCoachingPoint = (index) => {
    const updatedCoachingPoints = coachingPoints.filter((_, i) => i !== index)
    setCoachingPoints(updatedCoachingPoints)
    onUpdate({ coachingPoints: updatedCoachingPoints })
  }

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <Label htmlFor="url" className="text-base">URL Explaining Offering</Label>
        <Input id="url" placeholder="https://example.com" defaultValue="https://artisan.co" />
      </div>

      <div className="space-y-4">
        <Label htmlFor="description" className="text-base">One Sentence Offering Description</Label>
        <Input 
          id="description" 
          placeholder="Describe your offering in one sentence"
          defaultValue="We have created Ava, an AI BDR that automates the entire outbound email process."
        />
      </div>

      <div className="space-y-4">
        <Label className="text-base">Features</Label>
        {features.map((feature, index) => (
          <Card key={index}>
            <CardContent className="p-4 space-y-4">
              <div className="space-y-2">
                <Label htmlFor={`painPoint-${index}`}>Pain Point</Label>
                <Input
                  id={`painPoint-${index}`}
                  value={feature.painPoint}
                  onChange={(e) => updateFeature(index, "painPoint", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`solution-${index}`}>Solution</Label>
                <Input
                  id={`solution-${index}`}
                  value={feature.solution}
                  onChange={(e) => updateFeature(index, "solution", e.target.value)}
                />
              </div>
              <Button variant="destructive" size="sm" onClick={() => removeFeature(index)}>
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </Button>
            </CardContent>
          </Card>
        ))}
        <Button onClick={addFeature}>
          <Plus className="h-4 w-4 mr-2" />
          Add Feature
        </Button>
      </div>

      <div className="space-y-4">
        <Label className="text-base">Proof Points</Label>
        {proofPoints.map((point, index) => (
          <div key={index} className="flex items-center gap-2">
            <Input
              value={point}
              onChange={(e) => updateProofPoint(index, e.target.value)}
            />
            <Button variant="destructive" size="icon" onClick={() => removeProofPoint(index)}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
        <Button onClick={addProofPoint}>
          <Plus className="h-4 w-4 mr-2" />
          Add Proof Point
        </Button>
      </div>

      <div className="space-y-4">
        <Label className="text-base">Coaching Points</Label>
        {coachingPoints.map((point, index) => (
          <div key={index} className="flex items-center gap-2">
            <Input
              value={point}
              onChange={(e) => updateCoachingPoint(index, e.target.value)}
            />
            <Button variant="destructive" size="icon" onClick={() => removeCoachingPoint(index)}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
        <Button onClick={addCoachingPoint}>
          <Plus className="h-4 w-4 mr-2" />
          Add Coaching Point
        </Button>
      </div>
    </div>
  )
}

