#!/usr/bin/env node

/**
 * Script de diagnostic pour les problèmes de connexion HubSpot
 * Ce script teste différents aspects de l'intégration HubSpot
 */

const https = require('https');
const http = require('http');

// Configuration
const BACKEND_URL = 'http://localhost:3001';
const HUBSPOT_API_URL = 'https://api.hubapi.com';

// Couleurs pour la console
const colors = {
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function makeRequest(url, options = {}) {
  return new Promise((resolve, reject) => {
    const isHttps = url.startsWith('https');
    const client = isHttps ? https : http;
    
    const req = client.request(url, options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const jsonData = JSON.parse(data);
          resolve({ status: res.statusCode, data: jsonData, headers: res.headers });
        } catch (e) {
          resolve({ status: res.statusCode, data: data, headers: res.headers });
        }
      });
    });
    
    req.on('error', reject);
    
    if (options.body) {
      req.write(options.body);
    }
    
    req.end();
  });
}

async function testBackendHealth() {
  log('\n🔍 Test 1: Vérification de l\'état du backend...', 'blue');
  
  try {
    const response = await makeRequest(`${BACKEND_URL}/health`);
    if (response.status === 200) {
      log('✅ Backend accessible et fonctionnel', 'green');
      return true;
    } else {
      log(`❌ Backend répond avec le statut ${response.status}`, 'red');
      return false;
    }
  } catch (error) {
    log(`❌ Impossible de contacter le backend: ${error.message}`, 'red');
    log('💡 Assurez-vous que le serveur backend est démarré avec "npm run dev"', 'yellow');
    return false;
  }
}

async function testHubSpotDirectAccess(apiKey) {
  log('\n🔍 Test 2: Test direct de l\'API HubSpot...', 'blue');
  
  if (!apiKey) {
    log('⚠️  Aucune clé API fournie pour le test direct', 'yellow');
    return false;
  }
  
  try {
    const response = await makeRequest(`${HUBSPOT_API_URL}/crm/v3/objects/contacts?limit=1`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (response.status === 200) {
      log('✅ Connexion directe à HubSpot réussie', 'green');
      log(`📊 Données reçues: ${JSON.stringify(response.data).substring(0, 100)}...`, 'blue');
      return true;
    } else if (response.status === 401) {
      log('❌ Clé API invalide ou permissions insuffisantes', 'red');
      log('💡 Vérifiez que votre clé API a les permissions "contacts.read"', 'yellow');
      return false;
    } else {
      log(`❌ Erreur HubSpot: ${response.status} - ${JSON.stringify(response.data)}`, 'red');
      return false;
    }
  } catch (error) {
    log(`❌ Erreur de connexion directe: ${error.message}`, 'red');
    return false;
  }
}

async function testProxyEndpoint(apiKey) {
  log('\n🔍 Test 3: Test du proxy backend...', 'blue');
  
  if (!apiKey) {
    log('⚠️  Aucune clé API fournie pour le test du proxy', 'yellow');
    return false;
  }
  
  try {
    const response = await makeRequest(`${BACKEND_URL}/api/integrations/hubspot/proxy/crm/v3/objects/contacts?limit=1`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (response.status === 200) {
      log('✅ Proxy backend fonctionnel', 'green');
      return true;
    } else if (response.status === 401) {
      log('❌ Problème d\'authentification via le proxy', 'red');
      return false;
    } else {
      log(`❌ Erreur proxy: ${response.status} - ${JSON.stringify(response.data)}`, 'red');
      return false;
    }
  } catch (error) {
    log(`❌ Erreur de connexion au proxy: ${error.message}`, 'red');
    return false;
  }
}

function validateApiKey(apiKey) {
  log('\n🔍 Test 4: Validation du format de la clé API...', 'blue');
  
  if (!apiKey) {
    log('❌ Aucune clé API fournie', 'red');
    return false;
  }
  
  // Vérification du format de la clé API HubSpot
  if (apiKey.startsWith('pat-na1-') || apiKey.startsWith('pat-eu1-')) {
    log('✅ Format de clé API valide (Private App Token)', 'green');
    return true;
  } else if (apiKey.startsWith('eu1-') && apiKey.length >= 30) {
    log('✅ Format de clé API valide (EU Region Token)', 'green');
    return true;
  } else if (apiKey.length === 39 && apiKey.includes('-')) {
    log('✅ Format de clé API valide (Legacy)', 'green');
    return true;
  } else {
    log('⚠️  Format de clé API non reconnu', 'yellow');
    log('💡 Les clés API HubSpot commencent par "pat-na1-", "pat-eu1-" ou "eu1-" (région EU)', 'yellow');
    return false;
  }
}

function showRecommendations() {
  log('\n📋 RECOMMANDATIONS POUR RÉSOUDRE LES PROBLÈMES:', 'blue');
  log('\n1. 🔑 Vérification de la clé API:', 'yellow');
  log('   - Utilisez une clé d\'application privée (Private App)');
  log('   - Assurez-vous qu\'elle a les permissions "contacts.read"');
  log('   - La clé doit commencer par "pat-na1-" ou "pat-eu1-"');
  
  log('\n2. 🔧 Configuration de l\'application privée HubSpot:', 'yellow');
  log('   - Allez dans Paramètres > Intégrations > Applications privées');
  log('   - Créez une nouvelle application privée');
  log('   - Activez les scopes: contacts, companies, deals');
  log('   - Copiez le token d\'accès généré');
  
  log('\n3. 🌐 Vérification du backend:', 'yellow');
  log('   - Le serveur backend doit être démarré (npm run dev)');
  log('   - Vérifiez que le port 3001 est libre');
  log('   - Consultez les logs du backend pour les erreurs');
  
  log('\n4. 🔒 Permissions requises:', 'yellow');
  log('   - crm.objects.contacts.read');
  log('   - crm.objects.companies.read');
  log('   - crm.objects.deals.read');
}

async function main() {
  log('🚀 DIAGNOSTIC DE CONNEXION HUBSPOT', 'green');
  log('=====================================\n', 'green');
  
  // Récupérer la clé API depuis les arguments de ligne de commande
  const apiKey = process.argv[2];
  
  if (!apiKey) {
    log('⚠️  Aucune clé API fournie', 'yellow');
    log('Usage: node hubspot-diagnostic.js <votre-cle-api-hubspot>', 'blue');
    log('Exemple: node hubspot-diagnostic.js pat-na1-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx\n', 'blue');
  }
  
  // Tests séquentiels
  const backendOk = await testBackendHealth();
  validateApiKey(apiKey);
  
  if (backendOk && apiKey) {
    await testHubSpotDirectAccess(apiKey);
    await testProxyEndpoint(apiKey);
  }
  
  showRecommendations();
  
  log('\n🏁 Diagnostic terminé', 'green');
}

// Gestion des erreurs non capturées
process.on('uncaughtException', (error) => {
  log(`❌ Erreur non gérée: ${error.message}`, 'red');
  process.exit(1);
});

process.on('unhandledRejection', (reason) => {
  log(`❌ Promesse rejetée: ${reason}`, 'red');
  process.exit(1);
});

// Exécution du diagnostic
main().catch(console.error);