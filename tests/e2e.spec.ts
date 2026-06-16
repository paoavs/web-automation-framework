import { test, expect } from '../src/fixtures/stagehand.fixture.js';
import { InventoryLocators } from '../src/locators/inventory.locators.js';
import { PRODUCTS, CHECKOUT_DATA } from '../src/data/users.js';

/**
 * TC-E2E-001 — Critical purchase path
 *
 * Tests the complete user journey in a single test body so the full flow is
 * visible and traceable: browse → sort → add multiple items → view cart →
 * fill checkout form → verify overview → complete order → cart cleared.
 *
 * This is intentionally a wide test. Unit-style tests in auth/cart/checkout
 * cover individual behaviours; this test proves they integrate correctly
 * end-to-end and serves as a smoke regression.
 */
test.describe('E2E — Critical Path', () => {

  test('TC-E2E-001 | Complete purchase journey: browse → cart → checkout → confirmation', async ({ pages }) => {
    // ── 1. Fixture logged in as standard_user → already on inventory ──
    expect(await pages.inventoryPage.isInventoryListVisible()).toBe(true);
    expect(await pages.inventoryPage.getProductCount()).toBe(6);

    // ── 2. Browse: sort by price low → high ──────────────────────────
    await pages.inventoryPage.sortBy('priceLowHigh');
    const prices = await pages.inventoryPage.getProductPrices();
    expect(prices[0]).toBeLessThanOrEqual(prices[prices.length - 1]);

    // ── 3. Add two products from the inventory ────────────────────────
    await pages.inventoryPage.addToCart(InventoryLocators.addToCartOnesie, PRODUCTS.onesie.name);
    expect(await pages.cartPage.getBadgeCount()).toBe(1);

    await pages.inventoryPage.addToCart(InventoryLocators.addToCartBackpack, PRODUCTS.backpack.name);
    expect(await pages.cartPage.getBadgeCount()).toBe(2);

    // ── 4. Open cart and verify contents ─────────────────────────────
    await pages.cartPage.open();
    expect(await pages.cartPage.getItemCount()).toBe(2);

    const cartItems = await pages.cartPage.getItemNames();
    expect(cartItems).toContain(PRODUCTS.onesie.name);
    expect(cartItems).toContain(PRODUCTS.backpack.name);

    // ── 5. Proceed to checkout and fill customer info ─────────────────
    await pages.cartPage.proceedToCheckout();
    await pages.checkoutPage.fillCustomerInfo(CHECKOUT_DATA.valid);
    await pages.checkoutPage.continue();

    // ── 6. Verify order overview ──────────────────────────────────────
    expect(await pages.checkoutPage.getPaymentInfo()).toContain('SauceCard #31337');
    expect(await pages.checkoutPage.getShippingInfo()).toContain('Free Pony Express Delivery');

    const { subtotal, tax, total } = await pages.checkoutPage.getPriceSummary();
    expect(subtotal).toBeCloseTo(PRODUCTS.onesie.price + PRODUCTS.backpack.price, 2);
    expect(total).toBeCloseTo(subtotal + tax, 2);

    // ── 7. Complete the order ─────────────────────────────────────────
    await pages.checkoutPage.finish();
    expect(await pages.checkoutPage.getConfirmationHeader()).toContain('Thank you for your order');

    // ── 8. Return home — cart must be empty ───────────────────────────
    await pages.checkoutPage.backHome();
    expect(await pages.cartPage.getBadgeCount()).toBe(0);
    expect(await pages.inventoryPage.isInventoryListVisible()).toBe(true);
  });

});
