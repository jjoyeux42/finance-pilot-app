export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      bank_accounts: {
        Row: {
          account_name: string
          account_number: string | null
          account_type: string
          available_balance: number | null
          bank_api_id: string | null
          bank_name: string
          bic: string | null
          company_id: string | null
          created_at: string | null
          credit_limit: number | null
          currency: string | null
          current_balance: number
          iban: string | null
          id: string
          is_active: boolean | null
          last_sync: string | null
          sync_status: string | null
          updated_at: string | null
        }
        Insert: {
          account_name: string
          account_number?: string | null
          account_type: string
          available_balance?: number | null
          bank_api_id?: string | null
          bank_name: string
          bic?: string | null
          company_id?: string | null
          created_at?: string | null
          credit_limit?: number | null
          currency?: string | null
          current_balance?: number
          iban?: string | null
          id?: string
          is_active?: boolean | null
          last_sync?: string | null
          sync_status?: string | null
          updated_at?: string | null
        }
        Update: {
          account_name?: string
          account_number?: string | null
          account_type?: string
          available_balance?: number | null
          bank_api_id?: string | null
          bank_name?: string
          bic?: string | null
          company_id?: string | null
          created_at?: string | null
          credit_limit?: number | null
          currency?: string | null
          current_balance?: number
          iban?: string | null
          id?: string
          is_active?: boolean | null
          last_sync?: string | null
          sync_status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "bank_accounts_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      bank_transactions: {
        Row: {
          amount: number
          api_transaction_id: string | null
          balance_after: number | null
          bank_account_id: string | null
          bank_reference: string | null
          category: string | null
          counterparty_account: string | null
          counterparty_name: string | null
          created_at: string | null
          currency: string | null
          description: string
          id: string
          reference: string | null
          source: string | null
          subcategory: string | null
          tags: string[] | null
          transaction_date: string
          updated_at: string | null
          value_date: string | null
        }
        Insert: {
          amount: number
          api_transaction_id?: string | null
          balance_after?: number | null
          bank_account_id?: string | null
          bank_reference?: string | null
          category?: string | null
          counterparty_account?: string | null
          counterparty_name?: string | null
          created_at?: string | null
          currency?: string | null
          description: string
          id?: string
          reference?: string | null
          source?: string | null
          subcategory?: string | null
          tags?: string[] | null
          transaction_date: string
          updated_at?: string | null
          value_date?: string | null
        }
        Update: {
          amount?: number
          api_transaction_id?: string | null
          balance_after?: number | null
          bank_account_id?: string | null
          bank_reference?: string | null
          category?: string | null
          counterparty_account?: string | null
          counterparty_name?: string | null
          created_at?: string | null
          currency?: string | null
          description?: string
          id?: string
          reference?: string | null
          source?: string | null
          subcategory?: string | null
          tags?: string[] | null
          transaction_date?: string
          updated_at?: string | null
          value_date?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "bank_transactions_bank_account_id_fkey"
            columns: ["bank_account_id"]
            isOneToOne: false
            referencedRelation: "bank_accounts"
            referencedColumns: ["id"]
          },
        ]
      }
      caf_calculations: {
        Row: {
          asset_disposals_book_value: number | null
          asset_disposals_proceeds: number | null
          caf_total: number | null
          company_id: string | null
          created_at: string | null
          debt_repayment: number | null
          depreciation: number | null
          dividends_paid: number | null
          fiscal_year: number | null
          grants_to_result: number | null
          id: string
          investment_capacity: number | null
          investments: number | null
          net_result: number
          period_end: string
          period_start: string
          provisions_decrease: number | null
          provisions_increase: number | null
          updated_at: string | null
          validated_at: string | null
          validated_by: string | null
        }
        Insert: {
          asset_disposals_book_value?: number | null
          asset_disposals_proceeds?: number | null
          caf_total?: number | null
          company_id?: string | null
          created_at?: string | null
          debt_repayment?: number | null
          depreciation?: number | null
          dividends_paid?: number | null
          fiscal_year?: number | null
          grants_to_result?: number | null
          id?: string
          investment_capacity?: number | null
          investments?: number | null
          net_result?: number
          period_end: string
          period_start: string
          provisions_decrease?: number | null
          provisions_increase?: number | null
          updated_at?: string | null
          validated_at?: string | null
          validated_by?: string | null
        }
        Update: {
          asset_disposals_book_value?: number | null
          asset_disposals_proceeds?: number | null
          caf_total?: number | null
          company_id?: string | null
          created_at?: string | null
          debt_repayment?: number | null
          depreciation?: number | null
          dividends_paid?: number | null
          fiscal_year?: number | null
          grants_to_result?: number | null
          id?: string
          investment_capacity?: number | null
          investments?: number | null
          net_result?: number
          period_end?: string
          period_start?: string
          provisions_decrease?: number | null
          provisions_increase?: number | null
          updated_at?: string | null
          validated_at?: string | null
          validated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "caf_calculations_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      cash_flow_predictions: {
        Row: {
          based_on: Json | null
          calculated_at: string | null
          company_id: string | null
          confidence_level: number | null
          created_at: string | null
          id: string
          predicted_balance: number
          predicted_inflow: number | null
          predicted_outflow: number | null
          prediction_date: string
          scenario: string | null
        }
        Insert: {
          based_on?: Json | null
          calculated_at?: string | null
          company_id?: string | null
          confidence_level?: number | null
          created_at?: string | null
          id?: string
          predicted_balance: number
          predicted_inflow?: number | null
          predicted_outflow?: number | null
          prediction_date: string
          scenario?: string | null
        }
        Update: {
          based_on?: Json | null
          calculated_at?: string | null
          company_id?: string | null
          confidence_level?: number | null
          created_at?: string | null
          id?: string
          predicted_balance?: number
          predicted_inflow?: number | null
          predicted_outflow?: number | null
          prediction_date?: string
          scenario?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "cash_flow_predictions_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      companies: {
        Row: {
          accounting_currency: string | null
          address: string | null
          city: string | null
          country: string | null
          created_at: string | null
          email: string | null
          fiscal_year_start: number | null
          id: string
          is_active: boolean | null
          legal_form: string | null
          name: string
          owner_user_id: string
          parent_company_id: string | null
          phone: string | null
          postal_code: string | null
          siren: string | null
          siret: string | null
          updated_at: string | null
          vat_number: string | null
          website: string | null
        }
        Insert: {
          accounting_currency?: string | null
          address?: string | null
          city?: string | null
          country?: string | null
          created_at?: string | null
          email?: string | null
          fiscal_year_start?: number | null
          id?: string
          is_active?: boolean | null
          legal_form?: string | null
          name: string
          owner_user_id: string
          parent_company_id?: string | null
          phone?: string | null
          postal_code?: string | null
          siren?: string | null
          siret?: string | null
          updated_at?: string | null
          vat_number?: string | null
          website?: string | null
        }
        Update: {
          accounting_currency?: string | null
          address?: string | null
          city?: string | null
          country?: string | null
          created_at?: string | null
          email?: string | null
          fiscal_year_start?: number | null
          id?: string
          is_active?: boolean | null
          legal_form?: string | null
          name?: string
          owner_user_id?: string
          parent_company_id?: string | null
          phone?: string | null
          postal_code?: string | null
          siren?: string | null
          siret?: string | null
          updated_at?: string | null
          vat_number?: string | null
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "companies_parent_company_id_fkey"
            columns: ["parent_company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      company_users: {
        Row: {
          accepted_at: string | null
          company_id: string | null
          created_at: string | null
          id: string
          invited_at: string | null
          invited_by: string | null
          permissions: Json | null
          role: string
          user_id: string | null
        }
        Insert: {
          accepted_at?: string | null
          company_id?: string | null
          created_at?: string | null
          id?: string
          invited_at?: string | null
          invited_by?: string | null
          permissions?: Json | null
          role: string
          user_id?: string | null
        }
        Update: {
          accepted_at?: string | null
          company_id?: string | null
          created_at?: string | null
          id?: string
          invited_at?: string | null
          invited_by?: string | null
          permissions?: Json | null
          role?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "company_users_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      customers: {
        Row: {
          address: string | null
          city: string | null
          company_id: string | null
          company_name: string | null
          country: string | null
          created_at: string | null
          credit_limit: number | null
          customer_type: string | null
          email: string | null
          id: string
          is_active: boolean | null
          last_order_date: string | null
          name: string
          payment_terms: number | null
          phone: string | null
          postal_code: string | null
          total_revenue: number | null
          updated_at: string | null
          vat_number: string | null
        }
        Insert: {
          address?: string | null
          city?: string | null
          company_id?: string | null
          company_name?: string | null
          country?: string | null
          created_at?: string | null
          credit_limit?: number | null
          customer_type?: string | null
          email?: string | null
          id?: string
          is_active?: boolean | null
          last_order_date?: string | null
          name: string
          payment_terms?: number | null
          phone?: string | null
          postal_code?: string | null
          total_revenue?: number | null
          updated_at?: string | null
          vat_number?: string | null
        }
        Update: {
          address?: string | null
          city?: string | null
          company_id?: string | null
          company_name?: string | null
          country?: string | null
          created_at?: string | null
          credit_limit?: number | null
          customer_type?: string | null
          email?: string | null
          id?: string
          is_active?: boolean | null
          last_order_date?: string | null
          name?: string
          payment_terms?: number | null
          phone?: string | null
          postal_code?: string | null
          total_revenue?: number | null
          updated_at?: string | null
          vat_number?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "customers_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      financial_ratios: {
        Row: {
          asset_turnover: number | null
          calculation_date: string
          cash_ratio: number | null
          company_id: string | null
          created_at: string | null
          current_ratio: number | null
          debt_ratio: number | null
          debt_to_equity: number | null
          dso: number | null
          equity_ratio: number | null
          gross_margin: number | null
          id: string
          net_margin: number | null
          operating_margin: number | null
          period_end: string
          period_start: string
          quick_ratio: number | null
          receivables_turnover: number | null
          roa: number | null
          roe: number | null
        }
        Insert: {
          asset_turnover?: number | null
          calculation_date: string
          cash_ratio?: number | null
          company_id?: string | null
          created_at?: string | null
          current_ratio?: number | null
          debt_ratio?: number | null
          debt_to_equity?: number | null
          dso?: number | null
          equity_ratio?: number | null
          gross_margin?: number | null
          id?: string
          net_margin?: number | null
          operating_margin?: number | null
          period_end: string
          period_start: string
          quick_ratio?: number | null
          receivables_turnover?: number | null
          roa?: number | null
          roe?: number | null
        }
        Update: {
          asset_turnover?: number | null
          calculation_date?: string
          cash_ratio?: number | null
          company_id?: string | null
          created_at?: string | null
          current_ratio?: number | null
          debt_ratio?: number | null
          debt_to_equity?: number | null
          dso?: number | null
          equity_ratio?: number | null
          gross_margin?: number | null
          id?: string
          net_margin?: number | null
          operating_margin?: number | null
          period_end?: string
          period_start?: string
          quick_ratio?: number | null
          receivables_turnover?: number | null
          roa?: number | null
          roe?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "financial_ratios_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      integration_settings: {
        Row: {
          company_id: string | null
          created_at: string | null
          credentials: Json | null
          id: string
          integration_type: string
          is_active: boolean | null
          last_sync: string | null
          provider: string
          settings: Json
          sync_frequency: string | null
          updated_at: string | null
        }
        Insert: {
          company_id?: string | null
          created_at?: string | null
          credentials?: Json | null
          id?: string
          integration_type: string
          is_active?: boolean | null
          last_sync?: string | null
          provider: string
          settings?: Json
          sync_frequency?: string | null
          updated_at?: string | null
        }
        Update: {
          company_id?: string | null
          created_at?: string | null
          credentials?: Json | null
          id?: string
          integration_type?: string
          is_active?: boolean | null
          last_sync?: string | null
          provider?: string
          settings?: Json
          sync_frequency?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "integration_settings_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      invoices: {
        Row: {
          amount_ht: number
          amount_ttc: number | null
          company_id: string | null
          created_at: string | null
          customer_id: string | null
          due_date: string
          id: string
          invoice_date: string
          invoice_number: string
          notes: string | null
          paid_date: string | null
          payment_method: string | null
          status: string | null
          updated_at: string | null
          vat_amount: number
        }
        Insert: {
          amount_ht?: number
          amount_ttc?: number | null
          company_id?: string | null
          created_at?: string | null
          customer_id?: string | null
          due_date: string
          id?: string
          invoice_date?: string
          invoice_number: string
          notes?: string | null
          paid_date?: string | null
          payment_method?: string | null
          status?: string | null
          updated_at?: string | null
          vat_amount?: number
        }
        Update: {
          amount_ht?: number
          amount_ttc?: number | null
          company_id?: string | null
          created_at?: string | null
          customer_id?: string | null
          due_date?: string
          id?: string
          invoice_date?: string
          invoice_number?: string
          notes?: string | null
          paid_date?: string | null
          payment_method?: string | null
          status?: string | null
          updated_at?: string | null
          vat_amount?: number
        }
        Relationships: [
          {
            foreignKeyName: "invoices_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoices_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
        ]
      }
      reports: {
        Row: {
          company_id: string | null
          created_at: string | null
          data: Json
          generated_by: string | null
          id: string
          is_shared: boolean | null
          period_end: string | null
          period_start: string | null
          shared_with: Json | null
          template_id: string | null
          title: string
          type: string
          updated_at: string | null
        }
        Insert: {
          company_id?: string | null
          created_at?: string | null
          data?: Json
          generated_by?: string | null
          id?: string
          is_shared?: boolean | null
          period_end?: string | null
          period_start?: string | null
          shared_with?: Json | null
          template_id?: string | null
          title: string
          type: string
          updated_at?: string | null
        }
        Update: {
          company_id?: string | null
          created_at?: string | null
          data?: Json
          generated_by?: string | null
          id?: string
          is_shared?: boolean | null
          period_end?: string | null
          period_start?: string | null
          shared_with?: Json | null
          template_id?: string | null
          title?: string
          type?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "reports_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      revenue_data: {
        Row: {
          ca_ht: number
          ca_ht_n1: number | null
          ca_ttc: number
          company_id: string | null
          created_at: string | null
          growth_rate: number | null
          id: string
          period_end: string
          period_start: string
          period_type: string
          source: string | null
          updated_at: string | null
          vat_collected: number | null
        }
        Insert: {
          ca_ht?: number
          ca_ht_n1?: number | null
          ca_ttc?: number
          company_id?: string | null
          created_at?: string | null
          growth_rate?: number | null
          id?: string
          period_end: string
          period_start: string
          period_type: string
          source?: string | null
          updated_at?: string | null
          vat_collected?: number | null
        }
        Update: {
          ca_ht?: number
          ca_ht_n1?: number | null
          ca_ttc?: number
          company_id?: string | null
          created_at?: string | null
          growth_rate?: number | null
          id?: string
          period_end?: string
          period_start?: string
          period_type?: string
          source?: string | null
          updated_at?: string | null
          vat_collected?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "revenue_data_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const