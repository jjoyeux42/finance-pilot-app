import { HubSpotConfig, HubSpotContact, HubSpotCompany, HubSpotDeal, HubSpotActivity, HubSpotApiResponse, HubSpotError } from './types';

class HubSpotClient {
  private config: HubSpotConfig;
  private baseHeaders: Record<string, string>;

  constructor(config: HubSpotConfig) {
    this.config = config;
    this.baseHeaders = {
      'Authorization': `Bearer ${config.apiKey}`,
      'Content-Type': 'application/json',
    };
  }

  private async makeRequest<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.config.baseUrl}${endpoint}`;
    
    const response = await fetch(url, {
      ...options,
      headers: {
        ...this.baseHeaders,
        ...options.headers,
      },
    });
  
    if (!response.ok) {
      let errorMessage = `HubSpot API Error: ${response.statusText}`;
      try {
        const errorData: HubSpotError = await response.json();
        errorMessage = `HubSpot API Error: ${errorData.message || errorData.errors || response.statusText}`;
      } catch {
        // Si on ne peut pas parser le JSON d'erreur, utiliser le message par défaut
      }
      throw new Error(errorMessage);
    }
  
    return response.json();
  }

  // Contacts API
  async getContacts(limit = 100, after?: string): Promise<HubSpotApiResponse<HubSpotContact>> {
    const params = new URLSearchParams({
      limit: limit.toString(),
      properties: 'firstname,lastname,email,phone,company,website,jobtitle,address,city,state,zip,country,lifecyclestage,lead_status,createdate,lastmodifieddate',
    });
    
    if (after) {
      params.append('after', after);
    }

    return this.makeRequest<HubSpotApiResponse<HubSpotContact>>(
      `/crm/v3/objects/contacts?${params.toString()}`
    );
  }

  async getContact(contactId: string): Promise<HubSpotContact> {
    const params = new URLSearchParams({
      properties: 'firstname,lastname,email,phone,company,website,jobtitle,address,city,state,zip,country,lifecyclestage,lead_status,createdate,lastmodifieddate',
    });

    return this.makeRequest<HubSpotContact>(
      `/crm/v3/objects/contacts/${contactId}?${params.toString()}`
    );
  }

  async createContact(contactData: Partial<HubSpotContact['properties']>): Promise<HubSpotContact> {
    return this.makeRequest<HubSpotContact>('/crm/v3/objects/contacts', {
      method: 'POST',
      body: JSON.stringify({ properties: contactData }),
    });
  }

  async updateContact(contactId: string, contactData: Partial<HubSpotContact['properties']>): Promise<HubSpotContact> {
    return this.makeRequest<HubSpotContact>(`/crm/v3/objects/contacts/${contactId}`, {
      method: 'PATCH',
      body: JSON.stringify({ properties: contactData }),
    });
  }

  // Companies API
  async getCompanies(limit = 100, after?: string): Promise<HubSpotApiResponse<HubSpotCompany>> {
    const params = new URLSearchParams({
      limit: limit.toString(),
      properties: 'name,domain,industry,phone,address,city,state,zip,country,website,description,numberofemployees,annualrevenue,type,createdate',
    });
    
    if (after) {
      params.append('after', after);
    }

    return this.makeRequest<HubSpotApiResponse<HubSpotCompany>>(
      `/crm/v3/objects/companies?${params.toString()}`
    );
  }

  async getCompany(companyId: string): Promise<HubSpotCompany> {
    const params = new URLSearchParams({
      properties: 'name,domain,industry,phone,address,city,state,zip,country,website,description,numberofemployees,annualrevenue,type,createdate',
    });

    return this.makeRequest<HubSpotCompany>(
      `/crm/v3/objects/companies/${companyId}?${params.toString()}`
    );
  }

  async createCompany(companyData: Partial<HubSpotCompany['properties']>): Promise<HubSpotCompany> {
    return this.makeRequest<HubSpotCompany>('/crm/v3/objects/companies', {
      method: 'POST',
      body: JSON.stringify({ properties: companyData }),
    });
  }

  // Deals API
  async getDeals(limit = 100, after?: string): Promise<HubSpotApiResponse<HubSpotDeal>> {
    const params = new URLSearchParams({
      limit: limit.toString(),
      properties: 'dealname,amount,dealstage,pipeline,closedate,createdate,dealtype,description,hs_forecast_amount,hs_forecast_probability',
    });
    
    if (after) {
      params.append('after', after);
    }

    return this.makeRequest<HubSpotApiResponse<HubSpotDeal>>(
      `/crm/v3/objects/deals?${params.toString()}`
    );
  }

  async getDeal(dealId: string): Promise<HubSpotDeal> {
    const params = new URLSearchParams({
      properties: 'dealname,amount,dealstage,pipeline,closedate,createdate,dealtype,description,hs_forecast_amount,hs_forecast_probability',
    });

    return this.makeRequest<HubSpotDeal>(
      `/crm/v3/objects/deals/${dealId}?${params.toString()}`
    );
  }

  async createDeal(dealData: Partial<HubSpotDeal['properties']>): Promise<HubSpotDeal> {
    return this.makeRequest<HubSpotDeal>('/crm/v3/objects/deals', {
      method: 'POST',
      body: JSON.stringify({ properties: dealData }),
    });
  }

  // Activities API
  async getActivities(objectType: 'contacts' | 'companies' | 'deals', objectId: string): Promise<HubSpotActivity[]> {
    return this.makeRequest<HubSpotActivity[]>(
      `/crm/v3/objects/${objectType}/${objectId}/activities`
    );
  }

  // Test connection
  async testConnection(): Promise<boolean> {
    try {
      await this.makeRequest('/crm/v3/objects/contacts?limit=1');
      return true;
    } catch (error) {
      console.error('HubSpot connection test failed:', error);
      return false;
    }
  }

  // Search contacts by email
  async searchContactByEmail(email: string): Promise<HubSpotContact | null> {
    try {
      const response = await this.makeRequest<HubSpotApiResponse<HubSpotContact>>('/crm/v3/objects/contacts/search', {
        method: 'POST',
        body: JSON.stringify({
          filterGroups: [{
            filters: [{
              propertyName: 'email',
              operator: 'EQ',
              value: email
            }]
          }],
          properties: ['firstname', 'lastname', 'email', 'phone', 'company', 'lifecyclestage']
        })
      });
      
      return response.results.length > 0 ? response.results[0] : null;
    } catch (error) {
      console.error('Error searching contact by email:', error);
      return null;
    }
  }
}

// Singleton instance
let hubspotClient: HubSpotClient | null = null;

export const createHubSpotClient = (config: HubSpotConfig): HubSpotClient => {
  hubspotClient = new HubSpotClient(config);
  return hubspotClient;
};

export const getHubSpotClient = (): HubSpotClient | null => {
  return hubspotClient;
};

export { HubSpotClient };