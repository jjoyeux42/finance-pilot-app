
import React from 'react';
import { AlertTriangle, CheckCircle, Info, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface Alert {
  id: string;
  type: 'warning' | 'success' | 'info' | 'danger';
  title: string;
  message: string;
  timestamp: string;
}

const alerts: Alert[] = [
  {
    id: '1',
    type: 'warning',
    title: 'Trésorerie faible',
    message: 'Le solde de trésorerie sera négatif dans 15 jours si tendance actuelle',
    timestamp: 'Il y a 2h'
  },
  {
    id: '2',
    type: 'info',
    title: 'Nouvelle facture',
    message: 'Facture client Entreprise ABC - 15 000€ en attente de validation',
    timestamp: 'Il y a 4h'
  },
  {
    id: '3',
    type: 'success',
    title: 'Objectif atteint',
    message: 'Objectif de CA mensuel dépassé de 12%',
    timestamp: 'Hier'
  }
];

export function AlertPanel() {
  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'warning':
      case 'danger':
        return <AlertTriangle className="w-5 h-5" />;
      case 'success':
        return <CheckCircle className="w-5 h-5" />;
      default:
        return <Info className="w-5 h-5" />;
    }
  };

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'warning':
        return 'text-warning-600 bg-warning-100';
      case 'danger':
        return 'text-danger-600 bg-danger-100';
      case 'success':
        return 'text-success-600 bg-success-100';
      default:
        return 'text-blue-600 bg-blue-100';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
          <AlertTriangle className="w-5 h-5 text-warning-600" />
          <span>Alertes et Notifications</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className="flex items-start space-x-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
          >
            <div className={`p-2 rounded-full ${getAlertColor(alert.type)}`}>
              {getAlertIcon(alert.type)}
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-medium text-gray-900 mb-1">
                {alert.title}
              </h4>
              <p className="text-sm text-gray-600 mb-2">
                {alert.message}
              </p>
              <span className="text-xs text-gray-500">
                {alert.timestamp}
              </span>
            </div>
            <Button variant="ghost" size="sm" className="p-1 h-auto">
              <X className="w-4 h-4" />
            </Button>
          </div>
        ))}
        
        <Button variant="outline" className="w-full mt-4">
          Voir toutes les alertes
        </Button>
      </CardContent>
    </Card>
  );
}
