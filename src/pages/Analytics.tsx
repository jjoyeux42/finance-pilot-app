
import React, { useState } from 'react';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Download,
  Filter,
  Eye,
  Target,
  Users,
  DollarSign
} from 'lucide-react';
import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

const performanceData = [
  { month: 'Jan', ca: 45000, objectif: 50000, marge: 17000, clients: 98 },
  { month: 'Feb', ca: 52000, objectif: 50000, marge: 21000, clients: 105 },
  { month: 'Mar', ca: 48000, objectif: 55000, marge: 19000, clients: 110 },
  { month: 'Apr', ca: 61000, objectif: 55000, marge: 26000, clients: 118 },
  { month: 'May', ca: 55000, objectif: 60000, marge: 23000, clients: 122 },
  { month: 'Jun', ca: 67000, objectif: 60000, marge: 29000, clients: 127 },
];

const radarData = [
  { subject: 'Rentabilité', A: 120, fullMark: 150 },
  { subject: 'Croissance', A: 98, fullMark: 150 },
  { subject: 'Trésorerie', A: 86, fullMark: 150 },
  { subject: 'Satisfaction Client', A: 99, fullMark: 150 },
  { subject: 'Innovation', A: 85, fullMark: 150 },
  { subject: 'Efficacité', A: 65, fullMark: 150 },
];

const kpiSummary = [
  { name: 'CA Réalisé', value: '328K€', target: '330K€', progress: 99.4, trend: 'up' },
  { name: 'Marge Moyenne', value: '43.2%', target: '45%', progress: 96, trend: 'up' },
  { name: 'Nouveaux Clients', value: '29', target: '25', progress: 116, trend: 'up' },
  { name: 'Rétention Client', value: '94.5%', target: '90%', progress: 105, trend: 'up' },
];

const Analytics = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('6m');
  const [selectedMetric, setSelectedMetric] = useState('all');

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-slate-50 to-indigo-50">
        <AppSidebar />
        <main className="flex-1 p-6 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <SidebarTrigger className="lg:hidden" />
              <div>
                <h1 className="text-3xl font-bold text-slate-900">Analytics</h1>
                <p className="text-slate-600">Analyses avancées et business intelligence</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filtres
              </Button>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
              <Button className="bg-indigo-600 hover:bg-indigo-700">
                <Eye className="w-4 h-4 mr-2" />
                Dashboard Exec
              </Button>
            </div>
          </div>

          {/* Vue d'ensemble Performance */}
<<<<<<< HEAD
          <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-slate-900 flex items-center">
                <BarChart3 className="w-6 h-6 mr-3" />
                Vue d'Ensemble Performance
=======
          <Card className="border-0 shadow-xl bg-gradient-to-br from-white/95 to-blue-50/30 backdrop-blur-sm rounded-2xl">
            <CardHeader className="pb-6">
              <CardTitle className="text-2xl font-bold text-slate-900 flex items-center space-x-3">
                <div className="p-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl text-white">
                  <BarChart3 className="w-6 h-6" />
                </div>
                <span>Vue d'Ensemble Performance</span>
>>>>>>> 764e393 (feat: Secure Supabase configuration and protect environment variables)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <ComposedChart data={performanceData}>
<<<<<<< HEAD
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="month" stroke="#64748b" />
                  <YAxis yAxisId="left" stroke="#64748b" />
                  <YAxis yAxisId="right" orientation="right" stroke="#64748b" />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #e2e8f0',
                      borderRadius: '12px',
                      boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Bar yAxisId="left" dataKey="ca" fill="#3b82f6" name="CA Réalisé" />
                  <Bar yAxisId="left" dataKey="objectif" fill="#94a3b8" name="Objectif" />
                  <Line yAxisId="right" type="monotone" dataKey="clients" stroke="#10b981" strokeWidth={3} name="Nb Clients" />
=======
                  <CartesianGrid strokeDasharray="5 5" stroke="#e2e8f0" opacity={0.6} />
                  <XAxis dataKey="month" stroke="#475569" fontSize={12} fontWeight={500} />
                  <YAxis yAxisId="left" stroke="#475569" fontSize={12} fontWeight={500} />
                  <YAxis yAxisId="right" orientation="right" stroke="#475569" fontSize={12} fontWeight={500} />
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
                  <Bar yAxisId="left" dataKey="ca" fill="url(#colorCA)" name="CA Réalisé" radius={[4, 4, 0, 0]} />
                  <Bar yAxisId="left" dataKey="objectif" fill="url(#colorObjectif)" name="Objectif" radius={[4, 4, 0, 0]} />
                  <Line yAxisId="right" type="monotone" dataKey="clients" stroke="#10b981" strokeWidth={4} name="Nb Clients" dot={{ fill: '#10b981', strokeWidth: 2, r: 6 }} activeDot={{ r: 8, stroke: '#10b981', strokeWidth: 2, fill: '#ffffff' }} />
                  <defs>
                    <linearGradient id="colorCA" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#3b82f6" stopOpacity={1}/>
                      <stop offset="100%" stopColor="#1d4ed8" stopOpacity={0.8}/>
                    </linearGradient>
                    <linearGradient id="colorObjectif" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#94a3b8" stopOpacity={1}/>
                      <stop offset="100%" stopColor="#64748b" stopOpacity={0.8}/>
                    </linearGradient>
                  </defs>
>>>>>>> 764e393 (feat: Secure Supabase configuration and protect environment variables)
                </ComposedChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* KPIs Résumé */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {kpiSummary.map((kpi, index) => (
<<<<<<< HEAD
              <Card key={index} className="border-0 shadow-md bg-white/70 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-medium text-slate-600">{kpi.name}</h3>
                    {kpi.trend === 'up' ? 
                      <TrendingUp className="w-4 h-4 text-emerald-600" /> : 
                      <TrendingDown className="w-4 h-4 text-red-500" />
                    }
=======
              <Card key={index} className="border-0 shadow-xl bg-gradient-to-br from-white/95 to-slate-50/30 backdrop-blur-sm rounded-2xl hover:shadow-2xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-semibold text-slate-700">{kpi.name}</h3>
                    <div className={`p-2 rounded-xl ${
                      kpi.trend === 'up' ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-500'
                    }`}>
                      {kpi.trend === 'up' ? 
                        <TrendingUp className="w-4 h-4" /> : 
                        <TrendingDown className="w-4 h-4" />
                      }
                    </div>
>>>>>>> 764e393 (feat: Secure Supabase configuration and protect environment variables)
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-slate-900">{kpi.value}</span>
                      <span className="text-sm text-slate-500">/ {kpi.target}</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${kpi.progress >= 100 ? 'bg-emerald-500' : kpi.progress >= 80 ? 'bg-blue-500' : 'bg-orange-500'}`}
                        style={{ width: `${Math.min(kpi.progress, 100)}%` }}
                      ></div>
                    </div>
                    <span className={`text-sm font-medium ${kpi.progress >= 100 ? 'text-emerald-600' : kpi.progress >= 80 ? 'text-blue-600' : 'text-orange-600'}`}>
                      {kpi.progress}% de l'objectif
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Graphiques Avancés */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-0 shadow-md bg-white/70 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-slate-900">
                  Radar Performance Globale
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RadarChart data={radarData}>
                    <PolarGrid stroke="#e2e8f0" />
                    <PolarAngleAxis dataKey="subject" tick={{ fontSize: 12, fill: '#64748b' }} />
                    <PolarRadiusAxis 
                      tick={{ fontSize: 10, fill: '#94a3b8' }}
                      tickCount={6}
                      domain={[0, 150]}
                    />
                    <Radar
                      name="Performance"
                      dataKey="A"
                      stroke="#3b82f6"
                      fill="#3b82f6"
                      fillOpacity={0.3}
                      strokeWidth={2}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md bg-white/70 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-slate-900">
                  Métriques Clés Temps Réel
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 rounded-lg bg-gradient-to-r from-blue-50 to-blue-100">
                    <div className="flex items-center space-x-3">
                      <DollarSign className="w-8 h-8 text-blue-600" />
                      <div>
                        <p className="text-sm font-medium text-slate-600">CA Journalier Moyen</p>
                        <p className="text-xl font-bold text-slate-900">2 234€</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-emerald-600 font-medium">+12.3%</p>
                      <p className="text-xs text-slate-500">vs hier</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-lg bg-gradient-to-r from-emerald-50 to-emerald-100">
                    <div className="flex items-center space-x-3">
                      <Target className="w-8 h-8 text-emerald-600" />
                      <div>
                        <p className="text-sm font-medium text-slate-600">Taux de Closing</p>
                        <p className="text-xl font-bold text-slate-900">31.5%</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-emerald-600 font-medium">+2.1%</p>
                      <p className="text-xs text-slate-500">ce mois</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-lg bg-gradient-to-r from-purple-50 to-purple-100">
                    <div className="flex items-center space-x-3">
                      <Users className="w-8 h-8 text-purple-600" />
                      <div>
                        <p className="text-sm font-medium text-slate-600">Valeur Vie Client</p>
                        <p className="text-xl font-bold text-slate-900">12 580€</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-emerald-600 font-medium">+8.7%</p>
                      <p className="text-xs text-slate-500">tendance</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Insights et Recommandations */}
          <Card className="border-0 shadow-md bg-white/70 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-slate-900 flex items-center">
                <Target className="w-5 h-5 mr-2" />
                Insights et Recommandations IA
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="p-4 rounded-lg border-l-4 border-emerald-500 bg-emerald-50">
                    <h4 className="font-semibold text-emerald-800 mb-2">📈 Opportunité Détectée</h4>
                    <p className="text-sm text-emerald-700">
                      Votre taux de conversion sur le segment "Enterprise" est 23% supérieur à la moyenne. 
                      Recommandation : Augmenter les efforts marketing sur ce segment.
                    </p>
                  </div>
                  
                  <div className="p-4 rounded-lg border-l-4 border-blue-500 bg-blue-50">
                    <h4 className="font-semibold text-blue-800 mb-2">💡 Insight Performance</h4>
                    <p className="text-sm text-blue-700">
                      Les clients acquis en Q1 montrent une rétention 15% supérieure. 
                      Analysez les techniques de cette période pour les reproduire.
                    </p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="p-4 rounded-lg border-l-4 border-orange-500 bg-orange-50">
                    <h4 className="font-semibold text-orange-800 mb-2">⚠️ Alerte Tendance</h4>
                    <p className="text-sm text-orange-700">
                      Ralentissement détecté sur le produit "Service C" (-8% ce mois). 
                      Recommandation : Réévaluer la stratégie pricing ou communication.
                    </p>
                  </div>
                  
                  <div className="p-4 rounded-lg border-l-4 border-purple-500 bg-purple-50">
                    <h4 className="font-semibold text-purple-800 mb-2">🎯 Prédiction</h4>
                    <p className="text-sm text-purple-700">
                      Basé sur les tendances actuelles, probabilité de 87% d'atteindre 
                      l'objectif trimestriel avec 3 semaines d'avance.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Analytics;
