"use client"

import React from "react"
import { Product, Feature } from "../../app/types"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Plus, Trash2, Lightbulb, Upload, FileText, AlertCircle } from 'lucide-react'
import { Alert, AlertDescription } from "@/components/ui/alert"

interface ProductProfileProps {
  data: Product
  onUpdate: (data: Partial<Product>) => void
}

export default function ProductProfile({ data, onUpdate }: ProductProfileProps) {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <Label htmlFor="name" className="text-base">Product Name</Label>
        <Input
          id="name"
          value={data.name}
          onChange={(e) => onUpdate({ name: e.target.value })}
          placeholder="Enter product name"
        />
      </div>

      <div className="space-y-4">
        <Label htmlFor="url" className="text-base">Product Website</Label>
        <Input 
          id="url" 
          value={data.url}
          onChange={(e) => onUpdate({ url: e.target.value })}
          placeholder="https://example.com" 
        />
        <p className="text-sm text-gray-500">
          RocketSDR will use your product website as the primary source to answer prospect questions.
        </p>
      </div>

      <div className="space-y-4">
        <Label htmlFor="description" className="text-base">One Sentence Offering Description</Label>
        <Input 
          id="description"
          value={data.description}
          onChange={(e) => onUpdate({ description: e.target.value })}
          placeholder="Describe your offering in one sentence"
        />
      </div>

      <div className="space-y-4">
        <Label className="text-base">Additional Documentation</Label>
        <Alert>
          <FileText className="h-4 w-4" />
          <AlertDescription>
            Upload any additional product documentation to enhance RocketSDR's knowledge of your product.
          </AlertDescription>
        </Alert>
        <div className="space-y-4">
          {data.documents?.map((doc, index) => (
            <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-gray-500" />
                <span className="text-sm">{doc.name}</span>
              </div>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => {
                  const updatedDocs = data.documents?.filter((_, i) => i !== index)
                  onUpdate({ documents: updatedDocs })
                }}
              >
                <Trash2 className="h-4 w-4 text-gray-500 hover:text-red-500" />
              </Button>
            </div>
          ))}
          <div className="flex justify-center">
            <Button 
              variant="outline" 
              onClick={() => {
                // Implement file upload logic
                const input = document.createElement('input')
                input.type = 'file'
                input.accept = '.pdf,.doc,.docx'
                input.onchange = (e) => {
                  const file = (e.target as HTMLInputElement).files?.[0]
                  if (file) {
                    const newDoc = {
                      name: file.name,
                      url: URL.createObjectURL(file)
                    }
                    onUpdate({ 
                      documents: [...(data.documents || []), newDoc]
                    })
                  }
                }
                input.click()
              }}
              className="w-full"
            >
              <Upload className="h-4 w-4 mr-2" />
              Upload Documentation
            </Button>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <Label className="text-base">Features</Label>
        {data.features.map((feature, index) => (
          <Card key={index}>
            <CardContent className="p-4 space-y-4">
              <div className="space-y-2">
                <Label htmlFor={`painPoint-${index}`}>Pain Point</Label>
                <Input
                  id={`painPoint-${index}`}
                  value={feature.painPoint}
                  onChange={(e) => {
                    const updatedFeatures = [...data.features]
                    updatedFeatures[index] = { ...feature, painPoint: e.target.value }
                    onUpdate({ features: updatedFeatures })
                  }}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`solution-${index}`}>Solution</Label>
                <Input
                  id={`solution-${index}`}
                  value={feature.solution}
                  onChange={(e) => {
                    const updatedFeatures = [...data.features]
                    updatedFeatures[index] = { ...feature, solution: e.target.value }
                    onUpdate({ features: updatedFeatures })
                  }}
                />
              </div>
              <Button variant="destructive" size="sm" onClick={() => {
                const updatedFeatures = data.features.filter((_, i) => i !== index)
                onUpdate({ features: updatedFeatures })
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
              features: [...data.features, { painPoint: "", solution: "" }]
            })
          }}>
            <Plus className="h-4 w-4 mr-2" />
            Add Feature
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        <Label className="text-base">Proof Points</Label>
        {data.proofPoints.map((point, index) => (
          <div key={index} className="flex gap-2">
            <Input
              value={point}
              onChange={(e) => onUpdate({ proofPoints: data.proofPoints.map((p, i) => i === index ? e.target.value : p) })}
              className="flex-1"
            />
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => onUpdate({ proofPoints: data.proofPoints.filter((_, i) => i !== index) })}
              className="h-10 w-10 p-0"
            >
              <Trash2 className="h-4 w-4 text-gray-500 hover:text-red-500" />
            </Button>
          </div>
        ))}
        <div className="mt-4">
          <Button onClick={() => {
            onUpdate({ 
              proofPoints: [...data.proofPoints, ""]
            })
          }}>
            <Plus className="h-4 w-4 mr-2" />
            Add Proof Point
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        <Label className="text-base">Coaching Points</Label>
        {data.coachingPoints.map((point, index) => (
          <div key={index} className="flex gap-2">
            <Input
              value={point}
              onChange={(e) => onUpdate({ coachingPoints: data.coachingPoints.map((p, i) => i === index ? e.target.value : p) })}
              className="flex-1"
            />
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => onUpdate({ coachingPoints: data.coachingPoints.filter((_, i) => i !== index) })}
              className="h-10 w-10 p-0"
            >
              <Trash2 className="h-4 w-4 text-gray-500 hover:text-red-500" />
            </Button>
          </div>
        ))}
        <div className="mt-4">
          <Button onClick={() => {
            onUpdate({ 
              coachingPoints: [...data.coachingPoints, ""]
            })
          }}>
            <Plus className="h-4 w-4 mr-2" />
            Add Coaching Point
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
            Product insights are generated in RocketLab training. Head over to the RocketLab section to train your AI and generate insights.
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