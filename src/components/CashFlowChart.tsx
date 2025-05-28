
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
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900">
          Évolution de Trésorerie
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={cashFlowData}>
              <defs>
                <linearGradient id="colorSolde" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#525cff" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#525cff" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorPrevision" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis 
                dataKey="month" 
                stroke="#64748b"
                fontSize={12}
              />
              <YAxis 
                stroke="#64748b"
                fontSize={12}
                tickFormatter={(value) => `${value / 1000}k€`}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                }}
                formatter={(value: number, name) => [
                  `${value.toLocaleString()}€`,
                  name === 'solde' ? 'Solde réel' : 'Prévision'
                ]}
              />
              <Area
                type="monotone"
                dataKey="solde"
                stroke="#525cff"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorSolde)"
              />
              <Area
                type="monotone"
                dataKey="prevision"
                stroke="#22c55e"
                strokeWidth={2}
                strokeDasharray="8 8"
                fillOpacity={1}
                fill="url(#colorPrevision)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="flex items-center justify-center space-x-6 mt-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-finance-500 rounded-full"></div>
            <span className="text-sm text-gray-600">Solde réel</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-success-500 rounded-full opacity-60"></div>
            <span className="text-sm text-gray-600">Prévision</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
