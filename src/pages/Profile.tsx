
import React, { useState, useEffect } from 'react';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useProfile } from '@/hooks/useProfile';
import { useAuth } from '@/hooks/useAuth';
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
  const { user } = useAuth();
  const { profile, updateProfile, isUpdating } = useProfile();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    position: '',
    company: '',
    address: '',
    bio: '',
  });

  useEffect(() => {
    if (profile) {
      setFormData({
        first_name: profile.first_name || '',
        last_name: profile.last_name || '',
        email: profile.email || '',
        phone: profile.phone || '',
        position: profile.position || '',
        company: profile.company || '',
        address: profile.address || '',
        bio: profile.bio || '',
      });
    }
  }, [profile]);

  const handleSave = () => {
    updateProfile(formData);
    setIsEditing(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Chargement du profil...</div>
      </div>
    );
  }

  const joinDate = user?.created_at ? new Date(user.created_at).toLocaleDateString('fr-FR') : 'Non disponible';

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
              disabled={isUpdating}
              className="flex items-center space-x-2"
            >
              <Edit3 className="w-4 h-4" />
              <span>{isUpdating ? 'Sauvegarde...' : (isEditing ? 'Sauvegarder' : 'Modifier')}</span>
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
                      {(formData.first_name?.[0] || 'U')}{(formData.last_name?.[0] || '')}
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
                  <h3 className="text-xl font-semibold">{formData.first_name} {formData.last_name}</h3>
                  <p className="text-slate-600">{formData.position || 'Poste non renseigné'}</p>
                  <p className="text-sm text-slate-500">{formData.company || 'Entreprise non renseignée'}</p>
                </div>
                <div className="flex items-center justify-center space-x-2 text-sm text-slate-500">
                  <Calendar className="w-4 h-4" />
                  <span>Membre depuis le {joinDate}</span>
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
                        value={formData.first_name}
                        onChange={(e) => handleInputChange('first_name', e.target.value)}
                      />
                    ) : (
                      <p className="p-2 bg-slate-50 rounded">{formData.first_name || 'Non renseigné'}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Nom</Label>
                    {isEditing ? (
                      <Input
                        id="lastName"
                        value={formData.last_name}
                        onChange={(e) => handleInputChange('last_name', e.target.value)}
                      />
                    ) : (
                      <p className="p-2 bg-slate-50 rounded">{formData.last_name || 'Non renseigné'}</p>
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
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                    />
                  ) : (
                    <p className="p-2 bg-slate-50 rounded">{formData.email || 'Non renseigné'}</p>
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
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                    />
                  ) : (
                    <p className="p-2 bg-slate-50 rounded">{formData.phone || 'Non renseigné'}</p>
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
                      value={formData.position}
                      onChange={(e) => handleInputChange('position', e.target.value)}
                    />
                  ) : (
                    <p className="p-2 bg-slate-50 rounded">{formData.position || 'Non renseigné'}</p>
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
                      value={formData.company}
                      onChange={(e) => handleInputChange('company', e.target.value)}
                    />
                  ) : (
                    <p className="p-2 bg-slate-50 rounded">{formData.company || 'Non renseigné'}</p>
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
                      value={formData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                    />
                  ) : (
                    <p className="p-2 bg-slate-50 rounded">{formData.address || 'Non renseigné'}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Biographie</Label>
                  {isEditing ? (
                    <Textarea
                      id="bio"
                      rows={4}
                      value={formData.bio}
                      onChange={(e) => handleInputChange('bio', e.target.value)}
                    />
                  ) : (
                    <p className="p-2 bg-slate-50 rounded">{formData.bio || 'Non renseigné'}</p>
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
