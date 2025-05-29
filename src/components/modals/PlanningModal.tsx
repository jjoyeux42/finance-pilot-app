
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { useToast } from "@/hooks/use-toast";

interface PlanningModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const mockEvents = [
  { date: new Date(2024, 0, 15), title: "RDV Client ABC", time: "14:00" },
  { date: new Date(2024, 0, 18), title: "Présentation Beta Corp", time: "10:30" },
  { date: new Date(2024, 0, 22), title: "Suivi Gamma Industries", time: "16:00" },
  { date: new Date(2024, 0, 25), title: "Négociation Delta Solutions", time: "09:00" },
];

export function PlanningModal({ isOpen, onClose }: PlanningModalProps) {
  const { toast } = useToast();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  const getEventsForDate = (date: Date | undefined) => {
    if (!date) return [];
    return mockEvents.filter(event => 
      event.date.toDateString() === date.toDateString()
    );
  };

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    if (date) {
      const events = getEventsForDate(date);
      if (events.length > 0) {
        toast({
          title: "Événements trouvés",
          description: `${events.length} événement(s) programmé(s) pour cette date.`,
        });
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg bg-white">
        <DialogHeader>
          <DialogTitle className="text-gray-900">Planning Commercial</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex justify-center">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={handleDateSelect}
              className="rounded-md border bg-white"
            />
          </div>

          {selectedDate && (
            <div className="space-y-3">
              <h4 className="font-semibold text-gray-900">
                Événements du {selectedDate.toLocaleDateString('fr-FR')}
              </h4>
              <div className="space-y-2">
                {getEventsForDate(selectedDate).map((event, index) => (
                  <div key={index} className="p-3 bg-gray-50 rounded-lg border">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-gray-900">{event.title}</span>
                      <span className="text-sm text-gray-600">{event.time}</span>
                    </div>
                  </div>
                ))}
                {getEventsForDate(selectedDate).length === 0 && (
                  <p className="text-gray-500 text-center py-4">
                    Aucun événement programmé pour cette date.
                  </p>
                )}
              </div>
            </div>
          )}

          <div className="flex justify-end">
            <Button onClick={onClose} className="bg-blue-600 hover:bg-blue-700 text-white">
              Fermer
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
