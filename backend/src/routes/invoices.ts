import { Router } from 'express';
import { authMiddleware } from '@/middleware/auth.js';

const router = Router();

// Appliquer l'authentification à toutes les routes
router.use(authMiddleware);

// Routes CRUD pour les factures
router.get('/', async (req, res) => {
  // TODO: Implémenter la récupération des factures
  res.json({ invoices: [] });
});

router.post('/', async (req, res) => {
  // TODO: Implémenter la création d'une facture
  res.json({ message: 'Facture créée' });
});

router.put('/:id', async (req, res) => {
  // TODO: Implémenter la mise à jour d'une facture
  res.json({ message: 'Facture mise à jour' });
});

router.delete('/:id', async (req, res) => {
  // TODO: Implémenter la suppression d'une facture
  res.json({ message: 'Facture supprimée' });
});

export { router as invoiceRoutes };