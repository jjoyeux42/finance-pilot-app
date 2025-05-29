
import React from 'react';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { useSettings } from '@/hooks/useSettings';
import { useProfile } from '@/hooks/useProfile';
import { useAuth } from '@/hooks/useAuth';
import { 
  Settings as SettingsIcon, 
  User, 
  Bell, 
  Shield, 
  Database, 
  Download,
  Trash2,
  Link,
  Unlink,
  CreditCard,
  Building,
  FileSpreadsheet
} from 'lucide-react';

const Settings = () => {
  const { user, signOut } = useAuth();
  const { profile } = useProfile();
  const { settings, updateSettings, isUpdating } = useSettings();

  const handleNotificationChange = (key: string, value: boolean) => {
    if (settings) {
      const updates = { [key]: value };
      updateSettings(updates);
    }
  };

  const handleProfileRedirect = () => {
    window.location.href = '/profile';
  };

  const handlePasswordChange = () => {
    // Redirect to change password functionality
    console.log('Redirection vers changement de mot de passe');
  };

  const handleSignOut = async () => {
    await signOut();
  };

  const displayName = profile?.first_name && profile?.last_name 
    ? `${profile.first_name} ${profile.last_name}`
    : 'Utilisateur';

  const initials = profile?.first_name && profile?.last_name
    ? `${profile.first_name[0]}${profile.last_name[0]}`
    : user?.email?.[0]?.toUpperCase() || 'U';

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
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
            <Card className="lg:col-span-1 bg-white border-gray-200 shadow-md">
              <CardHeader className="bg-white">
                <CardTitle className="flex items-center space-x-2 text-gray-900">
                  <User className="w-5 h-5 text-blue-600" />
                  <span>Profil Utilisateur</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 bg-white">
                <div className="text-center">
                  <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-blue-600">{initials}</span>
                  </div>
                  <h3 className="font-semibold text-gray-900">{displayName}</h3>
                  <p className="text-sm text-slate-600">{user?.email}</p>
                </div>
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white" variant="outline" onClick={handleProfileRedirect}>
                  Modifier le profil
                </Button>
                <Button className="w-full bg-gray-600 hover:bg-gray-700 text-white" variant="outline" onClick={handlePasswordChange}>
                  Changer le mot de passe
                </Button>
              </CardContent>
            </Card>

            {/* Notifications */}
            <Card className="lg:col-span-2 bg-white border-gray-200 shadow-md">
              <CardHeader className="bg-white">
                <CardTitle className="flex items-center space-x-2 text-gray-900">
                  <Bell className="w-5 h-5 text-blue-600" />
                  <span>Notifications</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 bg-white">
                {settings && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900">Notifications par email</p>
                        <p className="text-sm text-slate-600">Recevez les alertes importantes par email</p>
                      </div>
                      <Switch 
                        checked={settings.notifications_email}
                        onCheckedChange={(checked) => handleNotificationChange('notifications_email', checked)}
                        disabled={isUpdating}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900">Notifications navigateur</p>
                        <p className="text-sm text-slate-600">Notifications dans le navigateur</p>
                      </div>
                      <Switch 
                        checked={settings.notifications_browser}
                        onCheckedChange={(checked) => handleNotificationChange('notifications_browser', checked)}
                        disabled={isUpdating}
                      />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Connexions externes */}
            <Card className="lg:col-span-3 bg-white border-gray-200 shadow-md">
              <CardHeader className="bg-white">
                <CardTitle className="flex items-center space-x-2 text-gray-900">
                  <Link className="w-5 h-5 text-blue-600" />
                  <span>Connexions externes</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 bg-white">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="p-4 border rounded-lg space-y-3">
                    <div className="flex items-center space-x-3">
                      <CreditCard className="w-6 h-6 text-blue-600" />
                      <div>
                        <h4 className="font-medium text-gray-900">Banque</h4>
                        <p className="text-sm text-gray-600">Non connecté</p>
                      </div>
                    </div>
                    <Button size="sm" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                      Connecter
                    </Button>
                  </div>

                  <div className="p-4 border rounded-lg space-y-3">
                    <div className="flex items-center space-x-3">
                      <Building className="w-6 h-6 text-green-600" />
                      <div>
                        <h4 className="font-medium text-gray-900">CRM</h4>
                        <p className="text-sm text-gray-600">Connecté</p>
                      </div>
                    </div>
                    <Button size="sm" variant="outline" className="w-full">
                      <Unlink className="w-4 h-4 mr-2" />
                      Déconnecter
                    </Button>
                  </div>

                  <div className="p-4 border rounded-lg space-y-3">
                    <div className="flex items-center space-x-3">
                      <FileSpreadsheet className="w-6 h-6 text-purple-600" />
                      <div>
                        <h4 className="font-medium text-gray-900">ERP</h4>
                        <p className="text-sm text-gray-600">Non connecté</p>
                      </div>
                    </div>
                    <Button size="sm" className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                      Connecter
                    </Button>
                  </div>

                  <div className="p-4 border rounded-lg space-y-3">
                    <div className="flex items-center space-x-3">
                      <Database className="w-6 h-6 text-orange-600" />
                      <div>
                        <h4 className="font-medium text-gray-900">Comptabilité</h4>
                        <p className="text-sm text-gray-600">Non connecté</p>
                      </div>
                    </div>
                    <Button size="sm" className="w-full bg-orange-600 hover:bg-orange-700 text-white">
                      Connecter
                    </Button>
                  </div>

                  <div className="p-4 border rounded-lg space-y-3">
                    <div className="flex items-center space-x-3">
                      <Link className="w-6 h-6 text-indigo-600" />
                      <div>
                        <h4 className="font-medium text-gray-900">E-commerce</h4>
                        <p className="text-sm text-gray-600">Connecté</p>
                      </div>
                    </div>
                    <Button size="sm" variant="outline" className="w-full">
                      <Unlink className="w-4 h-4 mr-2" />
                      Déconnecter
                    </Button>
                  </div>

                  <div className="p-4 border rounded-lg space-y-3">
                    <div className="flex items-center space-x-3">
                      <Database className="w-6 h-6 text-teal-600" />
                      <div>
                        <h4 className="font-medium text-gray-900">Analytics</h4>
                        <p className="text-sm text-gray-600">Non connecté</p>
                      </div>
                    </div>
                    <Button size="sm" className="w-full bg-teal-600 hover:bg-teal-700 text-white">
                      Connecter
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Sécurité */}
            <Card className="lg:col-span-1 bg-white border-gray-200 shadow-md">
              <CardHeader className="bg-white">
                <CardTitle className="flex items-center space-x-2 text-gray-900">
                  <Shield className="w-5 h-5 text-blue-600" />
                  <span>Sécurité</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 bg-white">
                <Button className="w-full bg-gray-600 hover:bg-gray-700 text-white" variant="outline">
                  Authentification 2FA
                </Button>
                <Button className="w-full bg-gray-600 hover:bg-gray-700 text-white" variant="outline">
                  Sessions actives
                </Button>
                <Button className="w-full bg-gray-600 hover:bg-gray-700 text-white" variant="outline">
                  Historique de connexion
                </Button>
                <Button className="w-full bg-red-600 hover:bg-red-700 text-white" variant="destructive" onClick={handleSignOut}>
                  Déconnecter partout
                </Button>
              </CardContent>
            </Card>

            {/* Export et sauvegarde */}
            <Card className="lg:col-span-2 bg-white border-gray-200 shadow-md">
              <CardHeader className="bg-white">
                <CardTitle className="flex items-center space-x-2 text-gray-900">
                  <Download className="w-5 h-5 text-blue-600" />
                  <span>Export et sauvegarde</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 bg-white">
                <div className="grid grid-cols-2 gap-4">
                  <Button variant="outline" className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white border-0">
                    <Download className="w-4 h-4" />
                    <span>Exporter les données</span>
                  </Button>
                  <Button variant="outline" className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white border-0">
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
            <Card className="lg:col-span-3 border-red-200 bg-white shadow-md">
              <CardHeader className="bg-white">
                <CardTitle className="flex items-center space-x-2 text-red-600">
                  <Trash2 className="w-5 h-5" />
                  <span>Zone dangereuse</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 bg-white">
                <Button variant="destructive" className="w-full bg-red-600 hover:bg-red-700">
                  Supprimer le compte
                </Button>
                <p className="text-xs text-slate-500">
                  Cette action est irréversible
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Copyright */}
          <div className="text-center text-sm text-gray-500 mt-8 pt-8 border-t">
            © 2025 FinancePilot. Tous droits réservés.
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Settings;
