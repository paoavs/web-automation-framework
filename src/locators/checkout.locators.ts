export const CheckoutLocators = {
  // Step 1 - Customer Info
  firstNameInput: '[data-test="firstName"]',
  lastNameInput: '[data-test="lastName"]',
  postalCodeInput: '[data-test="postalCode"]',
  continueButton: '[data-test="continue"]',
  cancelButton: '[data-test="cancel"]',
  errorMessage: '[data-test="error"]',

  // Step 2 - Overview
  overviewTitle: '.title',
  cartItems: '.cart_item',
  paymentInfoLabel: '[data-test="payment-info-label"]',
  paymentInfoValue: '[data-test="payment-info-value"]',
  shippingInfoLabel: '[data-test="shipping-info-label"]',
  shippingInfoValue: '[data-test="shipping-info-value"]',
  subtotalLabel: '.summary_subtotal_label',
  taxLabel: '.summary_tax_label',
  totalLabel: '.summary_total_label',
  finishButton: '[data-test="finish"]',

  // Step 3 - Complete
  completeHeader: '.complete-header',
  completeText: '.complete-text',
  completeIcon: '.pony_express',
  backHomeButton: '[data-test="back-to-products"]',
} as const;
