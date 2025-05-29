import React, { useState } from 'react';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  TrendingUp, 
  TrendingDown, 
  Users,
  Target,
  Calendar,
  Star
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { PlanningModal } from '@/components/modals/PlanningModal';
import { ProspectModal } from '@/components/modals/ProspectModal';

const salesData = [
  { month: 'Jan', leads: 45, converted: 12, revenue: 87000 },
  { month: 'Feb', leads: 52, converted: 15, revenue: 104000 },
  { month: 'Mar', leads: 48, converted: 11, revenue: 78000 },
  { month: 'Apr', leads: 61, converted: 18, revenue: 132000 },
  { month: 'May', leads: 55, converted: 16, revenue: 118000 },
  { month: 'Jun', leads: 67, converted: 21, revenue: 156000 },
];

const topClients = [
  { id: 1, name: 'Entreprise Alpha', revenue: 125000, growth: 15, status: 'active', score: 95 },
  { id: 2, name: 'Beta Corp', revenue: 89000, growth: 8, status: 'active', score: 88 },
  { id: 3, name: 'Gamma Industries', revenue: 76000, growth: -3, status: 'at_risk', score: 72 },
  { id: 4, name: 'Delta Solutions', revenue: 54000, growth: 25, status: 'growing', score: 91 },
  { id: 5, name: 'Epsilon Group', revenue: 43000, growth: 12, status: 'active', score: 84 },
];

const pipeline = [
  { id: 1, prospect: 'Tech Innovations', value: 45000, probability: 75, stage: 'Négociation', contact: 'Marie Dupont' },
  { id: 2, prospect: 'Digital Partners', value: 32000, probability: 60, stage: 'Proposition', contact: 'Pierre Martin' },
  { id: 3, prospect: 'Future Systems', value: 67000, probability: 40, stage: 'Qualification', contact: 'Sophie Bernard' },
  { id: 4, prospect: 'Smart Business', value: 23000, probability: 85, stage: 'Closing', contact: 'Lucas Moreau' },
];

const Sales = () => {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-emerald-600 bg-emerald-100';
      case 'growing': return 'text-blue-600 bg-blue-100';
      case 'at_risk': return 'text-red-600 bg-red-100';
      default: return 'text-slate-600 bg-slate-100';
    }
  };

  const getStageColor = (stage: string) => {
    switch (stage) {
      case 'Closing': return 'text-emerald-600 bg-emerald-100';
      case 'Négociation': return 'text-blue-600 bg-blue-100';
      case 'Proposition': return 'text-purple-600 bg-purple-100';
      case 'Qualification': return 'text-indigo-600 bg-indigo-100';
      default: return 'text-slate-600 bg-slate-100';
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-slate-50 to-emerald-50">
        <AppSidebar />
        <main className="flex-1 p-6 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <SidebarTrigger className="lg:hidden" />
              <div>
                <h1 className="text-3xl font-bold text-slate-900">Commercial</h1>
                <p className="text-slate-600">Gestion des ventes et relation client</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setActiveModal('planning')}
              >
                <Calendar className="w-4 h-4 mr-2" />
                Planning
              </Button>
              <Button 
                className="bg-emerald-600 hover:bg-emerald-700"
                onClick={() => setActiveModal('prospect')}
              >
                <Users className="w-4 h-4 mr-2" />
                Nouveau Prospect
              </Button>
            </div>
          </div>

          {/* KPIs Commercial */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="border-0 shadow-md bg-white/70 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Taux de Conversion</p>
                    <p className="text-2xl font-bold text-slate-900">31.3%</p>
                    <div className="flex items-center mt-2">
                      <TrendingUp className="w-4 h-4 text-emerald-600" />
                      <span className="text-sm text-emerald-600 ml-1">+4.2%</span>
                    </div>
                  </div>
                  <Target className="w-8 h-8 text-emerald-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md bg-white/70 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">CA Prévisionnel</p>
                    <p className="text-2xl font-bold text-slate-900">167K€</p>
                    <div className="flex items-center mt-2">
                      <TrendingUp className="w-4 h-4 text-emerald-600" />
                      <span className="text-sm text-emerald-600 ml-1">Pipeline</span>
                    </div>
                  </div>
                  <TrendingUp className="w-8 h-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md bg-white/70 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Nouveaux Leads</p>
                    <p className="text-2xl font-bold text-slate-900">67</p>
                    <div className="flex items-center mt-2">
                      <TrendingUp className="w-4 h-4 text-emerald-600" />
                      <span className="text-sm text-emerald-600 ml-1">Ce mois</span>
                    </div>
                  </div>
                  <Users className="w-8 h-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md bg-white/70 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Clients Actifs</p>
                    <p className="text-2xl font-bold text-slate-900">127</p>
                    <div className="flex items-center mt-2">
                      <TrendingUp className="w-4 h-4 text-emerald-600" />
                      <span className="text-sm text-emerald-600 ml-1">+8 ce mois</span>
                    </div>
                  </div>
                  <Star className="w-8 h-8 text-indigo-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Graphiques */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-0 shadow-md bg-white/70 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-slate-900">
                  Performance Commerciale
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={salesData}>
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
                    <Line type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={3} name="CA" />
                    <Line type="monotone" dataKey="converted" stroke="#3b82f6" strokeWidth={2} name="Conversions" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md bg-white/70 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-slate-900">
                  Leads vs Conversions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={salesData}>
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
                    <Bar dataKey="leads" fill="#94a3b8" name="Leads" />
                    <Bar dataKey="converted" fill="#10b981" name="Convertis" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Pipeline et Top Clients */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-0 shadow-md bg-white/70 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-slate-900 flex items-center">
                  <Target className="w-5 h-5 mr-2" />
                  Pipeline Commercial
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pipeline.map((deal) => (
                    <div key={deal.id} className="p-4 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-slate-900">{deal.prospect}</h4>
                        <span className="font-bold text-emerald-600">{deal.value.toLocaleString()}€</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStageColor(deal.stage)}`}>
                            {deal.stage}
                          </span>
                          <span className="text-slate-600">{deal.probability}%</span>
                        </div>
                        <span className="text-slate-600">{deal.contact}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md bg-white/70 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-slate-900 flex items-center">
                  <Star className="w-5 h-5 mr-2" />
                  Top Clients
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topClients.map((client) => (
                    <div key={client.id} className="p-4 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-slate-900">{client.name}</h4>
                        <span className="font-bold text-slate-700">{client.revenue.toLocaleString()}€</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(client.status)}`}>
                            {client.status === 'active' ? 'Actif' : client.status === 'growing' ? 'En croissance' : 'À risque'}
                          </span>
                          <span className="text-slate-600">Score: {client.score}/100</span>
                        </div>
                        <span className={`flex items-center ${client.growth > 0 ? 'text-emerald-600' : 'text-red-500'}`}>
                          {client.growth > 0 ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                          {Math.abs(client.growth)}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>

      <PlanningModal
        isOpen={activeModal === 'planning'}
        onClose={() => setActiveModal(null)}
      />
      
      <ProspectModal
        isOpen={activeModal === 'prospect'}
        onClose={() => setActiveModal(null)}
      />
    </SidebarProvider>
  );
};

export default Sales;
