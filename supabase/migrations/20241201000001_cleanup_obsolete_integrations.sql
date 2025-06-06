-- Migration de nettoyage des intégrations obsolètes
-- Cette migration supprime les configurations d'intégrations non utilisées

-- Supprimer les configurations d'intégrations obsolètes
DELETE FROM integration_settings 
WHERE integration_type = 'hubspot';

-- Mettre à jour le commentaire de la table
COMMENT ON TABLE integration_settings IS 'Stores configuration settings for third-party integrations like Salesforce, Mailchimp, etc.';