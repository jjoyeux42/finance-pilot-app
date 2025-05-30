import { defineConfig } from "vite";
<<<<<<< HEAD
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
=======
import react from "@vitejs/plugin-react";
import path from "path";
>>>>>>> 764e393 (feat: Secure Supabase configuration and protect environment variables)

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
<<<<<<< HEAD
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
=======
    host: 'localhost',
    port: 8080,
  },
  plugins: [react()],
>>>>>>> 764e393 (feat: Secure Supabase configuration and protect environment variables)
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
<<<<<<< HEAD
=======
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          supabase: ['@supabase/supabase-js'],
        },
      },
    },
  },
  // Variables d'environnement sécurisées
  define: {
    // Expose seulement les variables nécessaires
    __DEV__: mode === 'development',
  },
>>>>>>> 764e393 (feat: Secure Supabase configuration and protect environment variables)
}));
