// lib/meta.ts

type CampaignData = {
    name: string
    budget: string
    objective: string
  }
  
  export async function createCampaign(data: CampaignData): Promise<{ success: boolean; campaignId: string }> {
    console.log('📢 Simulando creación de campaña en Meta Ads:', data)
    return new Promise((resolve) =>
      setTimeout(() => {
        resolve({ success: true, campaignId: 'meta_fake_id_123' })
      }, 800)
    )
  }
  