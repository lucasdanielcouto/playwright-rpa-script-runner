import { expect } from '@playwright/test';

class MainPage {
    constructor(page) {
        this.page = page;
        this.settingsButton = page.locator('button:has(svg.lucide-settings)');
        this.scriptsButton = page.getByRole('button', { name: 'Scripts' })
    }

    async clickSettingsButton() {
        await this.settingsButton.click();
        console.log('Settings button clicked');
    }

    async clickScriptsButton() {
        await this.scriptsButton.click();
        console.log('Scripts button clicked');
    }
}

export { MainPage };