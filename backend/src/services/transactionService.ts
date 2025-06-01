import { createClient } from '@supabase/supabase-js';
import { config } from '@/config/environment.js';
import { logger } from '@/utils/logger.js';
import { createError } from '@/middleware/errorHandler.js';

const supabase = createClient(config.SUPABASE_URL, config.SUPABASE_SERVICE_KEY);

export interface Transaction {
  id?: string;
  type: 'income' | 'expense';
  category: string;
  amount: number;
  description?: string;
  date: string;
  user_id: string;
}

/**
 * Service de gestion des transactions
 * Logique métier centralisée avec validation
 */
export class TransactionService {
  /**
   * Récupère toutes les transactions d'un utilisateur
   */
  static async getUserTransactions(userId: string): Promise<Transaction[]> {
    try {
      const { data, error } = await supabase
        .from('transactions')
        .select('*')
        .eq('user_id', userId)
        .order('date', { ascending: false });

      if (error) {
        logger.error('Erreur récupération transactions', { error, userId });
        throw createError('Erreur lors de la récupération des transactions', 500);
      }

      return data || [];
    } catch (error) {
      logger.error('Erreur service transactions', { error, userId });
      throw error;
    }
  }

  /**
   * Crée une nouvelle transaction
   */
  static async createTransaction(transaction: Omit<Transaction, 'id'>): Promise<Transaction> {
    try {
      // Validation métier
      if (transaction.amount <= 0) {
        throw createError('Le montant doit être positif', 400);
      }

      const { data, error } = await supabase
        .from('transactions')
        .insert([transaction])
        .select()
        .single();

      if (error) {
        logger.error('Erreur création transaction', { error, transaction });
        throw createError('Erreur lors de la création de la transaction', 500);
      }

      logger.info('Transaction créée', { transactionId: data.id, userId: transaction.user_id });
      return data;
    } catch (error) {
      logger.error('Erreur service création transaction', { error });
      throw error;
    }
  }

  /**
   * Met à jour une transaction
   */
  static async updateTransaction(
    id: string,
    userId: string,
    updates: Partial<Transaction>
  ): Promise<Transaction> {
    try {
      const { data, error } = await supabase
        .from('transactions')
        .update(updates)
        .eq('id', id)
        .eq('user_id', userId)
        .select()
        .single();

      if (error) {
        logger.error('Erreur mise à jour transaction', { error, id, userId });
        throw createError('Erreur lors de la mise à jour', 500);
      }

      if (!data) {
        throw createError('Transaction non trouvée', 404);
      }

      return data;
    } catch (error) {
      logger.error('Erreur service mise à jour transaction', { error });
      throw error;
    }
  }

  /**
   * Supprime une transaction
   */
  static async deleteTransaction(id: string, userId: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('transactions')
        .delete()
        .eq('id', id)
        .eq('user_id', userId);

      if (error) {
        logger.error('Erreur suppression transaction', { error, id, userId });
        throw createError('Erreur lors de la suppression', 500);
      }

      logger.info('Transaction supprimée', { transactionId: id, userId });
    } catch (error) {
      logger.error('Erreur service suppression transaction', { error });
      throw error;
    }
  }

  /**
   * Récupère les statistiques des transactions d'un utilisateur
   */
  static async getTransactionStats(userId: string): Promise<{
    totalTransactions: number;
    totalIncome: number;
    totalExpenses: number;
    balance: number;
    monthlyIncome: number;
    monthlyExpenses: number;
  }> {
    try {
      const { data: transactions, error } = await supabase
        .from('transactions')
        .select('type, amount, date')
        .eq('user_id', userId);

      if (error) {
        logger.error('Erreur récupération stats transactions', { error, userId });
        throw createError('Erreur lors de la récupération des statistiques', 500);
      }

      const stats = {
        totalTransactions: transactions?.length || 0,
        totalIncome: 0,
        totalExpenses: 0,
        balance: 0,
        monthlyIncome: 0,
        monthlyExpenses: 0,
      };

      if (transactions) {
        const currentMonth = new Date().getMonth();
        const currentYear = new Date().getFullYear();

        transactions.forEach(transaction => {
          const amount = Number(transaction.amount);
          const transactionDate = new Date(transaction.date);
          const isCurrentMonth = 
            transactionDate.getMonth() === currentMonth &&
            transactionDate.getFullYear() === currentYear;

          if (transaction.type === 'income') {
            stats.totalIncome += amount;
            if (isCurrentMonth) {
              stats.monthlyIncome += amount;
            }
          } else if (transaction.type === 'expense') {
            stats.totalExpenses += amount;
            if (isCurrentMonth) {
              stats.monthlyExpenses += amount;
            }
          }
        });

        stats.balance = stats.totalIncome - stats.totalExpenses;
      }

      logger.info('Statistiques calculées', { userId, stats });
      return stats;
    } catch (error) {
      logger.error('Erreur service stats transactions', { error });
      throw error;
    }
  }
}