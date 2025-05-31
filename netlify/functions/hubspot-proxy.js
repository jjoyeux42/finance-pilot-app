/**
 * Fonction Netlify pour proxy des requêtes vers l'API HubSpot
 * Résout les problèmes CORS en agissant comme intermédiaire
 */
exports.handler = async (event, context) => {
  // Configuration CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Content-Type': 'application/json'
  };

  // Gérer les requêtes OPTIONS (preflight)
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  try {
    const { path } = event.queryStringParameters || {};
    
    if (!path) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Paramètre "path" requis' })
      };
    }

    const authorization = event.headers.authorization;
    if (!authorization) {
      return {
        statusCode: 401,
        headers,
        body: JSON.stringify({ error: 'Token d\'autorisation requis' })
      };
    }

    // URL de l'API HubSpot européenne
    const hubspotUrl = `https://api-eu1.hubapi.com${path}`;
    
    const requestOptions = {
      method: event.httpMethod,
      headers: {
        'Authorization': authorization,
        'Content-Type': 'application/json'
      }
    };

    if (event.body && (event.httpMethod === 'POST' || event.httpMethod === 'PUT')) {
      requestOptions.body = event.body;
    }

    const response = await fetch(hubspotUrl, requestOptions);
    const data = await response.text();
    
    return {
      statusCode: response.status,
      headers,
      body: data
    };

  } catch (error) {
    console.error('Erreur proxy HubSpot:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Erreur interne du serveur',
        details: error.message 
      })
    };
  }
};