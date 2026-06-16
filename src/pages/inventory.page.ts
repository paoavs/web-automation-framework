import { Page } from '@playwright/test';
import { Stagehand } from '@browserbasehq/stagehand';
import { InventoryLocators, SortOptions, ProductDetailLocators } from '../locators/inventory.locators.js';
import { smartClick, smartIsVisible } from '../helpers/smart-action.helper.js';

export class InventoryPage {
  constructor(private page: Page, private sh?: Stagehand | null) {}

  async getProductCount(): Promise<number> {
    return this.page.locator(InventoryLocators.productItems).count();
  }

  async getProductNames(): Promise<string[]> {
    return this.page.locator(InventoryLocators.productName).allTextContents();
  }

  async getProductPrices(): Promise<number[]> {
    const texts = await this.page.locator(InventoryLocators.productPrice).allTextContents();
    return texts.map(p => parseFloat(p.replace('$', '')));
  }

  async sortBy(option: keyof typeof SortOptions): Promise<void> {
    await this.page.locator(InventoryLocators.sortDropdown).selectOption(SortOptions[option]);
  }

  async addToCart(addButtonLocator: string, productName: string): Promise<void> {
    await smartClick(
      this.page,
      addButtonLocator,
      `click the Add to cart button for ${productName}`,
      this.sh,
    );
  }

  async removeFromCart(removeButtonLocator: string, productName: string): Promise<void> {
    await smartClick(
      this.page,
      removeButtonLocator,
      `click the Remove button for ${productName}`,
      this.sh,
    );
  }

  async openProductDetail(productName: string): Promise<void> {
    await smartClick(
      this.page,
      `${InventoryLocators.productName}:has-text("${productName}")`,
      `click on the product named ${productName}`,
      this.sh,
    );
  }

  async backToProducts(): Promise<void> {
    await smartClick(
      this.page,
      ProductDetailLocators.backButton,
      'click the Back to products button',
      this.sh,
    );
  }

  async isProductDetailVisible(): Promise<boolean> {
    return smartIsVisible(
      this.page,
      ProductDetailLocators.productName,
      'is the product detail page visible with a product name?',
      this.sh,
    );
  }

  async getProductImages(): Promise<string[]> {
    return this.page.locator(InventoryLocators.productImage)
      .evaluateAll((imgs: HTMLImageElement[]) => imgs.map(i => i.getAttribute('src') ?? ''));
  }

  async isInventoryListVisible(): Promise<boolean> {
    return this.page.locator(InventoryLocators.productList).isVisible();
  }

  async waitForInventoryList(): Promise<void> {
    await this.page.waitForSelector(InventoryLocators.productList);
  }

  async addToCartFromDetailPage(): Promise<void> {
    await smartClick(
      this.page,
      ProductDetailLocators.addToCart,
      'click the Add to cart button on the product detail page',
      this.sh,
    );
  }

  async isProductDetailComplete(): Promise<boolean> {
    const backBtn = await this.page.locator(ProductDetailLocators.backButton).isVisible().catch(() => false);
    const price = await this.page.locator(ProductDetailLocators.productPrice).isVisible().catch(() => false);
    const addBtn = await this.page.locator(ProductDetailLocators.addToCart).isVisible().catch(() => false);
    return backBtn && price && addBtn;
  }
}
