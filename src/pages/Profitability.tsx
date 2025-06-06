import React, { useState } from 'react';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  TrendingUp, 
  TrendingDown, 
  PieChart as PieChartIcon,
  Target,
  Users,
  Package,
  BarChart3
} from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { ReportModal } from '@/components/modals/ReportModal';
import { AnalysisModal } from '@/components/modals/AnalysisModal';

const profitabilityData = [
  { month: 'Jan', ca: 45000, couts: 28000, marge: 17000 },
  { month: 'Feb', ca: 52000, couts: 31000, marge: 21000 },
  { month: 'Mar', ca: 48000, couts: 29000, marge: 19000 },
  { month: 'Apr', ca: 61000, couts: 35000, marge: 26000 },
  { month: 'May', ca: 55000, couts: 32000, marge: 23000 },
  { month: 'Jun', ca: 67000, couts: 38000, marge: 29000 },
];

const clientProfitability = [
  { name: 'Client A', value: 35, revenue: 125000 },
  { name: 'Client B', value: 25, revenue: 89000 },
  { name: 'Client C', value: 20, revenue: 72000 },
  { name: 'Client D', value: 15, revenue: 54000 },
  { name: 'Autres', value: 5, revenue: 18000 },
];

const productProfitability = [
  { product: 'Service A', revenue: 89000, margin: 65, growth: 12 },
  { product: 'Service B', revenue: 76000, margin: 58, growth: 8 },
  { product: 'Service C', revenue: 54000, margin: 72, growth: -3 },
  { product: 'Service D', revenue: 43000, margin: 45, growth: 15 },
];

const COLORS = ['#3b82f6', '#10b981', '#8b5cf6', '#ef4444', '#ffffff'];

const Profitability = () => {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-white">
        <AppSidebar />
        <main className="flex-1 p-3 sm:p-6 lg:p-8 space-y-4 sm:space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center space-x-4 w-full sm:w-auto">
              <SidebarTrigger className="lg:hidden" />
              <div className="flex-1">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900">📊 Rentabilité</h1>
                <p className="text-slate-600 text-sm sm:text-base lg:text-lg">Analyse de la performance et des marges</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 w-full sm:w-auto">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setActiveModal('report')}
                className="w-full sm:w-auto"
              >
                <BarChart3 className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Rapport</span>
                <span className="sm:hidden">Voir rapport</span>
              </Button>
              <Button 
                className="bg-purple-600 hover:bg-purple-700 w-full sm:w-auto"
                onClick={() => setActiveModal('analysis')}
              >
                <PieChartIcon className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Analyser</span>
                <span className="sm:hidden">Analyser</span>
              </Button>
            </div>
          </div>

          {/* KPIs Rentabilité */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <Card className="border-0 shadow-md bg-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Marge Brute</p>
                    <p className="text-2xl font-bold text-slate-900">43.2%</p>
                    <div className="flex items-center mt-2">
                      <TrendingUp className="w-4 h-4 text-emerald-600" />
                      <span className="text-sm text-emerald-600 ml-1">+2.1%</span>
                    </div>
                  </div>
                  <Target className="w-8 h-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md bg-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">CA le Plus Rentable</p>
                    <p className="text-2xl font-bold text-slate-900">72%</p>
                    <div className="flex items-center mt-2">
                      <TrendingUp className="w-4 h-4 text-emerald-600" />
                      <span className="text-sm text-emerald-600 ml-1">Service C</span>
                    </div>
                  </div>
                  <Package className="w-8 h-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md bg-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Top Client</p>
                    <p className="text-2xl font-bold text-slate-900">35%</p>
                    <div className="flex items-center mt-2">
                      <Users className="w-4 h-4 text-blue-600" />
                      <span className="text-sm text-slate-600 ml-1">du CA total</span>
                    </div>
                  </div>
                  <Users className="w-8 h-8 text-emerald-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md bg-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Croissance Marge</p>
                    <p className="text-2xl font-bold text-slate-900">+8.7%</p>
                    <div className="flex items-center mt-2">
                      <TrendingUp className="w-4 h-4 text-emerald-600" />
                      <span className="text-sm text-emerald-600 ml-1">vs année N-1</span>
                    </div>
                  </div>
                  <TrendingUp className="w-8 h-8 text-green-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Graphiques */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
            <Card className="border-0 shadow-xl bg-white rounded-2xl">
              <CardHeader className="pb-6">
                <CardTitle className="text-xl font-bold text-slate-900 flex items-center space-x-3">
                  <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl text-white">
                    📊
                  </div>
                  <span>Évolution CA vs Marge</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={profitabilityData}>
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
                    <Bar dataKey="ca" fill="url(#colorCA)" name="Chiffre d'Affaires" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="marge" fill="url(#colorMarge)" name="Marge" radius={[4, 4, 0, 0]} />
                    <defs>
                      <linearGradient id="colorCA" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#3b82f6" stopOpacity={1}/>
                        <stop offset="100%" stopColor="#1d4ed8" stopOpacity={0.8}/>
                      </linearGradient>
                      <linearGradient id="colorMarge" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#10b981" stopOpacity={1}/>
                        <stop offset="100%" stopColor="#059669" stopOpacity={0.8}/>
                      </linearGradient>
                    </defs>
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-xl bg-white rounded-2xl">
              <CardHeader className="pb-6">
                <CardTitle className="text-xl font-bold text-slate-900 flex items-center space-x-3">
                  <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl text-white">
                    🥧
                  </div>
                  <span>Répartition CA par Client</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={clientProfitability}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: ${value}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {clientProfitability.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Tableau Rentabilité Produits */}
          <Card className="border-0 shadow-md bg-white">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-slate-900 flex items-center">
                <Package className="w-5 h-5 mr-2" />
                Rentabilité par Produit/Service
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white">
                      <th className="text-left py-3 px-4 font-semibold text-slate-700">Produit/Service</th>
                      <th className="text-right py-3 px-4 font-semibold text-slate-700">Chiffre d'Affaires</th>
                      <th className="text-right py-3 px-4 font-semibold text-slate-700">Marge (%)</th>
                      <th className="text-right py-3 px-4 font-semibold text-slate-700">Croissance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {productProfitability.map((product, index) => (
                      <tr key={index} className="border-b border-white hover:bg-slate-50">
                        <td className="py-3 px-4 font-medium text-slate-900">{product.product}</td>
                        <td className="py-3 px-4 text-right text-slate-700">{product.revenue.toLocaleString()}€</td>
                        <td className="py-3 px-4 text-right">
                          <span className={`font-semibold ${product.margin > 60 ? 'text-emerald-600' : product.margin > 50 ? 'text-blue-600' : 'text-purple-600'}`}>
                            {product.margin}%
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <span className={`flex items-center justify-end ${product.growth > 0 ? 'text-emerald-600' : 'text-red-500'}`}>
                            {product.growth > 0 ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}
                            {Math.abs(product.growth)}%
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>

      <ReportModal
        isOpen={activeModal === 'report'}
        onClose={() => setActiveModal(null)}
      />
      
      <AnalysisModal
        isOpen={activeModal === 'analysis'}
        onClose={() => setActiveModal(null)}
      />
    </SidebarProvider>
  );
};

export default Profitability;
