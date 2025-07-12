import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  History, 
  User, 
  FileText, 
  Edit, 
  Trash2, 
  Plus, 
  Eye, 
  Download, 
  Filter, 
  Search, 
  Calendar, 
  Clock, 
  AlertTriangle, 
  CheckCircle, 
  Info,
  Settings,
  Database,
  Shield
} from 'lucide-react';

interface AuditEntry {
  id: string;
  timestamp: string;
  userId: string;
  userName: string;
  userRole: string;
  action: 'create' | 'update' | 'delete' | 'view' | 'export' | 'login' | 'logout';
  entityType: 'transaction' | 'invoice' | 'customer' | 'budget' | 'user' | 'system';
  entityId?: string;
  entityName?: string;
  changes?: {
    field: string;
    oldValue: any;
    newValue: any;
  }[];
  ipAddress: string;
  userAgent: string;
  sessionId: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  metadata?: Record<string, any>;
}

const mockAuditEntries: AuditEntry[] = [
  {
    id: '1',
    timestamp: '2024-01-20T14:30:00Z',
    userId: 'user-123',
    userName: 'Marie Dubois',
    userRole: 'Comptable',
    action: 'update',
    entityType: 'invoice',
    entityId: 'inv-2024-045',
    entityName: 'Facture TechCorp',
    changes: [
      { field: 'amount', oldValue: 15000, newValue: 16500 },
      { field: 'dueDate', oldValue: '2024-02-15', newValue: '2024-02-20' }
    ],
    ipAddress: '192.168.1.100',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
    sessionId: 'sess-abc123',
    severity: 'medium',
    description: 'Modification du montant et de la date d\'échéance de la facture'
  },
  {
    id: '2',
    timestamp: '2024-01-20T14:15:00Z',
    userId: 'user-456',
    userName: 'Thomas Petit',
    userRole: 'Commercial',
    action: 'create',
    entityType: 'customer',
    entityId: 'cust-789',
    entityName: 'Smart Solutions SARL',
    ipAddress: '192.168.1.101',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
    sessionId: 'sess-def456',
    severity: 'low',
    description: 'Création d\'un nouveau client'
  },
  {
    id: '3',
    timestamp: '2024-01-20T13:45:00Z',
    userId: 'user-789',
    userName: 'User Example',
    userRole: 'Manager',
    action: 'delete',
    entityType: 'transaction',
    entityId: 'trans-456',
    entityName: 'Transaction test',
    ipAddress: '192.168.1.102',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
    sessionId: 'sess-ghi789',
    severity: 'high',
    description: 'Suppression d\'une transaction de test'
  },
  {
    id: '4',
    timestamp: '2024-01-20T13:30:00Z',
    userId: 'user-123',
    userName: 'Marie Dubois',
    userRole: 'Comptable',
    action: 'export',
    entityType: 'invoice',
    ipAddress: '192.168.1.100',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
    sessionId: 'sess-abc123',
    severity: 'medium',
    description: 'Export des factures du mois de janvier',
    metadata: { format: 'PDF', count: 45 }
  },
  {
    id: '5',
    timestamp: '2024-01-20T12:00:00Z',
    userId: 'user-999',
    userName: 'Admin System',
    userRole: 'Administrateur',
    action: 'update',
    entityType: 'system',
    ipAddress: '127.0.0.1',
    userAgent: 'System/1.0',
    sessionId: 'sess-system',
    severity: 'critical',
    description: 'Mise à jour des paramètres de sécurité',
    metadata: { component: 'authentication', version: '2.1.0' }
  }
];

interface AuditTrailProps {
  entityType?: string;
  entityId?: string;
  showFilters?: boolean;
  maxHeight?: string;
}

export function AuditTrail({ 
  entityType, 
  entityId, 
  showFilters = true, 
  maxHeight = '600px' 
}: AuditTrailProps) {
  const [entries, setEntries] = useState<AuditEntry[]>(mockAuditEntries);
  const [filteredEntries, setFilteredEntries] = useState<AuditEntry[]>(mockAuditEntries);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAction, setSelectedAction] = useState('all');
  const [selectedEntityType, setSelectedEntityType] = useState(entityType || 'all');
  const [selectedUser, setSelectedUser] = useState('all');
  const [selectedSeverity, setSelectedSeverity] = useState('all');
  const [dateRange, setDateRange] = useState('7d');

  useEffect(() => {
    let filtered = entries;

    // Filtrer par entité spécifique si fournie
    if (entityType && entityId) {
      filtered = filtered.filter(entry => 
        entry.entityType === entityType && entry.entityId === entityId
      );
    }

    // Filtrer par terme de recherche
    if (searchTerm) {
      filtered = filtered.filter(entry => 
        entry.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.entityName?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtrer par action
    if (selectedAction !== 'all') {
      filtered = filtered.filter(entry => entry.action === selectedAction);
    }

    // Filtrer par type d'entité
    if (selectedEntityType !== 'all') {
      filtered = filtered.filter(entry => entry.entityType === selectedEntityType);
    }

    // Filtrer par utilisateur
    if (selectedUser !== 'all') {
      filtered = filtered.filter(entry => entry.userId === selectedUser);
    }

    // Filtrer par sévérité
    if (selectedSeverity !== 'all') {
      filtered = filtered.filter(entry => entry.severity === selectedSeverity);
    }

    // Filtrer par date
    const now = new Date();
    const cutoffDate = new Date();
    switch (dateRange) {
      case '1d':
        cutoffDate.setDate(now.getDate() - 1);
        break;
      case '7d':
        cutoffDate.setDate(now.getDate() - 7);
        break;
      case '30d':
        cutoffDate.setDate(now.getDate() - 30);
        break;
      case '90d':
        cutoffDate.setDate(now.getDate() - 90);
        break;
    }
    
    if (dateRange !== 'all') {
      filtered = filtered.filter(entry => 
        new Date(entry.timestamp) >= cutoffDate
      );
    }

    setFilteredEntries(filtered.sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    ));
  }, [entries, searchTerm, selectedAction, selectedEntityType, selectedUser, selectedSeverity, dateRange, entityType, entityId]);

  const getActionIcon = (action: string) => {
    switch (action) {
      case 'create':
        return <Plus className="w-4 h-4 text-emerald-600" />;
      case 'update':
        return <Edit className="w-4 h-4 text-blue-600" />;
      case 'delete':
        return <Trash2 className="w-4 h-4 text-red-600" />;
      case 'view':
        return <Eye className="w-4 h-4 text-slate-600" />;
      case 'export':
        return <Download className="w-4 h-4 text-purple-600" />;
      case 'login':
        return <User className="w-4 h-4 text-green-600" />;
      case 'logout':
        return <User className="w-4 h-4 text-indigo-600" />;
      default:
        return <Info className="w-4 h-4 text-slate-600" />;
    }
  };

  const getActionLabel = (action: string) => {
    switch (action) {
      case 'create':
        return 'Création';
      case 'update':
        return 'Modification';
      case 'delete':
        return 'Suppression';
      case 'view':
        return 'Consultation';
      case 'export':
        return 'Export';
      case 'login':
        return 'Connexion';
      case 'logout':
        return 'Déconnexion';
      default:
        return action;
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
        return 'bg-white text-slate-800';
    }
  };

  const getSeverityLabel = (severity: string) => {
    switch (severity) {
      case 'low':
        return 'Faible';
      case 'medium':
        return 'Moyen';
      case 'high':
        return 'Élevé';
      case 'critical':
        return 'Critique';
      default:
        return severity;
    }
  };

  const getEntityTypeIcon = (entityType: string) => {
    switch (entityType) {
      case 'transaction':
        return <FileText className="w-4 h-4" />;
      case 'invoice':
        return <FileText className="w-4 h-4" />;
      case 'customer':
        return <User className="w-4 h-4" />;
      case 'budget':
        return <Database className="w-4 h-4" />;
      case 'user':
        return <User className="w-4 h-4" />;
      case 'system':
        return <Settings className="w-4 h-4" />;
      default:
        return <Info className="w-4 h-4" />;
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return {
      date: date.toLocaleDateString('fr-FR'),
      time: date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
    };
  };

  const exportAuditLog = () => {
    const csvContent = [
      ['Date', 'Heure', 'Utilisateur', 'Action', 'Entité', 'Description', 'Sévérité'].join(','),
      ...filteredEntries.map(entry => {
        const { date, time } = formatTimestamp(entry.timestamp);
        return [
          date,
          time,
          entry.userName,
          getActionLabel(entry.action),
          entry.entityType,
          `"${entry.description}"`,
          getSeverityLabel(entry.severity)
        ].join(',');
      })
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `audit-trail-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const uniqueUsers = Array.from(new Set(entries.map(e => e.userId)))
    .map(userId => entries.find(e => e.userId === userId)!)
    .map(e => ({ id: e.userId, name: e.userName }));

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <History className="w-5 h-5" />
            Journal d'Audit
            <Badge variant="outline">{filteredEntries.length} entrées</Badge>
          </CardTitle>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={exportAuditLog}>
              <Download className="w-4 h-4 mr-2" />
              Exporter
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        {showFilters && (
          <div className="space-y-4 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <Input
                  placeholder="Rechercher..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={selectedAction} onValueChange={setSelectedAction}>
                <SelectTrigger>
                  <SelectValue placeholder="Action" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes les actions</SelectItem>
                  <SelectItem value="create">Création</SelectItem>
                  <SelectItem value="update">Modification</SelectItem>
                  <SelectItem value="delete">Suppression</SelectItem>
                  <SelectItem value="view">Consultation</SelectItem>
                  <SelectItem value="export">Export</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={selectedEntityType} onValueChange={setSelectedEntityType}>
                <SelectTrigger>
                  <SelectValue placeholder="Type d'entité" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les types</SelectItem>
                  <SelectItem value="transaction">Transactions</SelectItem>
                  <SelectItem value="invoice">Factures</SelectItem>
                  <SelectItem value="customer">Clients</SelectItem>
                  <SelectItem value="budget">Budgets</SelectItem>
                  <SelectItem value="user">Utilisateurs</SelectItem>
                  <SelectItem value="system">Système</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger>
                  <SelectValue placeholder="Période" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1d">Dernières 24h</SelectItem>
                  <SelectItem value="7d">7 derniers jours</SelectItem>
                  <SelectItem value="30d">30 derniers jours</SelectItem>
                  <SelectItem value="90d">90 derniers jours</SelectItem>
                  <SelectItem value="all">Toute la période</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select value={selectedUser} onValueChange={setSelectedUser}>
                <SelectTrigger>
                  <SelectValue placeholder="Utilisateur" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les utilisateurs</SelectItem>
                  {uniqueUsers.map(user => (
                    <SelectItem key={user.id} value={user.id}>{user.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={selectedSeverity} onValueChange={setSelectedSeverity}>
                <SelectTrigger>
                  <SelectValue placeholder="Sévérité" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes les sévérités</SelectItem>
                  <SelectItem value="low">Faible</SelectItem>
                  <SelectItem value="medium">Moyen</SelectItem>
                  <SelectItem value="high">Élevé</SelectItem>
                  <SelectItem value="critical">Critique</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}
        
        <ScrollArea style={{ height: maxHeight }}>
          <div className="space-y-3">
            {filteredEntries.length === 0 ? (
              <div className="text-center py-8 text-slate-500">
                <History className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Aucune entrée d'audit trouvée</p>
              </div>
            ) : (
              filteredEntries.map((entry) => {
                const { date, time } = formatTimestamp(entry.timestamp);
                
                return (
                  <div key={entry.id} className="border rounded-lg p-4 hover:bg-white transition-colors">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        {getActionIcon(entry.action)}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge className={getSeverityColor(entry.severity)} size="sm">
                            {getSeverityLabel(entry.severity)}
                          </Badge>
                          <Badge variant="outline" size="sm">
                            {getActionLabel(entry.action)}
                          </Badge>
                          {entry.entityType && (
                            <Badge variant="outline" size="sm" className="flex items-center gap-1">
                              {getEntityTypeIcon(entry.entityType)}
                              {entry.entityType}
                            </Badge>
                          )}
                        </div>
                        
                        <div className="space-y-1">
                          <p className="font-medium text-sm">{entry.description}</p>
                          
                          {entry.entityName && (
                            <p className="text-sm text-slate-600">
                              Entité: {entry.entityName}
                            </p>
                          )}
                          
                          {entry.changes && entry.changes.length > 0 && (
                            <div className="mt-2">
                              <p className="text-xs font-medium text-slate-700 mb-1">Modifications:</p>
                              <div className="space-y-1">
                                {entry.changes.map((change, idx) => (
                                  <div key={idx} className="text-xs bg-white rounded p-2">
                                    <span className="font-medium">{change.field}:</span>
                                    <span className="text-red-600 line-through ml-2">{String(change.oldValue)}</span>
                                    <span className="text-emerald-600 ml-2">{String(change.newValue)}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                          
                          <div className="flex items-center gap-4 text-xs text-slate-500 mt-2">
                            <span className="flex items-center gap-1">
                              <User className="w-3 h-3" />
                              {entry.userName} ({entry.userRole})
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {date}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {time}
                            </span>
                            <span>IP: {entry.ipAddress}</span>
                          </div>
                          
                          {entry.metadata && Object.keys(entry.metadata).length > 0 && (
                            <div className="mt-2">
                              <p className="text-xs font-medium text-slate-700 mb-1">Métadonnées:</p>
                              <div className="text-xs bg-white rounded p-2">
                                {Object.entries(entry.metadata).map(([key, value]) => (
                                  <div key={key}>
                                    <span className="font-medium">{key}:</span> {String(value)}
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}

// Hook pour enregistrer les actions d'audit
export function useAuditLogger() {
  const logAction = (action: Omit<AuditEntry, 'id' | 'timestamp' | 'sessionId' | 'ipAddress' | 'userAgent'>) => {
    // Dans une vraie application, ceci ferait un appel API
    const auditEntry: AuditEntry = {
      ...action,
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      sessionId: 'current-session',
      ipAddress: '192.168.1.100', // À récupérer dynamiquement
      userAgent: navigator.userAgent
    };
    
    console.log('Audit Log:', auditEntry);
    
    // Ici on enverrait l'entrée à l'API
    // await api.audit.create(auditEntry);
  };
  
  return { logAction };
}