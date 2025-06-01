/**
 * Tests d'intégration Frontend-Backend
 */
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { setupServer } from 'msw/node';
import { rest } from 'msw';

// Mock du serveur API
const server = setupServer(
  rest.get('http://localhost:3001/api/analytics/dashboard', (req, res, ctx) => {
    return res(ctx.json({
      revenue: 125000,
      expenses: 89000,
      profit: 36000,
      transactions: 156
    }));
  }),
  
  rest.get('http://localhost:3001/api/analytics/kpis', (req, res, ctx) => {
    return res(ctx.json({
      kpis: [
        { name: 'Revenus', value: 125000, trend: 5.2 },
        { name: 'Dépenses', value: 89000, trend: -2.1 }
      ]
    }));
  })
);

beforeAll(() => server.listen());
afterAll(() => server.close());

describe('Intégration Frontend-Backend', () => {
  it('devrait charger et afficher les données du dashboard', async () => {
    const queryClient = new QueryClient({
      defaultOptions: { queries: { retry: false } }
    });

    render(
      <QueryClientProvider client={queryClient}>
        <Dashboard />
      </QueryClientProvider>
    );

    // Vérifier que les données se chargent
    await waitFor(() => {
      expect(screen.getByText('125000€')).toBeInTheDocument();
      expect(screen.getByText('89000€')).toBeInTheDocument();
    });
  });
});