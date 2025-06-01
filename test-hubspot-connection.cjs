#!/usr/bin/env node

/**
 * Script de Test Complet HubSpot
 * 
 * Ce script effectue une série de tests pour diagnostiquer
 * les problèmes de connexion HubSpot.
 * 
 * Usage: node test-hubspot-connection.js [API_KEY]
 */

const https = require('https');
const http = require('http');
const { URL } = require('url');

// Configuration
const BACKEND_URL = 'http://localhost:3001';
const HUBSPOT_API_BASE = 'https://api.hubapi.com';

// Couleurs pour la console
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function logSection(title) {
  console.log('\n' + '='.repeat(60));
  log(title, 'bright');
  console.log('='.repeat(60));
}

function logStep(step, description) {
  log(`\n${step}. ${description}`, 'cyan');
}

function logSuccess(message) {
  log(`✅ ${message}`, 'green');
}

function logError(message) {
  log(`❌ ${message}`, 'red');
}

function logWarning(message) {
  log(`⚠️  ${message}`, 'yellow');
}

function logInfo(message) {
  log(`ℹ️  ${message}`, 'blue');
}

// Fonction pour faire des requêtes HTTP
function makeRequest(url, options = {}) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const isHttps = urlObj.protocol === 'https:';
    const client = isHttps ? https : http;
    
    const requestOptions = {
      hostname: urlObj.hostname,
      port: urlObj.port || (isHttps ? 443 : 80),
      path: urlObj.pathname + urlObj.search,
      method: options.method || 'GET',
      headers: options.headers || {},
      timeout: options.timeout || 10000
    };

    const req = client.request(requestOptions, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const jsonData = data ? JSON.parse(data) : {};
          resolve({
            status: res.statusCode,
            headers: res.headers,
            data: jsonData,
            rawData: data
          });
        } catch (e) {
          resolve({
            status: res.statusCode,
            headers: res.headers,
            data: null,
            rawData: data
          });
        }
      });
    });

    req.on('error', reject);
    req.on('timeout', () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });

    if (options.body) {
      req.write(options.body);
    }
    
    req.end();
  });
}

// Validation du format de clé API
function validateApiKey(apiKey) {
  if (!apiKey || typeof apiKey !== 'string') {
    return {
      isValid: false,
      message: 'Clé API manquante ou invalide'
    };
  }

  // Format des nouvelles clés (Private Apps)
  const privateAppPattern = /^pat-(na1|eu1)-[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/;
  
  // Format des anciennes clés (Legacy)
  const legacyPattern = /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/;
  
  if (privateAppPattern.test(apiKey)) {
    return {
      isValid: true,
      type: 'private_app',
      message: 'Format de clé d\'application privée valide'
    };
  }
  
  if (legacyPattern.test(apiKey)) {
    return {
      isValid: true,
      type: 'legacy',
      message: 'Format de clé legacy valide (déprécié)'
    };
  }
  
  return {
    isValid: false,
    message: 'Format de clé API invalide. Utilisez une clé d\'application privée (pat-na1-... ou pat-eu1-...)'
  };
}

// Test 1: Vérification du backend
async function testBackend() {
  logStep('1', 'Test du backend local');
  
  try {
    const response = await makeRequest(`${BACKEND_URL}/health`);
    
    if (response.status === 200) {
      logSuccess('Backend accessible');
      logInfo(`Réponse: ${response.rawData}`);
      return true;
    } else {
      logError(`Backend répond avec le code ${response.status}`);
      return false;
    }
  } catch (error) {
    logError(`Impossible de contacter le backend: ${error.message}`);
    logWarning('Assurez-vous que le backend est démarré avec: cd backend && npm run dev');
    return false;
  }
}

// Test 2: Validation de la clé API
function testApiKeyFormat(apiKey) {
  logStep('2', 'Validation du format de la clé API');
  
  const validation = validateApiKey(apiKey);
  
  if (validation.isValid) {
    logSuccess(validation.message);
    if (validation.type === 'legacy') {
      logWarning('Les clés legacy sont dépréciées. Créez une application privée.');
    }
    return true;
  } else {
    logError(validation.message);
    return false;
  }
}

// Test 3: Test direct de l'API HubSpot
async function testHubSpotDirect(apiKey) {
  logStep('3', 'Test direct de l\'API HubSpot');
  
  try {
    const response = await makeRequest(
      `${HUBSPOT_API_BASE}/crm/v3/objects/contacts?limit=1`,
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        }
      }
    );
    
    if (response.status === 200) {
      logSuccess('API HubSpot accessible directement');
      logInfo(`Nombre de contacts trouvés: ${response.data.results?.length || 0}`);
      return true;
    } else if (response.status === 401) {
      logError('Erreur 401: Clé API invalide ou expirée');
      logInfo('Solutions:');
      logInfo('- Vérifiez que la clé API est correcte');
      logInfo('- Régénérez une nouvelle clé d\'application privée');
      return false;
    } else if (response.status === 403) {
      logError('Erreur 403: Permissions insuffisantes');
      logInfo('Solutions:');
      logInfo('- Ajoutez les permissions crm.objects.contacts.read à votre application privée');
      logInfo('- Vérifiez les limites de votre plan HubSpot');
      return false;
    } else {
      logError(`Erreur ${response.status}: ${response.rawData}`);
      return false;
    }
  } catch (error) {
    logError(`Erreur de connexion à HubSpot: ${error.message}`);
    return false;
  }
}

// Test 4: Test via le proxy backend
async function testBackendProxy(apiKey) {
  logStep('4', 'Test via le proxy backend');
  
  try {
    const response = await makeRequest(
      `${BACKEND_URL}/api/integrations/hubspot/proxy/crm/v3/objects/contacts?limit=1`,
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        }
      }
    );
    
    if (response.status === 200) {
      logSuccess('Proxy backend fonctionne correctement');
      logInfo(`Données reçues: ${JSON.stringify(response.data, null, 2)}`);
      return true;
    } else {
      logError(`Erreur du proxy: ${response.status} - ${response.rawData}`);
      return false;
    }
  } catch (error) {
    logError(`Erreur du proxy backend: ${error.message}`);
    return false;
  }
}

// Test 5: Test des permissions
async function testPermissions(apiKey) {
  logStep('5', 'Test des permissions requises');
  
  const endpoints = [
    { name: 'Contacts (lecture)', path: '/crm/v3/objects/contacts?limit=1' },
    { name: 'Entreprises (lecture)', path: '/crm/v3/objects/companies?limit=1' },
    { name: 'Affaires (lecture)', path: '/crm/v3/objects/deals?limit=1' }
  ];
  
  let allPermissionsOk = true;
  
  for (const endpoint of endpoints) {
    try {
      const response = await makeRequest(
        `${HUBSPOT_API_BASE}${endpoint.path}`,
        {
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json'
          }
        }
      );
      
      if (response.status === 200) {
        logSuccess(`${endpoint.name}: OK`);
      } else if (response.status === 403) {
        logError(`${endpoint.name}: Permission refusée`);
        allPermissionsOk = false;
      } else {
        logWarning(`${endpoint.name}: Code ${response.status}`);
      }
    } catch (error) {
      logError(`${endpoint.name}: Erreur - ${error.message}`);
      allPermissionsOk = false;
    }
  }
  
  return allPermissionsOk;
}

// Fonction principale
async function runDiagnostic() {
  const apiKey = process.argv[2];
  
  logSection('🔍 DIAGNOSTIC COMPLET HUBSPOT');
  
  if (!apiKey) {
    logError('Clé API manquante');
    logInfo('Usage: node test-hubspot-connection.js YOUR_API_KEY');
    logInfo('Exemple: node test-hubspot-connection.js pat-na1-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx');
    process.exit(1);
  }
  
  const results = {
    backend: false,
    apiKeyFormat: false,
    hubspotDirect: false,
    backendProxy: false,
    permissions: false
  };
  
  // Exécution des tests
  results.backend = await testBackend();
  results.apiKeyFormat = testApiKeyFormat(apiKey);
  
  if (results.apiKeyFormat) {
    results.hubspotDirect = await testHubSpotDirect(apiKey);
    
    if (results.backend) {
      results.backendProxy = await testBackendProxy(apiKey);
    }
    
    if (results.hubspotDirect) {
      results.permissions = await testPermissions(apiKey);
    }
  }
  
  // Résumé des résultats
  logSection('📊 RÉSUMÉ DES TESTS');
  
  Object.entries(results).forEach(([test, passed]) => {
    const testNames = {
      backend: 'Backend local',
      apiKeyFormat: 'Format clé API',
      hubspotDirect: 'API HubSpot directe',
      backendProxy: 'Proxy backend',
      permissions: 'Permissions'
    };
    
    if (passed) {
      logSuccess(`${testNames[test]}: RÉUSSI`);
    } else {
      logError(`${testNames[test]}: ÉCHOUÉ`);
    }
  });
  
  // Recommandations
  logSection('💡 RECOMMANDATIONS');
  
  if (!results.backend) {
    logWarning('1. Démarrez le backend:');
    logInfo('   cd backend && npm run dev');
  }
  
  if (!results.apiKeyFormat) {
    logWarning('2. Créez une nouvelle application privée HubSpot:');
    logInfo('   - Allez dans Paramètres > Intégrations > Applications privées');
    logInfo('   - Créez une nouvelle application');
    logInfo('   - Ajoutez les permissions: contacts, companies, deals');
    logInfo('   - Copiez le token d\'accès généré');
  }
  
  if (!results.permissions) {
    logWarning('3. Vérifiez les permissions de votre application privée:');
    logInfo('   - crm.objects.contacts.read');
    logInfo('   - crm.objects.companies.read');
    logInfo('   - crm.objects.deals.read');
  }
  
  if (results.hubspotDirect && results.backend && !results.backendProxy) {
    logWarning('4. Problème de configuration du proxy backend');
    logInfo('   - Vérifiez les logs du backend');
    logInfo('   - Redémarrez le backend');
  }
  
  const allTestsPassed = Object.values(results).every(Boolean);
  
  if (allTestsPassed) {
    logSection('🎉 DIAGNOSTIC RÉUSSI');
    logSuccess('Tous les tests sont passés ! HubSpot devrait fonctionner correctement.');
  } else {
    logSection('🔧 ACTION REQUISE');
    logError('Certains tests ont échoué. Suivez les recommandations ci-dessus.');
  }
}

// Exécution du script
if (require.main === module) {
  runDiagnostic().catch(error => {
    logError(`Erreur fatale: ${error.message}`);
    process.exit(1);
  });
}

module.exports = {
  validateApiKey,
  testBackend,
  testHubSpotDirect,
  testBackendProxy,
  testPermissions
};