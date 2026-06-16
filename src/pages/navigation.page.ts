import { Page } from '@playwright/test';
import { Stagehand } from '@browserbasehq/stagehand';
import { NavigationLocators } from '../locators/navigation.locators.js';
import { smartClick } from '../helpers/smart-action.helper.js';

export class NavigationPage {
  constructor(private page: Page, private sh?: Stagehand | null) {}

  async openMenu(): Promise<void> {
    await smartClick(this.page, NavigationLocators.menuButton, 'click the hamburger menu button', this.sh);
    await this.page.waitForSelector(NavigationLocators.allItemsLink, { state: 'visible' });
  }

  async closeMenu(): Promise<void> {
    await this.page.keyboard.press('Escape');
    await this.page.waitForTimeout(400);
  }

  async logout(): Promise<void> {
    await this.openMenu();
    await smartClick(this.page, NavigationLocators.logoutLink, 'click Logout in the menu', this.sh);
    await this.page.waitForURL('/');
  }

  async resetAppState(): Promise<void> {
    await this.openMenu();
    await smartClick(this.page, NavigationLocators.resetAppStateLink, 'click Reset App State in the menu', this.sh);
    await this.closeMenu();
  }

  async goToAllItems(): Promise<void> {
    await this.openMenu();
    await smartClick(this.page, NavigationLocators.allItemsLink, 'click All Items in the menu', this.sh);
  }

  async getMenuItems(): Promise<string[]> {
    await this.openMenu();
    const items = await this.page.locator('.bm-item').allTextContents();
    await this.closeMenu();
    return items.map(i => i.trim()).filter(Boolean);
  }

  async isFooterVisible(): Promise<boolean> {
    const twitter = await this.page.locator(NavigationLocators.twitterLink).isVisible().catch(() => false);
    const facebook = await this.page.locator(NavigationLocators.facebookLink).isVisible().catch(() => false);
    const linkedin = await this.page.locator(NavigationLocators.linkedinLink).isVisible().catch(() => false);
    return twitter && facebook && linkedin;
  }
}
