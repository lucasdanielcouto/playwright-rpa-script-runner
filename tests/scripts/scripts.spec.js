import { test, expect } from '@playwright/test';
import { ScriptsPage } from '../../pages/ScriptsPage.js';

test.describe('Tests in Scripts Page', () => {


    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    test('It should update the scripts with random script', async ({ page }) => {

        const scriptsPage = new ScriptsPage(page);
        await scriptsPage.verifyScriptsHeader();
        await scriptsPage.clickUpdateScriptsButton();
        await scriptsPage.updateRamdomScript();
        await scriptsPage.clickUpdateListButton();
        await scriptsPage.verifySuccessUpdateScriptsMessage();
        await scriptsPage.verifyRamdomScriptSaved();

    });

    test('It should update the scripts with all scripts', async ({ page }) => {
        const scriptsPage = new ScriptsPage(page);
        await scriptsPage.verifyScriptsHeader();
        await scriptsPage.clickUpdateScriptsButton();
        await scriptsPage.updateAllScripts();
        await scriptsPage.clickUpdateListButton();
        await scriptsPage.verifySuccessUpdateScriptsMessage();
        await scriptsPage.verifyAllScriptsSaved();
    })

    test('It should reset all scripts status', async ({ page }) => {
        const scriptsPage = new ScriptsPage(page);
        await scriptsPage.verifyScriptsHeader();
        await scriptsPage.resetAllScripts();
        await scriptsPage.verifySuccessResetScriptsMessage();
    })

    test('It should execute script 1', async ({ page }) => {
        const scriptsPage = new ScriptsPage(page);
        await scriptsPage.verifyScriptsHeader();
        await scriptsPage.executeScript1();
    })

    test('It should execute script 2', async ({ page }) => {
        const scriptsPage = new ScriptsPage(page);
        await scriptsPage.verifyScriptsHeader();
        await scriptsPage.executeScript2();
    })

    test('It should execute script 3', async ({ page }) => {
        const scriptsPage = new ScriptsPage(page);
        await scriptsPage.verifyScriptsHeader();
        await scriptsPage.executeScript3();
    })

    test('It should execute script 4', async ({ page }) => {
        const scriptsPage = new ScriptsPage(page);
        await scriptsPage.verifyScriptsHeader();
        await scriptsPage.executeScript4();
    })
});