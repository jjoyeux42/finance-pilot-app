import React, { useState } from 'react';
import { AppSidebar } from '@/components/AppSidebar';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Users, 
  FileText, 
  Target,
  AlertTriangle,
  CheckCircle,
  BarChart3,
  PieChart,
  Calendar,
  Download,
  Filter
} from 'lucide-react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart as RechartsPieChart, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

// Données mockées pour le dashboard exécutif
const kpiData = {
  revenue: {
    current: 2450000,
    previous: 2180000,
    target: 2500000,
    growth: 12.4
  },
  profit: {
    current: 485000,
    previous: 420000,
    target: 500000,
    margin: 19.8
  },
  customers: {
    total: 1247,
    new: 89,
    churn: 12,
    retention: 94.2
  },
  cashFlow: {
    current: 890000,
    projected: 1200000,
    runway: 18
  }
};

const monthlyData = [
  { month: 'Jan', revenue: 180000, profit: 35000, expenses: 145000 },
  { month: 'Fév', revenue: 195000, profit: 38000, expenses: 157000 },
  { month: 'Mar', revenue: 210000, profit: 42000, expenses: 168000 },
  { month: 'Avr', revenue: 225000, profit: 45000, expenses: 180000 },
  { month: 'Mai', revenue: 240000, profit: 48000, expenses: 192000 },
  { month: 'Jun', revenue: 255000, profit: 51000, expenses: 204000 }
];

const revenueBySegment = [
  { name: 'Entreprises', value: 45, amount: 1102500, color: '#3b82f6' },
  { name: 'PME', value: 30, amount: 735000, color: '#10b981' },
  { name: 'Startups', value: 15, amount: 367500, color: '#ffffff' },
  { name: 'Particuliers', value: 10, amount: 245000, color: '#ef4444' }
];

const riskIndicators = [
  {
    category: 'Liquidité',
    status: 'good',
    score: 85,
    description: 'Trésorerie suffisante pour 18 mois'
  },
  {
    category: 'Créances',
    status: 'warning',
    score: 72,
    description: '15% de créances > 30 jours'
  },
  {
    category: 'Concentration',
    status: 'good',
    score: 78,
    description: 'Top 5 clients = 35% du CA'
  },
  {
    category: 'Rentabilité',
    status: 'excellent',
    score: 92,
    description: 'Marge en progression constante'
  }
];

const strategicObjectives = [
  {
    title: 'Croissance CA',
    target: 3000000,
    current: 2450000,
    progress: 81.7,
    deadline: '2024-12-31',
    status: 'on-track'
  },
  {
    title: 'Nouveaux clients',
    target: 500,
    current: 389,
    progress: 77.8,
    deadline: '2024-12-31',
    status: 'on-track'
  },
  {
    title: 'Marge nette',
    target: 22,
    current: 19.8,
    progress: 90,
    deadline: '2024-12-31',
    status: 'at-risk'
  },
  {
    title: 'Expansion internationale',
    target: 3,
    current: 1,
    progress: 33.3,
    deadline: '2024-12-31',
    status: 'delayed'
  }
];

export default function ExecutiveDashboard() {
  const [period, setPeriod] = useState('ytd');
  const [selectedSegment, setSelectedSegment] = useState('all');

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatPercentage = (value: number) => {
    return `${value.toFixed(1)}%`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent':
      case 'good':
      case 'on-track':
        return 'text-emerald-600 bg-emerald-50';
      case 'warning':
      case 'at-risk':
        return 'text-indigo-600 bg-indigo-50';
      case 'danger':
      case 'delayed':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-slate-600 bg-slate-50';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'excellent':
      case 'good':
      case 'on-track':
        return <CheckCircle className="w-4 h-4" />;
      case 'warning':
      case 'at-risk':
      case 'danger':
      case 'delayed':
        return <AlertTriangle className="w-4 h-4" />;
      default:
        return <Target className="w-4 h-4" />;
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
              <h1 className="text-2xl font-bold text-slate-900">Dashboard Exécutif</h1>
              <p className="text-slate-600">Vue synthétique des performances et indicateurs clés</p>
            </div>
            
            <div className="flex items-center gap-4">
              <Select value={period} onValueChange={setPeriod}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mtd">Ce mois</SelectItem>
                  <SelectItem value="qtd">Ce trimestre</SelectItem>
                  <SelectItem value="ytd">Cette année</SelectItem>
                  <SelectItem value="custom">Personnalisé</SelectItem>
                </SelectContent>
              </Select>
              
              <Button variant="outline" className="gap-2">
                <Download className="w-4 h-4" />
                Exporter
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto p-6">
          <div className="space-y-6">
            {/* KPIs principaux */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-slate-600 flex items-center gap-2">
                    <DollarSign className="w-4 h-4" />
                    Chiffre d'Affaires
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="text-2xl font-bold">{formatCurrency(kpiData.revenue.current)}</div>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-emerald-600" />
                      <span className="text-sm text-emerald-600 font-medium">
                        +{formatPercentage(kpiData.revenue.growth)}
                      </span>
                      <span className="text-sm text-slate-500">vs période précédente</span>
                    </div>
                    <Progress value={(kpiData.revenue.current / kpiData.revenue.target) * 100} className="h-2" />
                    <div className="text-xs text-slate-500">
                      {formatPercentage((kpiData.revenue.current / kpiData.revenue.target) * 100)} de l'objectif
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-slate-600 flex items-center gap-2">
                    <Target className="w-4 h-4" />
                    Rentabilité
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="text-2xl font-bold">{formatCurrency(kpiData.profit.current)}</div>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-emerald-600" />
                      <span className="text-sm text-emerald-600 font-medium">
                        {formatPercentage(kpiData.profit.margin)} marge
                      </span>
                    </div>
                    <Progress value={(kpiData.profit.current / kpiData.profit.target) * 100} className="h-2" />
                    <div className="text-xs text-slate-500">
                      {formatPercentage((kpiData.profit.current / kpiData.profit.target) * 100)} de l'objectif
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-slate-600 flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    Clients
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="text-2xl font-bold">{kpiData.customers.total.toLocaleString()}</div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <span className="text-sm text-emerald-600 font-medium">+{kpiData.customers.new}</span>
                        <span className="text-xs text-slate-500">nouveaux</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-sm text-red-600 font-medium">-{kpiData.customers.churn}</span>
                        <span className="text-xs text-slate-500">perdus</span>
                      </div>
                    </div>
                    <div className="text-xs text-slate-500">
                      Rétention: {formatPercentage(kpiData.customers.retention)}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-slate-600 flex items-center gap-2">
                    <BarChart3 className="w-4 h-4" />
                    Trésorerie
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="text-2xl font-bold">{formatCurrency(kpiData.cashFlow.current)}</div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-slate-600">Projection:</span>
                      <span className="text-sm font-medium">{formatCurrency(kpiData.cashFlow.projected)}</span>
                    </div>
                    <div className="text-xs text-slate-500">
                      Autonomie: {kpiData.cashFlow.runway} mois
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Graphiques principaux */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    Évolution Financière
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                      <Area 
                        type="monotone" 
                        dataKey="revenue" 
                        stackId="1" 
                        stroke="#3b82f6" 
                        fill="#3b82f6" 
                        fillOpacity={0.6}
                        name="Chiffre d'affaires"
                      />
                      <Area 
                        type="monotone" 
                        dataKey="profit" 
                        stackId="2" 
                        stroke="#10b981" 
                        fill="#10b981" 
                        fillOpacity={0.6}
                        name="Profit"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PieChart className="w-5 h-5" />
                    Répartition par Segment
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <RechartsPieChart>
                      <Pie
                        data={revenueBySegment}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}%`}
                      >
                        {revenueBySegment.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value, name) => [`${value}%`, name]} />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                  <div className="mt-4 space-y-2">
                    {revenueBySegment.map((segment) => (
                      <div key={segment.name} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div 
                            className="w-3 h-3 rounded-full" 
                            style={{ backgroundColor: segment.color }}
                          />
                          <span className="text-sm">{segment.name}</span>
                        </div>
                        <span className="text-sm font-medium">{formatCurrency(segment.amount)}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Objectifs stratégiques */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Objectifs Stratégiques 2024
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {strategicObjectives.map((objective, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{objective.title}</h4>
                        <Badge className={getStatusColor(objective.status)}>
                          {getStatusIcon(objective.status)}
                          <span className="ml-1">
                            {objective.status === 'on-track' && 'En cours'}
                            {objective.status === 'at-risk' && 'À risque'}
                            {objective.status === 'delayed' && 'Retardé'}
                          </span>
                        </Badge>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span>Progression</span>
                          <span className="font-medium">
                            {typeof objective.current === 'number' && objective.current > 1000 
                              ? formatCurrency(objective.current)
                              : objective.current
                            } / 
                            {typeof objective.target === 'number' && objective.target > 1000 
                              ? formatCurrency(objective.target)
                              : objective.target + (typeof objective.target === 'number' && objective.target <= 100 ? '%' : '')
                            }
                          </span>
                        </div>
                        <Progress value={objective.progress} className="h-2" />
                        <div className="flex items-center justify-between text-xs text-slate-500">
                          <span>{formatPercentage(objective.progress)} complété</span>
                          <span>Échéance: {new Date(objective.deadline).toLocaleDateString('fr-FR')}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Indicateurs de risque */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" />
                  Analyse des Risques
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {riskIndicators.map((indicator, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-sm">{indicator.category}</h4>
                        <Badge className={getStatusColor(indicator.status)} size="sm">
                          {indicator.score}
                        </Badge>
                      </div>
                      
                      <Progress value={indicator.score} className="h-2 mb-2" />
                      
                      <p className="text-xs text-slate-600">{indicator.description}</p>
                    </div>
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