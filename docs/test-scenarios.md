# Test Scenarios — Swag Labs (SauceDemo)

**Application:** Swag Labs — https://www.saucedemo.com  
**Date:** 2026-06-14  
**Tester:** QA Engineer  

---

## Severity & Priority Reference

| Level | Severity | Priority |
|-------|----------|----------|
| Critical / P1 | App unusable, data loss, security breach | Fix immediately |
| High / P2 | Core feature broken, no workaround | Fix this sprint |
| Medium / P3 | Feature partially broken, workaround exists | Fix next sprint |
| Low / P4 | Cosmetic, typo, minor UX | Backlog |

> **Severity** = technical impact on the system (defined by QA)  
> **Priority** = business urgency to fix (defined by Product/PM)

---

## Module: AUTH — Authentication

---

### TC-AUTH-001 — Successful login with valid credentials
- **Type:** Functional (Happy Path)
- **Severity:** Critical | **Priority:** P1
- **Preconditions:** User is on the login page, not logged in
- **Steps:**
  1. Enter username: `standard_user`
  2. Enter password: `secret_sauce`
  3. Click "Login"
- **Expected Result:** User is redirected to `/inventory.html`. All 6 products are visible. Header shows "Swag Labs"

---

### TC-AUTH-002 — Login with locked out user
- **Type:** Negative
- **Severity:** High | **Priority:** P2
- **Preconditions:** User is on the login page
- **Steps:**
  1. Enter username: `locked_out_user`
  2. Enter password: `secret_sauce`
  3. Click "Login"
- **Expected Result:** Error message displayed: *"Epic sadface: Sorry, this user has been locked out."* User remains on login page

---

### TC-AUTH-003 — Login with invalid credentials
- **Type:** Negative
- **Severity:** High | **Priority:** P1
- **Preconditions:** User is on the login page
- **Steps:**
  1. Enter username: `wrong_user`
  2. Enter password: `wrongpassword`
  3. Click "Login"
- **Expected Result:** Error: *"Epic sadface: Username and password do not match any user in this service"*. No redirect

---

### TC-AUTH-004 — Login with empty username
- **Type:** Negative / Edge Case
- **Severity:** High | **Priority:** P1
- **Steps:**
  1. Leave username empty
  2. Enter any password
  3. Click "Login"
- **Expected Result:** Validation error: *"Epic sadface: Username is required"*

---

### TC-AUTH-005 — Login with empty password
- **Type:** Negative / Edge Case
- **Severity:** High | **Priority:** P1
- **Steps:**
  1. Enter username: `standard_user`
  2. Leave password empty
  3. Click "Login"
- **Expected Result:** Validation error: *"Epic sadface: Password is required"*

---

### TC-AUTH-006 — Successful logout
- **Type:** Functional
- **Severity:** High | **Priority:** P1
- **Preconditions:** Logged in as `standard_user`
- **Steps:**
  1. Click hamburger menu (top left)
  2. Click "Logout"
- **Expected Result:** Session ends. User is redirected to login page. Cannot access inventory without logging in again

---

### TC-AUTH-007 — Access protected page without session (direct URL)
- **Type:** Security
- **Severity:** Critical | **Priority:** P1
- **Preconditions:** User is NOT logged in
- **Steps:**
  1. Navigate directly to `https://www.saucedemo.com/inventory.html`
- **Expected Result:** User is redirected to login page. Inventory is not accessible

---

## Module: CAT — Product Catalog

---

### TC-CAT-001 — All products displayed on inventory page
- **Type:** Functional
- **Severity:** Critical | **Priority:** P1
- **Preconditions:** Logged in as `standard_user`
- **Steps:**
  1. Log in and observe the inventory page
- **Expected Result:** Exactly 6 products displayed, each with: image, name, description, price, "Add to cart" button

---

### TC-CAT-002 — Sort products by Price (low to high)
- **Type:** Functional
- **Severity:** Medium | **Priority:** P2
- **Steps:**
  1. Click sort dropdown
  2. Select "Price (low to high)"
- **Expected Result:** Products reordered: $7.99 → $9.99 → $15.99 → $15.99 → $29.99 → $49.99

---

### TC-CAT-003 — Sort products by Price (high to low)
- **Type:** Functional
- **Severity:** Medium | **Priority:** P2
- **Steps:**
  1. Click sort dropdown
  2. Select "Price (high to low)"
- **Expected Result:** Products reordered: $49.99 → $29.99 → $15.99 → $15.99 → $9.99 → $7.99

---

### TC-CAT-004 — Sort products by Name (Z to A)
- **Type:** Functional
- **Severity:** Medium | **Priority:** P2
- **Steps:**
  1. Click sort dropdown
  2. Select "Name (Z to A)"
- **Expected Result:** Products in reverse alphabetical order, starting with "Test.allTheThings() T-Shirt (Red)"

---

### TC-CAT-005 — Navigate to product detail page
- **Type:** Functional
- **Severity:** Medium | **Priority:** P2
- **Steps:**
  1. Click on any product name or image
- **Expected Result:** Product detail page loads with: large image, full name, full description, price, "Add to cart" button, "Back to products" link

---

### TC-CAT-006 — BUG: problem_user — all product images broken
- **Type:** Bug Verification
- **Severity:** High | **Priority:** P2
- **Preconditions:** Logged in as `problem_user`
- **Steps:**
  1. Log in as `problem_user` / `secret_sauce`
  2. Observe the inventory page
- **Expected Result:** Each of the 6 products displays its own unique, correctly loaded image. No 404 placeholders.
- **Actual Result:** All 6 products show the same broken placeholder (`sl-404.jpg`) — **FAIL**

---

### TC-CAT-007 — BUG: performance_glitch_user — login too slow
- **Type:** Performance
- **Severity:** Medium | **Priority:** P3
- **Preconditions:** User on login page
- **Steps:**
  1. Log in as `performance_glitch_user` / `secret_sauce`
  2. Measure time until inventory page loads
- **Expected Result:** Inventory page loads within 2 seconds
- **Actual Result:** Login takes approximately 7 seconds — **FAIL**

---

## Module: CART — Shopping Cart

---

### TC-CART-001 — Add single product from inventory
- **Type:** Functional (Happy Path)
- **Severity:** Critical | **Priority:** P1
- **Preconditions:** Logged in, on inventory page
- **Steps:**
  1. Click "Add to cart" on "Sauce Labs Backpack"
- **Expected Result:** Button changes to "Remove". Cart icon badge shows "1"

---

### TC-CART-002 — Add multiple products and verify badge count
- **Type:** Functional
- **Severity:** High | **Priority:** P1
- **Steps:**
  1. Add "Sauce Labs Backpack"
  2. Add "Sauce Labs Bike Light"
  3. Add "Sauce Labs Bolt T-Shirt"
- **Expected Result:** Cart badge shows "3". All 3 buttons show "Remove"

---

### TC-CART-003 — Add product from product detail page
- **Type:** Functional
- **Severity:** High | **Priority:** P2
- **Steps:**
  1. Click on any product to open detail
  2. Click "Add to cart"
- **Expected Result:** Button changes to "Remove". Cart badge increments by 1

---

### TC-CART-004 — Remove product from inventory page
- **Type:** Functional
- **Severity:** High | **Priority:** P1
- **Steps:**
  1. Add "Sauce Labs Backpack" to cart
  2. Click "Remove" on same product
- **Expected Result:** Button reverts to "Add to cart". Cart badge decrements (or disappears if empty)

---

### TC-CART-005 — Remove product from cart page
- **Type:** Functional
- **Severity:** High | **Priority:** P1
- **Steps:**
  1. Add a product, navigate to cart
  2. Click "Remove" on cart page
- **Expected Result:** Item removed from list. Badge updates accordingly

---

### TC-CART-006 — Cart persists when navigating between pages
- **Type:** Functional / Regression
- **Severity:** High | **Priority:** P2
- **Steps:**
  1. Add 2 products to cart
  2. Navigate to product detail page
  3. Go back to inventory
  4. Check cart badge
- **Expected Result:** Badge still shows "2". Items still in cart

---

### TC-CART-007 — QTY is displayed but not editable
- **Type:** Edge Case / UI
- **Severity:** Medium | **Priority:** P3
- **Steps:**
  1. Add any product to cart
  2. Go to cart page
  3. Try to edit the QTY value
- **Expected Result:** QTY shows "1" and is not an editable field. Quantity can only be managed by adding/removing items

---

### TC-CART-008 — Continue Shopping returns to inventory
- **Type:** Functional
- **Severity:** Medium | **Priority:** P2
- **Steps:**
  1. Add items, go to cart
  2. Click "Continue Shopping"
- **Expected Result:** Redirected to inventory. Cart items preserved

---

## Module: CHK — Checkout

---

### TC-CHK-001 — Complete full checkout flow (happy path)
- **Type:** Functional (Happy Path)
- **Severity:** Critical | **Priority:** P1
- **Preconditions:** At least 1 item in cart, logged in as `standard_user`
- **Test Data:** First Name: `John` | Last Name: `Doe` | Zip: `12345`
- **Steps:**
  1. Go to cart → Click "Checkout"
  2. Fill in customer info → Click "Continue"
  3. Review order overview → Click "Finish"
- **Expected Result:** Confirmation page shows checkmark icon, "Thank you for your order!", and "Your order has been dispatched, and will arrive just as fast as the pony can get there!" + "Back Home" button

---

### TC-CHK-002 — Checkout overview shows correct payment and shipping info
- **Type:** Functional
- **Severity:** High | **Priority:** P2
- **Steps:**
  1. Add items and proceed to checkout overview (Step 2)
- **Expected Result:** Overview shows: Payment Information: "SauceCard #31337", Shipping: "Free Pony Express Delivery!"

---

### TC-CHK-003 — Order total calculation is correct
- **Type:** Functional
- **Severity:** High | **Priority:** P1
- **Steps:**
  1. Add Backpack ($29.99) + Bike Light ($9.99)
  2. Proceed to checkout overview
- **Expected Result:** Item total: $39.98 | Tax: $3.20 | **Total: $43.18**

---

### TC-CHK-004 — Checkout validation — empty First Name
- **Type:** Negative
- **Severity:** High | **Priority:** P1
- **Steps:**
  1. Start checkout, leave First Name empty
  2. Fill Last Name and Zip
  3. Click "Continue"
- **Expected Result:** Error: *"Error: First Name is required"*. Cannot proceed to Step 2

---

### TC-CHK-005 — Checkout validation — empty Last Name
- **Type:** Negative
- **Severity:** High | **Priority:** P1
- **Steps:**
  1. Fill First Name and Zip, leave Last Name empty
  2. Click "Continue"
- **Expected Result:** Error: *"Error: Last Name is required"*

---

### TC-CHK-006 — Checkout validation — empty Zip code
- **Type:** Negative
- **Severity:** High | **Priority:** P1
- **Steps:**
  1. Fill First Name and Last Name, leave Zip empty
  2. Click "Continue"
- **Expected Result:** Error: *"Error: Postal Code is required"*

---

### TC-CHK-007 — Cancel checkout at Step 1 (Customer Info)
- **Type:** Functional
- **Severity:** Medium | **Priority:** P2
- **Steps:**
  1. Start checkout, click "Cancel" on Step 1
- **Expected Result:** Returns to cart. Items still present

---

### TC-CHK-008 — Cancel checkout at Step 2 (Overview)
- **Type:** Functional
- **Severity:** Medium | **Priority:** P2
- **Steps:**
  1. Fill customer info and continue to Step 2
  2. Click "Cancel" on Overview
- **Expected Result:** Returns to inventory. Cart items preserved

---

### TC-CHK-009 — Cart is empty after completing an order
- **Type:** Functional / Regression
- **Severity:** High | **Priority:** P1
- **Steps:**
  1. Complete a full checkout
  2. Click "Back Home"
  3. Check cart badge
- **Expected Result:** Cart badge is gone. Cart page is empty

---

### TC-CHK-010 — BUG: Checkout with empty cart
- **Type:** Bug Verification / Edge Case
- **Severity:** Medium | **Priority:** P2
- **Steps:**
  1. Navigate to cart with 0 items
  2. Click "Checkout"
- **Expected Result:** App should prevent checkout or show a warning. An empty order should not be placeable
- **Actual Result:** User is redirected to checkout-step-one.html with no items — **FAIL**

---

## Module: NAV — Navigation & Menu

---

### TC-NAV-001 — Hamburger menu displays all options
- **Type:** Functional / UI
- **Severity:** Medium | **Priority:** P2
- **Preconditions:** Logged in
- **Steps:**
  1. Click hamburger menu icon (top left)
- **Expected Result:** Menu opens with: All Items, About, Logout, Reset App State. X button to close

---

### TC-NAV-002 — Reset App State clears the cart
- **Type:** Functional
- **Severity:** Medium | **Priority:** P2
- **Steps:**
  1. Add 3 products to cart
  2. Open menu → Click "Reset App State"
  3. Check cart and inventory
- **Expected Result:** Cart badge disappears. All product buttons reset to "Add to cart". Cart page is empty

---

### TC-NAV-003 — Back to products from product detail
- **Type:** Functional
- **Severity:** Low | **Priority:** P3
- **Steps:**
  1. Open any product detail
  2. Click "← Back to products"
- **Expected Result:** Returns to inventory. Cart state and sort order preserved

---

### TC-NAV-004 — Footer links are present on all pages
- **Type:** UI
- **Severity:** Low | **Priority:** P4
- **Steps:**
  1. Navigate through: inventory → product detail → cart → checkout
  2. Verify footer on each page
- **Expected Result:** Twitter, Facebook, LinkedIn, Terms of Service, and Privacy Policy links visible on every page

---

## Module: USR — Special Users (Additional Manual Scenarios)

> TC-CAT-006 and TC-CAT-007 cover the primary bug verification for `problem_user` and `performance_glitch_user`. The scenarios below cover additional behaviors observed in manual exploration.

---

### TC-USR-001 — problem_user: sort is broken
- **Type:** Bug Verification
- **Severity:** High | **Priority:** P2
- **Preconditions:** Logged in as `problem_user`
- **Steps:**
  1. Click sort dropdown
  2. Select "Price (low to high)"
- **Expected Result:** Products reorder correctly by price ascending
- **Actual Result:** Sort has no effect — product order remains unchanged — **FAIL**

---

### TC-USR-002 — performance_glitch_user: slow navigation between pages
- **Type:** Performance
- **Severity:** Medium | **Priority:** P3
- **Preconditions:** Logged in as `performance_glitch_user`
- **Steps:**
  1. Navigate between inventory, product detail, and cart pages
  2. Measure load time for each page
- **Expected Result:** All pages load within 2 seconds
- **Actual Result:** Each page navigation incurs an artificial delay — **FAIL**

---

## Summary

| Module | Total | Critical | High | Medium | Low |
|--------|-------|----------|------|--------|-----|
| AUTH | 7 | 2 | 4 | 0 | 1 |
| CAT | 7 | 1 | 2 | 3 | 1 |
| CART | 7 | 1 | 4 | 2 | 0 |
| CHK | 10 | 2 | 5 | 3 | 0 |
| NAV | 4 | 0 | 0 | 2 | 2 |
| USR | 2 | 0 | 1 | 1 | 0 |
| **Total** | **37** | **6** | **16** | **11** | **4** |
