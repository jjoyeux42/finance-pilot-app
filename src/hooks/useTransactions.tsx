
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { useToast } from './use-toast';

interface Transaction {
  id: string;
  type: 'income' | 'expense';
  category: string;
  amount: number;
  description: string | null;
  date: string;
}

interface TransactionInput {
  type: 'income' | 'expense';
  category: string;
  amount: number;
  description?: string;
  date: string;
}

export function useTransactions() {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: transactions, isLoading } = useQuery({
    queryKey: ['transactions', user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from('transactions')
        .select('*')
        .eq('user_id', user.id)
        .order('date', { ascending: false });

      if (error) throw error;
      return data as Transaction[];
    },
    enabled: !!user,
  });

  const addTransactionMutation = useMutation({
    mutationFn: async (transaction: TransactionInput) => {
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('transactions')
        .insert({
          ...transaction,
          user_id: user.id,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      toast({
        title: "Transaction ajoutée",
        description: "La transaction a été enregistrée avec succès.",
      });
    },
    onError: (error) => {
      toast({
        title: "Erreur",
        description: "Impossible d'ajouter la transaction.",
        variant: "destructive",
      });
      console.error('Transaction error:', error);
    },
  });

  return {
    transactions: transactions || [],
    isLoading,
    addTransaction: addTransactionMutation.mutate,
    isAdding: addTransactionMutation.isPending,
  };
}
