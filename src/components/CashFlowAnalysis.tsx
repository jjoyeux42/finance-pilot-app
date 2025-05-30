
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown, AlertTriangle, Target } from 'lucide-react';

const analysisData = [
  {
    title: 'Tendance Générale',
    value: '+18.5%',
    description: 'Croissance positive du flux de trésorerie',
    trend: 'up',
    icon: TrendingUp,
    color: 'text-emerald-600 bg-emerald-100'
  },
  {
    title: 'Prévision 30j',
    value: '89 450€',
    description: 'Solde prévisionnel fin février',
    trend: 'up',
    icon: Target,
    color: 'text-blue-600 bg-blue-100'
  },
  {
    title: 'Risque Liquidité',
    value: 'Faible',
    description: 'Réserves suffisantes pour 3 mois',
    trend: 'stable',
    icon: AlertTriangle,
    color: 'text-green-600 bg-green-100'
  },
  {
    title: 'Pic de Dépenses',
    value: '15 Mars',
    description: 'Salaires + charges trimestrielles',
<<<<<<< HEAD
    trend: 'warning',
    icon: TrendingDown,
    color: 'text-orange-600 bg-orange-100'
=======
    trend: 'info',
    icon: TrendingDown,
    color: 'text-indigo-600 bg-indigo-100'
>>>>>>> 764e393 (feat: Secure Supabase configuration and protect environment variables)
  }
];

export function CashFlowAnalysis() {
  return (
    <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-slate-900">
          📊 Analyse de Flux
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {analysisData.map((item, index) => (
            <div key={index} className="p-4 rounded-lg border border-slate-200 hover:shadow-md transition-all duration-200">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className={`p-1.5 rounded-lg ${item.color}`}>
                      <item.icon className="w-4 h-4" />
                    </div>
                    <h4 className="font-medium text-slate-900">{item.title}</h4>
                  </div>
                  <p className="text-2xl font-bold text-slate-900 mb-1">{item.value}</p>
                  <p className="text-sm text-slate-600">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
