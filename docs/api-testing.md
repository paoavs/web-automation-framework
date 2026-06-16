# API Testing — Chuck Norris API

**API:** https://api.chucknorris.io  
**Tool:** Bruno (v3.4.2) — git-native API client  
**Date:** 2026-06-15

---

## Endpoints Tested

| # | Method | Endpoint | Description |
|---|--------|----------|-------------|
| TC-API-001 | GET | `/jokes/random` | Get a random joke |
| TC-API-002 | GET | `/jokes/random?category=dev` | Get joke by category |
| TC-API-002b | GET | `/jokes/random?category=invalid` | Invalid category (negative) |
| TC-API-003 | GET | `/jokes/search?query=code` | Search jokes by keyword |
| TC-API-003b | GET | `/jokes/search?query=` | Empty search query (negative) |
| TC-API-004 | POST | `/jokes` | Create joke — **design proposal** |
| TC-API-005 | GET | `/jokes/categories` | List all available categories |

---

## Test Results

| Test | Status | Notes |
|------|--------|-------|
| TC-API-001 | ✅ 7 passing | All fields and response time validated |
| TC-API-002 | ✅ 3 passing | Category filter works correctly |
| TC-API-002b | ✅ 3 passing (bug documented) | 404 returned but error body lacks `message` field |
| TC-API-003 | ✅ 6 passing | Search returns matching results, all items contain query term |
| TC-API-003b | ✅ 2 passing | 400 returned for empty query |
| TC-API-005 | ✅ 5 passing | Categories list validated, known categories present |

**Run all tests:**
```bash
cd api/chuck-norris-api
bru run --env production
```

---

## API Bug Found

### BUG-API-001 — Invalid category error response missing descriptive message

**Endpoint:** `GET /jokes/random?category=invalidcategory`  
**Severity:** Low | **Priority:** P4

**Expected response:**
```json
{
  "status": 404,
  "error": "Not Found",
  "message": "No jokes found for category: invalidcategory"
}
```

**Actual response:**
```json
{
  "timestamp": "2026-06-15T00:00:00.000+00:00",
  "status": 404,
  "error": "Not Found",
  "path": "/jokes/random"
}
```

**Impact:** API consumers cannot identify which category is invalid from the error response alone. The `path` field only shows `/jokes/random` without the query parameter, making debugging harder.

---

## POST /jokes — Design Proposal

### How the request would look

```http
POST https://api.chucknorris.io/jokes
Content-Type: application/json

{
  "value": "Chuck Norris can unit test entire applications with a single assertion.",
  "categories": ["dev"],
  "safe": true,
  "lang": "en"
}
```

**Field definitions:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `value` | string | ✅ | The joke text |
| `categories` | string[] | ❌ | One or more existing categories |
| `safe` | boolean | ❌ | Whether the joke is safe for all audiences (default: `true`) |
| `lang` | string | ❌ | Language code ISO 639-1 (default: `"en"`) |

**Expected response (201 Created):**
```json
{
  "id": "auto_generated_unique_id",
  "value": "Chuck Norris can unit test entire applications with a single assertion.",
  "categories": ["dev"],
  "safe": true,
  "lang": "en",
  "icon_url": "https://api.chucknorris.io/img/avatar/chuck-norris.png",
  "url": "https://api.chucknorris.io/jokes/auto_generated_unique_id",
  "created_at": "2026-06-15T00:00:00.000Z",
  "updated_at": "2026-06-15T00:00:00.000Z"
}
```

---

## What I Would Test on POST /jokes

### Happy Path
| Test | Validation |
|------|-----------|
| Create joke with all fields | Status 201 · Response contains generated `id` · `value` matches input · `url` includes the new `id` |
| Create joke with only `value` (minimal) | Status 201 · Optional fields default correctly (`safe: true`, `lang: "en"`, `categories: []`) |
| Created joke is retrievable | After POST → GET `/jokes/{id}` → returns the same joke |

### Negative / Validation
| Test | Expected |
|------|---------|
| Missing `value` field | 400 Bad Request · Error specifies `value` is required |
| Empty `value` string | 400 Bad Request · Validation error |
| `value` too short (< 10 chars) | 400 Bad Request · Min length violation |
| `value` too long (> 1000 chars) | 400 Bad Request · Max length violation |
| Invalid `categories` value | 400 Bad Request · Category must exist in `/jokes/categories` |
| Invalid `lang` code | 400 Bad Request · Unsupported language |
| Duplicate joke text | 409 Conflict · Or 201 with new ID (document which is expected) |

### Edge Cases
| Test | Validation |
|------|-----------|
| `value` with special characters (`"`, `<`, `>`, emojis) | 201 · Value stored and retrieved correctly (XSS prevention) |
| `value` with only spaces | 400 · Treated as empty |
| `categories` as empty array `[]` | 201 · Joke created with no category |
| `safe: false` | 201 · Stored correctly, may require auth |

### How I Would Test It
1. **Bruno collection** with each case as a separate `.bru` request
2. **Variables** for reusable test data (`{{jokeValue}}`, `{{categoryList}}`)
3. **Post-response scripts** to store the created `id` and chain into a GET to verify persistence
4. **CI integration** via `bru run --env production` in GitHub Actions
