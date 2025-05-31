import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";
import { 
  Clock, 
  User, 
  FileText, 
  Edit, 
  Trash2, 
  Eye, 
  Download, 
  Upload, 
  LogIn, 
  LogOut, 
  Settings, 
  AlertTriangle, 
  CheckCircle, 
  Info, 
  Search, 
  Filter, 
  Calendar,
  Monitor,
  Smartphone,
  Globe,
  Shield,
  Database,
  RefreshCw,
  GitBranch,
  Archive,
  FileCheck
} from 'lucide-react';

interface ActivityLog {
  id: string;
  timestamp: string;
  userId: string;
  userName: string;
  userRole: string;
  action: 'create' | 'update' | 'delete' | 'view' | 'export' | 'import' | 'login' | 'logout' | 'backup' | 'restore';
  entityType: 'transaction' | 'invoice' | 'customer' | 'budget' | 'user' | 'system' | 'report' | 'setting';
  entityId?: string;
  entityName?: string;
  description: string;
  details?: Record<string, any>;
  ipAddress: string;
  userAgent: string;
  sessionId: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  location?: string;
  deviceType: 'desktop' | 'mobile' | 'tablet';
  success: boolean;
  duration?: number;
}

interface VersionHistory {
  id: string;
  entityType: string;
  entityId: string;
  entityName: string;
  version: number;
  timestamp: string;
  userId: string;
  userName: string;
  action: 'created' | 'updated' | 'deleted' | 'restored';
  changes: {
    field: string;
    oldValue: any;
    newValue: any;
    type: 'added' | 'modified' | 'removed';
  }[];
  comment?: string;
  size: number;
  checksum: string;
}

const activityLogs: ActivityLog[] = [
  {
    id: '1',
    timestamp: '2024-01-20T14:30:00Z',
    userId: 'user-123',
    userName: 'Sophie Laurent',
    userRole: 'Manager',
    action: 'create',
    entityType: 'invoice',
    entityId: 'inv-456',
    entityName: 'Facture TechCorp',
    description: 'Création d\'une nouvelle facture',
    details: { amount: 15000, customer: 'TechCorp' },
    ipAddress: '192.168.1.100',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
    sessionId: 'sess-789',
    severity: 'low',
    location: 'Paris, France',
    deviceType: 'desktop',
    success: true,
    duration: 1200
  },
  {
    id: '2',
    timestamp: '2024-01-20T14:25:00Z',
    userId: 'user-456',
    userName: 'Marc Dubois',
    userRole: 'Accountant',
    action: 'update',
    entityType: 'transaction',
    entityId: 'trans-789',
    entityName: 'Paiement InnoSoft',
    description: 'Modification du montant de la transaction',
    details: { oldAmount: 8000, newAmount: 8500 },
    ipAddress: '192.168.1.101',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
    sessionId: 'sess-790',
    severity: 'medium',
    location: 'Lyon, France',
    deviceType: 'desktop',
    success: true,
    duration: 800
  },
  {
    id: '3',
    timestamp: '2024-01-20T14:20:00Z',
    userId: 'user-789',
    userName: 'Julie Martin',
    userRole: 'Sales',
    action: 'view',
    entityType: 'customer',
    entityId: 'cust-123',
    entityName: 'DataSys',
    description: 'Consultation du profil client',
    ipAddress: '192.168.1.102',
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X)',
    sessionId: 'sess-791',
    severity: 'low',
    location: 'Marseille, France',
    deviceType: 'mobile',
    success: true,
    duration: 300
  },
  {
    id: '4',
    timestamp: '2024-01-20T14:15:00Z',
    userId: 'user-123',
    userName: 'Sophie Laurent',
    userRole: 'Manager',
    action: 'export',
    entityType: 'report',
    entityName: 'Rapport Mensuel Janvier',
    description: 'Export du rapport mensuel en PDF',
    details: { format: 'PDF', size: '2.3MB' },
    ipAddress: '192.168.1.100',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
    sessionId: 'sess-789',
    severity: 'low',
    location: 'Paris, France',
    deviceType: 'desktop',
    success: true,
    duration: 2500
  },
  {
    id: '5',
    timestamp: '2024-01-20T14:10:00Z',
    userId: 'system',
    userName: 'Système',
    userRole: 'System',
    action: 'backup',
    entityType: 'system',
    description: 'Sauvegarde automatique de la base de données',
    details: { size: '156MB', duration: '45s' },
    ipAddress: '127.0.0.1',
    userAgent: 'System/1.0',
    sessionId: 'sys-001',
    severity: 'low',
    deviceType: 'desktop',
    success: true,
    duration: 45000
  },
  {
    id: '6',
    timestamp: '2024-01-20T13:45:00Z',
    userId: 'user-999',
    userName: 'Utilisateur Inconnu',
    userRole: 'Unknown',
    action: 'login',
    entityType: 'system',
    description: 'Tentative de connexion échouée',
    details: { reason: 'Invalid credentials', attempts: 3 },
    ipAddress: '203.0.113.1',
    userAgent: 'Mozilla/5.0 (X11; Linux x86_64)',
    sessionId: 'sess-failed',
    severity: 'high',
    location: 'Inconnu',
    deviceType: 'desktop',
    success: false,
    duration: 100
  }
];

const versionHistory: VersionHistory[] = [
  {
    id: 'v1',
    entityType: 'invoice',
    entityId: 'inv-456',
    entityName: 'Facture TechCorp',
    version: 3,
    timestamp: '2024-01-20T14:30:00Z',
    userId: 'user-123',
    userName: 'Sophie Laurent',
    action: 'updated',
    changes: [
      {
        field: 'amount',
        oldValue: 14500,
        newValue: 15000,
        type: 'modified'
      },
      {
        field: 'dueDate',
        oldValue: '2024-02-15',
        newValue: '2024-02-20',
        type: 'modified'
      }
    ],
    comment: 'Ajustement du montant et de la date d\'échéance',
    size: 2048,
    checksum: 'sha256:abc123...'
  },
  {
    id: 'v2',
    entityType: 'customer',
    entityId: 'cust-123',
    entityName: 'DataSys',
    version: 2,
    timestamp: '2024-01-20T13:15:00Z',
    userId: 'user-456',
    userName: 'Marc Dubois',
    action: 'updated',
    changes: [
      {
        field: 'email',
        oldValue: 'contact@datasys.com',
        newValue: 'info@datasys.com',
        type: 'modified'
      },
      {
        field: 'phone',
        oldValue: '+33 1 23 45 67 89',
        newValue: '+33 1 23 45 67 90',
        type: 'modified'
      },
      {
        field: 'segment',
        oldValue: null,
        newValue: 'Enterprise',
        type: 'added'
      }
    ],
    comment: 'Mise à jour des informations de contact',
    size: 1536,
    checksum: 'sha256:def456...'
  },
  {
    id: 'v3',
    entityType: 'budget',
    entityId: 'budget-789',
    entityName: 'Budget Marketing Q1',
    version: 1,
    timestamp: '2024-01-20T10:00:00Z',
    userId: 'user-789',
    userName: 'Julie Martin',
    action: 'created',
    changes: [
      {
        field: 'totalAmount',
        oldValue: null,
        newValue: 50000,
        type: 'added'
      },
      {
        field: 'categories',
        oldValue: null,
        newValue: ['Digital', 'Events', 'Content'],
        type: 'added'
      }
    ],
    comment: 'Création du budget marketing pour Q1 2024',
    size: 1024,
    checksum: 'sha256:ghi789...'
  }
];

export default function ActivityLogger() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAction, setSelectedAction] = useState('all');
  const [selectedEntity, setSelectedEntity] = useState('all');
  const [selectedUser, setSelectedUser] = useState('all');
  const [selectedSeverity, setSelectedSeverity] = useState('all');
  const [dateRange, setDateRange] = useState('today');
  const [selectedVersion, setSelectedVersion] = useState<VersionHistory | null>(null);

  const getActionIcon = (action: string) => {
    switch (action) {
      case 'create':
      case 'created':
        return <FileText className="w-4 h-4 text-emerald-600" />;
      case 'update':
      case 'updated':
        return <Edit className="w-4 h-4 text-blue-600" />;
      case 'delete':
      case 'deleted':
        return <Trash2 className="w-4 h-4 text-red-600" />;
      case 'view':
        return <Eye className="w-4 h-4 text-slate-600" />;
      case 'export':
        return <Download className="w-4 h-4 text-purple-600" />;
      case 'import':
        return <Upload className="w-4 h-4 text-indigo-600" />;
      case 'login':
        return <LogIn className="w-4 h-4 text-emerald-600" />;
      case 'logout':
        return <LogOut className="w-4 h-4 text-slate-600" />;
      case 'backup':
        return <Archive className="w-4 h-4 text-blue-600" />;
      case 'restore':
      case 'restored':
        return <RefreshCw className="w-4 h-4 text-indigo-600" />;
      default:
        return <Info className="w-4 h-4 text-slate-600" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low':
        return 'bg-emerald-100 text-emerald-800';
      case 'medium':
        return 'bg-blue-100 text-blue-800';
      case 'high':
        return 'bg-indigo-100 text-indigo-800';
      case 'critical':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-slate-100 text-slate-800';
    }
  };

  const getDeviceIcon = (deviceType: string) => {
    switch (deviceType) {
      case 'mobile':
        return <Smartphone className="w-4 h-4" />;
      case 'tablet':
        return <Monitor className="w-4 h-4" />;
      case 'desktop':
      default:
        return <Monitor className="w-4 h-4" />;
    }
  };

  const getChangeTypeColor = (type: string) => {
    switch (type) {
      case 'added':
        return 'text-emerald-600 bg-emerald-50';
      case 'modified':
        return 'text-blue-600 bg-blue-50';
      case 'removed':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-slate-600 bg-slate-50';
    }
  };

  const formatDuration = (duration?: number) => {
    if (!duration) return 'N/A';
    if (duration < 1000) return `${duration}ms`;
    if (duration < 60000) return `${(duration / 1000).toFixed(1)}s`;
    return `${(duration / 60000).toFixed(1)}min`;
  };

  const formatFileSize = (size: number) => {
    if (size < 1024) return `${size} B`;
    if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
    return `${(size / (1024 * 1024)).toFixed(1)} MB`;
  };

  const filteredLogs = activityLogs.filter(log => {
    const matchesSearch = searchTerm === '' || 
      log.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.entityName?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesAction = selectedAction === 'all' || log.action === selectedAction;
    const matchesEntity = selectedEntity === 'all' || log.entityType === selectedEntity;
    const matchesUser = selectedUser === 'all' || log.userId === selectedUser;
    const matchesSeverity = selectedSeverity === 'all' || log.severity === selectedSeverity;
    
    return matchesSearch && matchesAction && matchesEntity && matchesUser && matchesSeverity;
  });

  const exportLogs = () => {
    const csvContent = [
      ['Timestamp', 'User', 'Action', 'Entity', 'Description', 'IP Address', 'Success', 'Duration'].join(','),
      ...filteredLogs.map(log => [
        log.timestamp,
        log.userName,
        log.action,
        log.entityType,
        `"${log.description}"`,
        log.ipAddress,
        log.success,
        log.duration || ''
      ].join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `activity-logs-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Journal d'Activité</h2>
          <p className="text-slate-600">Suivi des actions et historique des versions</p>
        </div>
        
        <Button onClick={exportLogs} className="gap-2">
          <Download className="w-4 h-4" />
          Exporter CSV
        </Button>
      </div>

      <Tabs defaultValue="activity" className="space-y-6">
        <TabsList>
          <TabsTrigger value="activity">Journal d'Activité</TabsTrigger>
          <TabsTrigger value="versions">Historique des Versions</TabsTrigger>
          <TabsTrigger value="security">Événements de Sécurité</TabsTrigger>
        </TabsList>

        <TabsContent value="activity" className="space-y-6">
          {/* Filtres */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="w-5 h-5" />
                Filtres
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
                <div>
                  <Label htmlFor="search">Recherche</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input
                      id="search"
                      placeholder="Rechercher..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                
                <div>
                  <Label>Action</Label>
                  <Select value={selectedAction} onValueChange={setSelectedAction}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Toutes</SelectItem>
                      <SelectItem value="create">Création</SelectItem>
                      <SelectItem value="update">Modification</SelectItem>
                      <SelectItem value="delete">Suppression</SelectItem>
                      <SelectItem value="view">Consultation</SelectItem>
                      <SelectItem value="export">Export</SelectItem>
                      <SelectItem value="login">Connexion</SelectItem>
                      <SelectItem value="logout">Déconnexion</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label>Entité</Label>
                  <Select value={selectedEntity} onValueChange={setSelectedEntity}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Toutes</SelectItem>
                      <SelectItem value="transaction">Transaction</SelectItem>
                      <SelectItem value="invoice">Facture</SelectItem>
                      <SelectItem value="customer">Client</SelectItem>
                      <SelectItem value="budget">Budget</SelectItem>
                      <SelectItem value="user">Utilisateur</SelectItem>
                      <SelectItem value="system">Système</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label>Utilisateur</Label>
                  <Select value={selectedUser} onValueChange={setSelectedUser}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tous</SelectItem>
                      <SelectItem value="user-123">Sophie Laurent</SelectItem>
                      <SelectItem value="user-456">Marc Dubois</SelectItem>
                      <SelectItem value="user-789">Julie Martin</SelectItem>
                      <SelectItem value="system">Système</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label>Sévérité</Label>
                  <Select value={selectedSeverity} onValueChange={setSelectedSeverity}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Toutes</SelectItem>
                      <SelectItem value="low">Faible</SelectItem>
                      <SelectItem value="medium">Moyenne</SelectItem>
                      <SelectItem value="high">Élevée</SelectItem>
                      <SelectItem value="critical">Critique</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label>Période</Label>
                  <Select value={dateRange} onValueChange={setDateRange}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="today">Aujourd'hui</SelectItem>
                      <SelectItem value="week">Cette semaine</SelectItem>
                      <SelectItem value="month">Ce mois</SelectItem>
                      <SelectItem value="quarter">Ce trimestre</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Liste des logs */}
          <Card>
            <CardHeader>
              <CardTitle>Activités Récentes ({filteredLogs.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredLogs.map((log) => (
                  <div key={log.id} className="border rounded-lg p-4 hover:bg-slate-50 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3 flex-1">
                        <div className="flex items-center gap-2 mt-1">
                          {getActionIcon(log.action)}
                          {log.success ? (
                            <CheckCircle className="w-4 h-4 text-emerald-600" />
                          ) : (
                            <AlertTriangle className="w-4 h-4 text-red-600" />
                          )}
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-semibold text-slate-900">{log.description}</h4>
                            <Badge className={getSeverityColor(log.severity)}>
                              {log.severity}
                            </Badge>
                          </div>
                          
                          <div className="flex items-center gap-4 text-sm text-slate-600 mb-2">
                            <div className="flex items-center gap-1">
                              <User className="w-3 h-3" />
                              <span>{log.userName} ({log.userRole})</span>
                            </div>
                            
                            <div className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              <span>{new Date(log.timestamp).toLocaleString('fr-FR')}</span>
                            </div>
                            
                            <div className="flex items-center gap-1">
                              {getDeviceIcon(log.deviceType)}
                              <span>{log.location}</span>
                            </div>
                            
                            <div className="flex items-center gap-1">
                              <Globe className="w-3 h-3" />
                              <span>{log.ipAddress}</span>
                            </div>
                            
                            {log.duration && (
                              <div className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                <span>{formatDuration(log.duration)}</span>
                              </div>
                            )}
                          </div>
                          
                          {log.entityName && (
                            <div className="text-sm text-slate-500">
                              <span className="font-medium">{log.entityType}:</span> {log.entityName}
                            </div>
                          )}
                          
                          {log.details && Object.keys(log.details).length > 0 && (
                            <div className="mt-2 p-2 bg-slate-100 rounded text-xs">
                              <pre className="text-slate-600">
                                {JSON.stringify(log.details, null, 2)}
                              </pre>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="versions" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Liste des versions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GitBranch className="w-5 h-5" />
                  Historique des Versions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {versionHistory.map((version) => (
                    <div 
                      key={version.id} 
                      className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                        selectedVersion?.id === version.id ? 'bg-blue-50 border-blue-200' : 'hover:bg-slate-50'
                      }`}
                      onClick={() => setSelectedVersion(version)}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-semibold text-slate-900">{version.entityName}</h4>
                          <p className="text-sm text-slate-600">Version {version.version}</p>
                        </div>
                        <Badge className={getChangeTypeColor(version.action)}>
                          {version.action}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center gap-4 text-xs text-slate-500 mb-2">
                        <span>{version.userName}</span>
                        <span>{new Date(version.timestamp).toLocaleString('fr-FR')}</span>
                        <span>{formatFileSize(version.size)}</span>
                      </div>
                      
                      <p className="text-sm text-slate-600">
                        {version.changes.length} modification{version.changes.length > 1 ? 's' : ''}
                      </p>
                      
                      {version.comment && (
                        <p className="text-sm text-slate-500 mt-1 italic">
                          "{version.comment}"
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Détail de la version sélectionnée */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileCheck className="w-5 h-5" />
                  Détails des Modifications
                </CardTitle>
              </CardHeader>
              <CardContent>
                {selectedVersion ? (
                  <div className="space-y-4">
                    <div className="border-b pb-4">
                      <h3 className="font-semibold text-slate-900 mb-2">
                        {selectedVersion.entityName} - Version {selectedVersion.version}
                      </h3>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-slate-500">Modifié par:</span>
                          <p className="font-medium">{selectedVersion.userName}</p>
                        </div>
                        <div>
                          <span className="text-slate-500">Date:</span>
                          <p className="font-medium">
                            {new Date(selectedVersion.timestamp).toLocaleString('fr-FR')}
                          </p>
                        </div>
                        <div>
                          <span className="text-slate-500">Taille:</span>
                          <p className="font-medium">{formatFileSize(selectedVersion.size)}</p>
                        </div>
                        <div>
                          <span className="text-slate-500">Checksum:</span>
                          <p className="font-mono text-xs">{selectedVersion.checksum.substring(0, 16)}...</p>
                        </div>
                      </div>
                      {selectedVersion.comment && (
                        <div className="mt-3">
                          <span className="text-slate-500">Commentaire:</span>
                          <p className="italic text-slate-700">"{selectedVersion.comment}"</p>
                        </div>
                      )}
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-3">Modifications ({selectedVersion.changes.length})</h4>
                      <div className="space-y-3">
                        {selectedVersion.changes.map((change, index) => (
                          <div key={index} className="border rounded p-3">
                            <div className="flex items-center gap-2 mb-2">
                              <Badge className={getChangeTypeColor(change.type)}>
                                {change.type === 'added' ? 'Ajouté' : 
                                 change.type === 'modified' ? 'Modifié' : 'Supprimé'}
                              </Badge>
                              <span className="font-medium text-slate-900">{change.field}</span>
                            </div>
                            
                            {change.type !== 'added' && (
                              <div className="mb-2">
                                <span className="text-xs text-slate-500">Ancienne valeur:</span>
                                <div className="bg-red-50 border border-red-200 rounded p-2 mt-1">
                                  <code className="text-sm text-red-800">
                                    {JSON.stringify(change.oldValue)}
                                  </code>
                                </div>
                              </div>
                            )}
                            
                            {change.type !== 'removed' && (
                              <div>
                                <span className="text-xs text-slate-500">Nouvelle valeur:</span>
                                <div className="bg-emerald-50 border border-emerald-200 rounded p-2 mt-1">
                                  <code className="text-sm text-emerald-800">
                                    {JSON.stringify(change.newValue)}
                                  </code>
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex gap-2 pt-4 border-t">
                      <Button size="sm" variant="outline">
                        <Download className="w-4 h-4 mr-2" />
                        Télécharger
                      </Button>
                      <Button size="sm" variant="outline">
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Restaurer
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 text-slate-500">
                    <GitBranch className="w-12 h-12 mx-auto mb-4 text-slate-300" />
                    <p>Sélectionnez une version pour voir les détails</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Événements de Sécurité
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activityLogs
                  .filter(log => log.severity === 'high' || log.severity === 'critical' || !log.success)
                  .map((log) => (
                    <div key={log.id} className="border border-red-200 rounded-lg p-4 bg-red-50">
                      <div className="flex items-start gap-3">
                        <AlertTriangle className="w-5 h-5 text-red-600 mt-1" />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-semibold text-red-900">{log.description}</h4>
                            <Badge className={getSeverityColor(log.severity)}>
                              {log.severity}
                            </Badge>
                          </div>
                          
                          <div className="flex items-center gap-4 text-sm text-red-700 mb-2">
                            <span>{log.userName}</span>
                            <span>{new Date(log.timestamp).toLocaleString('fr-FR')}</span>
                            <span>{log.ipAddress}</span>
                            <span>{log.location}</span>
                          </div>
                          
                          {log.details && (
                            <div className="mt-2 p-2 bg-red-100 rounded text-xs">
                              <pre className="text-red-800">
                                {JSON.stringify(log.details, null, 2)}
                              </pre>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                }
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}