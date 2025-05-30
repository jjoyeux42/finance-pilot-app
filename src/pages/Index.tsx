
import React, { useState } from 'react';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { AppSidebar } from "@/components/AppSidebar";
import { KPICard } from "@/components/KPICard";
import { CashFlowChart } from "@/components/CashFlowChart";
import { AlertPanel } from "@/components/AlertPanel";
import { NotificationCenter } from "@/components/NotificationCenter";
import { QuickActions } from "@/components/QuickActions";
import TopPerformers from "@/components/TopPerformers";
import { 
  DollarSign, 
  TrendingUp, 
  Users, 
  Target,
  Calendar,
  Bell
} from 'lucide-react';

const Index = () => {
  const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false);
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);
  const [isNotificationCenterOpen, setIsNotificationCenterOpen] = useState(false);
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-slate-50 to-gray-100">
        <AppSidebar />
        <main className="flex-1 p-6 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Tableau de Bord</h1>
              <p className="text-gray-600 mt-1">Vue d'ensemble de votre situation financière</p>
            </div>
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setIsNotificationCenterOpen(true)}
                className="relative"
              >
                <Bell className="h-4 w-4" />
                <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">3</span>
              </Button>
              <SidebarTrigger className="md:hidden" />
            </div>
          </div>

          {/* KPIs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <KPICard
              title="Chiffre d'Affaires"
              value="245 680€"
              change={12.5}
              changeLabel="vs mois dernier"
              icon={<DollarSign className="w-5 h-5" />}
              trend="up"
              color="success"
            />
            <KPICard
              title="Marge Brute"
              value="89 450€"
              change={8.2}
              changeLabel="vs mois dernier"
              icon={<TrendingUp className="w-5 h-5" />}
              trend="up"
              color="default"
            />
            <KPICard
              title="Clients Actifs"
              value="127"
              change={-2.1}
              changeLabel="vs mois dernier"
              icon={<Users className="w-5 h-5" />}
              trend="down"
              color="default"
            />
            <KPICard
              title="Objectif Mensuel"
              value="92%"
              change={5.8}
              changeLabel="progression"
              icon={<Target className="w-5 h-5" />}
              trend="up"
              color="success"
            />
          </div>

          {/* Main Charts and Alerts */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <CashFlowChart />
            <AlertPanel />
          </div>

          {/* Quick Actions */}
          <QuickActions />

          {/* Top Performers */}
          <TopPerformers />

          {/* Footer */}
          <div className="text-center py-6 border-t border-slate-200">
            <p className="text-sm text-slate-500">
              FinancePilot © 2025 - Pilotage financier intelligent
            </p>
          </div>
        </main>
        </div>
        
        {/* Notification Center */}
        <NotificationCenter 
          isOpen={isNotificationCenterOpen}
          onClose={() => setIsNotificationCenterOpen(false)}
        />
      </SidebarProvider>
    );
  };
  
  export default Index;
