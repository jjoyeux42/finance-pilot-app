
import React from 'react';
import { Plus, FileText, Send, Download, BarChart3, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const quickActions = [
  {
    icon: Plus,
    title: 'Nouvelle transaction',
    description: 'Ajouter une entrée/sortie',
    color: 'bg-finance-500 hover:bg-finance-600',
  },
  {
    icon: FileText,
    title: 'Générer rapport',
    description: 'Export mensuel',
    color: 'bg-success-500 hover:bg-success-600',
  },
  {
    icon: Send,
    title: 'Envoyer facture',
    description: 'Nouvelle facturation',
    color: 'bg-warning-500 hover:bg-warning-600',
  },
  {
    icon: BarChart3,
    title: 'Analyse poussée',
    description: 'Dashboard avancé',
    color: 'bg-purple-500 hover:bg-purple-600',
  },
];

export function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900">
          Actions Rapides
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          {quickActions.map((action, index) => (
            <Button
              key={index}
              variant="outline"
              className="h-auto p-4 flex flex-col items-center space-y-2 hover:shadow-md transition-all duration-200"
            >
              <div className={`p-3 rounded-full ${action.color} text-white transition-colors`}>
                <action.icon className="w-5 h-5" />
              </div>
              <div className="text-center">
                <p className="text-sm font-medium text-gray-900">{action.title}</p>
                <p className="text-xs text-gray-500 mt-1">{action.description}</p>
              </div>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
