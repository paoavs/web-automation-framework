export const InventoryLocators = {
  productList: '.inventory_list',
  productItems: '.inventory_item',
  productName: '.inventory_item_name',
  productPrice: '.inventory_item_price',
  productImage: '.inventory_item img',
  productDescription: '.inventory_item_desc',
  sortDropdown: '.product_sort_container',
  addToCartBackpack: '[data-test="add-to-cart-sauce-labs-backpack"]',
  addToCartBikeLight: '[data-test="add-to-cart-sauce-labs-bike-light"]',
  addToCartBoltTshirt: '[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]',
  addToCartFleeceJacket: '[data-test="add-to-cart-sauce-labs-fleece-jacket"]',
  addToCartOnesie: '[data-test="add-to-cart-sauce-labs-onesie"]',
  addToCartRedTshirt: '[data-test="add-to-cart-test.allthethings()-t-shirt-(red)"]',
  removeBackpack: '[data-test="remove-sauce-labs-backpack"]',
  removeBikeLight: '[data-test="remove-sauce-labs-bike-light"]',
} as const;

export const ProductDetailLocators = {
  backButton: '[data-test="back-to-products"]',
  productName: '.inventory_details_name',
  productPrice: '.inventory_details_price',
  productDescription: '.inventory_details_desc',
  productImage: '.inventory_details_img',
  addToCart: '[data-test="add-to-cart"]',
  remove: '[data-test="remove"]',
} as const;

export const SortOptions = {
  nameAZ: 'az',
  nameZA: 'za',
  priceLowHigh: 'lohi',
  priceHighLow: 'hilo',
} as const;
