
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
    <Card className="w-full border-0 shadow-xl bg-gradient-to-br from-white/95 to-blue-50/30 backdrop-blur-sm rounded-2xl overflow-hidden">
      <CardHeader className="pb-4 sm:pb-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <CardTitle className="text-lg sm:text-xl font-bold flex items-center space-x-3">
          <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
            📈
          </div>
          <span className="truncate">Évolution de Trésorerie</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-3 sm:p-6">
        <div className="chart-container">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={cashFlowData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
              <defs>
                <linearGradient id="colorSolde" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.6}/>
                  <stop offset="50%" stopColor="#6366f1" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0.05}/>
                </linearGradient>
                <linearGradient id="colorPrevision" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.6}/>
                  <stop offset="50%" stopColor="#10b981" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0.05}/>
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                  <feMerge> 
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
              <CartesianGrid strokeDasharray="2 6" stroke="#e2e8f0" strokeOpacity={0.4} />
              <XAxis 
                dataKey="month" 
                stroke="#64748b"
                fontSize={13}
                fontWeight={600}
                axisLine={false}
                tickLine={false}
                dy={10}
                tick={{ fill: '#475569' }}
              />
              <YAxis 
                stroke="#64748b"
                fontSize={13}
                fontWeight={500}
                axisLine={false}
                tickLine={false}
                tickFormatter={(value) => `${value / 1000}k€`}
                dx={-10}
                tick={{ fill: '#475569' }}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.98)',
                  border: '1px solid rgba(255, 255, 255, 0.8)',
                  borderRadius: '16px',
                  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
                  fontSize: '14px',
                  fontWeight: '500'
                }}
                formatter={(value: number, name) => [
                  `${value.toLocaleString()}€`,
                  name === 'solde' ? 'Solde réel' : 'Prévision'
                ]}
              />
              <Area
                type="monotone"
                dataKey="solde"
                stroke="#6366f1"
                strokeWidth={4}
                fill="url(#colorSolde)"
                name="Solde Actuel"
                dot={{ fill: '#6366f1', strokeWidth: 3, r: 6, filter: 'url(#glow)' }}
                activeDot={{ r: 10, stroke: '#6366f1', strokeWidth: 3, fill: 'transparent', filter: 'url(#glow)' }}
                filter="url(#glow)"
              />
              <Area
                type="monotone"
                dataKey="prevision"
                stroke="#10b981"
                strokeWidth={3}
                strokeDasharray="8 6"
                fill="url(#colorPrevision)"
                name="Prévision"
                dot={{ fill: '#10b981', strokeWidth: 2, r: 5 }}
                activeDot={{ r: 8, stroke: '#10b981', strokeWidth: 2, fill: 'transparent' }}
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
