-- Script pour créer la table integration_settings dans Supabase
-- Exécutez ce script dans le SQL Editor de votre dashboard Supabase

-- Créer la table integration_settings
CREATE TABLE IF NOT EXISTS integration_settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  integration_type VARCHAR(50) NOT NULL,
  settings JSONB NOT NULL DEFAULT '{}',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Créer un index unique pour s'assurer qu'il n'y a qu'une configuration par utilisateur par type d'intégration
CREATE UNIQUE INDEX IF NOT EXISTS idx_integration_settings_user_type 
ON integration_settings(user_id, integration_type);

-- Créer des index pour des requêtes plus rapides
CREATE INDEX IF NOT EXISTS idx_integration_settings_user_id 
ON integration_settings(user_id);

CREATE INDEX IF NOT EXISTS idx_integration_settings_type 
ON integration_settings(integration_type);

-- Activer RLS (Row Level Security)
ALTER TABLE integration_settings ENABLE ROW LEVEL SECURITY;

-- Créer les politiques RLS
CREATE POLICY "Users can view their own integration settings" 
ON integration_settings FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own integration settings" 
ON integration_settings FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own integration settings" 
ON integration_settings FOR UPDATE 
USING (auth.uid() = user_id) 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own integration settings" 
ON integration_settings FOR DELETE 
USING (auth.uid() = user_id);

-- Créer une fonction pour mettre à jour automatiquement le timestamp updated_at
CREATE OR REPLACE FUNCTION update_integration_settings_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Créer le trigger pour mettre à jour automatiquement updated_at
CREATE TRIGGER trigger_update_integration_settings_updated_at
  BEFORE UPDATE ON integration_settings
  FOR EACH ROW
  EXECUTE FUNCTION update_integration_settings_updated_at();

-- Vérifier que la table a été créée
SELECT 
  table_name, 
  column_name, 
  data_type, 
  is_nullable
FROM information_schema.columns 
WHERE table_name = 'integration_settings'
ORDER BY ordinal_position;