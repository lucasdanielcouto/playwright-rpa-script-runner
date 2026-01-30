import { expect } from '@playwright/test';

class ScriptsPage {
    constructor(page) {
        this.page = page;
        this.scriptsHeader = page.getByRole('heading', { name: 'Scripts', exact: true })

        this.resetAllButton = page.getByRole('button', { name: 'Reset All' })
        this.successResetScriptsMessage = page.getByText('All Scripts Reset')

        this.updateScriptsButton = page.getByRole('button', { name: 'Update Scripts' })
        this.modalUpdateScriptsHeader = page.getByRole('heading', { name: 'Update Script List' })
        this.modalUpdateScriptsField = page.getByRole('textbox', { name: 'Script Names' })
        this.modalUpdateListButton = page.getByRole('button', { name: 'Update List' })

        this.miscellaneousCollection = page.getByRole('button', { name: 'Miscellaneous Scripts (1)' })
        this.miscellaneousCollectionScript = page.getByText('test', { exact: true })
        this.module1Collection = page.getByRole('button', { name: 'Module 1 (1)' })
        this.module1CollectionScript = page.getByText('1.0_forAutomationTest_succes')
        this.module2Collection = page.getByRole('button', { name: 'Module 2 (1)' })
        this.module2CollectionScript = page.getByText('2.0_forAutomationTest_succes')
        this.module3Collection = page.getByRole('button', { name: 'Module 3 (1)' })
        this.module3CollectionScript = page.getByText('3.0_forAutomationTest_sucess')
        this.module4Collection = page.getByRole('button', { name: 'Module 4 (1)' })
        this.module4CollectionScript = page.getByText('4.0_forAutomationTest_failed')

        this.successUpdateScriptsMessage = page.getByText('Scripts Updated')

        this.executeScript1Button = page.locator('#module-content-1').getByRole('button', { name: 'Executar' })
        this.executeScript1SuccessMessage = page.getByLabel('Notifications (F8)').getByText('1.0_forAutomationTest_succes')

        this.executeScript2Button = page.locator('#module-content-2').getByRole('button', { name: 'Executar' })
        this.executeScript2SuccessMessage = page.getByLabel('Notifications (F8)').getByText('2.0_forAutomationTest_succes')

        this.executeScript3Button = page.locator('#module-content-3').getByRole('button', { name: 'Executar' })
        this.executeScript3SuccessMessage = page.getByLabel('Notifications (F8)').getByText('3.0_forAutomationTest_sucess')

        this.executeScript4Button = page.locator('#module-content-4').getByRole('button', { name: 'Executar' })
        this.executeScript4SuccessMessage = page.getByLabel('Notifications (F8)').getByText('4.0_forAutomationTest_failed')
    }

    //Verify page opened
    async verifyScriptsHeader() {
        await expect(this.scriptsHeader).toBeVisible();
        console.log('Scripts header verified');
    }


    //Update scripts session
    async clickUpdateScriptsButton() {
        await this.updateScriptsButton.click();
        console.log('Update scripts button clicked');
    }

    async verifyModalUpdateScriptsHeader() {
        await expect(this.modalUpdateScriptsHeader).toBeVisible();
        console.log('Modal update scripts header verified');
    }

    async updateRamdomScript() {
        await this.modalUpdateScriptsField.fill('test');
        console.log('Scripts updated with random script');
    }

    async verifyRamdomScriptSaved() {
        const isExpanded =
            await this.miscellaneousCollection.getAttribute('aria-expanded');

        if (isExpanded !== 'true') {
            await this.miscellaneousCollection.click();
        }

        await expect(this.miscellaneousCollection).toHaveAttribute(
            'aria-expanded',
            'true'
        );

        await expect(this.miscellaneousCollectionScript).toBeVisible();

        console.log('Random script verified');
    }

    async updateAllScripts() {
        const scriptsList = [
            '1.0_forAutomationTest_succes',
            '2.0_forAutomationTest_succes',
            '3.0_forAutomationTest_sucess',
            '4.0_forAutomationTest_failed',
        ].join('\n');

        await this.modalUpdateScriptsField.fill(scriptsList);

        console.log('Scripts updated with all scripts');
    }

    async verifyAllScriptsSaved() {
        const isExpanded =
            await this.module1Collection.getAttribute('aria-expanded');

        if (isExpanded !== 'true') {
            await this.module1Collection.click();
        }

        await expect(this.module1Collection).toHaveAttribute(
            'aria-expanded',
            'true'
        );

        await expect(this.module1CollectionScript).toBeVisible();

        console.log('Module 1 and Script 1 verified');

        const isExpanded2 =
            await this.module2Collection.getAttribute('aria-expanded');

        if (isExpanded2 !== 'true') {
            await this.module2Collection.click();
        }

        await expect(this.module2Collection).toHaveAttribute(
            'aria-expanded',
            'true'
        );

        await expect(this.module2CollectionScript).toBeVisible();

        console.log('Module 2 and Script 2 verified');

        const isExpanded3 =
            await this.module3Collection.getAttribute('aria-expanded');

        if (isExpanded3 !== 'true') {
            await this.module3Collection.click();
        }

        await expect(this.module3Collection).toHaveAttribute(
            'aria-expanded',
            'true'
        );

        await expect(this.module3CollectionScript).toBeVisible();

        console.log('Module 3 and Script 3 verified');

        const isExpanded4 =
            await this.module4Collection.getAttribute('aria-expanded');

        if (isExpanded4 !== 'true') {
            await this.module4Collection.click();
        }

        await expect(this.module4Collection).toHaveAttribute(
            'aria-expanded',
            'true'
        );

        await expect(this.module4CollectionScript).toBeVisible();

        console.log('Module 4 and Script 4 verified');
    }

    async clickUpdateListButton() {
        await this.modalUpdateListButton.click();
        console.log('Update list button clicked');
    }

    async verifySuccessUpdateScriptsMessage() {
        await this.page.waitForTimeout(1000);
        await expect(this.successUpdateScriptsMessage).toBeVisible();
        console.log('Success update scripts message verified');
    }

    //Reset scripts session
    async resetAllScripts() {
        await this.resetAllButton.click();
        console.log('Clicking reset all button');
        await this.page.waitForTimeout(1000);
    }

    async verifySuccessResetScriptsMessage() {
        await expect(this.successResetScriptsMessage).toBeVisible();
        await expect(this.successResetScriptsMessage).toBeHidden();
        console.log('Success reset scripts message verified');
    }

    //Execute scripts
    async executeScript1() {
        await this.executeScript1Button.click();
        console.log('Execute script 1 button clicked');
        await this.page.waitForTimeout(1000);
        await expect(this.executeScript1SuccessMessage).toBeVisible();
        await expect(this.executeScript1SuccessMessage).toBeHidden();
        console.log('Success execute script 1 message verified');
    }

    async executeScript2() {
        await this.executeScript2Button.click();
        console.log('Execute script 2 button clicked');
        await this.page.waitForTimeout(1000);
        await expect(this.executeScript2SuccessMessage).toBeVisible();
        await expect(this.executeScript2SuccessMessage).toBeHidden();
        console.log('Success execute script 2 message verified');
    }

    async executeScript3() {
        await this.executeScript3Button.click();
        console.log('Execute script 3 button clicked');
        await this.page.waitForTimeout(1000);
        await expect(this.executeScript3SuccessMessage).toBeVisible();
        await expect(this.executeScript3SuccessMessage).toBeHidden();
        console.log('Success execute script 3 message verified');
    }

    async executeScript4() {
        await this.executeScript4Button.click();
        console.log('Execute script 4 button clicked');
        await this.page.waitForTimeout(1000);
        await expect(this.executeScript4SuccessMessage).toBeVisible();
        await expect(this.executeScript4SuccessMessage).toBeHidden();
        console.log('Success execute script 4 message verified');
    }



}

export { ScriptsPage };
