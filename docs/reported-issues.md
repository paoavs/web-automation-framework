# Reported Issues — Swag Labs (SauceDemo)

**Date:** 2026-06-15  
**Tester:** QA Engineer  
**Environment:** https://www.saucedemo.com

---

## BUG-001 — All product images broken for `problem_user`

| Field | Detail |
|-------|--------|
| **ID** | BUG-001 |
| **Module** | Product Catalog |
| **Test Case** | TC-CAT-006 |
| **Severity** | High |
| **Priority** | P2 |
| **Status** | Open |
| **User affected** | `problem_user` |

### Description
When logged in as `problem_user`, all 6 product images on the inventory page display the same broken placeholder image (`sl-404.jpg`) instead of the correct product images. Each product should display a unique, relevant image.

### Steps to Reproduce
1. Navigate to https://www.saucedemo.com
2. Enter username: `problem_user` / password: `secret_sauce`
3. Click Login
4. Observe the product images on the inventory page

### Expected Result
Each of the 6 products displays its own unique, correctly loaded image.

### Actual Result
All 6 products display the same 404 error image: `/static/media/sl-404.168b1cce10384b857a6f.jpg`

### Evidence
Screenshot: `screenshots/bugs/TC-CAT-006-|-BUG-—-problem_user:-all-product-images-broken.png`

### Automated Detection
```
[chromium] › tests/catalog.spec.ts › TC-CAT-006 | BUG — problem_user: all product images broken
Expected: 0 broken images
Received: 6/6 images broken (all pointing to sl-404.jpg)
```

---

## BUG-002 — Login performance degradation for `performance_glitch_user`

| Field | Detail |
|-------|--------|
| **ID** | BUG-002 |
| **Module** | Authentication |
| **Test Case** | TC-CAT-007 |
| **Severity** | Medium |
| **Priority** | P3 |
| **Status** | Open |
| **User affected** | `performance_glitch_user` |

### Description
When logging in as `performance_glitch_user`, the application introduces an artificial delay of approximately 5–7 seconds before loading the inventory page. A standard user logs in under 1 second. This simulates a real-world performance regression scenario.

### Steps to Reproduce
1. Navigate to https://www.saucedemo.com
2. Enter username: `performance_glitch_user` / password: `secret_sauce`
3. Click Login
4. Measure time until inventory page fully loads

### Expected Result
Inventory page loads within an acceptable threshold (< 2 seconds).

### Actual Result
Inventory page took **~7100ms** to load — approximately 7x slower than a standard user.

### Evidence
Screenshot: `screenshots/bugs/TC-CAT-007-|-BUG-—-performance_glitch_user:-login-takes-too-long.png`

### Automated Detection
```
[chromium] › tests/catalog.spec.ts › TC-CAT-007 | BUG — performance_glitch_user: login takes too long
Expected: elapsed < 2000ms
Received: elapsed = 7143ms
```

---

## BUG-003 — Checkout flow accessible with empty cart

| Field | Detail |
|-------|--------|
| **ID** | BUG-003 |
| **Module** | Checkout |
| **Test Case** | TC-CHK-008 |
| **Severity** | Medium |
| **Priority** | P2 |
| **Status** | Open |
| **User affected** | All users |

### Description
The "Checkout" button is visible and functional when the shopping cart is empty. Clicking it proceeds to the checkout information form (Step 1) without any validation or warning. This allows users to initiate and potentially complete an empty order.

### Steps to Reproduce
1. Log in as `standard_user` / `secret_sauce`
2. Navigate to the cart page (ensure it is empty — no items added)
3. Click the "Checkout" button

### Expected Result
The application should either:
- Disable the Checkout button when the cart is empty, or
- Display a validation message: *"Your cart is empty. Please add items before checking out."*
- Prevent navigation to checkout-step-one

### Actual Result
User is redirected to `checkout-step-one.html` and can proceed through the full checkout flow with no items in the order.

### Impact
A user could complete the checkout confirmation screen with an empty order. In a real e-commerce application this would create a zero-item order in the system, impacting order management, inventory, and reporting.

### Evidence
Screenshot: `screenshots/bugs/TC-CHK-008-|-BUG-—-Checkout-allowed-with-empty-cart.png`

### Automated Detection
```
[chromium] › tests/checkout.spec.ts › TC-CHK-008 | BUG — Checkout allowed with empty cart
Expected: URL not to contain "checkout-step-one"
Received: https://www.saucedemo.com/checkout-step-one.html
```

---

## Observation — Cancel on checkout overview returns to inventory, not cart

| Field | Detail |
|-------|--------|
| **ID** | OBS-001 |
| **Type** | Observation / UX |
| **Severity** | Low |
| **Priority** | P4 |

### Description
When a user cancels at the checkout Overview page (Step 2), they are redirected to the **inventory page** instead of returning to the **cart**. Cart items are preserved, but the navigation is counterintuitive — the user must manually find their way back to the cart to review or modify their order.

### Expected Behavior
Cancel on Step 2 → Return to cart (Step 0), allowing user to review/modify items.

### Actual Behavior
Cancel on Step 2 → Redirect to `/inventory.html`

### Note
This may be an intentional design decision. However, from a UX standpoint, returning to the cart would provide a more consistent and expected experience.

---

## Observation — QTY field in cart is not editable

| Field | Detail |
|-------|--------|
| **ID** | OBS-002 |
| **Type** | Observation / UX Limitation |
| **Severity** | Low |
| **Priority** | P4 |

### Description
The cart page displays a "QTY" column with a value of "1" for each item. This field is rendered as static text — it is not an editable input. Users cannot increase quantity for an item and must add it multiple times from the inventory page instead.

### Note
This is a known limitation of the demo app and likely intentional. In a production e-commerce platform, quantity editing in the cart would be expected functionality.
