
import React from 'react';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { KPICard } from "@/components/KPICard";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { 
  TrendingUp, 
  Target,
  Percent,
  DollarSign,
  Download,
  Filter
} from 'lucide-react';

const marginData = [
  { mois: 'Jan', marge: 32, objectif: 30 },
  { mois: 'Fév', marge: 35, objectif: 30 },
  { mois: 'Mar', marge: 28, objectif: 30 },
  { mois: 'Avr', marge: 42, objectif: 30 },
  { mois: 'Mai', marge: 38, objectif: 30 },
  { mois: 'Jun', marge: 45, objectif: 30 },
];

const productData = [
  { name: 'Service Premium', value: 45, color: '#525cff' },
  { name: 'Pack Standard', value: 30, color: '#22c55e' },
  { name: 'Formation', value: 15, color: '#f59e0b' },
  { name: 'Support', value: 10, color: '#ef4444' },
];

const Rentabilite = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-white">
        <AppSidebar />
        <main className="flex-1 p-6 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <SidebarTrigger className="lg:hidden" />
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Analyse de Rentabilité</h1>
                <p className="text-gray-600">Optimisez vos marges et analysez la performance par segment</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                Filtrer
              </Button>
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Exporter
              </Button>
            </div>
          </div>

          {/* KPIs Rentabilité */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <KPICard
              title="Marge Brute"
              value="38.5%"
              change={5.2}
              changeLabel="vs mois dernier"
              icon={<Percent className="w-5 h-5" />}
              trend="up"
              color="success"
            />
            <KPICard
              title="Marge Nette"
              value="22.1%"
              change={2.8}
              changeLabel="vs mois dernier"
              icon={<TrendingUp className="w-5 h-5" />}
              trend="up"
              color="default"
            />
            <KPICard
              title="EBITDA"
              value="156 780€"
              change={8.9}
              changeLabel="vs mois dernier"
              icon={<DollarSign className="w-5 h-5" />}
              trend="up"
              color="success"
            />
            <KPICard
              title="ROI"
              value="18.3%"
              change={1.2}
              changeLabel="vs objectif"
              icon={<Target className="w-5 h-5" />}
              trend="up"
              color="warning"
            />
          </div>

          {/* Graphiques */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Évolution des marges */}
            <Card>
              <CardHeader>
                <CardTitle>Évolution des Marges</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={marginData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="mois" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="marge" fill="#525cff" name="Marge réelle" />
                      <Bar dataKey="objectif" fill="#22c55e" name="Objectif" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Répartition par produit */}
            <Card>
              <CardHeader>
                <CardTitle>Rentabilité par Produit</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={productData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        dataKey="value"
                      >
                        {productData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-2">
                  {productData.map((item, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: item.color }}
                      ></div>
                      <span className="text-sm text-gray-600">{item.name}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Top clients par rentabilité */}
          <Card>
            <CardHeader>
              <CardTitle>Top Clients par Rentabilité</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { client: "Entreprise Alpha", ca: "125 000€", marge: "32%", evolution: "+8%" },
                  { client: "Société Beta", ca: "98 000€", marge: "28%", evolution: "+5%" },
                  { client: "Groupe Gamma", ca: "87 000€", marge: "35%", evolution: "+12%" },
                  { client: "Corp Delta", ca: "76 000€", marge: "25%", evolution: "-2%" },
                ].map((client, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{client.client}</p>
                      <p className="text-sm text-gray-600">CA: {client.ca}</p>
                    </div>
                    <div className="text-center">
                      <p className="font-semibold text-gray-900">{client.marge}</p>
                      <p className="text-sm text-gray-600">Marge</p>
                    </div>
                    <div className="text-right">
                      <p className={`font-semibold ${client.evolution.startsWith('+') ? 'text-success-600' : 'text-danger-600'}`}>
                        {client.evolution}
                      </p>
                      <p className="text-sm text-gray-600">Évolution</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Rentabilite;
