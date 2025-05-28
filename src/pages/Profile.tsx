
import React, { useState } from 'react';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  User, 
  Camera, 
  Mail, 
  Phone, 
  MapPin, 
  Building, 
  Calendar,
  Edit3
} from 'lucide-react';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'admin@financepilot.com',
    phone: '+33 1 23 45 67 89',
    position: 'Directeur Financier',
    company: 'FinancePilot SARL',
    address: '123 Rue de la Finance, 75001 Paris',
    bio: 'Directeur financier expérimenté avec plus de 10 ans d\'expérience dans le pilotage financier d\'entreprises de croissance.',
    joinDate: '15 janvier 2024'
  });

  const handleSave = () => {
    setIsEditing(false);
    // Ici on sauvegarderait les données
    console.log('Profil sauvegardé:', profile);
  };

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
            <Button 
              onClick={() => isEditing ? handleSave() : setIsEditing(true)}
              className="flex items-center space-x-2"
            >
              <Edit3 className="w-4 h-4" />
              <span>{isEditing ? 'Sauvegarder' : 'Modifier'}</span>
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Photo et informations de base */}
            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle>Photo de profil</CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <div className="relative mx-auto w-32 h-32">
                  <div className="w-32 h-32 rounded-full bg-blue-100 flex items-center justify-center">
                    <span className="text-4xl font-bold text-blue-600">
                      {profile.firstName[0]}{profile.lastName[0]}
                    </span>
                  </div>
                  {isEditing && (
                    <Button 
                      size="sm" 
                      className="absolute bottom-0 right-0 rounded-full w-10 h-10 p-0"
                    >
                      <Camera className="w-4 h-4" />
                    </Button>
                  )}
                </div>
                <div>
                  <h3 className="text-xl font-semibold">{profile.firstName} {profile.lastName}</h3>
                  <p className="text-slate-600">{profile.position}</p>
                  <p className="text-sm text-slate-500">{profile.company}</p>
                </div>
                <div className="flex items-center justify-center space-x-2 text-sm text-slate-500">
                  <Calendar className="w-4 h-4" />
                  <span>Membre depuis le {profile.joinDate}</span>
                </div>
              </CardContent>
            </Card>

            {/* Informations personnelles */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Informations personnelles</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">Prénom</Label>
                    {isEditing ? (
                      <Input
                        id="firstName"
                        value={profile.firstName}
                        onChange={(e) => setProfile({...profile, firstName: e.target.value})}
                      />
                    ) : (
                      <p className="p-2 bg-slate-50 rounded">{profile.firstName}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Nom</Label>
                    {isEditing ? (
                      <Input
                        id="lastName"
                        value={profile.lastName}
                        onChange={(e) => setProfile({...profile, lastName: e.target.value})}
                      />
                    ) : (
                      <p className="p-2 bg-slate-50 rounded">{profile.lastName}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center space-x-2">
                    <Mail className="w-4 h-4" />
                    <span>Email</span>
                  </Label>
                  {isEditing ? (
                    <Input
                      id="email"
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile({...profile, email: e.target.value})}
                    />
                  ) : (
                    <p className="p-2 bg-slate-50 rounded">{profile.email}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="flex items-center space-x-2">
                    <Phone className="w-4 h-4" />
                    <span>Téléphone</span>
                  </Label>
                  {isEditing ? (
                    <Input
                      id="phone"
                      value={profile.phone}
                      onChange={(e) => setProfile({...profile, phone: e.target.value})}
                    />
                  ) : (
                    <p className="p-2 bg-slate-50 rounded">{profile.phone}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="position" className="flex items-center space-x-2">
                    <User className="w-4 h-4" />
                    <span>Poste</span>
                  </Label>
                  {isEditing ? (
                    <Input
                      id="position"
                      value={profile.position}
                      onChange={(e) => setProfile({...profile, position: e.target.value})}
                    />
                  ) : (
                    <p className="p-2 bg-slate-50 rounded">{profile.position}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company" className="flex items-center space-x-2">
                    <Building className="w-4 h-4" />
                    <span>Entreprise</span>
                  </Label>
                  {isEditing ? (
                    <Input
                      id="company"
                      value={profile.company}
                      onChange={(e) => setProfile({...profile, company: e.target.value})}
                    />
                  ) : (
                    <p className="p-2 bg-slate-50 rounded">{profile.company}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address" className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4" />
                    <span>Adresse</span>
                  </Label>
                  {isEditing ? (
                    <Input
                      id="address"
                      value={profile.address}
                      onChange={(e) => setProfile({...profile, address: e.target.value})}
                    />
                  ) : (
                    <p className="p-2 bg-slate-50 rounded">{profile.address}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Biographie</Label>
                  {isEditing ? (
                    <Textarea
                      id="bio"
                      rows={4}
                      value={profile.bio}
                      onChange={(e) => setProfile({...profile, bio: e.target.value})}
                    />
                  ) : (
                    <p className="p-2 bg-slate-50 rounded">{profile.bio}</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Statistiques d'activité */}
            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>Activité sur la plateforme</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <p className="text-2xl font-bold text-blue-600">156</p>
                    <p className="text-sm text-slate-600">Connexions</p>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <p className="text-2xl font-bold text-green-600">23</p>
                    <p className="text-sm text-slate-600">Rapports générés</p>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <p className="text-2xl font-bold text-purple-600">89%</p>
                    <p className="text-sm text-slate-600">Temps d'activité</p>
                  </div>
                  <div className="text-center p-4 bg-orange-50 rounded-lg">
                    <p className="text-2xl font-bold text-orange-600">7</p>
                    <p className="text-sm text-slate-600">Alertes résolues</p>
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
