import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { useHubSpot } from "@/hooks/useHubSpot";
import { 
  Settings, 
  Key, 
  CheckCircle, 
  XCircle, 
  Loader2, 
  RefreshCw,
  Users,
  Building,
  TrendingUp,
  Activity,
  AlertTriangle,
  ExternalLink
} from 'lucide-react';

interface HubSpotConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function HubSpotConfigModal({ isOpen, onClose }: HubSpotConfigModalProps) {
  const { toast } = useToast();
  const {
    isConnected,
    isLoading,
    settings,
    syncStatus,
    connect,
    disconnect,
    testConnection,
    syncAll,
    updateSettings,
  } = useHubSpot();

  const [apiKey, setApiKey] = useState('');
  const [isTestingConnection, setIsTestingConnection] = useState(false);
  const [connectionTestResult, setConnectionTestResult] = useState<boolean | null>(null);

  useEffect(() => {
    if (settings) {
      setApiKey(settings.apiKey || '');
    }
  }, [settings]);

  const handleTestConnection = async () => {
    if (!apiKey.trim()) {
      toast({
        title: "Clé API requise",
        description: "Veuillez saisir votre clé API HubSpot.",
        variant: "destructive",
      });
      return;
    }

    // Validation du format de la clé API
    const validation = (await import('@/integrations/hubspot/client')).HubSpotClient.validateApiKey(apiKey);
    if (!validation.isValid) {
      toast({
        title: "Format de clé API invalide",
        description: validation.message,
        variant: "destructive",
      });
      return;
    }

    setIsTestingConnection(true);
    setConnectionTestResult(null);

    try {
      console.log('🔍 Début du test de connexion HubSpot...');
      const result = await connect(apiKey);
      setConnectionTestResult(result);
      
      if (result) {
        toast({
          title: "Connexion réussie ✅",
          description: "Votre clé API HubSpot fonctionne correctement.",
          variant: "default",
        });
      } else {
        toast({
          title: "Test de connexion échoué",
          description: "Vérifiez que votre clé API est valide et que votre application privée a les bonnes permissions (contacts.read). Consultez la console pour plus de détails.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('❌ Erreur détaillée de connexion HubSpot:', error);
      setConnectionTestResult(false);
      
      let errorMessage = 'Erreur inconnue';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      
      toast({
        title: "Erreur de connexion",
        description: `${errorMessage}. Consultez la console du navigateur pour plus de détails.`,
        variant: "destructive",
      });
    } finally {
      setIsTestingConnection(false);
    }
  };

  const handleDisconnect = async () => {
    try {
      await disconnect();
      setApiKey('');
      setConnectionTestResult(null);
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de déconnecter HubSpot.",
        variant: "destructive",
      });
    }
  };

  const handleSyncFrequencyChange = async (frequency: string) => {
    if (!settings) return;
    
    try {
      await updateSettings({
        syncFrequency: frequency as 'manual' | 'hourly' | 'daily' | 'weekly'
      });
      
      toast({
        title: "Paramètres mis à jour",
        description: "La fréquence de synchronisation a été modifiée.",
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour les paramètres.",
        variant: "destructive",
      });
    }
  };

  const handleSyncOptionChange = async (option: string, enabled: boolean) => {
    if (!settings) return;
    
    try {
      await updateSettings({
        [option]: enabled
      });
      
      toast({
        title: "Paramètres mis à jour",
        description: `Synchronisation ${enabled ? 'activée' : 'désactivée'} pour ${option}.`,
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour les paramètres.",
        variant: "destructive",
      });
    }
  };

  const handleManualSync = async () => {
    try {
      await syncAll();
    } catch (error) {
      toast({
        title: "Erreur de synchronisation",
        description: "Impossible de synchroniser les données.",
        variant: "destructive",
      });
    }
  };

  const getStatusBadge = () => {
    if (isConnected) {
      return (
        <Badge className="bg-green-100 text-green-800 border-green-200">
          <CheckCircle className="w-3 h-3 mr-1" />
          Connecté
        </Badge>
      );
    } else {
      return (
        <Badge className="bg-red-100 text-red-800 border-red-200">
          <XCircle className="w-3 h-3 mr-1" />
          Déconnecté
        </Badge>
      );
    }
  };

  const getSyncStatusBadge = () => {
    if (!syncStatus) return null;
    
    switch (syncStatus.status) {
      case 'success':
        return (
          <Badge className="bg-green-100 text-green-800 border-green-200">
            <CheckCircle className="w-3 h-3 mr-1" />
            Succès
          </Badge>
        );
      case 'error':
        return (
          <Badge className="bg-red-100 text-red-800 border-red-200">
            <XCircle className="w-3 h-3 mr-1" />
            Erreur
          </Badge>
        );
      case 'in_progress':
        return (
          <Badge className="bg-blue-100 text-blue-800 border-blue-200">
            <Loader2 className="w-3 h-3 mr-1 animate-spin" />
            En cours
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl bg-white max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2 text-gray-900">
            <Settings className="w-5 h-5 text-orange-600" />
            <span>Configuration HubSpot</span>
            {getStatusBadge()}
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            Configurez votre intégration HubSpot pour synchroniser vos données CRM.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Connection Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-lg">
                <Key className="w-4 h-4 text-blue-600" />
                <span>Connexion</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="apiKey" className="text-gray-700">
                  Clé API HubSpot
                </Label>
                <Input
                  id="apiKey"
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="Saisissez votre clé API HubSpot"
                  className="bg-white border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  disabled={isConnected}
                />
                <p className="text-xs text-gray-500">
                  Vous pouvez obtenir votre clé API dans les paramètres de votre compte HubSpot.
                  <a 
                    href="https://knowledge.hubspot.com/integrations/how-do-i-get-my-hubspot-api-key" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 ml-1 inline-flex items-center"
                  >
                    En savoir plus
                    <ExternalLink className="w-3 h-3 ml-1" />
                  </a>
                </p>
              </div>

              <div className="flex space-x-2">
                {!isConnected ? (
                  <Button
                    onClick={handleTestConnection}
                    disabled={isTestingConnection || !apiKey.trim()}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    {isTestingConnection ? (
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    ) : (
                      <CheckCircle className="w-4 h-4 mr-2" />
                    )}
                    {isTestingConnection ? 'Test en cours...' : 'Tester et connecter'}
                  </Button>
                ) : (
                  <Button
                    onClick={handleDisconnect}
                    variant="destructive"
                    className="bg-red-600 hover:bg-red-700 text-white"
                  >
                    <XCircle className="w-4 h-4 mr-2" />
                    Déconnecter
                  </Button>
                )}
              </div>

              {connectionTestResult !== null && (
                <div className={`p-3 rounded-lg ${connectionTestResult ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                  <div className="flex items-center space-x-2">
                    {connectionTestResult ? (
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    ) : (
                      <XCircle className="w-4 h-4 text-red-600" />
                    )}
                    <span className={`text-sm ${connectionTestResult ? 'text-green-800' : 'text-red-800'}`}>
                      {connectionTestResult 
                        ? 'Connexion réussie ! HubSpot est maintenant connecté.' 
                        : 'Échec de la connexion. Vérifiez votre clé API.'}
                    </span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Sync Settings */}
          {isConnected && settings && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-lg">
                  <RefreshCw className="w-4 h-4 text-green-600" />
                  <span>Paramètres de synchronisation</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-gray-700">Fréquence de synchronisation</Label>
                  <Select
                    value={settings.syncFrequency}
                    onValueChange={handleSyncFrequencyChange}
                  >
                    <SelectTrigger className="bg-white border-gray-300">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="manual">Manuel</SelectItem>
                      <SelectItem value="hourly">Toutes les heures</SelectItem>
                      <SelectItem value="daily">Quotidienne</SelectItem>
                      <SelectItem value="weekly">Hebdomadaire</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Separator />

                <div className="space-y-3">
                  <Label className="text-gray-700">Données à synchroniser</Label>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4 text-blue-600" />
                      <span className="text-sm">Contacts</span>
                    </div>
                    <Switch
                      checked={settings.syncContacts}
                      onCheckedChange={(checked) => handleSyncOptionChange('syncContacts', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Building className="w-4 h-4 text-purple-600" />
                      <span className="text-sm">Entreprises</span>
                    </div>
                    <Switch
                      checked={settings.syncCompanies}
                      onCheckedChange={(checked) => handleSyncOptionChange('syncCompanies', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="w-4 h-4 text-green-600" />
                      <span className="text-sm">Affaires</span>
                    </div>
                    <Switch
                      checked={settings.syncDeals}
                      onCheckedChange={(checked) => handleSyncOptionChange('syncDeals', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Activity className="w-4 h-4 text-orange-600" />
                      <span className="text-sm">Activités</span>
                    </div>
                    <Switch
                      checked={settings.syncActivities}
                      onCheckedChange={(checked) => handleSyncOptionChange('syncActivities', checked)}
                    />
                  </div>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-700">Synchronisation manuelle</p>
                    <p className="text-xs text-gray-500">Synchroniser maintenant toutes les données sélectionnées</p>
                  </div>
                  <Button
                    onClick={handleManualSync}
                    disabled={isLoading}
                    variant="outline"
                    className="border-blue-300 text-blue-600 hover:bg-blue-50"
                  >
                    {isLoading ? (
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    ) : (
                      <RefreshCw className="w-4 h-4 mr-2" />
                    )}
                    {isLoading ? 'Synchronisation...' : 'Synchroniser'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Sync Status */}
          {syncStatus && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-lg">
                  <Activity className="w-4 h-4 text-blue-600" />
                  <span>Statut de synchronisation</span>
                  {getSyncStatusBadge()}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Dernière synchronisation :</span>
                  <span className="text-gray-900">
                    {new Date(syncStatus.lastSync).toLocaleString('fr-FR')}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Enregistrements synchronisés :</span>
                  <span className="text-gray-900">{syncStatus.recordsSynced}</span>
                </div>
                {syncStatus.errors && syncStatus.errors.length > 0 && (
                  <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <AlertTriangle className="w-4 h-4 text-red-600" />
                      <span className="text-sm font-medium text-red-800">Erreurs détectées :</span>
                    </div>
                    <ul className="text-xs text-red-700 space-y-1">
                      {syncStatus.errors.map((error, index) => (
                        <li key={index}>• {error}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>

        <div className="flex justify-end space-x-2 pt-4 border-t">
          <Button
            onClick={onClose}
            variant="outline"
            className="border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            Fermer
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}