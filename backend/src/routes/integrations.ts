import { Router, Request, Response } from 'express';
import { authMiddleware } from '@/middleware/auth.js';

const router = Router();



// Appliquer l'authentification à toutes les autres routes
router.use(authMiddleware);

// Routes pour les intégrations
router.get('/', async (req: Request, res: Response) => {
  // TODO: Récupérer les intégrations de l'utilisateur
  res.json({ integrations: [] });
});



router.get('/test/:type', async (req: Request, res: Response) => {
  // TODO: Tester une intégration
  const { type } = req.params;
  res.json({ message: `Test de l'intégration ${type}`, success: true });
});

export { router as integrationRoutes };