import { expect } from '@playwright/test';

class LoginPage {
    constructor(page) {
        this.page = page;
        this.emailInput = page.getByRole('textbox', { name: 'E-mail' })
        this.passwordInput = page.getByRole('textbox', { name: 'Senha' })
        this.loginButton = page.getByRole('button', { name: 'Entrar' })
        this.scriptsHeader = page.getByRole('heading', { name: 'Scripts', exact: true });

    }

    async acess() {
        await this.page.goto('https://marvin-script-runner.web.app/login');
    }

    async login(email, password) {
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);

        await Promise.all([
            this.loginButton.click(),
            this.scriptsHeader.waitFor({ state: 'visible' }),
        ]);
    }

    async verifyScriptsHeader() {
        await expect(this.scriptsHeader).toBeVisible();
    }


    async verifyErrorMessage() {
        await expect(this.page.getByText('Firebase: Error (auth/wrong-')).toBeVisible();
    }


}
export { LoginPage };