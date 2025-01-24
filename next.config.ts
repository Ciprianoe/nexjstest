import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['load-qv4lgu7kga-uc.a.run.app'], // Add your image domain here
  },
  // Other config options can go here
};

// Deshabilitar reglas de ESLint
const eslintConfig = {
  rules: {
    '@typescript-eslint/no-unused-vars': 'off', // Deshabilitar la regla de variables no utilizadas
    '@typescript-eslint/no-explicit-any': 'off', // Deshabilitar la regla de uso de 'any'
  },
};


export default nextConfig;
