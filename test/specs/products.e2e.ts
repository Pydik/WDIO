import LoginPage from "../../pages/login.page.js";
import InventoryPage from "../../pages/inventory.page.js";
import { userData } from "../data/users.js";

describe("Products", () => {
  const sortingTests = [
    {
      testName: "Price: Low to High",
      itemSelector: () => InventoryPage.itemPrice,
      sortingMethod: () => InventoryPage.sortByLoHi(),
      sortComparator: (a: string, b: string) =>
        parseFloat(a.replace("$", "").replace(",", "")) -
        parseFloat(b.replace("$", "").replace(",", "")),
    },
    {
      testName: "Price: High to Low",
      itemSelector: () => InventoryPage.itemPrice,
      sortingMethod: () => InventoryPage.sortByHiLo(),
      sortComparator: (a: string, b: string) =>
        parseFloat(b.replace("$", "").replace(",", "")) -
        parseFloat(a.replace("$", "").replace(",", "")),
    },
    {
      testName: "Name: A to Z",
      itemSelector: () => InventoryPage.itemName,
      sortingMethod: () => InventoryPage.sortByNameAZ(),
      sortComparator: (a: string, b: string) => a.localeCompare(b),
    },
    {
      testName: "Name: Z to A",
      itemSelector: () => InventoryPage.itemName,
      sortingMethod: () => InventoryPage.sortByNameZA(),
      sortComparator: (a: string, b: string) => b.localeCompare(a),
    },
  ];
  sortingTests.forEach(({ testName, itemSelector, sortingMethod, sortComparator }) => {
    it(testName, async () => {
      await LoginPage.open();
      await LoginPage.login(userData.standardUser.username, userData.standardUser.password);
      expect(InventoryPage.inventoryItem).toBeDisplayed();

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
