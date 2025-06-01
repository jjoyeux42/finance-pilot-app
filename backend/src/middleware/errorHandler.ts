import { Request, Response, NextFunction } from 'express';
import { logger } from '@/utils/logger.js';
import { config } from '@/config/environment.js';

export interface AppError extends Error {
  statusCode?: number;
  isOperational?: boolean;
}

/**
 * Middleware de gestion centralisée des erreurs
 */
export const errorHandler = (
  error: AppError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const statusCode = error.statusCode || 500;
  const message = error.message || 'Erreur serveur interne';

  // Log de l'erreur
  logger.error('Erreur API', {
    error: message,
    stack: error.stack,
    url: req.url,
    method: req.method,
    ip: req.ip,
    statusCode,
  });

  // Réponse d'erreur
  const errorResponse: any = {
    error: message,
    statusCode,
    timestamp: new Date().toISOString(),
  };

  // En développement, inclure la stack trace
  if (config.NODE_ENV === 'development') {
    errorResponse.stack = error.stack;
  }

  res.status(statusCode).json(errorResponse);
};

/**
 * Créateur d'erreurs personnalisées
 */
export const createError = (message: string, statusCode: number = 500): AppError => {
  const error = new Error(message) as AppError;
  error.statusCode = statusCode;
  error.isOperational = true;
  return error;
};