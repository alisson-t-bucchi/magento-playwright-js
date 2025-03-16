//execute all tests in headless mode: npx playwright test
//execute all test in visible mode: npx playwright test --headed
import { test, expect } from '@playwright/test';

test.describe('Testing module-authentications', () => {

    const firstName = 'Anderson';
    const lastName = 'Silveira';
    const email = 'anderson.silveira@gmail.com';
    const wrongEmail = 'annd.silv@mail.com.br';
    const pass = 'SenhaForte456#';
    const wrongPass = 'F?';

    async function loginPage (page) {
        await page.goto('https://magento.softwaretestingboard.com/');
        await expect(page).toHaveTitle(/Home Page/i);
        await page.waitForSelector('//*[@id="qc-cmp2-ui"]/div[2]/div/button[2]', { timeout: 5000 });
        await page.click('//*[@id="qc-cmp2-ui"]/div[2]/div/button[2]');
        await page.waitForTimeout(2000)
    }

    test('New user registration', async ({page}) => {
        await loginPage(page); 
        //
        await page.click('text=Create an Account');
        await page.fill('#firstname', firstName);
        await page.fill('#lastname', lastName);
        await page.fill('#email_address', email);
        await page.fill('#password', pass);
        await page.fill('#password-confirmation', pass);
        await page.click('button[title="Create an Account"]');
        await page.waitForTimeout(2000)
        await expect(page.locator('div.message-success')).toContainText('Thank you for registering with Main Website Store.');
    })

    test('Login wiht valid credentials', async ({page}) => {
        await loginPage(page);
        //
        await page.click('text=Sign In');
        await page.fill('#email',email);
        await page.fill('#pass', pass);
        await page.click('button[id="send2"]');
        await page.waitForTimeout(2000)
        await page.waitForSelector('.logged-in', { state: 'visible' });
        //nth() function to select one specific element in a list. 
        await expect(page.locator('.logged-in').nth(1)).toContainText(`Welcome, ${firstName} ${lastName}!`);

    })

    test('Login with invalid credentials', async ({page}) => {
        await loginPage(page); 
        //
        await page.click('text=Sign In');
        await page.fill('#email',wrongEmail);
        await page.fill('#pass', wrongPass);
        await page.click('button[id="send2"]');
        await page.waitForTimeout(2000)
        await page.waitForSelector('.message-error.error.message div[data-bind]')
        await expect(page.locator('.message-error.error.message div[data-bind]')).toContainText('The account sign-in was incorrect or your account is disabled temporarily. Please wait and try again later.')        
    })
});



