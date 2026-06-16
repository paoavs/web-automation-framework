import { Page } from '@playwright/test';
import { Stagehand } from '@browserbasehq/stagehand';
import { z } from 'zod';
import type { Page as PlaywrightPage } from 'playwright-core';

/**
 * Tries the Playwright locator first.
 * If it fails or times out, falls back to Stagehand AI acting on the same page.
 * If no Stagehand is available, rethrows the original error.
 */
export async function smartClick(
  page: Page,
  locator: string,
  aiInstruction: string,
  sh?: Stagehand | null,
): Promise<void> {
  try {
    await page.click(locator, { timeout: 5000 });
  } catch (err) {
    if (sh) {
      console.log(`  ⚠ Locator failed [${locator}] → AI fallback: "${aiInstruction}"`);
      await sh.act(aiInstruction, { page: page as unknown as PlaywrightPage });
    } else {
      throw err;
    }
  }
}

export async function smartFill(
  page: Page,
  locator: string,
  value: string,
  aiInstruction: string,
  sh?: Stagehand | null,
): Promise<void> {
  try {
    await page.fill(locator, value, { timeout: 5000 });
  } catch (err) {
    if (sh) {
      console.log(`  ⚠ Locator failed [${locator}] → AI fallback: "${aiInstruction}"`);
      await sh.act(`${aiInstruction}: "${value}"`, { page: page as unknown as PlaywrightPage });
    } else {
      throw err;
    }
  }
}

export async function smartGetText(
  page: Page,
  locator: string,
  aiInstruction: string,
  sh?: Stagehand | null,
): Promise<string> {
  try {
    return await page.locator(locator).textContent({ timeout: 5000 }) ?? '';
  } catch (err) {
    if (sh) {
      console.log(`  ⚠ Locator failed [${locator}] → AI fallback: "${aiInstruction}"`);
      const result = await sh.extract(
        aiInstruction,
        z.object({ text: z.string() }),
        { page: page as unknown as PlaywrightPage },
      );
      return result.text;
    }
    throw err;
  }
}

export async function smartIsVisible(
  page: Page,
  locator: string,
  aiInstruction: string,
  sh?: Stagehand | null,
): Promise<boolean> {
  try {
    return await page.locator(locator).isVisible({ timeout: 5000 });
  } catch (err) {
    if (sh) {
      console.log(`  ⚠ Locator failed [${locator}] → AI fallback: "${aiInstruction}"`);
      const result = await sh.extract(
        aiInstruction,
        z.object({ visible: z.boolean() }),
        { page: page as unknown as PlaywrightPage },
      );
      return result.visible;
    }
    throw err;
  }
}
