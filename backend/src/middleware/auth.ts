import { Request, Response, NextFunction } from 'express';
import { createClient } from '@supabase/supabase-js';
import { config } from '@/config/environment';
import { logger } from '@/utils/logger';

const supabase = createClient(config.SUPABASE_URL, config.SUPABASE_SERVICE_KEY);

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email: string;
    role?: string;
  };
}

/**
 * Middleware d'authentification Supabase
 * Vérifie le token JWT dans l'en-tête Authorization
 */
export const authMiddleware = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // Routes publiques (health check, etc.)
    if (req.path === '/health' || req.path.startsWith('/public')) {
      return next();
    }

    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({ error: 'Token d\'authentification manquant' });
      return;
    }

    const token = authHeader.substring(7); // Retire 'Bearer '

    // Vérification du token avec Supabase
    const { data: { user }, error } = await supabase.auth.getUser(token);

    if (error || !user) {
      logger.warn('Token invalide', { error: error?.message });
      res.status(401).json({ error: 'Token invalide' });
      return;
    }

    // Ajout des informations utilisateur à la requête
    req.user = {
      id: user.id,
      email: user.email || '',
      role: user.user_metadata?.role || 'user',
    };

    next();
  } catch (error) {
    logger.error('Erreur d\'authentification', { error });
    res.status(500).json({ error: 'Erreur serveur' });
  }
};