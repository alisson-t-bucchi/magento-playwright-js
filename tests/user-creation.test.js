// playwright.config.ts
import { test, expect } from '@playwright/test';

test('Create new user in Magento Test Store', async ({ page }) => {
  
  // go to website
  await page.goto('https://magento.softwaretestingboard.com/');

  //wait for Accept button 
  await page.waitForSelector('//*[@id="qc-cmp2-ui"]/div[2]/div/button[2]', { timeout: 5000 });
  //click on Accept
  await page.click('//*[@id="qc-cmp2-ui"]/div[2]/div/button[2]');

  // Click on link "Create an Account"
  await page.click('text=Create an Account');

  // Fill form
  await page.fill('#firstname', 'João');
  await page.fill('#lastname', 'Silva');
  await page.fill('#email_address', 'joao.silva' + Date.now() + '@email.com'); //Create single email
  await page.fill('#password', 'SenhaForte123!');
  await page.fill('#password-confirmation', 'SenhaForte123!');

  // Click on "Create an Account"
  await page.click('button[title="Create an Account"]');

  // Verify successfull condition
  await expect(page.locator('div.message-success')).toContainText('Thank you for registering with Main Website Store.');
});
