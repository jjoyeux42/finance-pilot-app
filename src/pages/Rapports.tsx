
import React from 'react';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  FileText, 
  Download,
  Calendar,
  Filter,
  Share,
  Eye
} from 'lucide-react';

const Rapports = () => {
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
                <h1 className="text-3xl font-bold text-gray-900">Rapports et Analyses</h1>
                <p className="text-gray-600">Générez et consultez vos rapports financiers personnalisés</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                Filtrer
              </Button>
              <Button>
                <FileText className="w-4 h-4 mr-2" />
                Nouveau rapport
              </Button>
            </div>
          </div>

          {/* Rapports prédéfinis */}
          <Card>
            <CardHeader>
              <CardTitle>Rapports Prédéfinis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    titre: "Rapport Mensuel Complet",
                    description: "Vue d'ensemble financière du mois",
                    derniereGeneration: "Aujourd'hui",
                    taille: "2.3 MB"
                  },
                  {
                    titre: "Analyse de Trésorerie",
                    description: "Flux de trésorerie et prévisions",
                    derniereGeneration: "Hier",
                    taille: "1.8 MB"
                  },
                  {
                    titre: "Performance Commerciale",
                    description: "Suivi des ventes et objectifs",
                    derniereGeneration: "Il y a 2 jours",
                    taille: "1.5 MB"
                  },
                  {
                    titre: "Rentabilité par Client",
                    description: "Analyse détaillée des marges",
                    derniereGeneration: "Il y a 3 jours",
                    taille: "2.1 MB"
                  },
                  {
                    titre: "Tableau de Bord Exécutif",
                    description: "KPIs et métriques clés",
                    derniereGeneration: "Il y a 1 semaine",
                    taille: "0.9 MB"
                  },
                  {
                    titre: "Prévisions Financières",
                    description: "Projections à 6 mois",
                    derniereGeneration: "Il y a 1 semaine",
                    taille: "1.2 MB"
                  }
                ].map((rapport, index) => (
                  <div key={index} className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-3">
                      <FileText className="w-8 h-8 text-finance-600" />
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Download className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Share className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">{rapport.titre}</h3>
                    <p className="text-sm text-gray-600 mb-3">{rapport.description}</p>
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>{rapport.derniereGeneration}</span>
                      <span>{rapport.taille}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Rapports personnalisés */}
          <Card>
            <CardHeader>
              <CardTitle>Rapports Personnalisés</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    nom: "Analyse Q2 2024",
                    type: "Personnalisé",
                    creePar: "Marie Dupont",
                    dateCreation: "15/06/2024",
                    statut: "Terminé"
                  },
                  {
                    nom: "Comparaison Sectorielle",
                    type: "Personnalisé",
                    creePar: "Pierre Martin",
                    dateCreation: "10/06/2024",
                    statut: "En cours"
                  },
                  {
                    nom: "ROI par Campagne",
                    type: "Personnalisé",
                    creePar: "Sophie Bernard",
                    dateCreation: "08/06/2024",
                    statut: "Terminé"
                  }
                ].map((rapport, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-finance-100 rounded-lg flex items-center justify-center">
                        <FileText className="w-5 h-5 text-finance-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{rapport.nom}</p>
                        <p className="text-sm text-gray-600">Créé par {rapport.creePar} le {rapport.dateCreation}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        rapport.statut === 'Terminé' 
                          ? 'bg-success-100 text-success-700' 
                          : 'bg-warning-100 text-warning-700'
                      }`}>
                        {rapport.statut}
                      </span>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Planning des rapports */}
          <Card>
            <CardHeader>
              <CardTitle>Rapports Programmés</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    rapport: "Rapport Mensuel",
                    frequence: "Mensuel",
                    prochaine: "1er Juillet 2024",
                    destinataires: "Direction, Comptabilité"
                  },
                  {
                    rapport: "Suivi Hebdomadaire",
                    frequence: "Hebdomadaire",
                    prochaine: "Lundi 24 Juin",
                    destinataires: "Équipe commerciale"
                  },
                  {
                    rapport: "Tableau de Bord",
                    frequence: "Quotidien",
                    prochaine: "Demain 9h00",
                    destinataires: "CEO, CFO"
                  }
                ].map((planif, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{planif.rapport}</p>
                      <p className="text-sm text-gray-600">Fréquence: {planif.frequence}</p>
                      <p className="text-sm text-gray-600">Destinataires: {planif.destinataires}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900">Prochaine génération</p>
                      <p className="text-sm text-gray-600">{planif.prochaine}</p>
                      <div className="flex space-x-2 mt-2">
                        <Button variant="outline" size="sm">Modifier</Button>
                        <Button variant="outline" size="sm">Arrêter</Button>
                      </div>
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

export default Rapports;
