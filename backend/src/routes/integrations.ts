import { Router, Request, Response } from 'express';
import { authMiddleware } from '@/middleware/auth.js';

const router = Router();

// Proxy pour les requêtes HubSpot afin d'éviter les problèmes CORS
// IMPORTANT: Cette route doit être définie AVANT le middleware d'authentification
router.all('/hubspot/proxy/*', async (req: Request, res: Response) => {
  try {
    const { authorization } = req.headers;
    
    if (!authorization || !authorization.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Token d\'autorisation HubSpot requis' });
    }

    // Extraire le chemin de l'API HubSpot
    const hubspotPath = req.path.replace('/hubspot/proxy', '');
    const hubspotUrl = `https://api.hubapi.com${hubspotPath}`;
    
    // Ajouter les paramètres de requête s'ils existent
    const queryString = new URLSearchParams(req.query as Record<string, string>).toString();
    const fullUrl = queryString ? `${hubspotUrl}?${queryString}` : hubspotUrl;

    // Préparer les headers pour HubSpot
    const hubspotHeaders: Record<string, string> = {
      'Authorization': authorization,
      'Content-Type': 'application/json',
    };

    // Préparer les options de la requête
    const fetchOptions: RequestInit = {
      method: req.method,
      headers: hubspotHeaders,
    };

    // Ajouter le body pour les requêtes POST/PUT/PATCH
    if (['POST', 'PUT', 'PATCH'].includes(req.method) && req.body) {
      fetchOptions.body = JSON.stringify(req.body);
    }

    // Faire la requête à HubSpot
    const hubspotResponse = await fetch(fullUrl, fetchOptions);
    const hubspotData = await hubspotResponse.json();

    // Retourner la réponse avec le même status code
    res.status(hubspotResponse.status).json(hubspotData);
  } catch (error) {
    console.error('Erreur proxy HubSpot:', error);
    res.status(500).json({ 
      error: 'Erreur lors de la communication avec HubSpot',
      details: error instanceof Error ? error.message : 'Erreur inconnue'
    });
  }
});

// Appliquer l'authentification à toutes les autres routes
router.use(authMiddleware);

// Routes pour les intégrations
router.get('/', async (req: Request, res: Response) => {
  // TODO: Récupérer les intégrations de l'utilisateur
  res.json({ integrations: [] });
});

// Routes HubSpot protégées par authentification
router.post('/hubspot', async (req: Request, res: Response) => {
  // TODO: Configurer l'intégration HubSpot
  res.json({ message: 'Intégration HubSpot configurée' });
});

router.post('/hubspot', async (req: Request, res: Response) => {
  // TODO: Configurer l'intégration HubSpot
  res.json({ message: 'Intégration HubSpot configurée' });
});

router.put('/hubspot', async (req: Request, res: Response) => {
  // TODO: Mettre à jour l'intégration HubSpot
  res.json({ message: 'Intégration HubSpot mise à jour' });
});

router.delete('/hubspot', async (req: Request, res: Response) => {
  // TODO: Supprimer l'intégration HubSpot
  res.json({ message: 'Intégration HubSpot supprimée' });
});

router.get('/test/:type', async (req: Request, res: Response) => {
  // TODO: Tester une intégration
  const { type } = req.params;
  res.json({ message: `Test de l'intégration ${type}`, success: true });
});

export { router as integrationRoutes };