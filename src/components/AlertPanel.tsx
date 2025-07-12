
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
        return 'text-indigo-600 bg-indigo-50 border-white';
    case 'error':
      return 'text-red-500 bg-red-50 border-white';
    case 'success':
      return 'text-emerald-600 bg-emerald-50 border-white';
    case 'warning':
      return 'text-blue-600 bg-blue-50 border-white';
    }
  };

  return (
    <Card className="border-0 shadow-md bg-white/70 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-slate-900 flex items-center space-x-2">
          <AlertTriangle className="w-5 h-5 text-indigo-600" />
          <span>Alertes et Notifications</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className="flex items-start space-x-3 p-4 rounded-xl border hover:bg-white transition-all duration-200 hover:shadow-md backdrop-blur-sm"
          >
            <div className={`p-2.5 rounded-xl border ${getAlertColor(alert.type)}`}>
              {getAlertIcon(alert.type)}
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-medium text-slate-900 mb-1">
                {alert.title}
              </h4>
              <p className="text-sm text-slate-600 mb-2">
                {alert.message}
              </p>
              <span className="text-xs text-slate-500">
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
