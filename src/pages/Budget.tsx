import React, { useState } from 'react';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  PieChart, 
  Plus,
  TrendingUp,
  TrendingDown,
  Target,
  AlertTriangle,
  CheckCircle,
  Calendar,
  Euro,
  BarChart3,
  Edit,
  Trash2
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

interface BudgetCategory {
  id: string;
  name: string;
  budgeted: number;
  spent: number;
  period: 'monthly' | 'quarterly' | 'yearly';
  color: string;
  description: string;
}

interface BudgetForecast {
  month: string;
  budgeted: number;
  actual: number;
  forecast: number;
}

const mockBudgetCategories: BudgetCategory[] = [
  {
    id: '1',
    name: 'Marketing',
    budgeted: 15000,
    spent: 12500,
    period: 'monthly',
    color: '#3B82F6',
    description: 'Campagnes publicitaires et communication'
  },
  {
    id: '2',
    name: 'Développement',
    budgeted: 25000,
    spent: 28000,
    period: 'monthly',
    color: '#10B981',
    description: 'Coûts de développement et R&D'
  },
  {
    id: '3',
    name: 'Opérations',
    budgeted: 8000,
    spent: 7200,
    period: 'monthly',
    color: '#ffffff',
    description: 'Frais opérationnels et administratifs'
  },
  {
    id: '4',
    name: 'Ressources Humaines',
    budgeted: 45000,
    spent: 45000,
    period: 'monthly',
    color: '#8B5CF6',
    description: 'Salaires et avantages sociaux'
  },
  {
    id: '5',
    name: 'Infrastructure',
    budgeted: 5000,
    spent: 4800,
    period: 'monthly',
    color: '#EF4444',
    description: 'Serveurs, outils et licences'
  }
];

const mockForecastData: BudgetForecast[] = [
  { month: 'Jan', budgeted: 98000, actual: 97500, forecast: 98000 },
  { month: 'Fév', budgeted: 98000, actual: 102000, forecast: 100000 },
  { month: 'Mar', budgeted: 98000, actual: 95000, forecast: 97000 },
  { month: 'Avr', budgeted: 98000, actual: 0, forecast: 99000 },
  { month: 'Mai', budgeted: 98000, actual: 0, forecast: 101000 },
  { month: 'Jun', budgeted: 98000, actual: 0, forecast: 98500 }
];

const Budget = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');
  const [selectedCategory, setSelectedCategory] = useState<BudgetCategory | null>(null);
  const [isAddingBudget, setIsAddingBudget] = useState(false);

  const totalBudgeted = mockBudgetCategories.reduce((sum, cat) => sum + cat.budgeted, 0);
  const totalSpent = mockBudgetCategories.reduce((sum, cat) => sum + cat.spent, 0);
  const totalRemaining = totalBudgeted - totalSpent;
  const overBudgetCategories = mockBudgetCategories.filter(cat => cat.spent > cat.budgeted);

  const getBudgetStatus = (category: BudgetCategory) => {
    const percentage = (category.spent / category.budgeted) * 100;
    if (percentage > 100) return { status: 'over', color: 'text-red-600', bgColor: 'bg-red-100' };
    if (percentage > 90) return { status: 'warning', color: 'text-indigo-600', bgColor: 'bg-indigo-100' };
    return { status: 'good', color: 'text-emerald-600', bgColor: 'bg-emerald-100' };
  };

  const getProgressColor = (spent: number, budgeted: number) => {
    const percentage = (spent / budgeted) * 100;
    if (percentage > 100) return 'bg-red-500';
    if (percentage > 90) return 'bg-indigo-500';
    return 'bg-emerald-500';
  };

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
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900">💰 Gestion Budgétaire</h1>
                <p className="text-slate-600 text-sm sm:text-base lg:text-lg">Planification et suivi budgétaire</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 w-full sm:w-auto">
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="monthly">Mensuel</SelectItem>
                  <SelectItem value="quarterly">Trimestriel</SelectItem>
                  <SelectItem value="yearly">Annuel</SelectItem>
                </SelectContent>
              </Select>
              <Button 
                className="bg-purple-600 hover:bg-purple-700 w-full sm:w-auto"
                onClick={() => setIsAddingBudget(true)}
              >
                <Plus className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Nouveau Budget</span>
                <span className="sm:hidden">Ajouter</span>
              </Button>
            </div>
          </div>

          {/* Statistiques globales */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <Card className="border-0 shadow-md bg-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Budget Total</p>
                    <p className="text-2xl font-bold text-slate-900">
                      {(totalBudgeted / 1000).toFixed(0)}k€
                    </p>
                  </div>
                  <Target className="w-8 h-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md bg-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Dépensé</p>
                    <p className="text-2xl font-bold text-slate-900">
                      {(totalSpent / 1000).toFixed(0)}k€
                    </p>
                  </div>
                  <Euro className="w-8 h-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md bg-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Restant</p>
                    <p className={`text-2xl font-bold ${
                      totalRemaining >= 0 ? 'text-emerald-600' : 'text-red-600'
                    }`}>
                      {(totalRemaining / 1000).toFixed(0)}k€
                    </p>
                  </div>
                  {totalRemaining >= 0 ? (
                    <TrendingUp className="w-8 h-8 text-emerald-600" />
                  ) : (
                    <TrendingDown className="w-8 h-8 text-red-600" />
                  )}
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md bg-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Dépassements</p>
                    <p className="text-2xl font-bold text-red-600">
                      {overBudgetCategories.length}
                    </p>
                  </div>
                  <AlertTriangle className="w-8 h-8 text-red-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
            {/* Liste des catégories budgétaires */}
            <div className="lg:col-span-2">
              <Card className="border-0 shadow-md bg-white">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PieChart className="w-5 h-5" />
                    Catégories Budgétaires
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockBudgetCategories.map((category) => {
                      const status = getBudgetStatus(category);
                      const percentage = Math.min((category.spent / category.budgeted) * 100, 100);
                      const overBudget = category.spent > category.budgeted;
                      
                      return (
                        <div
                          key={category.id}
                          className={`p-4 rounded-lg border cursor-pointer transition-all hover:shadow-md ${
                            selectedCategory?.id === category.id 
                              ? 'border-white bg-purple-50' 
                              : 'border-slate-200 bg-white'
                          }`}
                          onClick={() => setSelectedCategory(category)}
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <div 
                                  className="w-4 h-4 rounded-full" 
                                  style={{ backgroundColor: category.color }}
                                />
                                <h3 className="font-semibold text-slate-900">{category.name}</h3>
                                <Badge className={status.bgColor + ' ' + status.color}>
                                  {status.status === 'over' ? 'Dépassé' : 
                                   status.status === 'warning' ? 'Attention' : 'OK'}
                                </Badge>
                              </div>
                              <p className="text-sm text-slate-600 mb-3">{category.description}</p>
                              
                              <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                  <span className="text-slate-600">Progression</span>
                                  <span className={overBudget ? 'text-red-600 font-semibold' : 'text-slate-900'}>
                                    {category.spent.toLocaleString('fr-FR')}€ / {category.budgeted.toLocaleString('fr-FR')}€
                                  </span>
                                </div>
                                <div className="relative">
                                  <Progress 
                                    value={percentage} 
                                    className="h-2"
                                  />
                                  {overBudget && (
                                    <div className="absolute top-0 left-0 h-2 bg-red-500 rounded-full" 
                                         style={{ width: '100%' }} />
                                  )}
                                </div>
                                <div className="flex justify-between text-xs text-slate-500">
                                  <span>{percentage.toFixed(1)}% utilisé</span>
                                  {overBudget && (
                                    <span className="text-red-600 font-semibold">
                                      +{((category.spent - category.budgeted) / category.budgeted * 100).toFixed(1)}% dépassement
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-2 ml-4">
                              <Button variant="ghost" size="sm">
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Détails de la catégorie sélectionnée */}
            <div>
              {selectedCategory ? (
                <Card className="border-0 shadow-md bg-white">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <div 
                        className="w-4 h-4 rounded-full" 
                        style={{ backgroundColor: selectedCategory.color }}
                      />
                      {selectedCategory.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-sm text-slate-600 mb-2">{selectedCategory.description}</p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <p className="text-2xl font-bold text-slate-900">
                          {selectedCategory.budgeted.toLocaleString('fr-FR')}€
                        </p>
                        <p className="text-sm text-slate-600">Budgété</p>
                      </div>
                      <div>
                        <p className={`text-2xl font-bold ${
                          selectedCategory.spent > selectedCategory.budgeted 
                            ? 'text-red-600' 
                            : 'text-slate-900'
                        }`}>
                          {selectedCategory.spent.toLocaleString('fr-FR')}€
                        </p>
                        <p className="text-sm text-slate-600">Dépensé</p>
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t">
                      <div className="text-center">
                        <p className={`text-xl font-bold ${
                          selectedCategory.budgeted - selectedCategory.spent >= 0 
                            ? 'text-emerald-600' 
                            : 'text-red-600'
                        }`}>
                          {(selectedCategory.budgeted - selectedCategory.spent).toLocaleString('fr-FR')}€
                        </p>
                        <p className="text-sm text-slate-600">
                          {selectedCategory.budgeted - selectedCategory.spent >= 0 ? 'Restant' : 'Dépassement'}
                        </p>
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t space-y-2">
                      <Button className="w-full" variant="outline">
                        <Edit className="w-4 h-4 mr-2" />
                        Modifier Budget
                      </Button>
                      <Button className="w-full" variant="outline">
                        <BarChart3 className="w-4 h-4 mr-2" />
                        Voir Détails
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card className="border-0 shadow-md bg-white">
                  <CardContent className="p-6 text-center">
                    <Target className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                    <p className="text-slate-600">Sélectionnez une catégorie pour voir ses détails</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

          {/* Graphique de prévisions */}
          <Card className="border-0 shadow-md bg-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Prévisions Budgétaires
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={mockForecastData}>
                    <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                    <XAxis dataKey="month" className="text-sm" />
                    <YAxis className="text-sm" />
                    <Tooltip 
                      formatter={(value: number) => [`${value.toLocaleString('fr-FR')}€`, '']}
                      labelFormatter={(label) => `Mois: ${label}`}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="budgeted" 
                      stroke="#8B5CF6" 
                      strokeWidth={2}
                      name="Budget"
                      strokeDasharray="5 5"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="actual" 
                      stroke="#10B981" 
                      strokeWidth={2}
                      name="Réalisé"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="forecast" 
                      stroke="#3B82F6" 
                      strokeWidth={2}
                      name="Prévision"
                      strokeDasharray="3 3"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Budget;