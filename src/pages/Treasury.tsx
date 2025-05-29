import React, { useState } from 'react';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  TrendingUp, 
  TrendingDown, 
  Calendar,
  DollarSign,
  Wallet,
  Target
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { TransactionModal } from '@/components/modals/TransactionModal';
import { PeriodModal } from '@/components/modals/PeriodModal';

const cashFlowData = [
  { month: 'Jan', entrees: 45000, sorties: 38000, solde: 7000 },
  { month: 'Feb', entrees: 52000, sorties: 41000, solde: 18000 },
  { month: 'Mar', entrees: 48000, sorties: 44000, solde: 22000 },
  { month: 'Apr', entrees: 61000, sorties: 39000, solde: 44000 },
  { month: 'May', entrees: 55000, sorties: 47000, solde: 52000 },
  { month: 'Jun', entrees: 67000, sorties: 43000, solde: 76000 },
];

const upcomingPayments = [
  { id: 1, description: 'Salaires équipe', amount: 28500, date: '2024-01-15', type: 'sortie' },
  { id: 2, description: 'Facture Client ABC', amount: 15000, date: '2024-01-18', type: 'entree' },
  { id: 3, description: 'Loyer bureaux', amount: 4200, date: '2024-01-20', type: 'sortie' },
  { id: 4, description: 'Facture Client XYZ', amount: 22000, date: '2024-01-25', type: 'entree' },
];

const Treasury = () => {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-slate-50 to-blue-50">
        <AppSidebar />
        <main className="flex-1 p-6 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <SidebarTrigger className="lg:hidden" />
              <div>
                <h1 className="text-3xl font-bold text-slate-900">Trésorerie</h1>
                <p className="text-slate-600">Gestion et suivi de votre flux de trésorerie</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setActiveModal('period')}
              >
                <Calendar className="w-4 h-4 mr-2" />
                Période
              </Button>
              <Button 
                className="bg-blue-600 hover:bg-blue-700"
                onClick={() => setActiveModal('transaction')}
              >
                <DollarSign className="w-4 h-4 mr-2" />
                Nouvelle Transaction
              </Button>
            </div>
          </div>

          {/* KPIs Trésorerie */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="border-0 shadow-md bg-white/70 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Solde Actuel</p>
                    <p className="text-2xl font-bold text-slate-900">76 450€</p>
                    <div className="flex items-center mt-2">
                      <TrendingUp className="w-4 h-4 text-emerald-600" />
                      <span className="text-sm text-emerald-600 ml-1">+12.5%</span>
                    </div>
                  </div>
                  <Wallet className="w-8 h-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md bg-white/70 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Entrées du Mois</p>
                    <p className="text-2xl font-bold text-slate-900">67 000€</p>
                    <div className="flex items-center mt-2">
                      <TrendingUp className="w-4 h-4 text-emerald-600" />
                      <span className="text-sm text-emerald-600 ml-1">+8.2%</span>
                    </div>
                  </div>
                  <TrendingUp className="w-8 h-8 text-emerald-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md bg-white/70 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Sorties du Mois</p>
                    <p className="text-2xl font-bold text-slate-900">43 000€</p>
                    <div className="flex items-center mt-2">
                      <TrendingDown className="w-4 h-4 text-red-500" />
                      <span className="text-sm text-red-500 ml-1">+3.1%</span>
                    </div>
                  </div>
                  <TrendingDown className="w-8 h-8 text-red-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md bg-white/70 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Flux Net</p>
                    <p className="text-2xl font-bold text-slate-900">+24 000€</p>
                    <div className="flex items-center mt-2">
                      <TrendingUp className="w-4 h-4 text-emerald-600" />
                      <span className="text-sm text-emerald-600 ml-1">+15.3%</span>
                    </div>
                  </div>
                  <Target className="w-8 h-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Graphiques */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-0 shadow-md bg-white/70 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-slate-900">
                  Évolution de la Trésorerie
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={cashFlowData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="month" stroke="#64748b" />
                    <YAxis stroke="#64748b" />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'white',
                        border: '1px solid #e2e8f0',
                        borderRadius: '8px'
                      }}
                    />
                    <Line type="monotone" dataKey="solde" stroke="#3b82f6" strokeWidth={3} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md bg-white/70 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-slate-900">
                  Flux Entrants vs Sortants
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={cashFlowData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="month" stroke="#64748b" />
                    <YAxis stroke="#64748b" />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'white',
                        border: '1px solid #e2e8f0',
                        borderRadius: '8px'
                      }}
                    />
                    <Bar dataKey="entrees" fill="#10b981" />
                    <Bar dataKey="sorties" fill="#ef4444" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Échéances à venir */}
          <Card className="border-0 shadow-md bg-white/70 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-slate-900 flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                Échéances à Venir
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingPayments.map((payment) => (
                  <div key={payment.id} className="flex items-center justify-between p-4 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors">
                    <div className="flex items-center space-x-4">
                      <div className={`p-2 rounded-full ${payment.type === 'entree' ? 'bg-emerald-100' : 'bg-red-100'}`}>
                        {payment.type === 'entree' ? 
                          <TrendingUp className="w-4 h-4 text-emerald-600" /> : 
                          <TrendingDown className="w-4 h-4 text-red-500" />
                        }
                      </div>
                      <div>
                        <p className="font-medium text-slate-900">{payment.description}</p>
                        <p className="text-sm text-slate-600">{payment.date}</p>
                      </div>
                    </div>
                    <span className={`font-semibold ${payment.type === 'entree' ? 'text-emerald-600' : 'text-red-500'}`}>
                      {payment.type === 'entree' ? '+' : '-'}{payment.amount.toLocaleString()}€
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </main>
      </div>

      <TransactionModal
        isOpen={activeModal === 'transaction'}
        onClose={() => setActiveModal(null)}
      />
      
      <PeriodModal
        isOpen={activeModal === 'period'}
        onClose={() => setActiveModal(null)}
      />
    </SidebarProvider>
  );
};

export default Treasury;
