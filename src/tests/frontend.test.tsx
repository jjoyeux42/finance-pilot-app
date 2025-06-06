/**
 * Tests unitaires pour les composants Frontend
 */
import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import { DollarSign } from 'lucide-react';
import Index from '@/pages/Index';
import { KPICard } from '@/components/KPICard';

// Mock du hook d'authentification
vi.mock('@/hooks/useAuth', () => ({
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
  SidebarProvider: ({ children }: { children: React.ReactNode }) => <div data-testid="sidebar-provider">{children}</div>,
  SidebarTrigger: () => <button data-testid="sidebar-trigger">Menu</button>
}));

vi.mock('@/components/AppSidebar', () => ({
  AppSidebar: () => <div data-testid="app-sidebar">Sidebar</div>
}));

// Mock des composants UI Button
vi.mock('@/components/ui/button', () => ({
  Button: ({ children, ...props }: any) => <button {...props}>{children}</button>
}));

// Test des composants isolés
describe('Composants Frontend', () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: { retry: false },
        mutations: { retry: false }
      }
    });
    cleanup();
  });

  const TestWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        {children}
      </BrowserRouter>
    </QueryClientProvider>
  );

  it('devrait rendre le composant KPICard correctement', () => {
    render(
      <KPICard 
        title="Revenus" 
        value="125000€" 
        change={5.2}
        changeLabel="vs mois dernier"
        icon={<DollarSign className="w-5 h-5" />}
        trend="up"
        color="success"
      />, 
      { wrapper: TestWrapper }
    );
    
    expect(screen.getByText('Revenus')).toBeInTheDocument();
    expect(screen.getByText('125000€')).toBeInTheDocument();
  });

  it('devrait rendre la page Index sans erreur', () => {
    render(
      <TestWrapper>
        <Index />
      </TestWrapper>
    );
    
    expect(screen.getByText('Tableau de Bord')).toBeInTheDocument();
  });

  it('devrait gérer les interactions utilisateur', () => {
    render(
      <TestWrapper>
        <Index />
      </TestWrapper>
    );
    
    // Vérifier que le composant se rend correctement
    const title = screen.getByText('Tableau de Bord');
    expect(title).toBeInTheDocument();
    
    // Simuler un clic (si applicable)
    fireEvent.click(title);
    expect(title).toBeInTheDocument();
  });

  it('devrait afficher les KPIs correctement', () => {
    render(
      <TestWrapper>
        <Index />
      </TestWrapper>
    );
    
    // Vérifier la présence du titre principal
    expect(screen.getByText('Tableau de Bord')).toBeInTheDocument();
    
    // Vérifier la présence des composants mockés
    expect(screen.getByTestId('cash-flow-chart')).toBeInTheDocument();
    expect(screen.getByTestId('alert-panel')).toBeInTheDocument();
  });
});