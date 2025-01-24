import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      '@typescript-eslint/no-unused-vars': 'off', // Deshabilitar la regla de variables no utilizadas
      '@typescript-eslint/no-explicit-any': 'off', // Deshabilitar la regla de uso de 'any'
      '@next/next/no-sync-scripts': 'off',
      '@next/next/no-css-tags': 'off',
    },
  },
];

export default eslintConfig;
