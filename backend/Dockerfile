# =================================
# 🐳 DOCKERFILE BACKEND FINANCE PILOT
# Version esbuild (plus robuste pour ES Modules)
# =================================

# 1️⃣ ÉTAPE BUILD - Bundle avec esbuild
FROM node:18-alpine AS builder

WORKDIR /app

# Installer esbuild globalement pour le bundling
RUN npm install -g esbuild

# Copier les fichiers de dépendances
COPY package*.json ./

# Installer toutes les dépendances
RUN npm ci

# Copier le code source et la config TypeScript
COPY . .

# Bundle l'application avec esbuild (résout automatiquement les paths et extensions)
RUN esbuild src/server.ts \
    --bundle \
    --platform=node \
    --target=node18 \
    --format=esm \
    --outfile=dist/server.js \
    --external:express \
    --external:cors \
    --external:helmet \
    --external:compression \
    --external:express-rate-limit \
    --external:winston \
    --external:dotenv \
    --external:@supabase/supabase-js \
    --external:zod

# 2️⃣ ÉTAPE PRODUCTION - Image finale
FROM node:18-alpine AS production

# Créer utilisateur non-root
RUN addgroup -g 1001 -S nodejs && \
    adduser -S backend -u 1001

WORKDIR /app

# Copier package.json pour deps de production
COPY package*.json ./

# Installer seulement les dépendances de production
RUN npm ci --only=production && npm cache clean --force

# Copier le serveur bundlé (un seul fichier !)
COPY --from=builder /app/dist/server.js ./dist/server.js

# Copier les fichiers de config nécessaires
COPY --from=builder /app/.env.example ./.env.example

# Changer propriétaire vers utilisateur non-root
RUN chown -R backend:nodejs /app
USER backend

# Variables d'environnement
ENV NODE_ENV=production
ENV PORT=3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD node -e "require('http').get('http://localhost:3000/health', (res) => { process.exit(res.statusCode === 200 ? 0 : 1) })" || exit 1

EXPOSE 3000

# Démarrage du serveur bundlé
CMD ["node", "dist/server.js"]
