
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const cashFlowData = [
  { month: 'Jan', entrees: 45000, sorties: 32000, solde: 13000, prevision: 15000 },
  { month: 'Fév', entrees: 52000, sorties: 38000, solde: 14000, prevision: 16000 },
  { month: 'Mar', entrees: 48000, sorties: 35000, solde: 13000, prevision: 14500 },
  { month: 'Avr', entrees: 61000, sorties: 42000, solde: 19000, prevision: 18000 },
  { month: 'Mai', entrees: 58000, sorties: 40000, solde: 18000, prevision: 19500 },
  { month: 'Jun', entrees: 67000, sorties: 45000, solde: 22000, prevision: 21000 },
];

export function CashFlowChart() {
  return (
    <Card className="col-span-2 border-0 shadow-lg bg-white/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-slate-900 flex items-center">
          📈 Évolution de Trésorerie
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={cashFlowData}>
              <defs>
                <linearGradient id="colorSolde" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorPrevision" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis 
                dataKey="month" 
                stroke="#64748b"
                fontSize={12}
                fontWeight={500}
              />
              <YAxis 
                stroke="#64748b"
                fontSize={12}
                tickFormatter={(value) => `${value / 1000}k€`}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  border: 'none',
                  borderRadius: '12px',
                  boxShadow: '0 10px 25px -5px rgb(0 0 0 / 0.25)',
                  backdropFilter: 'blur(16px)'
                }}
                formatter={(value: number, name) => [
                  `${value.toLocaleString()}€`,
                  name === 'solde' ? 'Solde réel' : 'Prévision'
                ]}
              />
              <Area
                type="monotone"
                dataKey="solde"
                stroke="#3b82f6"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorSolde)"
              />
              <Area
                type="monotone"
                dataKey="prevision"
                stroke="#10b981"
                strokeWidth={2}
                strokeDasharray="8 8"
                fillOpacity={1}
                fill="url(#colorPrevision)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="flex items-center justify-center space-x-6 mt-6">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-blue-500 rounded-full shadow-sm"></div>
            <span className="text-sm font-medium text-slate-600">Solde réel</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-emerald-500 rounded-full shadow-sm"></div>
            <span className="text-sm font-medium text-slate-600">Prévision</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
