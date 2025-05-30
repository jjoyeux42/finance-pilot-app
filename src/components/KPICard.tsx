
import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface KPICardProps {
  title: string;
  value: string;
  change?: number;
  changeLabel?: string;
  icon?: React.ReactNode;
  trend?: 'up' | 'down' | 'neutral';
  color?: 'default' | 'success' | 'warning' | 'danger';
}

export function KPICard({ 
  title, 
  value, 
  change, 
  changeLabel, 
  icon, 
  trend,
  color = 'default' 
}: KPICardProps) {
  const getTrendIcon = () => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-4 h-4 text-emerald-600" />;
      case 'down':
        return <TrendingDown className="w-4 h-4 text-red-500" />;
      default:
        return <Minus className="w-4 h-4 text-slate-400" />;
    }
  };

  const getTrendColor = () => {
    switch (trend) {
      case 'up':
        return 'text-emerald-600';
      case 'down':
        return 'text-red-500';
      default:
        return 'text-slate-500';
    }
  };

  const getColorClasses = () => {
    switch (color) {
      case 'success':
        return 'border-l-4 border-emerald-500 bg-gradient-to-br from-white/90 to-emerald-50/30 backdrop-blur-sm shadow-lg';
      case 'warning':
        return 'border-l-4 border-indigo-500 bg-gradient-to-br from-white/90 to-indigo-50/30 backdrop-blur-sm shadow-lg';
      case 'danger':
        return 'border-l-4 border-red-500 bg-gradient-to-br from-white/90 to-red-50/30 backdrop-blur-sm shadow-lg';
      default:
        return 'border-l-4 border-blue-500 bg-gradient-to-br from-white/90 to-blue-50/30 backdrop-blur-sm shadow-lg';
    }
  };

  return (
    <Card className={`transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border-0 rounded-2xl ${getColorClasses()}`}>
      <CardContent className="p-7">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-3">
              {icon && <div className="text-blue-600 p-2 bg-blue-50 rounded-lg">{icon}</div>}
              <h3 className="text-sm font-semibold text-slate-700 tracking-wide">{title}</h3>
            </div>
            <p className="text-3xl font-bold text-slate-900 mb-3 tracking-tight">{value}</p>
            {change !== undefined && (
              <div className="flex items-center space-x-1">
                {getTrendIcon()}
                <span className={`text-sm font-medium ${getTrendColor()}`}>
                  {change > 0 ? '+' : ''}{change}%
                </span>
                {changeLabel && (
                  <span className="text-sm text-slate-500">{changeLabel}</span>
                )}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
