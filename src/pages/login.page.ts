import { Page, expect } from '@playwright/test';
import { Stagehand } from '@browserbasehq/stagehand';
import { AuthLocators } from '../locators/auth.locators.js';
import { smartClick, smartFill, smartGetText } from '../helpers/smart-action.helper.js';

export class LoginPage {
  constructor(private page: Page, private sh?: Stagehand | null) {}

  get url(): string {
    return this.page.url();
  }

  async navigate(): Promise<void> {
    await this.page.goto('/');
  }

  async navigateTo(path: string): Promise<void> {
    await this.page.goto(path);
  }

  async login(username: string, password: string): Promise<void> {
    await this.navigate();
    await smartFill(this.page, AuthLocators.usernameInput, username, 'type the username in the username field', this.sh);
    await smartFill(this.page, AuthLocators.passwordInput, password, 'type the password in the password field', this.sh);
    await smartClick(this.page, AuthLocators.loginButton, 'click the Login button', this.sh);
  }

  async fillUsername(value: string): Promise<void> {
    await this.page.fill(AuthLocators.usernameInput, value);
  }

  async fillPassword(value: string): Promise<void> {
    await this.page.fill(AuthLocators.passwordInput, value);
  }

  async clickSubmit(): Promise<void> {
    await this.page.click(AuthLocators.loginButton);
  }

  async waitForInventory(): Promise<void> {
    await this.page.waitForSelector('.inventory_list');
  }

  async getErrorMessage(): Promise<string> {
    return smartGetText(this.page, AuthLocators.errorMessage, 'get the error message text shown on the login page', this.sh);
  }

  async isOnLoginPage(): Promise<boolean> {
    return this.page.locator(AuthLocators.loginButton).isVisible();
  }
}
