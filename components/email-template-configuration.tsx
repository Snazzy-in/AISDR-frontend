import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

export default function EmailTemplateConfiguration({ campaignData, updateCampaignData }) {
  const [emailFlow, setEmailFlow] = useState({
    strategy: "",
    customization: "",
  })

  const handleEmailFlowChange = (field, value) => {
    setEmailFlow((prev) => ({ ...prev, [field]: value }))
    updateCampaignData("emailTemplate", { ...emailFlow, [field]: value })
  }

  return (
    <div className="space-y-6">
      <div>
        <Label>Email Flow Strategy</Label>
        <Select onValueChange={(value) => handleEmailFlowChange("strategy", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select email flow strategy" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="introduction">Introduction & Problem Identification</SelectItem>
            <SelectItem value="solution">Solution Introduction</SelectItem>
            <SelectItem value="cta">Call-to-Action (CTA)</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="email-customization">Dynamic Personalization Variables</Label>
        <Textarea
          id="email-customization"
          value={emailFlow.customization}
          onChange={(e) => handleEmailFlowChange("customization", e.target.value)}
          placeholder="e.g., Hi [First Name], I saw you work at [Company]..."
        />
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2">AI-Generated Email Preview</h3>
        <div className="p-4 bg-gray-100 rounded-md">
          <p>
            Subject: Revolutionize Your Sales Process with AI
            <br /><br />
            Dear [First Name],
            <br /><br />
            I hope this email finds you well. I noticed you work at [Company] and wanted to reach out because I believe our AI-powered SDR tool could significantly enhance your sales process.
            <br /><br />
            Our platform has helped companies like yours increase their response rates by 35% and reduce time spent on manual outreach by 60%. Would you be interested in a quick demo to see how it could benefit your team?
            <br /><br />
            Looking forward to your response,
            <br />
            [AI Persona Name]
          </p>
        </div>
      </div>
    </div>
  )
}

