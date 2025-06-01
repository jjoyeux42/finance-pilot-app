# Guide de Dépannage HubSpot 🔧

## Problèmes de Connexion HubSpot - Solutions Complètes

### 🎯 Problème Principal
Vous rencontrez des erreurs lors de la connexion à HubSpot via l'interface "Gestion des clients".

---

## 🔑 1. Configuration de la Clé API

### Types de Clés API HubSpot

#### ✅ **Clé Recommandée : Application Privée (Private App)**
- **Format** : `pat-na1-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx` (Amérique du Nord)
- **Format** : `pat-eu1-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx` (Europe)
- **Avantages** : Plus sécurisé, permissions granulaires

#### ⚠️ **Clé Legacy (Ancienne)**
- **Format** : Chaîne de 39 caractères avec tirets
- **Statut** : Dépréciée, non recommandée

### Comment Créer une Application Privée

1. **Accédez aux Paramètres HubSpot**
   - Connectez-vous à votre compte HubSpot
   - Cliquez sur l'icône ⚙️ (Paramètres) en haut à droite

2. **Naviguez vers les Intégrations**
   - Dans le menu de gauche : `Intégrations` > `Applications privées`
   - Cliquez sur `Créer une application privée`

3. **Configurez l'Application**
   - **Nom** : `Finance Pilot Integration`
   - **Description** : `Intégration pour l'application Finance Pilot`

4. **Définissez les Permissions (Scopes)**
   ```
   ✅ crm.objects.contacts.read
   ✅ crm.objects.contacts.write
   ✅ crm.objects.companies.read
   ✅ crm.objects.companies.write
   ✅ crm.objects.deals.read
   ✅ crm.objects.deals.write
   ```

5. **Générez le Token**
   - Cliquez sur `Créer l'application`
   - Copiez le **Token d'accès** généré
   - ⚠️ **Important** : Sauvegardez ce token, il ne sera plus affiché

---

## 🔧 2. Diagnostic des Problèmes

### Script de Diagnostic Automatique

```bash
# Exécutez ce script pour diagnostiquer les problèmes
node hubspot-diagnostic.cjs VOTRE_CLE_API_HUBSPOT
```

### Tests Manuels

#### Test 1 : Vérification du Backend
```bash
# Vérifiez que le backend fonctionne
curl http://localhost:3001/health
```
**Résultat attendu** : `{"status":"OK","timestamp":"..."}`

#### Test 2 : Test Direct de l'API HubSpot
```bash
# Remplacez YOUR_API_KEY par votre clé
curl -H "Authorization: Bearer YOUR_API_KEY" \
     "https://api.hubapi.com/crm/v3/objects/contacts?limit=1"
```

#### Test 3 : Test du Proxy Backend
```bash
# Test via le proxy de l'application
curl -H "Authorization: Bearer YOUR_API_KEY" \
     "http://localhost:3001/api/integrations/hubspot/proxy/crm/v3/objects/contacts?limit=1"
```

---

## 🚨 3. Erreurs Courantes et Solutions

### Erreur 401 : "Unauthorized"

**Causes possibles :**
- Clé API invalide ou expirée
- Format de clé incorrect
- Permissions insuffisantes

**Solutions :**
1. Vérifiez le format de votre clé API
2. Régénérez une nouvelle clé d'application privée
3. Vérifiez les permissions de l'application

### Erreur 403 : "Forbidden"

**Causes possibles :**
- Permissions insuffisantes sur l'application privée
- Compte HubSpot avec restrictions

**Solutions :**
1. Ajoutez les permissions manquantes :
   - `crm.objects.contacts.read`
   - `crm.objects.companies.read`
   - `crm.objects.deals.read`
2. Vérifiez les limites de votre plan HubSpot

### Erreur de Réseau / CORS

**Causes possibles :**
- Backend non démarré
- Problème de proxy
- Configuration CORS incorrecte

**Solutions :**
1. Démarrez le backend :
   ```bash
   cd backend
   npm run dev
   ```
2. Vérifiez que le port 3001 est libre
3. Consultez les logs du backend

---

## 🔍 4. Débogage Avancé

### Console du Navigateur

1. **Ouvrez les Outils de Développement**
   - Chrome/Edge : `F12` ou `Ctrl+Shift+I`
   - Firefox : `F12` ou `Ctrl+Shift+K`
   - Safari : `Cmd+Option+I`

2. **Onglet Console**
   - Recherchez les messages commençant par :
     - `🔍 HubSpot Request:`
     - `📡 HubSpot Response:`
     - `❌ Erreur HubSpot détaillée:`

3. **Onglet Network**
   - Filtrez par "hubspot"
   - Vérifiez les codes de statut des requêtes

### Logs du Backend

```bash
# Dans le terminal où le backend est démarré
# Recherchez les messages :
# - "HubSpot Request"
# - "HubSpot Response"
# - Erreurs 401, 403, 500
```

---

## 🛠️ 5. Configuration Environnement

### Variables d'Environnement Backend

Vérifiez le fichier `backend/.env` :

```env
NODE_ENV=development
PORT=3001
FRONTEND_URL=http://localhost:8080
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_KEY=your_supabase_service_key
JWT_SECRET=your_jwt_secret
LOG_LEVEL=info
```

### Configuration Frontend

Vérifiez le fichier `src/config/api.ts` :

```typescript
export const API_CONFIG = {
  BASE_URL: 'http://localhost:3001/api',
  TIMEOUT: 10000,
};
```

---

## 📋 6. Checklist de Vérification

### Avant de Tester la Connexion

- [ ] Backend démarré (`npm run dev` dans le dossier backend)
- [ ] Frontend démarré (`npm run dev` dans le dossier racine)
- [ ] Clé API au bon format (`pat-na1-` ou `pat-eu1-`)
- [ ] Application privée créée avec les bonnes permissions
- [ ] Console du navigateur ouverte pour voir les logs

### Permissions HubSpot Requises

- [ ] `crm.objects.contacts.read`
- [ ] `crm.objects.contacts.write`
- [ ] `crm.objects.companies.read`
- [ ] `crm.objects.companies.write`
- [ ] `crm.objects.deals.read`
- [ ] `crm.objects.deals.write`

---

## 🆘 7. Support et Ressources

### Documentation HubSpot
- [Applications Privées](https://developers.hubspot.com/docs/api/private-apps)
- [API CRM](https://developers.hubspot.com/docs/api/crm/understanding-the-crm)
- [Authentification](https://developers.hubspot.com/docs/api/auth/oauth-overview)

### Commandes Utiles

```bash
# Redémarrer le backend
cd backend && npm run dev

# Vérifier les processus sur le port 3001
lsof -i :3001

# Tester la connectivité
curl http://localhost:3001/health

# Diagnostic complet
node hubspot-diagnostic.cjs YOUR_API_KEY
```

---

## 🎯 Résolution Rapide

**Si vous êtes pressé, suivez ces étapes dans l'ordre :**

1. **Créez une nouvelle application privée HubSpot** avec les permissions listées
2. **Copiez la clé API générée** (format `pat-na1-...`)
3. **Vérifiez que le backend fonctionne** : `curl http://localhost:3001/health`
4. **Testez la connexion** dans l'interface avec la nouvelle clé
5. **Consultez la console** pour les messages de diagnostic détaillés

---

*Ce guide a été généré pour résoudre les problèmes de connexion HubSpot dans l'application Finance Pilot.*