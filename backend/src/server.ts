import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import { config } from '@/config/environment.js';
import { logger } from '@/utils/logger.js';
import { errorHandler } from '@/middleware/errorHandler.js';
import { authMiddleware } from '@/middleware/auth.js';
import { routes } from '@/routes/index.js';
import { integrationRoutes } from '@/routes/integrations.js';

const app = express();

// Middlewares de sécurité
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
}));

// Configuration CORS sécurisée
app.use(cors({
  origin: config.FRONTEND_URL,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limite chaque IP à 100 requêtes par fenêtre
  message: 'Trop de requêtes depuis cette IP',
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

// Compression des réponses
app.use(compression());

// Parsing JSON avec limite de taille
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Logging des requêtes
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.path}`, {
    ip: req.ip,
    userAgent: req.get('User-Agent'),
  });
  next();
});

// Route proxy HubSpot (sans authentification) - DOIT être avant les routes API
app.use('/api/integrations/hubspot/proxy', (req, res, next) => {
  // Rediriger vers le handler du proxy dans integrationRoutes
  req.url = req.url.replace('/api/integrations/hubspot/proxy', '/hubspot/proxy');
  req.originalUrl = req.originalUrl.replace('/api/integrations/hubspot/proxy', '/hubspot/proxy');
  next();
}, integrationRoutes);

// Routes API avec authentification (après le proxy HubSpot)
app.use('/api', authMiddleware, routes);

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Gestion des erreurs
app.use(errorHandler);

// Démarrage du serveur
const PORT = config.PORT || 3001;
app.listen(PORT, () => {
  logger.info(`🚀 Serveur backend démarré sur le port ${PORT}`);
  logger.info(`🌍 Environnement: ${config.NODE_ENV}`);
  logger.info(`🔗 Frontend autorisé: ${config.FRONTEND_URL}`);
});

export default app;