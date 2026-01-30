import { expect } from '@playwright/test';

class SettingsModal {
    constructor(page) {
        this.page = page;
        this.header = page.getByRole('textbox', { name: 'Robot Name' })
        this.robotNameInput = page.getByRole('textbox', { name: 'Robot Name' })
        this.robotKeyInput = page.getByRole('textbox', { name: 'Robot Key' })
        this.robotSecretInput = page.getByRole('textbox', { name: 'Robot Secret' })
        this.tokenInput = page.getByRole('textbox', { name: 'Boty Token' })
        this.saveButton = page.getByRole('button', { name: 'Save changes' })
        this.successMessage = page.getByText('Settings Saved')
    }

    async verifyHeader() {
        await expect(this.header).toBeVisible();
        console.log('Header verified');
    }

    async clearFields() {
        await this.robotNameInput.clear();
        await this.robotKeyInput.clear();
        await this.robotSecretInput.clear();
        await this.tokenInput.clear();
        console.log('Fields cleared');
    }

    async verifiyEmptyFields() {
        await expect(this.robotNameInput).toHaveValue('');
        await expect(this.robotKeyInput).toHaveValue('');
        await expect(this.robotSecretInput).toHaveValue('');
        await expect(this.tokenInput).toHaveValue('');
        console.log('Empty fields verified');
    }

    async updateConfigs(robotName, robotKey, robotSecret, token) {
        await this.robotNameInput.fill(robotName);
        await this.robotKeyInput.fill(robotKey);
        await this.robotSecretInput.fill(robotSecret);
        await this.tokenInput.fill(token);
        console.log('Fields updated');
    }

    async verifyUpdatedConfigs(robotName, robotKey, robotSecret, token) {
        await expect(this.robotNameInput).toHaveValue(robotName);
        await expect(this.robotKeyInput).toHaveValue(robotKey);
        await expect(this.robotSecretInput).toHaveValue(robotSecret);
        await expect(this.tokenInput).toHaveValue(token);
        console.log('Updated fields verified');
    }

    async clickSaveButton() {
        await this.saveButton.click();
        console.log('Save button clicked');
        await this.page.waitForTimeout(1000);
        await expect(this.successMessage).toBeVisible();
        console.log('Success message verified');
    }

}

export { SettingsModal };