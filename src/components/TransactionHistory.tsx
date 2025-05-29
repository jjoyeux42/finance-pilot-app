
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  TrendingUp, 
  TrendingDown, 
  Search, 
  Filter,
  Calendar,
  ArrowUpDown
} from 'lucide-react';

const transactionHistory = [
  { id: 1, date: '2024-01-28', type: 'entree', category: 'Vente', description: 'Facture Client ABC #001', amount: 15000 },
  { id: 2, date: '2024-01-27', type: 'sortie', category: 'Salaires', description: 'Salaire équipe janvier', amount: 28500 },
  { id: 3, date: '2024-01-26', type: 'entree', category: 'Vente', description: 'Facture Client XYZ #045', amount: 8900 },
  { id: 4, date: '2024-01-25', type: 'sortie', category: 'Frais généraux', description: 'Loyer bureaux janvier', amount: 4200 },
  { id: 5, date: '2024-01-24', type: 'entree', category: 'Vente', description: 'Facture Client DEF #089', amount: 12300 },
  { id: 6, date: '2024-01-23', type: 'sortie', category: 'Marketing', description: 'Campagne publicitaire', amount: 3500 },
  { id: 7, date: '2024-01-22', type: 'entree', category: 'Vente', description: 'Facture Client GHI #034', amount: 18750 },
  { id: 8, date: '2024-01-21', type: 'sortie', category: 'Fournitures', description: 'Matériel informatique', amount: 2800 },
  { id: 9, date: '2024-01-20', type: 'entree', category: 'Vente', description: 'Facture Client JKL #067', amount: 9600 },
  { id: 10, date: '2024-01-19', type: 'sortie', category: 'Transport', description: 'Frais de déplacement', amount: 850 },
];

export function TransactionHistory() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [sortOrder, setSortOrder] = useState('desc');

  const filteredTransactions = transactionHistory
    .filter(transaction => {
      const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          transaction.category.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = filterType === 'all' || transaction.type === filterType;
      return matchesSearch && matchesType;
    })
    .sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
    });

  return (
    <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-slate-900 flex items-center">
          <Calendar className="w-5 h-5 mr-2" />
          Historique des Transactions
        </CardTitle>
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
            <Input
              placeholder="Rechercher une transaction..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
          <div className="flex gap-2">
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-32">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous</SelectItem>
                <SelectItem value="entree">Entrées</SelectItem>
                <SelectItem value="sortie">Sorties</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc')}
            >
              <ArrowUpDown className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {filteredTransactions.map((transaction) => (
            <div key={transaction.id} className="flex items-center justify-between p-4 rounded-lg border border-slate-200 hover:bg-slate-50 transition-all duration-200 hover:shadow-md">
              <div className="flex items-center space-x-4">
                <div className={`p-2 rounded-full ${transaction.type === 'entree' ? 'bg-emerald-100' : 'bg-red-100'}`}>
                  {transaction.type === 'entree' ? 
                    <TrendingUp className="w-4 h-4 text-emerald-600" /> : 
                    <TrendingDown className="w-4 h-4 text-red-500" />
                  }
                </div>
                <div>
                  <p className="font-medium text-slate-900">{transaction.description}</p>
                  <div className="flex items-center space-x-3 text-sm text-slate-600">
                    <span>{new Date(transaction.date).toLocaleDateString('fr-FR')}</span>
                    <span className="text-slate-400">•</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      transaction.type === 'entree' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {transaction.category}
                    </span>
                  </div>
                </div>
              </div>
              <span className={`font-bold text-lg ${transaction.type === 'entree' ? 'text-emerald-600' : 'text-red-500'}`}>
                {transaction.type === 'entree' ? '+' : '-'}{transaction.amount.toLocaleString()}€
              </span>
            </div>
          ))}
        </div>
        {filteredTransactions.length === 0 && (
          <div className="text-center py-8 text-slate-500">
            <Calendar className="w-12 h-12 mx-auto mb-4 text-slate-300" />
            <p>Aucune transaction trouvée</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
