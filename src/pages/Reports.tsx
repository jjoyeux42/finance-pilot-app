import React, { useState } from 'react';
import { AppSidebar } from '@/components/AppSidebar';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  FileText, 
  Download, 
  Plus, 
  Edit, 
  Trash2, 
  Play, 
  Calendar, 
  Filter, 
  BarChart3, 
  PieChart, 
  TrendingUp, 
  DollarSign, 
  Users, 
  Target,
  Settings,
  Save,
  Copy,
  Share,
  Clock,
  Eye
} from 'lucide-react';
import { LineChart, Line, BarChart, Bar, PieChart as RechartsPieChart, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, AreaChart, Area } from 'recharts';

interface ReportTemplate {
  id: string;
  name: string;
  description: string;
  category: 'financial' | 'sales' | 'operational' | 'custom';
  type: 'table' | 'chart' | 'dashboard';
  frequency: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly' | 'on-demand';
  lastGenerated?: string;
  isActive: boolean;
  parameters: {
    dateRange: string;
    filters: Record<string, any>;
    groupBy: string[];
    metrics: string[];
    chartType?: string;
  };
  recipients?: string[];
}

interface CustomReport {
  id: string;
  name: string;
  description: string;
  createdBy: string;
  createdAt: string;
  lastModified: string;
  isPublic: boolean;
  config: {
    dataSources: string[];
    fields: {
      name: string;
      type: 'dimension' | 'metric';
      aggregation?: 'sum' | 'avg' | 'count' | 'min' | 'max';
      format?: string;
    }[];
    filters: {
      field: string;
      operator: string;
      value: any;
    }[];
    sorting: {
      field: string;
      direction: 'asc' | 'desc';
    }[];
    visualization: {
      type: 'table' | 'line' | 'bar' | 'pie' | 'area';
      options: Record<string, any>;
    };
  };
}

const reportTemplates: ReportTemplate[] = [
  {
    id: '1',
    name: 'Rapport Financier Mensuel',
    description: 'Vue d\'ensemble des performances financières du mois',
    category: 'financial',
    type: 'dashboard',
    frequency: 'monthly',
    lastGenerated: '2024-01-15T10:00:00Z',
    isActive: true,
    parameters: {
      dateRange: 'current_month',
      filters: {},
      groupBy: ['month'],
      metrics: ['revenue', 'profit', 'expenses', 'cash_flow']
    },
    recipients: ['direction@example-company.com', 'accounting@example-company.com']
  },
  {
    id: '2',
    name: 'Analyse des Ventes par Segment',
    description: 'Répartition des ventes par segment de clientèle',
    category: 'sales',
    type: 'chart',
    frequency: 'weekly',
    lastGenerated: '2024-01-18T09:00:00Z',
    isActive: true,
    parameters: {
      dateRange: 'current_week',
      filters: {},
      groupBy: ['customer_segment'],
      metrics: ['revenue', 'transaction_count'],
      chartType: 'pie'
    }
  },
  {
    id: '3',
    name: 'Suivi des Créances',
    description: 'État des créances clients et délais de paiement',
    category: 'financial',
    type: 'table',
    frequency: 'daily',
    isActive: true,
    parameters: {
      dateRange: 'all',
      filters: { status: 'pending' },
      groupBy: ['customer', 'due_date'],
      metrics: ['amount', 'days_overdue']
    }
  },
  {
    id: '4',
    name: 'Performance Équipe Commerciale',
    description: 'Indicateurs de performance de l\'équipe de vente',
    category: 'sales',
    type: 'dashboard',
    frequency: 'monthly',
    isActive: false,
    parameters: {
      dateRange: 'current_month',
      filters: { department: 'sales' },
      groupBy: ['salesperson'],
      metrics: ['deals_closed', 'revenue_generated', 'conversion_rate']
    }
  }
];

const customReports: CustomReport[] = [
  {
    id: 'custom-1',
    name: 'Analyse ROI par Canal',
    description: 'Retour sur investissement par canal d\'acquisition',
    createdBy: 'User Example',
    createdAt: '2024-01-10T14:30:00Z',
    lastModified: '2024-01-15T16:45:00Z',
    isPublic: true,
    config: {
      dataSources: ['transactions', 'customers', 'marketing_campaigns'],
      fields: [
        { name: 'channel', type: 'dimension' },
        { name: 'investment', type: 'metric', aggregation: 'sum', format: 'currency' },
        { name: 'revenue', type: 'metric', aggregation: 'sum', format: 'currency' },
        { name: 'roi', type: 'metric', aggregation: 'avg', format: 'percentage' }
      ],
      filters: [
        { field: 'date', operator: 'last_3_months', value: null }
      ],
      sorting: [
        { field: 'roi', direction: 'desc' }
      ],
      visualization: {
        type: 'bar',
        options: { showValues: true, colorScheme: 'blue' }
      }
    }
  }
];

const sampleData = {
  monthly_revenue: [
    { month: 'Jan', revenue: 180000, profit: 35000, expenses: 145000 },
    { month: 'Fév', revenue: 195000, profit: 38000, expenses: 157000 },
    { month: 'Mar', revenue: 210000, profit: 42000, expenses: 168000 },
    { month: 'Avr', revenue: 225000, profit: 45000, expenses: 180000 },
    { month: 'Mai', revenue: 240000, profit: 48000, expenses: 192000 },
    { month: 'Jun', revenue: 255000, profit: 51000, expenses: 204000 }
  ],
  sales_by_segment: [
    { name: 'Entreprises', value: 45, amount: 1102500 },
    { name: 'PME', value: 30, amount: 735000 },
    { name: 'Startups', value: 15, amount: 367500 },
    { name: 'Particuliers', value: 10, amount: 245000 }
  ],
  receivables: [
    { customer: 'TechCorp', amount: 15000, dueDate: '2024-01-25', daysOverdue: 5 },
    { customer: 'InnoSoft', amount: 8500, dueDate: '2024-01-30', daysOverdue: 0 },
    { customer: 'DataSys', amount: 12000, dueDate: '2024-01-20', daysOverdue: 10 },
    { customer: 'CloudTech', amount: 6500, dueDate: '2024-02-05', daysOverdue: -6 }
  ]
};

export default function Reports() {
  const [activeTab, setActiveTab] = useState('templates');
  const [selectedTemplate, setSelectedTemplate] = useState<ReportTemplate | null>(null);
  const [isCreatingReport, setIsCreatingReport] = useState(false);
  const [reportName, setReportName] = useState('');
  const [reportDescription, setReportDescription] = useState('');
  const [selectedDataSources, setSelectedDataSources] = useState<string[]>([]);
  const [selectedFields, setSelectedFields] = useState<string[]>([]);
  const [selectedVisualization, setSelectedVisualization] = useState('table');

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'financial':
        return 'bg-blue-100 text-blue-800';
      case 'sales':
        return 'bg-emerald-100 text-emerald-800';
      case 'operational':
        return 'bg-indigo-100 text-indigo-800';
      case 'custom':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-white text-slate-800';
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'financial':
        return 'Financier';
      case 'sales':
        return 'Commercial';
      case 'operational':
        return 'Opérationnel';
      case 'custom':
        return 'Personnalisé';
      default:
        return category;
    }
  };

  const getFrequencyLabel = (frequency: string) => {
    switch (frequency) {
      case 'daily':
        return 'Quotidien';
      case 'weekly':
        return 'Hebdomadaire';
      case 'monthly':
        return 'Mensuel';
      case 'quarterly':
        return 'Trimestriel';
      case 'yearly':
        return 'Annuel';
      case 'on-demand':
        return 'À la demande';
      default:
        return frequency;
    }
  };

  const generateReport = (template: ReportTemplate) => {
    // Simuler la génération du rapport
    console.log('Génération du rapport:', template.name);
    
    // Dans une vraie application, ceci déclencherait la génération
    // et potentiellement l'envoi par email
  };

  const exportReport = (format: 'pdf' | 'excel' | 'csv') => {
    console.log('Export du rapport en format:', format);
    
    // Simuler l'export
    const filename = `rapport-${Date.now()}.${format}`;
    console.log('Fichier généré:', filename);
  };

  const saveCustomReport = () => {
    if (!reportName.trim()) return;
    
    const newReport: CustomReport = {
      id: `custom-${Date.now()}`,
      name: reportName,
      description: reportDescription,
      createdBy: 'Utilisateur Actuel',
      createdAt: new Date().toISOString(),
      lastModified: new Date().toISOString(),
      isPublic: false,
      config: {
        dataSources: selectedDataSources,
        fields: selectedFields.map(field => ({
          name: field,
          type: 'dimension' as const,
          aggregation: 'sum' as const
        })),
        filters: [],
        sorting: [],
        visualization: {
          type: selectedVisualization as any,
          options: {}
        }
      }
    };
    
    console.log('Nouveau rapport personnalisé:', newReport);
    setIsCreatingReport(false);
    setReportName('');
    setReportDescription('');
    setSelectedDataSources([]);
    setSelectedFields([]);
  };

  const renderVisualization = (type: string, data: any[]) => {
    switch (type) {
      case 'line':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => formatCurrency(Number(value))} />
              <Legend />
              <Line type="monotone" dataKey="revenue" stroke="#3b82f6" name="Chiffre d'affaires" />
              <Line type="monotone" dataKey="profit" stroke="#10b981" name="Profit" />
            </LineChart>
          </ResponsiveContainer>
        );
      
      case 'bar':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => formatCurrency(Number(value))} />
              <Legend />
              <Bar dataKey="revenue" fill="#3b82f6" name="Chiffre d'affaires" />
              <Bar dataKey="expenses" fill="#ef4444" name="Dépenses" />
            </BarChart>
          </ResponsiveContainer>
        );
      
      case 'pie':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <RechartsPieChart>
              <Pie
                data={sampleData.sales_by_segment}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}%`}
              >
                {sampleData.sales_by_segment.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={['#3b82f6', '#10b981', '#ffffff', '#ef4444'][index]} />
                ))}
              </Pie>
              <Tooltip />
            </RechartsPieChart>
          </ResponsiveContainer>
        );
      
      default:
        return (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Client</th>
                  <th className="text-left p-2">Montant</th>
                  <th className="text-left p-2">Échéance</th>
                  <th className="text-left p-2">Retard (jours)</th>
                </tr>
              </thead>
              <tbody>
                {sampleData.receivables.map((item, index) => (
                  <tr key={index} className="border-b">
                    <td className="p-2">{item.customer}</td>
                    <td className="p-2">{formatCurrency(item.amount)}</td>
                    <td className="p-2">{new Date(item.dueDate).toLocaleDateString('fr-FR')}</td>
                    <td className={`p-2 ${
                      item.daysOverdue > 0 ? 'text-red-600' : 
                      item.daysOverdue < 0 ? 'text-green-600' : 'text-slate-600'
                    }`}>
                      {item.daysOverdue}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
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
              <h1 className="text-2xl font-bold text-slate-900">Rapports et Analyses</h1>
              <p className="text-slate-600">Création et gestion de rapports personnalisés</p>
            </div>
            
            <div className="flex items-center gap-4">
              <Button 
                onClick={() => setIsCreatingReport(true)}
                className="gap-2"
              >
                <Plus className="w-4 h-4" />
                Nouveau Rapport
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList>
              <TabsTrigger value="templates">Modèles</TabsTrigger>
              <TabsTrigger value="custom">Rapports Personnalisés</TabsTrigger>
              <TabsTrigger value="scheduled">Rapports Programmés</TabsTrigger>
              <TabsTrigger value="preview">Aperçu</TabsTrigger>
            </TabsList>

            <TabsContent value="templates" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {reportTemplates.map((template) => (
                  <Card key={template.id} className="cursor-pointer hover:shadow-md transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-base mb-2">{template.name}</CardTitle>
                          <p className="text-sm text-slate-600 mb-3">{template.description}</p>
                          
                          <div className="flex items-center gap-2 mb-2">
                            <Badge className={getCategoryColor(template.category)} size="sm">
                              {getCategoryLabel(template.category)}
                            </Badge>
                            <Badge variant="outline" size="sm">
                              {getFrequencyLabel(template.frequency)}
                            </Badge>
                          </div>
                          
                          {template.lastGenerated && (
                            <p className="text-xs text-slate-500">
                              Dernière génération: {new Date(template.lastGenerated).toLocaleDateString('fr-FR')}
                            </p>
                          )}
                        </div>
                        
                        <div className={`w-3 h-3 rounded-full ${
                          template.isActive ? 'bg-emerald-500' : 'bg-slate-300'
                        }`} />
                      </div>
                    </CardHeader>
                    
                    <CardContent>
                      <div className="flex items-center gap-2">
                        <Button 
                          size="sm" 
                          onClick={() => generateReport(template)}
                          className="flex-1"
                        >
                          <Play className="w-3 h-3 mr-1" />
                          Générer
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => setSelectedTemplate(template)}
                        >
                          <Eye className="w-3 h-3" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Edit className="w-3 h-3" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="custom" className="space-y-6">
              {isCreatingReport ? (
                <Card>
                  <CardHeader>
                    <CardTitle>Créer un Rapport Personnalisé</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="report-name">Nom du rapport</Label>
                        <Input
                          id="report-name"
                          value={reportName}
                          onChange={(e) => setReportName(e.target.value)}
                          placeholder="Nom du rapport"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="visualization">Type de visualisation</Label>
                        <Select value={selectedVisualization} onValueChange={setSelectedVisualization}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="table">Tableau</SelectItem>
                            <SelectItem value="line">Graphique linéaire</SelectItem>
                            <SelectItem value="bar">Graphique en barres</SelectItem>
                            <SelectItem value="pie">Graphique circulaire</SelectItem>
                            <SelectItem value="area">Graphique en aires</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="report-description">Description</Label>
                      <Textarea
                        id="report-description"
                        value={reportDescription}
                        onChange={(e) => setReportDescription(e.target.value)}
                        placeholder="Description du rapport"
                        rows={3}
                      />
                    </div>
                    
                    <div>
                      <Label>Sources de données</Label>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
                        {['Transactions', 'Factures', 'Clients', 'Budgets'].map((source) => (
                          <div key={source} className="flex items-center space-x-2">
                            <Checkbox
                              id={source}
                              checked={selectedDataSources.includes(source)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  setSelectedDataSources([...selectedDataSources, source]);
                                } else {
                                  setSelectedDataSources(selectedDataSources.filter(s => s !== source));
                                }
                              }}
                            />
                            <Label htmlFor={source}>{source}</Label>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <Label>Champs à inclure</Label>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
                        {['Date', 'Montant', 'Client', 'Catégorie', 'Statut', 'Description'].map((field) => (
                          <div key={field} className="flex items-center space-x-2">
                            <Checkbox
                              id={field}
                              checked={selectedFields.includes(field)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  setSelectedFields([...selectedFields, field]);
                                } else {
                                  setSelectedFields(selectedFields.filter(f => f !== field));
                                }
                              }}
                            />
                            <Label htmlFor={field}>{field}</Label>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <Button onClick={saveCustomReport} disabled={!reportName.trim()}>
                        <Save className="w-4 h-4 mr-2" />
                        Enregistrer
                      </Button>
                      <Button variant="outline" onClick={() => setIsCreatingReport(false)}>
                        Annuler
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {customReports.map((report) => (
                    <Card key={report.id}>
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="text-base mb-2">{report.name}</CardTitle>
                            <p className="text-sm text-slate-600 mb-2">{report.description}</p>
                            <div className="flex items-center gap-2 text-xs text-slate-500">
                              <span>Par {report.createdBy}</span>
                              <span>•</span>
                              <span>{new Date(report.createdAt).toLocaleDateString('fr-FR')}</span>
                            </div>
                          </div>
                          
                          {report.isPublic && (
                            <Badge variant="outline" size="sm">
                              Public
                            </Badge>
                          )}
                        </div>
                      </CardHeader>
                      
                      <CardContent>
                        <div className="flex items-center gap-2">
                          <Button size="sm" className="flex-1">
                            <Play className="w-3 h-3 mr-1" />
                            Exécuter
                          </Button>
                          <Button size="sm" variant="outline">
                            <Edit className="w-3 h-3" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Copy className="w-3 h-3" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="preview" className="space-y-6">
              {selectedTemplate ? (
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>{selectedTemplate.name}</CardTitle>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" onClick={() => exportReport('pdf')}>
                          <Download className="w-4 h-4 mr-2" />
                          PDF
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => exportReport('excel')}>
                          <Download className="w-4 h-4 mr-2" />
                          Excel
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => exportReport('csv')}>
                          <Download className="w-4 h-4 mr-2" />
                          CSV
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {renderVisualization(
                      selectedTemplate.parameters.chartType || selectedTemplate.type,
                      sampleData.monthly_revenue
                    )}
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardContent className="text-center py-12">
                    <FileText className="w-12 h-12 mx-auto mb-4 text-slate-400" />
                    <p className="text-slate-600">Sélectionnez un rapport pour voir l'aperçu</p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}