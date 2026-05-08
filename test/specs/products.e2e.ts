import LoginPage from "../../pages/login.page.js";
import InventoryPage from "../../pages/inventory.page.js";
import { expect } from "@wdio/globals";
import { userData } from "../data/users.js";

// beforeEach(async () => {
//         await LoginPage.open()
//         await LoginPage.login(userData.standardUser.username, userData.standardUser.password)
//         expect(InventoryPage.inventoryItem).toBeDisplayed()
//     });

describe("Products", () => {
  // it('Sorting by Price: Low to High', async () => {
  //     const pricesLoHi = await (InventoryPage.itemPrice);
  //     //await inventoryPage.sortByLoHiClick();
  //     const priceValuesLoHi = [];
  //     for (let priceElement of pricesLoHi) {
  //         const priceText = await priceElement.getText();
  //         priceValuesLoHi.push(priceText)
  //     }
  //     await InventoryPage.sortByLoHiClick();
  //     const sortedNamesDesc = [...priceValuesLoHi].sort()
  //     const sortedPrices = await pricesLoHi.map(async (el) => await el.getText());
  //     console.log(priceValuesLoHi, sortedPrices , 'dsfgerdg')
  //     expect(sortedNamesDesc).toEqual(expect.arrayContaining(sortedPrices));
  // })
  //     it('Sorting by Price: High to Low', async () => {
  //         const pricesHiLo = await (InventoryPage.itemPrice);;
  //         const priceValuesHiLo = [];
  //         for (let priceElement of pricesHiLo) {
  //             const priceText = await priceElement.getText();
  //             priceValuesHiLo.push(priceText)
  //         }
  //         await InventoryPage.sortByHiLoClick();
  //         const sortedNamesDesc = [...priceValuesHiLo].sort()
  //     const sortedPrices = await pricesHiLo.map(async (el) => await el.getText());
  //     console.log(priceValuesHiLo, sortedPrices , 'dsfgerdg')
  //     expect(sortedNamesDesc).toEqual(expect.arrayContaining(sortedPrices));
  // })
  // it('Sorting by Name: A to Z', async () => {
  //     const namesAZ = await (InventoryPage.itemName);;
  //     const nameValuesAZ = [];
  //     for (let nameElement of namesAZ) {
  //         const nameText = await nameElement.getText();
  //         nameValuesAZ.push(nameText)
  //     }
  //     await InventoryPage.sortByNameAZ();
  //     const sortedNamesDesc = [...nameValuesAZ].sort()
  //     const sortedNames = await namesAZ.map(async (el) => await el.getText());
  //     console.log(nameValuesAZ, sortedNames , 'dsfgerdg')
  //     expect(sortedNamesDesc).toEqual(sortedNames);
  // })
  //    it('Sorting by Name: Z to A', async () => {
  //     const namesZA = await (InventoryPage.itemName);
  //     const nameValuesZA = [];
  //     for (let nameElement of namesZA) {
  //         const nameText = await nameElement.getText();
  //         nameValuesZA.push(nameText)
  //     }
  //     await InventoryPage.sortByNameZA();
  //     const sortedNamesDesc = [...nameValuesZA].sort().reverse()
  //     const sortedNames = await namesZA.map(async (el) => await el.getText());
  //     const sortedNamesZA = [...sortedNames].sort().reverse()
  //     expect(sortedNamesDesc).toEqual(sortedNamesZA);
  // })
});
const sortingTests = [
  {
    testName: "Price: Low to High",
    constSelector: () => InventoryPage.itemPrice,
    sortingMethod: () => InventoryPage.sortByLoHiClick(),
    SortingFunction: (a: string, b: string) =>
      parseFloat(a.replace("$", "").replace(",", "")) -
      parseFloat(b.replace("$", "").replace(",", "")),
  },
  {
    testName: "Price: High to Low",
    constSelector: () => InventoryPage.itemPrice,
    sortingMethod: () => InventoryPage.sortByHiLoClick(),
    SortingFunction: (a: string, b: string) =>
      parseFloat(b.replace("$", "").replace(",", "")) -
      parseFloat(a.replace("$", "").replace(",", "")),
  },
  {
    testName: "Name: A to Z",
    constSelector: () => InventoryPage.itemName,
    sortingMethod: () => InventoryPage.sortByNameAZ(),
    SortingFunction: (a: string, b: string) => a.localeCompare(b),
  },
  {
    testName: "Name: Z to A",
    constSelector: () => InventoryPage.itemName,
    sortingMethod: () => InventoryPage.sortByNameZA(),
    SortingFunction: (a: string, b: string) => b.localeCompare(a),
  },
];
sortingTests.forEach(
  ({ testName, constSelector, sortingMethod, SortingFunction }) => {
    it(testName, async () => {
      await LoginPage.open();
      await LoginPage.login(
        userData.standardUser.username,
        userData.standardUser.password,
      );
      expect(InventoryPage.inventoryItem).toBeDisplayed();

      const elements = await constSelector();

      const beforeElements = [];
      for (let dataElement of elements) {
        const infoText = await dataElement.getText();
        beforeElements.push(infoText);
      }
      await sortingMethod();

      const afterElements = [];
      for (let dataElement of elements) {
        const infoText = await dataElement.getText();
        afterElements.push(infoText);
      }

      const sortedItems = afterElements.sort(SortingFunction);

      expect(beforeElements).toEqual(expect.arrayContaining(sortedItems));
    });
  },
);
