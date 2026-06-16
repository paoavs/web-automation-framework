import { test as base, expect, Page } from '@playwright/test';
import { Stagehand } from '@browserbasehq/stagehand';
import { LoginPage } from '../pages/login.page.js';
import { InventoryPage } from '../pages/inventory.page.js';
import { CartPage } from '../pages/cart.page.js';
import { CheckoutPage } from '../pages/checkout.page.js';
import { NavigationPage } from '../pages/navigation.page.js';
import { USERS } from '../data/users.js';

const AI_ENABLED = !!process.env.ANTHROPIC_API_KEY;

export type Pages = {
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
  navigationPage: NavigationPage;
};

export type UnifiedFixtures = {
  activePage: Page;
  sh: Stagehand | null;
  pages: Pages;
};

export const test = base.extend<UnifiedFixtures>({
  activePage: async ({ browser }, use, testInfo) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await use(page);
    if (testInfo.status !== testInfo.expectedStatus) {
      const path = `screenshots/bugs/${testInfo.title.replace(/\s+/g, '-')}.png`;
      await page.screenshot({ path, fullPage: true });
      await testInfo.attach('failure-screenshot', { path, contentType: 'image/png' });
    }
    await context.close();
  },

  sh: async ({}, use) => {
    if (!AI_ENABLED) {
      console.log('  ⚡ Playwright mode (no ANTHROPIC_API_KEY)');
      await use(null);
      return;
    }

    console.log('  🤖 Stagehand AI mode');
    const stagehand = new Stagehand({
      env: 'LOCAL',
      model: {
        modelName: 'claude-sonnet-4-6',
        apiKey: process.env.ANTHROPIC_API_KEY,
      },
      verbose: 0,
    });
    await stagehand.init();
    await use(stagehand);
    await stagehand.close();
  },

  pages: async ({ activePage, sh }, use) => {
    // Always use the Playwright page — Stagehand acts on it via options.page in smart-action helpers
    const page = activePage;
    const shInstance = sh ?? null;

    const loginPage = new LoginPage(page, shInstance);
    const inventoryPage = new InventoryPage(page, shInstance);
    const cartPage = new CartPage(page, shInstance);
    const checkoutPage = new CheckoutPage(page, shInstance);
    const navigationPage = new NavigationPage(page, shInstance);

    // beforeEach: login + reset state
    await loginPage.login(USERS.standard.username, USERS.standard.password);
    await page.waitForSelector('.inventory_list', { timeout: 10_000 });
    await navigationPage.resetAppState();

    await use({ loginPage, inventoryPage, cartPage, checkoutPage, navigationPage });
  },
});

export { expect };
