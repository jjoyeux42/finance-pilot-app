
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
      <Card className="border-0 shadow-xl bg-gradient-to-br from-white/95 to-slate-50/50 backdrop-blur-sm rounded-2xl">
        <CardHeader className="pb-6">
          <CardTitle className="text-xl font-bold text-slate-900 flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-xl">
              ⚡
            </div>
            <span>Actions Rapides</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            {quickActions.map((action, index) => (
              <Button
                key={index}
                variant="outline"
                className="h-auto p-6 flex flex-col items-center space-y-3 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border-0 bg-gradient-to-br from-white to-slate-50/80 rounded-2xl group"
                onClick={() => handleActionClick(action.action)}
              >
                <div className={`p-4 rounded-2xl ${action.color} text-white transition-all duration-300 group-hover:scale-110 shadow-lg`}>
                  <action.icon className="w-6 h-6" />
                </div>
                <div className="text-center">
                  <p className="text-sm font-semibold text-slate-900 group-hover:text-blue-700 transition-colors">{action.title}</p>
                  <p className="text-xs text-slate-600 mt-1">{action.description}</p>
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
