
import React from 'react';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useProfile } from '@/hooks/useProfile';
import { useAuth } from '@/hooks/useAuth';
import { 
  User, 
  Camera, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  Activity
} from 'lucide-react';

const Profile = () => {
  const { user } = useAuth();
  const { profile } = useProfile();

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
                <h1 className="text-3xl font-bold text-slate-900">Mon Profil</h1>
                <p className="text-slate-600">Gérez vos informations personnelles</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Photo de profil */}
            <Card className="lg:col-span-1 bg-white border-white shadow-md">
              <CardHeader className="bg-white">
                <CardTitle className="flex items-center space-x-2 text-gray-900">
                  <Camera className="w-5 h-5 text-blue-600" />
                  <span>Photo de profil</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 bg-white">
                <div className="text-center">
                  <div className="w-32 h-32 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                    <span className="text-4xl font-bold text-blue-600">{initials}</span>
                  </div>
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white" variant="outline">
                    Changer la photo
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Informations personnelles */}
            <Card className="lg:col-span-2 bg-white border-white shadow-md">
              <CardHeader className="bg-white">
                <CardTitle className="flex items-center space-x-2 text-gray-900">
                  <User className="w-5 h-5 text-blue-600" />
                  <span>Informations personnelles</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 bg-white">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName" className="text-gray-700">Prénom</Label>
                    <Input 
                      id="firstName" 
                      defaultValue={profile?.first_name || ''} 
                      className="bg-white border-white focus:border-white focus:ring-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName" className="text-gray-700">Nom</Label>
                    <Input 
                      id="lastName" 
                      defaultValue={profile?.last_name || ''} 
                      className="bg-white border-white focus:border-white focus:ring-white"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="email" className="text-gray-700">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    defaultValue={user?.email || ''} 
                    className="bg-white border-white focus:border-white focus:ring-white"
                  />
                </div>
                <div>
                  <Label htmlFor="phone" className="text-gray-700">Téléphone</Label>
                  <Input 
                    id="phone" 
                    className="bg-white border-white focus:border-white focus:ring-white"
                  />
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  Sauvegarder les modifications
                </Button>
              </CardContent>
            </Card>

            {/* Activité sur la plateforme */}
            <Card className="lg:col-span-3 bg-white border-white shadow-md">
              <CardHeader className="bg-white">
                <CardTitle className="flex items-center space-x-2 text-gray-900">
                  <Activity className="w-5 h-5 text-blue-600" />
                  <span>Activité sur la plateforme</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="bg-white">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600">127</div>
                    <p className="text-sm text-slate-600">Transactions créées</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600">45</div>
                    <p className="text-sm text-slate-600">Rapports générés</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600">23</div>
                    <p className="text-sm text-slate-600">Jours d'utilisation</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Profile;
