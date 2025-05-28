
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
        return <TrendingUp className="w-4 h-4 text-success-600" />;
      case 'down':
        return <TrendingDown className="w-4 h-4 text-danger-600" />;
      default:
        return <Minus className="w-4 h-4 text-gray-400" />;
    }
  };

  const getTrendColor = () => {
    switch (trend) {
      case 'up':
        return 'text-success-600';
      case 'down':
        return 'text-danger-600';
      default:
        return 'text-gray-500';
    }
  };

  const getColorClasses = () => {
    switch (color) {
      case 'success':
        return 'border-l-4 border-success-500 bg-success-50/50';
      case 'warning':
        return 'border-l-4 border-warning-500 bg-warning-50/50';
      case 'danger':
        return 'border-l-4 border-danger-500 bg-danger-50/50';
      default:
        return 'border-l-4 border-finance-500 bg-finance-50/50';
    }
  };

  return (
    <Card className={`transition-all duration-200 hover:shadow-lg hover:-translate-y-1 ${getColorClasses()}`}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              {icon && <div className="text-finance-600">{icon}</div>}
              <h3 className="text-sm font-medium text-gray-600">{title}</h3>
            </div>
            <p className="text-2xl font-bold text-gray-900 mb-2">{value}</p>
            {change !== undefined && (
              <div className="flex items-center space-x-1">
                {getTrendIcon()}
                <span className={`text-sm font-medium ${getTrendColor()}`}>
                  {change > 0 ? '+' : ''}{change}%
                </span>
                {changeLabel && (
                  <span className="text-sm text-gray-500">{changeLabel}</span>
                )}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
