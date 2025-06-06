import { Router, Response } from 'express';
import { authMiddleware, AuthenticatedRequest } from '@/middleware/auth.js';
import { validateRequest } from '@/middleware/validation.js';
import { AnalyticsService } from '@/services/analyticsService.js';
import { logger } from '@/utils/logger.js';
import { z } from 'zod';

const router = Router();

// Appliquer l'authentification à toutes les routes
router.use(authMiddleware);

// Schémas de validation
const reportTypeSchema = z.object({
  type: z.enum(['monthly', 'quarterly', 'yearly']).optional().default('monthly')
});

const cashFlowSchema = z.object({
  months: z.coerce.number().min(1).max(24).optional().default(6)
});

// Routes pour les analytics
router.get('/dashboard', async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ error: 'Utilisateur non authentifié' });
    }

    const dashboardData = await AnalyticsService.getDashboardData(userId);
    res.json(dashboardData);
  } catch (error) {
    logger.error('Erreur lors de la récupération du dashboard', { error, userId: req.user?.id });
    res.status(500).json({ error: 'Erreur interne du serveur' });
  }
});

router.get('/reports', validateRequest(reportTypeSchema, 'query'), async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ error: 'Utilisateur non authentifié' });
    }

    const { type } = req.query as { type?: 'monthly' | 'quarterly' | 'yearly' };
    const report = await AnalyticsService.generateReport(userId, type);
    res.json({ report });
  } catch (error) {
    logger.error('Erreur lors de la génération du rapport', { error, userId: req.user?.id });
    res.status(500).json({ error: 'Erreur interne du serveur' });
  }
});

router.get('/kpis', async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ error: 'Utilisateur non authentifié' });
    }

    const kpis = await AnalyticsService.getKPIs(userId);
    res.json({ kpis });
  } catch (error) {
    logger.error('Erreur lors de la récupération des KPIs', { error, userId: req.user?.id });
    res.status(500).json({ error: 'Erreur interne du serveur' });
  }
});

router.get('/cashflow', validateRequest(cashFlowSchema, 'query'), async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ error: 'Utilisateur non authentifié' });
    }

    const { months } = req.query as { months?: number };
    const cashFlowData = await AnalyticsService.getCashFlowData(userId, months);
    res.json({ cashFlow: cashFlowData });
  } catch (error) {
    logger.error('Erreur lors de la récupération du cash flow', { error, userId: req.user?.id });
    res.status(500).json({ error: 'Erreur interne du serveur' });
  }
});

export { router as analyticsRoutes };