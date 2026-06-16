export const USERS = {
  standard: {
    username: 'standard_user',
    password: 'secret_sauce',
    role: 'Standard user with full access',
  },
  locked: {
    username: 'locked_out_user',
    password: 'secret_sauce',
    role: 'Locked out — cannot login',
  },
  problem: {
    username: 'problem_user',
    password: 'secret_sauce',
    role: 'User with intentional UI bugs (broken images, broken sort)',
  },
  performance: {
    username: 'performance_glitch_user',
    password: 'secret_sauce',
    role: 'User with artificial performance delay',
  },
  error: {
    username: 'error_user',
    password: 'secret_sauce',
    role: 'User that triggers errors on certain interactions',
  },
  visual: {
    username: 'visual_user',
    password: 'secret_sauce',
    role: 'User with visual/UI bugs',
  },
} as const;

export const PRODUCTS = {
  backpack: { name: 'Sauce Labs Backpack', price: 29.99 },
  bikeLight: { name: 'Sauce Labs Bike Light', price: 9.99 },
  boltTshirt: { name: 'Sauce Labs Bolt T-Shirt', price: 15.99 },
  fleeceJacket: { name: 'Sauce Labs Fleece Jacket', price: 49.99 },
  onesie: { name: 'Sauce Labs Onesie', price: 7.99 },
  redTshirt: { name: 'Test.allTheThings() T-Shirt (Red)', price: 15.99 },
} as const;

export const CHECKOUT_DATA = {
  valid: { firstName: 'John', lastName: 'Doe', zip: '12345' },
  missingFirst: { firstName: '', lastName: 'Doe', zip: '12345' },
  missingLast: { firstName: 'John', lastName: '', zip: '12345' },
  missingZip: { firstName: 'John', lastName: 'Doe', zip: '' },
} as const;
