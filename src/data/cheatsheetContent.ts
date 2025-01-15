export interface CheatsheetItem {
  title: string;
  code: string;
}

export const cheatsheetContent: CheatsheetItem[][] = [
  // Left column
  [
    {
      title: "Access all nested elements from a level",
      code: "//Product/*",
    },
    {
      title: "Access an element on any level",
      code: "//ProductID",
    },
    {
      title: "Find an item by its property",
      code: "//List/Product[ProductID='HT-7000']",
    },
    {
      title: "Select last element in a list",
      code: "//List/Product[last()]",
    },
    {
      title: "Filter based on a property",
      code: "//List/Product/ProductPrice[number(.) < 1000]",
    },
    {
      title: "Select element that starts with a specific string",
      code: "//List/Product[starts-with(ProductName, 'Professional')]",
    }
  ],
  // Right column
  [
    {
      title: "Sum of all prices greater than 1000",
      code: "sum(//List/Product/ProductPrice[number() > 1000])",
    },
    {
      title: "Search and count nodes that contain a specific string",
      code: "count(//Product[contains(ProductName, 'Compact')])",
    },
    {
      title: "Replace characters in a string",
      code: "//List/Product/translate(ProductName, 'C', 'B')",
    },
    {
      title: "Remove whitespace from a string",
      code: "//List/Product/translate(ProductName, ' ', '')",
    },
    {
      title: "Replace a full word in a string",
      code: "//List/Product/replace(ProductName, 'Compact', 'Bulky')",
    },
    {
      title: "Find products that are more expensive than the average price", 
      code: "//List/Product[ProductPrice > avg(//List/Product/ProductPrice/number())]"
    }
  ],
];
