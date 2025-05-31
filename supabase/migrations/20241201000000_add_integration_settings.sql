-- Create integration_settings table for storing third-party integration configurations
CREATE TABLE IF NOT EXISTS integration_settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  integration_type VARCHAR(50) NOT NULL,
  settings JSONB NOT NULL DEFAULT '{}',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create unique constraint to ensure one configuration per user per integration type
CREATE UNIQUE INDEX IF NOT EXISTS idx_integration_settings_user_type 
ON integration_settings(user_id, integration_type);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_integration_settings_user_id 
ON integration_settings(user_id);

CREATE INDEX IF NOT EXISTS idx_integration_settings_type 
ON integration_settings(integration_type);

-- Enable RLS (Row Level Security)
ALTER TABLE integration_settings ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
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

-- Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_integration_settings_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update updated_at
CREATE TRIGGER trigger_update_integration_settings_updated_at
  BEFORE UPDATE ON integration_settings
  FOR EACH ROW
  EXECUTE FUNCTION update_integration_settings_updated_at();

-- Add comments for documentation
COMMENT ON TABLE integration_settings IS 'Stores configuration settings for third-party integrations like HubSpot, Salesforce, etc.';
COMMENT ON COLUMN integration_settings.integration_type IS 'Type of integration (e.g., hubspot, salesforce, mailchimp)';
COMMENT ON COLUMN integration_settings.settings IS 'JSON configuration specific to the integration type';
COMMENT ON COLUMN integration_settings.is_active IS 'Whether the integration is currently active/enabled';