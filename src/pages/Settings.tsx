
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
  Mail,
  Phone,
  Globe
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
                    <span className="text-2xl font-bold text-blue-600">{initials}</span>
                  </div>
                  <h3 className="font-semibold">{displayName}</h3>
                  <p className="text-sm text-slate-600">{user?.email}</p>
                </div>
                <Button className="w-full" variant="outline" onClick={handleProfileRedirect}>
                  Modifier le profil
                </Button>
                <Button className="w-full" variant="outline" onClick={handlePasswordChange}>
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
                {settings && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Notifications par email</p>
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
                        <p className="font-medium">Notifications navigateur</p>
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
                <Button className="w-full" variant="destructive" onClick={handleSignOut}>
                  Déconnecter partout
                </Button>
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
            <Card className="lg:col-span-3 border-red-200">
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
