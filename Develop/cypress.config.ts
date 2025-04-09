const { defineConfig } = require('cypress');
const devServer = require('@cypress/vite-dev-server');

module.exports = defineConfig({
  component: {
    devServer: {
      framework: 'react',
      bundler: 'vite',
      setupDevServer: (on, config) => {
        return devServer.startDevServer({ options: config });
      },
    },
    indexHtmlFile: 'cypress/support/component-index.html', // make sure this file exists
  },
  e2e: {
    baseUrl: 'http://localhost:3001',
  },
});
