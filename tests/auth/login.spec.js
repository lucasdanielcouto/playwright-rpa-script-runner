import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage.js';

test('It should login with invalid password', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.acess();
    await loginPage.login(process.env.EMAIL, 'invalid_password');
    await loginPage.verifyErrorMessage();
});

test('It should login with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.acess();
    await loginPage.login(process.env.EMAIL, process.env.PASSWORD);
});
