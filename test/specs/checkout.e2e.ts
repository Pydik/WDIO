import loginPage from "../../pages/login.page.js";
import inventoryPage from "../../pages/inventory.page.js";
import cartPage from "../../pages/cart.page.js";
import checkoutMain from "../../pages/checkoutMain.page.js";
import checkoutStepTwoPage from "../../pages/checkoutStepTwo.page.js";
import checkoutCompletePage from "../../pages/checkoutComplete.page.js";
import { userData } from "../data/users.js";

describe("Checkout", () => {
  beforeEach(async () => {
    await loginPage.open();
    await loginPage.login(userData.standardUser.username, userData.standardUser.password);
  });

  it("Valid Checkout", async () => {
    expect(inventoryPage.inventoryItem).toBeDisplayed();
    const selectedProduct = await inventoryPage.getRandomProduct();
    const nameText = await inventoryPage.getProductName(selectedProduct);
    const price = await inventoryPage.getProductPrice({
      product: selectedProduct,
    });
    await inventoryPage.addProductToCart(selectedProduct);
    expect(inventoryPage.shoppingCartBadge).toBeDisplayed();

    await inventoryPage.shoppingCartBadge.click();
    const actualName = await cartPage.getCartItemName();
    expect(actualName).toContain(nameText);

    await cartPage.checkoutBtn();
    await checkoutMain.fillCheckout(
      userData.getRandomValuesUser.username,
      userData.getRandomValuesUser.password,
      userData.getRandomValuesUser.postalCode
    );
    await checkoutMain.continue();
    expect(price).toBe(await checkoutStepTwoPage.getInventoryItemPrice());

    expect(checkoutStepTwoPage.title).toBeDisplayed();
    const cartItemNameOnStepTwo = await checkoutStepTwoPage.getInventoryItemName();
    expect(cartItemNameOnStepTwo).toBe(nameText);
    await checkoutStepTwoPage.finish();
    expect(browser).toHaveUrl(expect.stringContaining(checkoutCompletePage.path));
    expect(checkoutCompletePage.completeHeader).toHaveText("Thank you for your order!");

    await checkoutCompletePage.backHome();
    expect(browser).toHaveUrl(expect.stringContaining(inventoryPage.path));
    expect(inventoryPage.shoppingCartBadge).not.toBeDisplayed();
  });

  it("Checkout without products  (bug report)", async () => {
    expect(inventoryPage.inventoryItem).toBeDisplayed();
    await inventoryPage.shoppingCart();
    await cartPage.checkoutBtn();

    await expect(browser).toHaveUrl(expect.stringContaining('/cart'));
  });

  it("Selecting a random number of items", async () => {
    expect(inventoryPage.inventoryItem).toBeDisplayed();
    const randomNumber =
      Math.floor(Math.random() * (await (inventoryPage.inventoryItem).length)) + 1;
    let selectedProductTittle;
    for (let i = 0; i < randomNumber; i++) {
      const selectedProduct = await inventoryPage.getRandomProduct();
      inventoryPage.addProductToCart(selectedProduct);
      selectedProductTittle = inventoryPage.getProductName(selectedProduct);
    }

    expect(inventoryPage.shoppingCartBadge).toHaveText(randomNumber.toString());

    await inventoryPage.shoppingCart();
    await cartPage.checkoutBtn();
    await checkoutMain.fillCheckout(
      userData.getRandomValuesUser.username,
      userData.getRandomValuesUser.password,
      userData.getRandomValuesUser.postalCode
    );
    await checkoutMain.continue();
    expect(checkoutStepTwoPage.title).toBeDisplayed();
    await checkoutStepTwoPage.finish();
    expect(browser).toHaveUrl(expect.stringContaining(checkoutCompletePage.path));
    expect(checkoutCompletePage.completeHeader).toHaveText("Thank you for your order!");

    await checkoutCompletePage.backHome();
    expect(browser).toHaveUrl(expect.stringContaining(inventoryPage.path));
    expect(inventoryPage.shoppingCartBadge).not.toBeDisplayed();
  });
});
