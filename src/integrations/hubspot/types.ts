export interface HubSpotConfig {
  apiKey: string;
  baseUrl: string;
}

export interface HubSpotContact {
  id: string;
  properties: {
    firstname?: string;
    lastname?: string;
    email?: string;
    phone?: string;
    company?: string;
    website?: string;
    jobtitle?: string;
    address?: string;
    city?: string;
    state?: string;
    zip?: string;
    country?: string;
    lifecyclestage?: string;
    lead_status?: string;
    createdate?: string;
    lastmodifieddate?: string;
    notes_last_contacted?: string;
    num_contacted_notes?: string;
    hs_analytics_source?: string;
    hs_latest_source?: string;
  };
  createdAt: string;
  updatedAt: string;
  archived: boolean;
}

export interface HubSpotCompany {
  id: string;
  properties: {
    name?: string;
    domain?: string;
    industry?: string;
    phone?: string;
    address?: string;
    city?: string;
    state?: string;
    zip?: string;
    country?: string;
    website?: string;
    description?: string;
    numberofemployees?: string;
    annualrevenue?: string;
    type?: string;
    createdate?: string;
    hs_lastmodifieddate?: string;
  };
  createdAt: string;
  updatedAt: string;
  archived: boolean;
}

export interface HubSpotDeal {
  id: string;
  properties: {
    dealname?: string;
    amount?: string;
    dealstage?: string;
    pipeline?: string;
    closedate?: string;
    createdate?: string;
    hs_lastmodifieddate?: string;
    dealtype?: string;
    description?: string;
    hs_forecast_amount?: string;
    hs_forecast_probability?: string;
  };
  createdAt: string;
  updatedAt: string;
  archived: boolean;
}

export interface HubSpotActivity {
  id: string;
  type: 'call' | 'email' | 'meeting' | 'note' | 'task';
  timestamp: string;
  properties: {
    hs_activity_type?: string;
    hs_timestamp?: string;
    hs_body_preview?: string;
    hs_body_preview_html?: string;
    hs_body_preview_is_truncated?: boolean;
    hs_created_by?: string;
    hs_modified_by?: string;
  };
  associations?: {
    contacts?: string[];
    companies?: string[];
    deals?: string[];
  };
}

export interface HubSpotSyncStatus {
  lastSync: string;
  status: 'success' | 'error' | 'in_progress';
  recordsSynced: number;
  errors?: string[];
}

export interface HubSpotIntegrationSettings {
  apiKey: string;
  isEnabled: boolean;
  syncFrequency: 'manual' | 'hourly' | 'daily' | 'weekly';
  syncContacts: boolean;
  syncCompanies: boolean;
  syncDeals: boolean;
  syncActivities: boolean;
  lastSync?: string;
  webhookUrl?: string;
}

export interface HubSpotApiResponse<T> {
  results: T[];
  paging?: {
    next?: {
      after: string;
      link: string;
    };
  };
  total?: number;
}

export interface HubSpotError {
  status: string;
  message: string;
  correlationId?: string;
  category?: string;
  subCategory?: string;
  errors?: Array<{
    message: string;
    in: string;
    code: string;
  }>;
}