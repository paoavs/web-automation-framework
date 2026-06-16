import { test, expect } from '../src/fixtures/stagehand.fixture.js';
import { InventoryLocators } from '../src/locators/inventory.locators.js';
import { PRODUCTS, CHECKOUT_DATA } from '../src/data/users.js';

test.describe('CHECKOUT — Purchase Flow', () => {

  test.beforeEach(async ({ pages }) => {
    await pages.inventoryPage.addToCart(InventoryLocators.addToCartBackpack, PRODUCTS.backpack.name);
    await pages.cartPage.open();
    await pages.cartPage.proceedToCheckout();
  });

  test('TC-CHK-001 | Complete checkout happy path', async ({ pages }) => {
    await pages.checkoutPage.fillCustomerInfo(CHECKOUT_DATA.valid);
    await pages.checkoutPage.continue();
    await pages.checkoutPage.finish();
    expect(await pages.checkoutPage.getConfirmationHeader()).toContain('Thank you for your order');
  });

  test('TC-CHK-002 | Overview shows correct payment and shipping info', async ({ pages }) => {
    await pages.checkoutPage.fillCustomerInfo(CHECKOUT_DATA.valid);
    await pages.checkoutPage.continue();
    expect(await pages.checkoutPage.getPaymentInfo()).toContain('SauceCard #31337');
    expect(await pages.checkoutPage.getShippingInfo()).toContain('Free Pony Express Delivery');
  });

  test('TC-CHK-003 | Order total calculation is correct', async ({ pages }) => {
    // beforeEach added backpack → cancel → back to cart → add bike light → re-enter checkout
    await pages.checkoutPage.cancel();
    await pages.cartPage.continueShopping();
    await pages.inventoryPage.addToCart(InventoryLocators.addToCartBikeLight, PRODUCTS.bikeLight.name);
    await pages.cartPage.open();
    await pages.cartPage.proceedToCheckout();
    await pages.checkoutPage.fillCustomerInfo(CHECKOUT_DATA.valid);
    await pages.checkoutPage.continue();

    const { subtotal, tax, total } = await pages.checkoutPage.getPriceSummary();
    expect(subtotal).toBeCloseTo(PRODUCTS.backpack.price + PRODUCTS.bikeLight.price, 2);
    expect(total).toBeCloseTo(subtotal + tax, 2);
  });

  test('TC-CHK-004 | Empty First Name blocks proceeding', async ({ pages }) => {
    await pages.checkoutPage.fillCustomerInfo(CHECKOUT_DATA.missingFirst);
    await pages.checkoutPage.continue();
    expect(await pages.checkoutPage.getValidationError()).toContain('First Name is required');
    expect(pages.checkoutPage.url).toContain('checkout-step-one');
  });

  test('TC-CHK-005 | Empty Last Name blocks proceeding', async ({ pages }) => {
    await pages.checkoutPage.fillCustomerInfo(CHECKOUT_DATA.missingLast);
    await pages.checkoutPage.continue();
    expect(await pages.checkoutPage.getValidationError()).toContain('Last Name is required');
    expect(pages.checkoutPage.url).toContain('checkout-step-one');
  });

  test('TC-CHK-006 | Empty Postal Code blocks proceeding', async ({ pages }) => {
    await pages.checkoutPage.fillCustomerInfo(CHECKOUT_DATA.missingZip);
    await pages.checkoutPage.continue();
    expect(await pages.checkoutPage.getValidationError()).toContain('Postal Code is required');
  });

  test('TC-CHK-007 | Cancel at Step 1 returns to cart with items intact', async ({ pages }) => {
    await pages.checkoutPage.cancel();
    expect(pages.checkoutPage.url).toContain('cart');
    expect(await pages.cartPage.getItemCount()).toBe(1);
  });

  test('TC-CHK-008 | Cancel at Step 2 returns to inventory', async ({ pages }) => {
    await pages.checkoutPage.fillCustomerInfo(CHECKOUT_DATA.valid);
    await pages.checkoutPage.continue();
    await pages.checkoutPage.cancel();
    expect(pages.checkoutPage.url).toContain('inventory');
    expect(await pages.cartPage.getBadgeCount()).toBe(1);
  });

  test('TC-CHK-009 | Cart is empty after completing order', async ({ pages }) => {
    await pages.checkoutPage.fillCustomerInfo(CHECKOUT_DATA.valid);
    await pages.checkoutPage.continue();
    await pages.checkoutPage.finish();
    await pages.checkoutPage.backHome();
    expect(await pages.cartPage.getBadgeCount()).toBe(0);
  });

  test.fail('TC-CHK-010 | BUG — Checkout allowed with empty cart', async ({ pages }) => {
    // Cancel current checkout, remove item from cart, try to checkout again
    await pages.checkoutPage.cancel();
    await pages.cartPage.removeItem('[data-test="remove-sauce-labs-backpack"]', PRODUCTS.backpack.name);
    await pages.cartPage.proceedToCheckout();
    // Should NOT be on checkout-step-one with empty cart
    expect(pages.checkoutPage.url).not.toContain('checkout-step-one');
  });

});
