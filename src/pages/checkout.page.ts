import { Page } from '@playwright/test';
import { Stagehand } from '@browserbasehq/stagehand';
import { CheckoutLocators } from '../locators/checkout.locators.js';
import { smartClick, smartFill, smartGetText } from '../helpers/smart-action.helper.js';

export type CustomerInfo = {
  firstName: string;
  lastName: string;
  zip: string;
};

export class CheckoutPage {
  constructor(private page: Page, private sh?: Stagehand | null) {}

  get url(): string {
    return this.page.url();
  }

  // ── Step 1: Customer Info ──────────────────────────────────

  async fillCustomerInfo(info: CustomerInfo): Promise<void> {
    await smartFill(this.page, CheckoutLocators.firstNameInput, info.firstName, 'fill in the First Name field', this.sh);
    await smartFill(this.page, CheckoutLocators.lastNameInput, info.lastName, 'fill in the Last Name field', this.sh);
    await smartFill(this.page, CheckoutLocators.postalCodeInput, info.zip, 'fill in the Zip/Postal Code field', this.sh);
  }

  async continue(): Promise<void> {
    await smartClick(this.page, CheckoutLocators.continueButton, 'click the Continue button', this.sh);
  }

  async cancel(): Promise<void> {
    await smartClick(this.page, CheckoutLocators.cancelButton, 'click the Cancel button', this.sh);
  }

  async getValidationError(): Promise<string> {
    return smartGetText(
      this.page,
      CheckoutLocators.errorMessage,
      'get the validation error message on the checkout page',
      this.sh,
    );
  }

  // ── Step 2: Overview ──────────────────────────────────────

  async getPaymentInfo(): Promise<string> {
    return smartGetText(this.page, CheckoutLocators.paymentInfoValue, 'get the payment information value', this.sh);
  }

  async getShippingInfo(): Promise<string> {
    return smartGetText(this.page, CheckoutLocators.shippingInfoValue, 'get the shipping information value', this.sh);
  }

  async getPriceSummary(): Promise<{ subtotal: number; tax: number; total: number }> {
    const parse = (text: string) => parseFloat(text.replace(/[^0-9.]/g, ''));
    return {
      subtotal: parse(await this.page.locator(CheckoutLocators.subtotalLabel).textContent() ?? ''),
      tax: parse(await this.page.locator(CheckoutLocators.taxLabel).textContent() ?? ''),
      total: parse(await this.page.locator(CheckoutLocators.totalLabel).textContent() ?? ''),
    };
  }

  async finish(): Promise<void> {
    await smartClick(this.page, CheckoutLocators.finishButton, 'click the Finish button', this.sh);
  }

  // ── Step 3: Confirmation ──────────────────────────────────

  async getConfirmationHeader(): Promise<string> {
    return smartGetText(
      this.page,
      CheckoutLocators.completeHeader,
      'get the order confirmation header message',
      this.sh,
    );
  }

  async backHome(): Promise<void> {
    await smartClick(this.page, CheckoutLocators.backHomeButton, 'click the Back Home button', this.sh);
  }
}
