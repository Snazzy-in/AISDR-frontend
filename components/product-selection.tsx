"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ProductSelection({ campaignData, updateCampaignData }) {
  const [selectedProduct, setSelectedProduct] = useState("")
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    features: "",
    benefits: "",
    url: "",
  })

  const handleProductSelect = (value) => {
    setSelectedProduct(value)
    if (value === "new") {
      updateCampaignData("product", null)
    } else {
      // Simulated product data
      const productData = {
        id: 1,
        name: "AI-Powered CRM",
        description: "Revolutionize your sales process with our AI-driven CRM solution.",
        features: "AI lead scoring, Automated follow-ups, Intelligent insights",
        benefits: "Increase sales efficiency, Improve customer retention, Data-driven decision making",
        url: "https://example.com/ai-crm",
      }
      updateCampaignData("product", productData)
    }
  }

  const handleNewProductChange = (field, value) => {
    setNewProduct((prev) => ({ ...prev, [field]: value }))
  }

  const handleNewProductSubmit = () => {
    updateCampaignData("product", newProduct)
  }

  return (
    <div className="space-y-6">
      <div>
        <Label>Select Product</Label>
        <Select onValueChange={handleProductSelect}>
          <SelectTrigger>
            <SelectValue placeholder="Choose a product" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="existing">AI-Powered CRM</SelectItem>
            <SelectItem value="new">Create New Product</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {selectedProduct === "new" && (
        <div className="space-y-4">
          <div>
            <Label htmlFor="product-name">Product Name</Label>
            <Input
              id="product-name"
              value={newProduct.name}
              onChange={(e) => handleNewProductChange("name", e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="product-description">Description</Label>
            <Textarea
              id="product-description"
              value={newProduct.description}
              onChange={(e) => handleNewProductChange("description", e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="product-features">Features</Label>
            <Textarea
              id="product-features"
              value={newProduct.features}
              onChange={(e) => handleNewProductChange("features", e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="product-benefits">Benefits</Label>
            <Textarea
              id="product-benefits"
              value={newProduct.benefits}
              onChange={(e) => handleNewProductChange("benefits", e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="product-url">Product URL</Label>
            <Input
              id="product-url"
              type="url"
              value={newProduct.url}
              onChange={(e) => handleNewProductChange("url", e.target.value)}
            />
          </div>
          <Button onClick={handleNewProductSubmit}>Save New Product</Button>
        </div>
      )}
      {campaignData.product && (
        <div>
          <h3 className="text-lg font-semibold mb-2">Selected Product</h3>
          <p><strong>Name:</strong> {campaignData.product.name}</p>
          <p><strong>Description:</strong> {campaignData.product.description}</p>
        </div>
      )}
    </div>
  )
}

