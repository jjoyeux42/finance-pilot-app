
import React, { useState } from 'react';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { 
  Settings as SettingsIcon, 
  User, 
  Bell, 
  Shield, 
  Database, 
  Download,
  Trash2,
  Link,
  Mail,
  Phone,
  Globe
} from 'lucide-react';

const Settings = () => {
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    sms: true,
    weekly: true
  });

  const [privacy, setPrivacy] = useState({
    dataSharing: false,
    analytics: true,
    marketing: false
  });

  const [integrations, setIntegrations] = useState({
    banking: true,
    accounting: false,
    crm: true
  });

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-white">
        <AppSidebar />
        <main className="flex-1 p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <SidebarTrigger className="lg:hidden" />
              <div>
                <h1 className="text-3xl font-bold text-slate-900">Paramètres</h1>
                <p className="text-slate-600">Gérez vos préférences et configurations</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Profil Utilisateur */}
            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="w-5 h-5" />
                  <span>Profil Utilisateur</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-blue-600">JD</span>
                  </div>
                  <h3 className="font-semibold">John Doe</h3>
                  <p className="text-sm text-slate-600">admin@financepilot.com</p>
                </div>
                <Button className="w-full" variant="outline">
                  Modifier le profil
                </Button>
                <Button className="w-full" variant="outline">
                  Changer le mot de passe
                </Button>
              </CardContent>
            </Card>

            {/* Notifications */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Bell className="w-5 h-5" />
                  <span>Notifications</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Notifications par email</p>
                      <p className="text-sm text-slate-600">Recevez les alertes importantes par email</p>
                    </div>
                    <Switch 
                      checked={notifications.email}
                      onCheckedChange={(checked) => setNotifications({...notifications, email: checked})}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Notifications push</p>
                      <p className="text-sm text-slate-600">Notifications dans le navigateur</p>
                    </div>
                    <Switch 
                      checked={notifications.push}
                      onCheckedChange={(checked) => setNotifications({...notifications, push: checked})}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">SMS d'urgence</p>
                      <p className="text-sm text-slate-600">SMS pour les alertes critiques</p>
                    </div>
                    <Switch 
                      checked={notifications.sms}
                      onCheckedChange={(checked) => setNotifications({...notifications, sms: checked})}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Rapport hebdomadaire</p>
                      <p className="text-sm text-slate-600">Résumé des performances chaque semaine</p>
                    </div>
                    <Switch 
                      checked={notifications.weekly}
                      onCheckedChange={(checked) => setNotifications({...notifications, weekly: checked})}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Sécurité */}
            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="w-5 h-5" />
                  <span>Sécurité</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full" variant="outline">
                  Authentification 2FA
                </Button>
                <Button className="w-full" variant="outline">
                  Sessions actives
                </Button>
                <Button className="w-full" variant="outline">
                  Historique de connexion
                </Button>
                <Button className="w-full" variant="destructive">
                  Déconnecter partout
                </Button>
              </CardContent>
            </Card>

            {/* Confidentialité */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Database className="w-5 h-5" />
                  <span>Confidentialité des données</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Partage de données anonymisées</p>
                      <p className="text-sm text-slate-600">Aide à améliorer nos services</p>
                    </div>
                    <Switch 
                      checked={privacy.dataSharing}
                      onCheckedChange={(checked) => setPrivacy({...privacy, dataSharing: checked})}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Analytics d'utilisation</p>
                      <p className="text-sm text-slate-600">Collecte des statistiques d'usage</p>
                    </div>
                    <Switch 
                      checked={privacy.analytics}
                      onCheckedChange={(checked) => setPrivacy({...privacy, analytics: checked})}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Communications marketing</p>
                      <p className="text-sm text-slate-600">Nouveautés et offres spéciales</p>
                    </div>
                    <Switch 
                      checked={privacy.marketing}
                      onCheckedChange={(checked) => setPrivacy({...privacy, marketing: checked})}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Intégrations */}
            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Link className="w-5 h-5" />
                  <span>Intégrations</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold">Connexions bancaires</h3>
                      <Switch 
                        checked={integrations.banking}
                        onCheckedChange={(checked) => setIntegrations({...integrations, banking: checked})}
                      />
                    </div>
                    <p className="text-sm text-slate-600 mb-4">Synchronisation automatique avec vos comptes bancaires</p>
                    <Button className="w-full" variant="outline">
                      Configurer
                    </Button>
                  </div>
                  
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold">Logiciel comptable</h3>
                      <Switch 
                        checked={integrations.accounting}
                        onCheckedChange={(checked) => setIntegrations({...integrations, accounting: checked})}
                      />
                    </div>
                    <p className="text-sm text-slate-600 mb-4">Import des données comptables</p>
                    <Button className="w-full" variant="outline">
                      Connecter
                    </Button>
                  </div>
                  
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold">CRM</h3>
                      <Switch 
                        checked={integrations.crm}
                        onCheckedChange={(checked) => setIntegrations({...integrations, crm: checked})}
                      />
                    </div>
                    <p className="text-sm text-slate-600 mb-4">Synchronisation des données clients</p>
                    <Button className="w-full" variant="outline">
                      Configurer
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Export et sauvegarde */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Download className="w-5 h-5" />
                  <span>Export et sauvegarde</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Button variant="outline" className="flex items-center space-x-2">
                    <Download className="w-4 h-4" />
                    <span>Exporter les données</span>
                  </Button>
                  <Button variant="outline" className="flex items-center space-x-2">
                    <Database className="w-4 h-4" />
                    <span>Sauvegarde automatique</span>
                  </Button>
                </div>
                <p className="text-sm text-slate-600">
                  Dernière sauvegarde : Aujourd'hui à 14:30
                </p>
              </CardContent>
            </Card>

            {/* Zone dangereuse */}
            <Card className="lg:col-span-1 border-red-200">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-red-600">
                  <Trash2 className="w-5 h-5" />
                  <span>Zone dangereuse</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="destructive" className="w-full">
                  Supprimer le compte
                </Button>
                <p className="text-xs text-slate-500">
                  Cette action est irréversible
                </p>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Settings;
