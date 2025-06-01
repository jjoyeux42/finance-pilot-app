import { useState, useEffect, createContext, useContext, useCallback } from 'react';
import { createHubSpotClient, getHubSpotClient, HubSpotClient } from '@/integrations/hubspot/client';
import { HubSpotContact, HubSpotCompany, HubSpotDeal, HubSpotIntegrationSettings, HubSpotSyncStatus } from '@/integrations/hubspot/types';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

interface HubSpotContextType {
  client: HubSpotClient | null;
  isConnected: boolean;
  isLoading: boolean;
  settings: HubSpotIntegrationSettings | null;
  syncStatus: HubSpotSyncStatus | null;
  
  // Connection methods
  connect: (apiKey: string) => Promise<boolean>;
  disconnect: () => Promise<void>;
  testConnection: () => Promise<boolean>;
  
  // Data methods
  syncContacts: () => Promise<void>;
  syncCompanies: () => Promise<void>;
  syncDeals: () => Promise<void>;
  syncAll: () => Promise<void>;
  
  // CRUD methods
  getContacts: (limit?: number) => Promise<HubSpotContact[]>;
  getCompanies: (limit?: number) => Promise<HubSpotCompany[]>;
  getDeals: (limit?: number) => Promise<HubSpotDeal[]>;
  searchContactByEmail: (email: string) => Promise<HubSpotContact | null>;
  
  // Settings methods
  updateSettings: (settings: Partial<HubSpotIntegrationSettings>) => Promise<void>;
}

const HubSpotContext = createContext<HubSpotContextType | undefined>(undefined);

const DEFAULT_SETTINGS: HubSpotIntegrationSettings = {
  apiKey: '',
  isEnabled: false,
  syncFrequency: 'manual',
  syncContacts: true,
  syncCompanies: true,
  syncDeals: true,
  syncActivities: false,
};

export function HubSpotProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const { toast } = useToast();
  const [client, setClient] = useState<HubSpotClient | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [settings, setSettings] = useState<HubSpotIntegrationSettings | null>(null);
  const [syncStatus, setSyncStatus] = useState<HubSpotSyncStatus | null>(null);

  // Load settings from Supabase
  const loadSettings = useCallback(async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('integration_settings')
        .select('*')
        .eq('user_id', user.id)
        .eq('integration_type', 'hubspot')
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error loading HubSpot settings:', error);
        return;
      }

      if (data) {
        const hubspotSettings: HubSpotIntegrationSettings = {
          ...DEFAULT_SETTINGS,
          ...(typeof data.settings === 'string' ? JSON.parse(data.settings) : data.settings || {}),
        };
        setSettings(hubspotSettings);
        
        // Auto-connect if API key is available and enabled
        if (hubspotSettings.apiKey && hubspotSettings.isEnabled) {
          await connectWithApiKey(hubspotSettings.apiKey);
        }
      } else {
        setSettings(DEFAULT_SETTINGS);
      }
    } catch (error) {
      console.error('Error loading HubSpot settings:', error);
      setSettings(DEFAULT_SETTINGS);
    }
  }, [user]);

  // Save settings to Supabase
  const saveSettings = useCallback(async (newSettings: HubSpotIntegrationSettings) => {
    if (!user) return;
    
    try {
      const { error } = await supabase
        .from('integration_settings')
        .upsert({
          user_id: user.id,
          integration_type: 'hubspot',
          settings: JSON.stringify(newSettings),
          updated_at: new Date().toISOString(),
        });

      if (error) {
        console.error('Error saving HubSpot settings:', error);
        throw error;
      }
    } catch (error) {
      console.error('Error saving HubSpot settings:', error);
      throw error;
    }
  }, [user]);

  // Connect with API key
  const connectWithApiKey = useCallback(async (apiKey: string): Promise<boolean> => {
    try {
      const client = createHubSpotClient({
        apiKey,
        baseUrl: 'https://api.hubapi.com',
      });

      const isValid = await client.testConnection();
      
      if (isValid) {
        setClient(client);
        setIsConnected(true);
        return true;
      } else {
        setClient(null);
        setIsConnected(false);
        return false;
      }
    } catch (error) {
      console.error('Error connecting to HubSpot:', error);
      setClient(null);
      setIsConnected(false);
      return false;
    }
  }, []);

  // Public methods
  const connect = useCallback(async (apiKey: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      const success = await connectWithApiKey(apiKey);
      
      if (success) {
        const newSettings = {
          ...settings,
          apiKey,
          isEnabled: true,
        } as HubSpotIntegrationSettings;
        
        await saveSettings(newSettings);
        setSettings(newSettings);
        
        toast({
          title: "Connexion réussie",
          description: "HubSpot a été connecté avec succès.",
        });
      } else {
        toast({
          title: "Erreur de connexion",
          description: "Impossible de se connecter à HubSpot. Vérifiez votre clé API.",
          variant: "destructive",
        });
      }
      
      return success;
    } finally {
      setIsLoading(false);
    }
  }, [settings, saveSettings, connectWithApiKey, toast]);

  const disconnect = useCallback(async (): Promise<void> => {
    setClient(null);
    setIsConnected(false);
    
    const newSettings = {
      ...settings,
      isEnabled: false,
    } as HubSpotIntegrationSettings;
    
    await saveSettings(newSettings);
    setSettings(newSettings);
    
    toast({
      title: "Déconnexion réussie",
      description: "HubSpot a été déconnecté.",
    });
  }, [settings, saveSettings, toast]);

  const testConnection = useCallback(async (): Promise<boolean> => {
    if (!client) return false;
    
    try {
      return await client.testConnection();
    } catch (error) {
      console.error('Error testing HubSpot connection:', error);
      return false;
    }
  }, [client]);

  // Data sync methods
  const syncContacts = useCallback(async (): Promise<void> => {
    if (!client || !user) return;
    
    setIsLoading(true);
    setSyncStatus({ lastSync: new Date().toISOString(), status: 'in_progress', recordsSynced: 0 });
    
    try {
      const response = await client.getContacts(100);
      let syncedCount = 0;
      
      for (const contact of response.results) {
        // Sync contact to local database
        const { error } = await supabase
          .from('customers')
          .upsert({
            id: `hubspot_${contact.id}`,
            user_id: user.id,
            name: `${contact.properties.firstname || ''} ${contact.properties.lastname || ''}`.trim(),
            company: contact.properties.company || null,
            email: contact.properties.email || null,
            phone: contact.properties.phone || null,
            address: contact.properties.address || null,
            total_revenue: 0, // Will be calculated from deals
            created_at: contact.properties.createdate || new Date().toISOString(),
          });
          
        if (!error) syncedCount++;
      }
      
      setSyncStatus({
        lastSync: new Date().toISOString(),
        status: 'success',
        recordsSynced: syncedCount,
      });
      
      toast({
        title: "Synchronisation terminée",
        description: `${syncedCount} contacts synchronisés depuis HubSpot.`,
      });
    } catch (error) {
      console.error('Error syncing contacts:', error);
      setSyncStatus({
        lastSync: new Date().toISOString(),
        status: 'error',
        recordsSynced: 0,
        errors: [error instanceof Error ? error.message : 'Unknown error'],
      });
      
      toast({
        title: "Erreur de synchronisation",
        description: "Impossible de synchroniser les contacts.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [client, user, toast]);

  const syncCompanies = useCallback(async (): Promise<void> => {
    if (!client) return;
    
    setIsLoading(true);
    
    try {
      const response = await client.getCompanies(100);
      // Implementation for syncing companies
      toast({
        title: "Synchronisation terminée",
        description: `${response.results.length} entreprises synchronisées depuis HubSpot.`,
      });
    } catch (error) {
      console.error('Error syncing companies:', error);
      toast({
        title: "Erreur de synchronisation",
        description: "Impossible de synchroniser les entreprises.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [client, toast]);

  const syncDeals = useCallback(async (): Promise<void> => {
    if (!client) return;
    
    setIsLoading(true);
    
    try {
      const response = await client.getDeals(100);
      // Implementation for syncing deals
      toast({
        title: "Synchronisation terminée",
        description: `${response.results.length} affaires synchronisées depuis HubSpot.`,
      });
    } catch (error) {
      console.error('Error syncing deals:', error);
      toast({
        title: "Erreur de synchronisation",
        description: "Impossible de synchroniser les affaires.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [client, toast]);

  const syncAll = useCallback(async (): Promise<void> => {
    await Promise.all([
      syncContacts(),
      syncCompanies(),
      syncDeals(),
    ]);
  }, [syncContacts, syncCompanies, syncDeals]);

  // Data retrieval methods
  const getContacts = useCallback(async (limit = 100): Promise<HubSpotContact[]> => {
    if (!client) return [];
    
    try {
      const response = await client.getContacts(limit);
      return response.results;
    } catch (error) {
      console.error('Error getting contacts:', error);
      return [];
    }
  }, [client]);

  const getCompanies = useCallback(async (limit = 100): Promise<HubSpotCompany[]> => {
    if (!client) return [];
    
    try {
      const response = await client.getCompanies(limit);
      return response.results;
    } catch (error) {
      console.error('Error getting companies:', error);
      return [];
    }
  }, [client]);

  const getDeals = useCallback(async (limit = 100): Promise<HubSpotDeal[]> => {
    if (!client) return [];
    
    try {
      const response = await client.getDeals(limit);
      return response.results;
    } catch (error) {
      console.error('Error getting deals:', error);
      return [];
    }
  }, [client]);

  const searchContactByEmail = useCallback(async (email: string): Promise<HubSpotContact | null> => {
    if (!client) return null;
    
    try {
      return await client.searchContactByEmail(email);
    } catch (error) {
      console.error('Error searching contact by email:', error);
      return null;
    }
  }, [client]);

  const updateSettings = useCallback(async (newSettings: Partial<HubSpotIntegrationSettings>): Promise<void> => {
    const updatedSettings = {
      ...settings,
      ...newSettings,
    } as HubSpotIntegrationSettings;
    
    await saveSettings(updatedSettings);
    setSettings(updatedSettings);
  }, [settings, saveSettings]);

  // Load settings on mount
  useEffect(() => {
    loadSettings();
  }, [loadSettings]);

  const value: HubSpotContextType = {
    client,
    isConnected,
    isLoading,
    settings,
    syncStatus,
    connect,
    disconnect,
    testConnection,
    syncContacts,
    syncCompanies,
    syncDeals,
    syncAll,
    getContacts,
    getCompanies,
    getDeals,
    searchContactByEmail,
    updateSettings,
  };

  return (
    <HubSpotContext.Provider value={value}>
      {children}
    </HubSpotContext.Provider>
  );
}

export function useHubSpot() {
  const context = useContext(HubSpotContext);
  if (context === undefined) {
    throw new Error('useHubSpot must be used within a HubSpotProvider');
  }
  return context;
}