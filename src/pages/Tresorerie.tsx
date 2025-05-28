
import React from 'react';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CashFlowChart } from "@/components/CashFlowChart";
import { KPICard } from "@/components/KPICard";
import { 
  DollarSign, 
  TrendingUp, 
  Calendar,
  AlertTriangle,
  Download,
  Plus
} from 'lucide-react';

const Tresorerie = () => {
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
                <h1 className="text-3xl font-bold text-gray-900">Gestion de Trésorerie</h1>
                <p className="text-gray-600">Suivez vos flux de trésorerie et optimisez votre cash-flow</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Exporter
              </Button>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Nouvelle transaction
              </Button>
            </div>
          </div>

          {/* KPIs Trésorerie */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <KPICard
              title="Solde Actuel"
              value="185 420€"
              change={8.5}
              changeLabel="vs mois dernier"
              icon={<DollarSign className="w-5 h-5" />}
              trend="up"
              color="success"
            />
            <KPICard
              title="Entrées Prévues"
              value="95 680€"
              change={12.3}
              changeLabel="ce mois"
              icon={<TrendingUp className="w-5 h-5" />}
              trend="up"
              color="default"
            />
            <KPICard
              title="Sorties Prévues"
              value="67 340€"
              change={-2.1}
              changeLabel="ce mois"
              icon={<Calendar className="w-5 h-5" />}
              trend="down"
              color="warning"
            />
            <KPICard
              title="Délai de Paiement Moyen"
              value="34 jours"
              change={-5.2}
              changeLabel="amélioration"
              icon={<AlertTriangle className="w-5 h-5" />}
              trend="up"
              color="success"
            />
          </div>

          {/* Graphique de trésorerie */}
          <CashFlowChart />

          {/* Sections supplémentaires */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Prochaines échéances */}
            <Card>
              <CardHeader>
                <CardTitle>Prochaines Échéances</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { client: "Client ABC", montant: "15 000€", date: "Dans 3 jours", type: "Entrée" },
                    { client: "Fournisseur XYZ", montant: "8 500€", date: "Dans 5 jours", type: "Sortie" },
                    { client: "Client DEF", montant: "22 000€", date: "Dans 7 jours", type: "Entrée" },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">{item.client}</p>
                        <p className="text-sm text-gray-600">{item.date}</p>
                      </div>
                      <div className="text-right">
                        <p className={`font-semibold ${item.type === 'Entrée' ? 'text-success-600' : 'text-danger-600'}`}>
                          {item.type === 'Entrée' ? '+' : '-'}{item.montant}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Comptes bancaires */}
            <Card>
              <CardHeader>
                <CardTitle>Comptes Bancaires</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { banque: "BNP Paribas", compte: "****1234", solde: "125 420€" },
                    { banque: "Crédit Agricole", compte: "****5678", solde: "60 000€" },
                    { banque: "LCL", compte: "****9012", solde: "0€" },
                  ].map((compte, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">{compte.banque}</p>
                        <p className="text-sm text-gray-600">{compte.compte}</p>
                      </div>
                      <p className="font-semibold text-gray-900">{compte.solde}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Tresorerie;
