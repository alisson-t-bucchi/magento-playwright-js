// playwright.config.js
const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',                                       // Diretório dos testes
  timeout: 30 * 1000,                                       // Timeout de 30 segundos para cada teste
  retries: 1,                                               // Reexecutar os testes falhos uma vez
  use: {
    headless: false,                                         // Rodar os testes sem interface gráfica
    baseURL: 'https://magento.softwaretestingboard.com',    // URL base para os testes
    screenshot: 'only-on-failure',                          // Captura de tela em caso de falha
  },
  projects: [
    {
      name: 'edge', 
      use: {
        browserName: 'chromium',
        channel: 'msedge', 
      }
    }
  ],
  reporter: [
    ['pwmochawesome',
      {
        outputJson: true,
        reportDir: 'mochawesome-report',
        reportTitle: 'Playwright Mochawesome Report',
      }
    ]
  ],
});
