"use client"

import { Button } from "@/components/ui/button"
import { Play, Pause, StopCircle } from "lucide-react"

interface CampaignControlsProps {
  status: "active" | "paused" | "deactivated"
  onStatusChange: (status: "active" | "paused" | "deactivated") => void
}

export default function CampaignControls({ status, onStatusChange }: CampaignControlsProps) {
  return (
    <div className="flex space-x-2">
      {status !== "active" && (
        <Button onClick={() => onStatusChange("active")} variant="outline">
          <Play className="mr-2 h-4 w-4" />
          Resume
        </Button>
      )}
      {status === "active" && (
        <Button onClick={() => onStatusChange("paused")} variant="outline">
          <Pause className="mr-2 h-4 w-4" />
          Pause
        </Button>
      )}
      {status !== "deactivated" && (
        <Button onClick={() => onStatusChange("deactivated")} variant="outline">
          <StopCircle className="mr-2 h-4 w-4" />
          Deactivate
        </Button>
      )}
    </div>
  )
}

