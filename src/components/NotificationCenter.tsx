import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Bell, 
  X, 
  AlertTriangle, 
  CheckCircle, 
  Info, 
  DollarSign,
  Users,
  FileText,
  Calendar,
  TrendingDown,
  Clock
} from 'lucide-react';

interface Notification {
  id: string;
  type: 'warning' | 'success' | 'info' | 'error';
  category: 'payment' | 'budget' | 'invoice' | 'customer' | 'system';
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  actionUrl?: string;
  actionLabel?: string;
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'warning',
    category: 'payment',
    title: 'Facture en retard',
    message: 'La facture INV-2024-003 de Future Systems est en retard de 15 jours',
    timestamp: '2024-01-20T10:30:00Z',
    isRead: false,
    priority: 'high',
    actionUrl: '/invoices',
    actionLabel: 'Voir la facture'
  },
  {
    id: '2',
    type: 'error',
    category: 'budget',
    title: 'Budget dépassé',
    message: 'Le budget Développement a dépassé de 12% ce mois-ci',
    timestamp: '2024-01-20T09:15:00Z',
    isRead: false,
    priority: 'urgent',
    actionUrl: '/budget',
    actionLabel: 'Voir le budget'
  },
  {
    id: '3',
    type: 'success',
    category: 'payment',
    title: 'Paiement reçu',
    message: 'Paiement de 15 000€ reçu de Tech Innovations',
    timestamp: '2024-01-20T08:45:00Z',
    isRead: true,
    priority: 'medium'
  },
  {
    id: '4',
    type: 'info',
    category: 'customer',
    title: 'Nouveau prospect',
    message: 'Un nouveau prospect Smart Business a été ajouté',
    timestamp: '2024-01-19T16:20:00Z',
    isRead: true,
    priority: 'low',
    actionUrl: '/customers',
    actionLabel: 'Voir le prospect'
  },
  {
    id: '5',
    type: 'warning',
    category: 'invoice',
    title: 'Facture à envoyer',
    message: '3 factures en brouillon nécessitent votre attention',
    timestamp: '2024-01-19T14:10:00Z',
    isRead: false,
    priority: 'medium',
    actionUrl: '/invoices',
    actionLabel: 'Voir les factures'
  }
];

interface NotificationCenterProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NotificationCenter({ isOpen, onClose }: NotificationCenterProps) {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const getNotificationIcon = (type: string, category: string) => {
    switch (category) {
      case 'payment':
        return <DollarSign className="w-4 h-4" />;
      case 'budget':
        return <TrendingDown className="w-4 h-4" />;
      case 'invoice':
        return <FileText className="w-4 h-4" />;
      case 'customer':
        return <Users className="w-4 h-4" />;
      default:
        switch (type) {
          case 'warning':
            return <AlertTriangle className="w-4 h-4" />;
          case 'success':
            return <CheckCircle className="w-4 h-4" />;
          case 'error':
            return <AlertTriangle className="w-4 h-4" />;
          default:
            return <Info className="w-4 h-4" />;
        }
    }
  };

  const getNotificationColor = (type: string, priority: string) => {
    if (priority === 'urgent') return 'border-red-500 bg-red-50';
    
    switch (type) {
      case 'warning':
        return 'border-orange-500 bg-orange-50';
      case 'success':
        return 'border-emerald-500 bg-emerald-50';
      case 'error':
        return 'border-red-500 bg-red-50';
      default:
        return 'border-blue-500 bg-blue-50';
    }
  };

  const getIconColor = (type: string, priority: string) => {
    if (priority === 'urgent') return 'text-red-600';
    
    switch (type) {
      case 'warning':
        return 'text-orange-600';
      case 'success':
        return 'text-emerald-600';
      case 'error':
        return 'text-red-600';
      default:
        return 'text-blue-600';
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return <Badge className="bg-red-100 text-red-800">Urgent</Badge>;
      case 'high':
        return <Badge className="bg-orange-100 text-orange-800">Élevée</Badge>;
      case 'medium':
        return <Badge className="bg-blue-100 text-blue-800">Moyenne</Badge>;
      default:
        return <Badge className="bg-slate-100 text-slate-800">Faible</Badge>;
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, isRead: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, isRead: true }))
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const filteredNotifications = notifications.filter(notification => 
    filter === 'all' || !notification.isRead
  );

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
      return `Il y a ${diffInMinutes} min`;
    } else if (diffInHours < 24) {
      return `Il y a ${diffInHours}h`;
    } else {
      return date.toLocaleDateString('fr-FR', { 
        day: 'numeric', 
        month: 'short',
        hour: '2-digit',
        minute: '2-digit'
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm" onClick={onClose}>
      <div 
        className="fixed right-4 top-4 w-96 max-h-[80vh] bg-white rounded-lg shadow-xl border"
        onClick={(e) => e.stopPropagation()}
      >
        <Card className="border-0 shadow-none">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Notifications
                {unreadCount > 0 && (
                  <Badge className="bg-red-100 text-red-800">
                    {unreadCount}
                  </Badge>
                )}
              </CardTitle>
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="flex items-center justify-between pt-2">
              <div className="flex gap-2">
                <Button
                  variant={filter === 'all' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilter('all')}
                >
                  Toutes
                </Button>
                <Button
                  variant={filter === 'unread' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilter('unread')}
                >
                  Non lues
                </Button>
              </div>
              
              {unreadCount > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={markAllAsRead}
                  className="text-blue-600 hover:text-blue-700"
                >
                  Tout marquer lu
                </Button>
              )}
            </div>
          </CardHeader>
          
          <CardContent className="p-0">
            <ScrollArea className="h-96">
              <div className="space-y-2 p-4">
                {filteredNotifications.length === 0 ? (
                  <div className="text-center py-8 text-slate-500">
                    <Bell className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Aucune notification</p>
                  </div>
                ) : (
                  filteredNotifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-3 rounded-lg border transition-all hover:shadow-sm cursor-pointer ${
                        notification.isRead 
                          ? 'bg-white border-slate-200' 
                          : getNotificationColor(notification.type, notification.priority)
                      }`}
                      onClick={() => !notification.isRead && markAsRead(notification.id)}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`mt-0.5 ${getIconColor(notification.type, notification.priority)}`}>
                          {getNotificationIcon(notification.type, notification.category)}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h4 className={`text-sm font-medium ${
                                  notification.isRead ? 'text-slate-700' : 'text-slate-900'
                                }`}>
                                  {notification.title}
                                </h4>
                                {!notification.isRead && (
                                  <div className="w-2 h-2 bg-blue-600 rounded-full" />
                                )}
                              </div>
                              
                              <p className={`text-sm ${
                                notification.isRead ? 'text-slate-500' : 'text-slate-700'
                              }`}>
                                {notification.message}
                              </p>
                              
                              <div className="flex items-center justify-between mt-2">
                                <div className="flex items-center gap-2">
                                  {getPriorityBadge(notification.priority)}
                                  <span className="text-xs text-slate-500 flex items-center gap-1">
                                    <Clock className="w-3 h-3" />
                                    {formatTimestamp(notification.timestamp)}
                                  </span>
                                </div>
                              </div>
                              
                              {notification.actionUrl && (
                                <Button 
                                  variant="link" 
                                  size="sm" 
                                  className="p-0 h-auto mt-2 text-blue-600 hover:text-blue-700"
                                >
                                  {notification.actionLabel}
                                </Button>
                              )}
                            </div>
                            
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                deleteNotification(notification.id);
                              }}
                              className="opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <X className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Hook pour gérer les notifications
export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [isOpen, setIsOpen] = useState(false);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const addNotification = (notification: Omit<Notification, 'id' | 'timestamp' | 'isRead'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      isRead: false
    };
    
    setNotifications(prev => [newNotification, ...prev]);
    
    // Notification push si supportée
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(notification.title, {
        body: notification.message,
        icon: '/favicon.ico'
      });
    }
  };

  const requestNotificationPermission = async () => {
    if ('Notification' in window && Notification.permission === 'default') {
      await Notification.requestPermission();
    }
  };

  useEffect(() => {
    requestNotificationPermission();
  }, []);

  return {
    notifications,
    unreadCount,
    isOpen,
    setIsOpen,
    addNotification
  };
}