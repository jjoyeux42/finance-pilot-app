import React, { useState } from 'react';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Users, 
  Search, 
  Filter, 
  Plus,
  Mail,
  Phone,
  MapPin,
  Building,
  TrendingUp,
  TrendingDown,
  Calendar,
  Euro,
  FileText,
  AlertTriangle
} from 'lucide-react';
import { ProspectModal } from '@/components/modals/ProspectModal';

interface Customer {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  address: string;
  totalRevenue: number;
  lastInteraction: string;
  status: 'active' | 'inactive' | 'prospect' | 'at_risk';
  segment: 'premium' | 'standard' | 'basic';
  paymentStatus: 'current' | 'overdue' | 'pending';
}

interface Interaction {
  id: string;
  customerId: string;
  type: 'call' | 'email' | 'meeting' | 'invoice' | 'payment';
  description: string;
  date: string;
  amount?: number;
}

const mockCustomers: Customer[] = [
  {
    id: '1',
    name: 'Marie Dupont',
    company: 'Tech Innovations',
    email: 'marie.dupont@techinnovations.fr',
    phone: '+33 1 23 45 67 89',
    address: '123 Rue de la Tech, 75001 Paris',
    totalRevenue: 125000,
    lastInteraction: '2024-01-15',
    status: 'active',
    segment: 'premium',
    paymentStatus: 'current'
  },
  {
    id: '2',
    name: 'Pierre Martin',
    company: 'Digital Partners',
    email: 'p.martin@digitalpartners.com',
    phone: '+33 1 34 56 78 90',
    address: '456 Avenue du Digital, 69000 Lyon',
    totalRevenue: 89000,
    lastInteraction: '2024-01-10',
    status: 'active',
    segment: 'standard',
    paymentStatus: 'pending'
  },
  {
    id: '3',
    name: 'Sophie Bernard',
    company: 'Future Systems',
    email: 'sophie.bernard@futuresystems.fr',
    phone: '+33 1 45 67 89 01',
    address: '789 Boulevard du Futur, 33000 Bordeaux',
    totalRevenue: 67000,
    lastInteraction: '2024-01-05',
    status: 'at_risk',
    segment: 'standard',
    paymentStatus: 'overdue'
  }
];

const mockInteractions: Interaction[] = [
  {
    id: '1',
    customerId: '1',
    type: 'payment',
    description: 'Paiement facture #INV-2024-001',
    date: '2024-01-15',
    amount: 15000
  },
  {
    id: '2',
    customerId: '1',
    type: 'call',
    description: 'Appel de suivi projet Q1',
    date: '2024-01-12'
  },
  {
    id: '3',
    customerId: '2',
    type: 'email',
    description: 'Envoi proposition commerciale',
    date: '2024-01-10'
  }
];

const Customers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSegment, setSelectedSegment] = useState<string>('all');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [isProspectModalOpen, setIsProspectModalOpen] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-emerald-100 text-emerald-800';
      case 'inactive': return 'bg-slate-100 text-slate-800';
      case 'prospect': return 'bg-blue-100 text-blue-800';
      case 'at_risk': return 'bg-red-100 text-red-800';
      default: return 'bg-slate-100 text-slate-800';
    }
  };

  const getSegmentColor = (segment: string) => {
    switch (segment) {
      case 'premium': return 'bg-purple-100 text-purple-800';
      case 'standard': return 'bg-blue-100 text-blue-800';
      case 'basic': return 'bg-slate-100 text-slate-800';
      default: return 'bg-slate-100 text-slate-800';
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'current': return 'bg-emerald-100 text-emerald-800';
      case 'pending': return 'bg-blue-100 text-blue-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      default: return 'bg-slate-100 text-slate-800';
    }
  };

  const filteredCustomers = mockCustomers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSegment = selectedSegment === 'all' || customer.segment === selectedSegment;
    return matchesSearch && matchesSegment;
  });

  const customerInteractions = selectedCustomer 
    ? mockInteractions.filter(interaction => interaction.customerId === selectedCustomer.id)
    : [];

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-slate-50 to-blue-50">
        <AppSidebar />
        <main className="flex-1 p-6 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <SidebarTrigger className="lg:hidden" />
              <div>
                <h1 className="text-3xl font-bold text-slate-900">Gestion des Clients</h1>
                <p className="text-slate-600">Suivi et gestion de la relation client</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button 
                variant="outline" 
                size="sm"
              >
                <FileText className="w-4 h-4 mr-2" />
                Exporter
              </Button>
              <Button 
                className="bg-blue-600 hover:bg-blue-700"
                onClick={() => setIsProspectModalOpen(true)}
              >
                <Plus className="w-4 h-4 mr-2" />
                Nouveau Client
              </Button>
            </div>
          </div>

          {/* Statistiques */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="border-0 shadow-md bg-white/70 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Total Clients</p>
                    <p className="text-2xl font-bold text-slate-900">{mockCustomers.length}</p>
                  </div>
                  <Users className="w-8 h-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md bg-white/70 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Clients Actifs</p>
                    <p className="text-2xl font-bold text-emerald-600">
                      {mockCustomers.filter(c => c.status === 'active').length}
                    </p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-emerald-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md bg-white/70 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Clients à Risque</p>
                    <p className="text-2xl font-bold text-red-600">
                      {mockCustomers.filter(c => c.status === 'at_risk').length}
                    </p>
                  </div>
                  <AlertTriangle className="w-8 h-8 text-red-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md bg-white/70 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">CA Total</p>
                    <p className="text-2xl font-bold text-slate-900">
                      {(mockCustomers.reduce((sum, c) => sum + c.totalRevenue, 0) / 1000).toFixed(0)}k€
                    </p>
                  </div>
                  <Euro className="w-8 h-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filtres et recherche */}
          <Card className="border-0 shadow-md bg-white/70 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <Input
                      placeholder="Rechercher un client..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant={selectedSegment === 'all' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedSegment('all')}
                  >
                    Tous
                  </Button>
                  <Button
                    variant={selectedSegment === 'premium' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedSegment('premium')}
                  >
                    Premium
                  </Button>
                  <Button
                    variant={selectedSegment === 'standard' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedSegment('standard')}
                  >
                    Standard
                  </Button>
                  <Button
                    variant={selectedSegment === 'basic' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedSegment('basic')}
                  >
                    Basic
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Liste des clients */}
            <div className="lg:col-span-2">
              <Card className="border-0 shadow-md bg-white/70 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Liste des Clients
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {filteredCustomers.map((customer) => (
                      <div
                        key={customer.id}
                        className={`p-4 rounded-lg border cursor-pointer transition-all hover:shadow-md ${
                          selectedCustomer?.id === customer.id 
                            ? 'border-blue-500 bg-blue-50' 
                            : 'border-slate-200 bg-white'
                        }`}
                        onClick={() => setSelectedCustomer(customer)}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="font-semibold text-slate-900">{customer.name}</h3>
                              <Badge className={getStatusColor(customer.status)}>
                                {customer.status}
                              </Badge>
                              <Badge className={getSegmentColor(customer.segment)}>
                                {customer.segment}
                              </Badge>
                            </div>
                            <div className="space-y-1 text-sm text-slate-600">
                              <div className="flex items-center gap-2">
                                <Building className="w-4 h-4" />
                                {customer.company}
                              </div>
                              <div className="flex items-center gap-2">
                                <Mail className="w-4 h-4" />
                                {customer.email}
                              </div>
                              <div className="flex items-center gap-2">
                                <Phone className="w-4 h-4" />
                                {customer.phone}
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-slate-900">
                              {(customer.totalRevenue / 1000).toFixed(0)}k€
                            </p>
                            <Badge className={getPaymentStatusColor(customer.paymentStatus)}>
                              {customer.paymentStatus}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Détails du client sélectionné */}
            <div>
              {selectedCustomer ? (
                <Card className="border-0 shadow-md bg-white/70 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="w-5 h-5" />
                      Détails Client
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Tabs defaultValue="info" className="w-full">
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="info">Informations</TabsTrigger>
                        <TabsTrigger value="history">Historique</TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="info" className="space-y-4">
                        <div>
                          <h3 className="font-semibold text-slate-900 mb-2">{selectedCustomer.name}</h3>
                          <div className="space-y-2 text-sm">
                            <div className="flex items-center gap-2 text-slate-600">
                              <Building className="w-4 h-4" />
                              {selectedCustomer.company}
                            </div>
                            <div className="flex items-center gap-2 text-slate-600">
                              <Mail className="w-4 h-4" />
                              {selectedCustomer.email}
                            </div>
                            <div className="flex items-center gap-2 text-slate-600">
                              <Phone className="w-4 h-4" />
                              {selectedCustomer.phone}
                            </div>
                            <div className="flex items-center gap-2 text-slate-600">
                              <MapPin className="w-4 h-4" />
                              {selectedCustomer.address}
                            </div>
                          </div>
                        </div>
                        
                        <div className="pt-4 border-t">
                          <div className="grid grid-cols-2 gap-4 text-center">
                            <div>
                              <p className="text-2xl font-bold text-slate-900">
                                {(selectedCustomer.totalRevenue / 1000).toFixed(0)}k€
                              </p>
                              <p className="text-sm text-slate-600">CA Total</p>
                            </div>
                            <div>
                              <p className="text-2xl font-bold text-slate-900">
                                {customerInteractions.length}
                              </p>
                              <p className="text-sm text-slate-600">Interactions</p>
                            </div>
                          </div>
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="history" className="space-y-4">
                        <div className="space-y-3">
                          {customerInteractions.map((interaction) => (
                            <div key={interaction.id} className="p-3 bg-slate-50 rounded-lg">
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-sm font-medium capitalize">
                                  {interaction.type}
                                </span>
                                <span className="text-xs text-slate-500">
                                  {new Date(interaction.date).toLocaleDateString('fr-FR')}
                                </span>
                              </div>
                              <p className="text-sm text-slate-600">{interaction.description}</p>
                              {interaction.amount && (
                                <p className="text-sm font-semibold text-emerald-600 mt-1">
                                  {interaction.amount.toLocaleString('fr-FR')}€
                                </p>
                              )}
                            </div>
                          ))}
                        </div>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              ) : (
                <Card className="border-0 shadow-md bg-white/70 backdrop-blur-sm">
                  <CardContent className="p-6 text-center">
                    <Users className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                    <p className="text-slate-600">Sélectionnez un client pour voir ses détails</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </main>
      </div>
      
      <ProspectModal 
        isOpen={isProspectModalOpen} 
        onClose={() => setIsProspectModalOpen(false)} 
      />
    </SidebarProvider>
  );
};

export default Customers;