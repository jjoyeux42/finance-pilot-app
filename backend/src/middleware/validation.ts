import { Request, Response, NextFunction } from 'express';
import { z, ZodError } from 'zod';
import { logger } from '../utils/logger';

/**
 * Middleware de validation Zod pour les requêtes API
 * @param schema - Schéma Zod pour valider les données
 * @param source - Source des données à valider ('body', 'query', 'params')
 */
export const validateRequest = (
  schema: z.ZodSchema,
  source: 'body' | 'query' | 'params' = 'body'
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const dataToValidate = req[source];
      const validatedData = schema.parse(dataToValidate);
      
      // Remplacer les données par les données validées
      req[source] = validatedData;
      
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        logger.warn('Validation error', {
          errors: error.errors,
          source,
          url: req.url,
          method: req.method,
          ip: req.ip
        });
        
        return res.status(400).json({
          error: 'Données invalides',
          details: error.errors.map(err => ({
            field: err.path.join('.'),
            message: err.message,
            code: err.code
          }))
        });
      }
      
      logger.error('Erreur de validation inattendue', { error, url: req.url });
      return res.status(500).json({
        error: 'Erreur interne du serveur'
      });
    }
  };
};

// Schémas de validation communs
export const schemas = {
  // Validation des transactions
  createTransaction: z.object({
    amount: z.number().positive('Le montant doit être positif'),
    description: z.string().min(1, 'La description est requise').max(500, 'Description trop longue'),
    category: z.string().min(1, 'La catégorie est requise'),
    date: z.string().datetime('Format de date invalide').optional(),
    type: z.enum(['income', 'expense'], {
      errorMap: () => ({ message: 'Le type doit être "income" ou "expense"' })
    })
  }),
  
  updateTransaction: z.object({
    amount: z.number().positive('Le montant doit être positif').optional(),
    description: z.string().min(1).max(500).optional(),
    category: z.string().min(1).optional(),
    date: z.string().datetime().optional(),
    type: z.enum(['income', 'expense']).optional()
  }),
  
  // Validation des paramètres d'ID
  idParam: z.object({
    id: z.string().uuid('ID invalide')
  }),
  
  // Validation des requêtes de pagination
  pagination: z.object({
    page: z.string().transform(Number).refine(n => n > 0, 'La page doit être supérieure à 0').optional(),
    limit: z.string().transform(Number).refine(n => n > 0 && n <= 100, 'La limite doit être entre 1 et 100').optional(),
    sortBy: z.string().optional(),
    sortOrder: z.enum(['asc', 'desc']).optional()
  }),
  
  // Validation des paramètres d'intégration
  integrationSettings: z.object({
    type: z.string().min(1, 'Le type d\'intégration est requis'),
    settings: z.record(z.any()),
    active: z.boolean().default(true)
  })
};