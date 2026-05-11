import LoginPage from "../../pages/login.page.js";
import InventoryPage from "../../pages/inventory.page.js";
import CartPage from "../../pages/cart.page.js";
import CheckoutMain from "../../pages/checkoutMain.page.js";
import CheckoutStepTwoPage from "../../pages/checkoutStepTwo.page.js";
import CheckoutCompletePage from "../../pages/checkoutComplete.page.js";
import { userData } from "../data/users.js";

describe("Checkout", () => {
  beforeEach(async () => {
    await LoginPage.open();
    await LoginPage.login(userData.standardUser.username, userData.standardUser.password);
  });

  it("Valid Checkout", async () => {
    expect(InventoryPage.inventoryItem).toBeDisplayed();
    const selectedProduct = await InventoryPage.getRandomProduct();
    const nameText = await InventoryPage.getProductName(selectedProduct);
    const price = await InventoryPage.getProductPrice({
      product: selectedProduct,
    });
    await InventoryPage.addProductToCart(selectedProduct);
    expect(InventoryPage.shoppingCartBadge).toBeDisplayed();

    await InventoryPage.shoppingCartBadge.click();
    const actualName = await CartPage.getCartItemName();
    expect(actualName).toContain(nameText);

    await CartPage.checkoutBtn();
    await CheckoutMain.fillCheckout(
      userData.getRandomValuesUser.username,
      userData.getRandomValuesUser.password,
      userData.getRandomValuesUser.postalCode
    );
    await CheckoutMain.continue();
    expect(price).toBe(await CheckoutStepTwoPage.getInventoryItemPrice());

    expect(CheckoutStepTwoPage.title).toBeDisplayed();
    const cartItemNameOnStepTwo = await CheckoutStepTwoPage.getInventoryItemName();
    expect(cartItemNameOnStepTwo).toBe(nameText);
    await CheckoutStepTwoPage.finish();
    expect(browser).toHaveUrl(expect.stringContaining(CheckoutCompletePage.path));
    expect(CheckoutCompletePage.completeHeader).toHaveText("Thank you for your order!");

    await CheckoutCompletePage.backHome();
    expect(browser).toHaveUrl(expect.stringContaining(InventoryPage.path));
    expect(InventoryPage.shoppingCartBadge).not.toBeDisplayed();
  });

  it("Checkout without products  (bug report)", async () => {
    expect(InventoryPage.inventoryItem).toBeDisplayed();
    await InventoryPage.shoppingCart();

    await CartPage.checkoutBtn();
    expect(browser).toHaveUrl(expect.stringContaining(CheckoutMain.path));
  });

  it("Selecting a random number of items", async () => {
    expect(InventoryPage.inventoryItem).toBeDisplayed();
    const randomNumber =
      Math.floor(Math.random() * (await (InventoryPage.inventoryItem).length)) + 1;
    let selectedProductTittle;
    for (let i = 0; i < randomNumber; i++) {
      const selectedProduct = await InventoryPage.getRandomProduct();
      await InventoryPage.addProductToCart(selectedProduct);
      selectedProductTittle = await InventoryPage.getProductName(selectedProduct);
    }

    expect(InventoryPage.shoppingCartBadge).toHaveText(randomNumber.toString());

    await InventoryPage.shoppingCart();
    await CartPage.checkoutBtn();
    await CheckoutMain.fillCheckout(
      userData.getRandomValuesUser.username,
      userData.getRandomValuesUser.password,
      userData.getRandomValuesUser.postalCode
    );
    await CheckoutMain.continue();
    expect(CheckoutStepTwoPage.title).toBeDisplayed();
    await CheckoutStepTwoPage.finish();
    expect(browser).toHaveUrl(expect.stringContaining(CheckoutCompletePage.path));
    expect(CheckoutCompletePage.completeHeader).toHaveText("Thank you for your order!");

    await CheckoutCompletePage.backHome();
    expect(browser).toHaveUrl(expect.stringContaining(InventoryPage.path));
    expect(InventoryPage.shoppingCartBadge).not.toBeDisplayed();
  });
});
