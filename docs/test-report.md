# Test Report — Swag Labs (SauceDemo)

**Date:** 2026-06-15  
**Tester:** QA Engineer  
**Environment:** https://www.saucedemo.com  
**Browser:** Chromium (Playwright)  
**Execution Tool:** Playwright + Stagehand AI (dual-mode framework)

---

## 1. Product Introduction

**Swag Labs** is a demo e-commerce web application built by Sauce Labs for QA testing purposes. It simulates a standard online store where users can browse products, manage a shopping cart, and complete a purchase flow.

The application intentionally includes multiple user types — some with bugs, performance issues, and visual defects — making it ideal for practicing a wide range of QA scenarios.

### Most Important Feature

The **Checkout Flow** is the most critical feature in this application.

**Why:** It is the core business transaction — the entire purpose of an e-commerce platform is to convert a user browsing products into a completed purchase. Any defect in this flow directly impacts revenue. It combines multiple sub-systems (cart state, form validation, price calculation, session management) and represents the highest risk area for regression.

A broken checkout means zero sales. A broken sort order is a UX issue. That distinction defines priority.

---

## 2. Test Scope

| Module | Test Cases | In Scope |
|--------|-----------|----------|
| E2E Critical Path | 1 | ✅ |
| Authentication | 7 | ✅ |
| Product Catalog | 8 | ✅ |
| Shopping Cart | 7 | ✅ |
| Checkout Flow | 8 | ✅ |
| Navigation / Menu | — | Covered within other modules |
| Special Users (bugs) | 3 | ✅ |
| **Total** | **31** | |

### Out of Scope
- Payment gateway integration (app uses mock payment)
- Mobile responsiveness
- Cross-browser testing (only Chromium executed)
- Performance load testing

---

## 3. Test Environment

| Item | Detail |
|------|--------|
| URL | https://www.saucedemo.com |
| Browser | Chromium 148.x (Playwright managed) |
| Node.js | v20.20.2 |
| Playwright | v1.60.0 |
| Stagehand | v3.5.0 |
| OS | macOS |
| Execution mode | Playwright (no API key) / Stagehand AI (with key) |

### Test Users

| Username | Password | Role |
|----------|----------|------|
| `standard_user` | `secret_sauce` | Primary test user — full access |
| `locked_out_user` | `secret_sauce` | Blocked at login |
| `problem_user` | `secret_sauce` | Broken images, defective interactions |
| `performance_glitch_user` | `secret_sauce` | Artificial delay on login |

---

## 4. Execution Results

### Summary

| Status | Count | % |
|--------|-------|---|
| ✅ Passed | 29 | 90.6% |
| 🐛 Failed (bugs confirmed) | 3 | 9.4% |
| ⛔ Blocked | 0 | — |
| **Total** | **32** | |

> Bug tests are marked with `test.fail()` — they are **expected to fail** as they document confirmed defects. The framework correctly detects and reports them.

### Results by Module

| Module | Total | Passed | Failed |
|--------|-------|--------|--------|
| E2E | 1 | 1 | 0 |
| AUTH | 7 | 7 | 0 |
| CATALOG | 7 | 5 | 2 🐛 |
| CART | 7 | 7 | 0 |
| CHECKOUT | 10 | 9 | 1 🐛 |
| **Total** | **32** | **29** | **3** |

---

## 5. Bugs Found

| ID | Module | Title | Severity | Priority |
|----|--------|-------|----------|----------|
| BUG-001 | CATALOG | All product images broken for `problem_user` | High | P2 |
| BUG-002 | CATALOG | Login delay >5s for `performance_glitch_user` | Medium | P3 |
| BUG-003 | CHECKOUT | Checkout allowed with empty cart | Medium | P2 |

> Full details in `docs/reported-issues.md`

---

## 6. Observations & Recommendations

### Observations

1. **No quantity editing in cart** — The QTY field in the cart page shows "1" but is not editable. Users cannot increase quantity without adding items individually. This is a UX limitation, not necessarily a bug given it's a demo app, but worth noting for a real product.

2. **Credentials visible on login page** — Accepted usernames and the shared password are displayed directly on the login page. This is intentional for a demo/testing environment but would be a critical security issue in production.

3. **Cancel at checkout step 2 goes to inventory, not cart** — When a user cancels at the Overview step (Step 2), they are redirected to the inventory page rather than back to their cart. The items remain in the cart but the user must manually navigate back. This may be unexpected behavior.

4. **Reset App State accessible during checkout** — The hamburger menu (and Reset App State) is accessible throughout the checkout flow, including on the confirmation page. Resetting during checkout could lead to inconsistent states.

### Recommendations

- Add a guard to prevent initiating checkout with an empty cart
- Consider making the cart quantity editable for better UX
- Standardize cancel behavior: always return to the most recent relevant step (e.g., cancel on overview → return to cart)
