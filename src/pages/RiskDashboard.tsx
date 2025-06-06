import React, { useState } from 'react';
import { AppSidebar } from '@/components/AppSidebar';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  AlertTriangle, 
  Shield, 
  TrendingDown, 
  DollarSign, 
  Users, 
  FileText,
  Clock,
  Target,
  BarChart3,
  PieChart,
  Activity,
  Zap,
  Eye,
  Download,
  Settings
} from 'lucide-react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart as RechartsPieChart, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

// Données de risques mockées
const riskOverview = {
  globalScore: 72,
  trend: 'improving',
  criticalRisks: 3,
  highRisks: 8,
  mediumRisks: 15,
  lowRisks: 24
};

const riskCategories = [
  {
    name: 'Liquidité',
    score: 85,
    status: 'low',
    trend: 'stable',
    description: 'Trésorerie et capacité de paiement',
    indicators: [
      { name: 'Ratio de liquidité', value: 2.3, target: 2.0, status: 'good' },
      { name: 'Jours de trésorerie', value: 45, target: 30, status: 'good' },
      { name: 'Découvert autorisé utilisé', value: 15, target: 50, status: 'good' }
    ]
  },
  {
    name: 'Crédit',
    score: 68,
    status: 'medium',
    trend: 'declining',
    description: 'Risque de défaut de paiement clients',
    indicators: [
      { name: 'DSO (jours)', value: 42, target: 30, status: 'warning' },
      { name: 'Créances > 90 jours', value: 8.5, target: 5, status: 'warning' },
      { name: 'Provisions pour créances', value: 3.2, target: 2, status: 'warning' }
    ]
  },
  {
    name: 'Concentration',
    score: 58,
    status: 'high',
    trend: 'stable',
    description: 'Dépendance aux clients majeurs',
    indicators: [
      { name: 'Top 5 clients (% CA)', value: 65, target: 40, status: 'critical' },
      { name: 'Client principal (% CA)', value: 28, target: 15, status: 'critical' },
      { name: 'Secteur principal (% CA)', value: 45, target: 30, status: 'warning' }
    ]
  },
  {
    name: 'Opérationnel',
    score: 75,
    status: 'medium',
    trend: 'improving',
    description: 'Risques liés aux opérations',
    indicators: [
      { name: 'Marge brute (%)', value: 32, target: 30, status: 'good' },
      { name: 'Rotation stocks', value: 8.2, target: 10, status: 'warning' },
      { name: 'Délai fournisseurs', value: 35, target: 30, status: 'warning' }
    ]
  },
  {
    name: 'Marché',
    score: 62,
    status: 'medium',
    trend: 'declining',
    description: 'Risques externes et concurrentiels',
    indicators: [
      { name: 'Part de marché (%)', value: 12, target: 15, status: 'warning' },
      { name: 'Nouveaux concurrents', value: 3, target: 1, status: 'warning' },
      { name: 'Évolution secteur (%)', value: -2.5, target: 5, status: 'critical' }
    ]
  },
  {
    name: 'Conformité',
    score: 88,
    status: 'low',
    trend: 'stable',
    description: 'Risques réglementaires et légaux',
    indicators: [
      { name: 'Audits en cours', value: 0, target: 0, status: 'good' },
      { name: 'Litiges actifs', value: 1, target: 0, status: 'warning' },
      { name: 'Conformité RGPD (%)', value: 95, target: 100, status: 'good' }
    ]
  }
];

const riskEvolution = [
  { month: 'Jan', global: 68, liquidite: 82, credit: 75, concentration: 55, operationnel: 70 },
  { month: 'Fév', global: 70, liquidite: 84, credit: 73, concentration: 57, operationnel: 72 },
  { month: 'Mar', global: 69, liquidite: 83, credit: 71, concentration: 56, operationnel: 74 },
  { month: 'Avr', global: 71, liquidite: 85, credit: 69, concentration: 58, operationnel: 75 },
  { month: 'Mai', global: 72, liquidite: 85, credit: 68, concentration: 58, operationnel: 75 },
  { month: 'Jun', global: 72, liquidite: 85, credit: 68, concentration: 58, operationnel: 75 }
];

const criticalAlerts = [
  {
    id: 1,
    type: 'critical',
    category: 'Concentration',
    title: 'Dépendance client critique',
    description: 'Le client TechCorp représente 28% du CA total',
    impact: 'Élevé',
    probability: 'Moyenne',
    action: 'Diversifier le portefeuille client',
    deadline: '2024-03-31',
    assignee: 'Direction Commerciale'
  },
  {
    id: 2,
    type: 'high',
    category: 'Crédit',
    title: 'Augmentation des impayés',
    description: 'DSO passé de 35 à 42 jours en 3 mois',
    impact: 'Moyen',
    probability: 'Élevée',
    action: 'Renforcer le recouvrement',
    deadline: '2024-02-28',
    assignee: 'Service Comptabilité'
  },
  {
    id: 3,
    type: 'high',
    category: 'Marché',
    title: 'Contraction du marché',
    description: 'Le secteur affiche une baisse de 2.5%',
    impact: 'Élevé',
    probability: 'Élevée',
    action: 'Stratégie de différenciation',
    deadline: '2024-04-30',
    assignee: 'Direction Générale'
  }
];

const scenarioAnalysis = [
  {
    name: 'Optimiste',
    probability: 25,
    impact: {
      revenue: 15,
      cashFlow: 20,
      profitability: 18
    },
    description: 'Croissance soutenue, nouveaux marchés'
  },
  {
    name: 'Probable',
    probability: 50,
    impact: {
      revenue: 5,
      cashFlow: 8,
      profitability: 3
    },
    description: 'Croissance modérée, stabilité'
  },
  {
    name: 'Pessimiste',
    probability: 20,
    impact: {
      revenue: -10,
      cashFlow: -15,
      profitability: -12
    },
    description: 'Récession, perte de clients majeurs'
  },
  {
    name: 'Critique',
    probability: 5,
    impact: {
      revenue: -25,
      cashFlow: -35,
      profitability: -30
    },
    description: 'Crise majeure, défaillance client principal'
  }
];

const radarData = [
  {
    category: 'Liquidité',
    score: 85,
    benchmark: 75
  },
  {
    category: 'Crédit',
    score: 68,
    benchmark: 80
  },
  {
    category: 'Concentration',
    score: 58,
    benchmark: 70
  },
  {
    category: 'Opérationnel',
    score: 75,
    benchmark: 72
  },
  {
    category: 'Marché',
    score: 62,
    benchmark: 68
  },
  {
    category: 'Conformité',
    score: 88,
    benchmark: 85
  }
];

export default function RiskDashboard() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [timeframe, setTimeframe] = useState('6m');

  const getRiskColor = (status: string) => {
    switch (status) {
      case 'low':
        return 'text-emerald-600 bg-emerald-50 border-white';
      case 'medium':
        return 'text-blue-600 bg-blue-50 border-white';
      case 'high':
        return 'text-indigo-600 bg-indigo-50 border-white';
      case 'critical':
        return 'text-red-600 bg-red-50 border-white';
      default:
        return 'text-slate-600 bg-slate-50 border-white';
    }
  };

  const getRiskLevel = (score: number) => {
    if (score >= 80) return 'low';
    if (score >= 65) return 'medium';
    if (score >= 50) return 'high';
    return 'critical';
  };

  const getRiskLabel = (status: string) => {
    switch (status) {
      case 'low':
        return 'Faible';
      case 'medium':
        return 'Moyen';
      case 'high':
        return 'Élevé';
      case 'critical':
        return 'Critique';
      default:
        return 'Inconnu';
    }
  };

  const getIndicatorStatus = (status: string) => {
    switch (status) {
      case 'good':
        return 'text-emerald-600';
      case 'warning':
        return 'text-indigo-600';
      case 'critical':
        return 'text-red-600';
      default:
        return 'text-slate-600';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'improving':
        return '↗️';
      case 'declining':
        return '↘️';
      case 'stable':
        return '→';
      default:
        return '→';
    }
  };

  return (
    <div className="flex h-screen bg-white">
      <AppSidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-white border-b border-white px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Dashboard de Risques</h1>
              <p className="text-slate-600">Surveillance et analyse des risques financiers</p>
            </div>
            
            <div className="flex items-center gap-4">
              <Select value={timeframe} onValueChange={setTimeframe}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1m">1 mois</SelectItem>
                  <SelectItem value="3m">3 mois</SelectItem>
                  <SelectItem value="6m">6 mois</SelectItem>
                  <SelectItem value="1y">1 an</SelectItem>
                </SelectContent>
              </Select>
              
              <Button variant="outline" className="gap-2">
                <Download className="w-4 h-4" />
                Rapport
              </Button>
              
              <Button variant="outline" className="gap-2">
                <Settings className="w-4 h-4" />
                Paramètres
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto p-6">
          <div className="space-y-6">
            {/* Vue d'ensemble des risques */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-slate-600 flex items-center gap-2">
                    <Shield className="w-4 h-4" />
                    Score Global de Risque
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="text-4xl font-bold mb-2">{riskOverview.globalScore}</div>
                      <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-sm font-medium ${
                        getRiskColor(getRiskLevel(riskOverview.globalScore))
                      }`}>
                        {getRiskLabel(getRiskLevel(riskOverview.globalScore))}
                        <span className="ml-1">{getTrendIcon(riskOverview.trend)}</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Risques critiques</span>
                        <span className="font-medium text-red-600">{riskOverview.criticalRisks}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Risques élevés</span>
                        <span className="font-medium text-indigo-600">{riskOverview.highRisks}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Risques moyens</span>
                        <span className="font-medium text-indigo-600">{riskOverview.mediumRisks}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Risques faibles</span>
                        <span className="font-medium text-emerald-600">{riskOverview.lowRisks}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Alertes critiques */}
              <Card className="lg:col-span-3">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-slate-600 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4" />
                    Alertes Critiques
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {criticalAlerts.slice(0, 3).map((alert) => (
                      <div key={alert.id} className="border rounded-lg p-3">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <Badge className={getRiskColor(alert.type === 'critical' ? 'critical' : 'high')} size="sm">
                                {alert.type === 'critical' ? 'Critique' : 'Élevé'}
                              </Badge>
                              <span className="text-xs text-slate-500">{alert.category}</span>
                            </div>
                            <h4 className="font-medium text-sm mb-1">{alert.title}</h4>
                            <p className="text-xs text-slate-600">{alert.description}</p>
                          </div>
                          <Button size="sm" variant="outline">
                            <Eye className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Graphiques et analyses */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Évolution des risques */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    Évolution des Risques
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={riskEvolution}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis domain={[0, 100]} />
                      <Tooltip />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="global" 
                        stroke="#3b82f6" 
                        strokeWidth={3}
                        name="Score Global"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="liquidite" 
                        stroke="#10b981" 
                        strokeWidth={2}
                        name="Liquidité"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="credit" 
                        stroke="#ffffff" 
                        strokeWidth={2}
                        name="Crédit"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="concentration" 
                        stroke="#ef4444" 
                        strokeWidth={2}
                        name="Concentration"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Radar des risques */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5" />
                    Profil de Risque vs Benchmark
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <RadarChart data={radarData}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="category" />
                      <PolarRadiusAxis angle={90} domain={[0, 100]} />
                      <Radar
                        name="Notre Score"
                        dataKey="score"
                        stroke="#3b82f6"
                        fill="#3b82f6"
                        fillOpacity={0.3}
                        strokeWidth={2}
                      />
                      <Radar
                        name="Benchmark"
                        dataKey="benchmark"
                        stroke="#94a3b8"
                        fill="#94a3b8"
                        fillOpacity={0.1}
                        strokeWidth={2}
                        strokeDasharray="5 5"
                      />
                      <Legend />
                    </RadarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Catégories de risques détaillées */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5" />
                  Analyse Détaillée par Catégorie
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="all" className="space-y-4">
                  <TabsList>
                    <TabsTrigger value="all">Toutes</TabsTrigger>
                    <TabsTrigger value="critical">Critiques</TabsTrigger>
                    <TabsTrigger value="high">Élevés</TabsTrigger>
                    <TabsTrigger value="medium">Moyens</TabsTrigger>
                  </TabsList>

                  <TabsContent value="all" className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {riskCategories.map((category, index) => (
                        <Card key={index} className="border">
                          <CardHeader className="pb-3">
                            <div className="flex items-center justify-between">
                              <CardTitle className="text-base">{category.name}</CardTitle>
                              <div className="flex items-center gap-2">
                                <Badge className={getRiskColor(category.status)} size="sm">
                                  {category.score}
                                </Badge>
                                <span className="text-sm">{getTrendIcon(category.trend)}</span>
                              </div>
                            </div>
                            <p className="text-sm text-slate-600">{category.description}</p>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-3">
                              {category.indicators.map((indicator, idx) => (
                                <div key={idx} className="space-y-1">
                                  <div className="flex items-center justify-between text-sm">
                                    <span>{indicator.name}</span>
                                    <span className={`font-medium ${getIndicatorStatus(indicator.status)}`}>
                                      {indicator.value}{typeof indicator.value === 'number' && indicator.value < 10 ? '%' : ''}
                                    </span>
                                  </div>
                                  <Progress 
                                    value={Math.min((indicator.value / indicator.target) * 100, 100)} 
                                    className="h-1" 
                                  />
                                  <div className="text-xs text-slate-500">
                                    Cible: {indicator.target}{typeof indicator.target === 'number' && indicator.target < 10 ? '%' : ''}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* Analyse de scénarios */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="w-5 h-5" />
                  Analyse de Scénarios
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {scenarioAnalysis.map((scenario, index) => (
                    <Card key={index} className="border">
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-sm">{scenario.name}</CardTitle>
                          <Badge variant="outline">{scenario.probability}%</Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <p className="text-xs text-slate-600 mb-3">{scenario.description}</p>
                          
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>CA:</span>
                              <span className={scenario.impact.revenue >= 0 ? 'text-emerald-600' : 'text-red-600'}>
                                {scenario.impact.revenue > 0 ? '+' : ''}{scenario.impact.revenue}%
                              </span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span>Trésorerie:</span>
                              <span className={scenario.impact.cashFlow >= 0 ? 'text-emerald-600' : 'text-red-600'}>
                                {scenario.impact.cashFlow > 0 ? '+' : ''}{scenario.impact.cashFlow}%
                              </span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span>Rentabilité:</span>
                              <span className={scenario.impact.profitability >= 0 ? 'text-emerald-600' : 'text-red-600'}>
                                {scenario.impact.profitability > 0 ? '+' : ''}{scenario.impact.profitability}%
                              </span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}