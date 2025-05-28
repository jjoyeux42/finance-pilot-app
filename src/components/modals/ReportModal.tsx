
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ReportModal({ isOpen, onClose }: ReportModalProps) {
  const [reportConfig, setReportConfig] = useState({
    type: '',
    period: '',
    format: 'pdf',
    sections: {
      kpis: true,
      cashflow: true,
      profitability: false,
      sales: true
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Génération du rapport:', reportConfig);
    onClose();
    // Ici on générerait le rapport
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Générer un Rapport</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="type">Type de rapport</Label>
            <Select onValueChange={(value) => setReportConfig({...reportConfig, type: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner le type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="monthly">Rapport mensuel</SelectItem>
                <SelectItem value="quarterly">Rapport trimestriel</SelectItem>
                <SelectItem value="annual">Rapport annuel</SelectItem>
                <SelectItem value="custom">Période personnalisée</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="period">Période</Label>
            <Select onValueChange={(value) => setReportConfig({...reportConfig, period: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner la période" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="current">Mois en cours</SelectItem>
                <SelectItem value="previous">Mois précédent</SelectItem>
                <SelectItem value="last3">3 derniers mois</SelectItem>
                <SelectItem value="ytd">Début d'année</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="format">Format</Label>
            <Select onValueChange={(value) => setReportConfig({...reportConfig, format: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner le format" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pdf">PDF</SelectItem>
                <SelectItem value="excel">Excel</SelectItem>
                <SelectItem value="csv">CSV</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label>Sections à inclure</Label>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="kpis"
                  checked={reportConfig.sections.kpis}
                  onCheckedChange={(checked) => 
                    setReportConfig({
                      ...reportConfig, 
                      sections: {...reportConfig.sections, kpis: checked as boolean}
                    })
                  }
                />
                <Label htmlFor="kpis">Indicateurs clés</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="cashflow"
                  checked={reportConfig.sections.cashflow}
                  onCheckedChange={(checked) => 
                    setReportConfig({
                      ...reportConfig, 
                      sections: {...reportConfig.sections, cashflow: checked as boolean}
                    })
                  }
                />
                <Label htmlFor="cashflow">Trésorerie</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="profitability"
                  checked={reportConfig.sections.profitability}
                  onCheckedChange={(checked) => 
                    setReportConfig({
                      ...reportConfig, 
                      sections: {...reportConfig.sections, profitability: checked as boolean}
                    })
                  }
                />
                <Label htmlFor="profitability">Rentabilité</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="sales"
                  checked={reportConfig.sections.sales}
                  onCheckedChange={(checked) => 
                    setReportConfig({
                      ...reportConfig, 
                      sections: {...reportConfig.sections, sales: checked as boolean}
                    })
                  }
                />
                <Label htmlFor="sales">Commercial</Label>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Annuler
            </Button>
            <Button type="submit">
              Générer
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
