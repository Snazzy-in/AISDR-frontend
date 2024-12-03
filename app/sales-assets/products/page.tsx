"use client"

import React from "react"
import { useState } from "react"
import ProductProfile from "@/components/sales-assets/product-profile"
import { Button } from "@/components/ui/button"
import { Plus, Save, X } from "lucide-react"
import DashboardLayout from "@/components/dashboard-layout"
import { useToast } from "@/hooks/use-toast"
import { Product } from "../../types"

const EMPTY_PRODUCT: Product = {
  id: 0,
  name: "New Product",
  url: "",
  description: "",
  features: [{ painPoint: "", solution: "" }],
  proofPoints: [""],
  coachingPoints: [""],
  insights: [""]
}

export default function ProductsPage() {
  const { toast } = useToast()
  const [products, setProducts] = useState<Product[]>([
    { 
      id: 1, 
      name: "AI SDR Platform",
      url: "https://artisan.co",
      description: "We have created Ava, an AI BDR that automates the entire outbound email process.",
      features: [
        { 
          painPoint: "You would normally need 10s of SaaS subscriptions to do cold outbound.", 
          solution: "Artisan consolidates every tool you need for outbound - from 300M B2B contacts to a sequence builder."
        },
        { 
          painPoint: "Human BDRs are expensive and the work they do is repetitive.", 
          solution: "Our AI BDR costs less than 10% of what a human would and gets more work done."
        }
      ],
      proofPoints: [
        "We are backed by top VCs including Y Combinator and HubSpot.",
        "100s of companies have hired Ava to automate their outbound."
      ],
      coachingPoints: [
        "Focus on the pain points our AI solves",
        "Highlight the time and cost savings"
      ],
      insights: [
        "Pricing objections are best handled by focusing on ROI timeline",
        "Technical decision makers respond well to our API-first approach",
        "Security concerns are a common blocker in enterprise deals"
      ]
    },
    { 
      id: 2, 
      name: "Lead Enrichment API",
      url: "https://artisan.co/api",
      description: "Enterprise-grade API for enriching lead data with AI-powered insights.",
      features: [],
      proofPoints: [],
      coachingPoints: [],
      insights: []
    }
  ])
  const [selectedProduct, setSelectedProduct] = useState<Product>(products[0])
  const [isEditing, setIsEditing] = useState(false)
  const [editedProduct, setEditedProduct] = useState<Product | null>(null)

  const handleProductUpdate = (data: Partial<Product>) => {
    setEditedProduct((prev) => ({
      ...(prev || selectedProduct),
      ...data
    }))
    if (!isEditing) {
      setIsEditing(true)
    }
  }

  const createNewProduct = () => {
    const newProduct: Product = {
      ...EMPTY_PRODUCT,
      id: Date.now()
    }
    setEditedProduct(newProduct)
    setSelectedProduct(newProduct)
    setIsEditing(true)
  }

  const handleSave = () => {
    if (!editedProduct) return

    const updatedProducts = products.some(p => p.id === editedProduct.id)
      ? products.map(p => p.id === editedProduct.id ? editedProduct : p)
      : [...products, editedProduct]

    setProducts(updatedProducts)
    setSelectedProduct(editedProduct)
    setIsEditing(false)
    setEditedProduct(null)

    toast({
      title: "Changes saved",
      description: "Product has been updated successfully.",
      duration: 3000,
    })
  }

  const handleCancel = () => {
    if (editedProduct && !products.some(p => p.id === editedProduct.id)) {
      // If canceling a new product, select the first existing product
      setSelectedProduct(products[0])
    } else {
      // If canceling edits to existing product, revert to original
      setSelectedProduct(products.find(p => p.id === selectedProduct.id) || products[0])
    }
    setIsEditing(false)
    setEditedProduct(null)
  }

  const startEditing = (product: Product) => {
    setEditedProduct({ ...product })
    setSelectedProduct(product)
    setIsEditing(true)
  }

  return (
    <DashboardLayout>
      <div className="container mx-auto py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl md:text-2xl font-bold">Products</h1>
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
            <Button onClick={createNewProduct}>
              <Plus className="h-4 w-4 mr-2" />
              <span className="hidden md:inline">New Product</span>
              <span className="md:hidden">New</span>
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6">
          <div className="flex md:block overflow-x-auto md:space-y-2 pb-4 md:pb-0 mb-4 md:mb-0">
            {products.map((product) => (
              <Button
                key={product.id}
                variant={selectedProduct?.id === product.id ? "secondary" : "ghost"}
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
                  setSelectedProduct(product)
                  setEditedProduct(null)
                }}
                disabled={isEditing}
              >
                {product.name}
              </Button>
            ))}
          </div>

          <div className="md:col-span-3">
            {selectedProduct && (
              <ProductProfile
                data={editedProduct || selectedProduct}
                onUpdate={handleProductUpdate}
              />
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
} 