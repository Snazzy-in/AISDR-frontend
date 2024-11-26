import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"

export function LeadsSidebar() {
  return (
    <div className="w-64 h-full border-r bg-background p-4 space-y-6">
      <div>
        <h2 className="text-lg font-semibold mb-2">Filters</h2>
        <div className="space-y-4">
          <div>
            <Label htmlFor="search">Search</Label>
            <Input id="search" placeholder="Search leads..." />
          </div>
          <div>
            <Label>Status</Label>
            <div className="space-y-2 mt-2">
              <div className="flex items-center">
                <Checkbox id="status-warm" />
                <label htmlFor="status-warm" className="ml-2 text-sm">Warm</label>
              </div>
              <div className="flex items-center">
                <Checkbox id="status-cold" />
                <label htmlFor="status-cold" className="ml-2 text-sm">Cold</label>
              </div>
              <div className="flex items-center">
                <Checkbox id="status-hot" />
                <label htmlFor="status-hot" className="ml-2 text-sm">Hot</label>
              </div>
            </div>
          </div>
          <div>
            <Label>Source</Label>
            <div className="space-y-2 mt-2">
              <div className="flex items-center">
                <Checkbox id="source-website" />
                <label htmlFor="source-website" className="ml-2 text-sm">Website</label>
              </div>
              <div className="flex items-center">
                <Checkbox id="source-linkedin" />
                <label htmlFor="source-linkedin" className="ml-2 text-sm">LinkedIn</label>
              </div>
              <div className="flex items-center">
                <Checkbox id="source-referral" />
                <label htmlFor="source-referral" className="ml-2 text-sm">Referral</label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Button className="w-full">Apply Filters</Button>
    </div>
  )
}

