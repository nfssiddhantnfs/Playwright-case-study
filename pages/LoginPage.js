import { expect } from "@playwright/test";

export class LoginPage {
  constructor(page) {
    this.page = page;
    this.usernameInput = page.locator('#userName');
    this.passwordInput = page.locator('#password');
    this.loginButton = page.locator('#login');
    this.userNameDisplay = page.locator('#userName-value');
    this.logoutButton = page.getByRole('button', { name: /log\s*out/i });
  }

  // Login with credentials
  async login(username, password) {
    await this.page.locator('#login').first().click();
    await this.page.waitForSelector('#userName');
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
    await this.page.waitForURL('**/profile');
  }

  // Validate login success
  async validateLogin(expectedUser) {
    await expect(this.userNameDisplay).toBeVisible();
    await expect(this.userNameDisplay).toContainText(expectedUser);
    await expect(this.logoutButton).toBeVisible();
  }

  // Logout
  async logout() {
    await this.logoutButton.click();
  }
}