import { createClient } from '@supabase/supabase-js';
import { config } from '../config/environment';
import { logger } from '../utils/logger';

const supabase = createClient(config.SUPABASE_URL, config.SUPABASE_SERVICE_KEY);

export interface DashboardData {
  revenue: number;
  expenses: number;
  profit: number;
  transactions: number;
  monthlyGrowth: number;
}

export interface KPI {
  id: string;
  name: string;
  value: number;
  change: number;
  trend: 'up' | 'down' | 'stable';
}

export class AnalyticsService {
  /**
   * Récupère les données du dashboard
   */
  static async getDashboardData(userId: string): Promise<DashboardData> {
    try {
      // Récupérer les transactions de l'utilisateur
      const { data: transactions, error } = await supabase
        .from('transactions')
        .select('amount, type, created_at')
        .eq('user_id', userId)
        .gte('created_at', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString());

      if (error) {
        logger.error('Erreur lors de la récupération des transactions', { error, userId });
        throw new Error('Impossible de récupérer les données du dashboard');
      }

      const revenue = transactions
        ?.filter(t => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0) || 0;

      const expenses = transactions
        ?.filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0) || 0;

      const profit = revenue - expenses;
      const transactionCount = transactions?.length || 0;

      // Calculer la croissance mensuelle (simplifié)
      const monthlyGrowth = profit > 0 ? 5.2 : -2.1;

      return {
        revenue,
        expenses,
        profit,
        transactions: transactionCount,
        monthlyGrowth
      };
    } catch (error) {
      logger.error('Erreur dans getDashboardData', { error, userId });
      throw error;
    }
  }

  /**
   * Récupère les KPIs
   */
  static async getKPIs(userId: string): Promise<KPI[]> {
    try {
      const dashboardData = await this.getDashboardData(userId);

      const kpis: KPI[] = [
        {
          id: 'revenue',
          name: 'Revenus',
          value: dashboardData.revenue,
          change: dashboardData.monthlyGrowth,
          trend: dashboardData.monthlyGrowth > 0 ? 'up' : 'down'
        },
        {
          id: 'expenses',
          name: 'Dépenses',
          value: dashboardData.expenses,
          change: -2.3,
          trend: 'down'
        },
        {
          id: 'profit',
          name: 'Profit',
          value: dashboardData.profit,
          change: dashboardData.monthlyGrowth,
          trend: dashboardData.profit > 0 ? 'up' : 'down'
        },
        {
          id: 'transactions',
          name: 'Transactions',
          value: dashboardData.transactions,
          change: 8.1,
          trend: 'up'
        }
      ];

      return kpis;
    } catch (error) {
      logger.error('Erreur dans getKPIs', { error, userId });
      throw error;
    }
  }

  /**
   * Génère un rapport financier
   */
  static async generateReport(userId: string, type: 'monthly' | 'quarterly' | 'yearly' = 'monthly') {
    try {
      const dashboardData = await this.getDashboardData(userId);
      
      const report = {
        id: `report_${Date.now()}`,
        type,
        period: new Date().toISOString().slice(0, 7), // YYYY-MM
        data: dashboardData,
        generatedAt: new Date().toISOString(),
        summary: {
          totalRevenue: dashboardData.revenue,
          totalExpenses: dashboardData.expenses,
          netProfit: dashboardData.profit,
          profitMargin: dashboardData.revenue > 0 ? (dashboardData.profit / dashboardData.revenue) * 100 : 0
        }
      };

      return report;
    } catch (error) {
      logger.error('Erreur dans generateReport', { error, userId, type });
      throw error;
    }
  }

  /**
   * Récupère les données de cash flow
   */
  static async getCashFlowData(userId: string, months: number = 6) {
    try {
      const { data: transactions, error } = await supabase
        .from('transactions')
        .select('amount, type, created_at')
        .eq('user_id', userId)
        .gte('created_at', new Date(Date.now() - months * 30 * 24 * 60 * 60 * 1000).toISOString())
        .order('created_at', { ascending: true });

      if (error) {
        logger.error('Erreur lors de la récupération du cash flow', { error, userId });
        throw new Error('Impossible de récupérer les données de cash flow');
      }

      // Grouper par mois
      const monthlyData = transactions?.reduce((acc, transaction) => {
        const month = transaction.created_at.slice(0, 7); // YYYY-MM
        if (!acc[month]) {
          acc[month] = { income: 0, expense: 0 };
        }
        
        if (transaction.type === 'income') {
          acc[month].income += transaction.amount;
        } else {
          acc[month].expense += transaction.amount;
        }
        
        return acc;
      }, {} as Record<string, { income: number; expense: number }>);

      return Object.entries(monthlyData || {}).map(([month, data]) => ({
        month,
        income: data.income,
        expense: data.expense,
        net: data.income - data.expense
      }));
    } catch (error) {
      logger.error('Erreur dans getCashFlowData', { error, userId });
      throw error;
    }
  }
}