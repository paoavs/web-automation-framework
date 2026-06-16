# SauceDemo QA Automation Framework

Automation test suite for [SauceDemo (Swag Labs)](https://www.saucedemo.com) built with **Playwright** and **Stagehand AI**.

---

## Quick Navigation

| Deliverable | Link | Notion |
|-------------|------|--------|
| Feature Inventory | [docs/feature-inventory.md](docs/feature-inventory.md) | [View in Notion](https://www.notion.so/381dc52899cd805294bcf993c140a0f3?v=d4380f97dbe0429f92e1849d9ba57b8a) |
| Test Scenarios (37 cases) | [docs/test-scenarios.md](docs/test-scenarios.md) | [View in Notion](https://www.notion.so/381dc52899cd80b4b0a3e292a739f05b?v=0465afcb3d5b49e7b9373272ab7de0e5) |
| Reported Issues (5 bugs) | [docs/reported-issues.md](docs/reported-issues.md) | [View in Notion](https://www.notion.so/381dc52899cd80dcb967c3036f24093d?v=d4380f97dbe0429f92e1849d9ba57b8a) |
| Test Report | [docs/test-report.md](docs/test-report.md) | — |
| API Testing | [docs/api-testing.md](docs/api-testing.md) | — |
| Automation Code | [tests/](tests/) | — |

---

## CI/CD

Every push to `main` triggers two parallel jobs via GitHub Actions (`.github/workflows/ci.yml`):

| Job | What it does |
|-----|-------------|
| `playwright` | Installs deps → runs all 32 tests → uploads HTML report as artifact |
| `api` | Installs Bruno CLI → runs all 26 API assertions against production |

---

## Tech Stack

| Tool | Purpose |
|------|---------|
| [Playwright](https://playwright.dev) | Browser automation & test runner |
| [Stagehand](https://github.com/browserbase/stagehand) | AI-powered browser interactions |
| [Claude Sonnet 4.6](https://anthropic.com) | AI model via Anthropic API |
| TypeScript | Language |
| Playwright HTML Reporter | Test reporting |
| [Bruno](https://www.usebruno.com) | Git-native API client (`.bru` files) |
| Postman | API collection exported for compatibility |

---

## Why Stagehand?

[Stagehand](https://github.com/browserbase/stagehand) is an open-source library by Browserbase that wraps Playwright with AI capabilities. Instead of targeting elements with CSS selectors or XPath, you describe what you want in plain English — Stagehand uses an LLM (Claude Sonnet 4.6) to locate the element and perform the action at runtime.

```typescript
// Standard Playwright — breaks if the selector changes
await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');

// Stagehand AI — describes intent, resilient to DOM changes
await stagehand.act('add the Sauce Labs Backpack to the cart');
```

**Why use it in this project?**

- **Selector resilience** — if a `data-test` attribute is renamed or a class changes, the AI still finds the right element from the description. Standard Playwright would throw a locator error.
- **Readable tests** — the test reads like a manual test case written in plain English, making it immediately understandable to anyone on the team, not just engineers.
- **AI integration in QA** — demonstrates how modern AI tooling fits into a real automation workflow, which is increasingly relevant for QA roles.
- **No lock-in** — the same test suite runs in pure Playwright mode when no API key is present, so there is zero cost to run it in CI and no dependency on an external service to get results.

The `smartAction` helper in `src/helpers/smart-action.helper.ts` handles the mode switch transparently — tests don't know or care which mode they're running in.

---

## Why Bruno?

[Bruno](https://www.usebruno.com) is a git-native API client — API collections are stored as plain `.bru` text files that live directly inside this repository, get versioned alongside the code, and run headlessly in CI without any cloud account, login, or sync service.

**Why Bruno instead of Postman alone?**

| | Bruno | Postman |
|---|---|---|
| Stored in git | Yes — `.bru` files committed to the repo | No — lives in Postman cloud |
| Runs in CI | Yes — `bru run` CLI, no account needed | Requires Newman + API key |
| Zero setup for reviewers | Clone repo → run | Must import collection + sign in |
| GUI client available | Yes | Yes |

**Both options are provided.** If you prefer Postman, import `api/chuck-norris-api/postman_collection.json` directly — no setup required, all tests and assertions are identical.

---

## Where to find Test Cases, Bugs & Feature Inventory

Everything is available in two places — pick whichever is more convenient:

| Deliverable | In this repo (Markdown) | In Notion |
|---|---|---|
| Feature Inventory | [docs/feature-inventory.md](docs/feature-inventory.md) | [Open in Notion](https://www.notion.so/381dc52899cd805294bcf993c140a0f3?v=d4380f97dbe0429f92e1849d9ba57b8a) |
| Test Scenarios (37 cases) | [docs/test-scenarios.md](docs/test-scenarios.md) | [Open in Notion](https://www.notion.so/381dc52899cd80b4b0a3e292a739f05b?v=0465afcb3d5b49e7b9373272ab7de0e5) |
| Reported Bugs (5 issues) | [docs/reported-issues.md](docs/reported-issues.md) | [Open in Notion](https://www.notion.so/381dc52899cd80dcb967c3036f24093d?v=d4380f97dbe0429f92e1849d9ba57b8a) |

The Notion pages were imported from the CSV files in `docs/notion-import/` and mirror the Markdown files exactly. Use Notion if you want a table/kanban view; use the Markdown files if you want to read directly in GitHub.

---

## Why Bruno?

[Bruno](https://www.usebruno.com) is a git-native API client. API collections are stored as plain `.bru` text files that live inside the repository, are versioned with the code, and run headlessly in CI with a single command — no cloud account, no login, no sync token required.

**Why Bruno instead of Postman alone?**

| | Bruno | Postman |
|---|---|---|
| Stored in git | Yes — `.bru` files committed to the repo | No — lives in Postman cloud |
| Runs in CI without an account | Yes — `bru run --env production` | Requires Newman + Postman API key |
| Zero setup for anyone who clones the repo | Yes | Must import collection manually |
| GUI desktop client | Yes | Yes |

**Choosing Bruno means the API tests are treated the same as the automation tests** — they live in version control, run automatically on every push, and any reviewer can execute them locally with one command after cloning.

**Postman is also included.** `api/chuck-norris-api/postman_collection.json` contains the exact same tests and assertions. If you prefer Postman, import that file directly — no extra setup needed.

---

## Where to find Test Cases, Bugs & Feature Inventory

Everything is available in two places — pick whichever is more convenient:

| Deliverable | In this repo (Markdown) | In Notion |
|---|---|---|
| Feature Inventory | [docs/feature-inventory.md](docs/feature-inventory.md) | [Open in Notion](https://www.notion.so/381dc52899cd805294bcf993c140a0f3?v=d4380f97dbe0429f92e1849d9ba57b8a) |
| Test Scenarios (37 cases) | [docs/test-scenarios.md](docs/test-scenarios.md) | [Open in Notion](https://www.notion.so/381dc52899cd80b4b0a3e292a739f05b?v=0465afcb3d5b49e7b9373272ab7de0e5) |
| Reported Bugs (5 issues) | [docs/reported-issues.md](docs/reported-issues.md) | [Open in Notion](https://www.notion.so/381dc52899cd80dcb967c3036f24093d?v=d4380f97dbe0429f92e1849d9ba57b8a) |

The Notion pages were imported from the CSV files in `docs/notion-import/` and mirror the Markdown files exactly. Use Notion for a table/kanban view; use the Markdown files to read directly in GitHub.

---

## Prerequisites

- **Node.js 20+** (required for ESM support)
- npm 9+
- An Anthropic API key *(optional — only required for AI mode)*

### Install Node 20 with nvm
```bash
nvm install 20
nvm use 20
```

---

## Installation

```bash
git clone <repo-url>
cd qa-challenge
npm install
npx playwright install chromium
```

### Environment setup

```bash
cp .env.example .env
```

```env
# .env
ANTHROPIC_API_KEY=sk-ant-...   # optional — enables AI mode
```

---

## Running Tests

The framework runs in **two modes** depending on whether `ANTHROPIC_API_KEY` is set:

| Mode | Requires | How |
|------|----------|-----|
| Playwright | Nothing extra | `npm test` (without key in .env) |
| Stagehand AI | Anthropic API key | `npm test` (with key in .env) |

The same test suite runs in both modes — no code changes needed.

```bash
# Run all tests
npm test

# Run by module
npm run test:e2e
npm run test:auth
npm run test:cart
npm run test:checkout
npm run test:catalog

# Open HTML report after run
npm run report
```

---

## HTML Test Report

After running `npm test`, Playwright generates an interactive HTML report:

```bash
npm test          # runs tests
npm run report    # opens the report in your browser
```

The report includes:
- Pass / fail status per test with execution time
- Screenshots and video recordings on failure
- Full error messages and stack traces
- Filterable by status, module, or test name

**Via GitHub Actions:** Every CI run uploads the report as a downloadable artifact under the `playwright` job → `playwright-report`. No local setup needed to view results.

---

## Project Structure

```
qa-challenge/
├── tests/
│   ├── e2e.spec.ts           # 1 test  — Critical path smoke (login → browse → checkout)
│   ├── auth.spec.ts          # 7 tests — Authentication
│   ├── cart.spec.ts          # 7 tests — Shopping Cart
│   ├── checkout.spec.ts      # 10 tests — Checkout Flow
│   └── catalog.spec.ts       # 7 tests — Product Catalog & Special Users
│
├── src/
│   ├── fixtures/
│   │   └── stagehand.fixture.ts    # Unified fixture — auto-detects Playwright vs AI mode
│   │
│   ├── pages/                      # Page Object Model
│   │   ├── login.page.ts
│   │   ├── inventory.page.ts
│   │   ├── cart.page.ts
│   │   ├── checkout.page.ts
│   │   └── navigation.page.ts
│   │
│   ├── locators/                   # All selectors in one place
│   │   ├── auth.locators.ts
│   │   ├── inventory.locators.ts
│   │   ├── cart.locators.ts
│   │   ├── checkout.locators.ts
│   │   └── navigation.locators.ts
│   │
│   ├── helpers/
│   │   └── smart-action.helper.ts  # Wraps act/extract for dual-mode (AI + Playwright)
│   │
│   └── data/
│       └── users.ts                # Test credentials, products, checkout data
│
├── docs/
│   ├── feature-inventory.md
│   ├── test-scenarios.md
│   ├── test-report.md
│   ├── reported-issues.md
│   ├── api-testing.md
│   └── notion-import/              # CSV files for Notion import
│
├── api/
│   └── chuck-norris-api/           # Bruno collection + Postman export
│
├── .github/
│   └── workflows/ci.yml            # GitHub Actions — Playwright + Bruno
│
├── playwright.config.ts
├── tsconfig.json
└── .env.example
```

---

## Dual Mode Architecture

The unified fixture auto-detects which mode to use at runtime:

```
ANTHROPIC_API_KEY set?
├── YES → Stagehand AI mode
│         stagehand.act('natural language instruction', { page })
│         stagehand.extract('what do you see?', schema, { page })
│
└── NO  → Playwright mode
          page.click(Locators.someButton)
          page.locator(Locators.element).textContent()
```

The `smartAction` helper handles both transparently — tests don't need to know which mode they're in:

```typescript
// smartClick — uses AI if available, falls back to Playwright selector
await smartClick(page, '[data-test="checkout"]', 'click the Checkout button', stagehand);

// smartGetText — same pattern for reading values
const header = await smartGetText(page, '.complete-header', 'get the confirmation message', stagehand);
```

**Why this matters:** Tests are resilient to DOM changes in AI mode, and fully portable in Playwright mode with zero API cost.

---

## Test Design Principles

- **beforeEach** (fixture): auto-login as `standard_user` + cart reset before every test
- **afterEach** (fixture): screenshot + video attached to report on failure
- **Page Object Model**: each page has its own class with semantic methods
- **Locators centralized**: if a selector changes, update one file
- **Test data separated**: credentials and products in `src/data/users.ts`
- **Independent tests**: no shared state between tests

---

## Test Coverage Summary

| Module | Tests | Result |
|--------|-------|--------|
| E2E | 1 | 1 pass |
| AUTH | 7 | 7 pass |
| CATALOG | 7 | 5 pass, 2 fail (known bugs) |
| CART | 7 | 7 pass |
| CHECKOUT | 10 | 9 pass, 1 fail (known bug) |
| **Total** | **32** | **29 pass, 3 fail** |

> Bug tests use `test.fail()` — they are **expected to fail** and document confirmed defects. The framework correctly detects and reports them.

---

## Part 03 — Chosen Test Cases & Justification

The challenge asks to choose **3 key test cases** to automate first and justify the selection.

### TC-CHK-001 — Complete checkout happy path
**Why first:** The checkout flow is the most critical business transaction in any e-commerce app. If this breaks, there are zero sales. It exercises the maximum number of integrated components: session state, cart persistence, form validation, price calculation, and order confirmation. Automating this first gives the highest ROI and serves as the backbone regression test.

**Validations included:**
- Cart state correctly carried into checkout
- Customer info form accepts valid data and proceeds
- Order overview shows correct items, payment info, and pricing
- Confirmation page displays expected success message
- Cart is cleared after order completion

---

### TC-AUTH-001 + TC-AUTH-007 — Login & Session Protection
**Why first:** Authentication is the gateway to the entire application. Without a working login, no other feature can be tested. TC-AUTH-007 (unauthorized direct URL access) is also critical from a security standpoint — it verifies the app cannot be bypassed, which is a non-negotiable requirement for any web application.

**Validations included:**
- Successful login redirects to inventory
- Invalid, locked, and empty credentials show correct error messages
- Session cannot be bypassed via direct URL manipulation
- Logout properly ends the session

---

### TC-USR-001 — Problem user broken images (Bug detection)
**Why first:** Automating known bug scenarios creates a living regression suite. If `problem_user` images ever get fixed, this test will catch it. More importantly, it demonstrates the framework's ability to test non-standard user states — a real production app would have equivalent scenarios (roles, feature flags, A/B cohorts). This test shows QA maturity beyond happy paths.

**Validations included:**
- All 6 product images are checked for broken `src` attributes
- Detects the `sl-404.jpg` placeholder pattern
- `test.fail()` marks the test as an expected failure, documenting the bug

---

## Problems & Blockers Encountered

| # | Problem | Solution |
|---|---------|---------|
| 1 | **Node.js v18.4** — too old for Playwright ESM support | Updated to Node 20 via `nvm install 20` |
| 2 | **Stagehand ESM/CJS conflict** — `chrome-launcher` is ESM-only | Migrated project to ESM (`"type": "module"` + `NodeNext` module resolution) |
| 3 | **Missing Stagehand peer dependency** `@ai-sdk/amazon-bedrock` | Installed via `npm install @ai-sdk/amazon-bedrock` |
| 4 | **Hamburger menu close button timing** — `#react-burger-close-btn` timed out | Root cause: menu auto-closes on item selection. Fixed by using `Escape` key |
| 5 | **TC-CHK-003 state conflict** — `beforeEach` adds backpack, test tried to re-navigate | Fixed by canceling checkout → Continue Shopping → adding second item |
| 6 | **Bruno CLI comments** — `#` comments inside `.bru` body blocks cause parse errors | Moved design notes to `docs {}` block (Bruno's native documentation field) |

---

## API Testing — Chuck Norris API

**Endpoint:** `https://api.chucknorris.io`  
**Collection:** `api/chuck-norris-api/`

### Run with Bruno (git-native)
```bash
npm install -g @usebruno/cli
cd api/chuck-norris-api
bru run --env production
```

### Run with Postman
Import `api/chuck-norris-api/postman_collection.json` directly — no setup needed.

| Test | Endpoint | Assertions |
|------|----------|------------|
| TC-API-001 | GET `/jokes/random` | 7 — fields, types, URL, response time |
| TC-API-002 | GET `/jokes/random?category=dev` | 3 — category filter |
| TC-API-002b | GET `/jokes/random?category=invalid` | 3 — 404 + bug documented |
| TC-API-003 | GET `/jokes/search?query=code` | 6 — search results |
| TC-API-003b | GET `/jokes/search?query=` | 2 — 400 negative |
| TC-API-005 | GET `/jokes/categories` | 5 — categories list |
| TC-API-004 | POST `/jokes` | Design proposal only |

---

## Deliverables

| Part | Deliverable | Location |
|------|-------------|---------|
| 01 | Feature Inventory | `docs/feature-inventory.md` |
| 01 | Test Scenarios (37 cases) | `docs/test-scenarios.md` |
| 01 | Reported Issues (5 issues) | `docs/reported-issues.md` |
| 01 | Notion — Test Scenarios | [View](https://www.notion.so/381dc52899cd80b4b0a3e292a739f05b?v=0465afcb3d5b49e7b9373272ab7de0e5) |
| 01 | Notion — Feature Inventory | [View](https://www.notion.so/381dc52899cd805294bcf993c140a0f3?v=d4380f97dbe0429f92e1849d9ba57b8a) |
| 01 | Notion — Bug Reports | [View](https://www.notion.so/381dc52899cd80dcb967c3036f24093d?v=d4380f97dbe0429f92e1849d9ba57b8a) |
| 02 | API Testing — Bruno collection | `api/chuck-norris-api/` |
| 02 | API Testing — Postman export | `api/chuck-norris-api/postman_collection.json` |
| 02 | API Testing docs | `docs/api-testing.md` |
| 03 | Automation code | `tests/` + `src/` |
| 03 | CI/CD pipeline | `.github/workflows/ci.yml` |
| 03 | HTML Report | `playwright-report/` or GitHub Actions artifact |
