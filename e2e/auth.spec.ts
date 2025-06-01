/**
 * Tests End-to-End pour l'authentification
 */
import { test, expect } from '@playwright/test';

test.describe('Authentification', () => {
  test('devrait permettre la connexion complète', async ({ page }) => {
    // Démarrer le frontend
    await page.goto('http://localhost:5173');
    
    // Vérifier la page de connexion
    await expect(page.locator('h1')).toContainText('Connexion');
    
    // Remplir le formulaire
    await page.fill('[data-testid="email"]', 'test@example.com');
    await page.fill('[data-testid="password"]', 'MotDePasse123!');
    
    // Soumettre et vérifier la redirection
    await page.click('[data-testid="login-button"]');
    await expect(page).toHaveURL('http://localhost:5173/');
    
    // Vérifier que le dashboard se charge
    await expect(page.locator('[data-testid="dashboard"]')).toBeVisible();
  });
});