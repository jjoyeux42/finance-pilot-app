
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ReportModal({ isOpen, onClose }: ReportModalProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    type: '',
    period: '',
    startDate: '',
    endDate: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simuler la génération de rapport
    toast({
      title: "Rapport généré",
      description: `Le rapport ${formData.type} pour la période sélectionnée a été généré avec succès.`,
    });
    
    // Reset form
    setFormData({
      type: '',
      period: '',
      startDate: '',
      endDate: '',
    });
    
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-white">
        <DialogHeader>
          <DialogTitle className="text-gray-900">Générer un rapport</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label className="text-gray-700">Type de rapport</Label>
            <Select 
              value={formData.type} 
              onValueChange={(value) => setFormData(prev => ({ ...prev, type: value }))}
            >
              <SelectTrigger className="bg-white border-white focus:border-white focus:ring-white">
                <SelectValue placeholder="Sélectionner le type" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="financial">Rapport financier</SelectItem>
                <SelectItem value="sales">Rapport de ventes</SelectItem>
                <SelectItem value="expenses">Rapport de dépenses</SelectItem>
                <SelectItem value="cash-flow">Rapport de trésorerie</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-gray-700">Période</Label>
            <Select 
              value={formData.period} 
              onValueChange={(value) => setFormData(prev => ({ ...prev, period: value }))}
            >
              <SelectTrigger className="bg-white border-white focus:border-white focus:ring-white">
                <SelectValue placeholder="Sélectionner la période" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="this-month">Ce mois</SelectItem>
                <SelectItem value="last-month">Mois dernier</SelectItem>
                <SelectItem value="this-quarter">Ce trimestre</SelectItem>
                <SelectItem value="this-year">Cette année</SelectItem>
                <SelectItem value="custom">Période personnalisée</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {formData.period === 'custom' && (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startDate" className="text-gray-700">Date de début</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
                  required
                  className="bg-white border-white focus:border-white focus:ring-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endDate" className="text-gray-700">Date de fin</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => setFormData(prev => ({ ...prev, endDate: e.target.value }))}
                  required
                  className="bg-white border-white focus:border-white focus:ring-white"
                />
              </div>
            </div>
          )}

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Annuler
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">
              Générer le rapport
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
