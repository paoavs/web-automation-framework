import { Page } from '@playwright/test';
import { Stagehand } from '@browserbasehq/stagehand';
import { CartLocators } from '../locators/cart.locators.js';
import { smartClick } from '../helpers/smart-action.helper.js';

export class CartPage {
  constructor(private page: Page, private sh?: Stagehand | null) {}

  get url(): string {
    return this.page.url();
  }

  async open(): Promise<void> {
    await smartClick(this.page, CartLocators.cartIcon, 'click the cart icon', this.sh);
    await this.page.waitForSelector(CartLocators.cartTitle);
  }

  async getBadgeCount(): Promise<number> {
    const badge = this.page.locator(CartLocators.cartBadge);
    if (!(await badge.isVisible())) return 0;
    return parseInt(await badge.textContent() ?? '0', 10);
  }

  async getItemNames(): Promise<string[]> {
    return this.page.locator(`${CartLocators.cartItems} ${CartLocators.cartItemName}`).allTextContents();
  }

  async getItemCount(): Promise<number> {
    return this.page.locator(CartLocators.cartItems).count();
  }

  async isQtyEditable(): Promise<boolean> {
    const inputs = await this.page.locator(`${CartLocators.cartItemQty} input`).count();
    return inputs > 0;
  }

  async removeItem(removeLocator: string, productName: string): Promise<void> {
    await smartClick(
      this.page,
      removeLocator,
      `click Remove button for ${productName}`,
      this.sh,
    );
  }

  async continueShopping(): Promise<void> {
    await smartClick(
      this.page,
      CartLocators.continueShoppingButton,
      'click the Continue Shopping button',
      this.sh,
    );
  }

  async proceedToCheckout(): Promise<void> {
    await smartClick(
      this.page,
      CartLocators.checkoutButton,
      'click the Checkout button',
      this.sh,
    );
  }
}
