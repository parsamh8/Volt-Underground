// cypress.config.ts
import { defineConfig } from 'cypress';
import viteConfig from './vite.config';

export default defineConfig({
  component: {
    devServer: {
      framework: 'react',
      bundler: 'vite',
      viteConfig,
    },
    specPattern: 'Cypress/component/*.cy.{js,ts,jsx,tsx}',
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    supportFile: 'Cypress/support/e2e.ts',  // Disable the support file
  },
});
