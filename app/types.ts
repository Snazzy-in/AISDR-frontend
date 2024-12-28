export interface Trait {
  trait: string
  example: string
  context: string
}

export interface Persona {
  id: number
  name: string
  description: string
  traits: Trait[]
  voiceTone: string[]
  insights: string[]
}

export interface Feature {
  painPoint: string
  solution: string
}

export interface Document {
  name: string
  url: string
}

export interface Product {
  id: number
  name: string
  url: string
  description: string
  features: Feature[]
  proofPoints: string[]
  coachingPoints: string[]
  insights: string[]
  documents?: Document[]
} 