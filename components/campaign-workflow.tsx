"use client"

import React, { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Mail, Clock, Trash2, Linkedin, MessageSquare, Calendar, Ban } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'

interface WorkflowStep {
  id: string
  type: 'email' | 'delay' | 'linkedin'
  config: {
    delayDays?: number
    linkedinAction?: 'connect' | 'message'
  }
}

interface SequenceSettings {
  autoHandleReplies: boolean
  stopOnReply: boolean
  stopOnMeeting: boolean
  stopOnUnsubscribe: boolean
}

// Add this CSS at the top of your file, after the imports
const dotPattern = {
  backgroundImage: `radial-gradient(#e5e7eb 1px, transparent 1px)`,
  backgroundSize: '24px 24px'
}

// First, let's create a new DelayInput component to replace DelaySelect
const DelayInput = ({ step, index, steps, setSteps }) => {
  const increment = () => {
    const newSteps = [...steps];
    const currentDays = newSteps[index].config.delayDays || 0;
    newSteps[index].config.delayDays = currentDays + 1;
    setSteps(newSteps);
  };

  const decrement = () => {
    const newSteps = [...steps];
    const currentDays = newSteps[index].config.delayDays || 0;
    if (currentDays > 0) {
      newSteps[index].config.delayDays = currentDays - 1;
      setSteps(newSteps);
    }
  };

  return (
    <div className="flex items-center gap-2 bg-gray-50 rounded-full px-3 py-1.5">
      <Clock className="h-4 w-4 text-gray-500" />
      <span className="text-sm font-medium">Wait for</span>
      <div className="flex items-center">
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-6 w-6 p-0 hover:bg-gray-200"
          onClick={decrement}
        >
          -
        </Button>
        <span className="w-12 text-center text-sm font-medium">
          {step.config.delayDays || 0} days
        </span>
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-6 w-6 p-0 hover:bg-gray-200"
          onClick={increment}
        >
          +
        </Button>
      </div>
    </div>
  );
};

export default function CampaignWorkflow() {
  const [settings, setSettings] = useState<SequenceSettings>({
    autoHandleReplies: true,
    stopOnReply: true,
    stopOnMeeting: true,
    stopOnUnsubscribe: true
  })

  const [steps, setSteps] = useState<WorkflowStep[]>([
    // Initial Email
    {
      id: '1',
      type: 'email',
      config: {}
    },
    // Wait 2 days
    {
      id: '2',
      type: 'delay',
      config: { delayDays: 2 }
    },
    // Follow-up Email 1
    {
      id: '3',
      type: 'email',
      config: {}
    },
    // Wait 3 days
    {
      id: '4',
      type: 'delay',
      config: { delayDays: 3 }
    },
    // Final Follow-up Email
    {
      id: '5',
      type: 'email',
      config: {}
    }
  ])

  const addStep = (type: 'email' | 'linkedin') => {
    const newSteps = [...steps];
    const newStepId = Date.now().toString();
    
    // Add a delay node before the new step (if there are existing steps)
    if (newSteps.length > 0) {
      newSteps.push({
        id: `delay-${newStepId}`,
        type: 'delay',
        config: { delayDays: 1 }
      });
    }

    // Add the new action step
    newSteps.push({
      id: newStepId,
      type,
      config: type === 'linkedin'
        ? { linkedinAction: steps.some(s => s.type === 'linkedin') ? 'message' : 'connect' }
        : {}
    });

    setSteps(newSteps);
  }

  const deleteStep = (stepId: string) => {
    const stepIndex = steps.findIndex(step => step.id === stepId);
    
    // If step not found, return
    if (stepIndex === -1) return;
    
    const newSteps = [...steps];
    
    // If this is an email/linkedin step
    if (steps[stepIndex].type !== 'delay') {
      // If there's a delay before this step, remove it
      if (stepIndex > 0 && steps[stepIndex - 1].type === 'delay') {
        newSteps.splice(stepIndex - 1, 2); // Remove delay and current step
      }
      // If there's a delay after this step, remove it
      else if (stepIndex < steps.length - 1 && steps[stepIndex + 1].type === 'delay') {
        newSteps.splice(stepIndex, 2); // Remove current step and delay
      }
      // If no delays around, just remove the step
      else {
        newSteps.splice(stepIndex, 1);
      }
    }
    
    setSteps(newSteps);
  }

  const getEmailTitle = (index: number) => {
    const emailCount = steps.filter((s, i) => s.type === 'email' && i < index).length
    return emailCount === 0 ? "Initial Email" : `Email Follow-up ${emailCount}`
  }

  return (
    <div className="flex gap-6 h-[600px] p-6">
      {/* Main Workflow Area */}
      <div className="flex-grow flex flex-col">
        {/* Scrollable Workflow - updated with dot pattern */}
        <div 
          className="flex-grow overflow-y-auto min-h-0 border rounded-lg bg-white"
          style={dotPattern}
        >
          <div className="max-w-xl mx-auto py-6">
            {/* Sequence Start Label */}
            <div className="flex justify-center mb-8">
              <div className="text-sm text-gray-600 bg-green-50 px-4 py-1 rounded-full">
                Sequence Start
              </div>
            </div>

            {/* Workflow Steps */}
            <div className="space-y-12 pb-6">
              {steps.map((step, index) => (
                <div key={step.id} className="relative">
                  {/* Connector Line - only show if not first step */}
                  {index === 0 ? (
                    <div className="absolute -top-8 left-1/2 w-0.5 h-8 bg-gray-200" />
                  ) : (
                    <div className="absolute -top-12 left-1/2 w-0.5 h-12 bg-gray-200" />
                  )}
                  
                  {step.type === 'delay' ? (
                    // Delay step without card
                    <div className="flex justify-center">
                      <DelayInput step={step} index={index} steps={steps} setSteps={setSteps} />
                    </div>
                  ) : (
                    // Other steps with card
                    <Card className="border border-gray-200 w-[300px] mx-auto">
                      <CardContent className="p-3">
                        {step.type === 'email' && (
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className="bg-purple-100 p-1.5 rounded-md">
                                <Mail className="h-4 w-4 text-purple-500" />
                              </div>
                              <span className="text-sm font-medium">{getEmailTitle(index)}</span>
                            </div>
                            <Button variant="ghost" size="icon" onClick={() => deleteStep(step.id)}>
                              <Trash2 className="h-4 w-4 text-gray-500 hover:text-red-500" />
                            </Button>
                          </div>
                        )}

                        {step.type === 'linkedin' && (
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className="bg-blue-100 p-1.5 rounded-md">
                                <Linkedin className="h-4 w-4 text-blue-500" />
                              </div>
                              <span className="text-sm font-medium">
                                {step.config.linkedinAction === 'connect' ? 'Connection Request' : 'LinkedIn Message'}
                              </span>
                            </div>
                            <Button variant="ghost" size="icon" onClick={() => deleteStep(step.id)}>
                              <Trash2 className="h-4 w-4 text-gray-500 hover:text-red-500" />
                            </Button>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Reset Button Area */}
        <div className="mt-4">
          <Button 
            variant="outline" 
            onClick={() => setSteps([
              { id: '1', type: 'email', config: {} }
            ])}
            size="sm"
            className="text-gray-500"
          >
            Reset Sequence
          </Button>
        </div>
      </div>

      {/* Right Panel with Add Buttons */}
      <div className="w-[300px] flex-shrink-0">
        <Card>
          <CardContent className="p-4 space-y-6">
            <h3 className="font-medium text-sm text-gray-700 mb-4">Add Steps</h3>
            
            <div className="space-y-3">
              <Button 
                variant="outline" 
                onClick={() => addStep('email')}
                className="w-full justify-start gap-2"
                size="lg"
              >
                <Mail className="h-4 w-4" />
                Add Email
              </Button>

              <Button 
                variant="outline" 
                onClick={() => addStep('linkedin')}
                className="w-full justify-start gap-2"
                size="lg"
              >
                <Linkedin className="h-4 w-4" />
                Add LinkedIn Action
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

