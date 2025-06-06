/**
 * Tests d'intégration Frontend-Backend
 */
import React from 'react';
import { describe, it, expect, beforeAll, afterAll, beforeEach, vi } from 'vitest';
import { render, screen, waitFor, cleanup } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '@/hooks/useAuth';
import Index from '@/pages/Index';

// Mock des hooks d'authentification
vi.mock('@/hooks/useAuth', () => ({
  AuthProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  useAuth: () => ({
    user: { id: 'test-user', email: 'test@example.com' },
    session: { access_token: 'test-token' },
    loading: false,
    signOut: vi.fn()
  })
}));

// Mock de Supabase
vi.mock('@/integrations/supabase/client', () => ({
  supabase: {
    auth: {
      getSession: vi.fn().mockResolvedValue({ data: { session: null } }),
      onAuthStateChange: vi.fn().mockReturnValue({ data: { subscription: { unsubscribe: vi.fn() } } })
    }
  }
}));

// Mock des hooks de toast
vi.mock('@/hooks/use-toast', () => ({
  useToast: () => ({
    toast: vi.fn()
  })
}));

// Mock des composants complexes
vi.mock('@/components/CashFlowChart', () => ({
  CashFlowChart: () => <div data-testid="cash-flow-chart">Cash Flow Chart</div>
}));

vi.mock('@/components/AlertPanel', () => ({
  AlertPanel: () => <div data-testid="alert-panel">Alert Panel</div>
}));

vi.mock('@/components/NotificationCenter', () => ({
  NotificationCenter: () => <div data-testid="notification-center">Notification Center</div>
}));

vi.mock('@/components/QuickActions', () => ({
  QuickActions: () => <div data-testid="quick-actions">Quick Actions</div>
}));

vi.mock('@/components/TopPerformers', () => ({
  default: () => <div data-testid="top-performers">Top Performers</div>
}));

// Mock des composants UI
vi.mock('@/components/ui/sidebar', () => ({
  SidebarProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  SidebarTrigger: () => <button data-testid="sidebar-trigger">Menu</button>
}));

vi.mock('@/components/AppSidebar', () => ({
  AppSidebar: () => <div data-testid="app-sidebar">Sidebar</div>
}));

vi.mock('@/components/ui/button', () => ({
  Button: ({ children, ...props }: any) => <button {...props}>{children}</button>
}));

// Mock du serveur API avec la nouvelle syntaxe MSW v2
const server = setupServer(
  http.get('http://localhost:3001/api/analytics/dashboard', () => {
    return HttpResponse.json({
      revenue: 125000,
      expenses: 89000,
      profit: 36000,
      transactions: 156
    });
  }),
  
  http.get('http://localhost:3001/api/analytics/kpis', () => {
    return HttpResponse.json({
      kpis: [
        { name: 'Revenus', value: 125000, trend: 5.2 },
        { name: 'Dépenses', value: 89000, trend: -2.1 }
      ]
    });
  })
);

beforeAll(() => server.listen({ onUnhandledRequest: 'bypass' }));
afterAll(() => server.close());

beforeEach(() => {
  cleanup();
  vi.clearAllMocks();
});

// Wrapper de test avec tous les providers nécessaires
const TestWrapper = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient({
    defaultOptions: { 
      queries: { retry: false, staleTime: 0 },
      mutations: { retry: false }
    }
  });

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          {children}
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

describe('Intégration Frontend-Backend', () => {
  it('devrait rendre le composant Index sans erreur', () => {
    render(
      <TestWrapper>
        <Index />
      </TestWrapper>
    );

    // Vérifier que le composant se rend sans erreur
    expect(screen.getByText('Tableau de Bord')).toBeInTheDocument();
  });

  it('devrait afficher les éléments de base du dashboard', async () => {
    render(
      <TestWrapper>
        <Index />
      </TestWrapper>
    );

    // Vérifier la présence d'éléments de base
    await waitFor(() => {
      expect(screen.getByText('Tableau de Bord')).toBeInTheDocument();
    }, { timeout: 3000 });
  });

  it('devrait gérer les erreurs de chargement gracieusement', async () => {
    // Override du serveur pour simuler une erreur
    server.use(
      http.get('http://localhost:3001/api/analytics/dashboard', () => {
        return new HttpResponse(null, { status: 500 });
      })
    );

    render(
      <TestWrapper>
        <Index />
      </TestWrapper>
    );

    // Le composant devrait toujours se rendre même en cas d'erreur API
    await waitFor(() => {
      expect(screen.getByText('Tableau de Bord')).toBeInTheDocument();
    });
  });
});