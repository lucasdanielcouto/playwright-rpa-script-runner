import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage.js';
import { MainPage } from '../../pages/MainPage.js';
import { SettingsModal } from '../../pages/SettingsModal.js';

test.describe('Tests in Settings Modal', () => {
    let sidebar;

    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    test('It should clear the fields', async ({ page }) => {
        const mainPage = new MainPage(page);
        const settingsModal = new SettingsModal(page);
        await mainPage.clickSettingsButton();
        await settingsModal.verifyHeader();
        await settingsModal.clearFields();
        await settingsModal.clickSaveButton();
        await mainPage.clickSettingsButton();
        await settingsModal.verifiyEmptyFields();

    });

    test('It should update the fields', async ({ page }) => {
        const mainPage = new MainPage(page);
        const settingsModal = new SettingsModal(page);
        await mainPage.clickSettingsButton();
        await settingsModal.verifyHeader();
        await settingsModal.updateConfigs(process.env.robot_name, process.env.robot_key, process.env.robot_secret, process.env.token);
        await settingsModal.clickSaveButton();
        await mainPage.clickSettingsButton();
        await settingsModal.verifyUpdatedConfigs(process.env.robot_name, process.env.robot_key, process.env.robot_secret, process.env.token);

    })
});