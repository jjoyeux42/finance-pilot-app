import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp, 
  TrendingDown, 
  Target, 
  BarChart3, 
  PieChart, 
  Activity, 
  AlertTriangle, 
  CheckCircle, 
  Info,
  ArrowUp,
  ArrowDown,
  Minus,
  Calendar,
  Building,
  Users,
  DollarSign
} from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ComposedChart, Area, AreaChart } from 'recharts';

interface BenchmarkData {
  metric: string;
  value: number;
  industryAverage: number;
  topQuartile: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  performance: 'excellent' | 'good' | 'average' | 'below_average' | 'poor';
  description: string;
}

interface PeriodComparison {
  period: string;
  current: number;
  previous: number;
  change: number;
  changePercent: number;
  metric: string;
  unit: string;
}

interface IndustryBenchmark {
  industry: string;
  size: string;
  region: string;
  metrics: BenchmarkData[];
  lastUpdated: string;
}

const benchmarkData: BenchmarkData[] = [
  {
    metric: 'Marge Brute',
    value: 68.5,
    industryAverage: 62.3,
    topQuartile: 75.2,
    unit: '%',
    trend: 'up',
    performance: 'good',
    description: 'Pourcentage du chiffre d\'affaires après déduction des coûts directs'
  },
  {
    metric: 'Délai de Paiement Moyen',
    value: 28,
    industryAverage: 35,
    topQuartile: 22,
    unit: 'jours',
    trend: 'down',
    performance: 'good',
    description: 'Temps moyen entre la facturation et l\'encaissement'
  },
  {
    metric: 'Taux de Conversion',
    value: 12.8,
    industryAverage: 15.2,
    topQuartile: 22.1,
    unit: '%',
    trend: 'stable',
    performance: 'below_average',
    description: 'Pourcentage de prospects convertis en clients'
  },
  {
    metric: 'Coût d\'Acquisition Client',
    value: 485,
    industryAverage: 420,
    topQuartile: 320,
    unit: '€',
    trend: 'up',
    performance: 'below_average',
    description: 'Coût moyen pour acquérir un nouveau client'
  },
  {
    metric: 'Valeur Vie Client',
    value: 8500,
    industryAverage: 7200,
    topQuartile: 12000,
    unit: '€',
    trend: 'up',
    performance: 'good',
    description: 'Revenus totaux attendus d\'un client sur sa durée de vie'
  },
  {
    metric: 'Taux de Rétention',
    value: 89.2,
    industryAverage: 85.7,
    topQuartile: 94.3,
    unit: '%',
    trend: 'up',
    performance: 'good',
    description: 'Pourcentage de clients conservés sur une période donnée'
  },
  {
    metric: 'Ratio Liquidité',
    value: 1.8,
    industryAverage: 2.1,
    topQuartile: 2.8,
    unit: 'x',
    trend: 'down',
    performance: 'below_average',
    description: 'Capacité à honorer les dettes à court terme'
  },
  {
    metric: 'ROI Marketing',
    value: 320,
    industryAverage: 280,
    topQuartile: 450,
    unit: '%',
    trend: 'up',
    performance: 'good',
    description: 'Retour sur investissement des campagnes marketing'
  }
];

const periodComparisons: PeriodComparison[] = [
  {
    period: 'T4 2024 vs T3 2024',
    current: 1250000,
    previous: 1180000,
    change: 70000,
    changePercent: 5.9,
    metric: 'Chiffre d\'Affaires',
    unit: '€'
  },
  {
    period: 'T4 2024 vs T4 2023',
    current: 1250000,
    previous: 1050000,
    change: 200000,
    changePercent: 19.0,
    metric: 'Chiffre d\'Affaires',
    unit: '€'
  },
  {
    period: 'Déc 2024 vs Nov 2024',
    current: 450000,
    previous: 420000,
    change: 30000,
    changePercent: 7.1,
    metric: 'Chiffre d\'Affaires',
    unit: '€'
  },
  {
    period: 'T4 2024 vs T3 2024',
    current: 18.5,
    previous: 16.2,
    change: 2.3,
    changePercent: 14.2,
    metric: 'Marge Nette',
    unit: '%'
  },
  {
    period: 'T4 2024 vs T4 2023',
    current: 18.5,
    previous: 15.8,
    change: 2.7,
    changePercent: 17.1,
    metric: 'Marge Nette',
    unit: '%'
  },
  {
    period: 'T4 2024 vs T3 2024',
    current: 1250,
    previous: 1180,
    change: 70,
    changePercent: 5.9,
    metric: 'Nombre de Clients',
    unit: ''
  }
];

const industryBenchmarks: IndustryBenchmark[] = [
  {
    industry: 'Services Financiers',
    size: 'PME (50-250 employés)',
    region: 'France',
    lastUpdated: '2024-01-15',
    metrics: benchmarkData
  }
];

const radarData = [
  {
    metric: 'Rentabilité',
    entreprise: 85,
    industrie: 70,
    topQuartile: 95
  },
  {
    metric: 'Liquidité',
    entreprise: 65,
    industrie: 75,
    topQuartile: 90
  },
  {
    metric: 'Efficacité',
    entreprise: 78,
    industrie: 68,
    topQuartile: 88
  },
  {
    metric: 'Croissance',
    entreprise: 92,
    industrie: 60,
    topQuartile: 85
  },
  {
    metric: 'Satisfaction Client',
    entreprise: 88,
    industrie: 75,
    topQuartile: 92
  },
  {
    metric: 'Innovation',
    entreprise: 72,
    industrie: 65,
    topQuartile: 85
  }
];

const trendData = [
  { month: 'Jan', entreprise: 82, industrie: 68, topQuartile: 88 },
  { month: 'Fév', entreprise: 85, industrie: 69, topQuartile: 89 },
  { month: 'Mar', entreprise: 83, industrie: 70, topQuartile: 90 },
  { month: 'Avr', entreprise: 87, industrie: 71, topQuartile: 91 },
  { month: 'Mai', entreprise: 89, industrie: 72, topQuartile: 92 },
  { month: 'Jun', entreprise: 91, industrie: 73, topQuartile: 93 }
];

export default function BenchmarkAnalysis() {
  const [selectedPeriod, setSelectedPeriod] = useState('quarterly');
  const [selectedIndustry, setSelectedIndustry] = useState('financial_services');
  const [selectedMetric, setSelectedMetric] = useState('all');

  const formatValue = (value: number, unit: string) => {
    if (unit === '€') {
      return new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: 'EUR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(value);
    } else if (unit === '%') {
      return `${value.toFixed(1)}%`;
    } else if (unit === 'jours') {
      return `${value} jours`;
    } else if (unit === 'x') {
      return `${value.toFixed(1)}x`;
    } else {
      return value.toString();
    }
  };

  const getPerformanceColor = (performance: string) => {
    switch (performance) {
      case 'excellent':
        return 'text-emerald-600 bg-emerald-50';
      case 'good':
        return 'text-blue-600 bg-blue-50';
      case 'average':
        return 'text-blue-600 bg-blue-50';
      case 'below_average':
        return 'text-indigo-600 bg-indigo-50';
      case 'poor':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-slate-600 bg-slate-50';
    }
  };

  const getPerformanceLabel = (performance: string) => {
    switch (performance) {
      case 'excellent':
        return 'Excellent';
      case 'good':
        return 'Bon';
      case 'average':
        return 'Moyen';
      case 'below_average':
        return 'En dessous';
      case 'poor':
        return 'Faible';
      default:
        return performance;
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <ArrowUp className="w-4 h-4 text-emerald-600" />;
      case 'down':
        return <ArrowDown className="w-4 h-4 text-red-600" />;
      case 'stable':
        return <Minus className="w-4 h-4 text-slate-600" />;
      default:
        return null;
    }
  };

  const getChangeIcon = (change: number) => {
    if (change > 0) {
      return <TrendingUp className="w-4 h-4 text-emerald-600" />;
    } else if (change < 0) {
      return <TrendingDown className="w-4 h-4 text-red-600" />;
    } else {
      return <Minus className="w-4 h-4 text-slate-600" />;
    }
  };

  const getChangeColor = (change: number) => {
    if (change > 0) {
      return 'text-emerald-600';
    } else if (change < 0) {
      return 'text-red-600';
    } else {
      return 'text-slate-600';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Analyse Comparative</h2>
          <p className="text-slate-600">Comparaisons périodiques et benchmarking sectoriel</p>
        </div>
        
        <div className="flex items-center gap-4">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="monthly">Mensuel</SelectItem>
              <SelectItem value="quarterly">Trimestriel</SelectItem>
              <SelectItem value="yearly">Annuel</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="financial_services">Services Financiers</SelectItem>
              <SelectItem value="technology">Technologie</SelectItem>
              <SelectItem value="consulting">Conseil</SelectItem>
              <SelectItem value="retail">Commerce</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="benchmark" className="space-y-6">
        <TabsList>
          <TabsTrigger value="benchmark">Benchmarking</TabsTrigger>
          <TabsTrigger value="periods">Comparaisons Périodiques</TabsTrigger>
          <TabsTrigger value="trends">Tendances</TabsTrigger>
          <TabsTrigger value="radar">Vue Radar</TabsTrigger>
        </TabsList>

        <TabsContent value="benchmark" className="space-y-6">
          {/* Résumé Performance */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600">Score Global</p>
                    <p className="text-2xl font-bold text-emerald-600">78/100</p>
                  </div>
                  <Target className="w-8 h-8 text-emerald-600" />
                </div>
                <p className="text-xs text-slate-500 mt-2">Au-dessus de la moyenne</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600">Rang Sectoriel</p>
                    <p className="text-2xl font-bold text-blue-600">12/50</p>
                  </div>
                  <BarChart3 className="w-8 h-8 text-blue-600" />
                </div>
                <p className="text-xs text-slate-500 mt-2">Top 25%</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600">Métriques Excellentes</p>
                    <p className="text-2xl font-bold text-emerald-600">3/8</p>
                  </div>
                  <CheckCircle className="w-8 h-8 text-emerald-600" />
                </div>
                <p className="text-xs text-slate-500 mt-2">Points forts</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600">À Améliorer</p>
                    <p className="text-2xl font-bold text-indigo-600">2/8</p>
                  </div>
                  <AlertTriangle className="w-8 h-8 text-indigo-600" />
                </div>
                <p className="text-xs text-slate-500 mt-2">Axes de progrès</p>
              </CardContent>
            </Card>
          </div>

          {/* Détail des Métriques */}
          <Card>
            <CardHeader>
              <CardTitle>Comparaison Détaillée</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {benchmarkData.map((metric, index) => {
                  const percentilePosition = ((metric.value - Math.min(metric.value, metric.industryAverage, metric.topQuartile)) / 
                    (Math.max(metric.value, metric.industryAverage, metric.topQuartile) - Math.min(metric.value, metric.industryAverage, metric.topQuartile))) * 100;
                  
                  return (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h4 className="font-semibold text-slate-900">{metric.metric}</h4>
                            {getTrendIcon(metric.trend)}
                            <Badge className={getPerformanceColor(metric.performance)} size="sm">
                              {getPerformanceLabel(metric.performance)}
                            </Badge>
                          </div>
                          <p className="text-sm text-slate-600 mb-3">{metric.description}</p>
                        </div>
                        
                        <div className="text-right">
                          <p className="text-2xl font-bold text-slate-900">
                            {formatValue(metric.value, metric.unit)}
                          </p>
                          <p className="text-sm text-slate-500">Votre valeur</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div className="text-center p-3 bg-slate-50 rounded">
                          <p className="text-lg font-semibold text-slate-900">
                            {formatValue(metric.industryAverage, metric.unit)}
                          </p>
                          <p className="text-sm text-slate-600">Moyenne Secteur</p>
                        </div>
                        
                        <div className="text-center p-3 bg-emerald-50 rounded">
                          <p className="text-lg font-semibold text-emerald-700">
                            {formatValue(metric.topQuartile, metric.unit)}
                          </p>
                          <p className="text-sm text-emerald-600">Top 25%</p>
                        </div>
                        
                        <div className="text-center p-3 bg-blue-50 rounded">
                          <p className="text-lg font-semibold text-blue-700">
                            {((metric.value / metric.industryAverage - 1) * 100).toFixed(1)}%
                          </p>
                          <p className="text-sm text-blue-600">vs Moyenne</p>
                        </div>
                      </div>
                      
                      {/* Barre de progression comparative */}
                      <div className="relative">
                        <div className="flex justify-between text-xs text-slate-500 mb-1">
                          <span>Faible</span>
                          <span>Moyenne</span>
                          <span>Excellent</span>
                        </div>
                        <div className="h-2 bg-slate-200 rounded-full relative">
                          <div 
                            className="h-2 bg-gradient-to-r from-red-400 via-indigo-400 to-emerald-400 rounded-full"
                            style={{ width: '100%' }}
                          />
                          <div 
                            className="absolute top-0 w-1 h-2 bg-slate-800 rounded-full"
                            style={{ left: `${Math.min(Math.max(percentilePosition, 0), 100)}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="periods" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {periodComparisons.map((comparison, index) => (
              <Card key={index}>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">{comparison.metric}</CardTitle>
                  <p className="text-sm text-slate-600">{comparison.period}</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">Actuel</span>
                      <span className="font-semibold">
                        {formatValue(comparison.current, comparison.unit)}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">Précédent</span>
                      <span className="font-semibold">
                        {formatValue(comparison.previous, comparison.unit)}
                      </span>
                    </div>
                    
                    <div className="border-t pt-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {getChangeIcon(comparison.change)}
                          <span className="text-sm font-medium">Évolution</span>
                        </div>
                        <div className="text-right">
                          <p className={`font-semibold ${getChangeColor(comparison.change)}`}>
                            {comparison.changePercent > 0 ? '+' : ''}{comparison.changePercent.toFixed(1)}%
                          </p>
                          <p className={`text-sm ${getChangeColor(comparison.change)}`}>
                            {comparison.change > 0 ? '+' : ''}{formatValue(comparison.change, comparison.unit)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="trends" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Évolution des Performances</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="entreprise" 
                    stroke="#3b82f6" 
                    strokeWidth={3}
                    name="Votre Entreprise" 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="industrie" 
                    stroke="#64748b" 
                    strokeDasharray="5 5"
                    name="Moyenne Industrie" 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="topQuartile" 
                    stroke="#10b981" 
                    strokeDasharray="10 5"
                    name="Top 25%" 
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="radar" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Profil de Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <RadarChart data={radarData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="metric" />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} />
                  <Radar
                    name="Votre Entreprise"
                    dataKey="entreprise"
                    stroke="#3b82f6"
                    fill="#3b82f6"
                    fillOpacity={0.3}
                    strokeWidth={2}
                  />
                  <Radar
                    name="Moyenne Industrie"
                    dataKey="industrie"
                    stroke="#64748b"
                    fill="#64748b"
                    fillOpacity={0.1}
                    strokeDasharray="5 5"
                  />
                  <Radar
                    name="Top 25%"
                    dataKey="topQuartile"
                    stroke="#10b981"
                    fill="#10b981"
                    fillOpacity={0.1}
                    strokeDasharray="10 5"
                  />
                  <Legend />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}