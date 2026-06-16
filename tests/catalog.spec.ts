import { test, expect } from '../src/fixtures/stagehand.fixture.js';
import { USERS } from '../src/data/users.js';

test.describe('CATALOG — Product Inventory', () => {

  test('TC-CAT-001 | Inventory displays exactly 6 products', async ({ pages }) => {
    expect(await pages.inventoryPage.getProductCount()).toBe(6);
  });

  test('TC-CAT-002 | Sort by Price low to high', async ({ pages }) => {
    await pages.inventoryPage.sortBy('priceLowHigh');
    const prices = await pages.inventoryPage.getProductPrices();
    const isSorted = prices.every((v, i, a) => i === 0 || a[i - 1] <= v);
    expect(isSorted).toBe(true);
  });

  test('TC-CAT-003 | Sort by Price high to low', async ({ pages }) => {
    await pages.inventoryPage.sortBy('priceHighLow');
    const prices = await pages.inventoryPage.getProductPrices();
    const isSorted = prices.every((v, i, a) => i === 0 || a[i - 1] >= v);
    expect(isSorted).toBe(true);
  });

  test('TC-CAT-004 | Sort by Name Z to A', async ({ pages }) => {
    await pages.inventoryPage.sortBy('nameZA');
    const names = await pages.inventoryPage.getProductNames();
    const isSorted = names.every((v, i, a) => i === 0 || a[i - 1] >= v);
    expect(isSorted).toBe(true);
  });

  test('TC-CAT-005 | Product detail page has all required elements', async ({ pages }) => {
    await pages.inventoryPage.openProductDetail('Sauce Labs Backpack');
    expect(await pages.inventoryPage.isProductDetailVisible()).toBe(true);
    expect(await pages.inventoryPage.isProductDetailComplete()).toBe(true);
  });

  test.fail('TC-USR-001 | BUG — problem_user: all product images broken', async ({ pages }) => {
    await pages.loginPage.login(USERS.problem.username, USERS.problem.password);
    await pages.inventoryPage.waitForInventoryList();
    const images = await pages.inventoryPage.getProductImages();
    const brokenCount = images.filter(src => src.includes('sl-404')).length;
    // This test INTENTIONALLY fails to document the bug
    expect(brokenCount, `${brokenCount}/6 product images are broken for problem_user`).toBe(0);
  });

  test.fail('TC-USR-002 | BUG — performance_glitch_user: login takes too long', async ({ pages }) => {
    await pages.loginPage.navigate();
    const start = Date.now();
    await pages.loginPage.login(USERS.performance.username, USERS.performance.password);
    await pages.inventoryPage.waitForInventoryList();
    const elapsed = Date.now() - start;
    // Acceptable threshold: 2s. Intentionally fails to document the bug
    expect(elapsed, `Login took ${elapsed}ms — expected under 2000ms`).toBeLessThan(2000);
  });

});
