import { Button } from "@/components/ui/button"
import { PlusCircle, Upload, Users, BarChart2 } from 'lucide-react'

export default function ActionButtons() {
  return (
    <div className="flex flex-wrap gap-2">
      <Button variant="outline" size="sm" className="w-full sm:w-auto">
        <PlusCircle className="mr-2 h-4 w-4" />
        Create Campaign
      </Button>
      <Button variant="outline" size="sm" className="w-full sm:w-auto">
        <Upload className="mr-2 h-4 w-4" />
        Import Leads
      </Button>
      <Button variant="outline" size="sm" className="w-full sm:w-auto">
        <Users className="mr-2 h-4 w-4" />
        View Leads
      </Button>
      <Button variant="outline" size="sm" className="w-full sm:w-auto">
        <BarChart2 className="mr-2 h-4 w-4" />
        View Analytics
      </Button>
    </div>
  )
}

