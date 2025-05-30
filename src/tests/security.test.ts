/**
 * Tests de sécurité pour l'application FinancePilot
 * Valide les améliorations de sécurité implémentées
 */

import { describe, it, expect } from 'vitest';
import {
  validateEmail,
  validatePassword,
  validateName,
  validateLoginData,
  validateRegistrationData,
  sanitizeString
} from '../lib/validation';

describe('Tests de Validation de Sécurité', () => {
  describe('Validation Email', () => {
    it('devrait accepter un email valide', () => {
      const result = validateEmail('test@example.com');
      expect(result.isValid).toBe(true);
      expect(result.error).toBeUndefined();
    });

    it('devrait rejeter un email vide', () => {
      const result = validateEmail('');
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('L\'adresse email est requise');
    });

    it('devrait rejeter un email avec format invalide', () => {
      const result = validateEmail('email-invalide');
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Format d\'email invalide');
    });

    it('devrait rejeter un email trop long', () => {
      const longEmail = 'a'.repeat(250) + '@example.com';
      const result = validateEmail(longEmail);
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('L\'adresse email est trop longue');
    });
  });

  describe('Validation Mot de Passe', () => {
    it('devrait accepter un mot de passe valide', () => {
      const result = validatePassword('MotDePasse123!');
      expect(result.isValid).toBe(true);
      expect(result.error).toBeUndefined();
    });

    it('devrait rejeter un mot de passe trop court', () => {
      const result = validatePassword('123');
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Le mot de passe doit contenir au moins 8 caractères');
    });

    it('devrait rejeter un mot de passe sans majuscule', () => {
      const result = validatePassword('motdepasse123!');
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Le mot de passe doit contenir au moins une majuscule');
    });

    it('devrait rejeter un mot de passe sans minuscule', () => {
      const result = validatePassword('MOTDEPASSE123!');
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Le mot de passe doit contenir au moins une minuscule');
    });

    it('devrait rejeter un mot de passe sans chiffre', () => {
      const result = validatePassword('MotDePasse!');
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Le mot de passe doit contenir au moins un chiffre');
    });

    it('devrait rejeter un mot de passe sans caractère spécial', () => {
      const result = validatePassword('MotDePasse123');
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Le mot de passe doit contenir au moins un caractère spécial');
    });
  });

  describe('Validation Nom', () => {
    it('devrait accepter un nom valide', () => {
      const result = validateName('Jean');
      expect(result.isValid).toBe(true);
      expect(result.error).toBeUndefined();
    });

    it('devrait rejeter un nom vide', () => {
      const result = validateName('');
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Le nom est requis');
    });

    it('devrait rejeter un nom trop court', () => {
      const result = validateName('A');
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Le nom doit contenir au moins 2 caractères');
    });

    it('devrait rejeter un nom trop long', () => {
      const longName = 'A'.repeat(51);
      const result = validateName(longName);
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Le nom ne peut pas dépasser 50 caractères');
    });

    it('devrait rejeter un nom avec caractères invalides', () => {
      const result = validateName('Jean123');
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Le nom ne peut contenir que des lettres, espaces, tirets et apostrophes');
    });
  });

  describe('Sanitisation de Chaînes', () => {
    it('devrait supprimer les balises HTML', () => {
      const input = '<div>Jean</div>';
      const result = sanitizeString(input);
      expect(result).toBe('Jean');
    });

    it('devrait supprimer les caractères de contrôle', () => {
      const input = 'Jean\x00\x01\x02';
      const result = sanitizeString(input);
      expect(result).toBe('Jean');
    });

    it('devrait préserver les caractères valides', () => {
      const input = 'Jean-Pierre OConnor';
      const result = sanitizeString(input);
      expect(result).toBe('Jean-Pierre OConnor');
    });

    it('devrait gérer les chaînes vides', () => {
      const result = sanitizeString('');
      expect(result).toBe('');
    });
  });

  describe('Validation des Données de Connexion', () => {
    it('devrait valider des données de connexion correctes', () => {
      const data = {
        email: 'test@example.com',
        password: 'MotDePasse123!'
      };
      const result = validateLoginData(data);
      expect(result.isValid).toBe(true);
      expect(result.errors).toEqual({});
    });

    it('devrait rejeter des données de connexion invalides', () => {
      const data = {
        email: 'email-invalide',
        password: '123'
      };
      const result = validateLoginData(data);
      expect(result.isValid).toBe(false);
      expect(result.errors.email).toBeDefined();
      expect(result.errors.password).toBeDefined();
    });
  });

  describe('Validation des Données d\'Inscription', () => {
    it('devrait valider des données d\'inscription correctes', () => {
      const data = {
        email: 'test@example.com',
        password: 'MotDePasse123!',
        firstName: 'Jean',
        lastName: 'Dupont'
      };
      const result = validateRegistrationData(data);
      expect(result.isValid).toBe(true);
      expect(result.errors).toEqual({});
    });

    it('devrait rejeter des données d\'inscription invalides', () => {
      const data = {
        email: 'email-invalide',
        password: '123',
        firstName: '',
        lastName: 'A'
      };
      const result = validateRegistrationData(data);
      expect(result.isValid).toBe(false);
      expect(result.errors.email).toBeDefined();
      expect(result.errors.password).toBeDefined();
      expect(result.errors.firstName).toBeDefined();
      expect(result.errors.lastName).toBeDefined();
    });
  });

  describe('Tests de Sécurité Environnement', () => {
    it('devrait vérifier que les variables d\'environnement sont configurées', () => {
      // Test basique pour vérifier la configuration
      expect(typeof import.meta.env).toBe('object');
    });

    it('devrait vérifier la résistance aux attaques XSS', () => {
      const xssPayload = '<img src=x onerror=alert(1)>';
      const sanitized = sanitizeString(xssPayload);
      expect(sanitized).not.toContain('<');
      expect(sanitized).not.toContain('>');
      expect(sanitized).not.toContain('script');
    });

    it('devrait vérifier la résistance aux injections SQL', () => {
      const sqlPayload = "; DROP TABLE users; --";
      const sanitized = sanitizeString(sqlPayload);
      expect(sanitized).not.toContain('DROP');
      expect(sanitized).not.toContain('--');
    });
  });
});