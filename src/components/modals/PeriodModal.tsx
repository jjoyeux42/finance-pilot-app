
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

interface PeriodModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PeriodModal({ isOpen, onClose }: PeriodModalProps) {
  const { toast } = useToast();
  const [selectedPeriod, setSelectedPeriod] = useState('');
  const [customStart, setCustomStart] = useState('');
  const [customEnd, setCustomEnd] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedPeriod) {
      toast({
        title: "Erreur",
        description: "Veuillez sélectionner une période.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Période mise à jour",
      description: `La période ${selectedPeriod} a été appliquée aux données.`,
    });
    
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-white">
        <DialogHeader>
          <DialogTitle className="text-gray-900">Sélectionner une période</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label className="text-gray-700">Période</Label>
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="bg-white border-white focus:border-white focus:ring-white">
                <SelectValue placeholder="Sélectionner une période" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="this-month">Ce mois</SelectItem>
                <SelectItem value="last-month">Mois dernier</SelectItem>
                <SelectItem value="this-quarter">Ce trimestre</SelectItem>
                <SelectItem value="last-quarter">Trimestre dernier</SelectItem>
                <SelectItem value="this-year">Cette année</SelectItem>
                <SelectItem value="last-year">Année dernière</SelectItem>
                <SelectItem value="custom">Période personnalisée</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {selectedPeriod === 'custom' && (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startDate" className="text-gray-700">Date de début</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={customStart}
                  onChange={(e) => setCustomStart(e.target.value)}
                  required
                  className="bg-white border-white focus:border-white focus:ring-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endDate" className="text-gray-700">Date de fin</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={customEnd}
                  onChange={(e) => setCustomEnd(e.target.value)}
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
              Appliquer
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
