import React, { useState, useEffect } from 'react';
import { AppSidebar } from '@/components/AppSidebar';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Activity, 
  Clock, 
  DollarSign, 
  Users, 
  FileText, 
  Target,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  TrendingDown,
  Calendar,
  Phone,
  Mail,
  ShoppingCart,
  CreditCard,
  Zap,
  RefreshCw
} from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

// Données en temps réel mockées
const todayMetrics = {
  sales: {
    today: 45000,
    yesterday: 38000,
    target: 50000,
    transactions: 23
  },
  customers: {
    newToday: 12,
    contactsToday: 45,
    meetingsScheduled: 8,
    conversionRate: 26.7
  },
  operations: {
    invoicesSent: 15,
    paymentsReceived: 8,
    overdueFollowups: 6,
    tasksCompleted: 34
  },
  team: {
    activeUsers: 8,
    productivity: 87,
    avgResponseTime: 2.3,
    satisfaction: 4.6
  }
};

const hourlyData = [
  { hour: '08h', sales: 2500, calls: 3, emails: 12 },
  { hour: '09h', sales: 4200, calls: 8, emails: 18 },
  { hour: '10h', sales: 6800, calls: 12, emails: 25 },
  { hour: '11h', sales: 8900, calls: 15, emails: 22 },
  { hour: '12h', sales: 5600, calls: 6, emails: 8 },
  { hour: '13h', sales: 3200, calls: 4, emails: 6 },
  { hour: '14h', sales: 7800, calls: 18, emails: 28 },
  { hour: '15h', sales: 9200, calls: 22, emails: 35 },
  { hour: '16h', sales: 6500, calls: 14, emails: 20 },
  { hour: '17h', sales: 4100, calls: 8, emails: 15 }
];

const teamActivity = [
  {
    name: 'Marie Dubois',
    role: 'Commercial',
    status: 'active',
    tasksToday: 8,
    tasksCompleted: 6,
    lastActivity: '2 min',
    performance: 92
  },
  {
    name: 'Pierre Martin',
    role: 'Comptable',
    status: 'active',
    tasksToday: 12,
    tasksCompleted: 10,
    lastActivity: '5 min',
    performance: 88
  },
  {
    name: 'Sophie Laurent',
    role: 'Manager',
    status: 'meeting',
    tasksToday: 6,
    tasksCompleted: 4,
    lastActivity: '15 min',
    performance: 95
  },
  {
    name: 'Thomas Petit',
    role: 'Commercial',
    status: 'active',
    tasksToday: 10,
    tasksCompleted: 7,
    lastActivity: '1 min',
    performance: 85
  }
];

const urgentTasks = [
  {
    id: 1,
    title: 'Relance facture INV-2024-045',
    assignee: 'Marie Dubois',
    priority: 'high',
    dueTime: '10:30',
    category: 'finance'
  },
  {
    id: 2,
    title: 'Appel prospect TechCorp',
    assignee: 'Thomas Petit',
    priority: 'medium',
    dueTime: '11:00',
    category: 'sales'
  },
  {
    id: 3,
    title: 'Validation budget Q2',
    assignee: 'Sophie Laurent',
    priority: 'high',
    dueTime: '14:00',
    category: 'management'
  },
  {
    id: 4,
    title: 'Réconciliation bancaire',
    assignee: 'Pierre Martin',
    priority: 'medium',
    dueTime: '16:00',
    category: 'finance'
  }
];

const alerts = [
  {
    type: 'warning',
    message: 'Objectif ventes journalier à 90%',
    time: '2 min'
  },
  {
    type: 'info',
    message: 'Nouveau prospect ajouté',
    time: '5 min'
  },
  {
    type: 'success',
    message: 'Paiement reçu - 15 000€',
    time: '8 min'
  },
  {
    type: 'warning',
    message: '3 factures arrivent à échéance',
    time: '12 min'
  }
];

export default function OperationalDashboard() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [refreshing, setRefreshing] = useState(false);
  const [selectedTeamMember, setSelectedTeamMember] = useState('all');

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

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
      case 'active':
        return 'bg-emerald-100 text-emerald-800';
      case 'meeting':
        return 'bg-blue-100 text-blue-800';
      case 'away':
        return 'bg-indigo-100 text-indigo-800';
      case 'offline':
        return 'bg-slate-100 text-slate-800';
      default:
        return 'bg-slate-100 text-slate-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-blue-100 text-blue-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-slate-100 text-slate-800';
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-indigo-600" />;
      case 'success':
        return <CheckCircle className="w-4 h-4 text-emerald-600" />;
      case 'info':
        return <Activity className="w-4 h-4 text-blue-600" />;
      default:
        return <Activity className="w-4 h-4" />;
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    // Simuler un refresh des données
    await new Promise(resolve => setTimeout(resolve, 1000));
    setRefreshing(false);
  };

  return (
    <div className="flex h-screen bg-white">
      <AppSidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-white border-b border-slate-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Dashboard Opérationnel</h1>
              <p className="text-slate-600">
                Métriques en temps réel - {currentTime.toLocaleDateString('fr-FR', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })} à {currentTime.toLocaleTimeString('fr-FR', { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              <Select value={selectedTeamMember} onValueChange={setSelectedTeamMember}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toute l'équipe</SelectItem>
                  {teamActivity.map((member) => (
                    <SelectItem key={member.name} value={member.name}>
                      {member.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Button 
                variant="outline" 
                onClick={handleRefresh}
                disabled={refreshing}
                className="gap-2"
              >
                <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
                Actualiser
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto p-6">
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList>
              <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
              <TabsTrigger value="sales">Ventes</TabsTrigger>
              <TabsTrigger value="operations">Opérations</TabsTrigger>
              <TabsTrigger value="team">Équipe</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* Métriques du jour */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-slate-600 flex items-center gap-2">
                      <DollarSign className="w-4 h-4" />
                      Ventes Aujourd'hui
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="text-2xl font-bold">{formatCurrency(todayMetrics.sales.today)}</div>
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-emerald-600" />
                        <span className="text-sm text-emerald-600 font-medium">
                          +{formatPercentage(((todayMetrics.sales.today - todayMetrics.sales.yesterday) / todayMetrics.sales.yesterday) * 100)}
                        </span>
                        <span className="text-sm text-slate-500">vs hier</span>
                      </div>
                      <Progress value={(todayMetrics.sales.today / todayMetrics.sales.target) * 100} className="h-2" />
                      <div className="text-xs text-slate-500">
                        {formatPercentage((todayMetrics.sales.today / todayMetrics.sales.target) * 100)} de l'objectif
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-slate-600 flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      Activité Client
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="text-2xl font-bold">{todayMetrics.customers.newToday}</div>
                      <div className="text-sm text-slate-600">nouveaux clients</div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-500">Contacts:</span>
                        <span className="font-medium">{todayMetrics.customers.contactsToday}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-500">RDV:</span>
                        <span className="font-medium">{todayMetrics.customers.meetingsScheduled}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-slate-600 flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      Opérations
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="text-2xl font-bold">{todayMetrics.operations.invoicesSent}</div>
                      <div className="text-sm text-slate-600">factures envoyées</div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-500">Paiements:</span>
                        <span className="font-medium text-emerald-600">{todayMetrics.operations.paymentsReceived}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-500">Relances:</span>
                        <span className="font-medium text-red-600">{todayMetrics.operations.overdueFollowups}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-slate-600 flex items-center gap-2">
                      <Activity className="w-4 h-4" />
                      Performance Équipe
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="text-2xl font-bold">{todayMetrics.team.activeUsers}</div>
                      <div className="text-sm text-slate-600">utilisateurs actifs</div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-500">Productivité:</span>
                        <span className="font-medium">{todayMetrics.team.productivity}%</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-500">Satisfaction:</span>
                        <span className="font-medium">{todayMetrics.team.satisfaction}/5</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Graphique activité horaire */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    Activité Horaire
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={hourlyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="hour" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="sales" 
                        stroke="#3b82f6" 
                        strokeWidth={2}
                        name="Ventes (€)"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="calls" 
                        stroke="#10b981" 
                        strokeWidth={2}
                        name="Appels"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="emails" 
                        stroke="#f59e0b" 
                        strokeWidth={2}
                        name="Emails"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Tâches urgentes et alertes */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="w-5 h-5" />
                      Tâches Urgentes
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {urgentTasks.map((task) => (
                        <div key={task.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-medium text-sm">{task.title}</h4>
                              <Badge className={getPriorityColor(task.priority)} size="sm">
                                {task.priority === 'high' ? 'Élevée' : task.priority === 'medium' ? 'Moyenne' : 'Faible'}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-4 text-xs text-slate-500">
                              <span>{task.assignee}</span>
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {task.dueTime}
                              </span>
                            </div>
                          </div>
                          <Button size="sm" variant="outline">
                            Voir
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Zap className="w-5 h-5" />
                      Alertes Temps Réel
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {alerts.map((alert, index) => (
                        <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
                          {getAlertIcon(alert.type)}
                          <div className="flex-1">
                            <p className="text-sm font-medium">{alert.message}</p>
                            <p className="text-xs text-slate-500">Il y a {alert.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="team" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Activité de l'Équipe
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {teamActivity.map((member, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center">
                            <span className="text-sm font-medium">
                              {member.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <div>
                            <h4 className="font-medium">{member.name}</h4>
                            <p className="text-sm text-slate-500">{member.role}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-6">
                          <div className="text-center">
                            <div className="text-sm font-medium">{member.tasksCompleted}/{member.tasksToday}</div>
                            <div className="text-xs text-slate-500">Tâches</div>
                          </div>
                          
                          <div className="text-center">
                            <div className="text-sm font-medium">{member.performance}%</div>
                            <div className="text-xs text-slate-500">Performance</div>
                          </div>
                          
                          <div className="text-center">
                            <Badge className={getStatusColor(member.status)} size="sm">
                              {member.status === 'active' ? 'Actif' : 
                               member.status === 'meeting' ? 'Réunion' : 
                               member.status === 'away' ? 'Absent' : 'Hors ligne'}
                            </Badge>
                            <div className="text-xs text-slate-500 mt-1">{member.lastActivity}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}