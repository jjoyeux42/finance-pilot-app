# Finance Pilot

Une application moderne de gestion financière développée avec React et TypeScript, offrant des tableaux de bord interactifs pour le suivi des performances financières, la gestion des clients, des factures, et l'analyse de rentabilité.

## 🚀 Fonctionnalités

- **Tableaux de bord multiples** : Exécutif, Opérationnel, et Analyse des risques
- **Gestion des clients** : Suivi complet de la base clients avec filtres avancés
- **Facturation** : Gestion des factures avec statuts et échéances
- **Analyse budgétaire** : Suivi des budgets par catégories avec prévisions
- **Rentabilité** : Analyse détaillée de la rentabilité par produits
- **Trésorerie** : Suivi des flux de trésorerie et échéances
- **Analytics** : Insights et recommandations basés sur les données
- **Interface responsive** : Optimisée pour tous les appareils
- **Thème sombre/clair** : Interface adaptable selon les préférences

## 🛠️ Technologies utilisées

- **Frontend** : React 18 + TypeScript
- **Build Tool** : Vite
- **Styling** : Tailwind CSS + shadcn/ui
- **Charts** : Recharts
- **Routing** : React Router DOM
- **State Management** : React Query (TanStack Query)
- **Backend** : Supabase
- **Testing** : Vitest + Testing Library
- **Linting** : ESLint

## 📦 Installation

### Prérequis

- Node.js (version 18 ou supérieure)
- npm ou yarn

### Étapes d'installation

```bash
# Cloner le repository
git clone <URL_DU_REPOSITORY>

# Naviguer dans le dossier du projet
cd finance-pilot-app

# Installer les dépendances
npm install

# Copier le fichier d'environnement
cp .env.example .env

# Configurer les variables d'environnement dans .env
# VITE_SUPABASE_URL=your_supabase_url
# VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# Démarrer le serveur de développement
npm run dev
```

L'application sera accessible à l'adresse : `http://localhost:5173`

## 🧪 Tests

```bash
# Exécuter les tests
npm run test

# Exécuter les tests avec interface utilisateur
npm run test:ui

# Exécuter les tests avec couverture
npm run test:coverage
```

## 🏗️ Build

```bash
# Build pour la production
npm run build

# Prévisualiser le build
npm run preview
```

## 📁 Structure du projet

```
src/
├── components/          # Composants réutilisables
│   ├── ui/             # Composants UI de base (shadcn/ui)
│   └── modals/         # Composants modaux
├── hooks/              # Hooks personnalisés
├── lib/                # Utilitaires et configurations
├── pages/              # Pages de l'application
├── integrations/       # Intégrations externes (Supabase)
└── tests/              # Tests et configuration de test
```

## 🔧 Configuration

### Variables d'environnement

Créez un fichier `.env` à la racine du projet avec les variables suivantes :

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Supabase

L'application utilise Supabase comme backend. Assurez-vous de :

1. Créer un projet Supabase
2. Configurer les tables nécessaires
3. Ajouter les clés d'API dans le fichier `.env`

## 🚀 Déploiement

### Netlify

Le projet est configuré pour le déploiement sur Netlify avec le fichier `netlify.toml` :

```bash
# Build automatique sur Netlify
# Les redirections SPA sont configurées automatiquement
```

### Autres plateformes

```bash
# Build pour la production
npm run build

# Le dossier 'dist' contient les fichiers à déployer
```

## 🤝 Contribution

1. Fork le projet
2. Créez une branche pour votre fonctionnalité (`git checkout -b feature/nouvelle-fonctionnalite`)
3. Committez vos changements (`git commit -m 'Ajout d'une nouvelle fonctionnalité'`)
4. Poussez vers la branche (`git push origin feature/nouvelle-fonctionnalite`)
5. Ouvrez une Pull Request

## 📝 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 🔒 Sécurité

L'application implémente plusieurs mesures de sécurité :

- Validation des entrées utilisateur
- Authentification sécurisée via Supabase
- Protection contre les injections XSS
- Tests de sécurité automatisés

## 📞 Support

Pour toute question ou problème, veuillez ouvrir une issue sur le repository GitHub.
