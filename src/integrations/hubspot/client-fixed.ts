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
    // Utiliser le proxy backend pour éviter les problèmes CORS
    const proxyUrl = `/api/integrations/hubspot/proxy${endpoint}`;
    
    console.log('🔍 HubSpot Request:', {
      url: proxyUrl,
      method: options.method || 'GET',
      headers: this.baseHeaders
    });
    
    const response = await fetch(proxyUrl, {
      ...options,
      headers: {
        ...this.baseHeaders,
        ...options.headers,
      },
    });
  
    console.log('📡 HubSpot Response:', {
      status: response.status,
      statusText: response.statusText,
      url: proxyUrl
    });

    if (!response.ok) {
      let errorMessage = `HubSpot API Error: ${response.statusText}`;
      let errorDetails = null;
      
      try {
        const errorData: HubSpotError = await response.json();
        errorDetails = errorData;
        
        if (errorData.message) {
          errorMessage = `HubSpot API Error: ${errorData.message}`;
        } else if (errorData.errors && Array.isArray(errorData.errors)) {
          errorMessage = `HubSpot API Error: ${errorData.errors.map(e => e.message).join(', ')}`;
        }
        
        // Messages d'erreur spécifiques
        if (response.status === 401) {
          errorMessage = 'Clé API HubSpot invalide ou permissions insuffisantes. Vérifiez que votre application privée a les permissions "contacts.read".';
        } else if (response.status === 403) {
          errorMessage = 'Accès refusé. Vérifiez les permissions de votre application privée HubSpot.';
        } else if (response.status === 429) {
          errorMessage = 'Limite de taux dépassée. Veuillez réessayer dans quelques minutes.';
        }
        
      } catch (parseError) {
        console.error('Erreur lors du parsing de la réponse d\'erreur:', parseError);
      }
      
      console.error('❌ Erreur HubSpot détaillée:', {
        status: response.status,
        message: errorMessage,
        details: errorDetails,
        url: proxyUrl
      });
      
      throw new Error(errorMessage);
    }
  
    return response.json();
  }

  // Test de connexion amélioré
  async testConnection(): Promise<boolean> {
    try {
      console.log('🔍 Test de connexion HubSpot...');
      console.log('📋 Configuration:', {
        apiKeyFormat: this.config.apiKey.substring(0, 10) + '...',
        baseUrl: this.config.baseUrl,
        proxyUrl: '/api/integrations/hubspot/proxy/crm/v3/objects/contacts?limit=1'
      });
      
      const response = await this.makeRequest<HubSpotApiResponse<HubSpotContact>>('/crm/v3/objects/contacts?limit=1');
      
      console.log('✅ Test de connexion HubSpot réussi');
      console.log('📊 Données reçues:', {
        total: response.total || 0,
        resultsCount: response.results?.length || 0
      });
      
      return true;
    } catch (error) {
      console.error('❌ Test de connexion HubSpot échoué:', error);
      
      // Diagnostic supplémentaire
      if (error instanceof Error) {
        if (error.message.includes('401')) {
          console.error('🔑 Problème d\'authentification: Vérifiez votre clé API');
        } else if (error.message.includes('403')) {
          console.error('🚫 Problème de permissions: Vérifiez les scopes de votre application privée');
        } else if (error.message.includes('CORS')) {
          console.error('🌐 Problème CORS: Vérifiez que le proxy backend fonctionne');
        } else if (error.message.includes('fetch')) {
          console.error('🔌 Problème de réseau: Vérifiez que le backend est accessible');
        }
      }
      
      return false;
    }
  }

  // Validation de la clé API
  static validateApiKey(apiKey: string): { isValid: boolean; message: string } {
    if (!apiKey || apiKey.trim() === '') {
      return { isValid: false, message: 'Clé API manquante' };
    }
    
    // Vérification du format des clés API HubSpot
    if (apiKey.startsWith('pat-na1-') || apiKey.startsWith('pat-eu1-')) {
      return { isValid: true, message: 'Format de clé API valide (Private App Token)' };
    }
    
    // Format legacy
    if (apiKey.length >= 30 && apiKey.includes('-')) {
      return { isValid: true, message: 'Format de clé API valide (Legacy)' };
    }
    
    return { 
      isValid: false, 
      message: 'Format de clé API invalide. Utilisez une clé d\'application privée commençant par "pat-na1-" ou "pat-eu1-"' 
    };
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

  async searchContactByEmail(email: string): Promise<HubSpotContact | null> {
    try {
      const searchData = {
        filterGroups: [{
          filters: [{
            propertyName: 'email',
            operator: 'EQ',
            value: email
          }]
        }],
        properties: ['firstname', 'lastname', 'email', 'phone', 'company'],
        limit: 1
      };

      const response = await this.makeRequest<HubSpotApiResponse<HubSpotContact>>('/crm/v3/objects/contacts/search', {
        method: 'POST',
        body: JSON.stringify(searchData),
      });

      return response.results && response.results.length > 0 ? response.results[0] : null;
    } catch (error) {
      console.error('Erreur lors de la recherche de contact par email:', error);
      return null;
    }
  }

  // Companies API
  async getCompanies(limit = 100, after?: string): Promise<HubSpotApiResponse<HubSpotCompany>> {
    const params = new URLSearchParams({
      limit: limit.toString(),
      properties: 'name,domain,industry,phone,address,city,state,zip,country,website,description,numberofemployees,annualrevenue,type,createdate,hs_lastmodifieddate',
    });
    
    if (after) {
      params.append('after', after);
    }

    return this.makeRequest<HubSpotApiResponse<HubSpotCompany>>(
      `/crm/v3/objects/companies?${params.toString()}`
    );
  }

  // Deals API
  async getDeals(limit = 100, after?: string): Promise<HubSpotApiResponse<HubSpotDeal>> {
    const params = new URLSearchParams({
      limit: limit.toString(),
      properties: 'dealname,amount,dealstage,pipeline,closedate,createdate,hs_lastmodifieddate,dealtype,description,hs_forecast_amount,hs_forecast_probability',
    });
    
    if (after) {
      params.append('after', after);
    }

    return this.makeRequest<HubSpotApiResponse<HubSpotDeal>>(
      `/crm/v3/objects/deals?${params.toString()}`
    );
  }
}

// Factory function pour créer un client HubSpot
export function createHubSpotClient(config: HubSpotConfig): HubSpotClient {
  // Validation de la configuration
  const validation = HubSpotClient.validateApiKey(config.apiKey);
  if (!validation.isValid) {
    throw new Error(`Configuration HubSpot invalide: ${validation.message}`);
  }
  
  console.log('✅ Création du client HubSpot:', validation.message);
  return new HubSpotClient(config);
}

// Instance globale (optionnelle)
let globalClient: HubSpotClient | null = null;

export function getHubSpotClient(): HubSpotClient | null {
  return globalClient;
}

export function setHubSpotClient(client: HubSpotClient | null): void {
  globalClient = client;
}

export { HubSpotClient };
export default HubSpotClient;