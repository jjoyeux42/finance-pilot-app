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
import { TransactionHistory } from '@/components/TransactionHistory';
import { CashFlowAnalysis } from '@/components/CashFlowAnalysis';

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
                <h1 className="text-3xl font-bold text-slate-900">💰 Trésorerie</h1>
                <p className="text-slate-600">Gestion et suivi de votre flux de trésorerie</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setActiveModal('period')}
                className="hover:bg-slate-100"
              >
                <Calendar className="w-4 h-4 mr-2" />
                Période
              </Button>
              <Button 
                className="bg-blue-600 hover:bg-blue-700 shadow-lg"
                onClick={() => setActiveModal('transaction')}
              >
                <DollarSign className="w-4 h-4 mr-2" />
                Nouvelle Transaction
              </Button>
            </div>
          </div>

          {/* KPIs Trésorerie */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
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
                  <div className="p-3 bg-blue-100 rounded-full">
                    <Wallet className="w-8 h-8 text-blue-600" />
                  </div>
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

          {/* Graphiques modernisés */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="border-0 shadow-xl bg-gradient-to-br from-white/95 to-blue-50/30 backdrop-blur-sm rounded-2xl">
              <CardHeader className="pb-6">
                <CardTitle className="text-xl font-bold text-slate-900 flex items-center space-x-3">
                  <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl text-white">
                    📈
                  </div>
                  <span>Évolution de la Trésorerie</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={cashFlowData}>
                    <defs>
                      <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="5 5" stroke="#e2e8f0" opacity={0.6} />
                    <XAxis dataKey="month" stroke="#475569" fontSize={12} fontWeight={600} />
                    <YAxis stroke="#475569" fontSize={12} fontWeight={600} />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                        border: 'none',
                        borderRadius: '16px',
                        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                        backdropFilter: 'blur(10px)',
                        fontSize: '14px',
                        fontWeight: '500'
                      }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="solde" 
                      stroke="#3b82f6" 
                      strokeWidth={4} 
                      dot={{ fill: '#3b82f6', strokeWidth: 2, r: 6 }}
                      activeDot={{ r: 8, stroke: '#3b82f6', strokeWidth: 2, fill: '#ffffff' }}
                      filter="url(#glow)"
                    />
                    <defs>
                      <filter id="glow">
                        <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                        <feMerge> 
                          <feMergeNode in="coloredBlur"/>
                          <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                      </filter>
                    </defs>
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-slate-900">
                  📊 Flux Entrants vs Sortants
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={cashFlowData}>
                    <defs>
                      <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0.3}/>
                      </linearGradient>
                      <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#ef4444" stopOpacity={0.3}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="5 5" stroke="#e2e8f0" opacity={0.6} />
                    <XAxis dataKey="month" stroke="#475569" fontSize={12} fontWeight={600} />
                    <YAxis stroke="#475569" fontSize={12} fontWeight={600} />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                        border: 'none',
                        borderRadius: '12px',
                        boxShadow: '0 10px 25px -5px rgb(0 0 0 / 0.25)'
                      }}
                    />
                    <Bar dataKey="entrees" fill="url(#colorIncome)" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="sorties" fill="url(#colorExpense)" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Analyse de flux */}
          <CashFlowAnalysis />

          {/* Historique des transactions */}
          <TransactionHistory />

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
