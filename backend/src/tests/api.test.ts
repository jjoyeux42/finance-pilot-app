/**
 * Tests d'intégration pour l'API Backend
 */
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import { app } from '../server.js';

describe('API Routes', () => {
  let authToken: string;

  beforeAll(async () => {
    // Configuration de test avec token d'authentification
    authToken = 'test-jwt-token';
  });

  describe('Analytics Routes', () => {
    it('GET /api/analytics/dashboard devrait retourner les données du dashboard', async () => {
      const response = await request(app)
        .get('/api/analytics/dashboard')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(response.body).toHaveProperty('revenue');
      expect(response.body).toHaveProperty('expenses');
      expect(response.body).toHaveProperty('profit');
    });

    it('GET /api/analytics/kpis devrait retourner les KPIs', async () => {
      const response = await request(app)
        .get('/api/analytics/kpis')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(response.body).toHaveProperty('kpis');
      expect(Array.isArray(response.body.kpis)).toBe(true);
    });
  });

  describe('Middleware de Sécurité', () => {
    it('devrait rejeter les requêtes sans token', async () => {
      await request(app)
        .get('/api/analytics/dashboard')
        .expect(401);
    });

    it('devrait rejeter les tokens invalides', async () => {
      await request(app)
        .get('/api/analytics/dashboard')
        .set('Authorization', 'Bearer invalid-token')
        .expect(401);
    });
  });
});