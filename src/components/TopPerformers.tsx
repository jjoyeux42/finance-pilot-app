
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, Users, Package } from 'lucide-react';

const TopPerformers = () => {
  const topClients = [
    { name: 'Entreprise Alpha', revenue: '€45,200', growth: '+12%' },
    { name: 'Beta Corporation', revenue: '€38,900', growth: '+8%' },
    { name: 'Gamma Solutions', revenue: '€32,100', growth: '+15%' },
  ];

  const topProducts = [
    { name: 'Service Premium', revenue: '€28,500', growth: '+18%' },
    { name: 'Consultation Expert', revenue: '€21,300', growth: '+7%' },
    { name: 'Formation Pro', revenue: '€19,800', growth: '+22%' },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Top Clients */}
      <Card className="bg-white border-gray-200 shadow-lg">
        <CardHeader className="bg-white pb-3">
          <CardTitle className="flex items-center space-x-2 text-gray-900">
            <Users className="w-5 h-5 text-blue-600" />
            <span>Top Clients</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="bg-white space-y-4">
          {topClients.map((client, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">{client.name}</p>
                <p className="text-sm text-gray-600">{client.revenue}</p>
              </div>
              <div className="flex items-center space-x-1 text-green-600">
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm font-medium">{client.growth}</span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Top Produits */}
      <Card className="bg-white border-gray-200 shadow-lg">
        <CardHeader className="bg-white pb-3">
          <CardTitle className="flex items-center space-x-2 text-gray-900">
            <Package className="w-5 h-5 text-blue-600" />
            <span>Top Produits</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="bg-white space-y-4">
          {topProducts.map((product, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">{product.name}</p>
                <p className="text-sm text-gray-600">{product.revenue}</p>
              </div>
              <div className="flex items-center space-x-1 text-green-600">
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm font-medium">{product.growth}</span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default TopPerformers;
