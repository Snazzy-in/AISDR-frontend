"use client"

import React from "react"
import { useState } from "react"
import PersonaProfile from "@/components/sales-assets/persona-profile"
import { Button } from "@/components/ui/button"
import { Plus, Save, X } from "lucide-react"
import DashboardLayout from "@/components/dashboard-layout"
import { useToast } from "@/hooks/use-toast"
import { Persona } from "../../types"

const EMPTY_PERSONA: Persona = {
  id: 0,
  name: "New AI SDR",
  description: "",
  traits: [{ trait: "", example: "", context: "" }],
  voiceTone: [""],
  insights: [""]
}

export default function PersonasPage() {
  const { toast } = useToast()
  const [personas, setPersonas] = useState<Persona[]>([
    {
      id: 1,
      name: "Professional Emily",
      description: "A professional and data-driven AI SDR that focuses on building credibility through industry expertise and ROI-focused conversations.",
      traits: [
        {
          trait: "Professional and courteous",
          example: "I noticed your company's recent achievements in expanding to new markets. I'd love to share how our AI platform has helped similar companies scale their outreach effectively.",
          context: "Initial outreach"
        },
        {
          trait: "Data-driven storyteller",
          example: "Based on our analysis of similar implementations, companies typically see a 40% reduction in CAC while doubling their pipeline within 3 months. Would you like to see the detailed case study?",
          context: "Value demonstration"
        }
      ],
      voiceTone: [
        "Maintains professional warmth while being direct and clear",
        "Uses data and metrics to support all claims",
        "Adapts formality based on conversation context"
      ],
      insights: [
        "Most effective when combining industry news with personalized value propositions",
        "Follow-ups with new information get 3x more responses than check-ins",
        "Technical details resonate better after establishing ROI potential"
      ]
    },
    {
      id: 2,
      name: "Technical Expert Alex",
      description: "A technically sophisticated AI SDR that excels in deep product discussions and API-focused conversations. Specializes in engaging with technical decision makers and developers.",
      traits: [],
      voiceTone: [],
      insights: []
    }
  ])
  const [selectedPersona, setSelectedPersona] = useState<Persona>(personas[0])
  const [isEditing, setIsEditing] = useState(false)
  const [editedPersona, setEditedPersona] = useState<Persona | null>(null)

  const handlePersonaUpdate = (data: Partial<Persona>) => {
    setEditedPersona((prev) => ({
      ...(prev || selectedPersona),
      ...data
    }))
    if (!isEditing) {
      setIsEditing(true)
    }
  }

  const createNewPersona = () => {
    const newPersona: Persona = {
      ...EMPTY_PERSONA,
      id: Date.now()
    }
    setEditedPersona(newPersona)
    setSelectedPersona(newPersona)
    setIsEditing(true)
  }

  const handleSave = () => {
    if (!editedPersona) return

    const updatedPersonas = personas.some(p => p.id === editedPersona.id)
      ? personas.map(p => p.id === editedPersona.id ? editedPersona : p)
      : [...personas, editedPersona]

    setPersonas(updatedPersonas)
    setSelectedPersona(editedPersona)
    setIsEditing(false)
    setEditedPersona(null)

    toast({
      title: "Changes saved",
      description: "Persona has been updated successfully.",
      duration: 3000,
    })
  }

  const handleCancel = () => {
    if (editedPersona && !personas.some(p => p.id === editedPersona.id)) {
      // If canceling a new persona, select the first existing persona
      setSelectedPersona(personas[0])
    } else {
      // If canceling edits to existing persona, revert to original
      setSelectedPersona(personas.find(p => p.id === selectedPersona.id) || personas[0])
    }
    setIsEditing(false)
    setEditedPersona(null)
  }

  const startEditing = (persona: Persona) => {
    setEditedPersona({ ...persona })
    setSelectedPersona(persona)
    setIsEditing(true)
  }

  return (
    <DashboardLayout>
      <div className="container mx-auto py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl md:text-2xl font-bold">Personas</h1>
          {isEditing ? (
            <div className="flex gap-1 md:gap-2">
              <Button onClick={handleCancel} variant="outline">
                <X className="h-4 w-4 mr-2" />
                <span className="hidden md:inline">Cancel</span>
              </Button>
              <Button onClick={handleSave}>
                <Save className="h-4 w-4 mr-2" />
                <span className="hidden md:inline">Save Changes</span>
                <span className="md:hidden">Save</span>
              </Button>
            </div>
          ) : (
            <Button onClick={createNewPersona}>
              <Plus className="h-4 w-4 mr-2" />
              <span className="hidden md:inline">New Persona</span>
              <span className="md:hidden">New</span>
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6">
          <div className="flex md:block overflow-x-auto md:space-y-2 pb-4 md:pb-0 mb-4 md:mb-0">
            {personas.map((persona) => (
              <Button
                key={persona.id}
                variant={selectedPersona?.id === persona.id ? "secondary" : "ghost"}
                className="flex-shrink-0 md:w-full justify-start text-sm md:text-base"
                onClick={() => {
                  if (isEditing) {
                    toast({
                      title: "Unsaved changes",
                      description: "Please save or cancel your current changes first.",
                      duration: 3000,
                    })
                    return
                  }
                  setSelectedPersona(persona)
                  setEditedPersona(null)
                }}
                disabled={isEditing}
              >
                {persona.name}
              </Button>
            ))}
          </div>

          <div className="md:col-span-3">
            {selectedPersona && (
              <PersonaProfile
                data={editedPersona || selectedPersona}
                onUpdate={handlePersonaUpdate}
              />
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
} 