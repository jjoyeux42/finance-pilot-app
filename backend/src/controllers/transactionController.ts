import { Request, Response, NextFunction } from 'express';
import { TransactionService } from '@/services/transactionService.js';
import { AuthenticatedRequest } from '@/middleware/auth.js';
import { logger } from '@/utils/logger.js';
import { createError } from '@/middleware/errorHandler.js';

/**
 * Contrôleur pour les transactions
 * Gestion des requêtes HTTP et validation des entrées
 */
export class TransactionController {
  /**
   * GET /api/transactions
   * Récupère toutes les transactions de l'utilisateur
   */
  static async getTransactions(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      if (!req.user) {
        throw createError('Utilisateur non authentifié', 401);
      }

      const transactions = await TransactionService.getUserTransactions(req.user.id);
      res.json({ transactions });
    } catch (error) {
      next(error);
    }
  }

  /**
   * POST /api/transactions
   * Crée une nouvelle transaction
   */
  static async createTransaction(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      if (!req.user) {
        throw createError('Utilisateur non authentifié', 401);
      }

      const transactionData = { ...req.body, user_id: req.user.id };
      const transaction = await TransactionService.createTransaction(transactionData);
      
      logger.info('Transaction créée', { 
        transactionId: transaction.id, 
        userId: req.user.id 
      });
      
      res.status(201).json({ transaction });
    } catch (error) {
      next(error);
    }
  }

  /**
   * PUT /api/transactions/:id
   * Met à jour une transaction existante
   */
  static async updateTransaction(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      if (!req.user) {
        throw createError('Utilisateur non authentifié', 401);
      }

      const { id } = req.params;
      const updates = req.body;
      
      const transaction = await TransactionService.updateTransaction(
        id,
        req.user.id,
        updates
      );
      
      if (!transaction) {
        throw createError('Transaction non trouvée', 404);
      }
      
      logger.info('Transaction mise à jour', { 
        transactionId: id, 
        userId: req.user.id 
      });
      
      res.json({ transaction });
    } catch (error) {
      next(error);
    }
  }

  /**
   * DELETE /api/transactions/:id
   * Supprime une transaction
   */
  static async deleteTransaction(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      if (!req.user) {
        throw createError('Utilisateur non authentifié', 401);
      }

      const { id } = req.params;
      
      await TransactionService.deleteTransaction(id, req.user.id);
      
      logger.info('Transaction supprimée', { 
        transactionId: id, 
        userId: req.user.id 
      });
      
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /api/transactions/stats
   * Récupère les statistiques des transactions
   */
  static async getTransactionStats(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      if (!req.user) {
        throw createError('Utilisateur non authentifié', 401);
      }

      const stats = await TransactionService.getTransactionStats(req.user.id);
      res.json({ stats });
    } catch (error) {
      next(error);
    }
  }
}