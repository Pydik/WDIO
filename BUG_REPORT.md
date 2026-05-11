# Bug Report: Checkout without Products

## Issue Title
User can proceed to checkout page without items in cart

## Severity
🔴 **High**

## Priority
🔴 **High**

## Environment
- **Application**: SauceDemo (https://www.saucedemo.com)
- **Browser**: Chrome
- **OS**: Windows
- **Test Framework**: WebdriverIO v9.27.1

## Description
The application allows users to access the checkout page (Checkout Step One) even when their shopping cart is empty. This is a critical user experience issue that should prevent progression to checkout without items.

## Steps to Reproduce
1. Navigate to https://www.saucedemo.com
2. Log in with valid credentials (e.g., standard_user / password123)
3. Click the shopping cart icon (without adding any items)
4. Click the "Checkout" button
5. Observe the result

## Expected Behavior
- The system should prevent users from proceeding to checkout with an empty cart
- One of the following should occur:
  - A validation error message should display: "Error: No items in cart"
  - The "Checkout" button should be disabled when cart is empty
  - User should be redirected back to the inventory page

## Actual Behavior
- The user successfully navigates to the Checkout Step One page
- No error message is displayed
- The system allows form submission with an empty cart

## Test Evidence
Test case that reproduces the issue:
```typescript
it("Checkout without products  (bug report)", async () => {
  await InventoryPage.shoppingCart();
  await CartPage.checkoutBtn();
  await expect(browser).toHaveUrl(
    expect.stringContaining(CheckoutMain.path)
  );
});
```
## Related Test Files
- `test/specs/checkout.e2e.ts` (line ~50)
- `test/specs/cart.e2e.ts` (related cart functionality)

