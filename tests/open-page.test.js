//execute all tests in headless mode: npx playwright test
//execute all test in visible mode: npx playwright test --headed


import { test, expect } from '@playwright/test';

test('Página inicial do Magento', async ({page}) => {

  await page.goto('https://magento.softwaretestingboard.com/');
  await expect(page).toHaveTitle(/Home Page/i);

  await page.waitForSelector('//*[@id="qc-cmp2-ui"]/div[2]/div/button[2]', { timeout: 5000 });  // Espera o botão aparecer no DOM

  await page.click('//*[@id="qc-cmp2-ui"]/div[2]/div/button[2]');

  await page.waitForTimeout(2000)



});
