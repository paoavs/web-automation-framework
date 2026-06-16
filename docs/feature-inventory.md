# Feature Inventory — Swag Labs (SauceDemo)

**URL:** https://www.saucedemo.com  
**Explored:** 2026-06-14  
**Tool:** Playwright (automated exploration)

---

## F-01: Authentication

| Feature | Detail |
|---------|--------|
| Login form | Username field + Password field + Login button |
| Test users | `standard_user`, `locked_out_user`, `problem_user`, `performance_glitch_user`, `error_user`, `visual_user` |
| Password (all users) | `secret_sauce` |
| Credentials hint | Displayed on login page (visible without logging in) |
| Error — locked user | "Epic sadface: Sorry, this user has been locked out." |
| Error — invalid credentials | "Epic sadface: Username and password do not match any user in this service" |
| Error — empty username | "Epic sadface: Username is required" |
| Error — empty password | "Epic sadface: Password is required" |
| Logout | Via hamburger menu → Logout |
| Session protection | Direct URL access to `/inventory.html` without login redirects to login page |

---

## F-02: Product Catalog (Inventory)

| Feature | Detail |
|---------|--------|
| Total products | 6 |
| Products | Sauce Labs Backpack ($29.99), Sauce Labs Bike Light ($9.99), Sauce Labs Bolt T-Shirt ($15.99), Sauce Labs Fleece Jacket ($49.99), Sauce Labs Onesie ($7.99), Test.allTheThings() T-Shirt Red ($15.99) |
| Each product shows | Image, name, description, price, "Add to cart" button |
| Sort options | Name (A to Z), Name (Z to A), Price (low to high), Price (high to low) |
| Default sort | Name (A to Z) |
| Product detail page | Large image, full name, full description, price, "Add to cart" button, "← Back to products" link |
| Footer | Twitter, Facebook, LinkedIn icons + Terms of Service + Privacy Policy links |

---

## F-03: Shopping Cart

| Feature | Detail |
|---------|--------|
| Add to cart | From inventory page and from product detail page |
| Cart badge | Counter shown on cart icon (top right), updates on add/remove |
| Button toggle | "Add to cart" → "Remove" after adding |
| Cart page | Shows: QTY column (fixed at 1), Description, price per item, Remove button |
| QTY | Displayed as "1" per item — **not editable** |
| Cart actions | "Continue Shopping" (← back to inventory) + "Checkout" |
| Cart persistence | Items persist when navigating between pages within the session |

---

## F-04: Checkout

| Feature | Detail |
|---------|--------|
| Step 1 — Customer Info | First Name, Last Name, Zip/Postal Code + Continue / Cancel buttons |
| Validation — empty first name | "Error: First Name is required" |
| Validation — empty last name | "Error: Last Name is required" |
| Validation — empty zip | "Error: Postal Code is required" |
| Step 2 — Overview | Items list, Payment Info ("SauceCard #31337"), Shipping Info ("Free Pony Express Delivery!"), subtotal, tax, total + Finish / Cancel buttons |
| Tax rate | ~8% of subtotal |
| Example calculation | $29.99 + $9.99 = $39.98 subtotal → $3.20 tax → **$43.18 total** |
| Step 3 — Complete | Checkmark icon + "Thank you for your order!" + "Your order has been dispatched, and will arrive just as fast as the pony can get there!" + "Back Home" button |
| Cancel at Step 1 | Returns to cart, items preserved |
| Cancel at Step 2 | Returns to inventory |
| Post-order cart | Cart is empty after order completion |

---

## F-05: Navigation & Menu

| Feature | Detail |
|---------|--------|
| Header | "Swag Labs" title, hamburger menu (left), cart icon (right) |
| Hamburger menu items | All Items, About, Logout, Reset App State |
| All Items | Navigates to inventory page |
| About | External link (Sauce Labs website) |
| Logout | Ends session, redirects to login |
| Reset App State | Clears cart and resets all "Add to cart" buttons |
| Close menu | X button to dismiss |

---

## F-06: Footer (all pages post-login)

| Feature | Detail |
|---------|--------|
| Social links | Twitter, Facebook, LinkedIn |
| Legal links | Terms of Service, Privacy Policy |
| Copyright | © 2026 Sauce Labs. All Rights Reserved. |

---

## F-07: Special Users (Intentional Bugs)

| User | Known Behavior |
|------|----------------|
| `locked_out_user` | Blocked at login — cannot access the app |
| `problem_user` | All 6 product images broken (same 404 image: `sl-404.jpg`) |
| `performance_glitch_user` | Artificial delay on page load (~5s) |
| `error_user` | Errors triggered on specific interactions |
| `visual_user` | Visual/UI bugs on certain elements |
