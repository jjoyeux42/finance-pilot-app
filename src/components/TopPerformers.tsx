
import React from 'react';
import { TrendingUp, Users, Star } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const topClients = [
  { name: 'Entreprise Alpha', revenue: 45000, growth: 12, margin: 28 },
  { name: 'Société Beta', revenue: 38000, growth: 8, margin: 35 },
  { name: 'Groupe Gamma', revenue: 32000, growth: -3, margin: 22 },
  { name: 'Corp Delta', revenue: 28000, growth: 15, margin: 31 },
];

const topProducts = [
  { name: 'Service Premium', revenue: 85000, margin: 42 },
  { name: 'Pack Standard', revenue: 67000, margin: 38 },
  { name: 'Formation Pro', revenue: 45000, margin: 65 },
  { name: 'Support Technique', revenue: 23000, margin: 28 },
];

export function TopPerformers() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
            <Users className="w-5 h-5 text-finance-600" />
            <span>Top Clients</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topClients.map((client, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-finance-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-finance-700">
                      {index + 1}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{client.name}</p>
                    <p className="text-xs text-gray-500">Marge: {client.margin}%</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-900">
                    {client.revenue.toLocaleString()}€
                  </p>
                  <div className="flex items-center space-x-1">
                    <TrendingUp className={`w-3 h-3 ${client.growth >= 0 ? 'text-success-600' : 'text-danger-600'}`} />
                    <span className={`text-xs ${client.growth >= 0 ? 'text-success-600' : 'text-danger-600'}`}>
                      {client.growth >= 0 ? '+' : ''}{client.growth}%
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
            <Star className="w-5 h-5 text-finance-600" />
            <span>Top Produits</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topProducts.map((product, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-finance-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-finance-700">
                      {index + 1}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{product.name}</p>
                    <p className="text-xs text-gray-500">Marge: {product.margin}%</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-900">
                    {product.revenue.toLocaleString()}€
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
