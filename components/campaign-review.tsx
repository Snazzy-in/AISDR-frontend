export default function CampaignReview({ campaignData }) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Lead Information</h3>
        <p>Total Leads: {campaignData.leads.length}</p>
        <p>ICP Categories: {campaignData.icp?.join(", ")}</p>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2">Product</h3>
        <p>Name: {campaignData.product?.name}</p>
        <p>Description: {campaignData.product?.description}</p>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2">AI Persona</h3>
        <p>Name: {campaignData.aiPersona?.name}</p>
        <p>Role: {campaignData.aiPersona?.role}</p>
        <p>Voice: {campaignData.aiPersona?.voice}</p>
        <p>Strategy: {campaignData.aiPersona?.strategy}</p>
        <p>Tone: {campaignData.aiPersona?.tone}</p>
        <p>Response Style: {campaignData.aiPersona?.responseStyle}</p>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2">Email Template</h3>
        <p>Strategy: {campaignData.emailTemplate?.strategy}</p>
        <p>Customization: {campaignData.emailTemplate?.customization}</p>
      </div>
    </div>
  )
}

