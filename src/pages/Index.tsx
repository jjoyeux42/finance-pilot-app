
import React from 'react';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { KPICard } from "@/components/KPICard";
import { CashFlowChart } from "@/components/CashFlowChart";
import { AlertPanel } from "@/components/AlertPanel";
import { QuickActions } from "@/components/QuickActions";
import { TopPerformers } from "@/components/TopPerformers";
import { 
  DollarSign, 
  TrendingUp, 
  Users, 
  Target,
  Calendar,
  Bell
} from 'lucide-react';

const Index = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <AppSidebar />
        <main className="flex-1 p-6 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <SidebarTrigger className="lg:hidden" />
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Dashboard Financier</h1>
                <p className="text-gray-600">Vue d'ensemble de votre performance financière</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-gray-600">Dernière mise à jour</p>
                <p className="text-sm font-medium text-gray-900">Aujourd'hui, 14:30</p>
              </div>
              <Bell className="w-6 h-6 text-gray-400" />
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
              color="warning"
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
          <div className="text-center py-6 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              FinancePilot © 2024 - Pilotage financier intelligent
            </p>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Index;
