"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Send, Lightbulb, Bot, User, Save, Trash2 } from 'lucide-react'
import { useToast } from "@/hooks/use-toast"

const DEFAULT_PERSONAS = [
  { id: 1, name: "Professional Emily" },
  { id: 2, name: "Technical Expert Alex" }
]

const DEFAULT_PRODUCTS = [
  { id: 1, name: "AI SDR Platform" },
  { id: 2, name: "Lead Enrichment API" }
]

export default function RocketLab({ onInsightGenerated }) {
  const { toast } = useToast()
  const [selectedProduct, setSelectedProduct] = useState(DEFAULT_PRODUCTS[0])
  const [selectedPersona, setSelectedPersona] = useState(DEFAULT_PERSONAS[0])
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hello! I'm your AI SDR. Let's practice our sales conversation. I'll adapt my communication style based on the selected persona and product."
    }
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [generatedInsights, setGeneratedInsights] = useState({
    product: [],
    persona: []
  })
  const [unsavedChanges, setUnsavedChanges] = useState(false)

  const handlePersonaChange = (e) => {
    const persona = DEFAULT_PERSONAS.find(p => p.id === Number(e.target.value))
    setSelectedPersona(persona)
    // Reset conversation when persona changes
    setMessages([
      {
        role: "assistant",
        content: `Hello! I'm ${persona.name}. Let's practice our sales conversation. I'll adapt my communication style based on my persona and the selected product.`
      }
    ])
  }

  const handleProductChange = (e) => {
    const product = DEFAULT_PRODUCTS.find(p => p.id === Number(e.target.value))
    setSelectedProduct(product)
    // Add a message about product change
    setMessages(prev => [...prev, {
      role: "assistant",
      content: `I'll now adjust my approach to discuss ${product.name}. Feel free to ask any questions about this product.`
    }])
  }

  const sendMessage = async () => {
    if (!inputMessage.trim()) return

    // Add user message
    const updatedMessages = [
      ...messages,
      { role: "user", content: inputMessage }
    ]
    setMessages(updatedMessages)
    setInputMessage("")

    // Simulate AI response (replace with actual API call)
    setTimeout(() => {
      let response = ""
      if (selectedPersona.name === "Technical Expert Alex") {
        response = "I understand your technical requirements. Our API architecture is specifically designed to handle these challenges with features like rate limiting, automatic retries, and comprehensive error handling. Would you like me to share our technical documentation?"
      } else {
        response = "I understand your point about scaling challenges. Our AI SDR platform specifically addresses this by automating repetitive outreach tasks while maintaining personalization. Would you like to hear how other companies have solved this?"
      }

      setMessages(prev => [...prev, {
        role: "assistant",
        content: response
      }])

      // Simulate insight generation
      generateInsights()
    }, 1000)
  }

  const generateInsights = () => {
    // Simulate insight generation based on selected persona
    const newInsights = {
      product: [
        {
          id: Date.now() + '-p',
          type: "Pain Point",
          content: selectedPersona.name === "Technical Expert Alex" 
            ? "Technical implementation concerns are primary blockers"
            : "Scaling challenges are a major concern for prospects",
          confidence: 0.85
        }
      ],
      persona: [
        {
          id: Date.now() + '-a',
          type: "Communication Style",
          content: selectedPersona.name === "Technical Expert Alex"
            ? "Technical documentation sharing increases engagement significantly"
            : "ROI-focused messaging resonates strongly",
          confidence: 0.92
        }
      ]
    }

    setGeneratedInsights(prev => ({
      product: [...prev.product, ...newInsights.product],
      persona: [...prev.persona, ...newInsights.persona]
    }))
    setUnsavedChanges(true)
  }

  const removeInsight = (type, id) => {
    setGeneratedInsights(prev => ({
      ...prev,
      [type]: prev[type].filter(insight => insight.id !== id)
    }))
    setUnsavedChanges(true)
  }

  const handleSaveInsights = () => {
    onInsightGenerated?.(generatedInsights)
    setUnsavedChanges(false)
    toast({
      title: "Insights saved",
      description: "All insights have been saved to product and persona profiles.",
      duration: 3000,
    })
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-[calc(100vh-2rem)]">
      <div className="col-span-1 md:col-span-2 flex flex-col">
        <div className="mb-4 flex gap-4">
          <div className="flex-1 text-sm md:text-base">
            <Label>Selected Product</Label>
            <select 
              className="w-full p-2 border rounded-md text-sm md:text-base"
              value={selectedProduct.id}
              onChange={handleProductChange}
            >
              {DEFAULT_PRODUCTS.map(product => (
                <option key={product.id} value={product.id}>
                  {product.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex-1 text-sm md:text-base">
            <Label>Selected Persona</Label>
            <select 
              className="w-full p-2 border rounded-md text-sm md:text-base"
              value={selectedPersona.id}
              onChange={handlePersonaChange}
            >
              {DEFAULT_PERSONAS.map(persona => (
                <option key={persona.id} value={persona.id}>
                  {persona.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <Card className="flex-1 mb-4">
          <CardContent className="p-2 md:p-4 h-full flex flex-col">
            <div className="flex-1 overflow-auto space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex gap-2 ${
                    message.role === "assistant" ? "flex-row" : "flex-row-reverse"
                  }`}
                >
                  <div className="w-6 md:w-8 h-6 md:h-8 rounded-full bg-gray-100 flex items-center justify-center">
                    {message.role === "assistant" ? (
                      <Bot className="h-3 md:h-4 w-3 md:w-4" />
                    ) : (
                      <User className="h-3 md:h-4 w-3 md:w-4" />
                    )}
                  </div>
                  <div
                    className={`rounded-lg p-3 max-w-[80%] ${
                      message.role === "assistant"
                        ? "bg-gray-100"
                        : "bg-blue-500 text-white ml-auto"
                    } text-sm md:text-base`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-2">
          <Input
            placeholder="Type your message..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && sendMessage()}
            className="text-sm md:text-base"
          />
          <Button onClick={sendMessage}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        <Card>
          <CardContent className="p-3 md:p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Lightbulb className="h-4 w-4 text-yellow-500" />
                <Label className="text-sm md:text-base">Generated Insights</Label>
              </div>
              <Button 
                onClick={handleSaveInsights}
                disabled={!unsavedChanges}
                variant={unsavedChanges ? "default" : "secondary"}
                className="text-xs md:text-sm"
              >
                <Save className="h-4 w-4 mr-2" />
                <span className="hidden md:inline">Save Insights</span>
                <span className="md:hidden">Save</span>
              </Button>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label className="text-xs md:text-sm text-gray-500">Product Insights</Label>
                {generatedInsights.product.map((insight) => (
                  <Card key={insight.id} className="mt-2">
                    <CardContent className="p-2 md:p-3">
                      <div className="flex justify-between items-start gap-2">
                        <div className="flex-1">
                          <div className="text-xs md:text-sm font-medium">{insight.type}</div>
                          <div className="text-xs md:text-sm mt-1">{insight.content}</div>
                          <div className="text-xs text-gray-500 mt-1 hidden md:block">
                            Confidence: {(insight.confidence * 100).toFixed(0)}%
                          </div>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => removeInsight('product', insight.id)}
                          className="h-6 md:h-8 w-6 md:w-8 p-0"
                        >
                          <Trash2 className="h-4 w-4 text-gray-500 hover:text-red-500" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div>
                <Label className="text-xs md:text-sm text-gray-500">Persona Insights</Label>
                {generatedInsights.persona.map((insight) => (
                  <Card key={insight.id} className="mt-2">
                    <CardContent className="p-2 md:p-3">
                      <div className="flex justify-between items-start gap-2">
                        <div className="flex-1">
                          <div className="text-xs md:text-sm font-medium">{insight.type}</div>
                          <div className="text-xs md:text-sm mt-1">{insight.content}</div>
                          <div className="text-xs text-gray-500 mt-1 hidden md:block">
                            Confidence: {(insight.confidence * 100).toFixed(0)}%
                          </div>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => removeInsight('persona', insight.id)}
                          className="h-6 md:h-8 w-6 md:w-8 p-0"
                        >
                          <Trash2 className="h-4 w-4 text-gray-500 hover:text-red-500" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 