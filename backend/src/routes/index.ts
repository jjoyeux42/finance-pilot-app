import { Router, Request, Response } from 'express';
import { transactionRoutes } from './transactions.js';
import { customerRoutes } from './customers.js';
import { invoiceRoutes } from './invoices.js';
import { analyticsRoutes } from './analytics.js';
import { integrationRoutes } from './integrations.js';

const router = Router();

// Routes API
router.use('/transactions', transactionRoutes);
router.use('/customers', customerRoutes);
router.use('/invoices', invoiceRoutes);
router.use('/analytics', analyticsRoutes);
router.use('/integrations', integrationRoutes);

// Route de test
router.get('/test', (req: Request, res: Response) => {
  res.json({ message: 'API Backend Finance Pilot fonctionnelle!' });
});

export { router as routes };