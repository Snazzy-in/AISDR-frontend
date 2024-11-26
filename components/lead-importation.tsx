import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

export default function LeadImportation({ campaignData, updateCampaignData }) {
  const [selectedSource, setSelectedSource] = useState("")
  const [icpCategories, setIcpCategories] = useState([])

  const handleSourceChange = (value) => {
    setSelectedSource(value)
    // Simulated lead import based on selected source
    const importedLeads = [
      { id: 1, name: "John Doe", company: "Acme Inc.", email: "john@acme.com" },
      { id: 2, name: "Jane Smith", company: "Tech Corp", email: "jane@techcorp.com" },
    ]
    updateCampaignData("leads", importedLeads)
  }

  const handleICPChange = (category) => {
    const updatedCategories = icpCategories.includes(category)
      ? icpCategories.filter((c) => c !== category)
      : [...icpCategories, category]
    setIcpCategories(updatedCategories)
    updateCampaignData("icp", updatedCategories)
  }

  return (
    <div className="space-y-6">
      <div>
        <Label>Lead Source</Label>
        <Select onValueChange={handleSourceChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select lead source" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="existing">Existing Leads</SelectItem>
            <SelectItem value="apollo">Import from Apollo</SelectItem>
            <SelectItem value="csv">Upload CSV</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {selectedSource === "csv" && (
        <div>
          <Label htmlFor="csv-upload">Upload CSV File</Label>
          <Input id="csv-upload" type="file" accept=".csv" />
        </div>
      )}
      <div>
        <Label>Define ICP (Ideal Customer Profile)</Label>
        <div className="mt-2 space-y-2">
          <Checkbox
            id="icp-tech"
            checked={icpCategories.includes("tech")}
            onCheckedChange={() => handleICPChange("tech")}
          />
          <Label htmlFor="icp-tech" className="ml-2">Mid-Market Tech Companies</Label>
        </div>
        <div className="mt-2 space-y-2">
          <Checkbox
            id="icp-healthcare"
            checked={icpCategories.includes("healthcare")}
            onCheckedChange={() => handleICPChange("healthcare")}
          />
          <Label htmlFor="icp-healthcare" className="ml-2">Enterprise Healthcare Providers</Label>
        </div>
      </div>
      {campaignData.leads.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-2">Imported Leads</h3>
          <ul className="list-disc pl-5">
            {campaignData.leads.map((lead) => (
              <li key={lead.id}>{lead.name} - {lead.company}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

