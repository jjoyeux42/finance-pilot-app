/**
 * Utilitaires de validation et de sécurisation des entrées utilisateur
 * Implémente les bonnes pratiques de sécurité pour prévenir les attaques
 */

/**
 * Interface pour les résultats de validation
 */
export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

/**
 * Interface pour les résultats de validation avec erreurs multiples
 */
export interface MultiValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

/**
 * Valide une adresse email
 * @param email - L'adresse email à valider
 * @returns Résultat de la validation
 */
export const validateEmail = (email: string): ValidationResult => {
  if (!email || email.trim().length === 0) {
    return { isValid: false, error: 'L\'adresse email est requise' };
  }

  // Pattern RFC 5322 simplifié mais robuste
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  
  if (!emailRegex.test(email)) {
    return { isValid: false, error: 'Format d\'email invalide' };
  }

  if (email.length > 254) {
    return { isValid: false, error: 'L\'adresse email est trop longue' };
  }

  return { isValid: true };
};

/**
 * Valide un mot de passe selon les critères de sécurité
 * @param password - Le mot de passe à valider
 * @returns Résultat de la validation
 */
export const validatePassword = (password: string): ValidationResult => {
  if (!password) {
    return { isValid: false, error: 'Le mot de passe est requis' };
  }

  if (password.length < 8) {
    return { isValid: false, error: 'Le mot de passe doit contenir au moins 8 caractères' };
  }

  if (password.length > 128) {
    return { isValid: false, error: 'Le mot de passe est trop long (max 128 caractères)' };
  }

  // Vérification de la complexité - chaque critère individuellement
  const hasLowerCase = /[a-z]/.test(password);
  const hasUpperCase = /[A-Z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  if (!hasUpperCase) {
    return { isValid: false, error: 'Le mot de passe doit contenir au moins une majuscule' };
  }

  if (!hasLowerCase) {
    return { isValid: false, error: 'Le mot de passe doit contenir au moins une minuscule' };
  }

  if (!hasNumbers) {
    return { isValid: false, error: 'Le mot de passe doit contenir au moins un chiffre' };
  }

  if (!hasSpecialChar) {
    return { isValid: false, error: 'Le mot de passe doit contenir au moins un caractère spécial' };
  }

  // Vérification des mots de passe communs
  const commonPasswords = [
    'password', '123456', '123456789', 'qwerty', 'abc123',
    'password123', 'admin', 'letmein', 'welcome', 'monkey'
  ];

  if (commonPasswords.includes(password.toLowerCase())) {
    return { isValid: false, error: 'Ce mot de passe est trop commun' };
  }

  return { isValid: true };
};

/**
 * Valide un nom (prénom ou nom de famille)
 * @param name - Le nom à valider
 * @param fieldName - Le nom du champ pour les messages d'erreur
 * @returns Résultat de la validation
 */
export const validateName = (name: string): ValidationResult => {
  if (!name || name.trim().length === 0) {
    return { isValid: false, error: 'Le nom est requis' };
  }

  const trimmedName = name.trim();

  if (trimmedName.length < 2) {
    return { isValid: false, error: 'Le nom doit contenir au moins 2 caractères' };
  }

  if (trimmedName.length > 50) {
    return { isValid: false, error: 'Le nom ne peut pas dépasser 50 caractères' };
  }

  // Autorise les lettres, espaces, tirets et apostrophes
  const nameRegex = /^[a-zA-ZÀ-ÿ\s'-]+$/;
  if (!nameRegex.test(trimmedName)) {
    return { isValid: false, error: 'Le nom ne peut contenir que des lettres, espaces, tirets et apostrophes' };
  }

  return { isValid: true };
};

/**
 * Nettoie et sécurise une chaîne de caractères
 * @param input - La chaîne à nettoyer
 * @returns La chaîne nettoyée
 */
export const sanitizeString = (input: string): string => {
  if (!input) return '';
  
  return input
    .trim()
    .replace(/<script[^>]*>.*?<\/script>/gi, '') // Supprime les balises script
    .replace(/<[^>]*>/g, '') // Supprime toutes les balises HTML
    .replace(/["'&\x00-\x1F\x7F]/g, '') // Supprime les caractères dangereux et de contrôle (sans < >)
    .replace(/DROP\s+TABLE/gi, '') // Supprime les commandes SQL dangereuses
    .replace(/--/g, '') // Supprime les commentaires SQL
    .replace(/;/g, '') // Supprime les points-virgules SQL
    .replace(/alert\s*\(/gi, '') // Supprime les appels alert JavaScript
    .replace(/javascript:/gi, '') // Supprime les protocoles JavaScript
    .replace(/on\w+\s*=/gi, '') // Supprime les gestionnaires d'événements
    .substring(0, 1000); // Limite la longueur
};

/**
 * Valide les données d'inscription complètes
 * @param data - Les données d'inscription
 * @returns Résultat de la validation
 */
export const validateRegistrationData = (data: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}): MultiValidationResult => {
  const errors: Record<string, string> = {};

  const emailValidation = validateEmail(data.email);
  if (!emailValidation.isValid) {
    errors.email = emailValidation.error!;
  }

  const passwordValidation = validatePassword(data.password);
  if (!passwordValidation.isValid) {
    errors.password = passwordValidation.error!;
  }

  const firstNameValidation = validateName(data.firstName);
  if (!firstNameValidation.isValid) {
    errors.firstName = firstNameValidation.error!;
  }

  const lastNameValidation = validateName(data.lastName);
  if (!lastNameValidation.isValid) {
    errors.lastName = lastNameValidation.error!;
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

/**
 * Valide les données de connexion
 * @param data - Les données de connexion
 * @returns Résultat de la validation
 */
export const validateLoginData = (data: {
  email: string;
  password: string;
}): MultiValidationResult => {
  const errors: Record<string, string> = {};

  const emailValidation = validateEmail(data.email);
  if (!emailValidation.isValid) {
    errors.email = emailValidation.error!;
  }

  const passwordValidation = validatePassword(data.password);
  if (!passwordValidation.isValid) {
    errors.password = passwordValidation.error!;
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};