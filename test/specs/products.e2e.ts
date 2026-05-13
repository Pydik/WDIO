import loginPage from "../../pages/login.page.js";
import inventoryPage from "../../pages/inventory.page.js";
import { userData } from "../data/users.js";

describe("Products", () => {
  const sortingTests = [
    {
      testName: "Price: Low to High",
      itemSelector: () => inventoryPage.itemPrice,
      sortingMethod: () => inventoryPage.sortByLoHi(),
      sortComparator: (a: string, b: string) =>
        parseFloat(a.replace("$", "").replace(",", "")) -
        parseFloat(b.replace("$", "").replace(",", "")),
    },
    {
      testName: "Price: High to Low",
      itemSelector: () => inventoryPage.itemPrice,
      sortingMethod: () => inventoryPage.sortByHiLo(),
      sortComparator: (a: string, b: string) =>
        parseFloat(b.replace("$", "").replace(",", "")) -
        parseFloat(a.replace("$", "").replace(",", "")),
    },
    {
      testName: "Name: A to Z",
      itemSelector: () => inventoryPage.itemName,
      sortingMethod: () => inventoryPage.sortByNameAZ(),
      sortComparator: (a: string, b: string) => a.localeCompare(b),
    },
    {
      testName: "Name: Z to A",
      itemSelector: () => inventoryPage.itemName,
      sortingMethod: () => inventoryPage.sortByNameZA(),
      sortComparator: (a: string, b: string) => b.localeCompare(a),
    },
  ];
  sortingTests.forEach(({ testName, itemSelector, sortingMethod, sortComparator }) => {
    it(testName, async () => {
      await loginPage.open();
      await loginPage.login(userData.standardUser.username, userData.standardUser.password);
      expect(inventoryPage.inventoryItem).toBeDisplayed();

      const elements = await itemSelector();

      const itemsBeforeSort: string[] = [];
      for (const itemElement of elements) {
        const itemText = await itemElement.getText();
        itemsBeforeSort.push(itemText);
      }
      await sortingMethod();

      const itemsAfterSort: string[] = [];
      for (const itemElement of elements) {
        const itemText = await itemElement.getText();
        itemsAfterSort.push(itemText);
      }

      const sortedItems = itemsAfterSort.sort(sortComparator);

      expect(itemsBeforeSort).toEqual(expect.arrayContaining(sortedItems));
    });
  });
});
