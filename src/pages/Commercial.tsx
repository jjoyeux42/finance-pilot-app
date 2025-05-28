
import React from 'react';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { KPICard } from "@/components/KPICard";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { 
  Users, 
  TrendingUp,
  Target,
  Phone,
  Download,
  Plus,
  Mail
} from 'lucide-react';

const salesData = [
  { mois: 'Jan', ventes: 45000, objectif: 40000, pipeline: 65000 },
  { mois: 'Fév', ventes: 52000, objectif: 45000, pipeline: 70000 },
  { mois: 'Mar', ventes: 48000, objectif: 47000, pipeline: 68000 },
  { mois: 'Avr', ventes: 61000, objectif: 50000, pipeline: 75000 },
  { mois: 'Mai', ventes: 58000, objectif: 52000, pipeline: 80000 },
  { mois: 'Jun', ventes: 67000, objectif: 55000, pipeline: 85000 },
];

const Commercial = () => {
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
                <h1 className="text-3xl font-bold text-gray-900">Suivi Commercial</h1>
                <p className="text-gray-600">Analysez vos performances commerciales et optimisez votre pipeline</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Exporter
              </Button>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Nouveau prospect
              </Button>
            </div>
          </div>

          {/* KPIs Commercial */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <KPICard
              title="CA Réalisé"
              value="267 000€"
              change={15.2}
              changeLabel="vs mois dernier"
              icon={<TrendingUp className="w-5 h-5" />}
              trend="up"
              color="success"
            />
            <KPICard
              title="Pipeline"
              value="425 000€"
              change={8.7}
              changeLabel="opportunités"
              icon={<Target className="w-5 h-5" />}
              trend="up"
              color="default"
            />
            <KPICard
              title="Taux de Conversion"
              value="68%"
              change={5.1}
              changeLabel="amélioration"
              icon={<Users className="w-5 h-5" />}
              trend="up"
              color="success"
            />
            <KPICard
              title="Cycle de Vente Moyen"
              value="42 jours"
              change={-12.3}
              changeLabel="réduction"
              icon={<Phone className="w-5 h-5" />}
              trend="up"
              color="warning"
            />
          </div>

          {/* Graphique des ventes */}
          <Card>
            <CardHeader>
              <CardTitle>Évolution des Ventes et Pipeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="mois" />
                    <YAxis tickFormatter={(value) => `${value / 1000}k€`} />
                    <Tooltip formatter={(value: number) => `${value.toLocaleString()}€`} />
                    <Line type="monotone" dataKey="ventes" stroke="#525cff" strokeWidth={3} name="Ventes réalisées" />
                    <Line type="monotone" dataKey="objectif" stroke="#22c55e" strokeWidth={2} strokeDasharray="8 8" name="Objectif" />
                    <Line type="monotone" dataKey="pipeline" stroke="#f59e0b" strokeWidth={2} name="Pipeline" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Sections supplémentaires */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Pipeline des opportunités */}
            <Card>
              <CardHeader>
                <CardTitle>Pipeline des Opportunités</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { prospect: "Nouvelle Entreprise", montant: "85 000€", probabilite: "90%", etape: "Négociation" },
                    { prospect: "Client Prospect XYZ", montant: "45 000€", probabilite: "70%", etape: "Proposition" },
                    { prospect: "Société Innovation", montant: "125 000€", probabilite: "50%", etape: "Qualification" },
                    { prospect: "Groupe Tech", montant: "67 000€", probabilite: "30%", etape: "Prospection" },
                  ].map((opp, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{opp.prospect}</p>
                        <p className="text-sm text-gray-600">{opp.etape}</p>
                      </div>
                      <div className="text-center">
                        <p className="font-semibold text-gray-900">{opp.montant}</p>
                        <p className="text-sm text-gray-600">{opp.probabilite}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Top commerciaux */}
            <Card>
              <CardHeader>
                <CardTitle>Performance Commerciaux</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { nom: "Marie Dupont", ca: "156 000€", objectif: "140 000€", taux: "111%" },
                    { nom: "Pierre Martin", ca: "134 000€", objectif: "130 000€", taux: "103%" },
                    { nom: "Sophie Bernard", ca: "118 000€", objectif: "125 000€", taux: "94%" },
                    { nom: "Jean Moreau", ca: "98 000€", objectif: "110 000€", taux: "89%" },
                  ].map((commercial, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{commercial.nom}</p>
                        <p className="text-sm text-gray-600">CA: {commercial.ca}</p>
                      </div>
                      <div className="text-right">
                        <p className={`font-semibold ${parseInt(commercial.taux) >= 100 ? 'text-success-600' : 'text-warning-600'}`}>
                          {commercial.taux}
                        </p>
                        <p className="text-sm text-gray-600">Objectif</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Actions rapides */}
          <Card>
            <CardHeader>
              <CardTitle>Actions Rapides</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
                  <Phone className="w-6 h-6 text-finance-600" />
                  <span>Programmer un appel</span>
                </Button>
                <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
                  <Mail className="w-6 h-6 text-finance-600" />
                  <span>Envoyer une proposition</span>
                </Button>
                <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
                  <Target className="w-6 h-6 text-finance-600" />
                  <span>Définir objectifs</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Commercial;
