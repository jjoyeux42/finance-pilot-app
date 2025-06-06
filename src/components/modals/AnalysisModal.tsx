
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { TrendingUp, PieChart, BarChart3 } from 'lucide-react';

interface AnalysisModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AnalysisModal({ isOpen, onClose }: AnalysisModalProps) {
  const { toast } = useToast();
  const [analysisType, setAnalysisType] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState('');

  const handleAnalyze = async () => {
    if (!analysisType) {
      toast({
        title: "Erreur",
        description: "Veuillez sélectionner un type d'analyse.",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    
    // Simuler une analyse
    setTimeout(() => {
      const results = {
        profitability: "Analyse de rentabilité : Vos marges sont en hausse de 8.2% par rapport au trimestre précédent. Les services A et B sont vos sources de revenus les plus rentables avec des marges respectives de 65% et 58%.",
        trends: "Analyse des tendances : Croissance constante observée sur les 6 derniers mois. Pic de performance en avril avec une augmentation de 15% du chiffre d'affaires.",
        comparison: "Analyse comparative : Performance supérieure de 23% à la moyenne du secteur. Vos coûts opérationnels sont optimisés et représentent 42% du CA."
      };
      
      setAnalysisResult(results[analysisType as keyof typeof results]);
      setIsAnalyzing(false);
      
      toast({
        title: "Analyse terminée",
        description: "Les résultats de l'analyse sont disponibles.",
      });
    }, 2000);
  };

  const handleClose = () => {
    setAnalysisResult('');
    setAnalysisType('');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg bg-white">
        <DialogHeader>
          <DialogTitle className="text-gray-900">Analyse poussée</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label className="text-gray-700">Type d'analyse</Label>
            <Select value={analysisType} onValueChange={setAnalysisType}>
              <SelectTrigger className="bg-white border-white focus:border-white focus:ring-white">
                <SelectValue placeholder="Sélectionner le type d'analyse" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="profitability">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="w-4 h-4" />
                    <span>Analyse de rentabilité</span>
                  </div>
                </SelectItem>
                <SelectItem value="trends">
                  <div className="flex items-center space-x-2">
                    <BarChart3 className="w-4 h-4" />
                    <span>Analyse des tendances</span>
                  </div>
                </SelectItem>
                <SelectItem value="comparison">
                  <div className="flex items-center space-x-2">
                    <PieChart className="w-4 h-4" />
                    <span>Analyse comparative</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {analysisResult && (
            <div className="space-y-2">
              <Label className="text-gray-700">Résultats de l'analyse</Label>
              <Textarea
                value={analysisResult}
                readOnly
                rows={6}
                className="bg-gray-50 border-white"
              />
            </div>
          )}

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={handleClose}>
              Fermer
            </Button>
            <Button 
              onClick={handleAnalyze} 
              disabled={isAnalyzing}
              className="bg-purple-600 hover:bg-purple-700 text-white"
            >
              {isAnalyzing ? 'Analyse en cours...' : 'Lancer l\'analyse'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
