
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
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Top Clients */}
      <Card className="bg-gradient-to-br from-white/95 to-blue-50/30 backdrop-blur-sm border-0 shadow-xl rounded-2xl">
        <CardHeader className="pb-6">
          <CardTitle className="flex items-center space-x-3 text-slate-900">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl text-white">
              <Users className="w-5 h-5" />
            </div>
            <span className="text-xl font-bold">Top Clients</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {topClients.map((client, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gradient-to-r from-white to-slate-50/80 rounded-2xl hover:shadow-lg transition-all duration-300 border border-slate-100 hover:border-blue-200 group">
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm ${
                  index === 0 ? 'bg-gradient-to-r from-orange-400 to-red-500' :
                  index === 1 ? 'bg-gradient-to-r from-gray-300 to-gray-500' :
                  'bg-gradient-to-r from-blue-400 to-indigo-500'
                }`}>
                  {index + 1}
                </div>
                <div>
                  <p className="font-semibold text-slate-900 group-hover:text-blue-700 transition-colors">{client.name}</p>
                  <p className="text-sm text-slate-600">{client.revenue}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2 text-emerald-600">
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm font-bold">{client.growth}</span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Top Produits */}
      <Card className="bg-gradient-to-br from-white/95 to-purple-50/30 backdrop-blur-sm border-0 shadow-xl rounded-2xl">
        <CardHeader className="pb-6">
          <CardTitle className="flex items-center space-x-3 text-slate-900">
            <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl text-white">
              <Package className="w-5 h-5" />
            </div>
            <span className="text-xl font-bold">Top Produits</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {topProducts.map((product, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gradient-to-r from-white to-slate-50/80 rounded-2xl hover:shadow-lg transition-all duration-300 border border-slate-100 hover:border-purple-200 group">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-sm">
                  {index + 1}
                </div>
                <div>
                  <p className="font-semibold text-slate-900 group-hover:text-purple-700 transition-colors">{product.name}</p>
                  <p className="text-sm text-slate-600">{product.revenue}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2 text-emerald-600">
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm font-bold">{product.growth}</span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default TopPerformers;
