"use client"

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Clock, BrainCircuit, MessageSquare } from 'lucide-react'
import { Slider } from "@/components/ui/slider"

interface SequenceStep {
  waitDays: number
  requiresReply: boolean
  condition: 'no_reply' | 'negative_reply' | 'interested' | 'none'
}

interface ResponseConfig {
  style: 'professional' | 'casual' | 'friendly'
  maxWords: number
  responseTime: number
  workingHours: {
    start: number
    end: number
  }
}

export default function CampaignWorkflow({ data, onUpdate }) {
  const [sequence, setSequence] = useState({
    maxAttempts: 3,
    minDaysBetween: 2,
    maxDaysBetween: 5,
    stopOnReply: true,
    stopOnMeeting: true,
    stopOnUnsubscribe: true
  })

  const [responseConfig, setResponseConfig] = useState<ResponseConfig>({
    style: 'professional',
    maxWords: 150,
    responseTime: 4,
    workingHours: {
      start: 9,
      end: 17
    }
  })

  const [aiRules, setAIRules] = useState({
    matchProspectTone: true,
    detectLanguage: true,
    handleObjections: true,
    escalationTriggers: ['pricing', 'legal', 'enterprise', 'negative'],
    useCompanyContext: true
  })

  return (
    <div className="space-y-8">
      {/* Sequence Rules */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Clock className="h-5 w-5 mr-2" />
            Sequence Rules
          </CardTitle>
          <CardDescription>Configure how the AI should sequence the outreach</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Maximum Attempts</Label>
              <Input
                type="number"
                min={1}
                max={10}
                value={sequence.maxAttempts}
                onChange={(e) => setSequence(prev => ({
                  ...prev,
                  maxAttempts: parseInt(e.target.value)
                }))}
              />
            </div>
            <div className="space-y-2">
              <Label>Minimum Days Between Attempts</Label>
              <Input
                type="number"
                min={1}
                max={30}
                value={sequence.minDaysBetween}
                onChange={(e) => setSequence(prev => ({
                  ...prev,
                  minDaysBetween: parseInt(e.target.value)
                }))}
              />
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex items-center space-x-2">
              <Switch
                checked={sequence.stopOnReply}
                onCheckedChange={(checked) => setSequence(prev => ({
                  ...prev,
                  stopOnReply: checked
                }))}
              />
              <Label>Stop Sequence on Any Reply</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                checked={sequence.stopOnMeeting}
                onCheckedChange={(checked) => setSequence(prev => ({
                  ...prev,
                  stopOnMeeting: checked
                }))}
              />
              <Label>Stop Sequence on Meeting Booked</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                checked={sequence.stopOnUnsubscribe}
                onCheckedChange={(checked) => setSequence(prev => ({
                  ...prev,
                  stopOnUnsubscribe: checked
                }))}
              />
              <Label>Stop Sequence on Unsubscribe Request</Label>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Response Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <MessageSquare className="h-5 w-5 mr-2" />
            Response Configuration
          </CardTitle>
          <CardDescription>Configure how the AI should handle responses</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label>Response Style</Label>
            <Select
              value={responseConfig.style}
              onValueChange={(value: ResponseConfig['style']) => setResponseConfig(prev => ({
                ...prev,
                style: value
              }))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="professional">Professional</SelectItem>
                <SelectItem value="casual">Casual</SelectItem>
                <SelectItem value="friendly">Friendly</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Maximum Response Length (words)</Label>
            <Slider
              value={[responseConfig.maxWords]}
              onValueChange={([value]) => setResponseConfig(prev => ({
                ...prev,
                maxWords: value
              }))}
              min={50}
              max={300}
              step={10}
            />
            <p className="text-sm text-muted-foreground">{responseConfig.maxWords} words</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Working Hours Start</Label>
              <Input
                type="number"
                min={0}
                max={23}
                value={responseConfig.workingHours.start}
                onChange={(e) => setResponseConfig(prev => ({
                  ...prev,
                  workingHours: { ...prev.workingHours, start: parseInt(e.target.value) }
                }))}
              />
            </div>
            <div className="space-y-2">
              <Label>Working Hours End</Label>
              <Input
                type="number"
                min={0}
                max={23}
                value={responseConfig.workingHours.end}
                onChange={(e) => setResponseConfig(prev => ({
                  ...prev,
                  workingHours: { ...prev.workingHours, end: parseInt(e.target.value) }
                }))}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* AI Rules */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <BrainCircuit className="h-5 w-5 mr-2" />
            AI Behavior Rules
          </CardTitle>
          <CardDescription>Configure AI response behavior</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col gap-4">
            <div className="flex items-center space-x-2">
              <Switch
                checked={aiRules.matchProspectTone}
                onCheckedChange={(checked) => setAIRules(prev => ({
                  ...prev,
                  matchProspectTone: checked
                }))}
              />
              <Label>Match Prospect's Communication Style</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                checked={aiRules.detectLanguage}
                onCheckedChange={(checked) => setAIRules(prev => ({
                  ...prev,
                  detectLanguage: checked
                }))}
              />
              <Label>Auto-detect and Match Language</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                checked={aiRules.handleObjections}
                onCheckedChange={(checked) => setAIRules(prev => ({
                  ...prev,
                  handleObjections: checked
                }))}
              />
              <Label>Handle Common Objections</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                checked={aiRules.useCompanyContext}
                onCheckedChange={(checked) => setAIRules(prev => ({
                  ...prev,
                  useCompanyContext: checked
                }))}
              />
              <Label>Use Company Research in Responses</Label>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

