
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { DollarSign } from 'lucide-react';
<<<<<<< HEAD
=======
import { 
  validateLoginData, 
  validateRegistrationData, 
  sanitizeString 
} from '@/lib/validation';
>>>>>>> 764e393 (feat: Secure Supabase configuration and protect environment variables)

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
<<<<<<< HEAD
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
=======
      // Validation côté client avant envoi
      if (isLogin) {
        const loginValidation = validateLoginData({ email, password });
        if (!loginValidation.isValid) {
          toast({
            title: "Erreur de validation",
            description: loginValidation.error,
            variant: "destructive",
          });
          return;
        }

        const { error } = await supabase.auth.signInWithPassword({
          email: email.trim().toLowerCase(),
>>>>>>> 764e393 (feat: Secure Supabase configuration and protect environment variables)
          password,
        });
        if (error) throw error;
        toast({
          title: "Connexion réussie",
          description: "Vous êtes maintenant connecté.",
        });
      } else {
<<<<<<< HEAD
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              first_name: firstName,
              last_name: lastName,
=======
        // Validation complète pour l'inscription
        const registrationValidation = validateRegistrationData({
          email,
          password,
          firstName,
          lastName
        });
        if (!registrationValidation.isValid) {
          toast({
            title: "Erreur de validation",
            description: registrationValidation.error,
            variant: "destructive",
          });
          return;
        }

        // Nettoyage des données avant envoi
        const cleanFirstName = sanitizeString(firstName);
        const cleanLastName = sanitizeString(lastName);

        const { error } = await supabase.auth.signUp({
          email: email.trim().toLowerCase(),
          password,
          options: {
            data: {
              first_name: cleanFirstName,
              last_name: cleanLastName,
>>>>>>> 764e393 (feat: Secure Supabase configuration and protect environment variables)
            },
          },
        });
        if (error) throw error;
        toast({
          title: "Inscription réussie",
<<<<<<< HEAD
          description: "Votre compte a été créé avec succès.",
        });
      }
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message,
        variant: "destructive",
      });
=======
          description: "Votre compte a été créé avec succès. Vérifiez votre email pour confirmer votre compte.",
        });
      }
    } catch (error: any) {
      // Gestion sécurisée des erreurs - ne pas exposer les détails techniques
      let errorMessage = "Une erreur inattendue s'est produite";
      
      if (error.message?.includes('Invalid login credentials')) {
        errorMessage = "Email ou mot de passe incorrect";
      } else if (error.message?.includes('Email not confirmed')) {
        errorMessage = "Veuillez confirmer votre email avant de vous connecter";
      } else if (error.message?.includes('User already registered')) {
        errorMessage = "Un compte existe déjà avec cette adresse email";
      } else if (error.message?.includes('Password should be at least')) {
        errorMessage = "Le mot de passe ne respecte pas les critères de sécurité";
      }

      toast({
        title: "Erreur d'authentification",
        description: errorMessage,
        variant: "destructive",
      });

      // Log sécurisé pour le débogage (sans informations sensibles)
      console.error('Erreur d\'authentification:', {
        type: isLogin ? 'login' : 'signup',
        timestamp: new Date().toISOString(),
        // Ne pas logger les détails de l'erreur en production
      });
>>>>>>> 764e393 (feat: Secure Supabase configuration and protect environment variables)
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
      <Card className="w-full max-w-md bg-white shadow-xl border-0">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
              <DollarSign className="w-8 h-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl text-gray-900">
            {isLogin ? 'Connexion' : 'Inscription'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAuth} className="space-y-4">
            {!isLogin && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName" className="text-gray-700">Prénom</Label>
                  <Input
                    id="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                    className="bg-white border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <Label htmlFor="lastName" className="text-gray-700">Nom</Label>
                  <Input
                    id="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                    className="bg-white border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>
            )}
            <div>
              <Label htmlFor="email" className="text-gray-700">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-white border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <Label htmlFor="password" className="text-gray-700">Mot de passe</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-white border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <Button 
              type="submit" 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white border-0" 
              disabled={loading}
            >
              {loading ? 'Chargement...' : (isLogin ? 'Se connecter' : "S'inscrire")}
            </Button>
          </form>
          <div className="mt-4 text-center">
            <Button
              variant="link"
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm text-blue-600 hover:text-blue-700"
            >
              {isLogin
                ? "Pas de compte ? S'inscrire"
                : 'Déjà un compte ? Se connecter'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
