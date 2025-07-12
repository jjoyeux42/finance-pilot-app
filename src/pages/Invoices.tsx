import React, { useState } from 'react';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  FileText, 
  Search, 
  Plus,
  Download,
  Send,
  AlertTriangle,
  CheckCircle,
  Clock,
  Euro,
  Calendar,
  User,
  Building,
  Mail
} from 'lucide-react';
import { InvoiceModal } from '@/components/modals/InvoiceModal';

interface Invoice {
  id: string;
  invoiceNumber: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  amount: number;
  status: 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled';
  issueDate: string;
  dueDate: string;
  paidDate?: string;
  description: string;
  isRecurring: boolean;
  recurringFrequency?: 'monthly' | 'quarterly' | 'yearly';
}

interface Payment {
  id: string;
  invoiceId: string;
  amount: number;
  date: string;
  method: 'bank_transfer' | 'credit_card' | 'check' | 'cash';
  reference: string;
}

const mockInvoices: Invoice[] = [
  {
    id: '1',
    invoiceNumber: 'INV-2024-001',
    customerId: '1',
    customerName: 'Tech Innovations',
    customerEmail: 'contact@example-company.com',
    amount: 15000,
    status: 'paid',
    issueDate: '2024-01-01',
    dueDate: '2024-01-31',
    paidDate: '2024-01-15',
    description: 'Développement application mobile',
    isRecurring: false
  },
  {
    id: '2',
    invoiceNumber: 'INV-2024-002',
    customerId: '2',
    customerName: 'Digital Partners',
    customerEmail: 'contact@example-partners.com',
    amount: 8500,
    status: 'sent',
    issueDate: '2024-01-15',
    dueDate: '2024-02-15',
    description: 'Maintenance système Q1',
    isRecurring: true,
    recurringFrequency: 'quarterly'
  },
  {
    id: '3',
    invoiceNumber: 'INV-2024-003',
    customerId: '3',
    customerName: 'Future Systems',
    customerEmail: 'contact@example-systems.com',
    amount: 12000,
    status: 'overdue',
    issueDate: '2023-12-01',
    dueDate: '2023-12-31',
    description: 'Consultation stratégique',
    isRecurring: false
  },
  {
    id: '4',
    invoiceNumber: 'INV-2024-004',
    customerId: '1',
    customerName: 'Tech Innovations',
    customerEmail: 'contact@example-company.com',
    amount: 5000,
    status: 'draft',
    issueDate: '2024-01-20',
    dueDate: '2024-02-20',
    description: 'Formation équipe',
    isRecurring: false
  }
];

const mockPayments: Payment[] = [
  {
    id: '1',
    invoiceId: '1',
    amount: 15000,
    date: '2024-01-15',
    method: 'bank_transfer',
    reference: 'VIR-2024-001'
  }
];

const Invoices = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('all');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-emerald-100 text-emerald-800';
      case 'sent': return 'bg-blue-100 text-blue-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      case 'draft': return 'bg-white text-slate-800';
      case 'cancelled': return 'bg-white text-gray-800';
      default: return 'bg-white text-slate-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid': return <CheckCircle className="w-4 h-4" />;
      case 'sent': return <Send className="w-4 h-4" />;
      case 'overdue': return <AlertTriangle className="w-4 h-4" />;
      case 'draft': return <FileText className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const filteredInvoices = mockInvoices.filter(invoice => {
    const matchesSearch = invoice.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         invoice.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         invoice.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    let matchesStatus = true;
    if (activeTab === 'overdue') {
      matchesStatus = invoice.status === 'overdue';
    } else if (activeTab === 'pending') {
      matchesStatus = invoice.status === 'sent';
    } else if (activeTab === 'paid') {
      matchesStatus = invoice.status === 'paid';
    }
    
    const matchesStatusFilter = statusFilter === 'all' || invoice.status === statusFilter;
    
    return matchesSearch && matchesStatus && matchesStatusFilter;
  });

  const totalAmount = mockInvoices.reduce((sum, invoice) => sum + invoice.amount, 0);
  const paidAmount = mockInvoices.filter(inv => inv.status === 'paid').reduce((sum, invoice) => sum + invoice.amount, 0);
  const overdueAmount = mockInvoices.filter(inv => inv.status === 'overdue').reduce((sum, invoice) => sum + invoice.amount, 0);
  const pendingAmount = mockInvoices.filter(inv => inv.status === 'sent').reduce((sum, invoice) => sum + invoice.amount, 0);

  const handleSendReminder = (invoice: Invoice) => {
    // Logique d'envoi de relance
    console.log('Envoi relance pour:', invoice.invoiceNumber);
  };

  const handleMarkAsPaid = (invoice: Invoice) => {
    // Logique pour marquer comme payé
    console.log('Marquer comme payé:', invoice.invoiceNumber);
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-white">
        <AppSidebar />
        <main className="flex-1 p-3 sm:p-6 lg:p-8 space-y-4 sm:space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center space-x-4 w-full sm:w-auto">
              <SidebarTrigger className="lg:hidden" />
              <div className="flex-1">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900">📄 Gestion des Factures</h1>
                <p className="text-slate-600 text-sm sm:text-base lg:text-lg">Suivi et gestion de la facturation</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 w-full sm:w-auto">
              <Button variant="outline" size="sm" className="flex-1 sm:flex-none">
                <Download className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Exporter</span>
                <span className="sm:hidden">Export</span>
              </Button>
              <Button 
                className="bg-green-600 hover:bg-green-700 flex-1 sm:flex-none"
                onClick={() => setIsInvoiceModalOpen(true)}
              >
                <Plus className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Nouvelle Facture</span>
                <span className="sm:hidden">Ajouter</span>
              </Button>
            </div>
          </div>

          {/* Statistiques */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <Card className="border-0 shadow-md bg-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Total Facturé</p>
                    <p className="text-2xl font-bold text-slate-900">
                      {(totalAmount / 1000).toFixed(0)}k€
                    </p>
                  </div>
                  <Euro className="w-8 h-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md bg-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Payé</p>
                    <p className="text-2xl font-bold text-emerald-600">
                      {(paidAmount / 1000).toFixed(0)}k€
                    </p>
                  </div>
                  <CheckCircle className="w-8 h-8 text-emerald-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md bg-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">En Attente</p>
                    <p className="text-2xl font-bold text-blue-600">
                      {(pendingAmount / 1000).toFixed(0)}k€
                    </p>
                  </div>
                  <Clock className="w-8 h-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md bg-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">En Retard</p>
                    <p className="text-2xl font-bold text-red-600">
                      {(overdueAmount / 1000).toFixed(0)}k€
                    </p>
                  </div>
                  <AlertTriangle className="w-8 h-8 text-red-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Onglets et filtres */}
          <Card className="border-0 shadow-md bg-white">
            <CardContent className="p-6">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                  <TabsList className="grid w-full md:w-auto grid-cols-4">
                    <TabsTrigger value="all">Toutes</TabsTrigger>
                    <TabsTrigger value="pending">En Attente</TabsTrigger>
                    <TabsTrigger value="overdue">En Retard</TabsTrigger>
                    <TabsTrigger value="paid">Payées</TabsTrigger>
                  </TabsList>
                  
                  <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                      <Input
                        placeholder="Rechercher une facture..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 w-full sm:w-64"
                      />
                    </div>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger className="w-full sm:w-40">
                        <SelectValue placeholder="Statut" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Tous les statuts</SelectItem>
                        <SelectItem value="draft">Brouillon</SelectItem>
                        <SelectItem value="sent">Envoyée</SelectItem>
                        <SelectItem value="paid">Payée</SelectItem>
                        <SelectItem value="overdue">En retard</SelectItem>
                        <SelectItem value="cancelled">Annulée</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <TabsContent value={activeTab} className="mt-0">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Liste des factures */}
                    <div className="lg:col-span-2">
                      <div className="space-y-4">
                        {filteredInvoices.map((invoice) => (
                          <div
                            key={invoice.id}
                            className={`p-4 rounded-lg border cursor-pointer transition-all hover:shadow-md ${
                              selectedInvoice?.id === invoice.id 
                                ? 'border-white bg-green-50' 
                                : 'border-slate-200 bg-white'
                            }`}
                            onClick={() => setSelectedInvoice(invoice)}
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                  <h3 className="font-semibold text-slate-900">{invoice.invoiceNumber}</h3>
                                  <Badge className={getStatusColor(invoice.status)}>
                                    <div className="flex items-center gap-1">
                                      {getStatusIcon(invoice.status)}
                                      {invoice.status}
                                    </div>
                                  </Badge>
                                  {invoice.isRecurring && (
                                    <Badge variant="outline">
                                      Récurrente
                                    </Badge>
                                  )}
                                </div>
                                <div className="space-y-1 text-sm text-slate-600">
                                  <div className="flex items-center gap-2">
                                    <Building className="w-4 h-4" />
                                    {invoice.customerName}
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <FileText className="w-4 h-4" />
                                    {invoice.description}
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4" />
                                    Échéance: {new Date(invoice.dueDate).toLocaleDateString('fr-FR')}
                                  </div>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="font-semibold text-slate-900 text-lg">
                                  {invoice.amount.toLocaleString('fr-FR')}€
                                </p>
                                {invoice.status === 'overdue' && (
                                  <p className="text-sm text-red-600">
                                    Retard: {Math.floor((new Date().getTime() - new Date(invoice.dueDate).getTime()) / (1000 * 60 * 60 * 24))} jours
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Détails de la facture sélectionnée */}
                    <div>
                      {selectedInvoice ? (
                        <Card className="border-0 shadow-md bg-white">
                          <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                              <FileText className="w-5 h-5" />
                              Détails Facture
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <div>
                              <h3 className="font-semibold text-slate-900 mb-2">{selectedInvoice.invoiceNumber}</h3>
                              <div className="space-y-2 text-sm">
                                <div className="flex items-center gap-2 text-slate-600">
                                  <User className="w-4 h-4" />
                                  {selectedInvoice.customerName}
                                </div>
                                <div className="flex items-center gap-2 text-slate-600">
                                  <Mail className="w-4 h-4" />
                                  {selectedInvoice.customerEmail}
                                </div>
                                <div className="flex items-center gap-2 text-slate-600">
                                  <Calendar className="w-4 h-4" />
                                  Émise le: {new Date(selectedInvoice.issueDate).toLocaleDateString('fr-FR')}
                                </div>
                                <div className="flex items-center gap-2 text-slate-600">
                                  <Calendar className="w-4 h-4" />
                                  Échéance: {new Date(selectedInvoice.dueDate).toLocaleDateString('fr-FR')}
                                </div>
                              </div>
                            </div>
                            
                            <div className="pt-4 border-t">
                              <p className="text-sm text-slate-600 mb-2">Description:</p>
                              <p className="text-sm">{selectedInvoice.description}</p>
                            </div>
                            
                            <div className="pt-4 border-t">
                              <div className="text-center">
                                <p className="text-3xl font-bold text-slate-900">
                                  {selectedInvoice.amount.toLocaleString('fr-FR')}€
                                </p>
                                <Badge className={getStatusColor(selectedInvoice.status)}>
                                  {selectedInvoice.status}
                                </Badge>
                              </div>
                            </div>
                            
                            <div className="pt-4 border-t space-y-2">
                              {selectedInvoice.status === 'overdue' && (
                                <Button 
                                  className="w-full" 
                                  variant="outline"
                                  onClick={() => handleSendReminder(selectedInvoice)}
                                >
                                  <Send className="w-4 h-4 mr-2" />
                                  Envoyer Relance
                                </Button>
                              )}
                              {(selectedInvoice.status === 'sent' || selectedInvoice.status === 'overdue') && (
                                <Button 
                                  className="w-full bg-emerald-600 hover:bg-emerald-700"
                                  onClick={() => handleMarkAsPaid(selectedInvoice)}
                                >
                                  <CheckCircle className="w-4 h-4 mr-2" />
                                  Marquer comme Payée
                                </Button>
                              )}
                              <Button className="w-full" variant="outline">
                                <Download className="w-4 h-4 mr-2" />
                                Télécharger PDF
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ) : (
                        <Card className="border-0 shadow-md bg-white">
                          <CardContent className="p-6 text-center">
                            <FileText className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                            <p className="text-slate-600">Sélectionnez une facture pour voir ses détails</p>
                          </CardContent>
                        </Card>
                      )}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </main>
      </div>
      
      <InvoiceModal 
        isOpen={isInvoiceModalOpen} 
        onClose={() => setIsInvoiceModalOpen(false)} 
      />
    </SidebarProvider>
  );
};

export default Invoices;