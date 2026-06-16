import { test, expect } from '../src/fixtures/stagehand.fixture.js';
import { USERS } from '../src/data/users.js';

test.describe('AUTH — Authentication', () => {

  test('TC-AUTH-001 | Successful login with standard_user', async ({ pages }) => {
    // beforeEach in fixture already logged in and on inventory page
    expect(await pages.inventoryPage.isInventoryListVisible()).toBe(true);
  });

  test('TC-AUTH-002 | Locked out user sees correct error', async ({ pages }) => {
    await pages.loginPage.login(USERS.locked.username, USERS.locked.password);
    const error = await pages.loginPage.getErrorMessage();
    expect(error).toContain('locked out');
  });

  test('TC-AUTH-003 | Invalid credentials show error', async ({ pages }) => {
    await pages.loginPage.login('invalid_user', 'wrongpass');
    const error = await pages.loginPage.getErrorMessage();
    expect(error).toContain('do not match');
  });

  test('TC-AUTH-004 | Empty username shows validation error', async ({ pages }) => {
    await pages.loginPage.navigate();
    await pages.loginPage.fillPassword('anypass');
    await pages.loginPage.clickSubmit();
    expect(await pages.loginPage.getErrorMessage()).toContain('Username is required');
  });

  test('TC-AUTH-005 | Empty password shows validation error', async ({ pages }) => {
    await pages.loginPage.navigate();
    await pages.loginPage.fillUsername(USERS.standard.username);
    await pages.loginPage.clickSubmit();
    expect(await pages.loginPage.getErrorMessage()).toContain('Password is required');
  });

  test('TC-AUTH-006 | Logout ends session and redirects to login', async ({ pages }) => {
    await pages.navigationPage.logout();
    expect(await pages.loginPage.isOnLoginPage()).toBe(true);
  });

  test('TC-AUTH-007 | Direct URL access without session is blocked', async ({ pages }) => {
    await pages.navigationPage.logout();
    await pages.loginPage.navigateTo('/inventory.html');
    expect(pages.loginPage.url).not.toContain('inventory');
    expect(await pages.loginPage.isOnLoginPage()).toBe(true);
  });

});
