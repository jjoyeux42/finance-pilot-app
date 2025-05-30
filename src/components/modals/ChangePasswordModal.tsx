/**
 * Modal sécurisé pour le changement de mot de passe
 * Implémente les bonnes pratiques de sécurité
 */

import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { validatePassword } from '@/lib/validation';
import { Eye, EyeOff, Shield } from 'lucide-react';

interface ChangePasswordModalProps {
  children: React.ReactNode;
}

export const ChangePasswordModal: React.FC<ChangePasswordModalProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  /**
   * Réinitialise le formulaire
   */
  const resetForm = () => {
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setShowCurrentPassword(false);
    setShowNewPassword(false);
    setShowConfirmPassword(false);
  };

  /**
   * Valide le formulaire de changement de mot de passe
   */
  const validateForm = (): { isValid: boolean; error?: string } => {
    if (!currentPassword.trim()) {
      return { isValid: false, error: 'Le mot de passe actuel est requis' };
    }

    const passwordValidation = validatePassword(newPassword);
    if (!passwordValidation.isValid) {
      return { isValid: false, error: passwordValidation.error };
    }

    if (newPassword !== confirmPassword) {
      return { isValid: false, error: 'Les nouveaux mots de passe ne correspondent pas' };
    }

    if (currentPassword === newPassword) {
      return { isValid: false, error: 'Le nouveau mot de passe doit être différent de l\'actuel' };
    }

    return { isValid: true };
  };

  /**
   * Gère le changement de mot de passe
   */
  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Validation côté client
      const validation = validateForm();
      if (!validation.isValid) {
        toast({
          title: 'Erreur de validation',
          description: validation.error,
          variant: 'destructive',
        });
        return;
      }

      // Vérification du mot de passe actuel en tentant une ré-authentification
      const { data: user } = await supabase.auth.getUser();
      if (!user.user?.email) {
        throw new Error('Utilisateur non authentifié');
      }

      // Tentative de connexion avec le mot de passe actuel pour vérification
      const { error: verificationError } = await supabase.auth.signInWithPassword({
        email: user.user.email,
        password: currentPassword,
      });

      if (verificationError) {
        toast({
          title: 'Erreur de vérification',
          description: 'Le mot de passe actuel est incorrect',
          variant: 'destructive',
        });
        return;
      }

      // Changement du mot de passe
      const { error: updateError } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (updateError) {
        throw updateError;
      }

      toast({
        title: 'Mot de passe modifié',
        description: 'Votre mot de passe a été mis à jour avec succès',
      });

      resetForm();
      setIsOpen(false);

      // Log sécurisé de l'événement
      console.info('Changement de mot de passe réussi:', {
        timestamp: new Date().toISOString(),
        userId: user.user.id,
      });

    } catch (error: any) {
      // Gestion sécurisée des erreurs
      let errorMessage = 'Une erreur inattendue s\'est produite';
      
      if (error.message?.includes('New password should be different')) {
        errorMessage = 'Le nouveau mot de passe doit être différent de l\'actuel';
      } else if (error.message?.includes('Password should be at least')) {
        errorMessage = 'Le mot de passe ne respecte pas les critères de sécurité';
      }

      toast({
        title: 'Erreur',
        description: errorMessage,
        variant: 'destructive',
      });

      // Log sécurisé de l'erreur (sans informations sensibles)
      console.error('Erreur lors du changement de mot de passe:', {
        timestamp: new Date().toISOString(),
        errorType: error.name || 'Unknown',
        // Ne pas logger les détails de l'erreur en production
      });
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Gère la fermeture du modal
   */
  const handleClose = () => {
    if (!isLoading) {
      resetForm();
      setIsOpen(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Shield className="w-5 h-5 text-blue-600" />
            <span>Changer le mot de passe</span>
          </DialogTitle>
          <DialogDescription>
            Saisissez votre mot de passe actuel et choisissez un nouveau mot de passe sécurisé.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handlePasswordChange} className="space-y-4">
          {/* Mot de passe actuel */}
          <div className="space-y-2">
            <Label htmlFor="currentPassword">Mot de passe actuel</Label>
            <div className="relative">
              <Input
                id="currentPassword"
                type={showCurrentPassword ? 'text' : 'password'}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
                disabled={isLoading}
                className="pr-10"
                autoComplete="current-password"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                disabled={isLoading}
              >
                {showCurrentPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          {/* Nouveau mot de passe */}
          <div className="space-y-2">
            <Label htmlFor="newPassword">Nouveau mot de passe</Label>
            <div className="relative">
              <Input
                id="newPassword"
                type={showNewPassword ? 'text' : 'password'}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                disabled={isLoading}
                className="pr-10"
                autoComplete="new-password"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowNewPassword(!showNewPassword)}
                disabled={isLoading}
              >
                {showNewPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            </div>
            <p className="text-xs text-gray-500">
              Le mot de passe doit contenir au moins 8 caractères avec 3 des éléments suivants :
              minuscules, majuscules, chiffres, caractères spéciaux.
            </p>
          </div>

          {/* Confirmation du nouveau mot de passe */}
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirmer le nouveau mot de passe</Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                disabled={isLoading}
                className="pr-10"
                autoComplete="new-password"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                disabled={isLoading}
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          {/* Boutons d'action */}
          <div className="flex justify-end space-x-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isLoading}
            >
              Annuler
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {isLoading ? 'Modification...' : 'Modifier le mot de passe'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};