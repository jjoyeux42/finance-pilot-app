import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider, useAuth } from "@/hooks/useAuth";

import Index from "./pages/Index";
import Treasury from "./pages/Treasury";
import Profitability from "./pages/Profitability";
import Sales from "./pages/Sales";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";
import Customers from "./pages/Customers";
import Invoices from "./pages/Invoices";
import Budget from "./pages/Budget";
import ExecutiveDashboard from "./pages/ExecutiveDashboard";
import OperationalDashboard from "./pages/OperationalDashboard";
import RiskDashboard from "./pages/RiskDashboard";
import Reports from "./pages/Reports";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";

// Test de connexion FinancePilot
import { supabase } from '@/integrations/supabase/client';

const testConnection = async () => {
  try {
    console.log('🔗 Test connexion ULTRA simple...');
    
    const { data, error } = await supabase
      .from('companies')
      .select('*')
      .limit(1);
    
    console.log('✅ Données companies:', data);
    console.log('❌ Erreur companies:', error);
    
  } catch (err) {
    console.error('💥 Erreur catch:', err);
  }
};

// Lancer le test au chargement
testConnection();

const queryClient = new QueryClient();

function AuthenticatedApp() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Chargement...</div>
      </div>
    );
  }

  if (!user) {
    return <Auth />;
  }

  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/treasury" element={<Treasury />} />
      <Route path="/profitability" element={<Profitability />} />
      <Route path="/sales" element={<Sales />} />
      <Route path="/analytics" element={<Analytics />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/customers" element={<Customers />} />
      <Route path="/invoices" element={<Invoices />} />
      <Route path="/budget" element={<Budget />} />
      <Route path="/executive" element={<ExecutiveDashboard />} />
      <Route path="/operational" element={<OperationalDashboard />} />
      <Route path="/risk" element={<RiskDashboard />} />
      <Route path="/reports" element={<Reports />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthenticatedApp />
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
