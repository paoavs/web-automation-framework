import { test, expect } from '../src/fixtures/stagehand.fixture.js';
import { InventoryLocators } from '../src/locators/inventory.locators.js';
import { PRODUCTS } from '../src/data/users.js';

test.describe('CART — Shopping Cart', () => {

  test('TC-CART-001 | Adding a product updates the cart badge', async ({ pages }) => {
    await pages.inventoryPage.addToCart(InventoryLocators.addToCartBackpack, PRODUCTS.backpack.name);
    expect(await pages.cartPage.getBadgeCount()).toBe(1);
  });

  test('TC-CART-002 | Adding multiple products reflects correct badge count', async ({ pages }) => {
    await pages.inventoryPage.addToCart(InventoryLocators.addToCartBackpack, PRODUCTS.backpack.name);
    await pages.inventoryPage.addToCart(InventoryLocators.addToCartBikeLight, PRODUCTS.bikeLight.name);
    await pages.inventoryPage.addToCart(InventoryLocators.addToCartBoltTshirt, PRODUCTS.boltTshirt.name);
    expect(await pages.cartPage.getBadgeCount()).toBe(3);
  });

  test('TC-CART-003 | Add product from product detail page', async ({ pages }) => {
    await pages.inventoryPage.openProductDetail(PRODUCTS.fleeceJacket.name);
    await pages.inventoryPage.addToCartFromDetailPage();
    expect(await pages.cartPage.getBadgeCount()).toBe(1);
  });

  test('TC-CART-004 | Removing a product decrements the badge', async ({ pages }) => {
    await pages.inventoryPage.addToCart(InventoryLocators.addToCartBackpack, PRODUCTS.backpack.name);
    await pages.inventoryPage.addToCart(InventoryLocators.addToCartBikeLight, PRODUCTS.bikeLight.name);
    await pages.inventoryPage.removeFromCart(InventoryLocators.removeBackpack, PRODUCTS.backpack.name);
    expect(await pages.cartPage.getBadgeCount()).toBe(1);
  });

  test('TC-CART-005 | Cart persists when navigating between pages', async ({ pages }) => {
    await pages.inventoryPage.addToCart(InventoryLocators.addToCartBackpack, PRODUCTS.backpack.name);
    await pages.inventoryPage.addToCart(InventoryLocators.addToCartBikeLight, PRODUCTS.bikeLight.name);
    await pages.inventoryPage.openProductDetail(PRODUCTS.backpack.name);
    await pages.inventoryPage.backToProducts();
    expect(await pages.cartPage.getBadgeCount()).toBe(2);
  });

  test('TC-CART-006 | Cart QTY field is display-only', async ({ pages }) => {
    await pages.inventoryPage.addToCart(InventoryLocators.addToCartBackpack, PRODUCTS.backpack.name);
    await pages.cartPage.open();
    expect(await pages.cartPage.isQtyEditable()).toBe(false);
  });

  test('TC-CART-007 | Continue Shopping returns to inventory with cart intact', async ({ pages }) => {
    await pages.inventoryPage.addToCart(InventoryLocators.addToCartBackpack, PRODUCTS.backpack.name);
    await pages.cartPage.open();
    await pages.cartPage.continueShopping();
    expect(pages.cartPage.url).toContain('inventory');
    expect(await pages.cartPage.getBadgeCount()).toBe(1);
  });

});
