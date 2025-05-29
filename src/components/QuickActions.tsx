
import React, { useState } from 'react';
import { Plus, FileText, Send, BarChart3 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TransactionModal } from '@/components/modals/TransactionModal';
import { ReportModal } from '@/components/modals/ReportModal';
import { InvoiceModal } from '@/components/modals/InvoiceModal';

const quickActions = [
  {
    icon: Plus,
    title: 'Nouvelle transaction',
    description: 'Ajouter une entrée/sortie',
    color: 'bg-blue-500 hover:bg-blue-600',
    action: 'transaction'
  },
  {
    icon: FileText,
    title: 'Générer rapport',
    description: 'Export mensuel',
    color: 'bg-emerald-500 hover:bg-emerald-600',
    action: 'report'
  },
  {
    icon: Send,
    title: 'Envoyer facture',
    description: 'Nouvelle facturation',
    color: 'bg-purple-500 hover:bg-purple-600',
    action: 'invoice'
  },
  {
    icon: BarChart3,
    title: 'Analyse poussée',
    description: 'Dashboard avancé',
    color: 'bg-indigo-500 hover:bg-indigo-600',
    action: 'analytics'
  },
];

export function QuickActions() {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const handleActionClick = (action: string) => {
    switch (action) {
      case 'transaction':
        setActiveModal('transaction');
        break;
      case 'report':
        setActiveModal('report');
        break;
      case 'invoice':
        setActiveModal('invoice');
        break;
      case 'analytics':
        window.location.href = '/analytics';
        break;
      default:
        console.log('Action non reconnue:', action);
    }
  };

  return (
    <>
      <Card className="border-0 shadow-md bg-white/70 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-slate-900">
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
                onClick={() => handleActionClick(action.action)}
              >
                <div className={`p-3 rounded-full ${action.color} text-white transition-colors`}>
                  <action.icon className="w-5 h-5" />
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium text-slate-900">{action.title}</p>
                  <p className="text-xs text-slate-500 mt-1">{action.description}</p>
                </div>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      <TransactionModal
        isOpen={activeModal === 'transaction'}
        onClose={() => setActiveModal(null)}
      />
      
      <ReportModal
        isOpen={activeModal === 'report'}
        onClose={() => setActiveModal(null)}
      />

      <InvoiceModal
        isOpen={activeModal === 'invoice'}
        onClose={() => setActiveModal(null)}
      />
    </>
  );
}
