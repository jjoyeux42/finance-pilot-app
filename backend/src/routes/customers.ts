import { Router, Request, Response } from 'express';
import { authMiddleware } from '@/middleware/auth.js';

const router = Router();

// Appliquer l'authentification à toutes les routes
router.use(authMiddleware);

// Routes CRUD pour les clients
router.get('/', async (req, res) => {
  // TODO: Implémenter la récupération des clients
  res.json({ customers: [] });
});

router.post('/', async (req, res) => {
  // TODO: Implémenter la création d'un client
  res.json({ message: 'Client créé' });
});

router.put('/:id', async (req, res) => {
  // TODO: Implémenter la mise à jour d'un client
  res.json({ message: 'Client mis à jour' });
});

router.delete('/:id', async (req, res) => {
  // TODO: Implémenter la suppression d'un client
  res.json({ message: 'Client supprimé' });
});

export { router as customerRoutes };