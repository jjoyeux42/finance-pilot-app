/**
 * Tests de performance pour l'application complète
 */
import { describe, it, expect } from 'vitest';

describe('Performance Tests', () => {
  it('devrait charger le dashboard en moins de 2 secondes', async () => {
    const startTime = performance.now();
    
    // Simuler le chargement complet du dashboard
    await fetch('http://localhost:3001/api/analytics/dashboard');
    await fetch('http://localhost:3001/api/analytics/kpis');
    
    const endTime = performance.now();
    const loadTime = endTime - startTime;
    
    expect(loadTime).toBeLessThan(2000); // Moins de 2 secondes
  });

  it('devrait gérer 100 requêtes simultanées', async () => {
    const requests = Array(100).fill(null).map(() => 
      fetch('http://localhost:3001/api/analytics/dashboard')
    );

    const responses = await Promise.all(requests);
    const successfulResponses = responses.filter(r => r.status === 200);
    
    expect(successfulResponses.length).toBeGreaterThan(95); // 95% de succès minimum
  });
});