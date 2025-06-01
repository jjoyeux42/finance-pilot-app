/**
 * Tests unitaires pour les composants Frontend
 */
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';

// Test des composants isolés
describe('Composants Frontend', () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false }
    }
  });

  const TestWrapper = ({ children }: { children: React.ReactNode }) => (
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
        trend={5.2} 
        icon="euro" 
      />, 
      { wrapper: TestWrapper }
    );
    
    expect(screen.getByText('Revenus')).toBeInTheDocument();
    expect(screen.getByText('125000€')).toBeInTheDocument();
  });
});