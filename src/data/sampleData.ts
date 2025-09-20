import { Product } from '../types';

export const sampleProducts: Product[] = [
  {
    id: 1,
    name: "Premium Almonds",
    category: "NUT",
    subCategory: "Tree Nuts",
    retailPrice: 880.44,
    price200g: 158,
    quantity: 100,
    unit: "KG",
    imageUrl: null,
    imageFilenames: ["1_1758334557501.jpg", "1_1758334557502.jpg"],
    description: "Fresh California almonds, rich in vitamin E",
    isActive: true,
    createdAt: "2024-01-01T00:00:00Z",
    supplier: {
      id: 1,
      name: "California Nuts Co."
    },
    prices: {
      "50": 44,
      "100": 88,
      "200": 158,
      "250": 194,
      "500": 352
    },
    // Legacy fields for backwards compatibility
    price50g: 149,
    price100g: 299,
    price250g: 649,
    price500g: 1199,
    emoji: "🥜",
    badge: "20% OFF",
    rating: 4.8,
    reviews: 124,
    originalPrice: 399
  },
  {
    id: 2,
    name: "Kashmiri Red Chili",
    category: "SPICE",
    subCategory: "Hot Spices",
    retailPrice: 149,
    price200g: 279,
    quantity: 50,
    unit: "KG",
    imageUrl: null,
    description: "Authentic Kashmiri chilies, mild heat, vibrant color",
    isActive: true,
    createdAt: "2024-01-02T00:00:00Z",
    supplier: {
      id: 2,
      name: "Kashmir Spice House"
    },
    prices: {
      "50": 79,
      "100": 149,
      "200": 279,
      "250": 329,
      "500": 599
    },
    // Legacy fields for backwards compatibility
    price50g: 79,
    price100g: 149,
    price250g: 329,
    price500g: 599,
    emoji: "🌶️",
    badge: "HOT",
    rating: 4.9,
    reviews: 89,
    originalPrice: 199
  },
  {
    id: 3,
    name: "Organic Turmeric",
    category: "SPICE",
    subCategory: "Ground Spices",
    retailPrice: 89,
    price200g: 169,
    quantity: 75,
    unit: "KG",
    imageUrl: null,
    description: "Pure organic turmeric powder, high curcumin",
    isActive: true,
    createdAt: "2024-01-03T00:00:00Z",
    supplier: {
      id: 3,
      name: "Organic Spices Ltd"
    },
    prices: {
      "50": 45,
      "100": 89,
      "200": 169,
      "250": 210,
      "500": 399
    },
    // Legacy fields for backwards compatibility
    price50g: 49,
    price100g: 89,
    price250g: 199,
    price500g: 369,
    emoji: "🟡",
    badge: "ORGANIC",
    rating: 4.7,
    reviews: 156
  },
  {
    id: 4,
    name: "Mixed Walnuts",
    category: "NUT",
    subCategory: "Tree Nuts",
    retailPrice: 549,
    price200g: 999,
    quantity: 40,
    unit: "KG",
    imageUrl: null,
    description: "Premium walnuts, brain food, omega-3 rich",
    isActive: true,
    createdAt: "2024-01-04T00:00:00Z",
    supplier: {
      id: 1,
      name: "California Nuts Co."
    },
    // Legacy fields for backwards compatibility
    price50g: 279,
    price100g: 549,
    price250g: 1199,
    price500g: 2199,
    emoji: "🥥",
    badge: "15% OFF",
    rating: 4.6,
    reviews: 78,
    originalPrice: 649
  },
  {
    id: 5,
    name: "Garam Masala Blend",
    category: "SPICE",
    subCategory: "Spice Blends",
    retailPrice: 99,
    price200g: 179,
    quantity: 60,
    unit: "KG",
    imageUrl: null,
    description: "Traditional Indian spice blend, freshly ground",
    isActive: true,
    createdAt: "2024-01-05T00:00:00Z",
    supplier: {
      id: 4,
      name: "Traditional Spices"
    },
    // Legacy fields for backwards compatibility
    price50g: 59,
    price100g: 99,
    price250g: 219,
    price500g: 399,
    emoji: "🧂",
    badge: "BESTSELLER",
    rating: 4.9,
    reviews: 203
  },
  {
    id: 6,
    name: "Fresh Mint Leaves",
    category: "SPICE",
    subCategory: "Herbs",
    retailPrice: 79,
    price200g: 149,
    quantity: 25,
    unit: "KG",
    imageUrl: null,
    description: "Dried mint leaves, perfect for tea and cooking",
    isActive: true,
    createdAt: "2024-01-06T00:00:00Z",
    supplier: {
      id: 5,
      name: "Herb Gardens"
    },
    // Legacy fields for backwards compatibility
    price50g: 39,
    price100g: 79,
    price250g: 179,
    price500g: 329,
    emoji: "🌿",
    badge: "NEW",
    rating: 4.5,
    reviews: 67
  },
  {
    id: 7,
    name: "Black Peppercorns",
    category: "SPICE",
    subCategory: "Whole Spices",
    retailPrice: 199,
    price200g: 369,
    quantity: 80,
    unit: "KG",
    imageUrl: null,
    description: "Whole black pepper, freshly ground flavor",
    isActive: true,
    createdAt: "2024-01-07T00:00:00Z",
    supplier: {
      id: 6,
      name: "Pepper Co."
    },
    // Legacy fields for backwards compatibility
    price50g: 99,
    price100g: 199,
    price250g: 449,
    price500g: 829,
    emoji: "⚫",
    badge: "20% OFF",
    rating: 4.8,
    reviews: 112,
    originalPrice: 249
  },
  {
    id: 8,
    name: "Cashew Nuts",
    category: "NUT",
    subCategory: "Tree Nuts",
    retailPrice: 449,
    price200g: 829,
    quantity: 35,
    unit: "KG",
    imageUrl: null,
    description: "Premium quality cashews, roasted to perfection",
    isActive: true,
    createdAt: "2024-01-08T00:00:00Z",
    supplier: {
      id: 1,
      name: "California Nuts Co."
    },
    // Legacy fields for backwards compatibility
    price50g: 229,
    price100g: 449,
    price250g: 999,
    price500g: 1849,
    emoji: "🥜",
    badge: "18% OFF",
    rating: 4.7,
    reviews: 93,
    originalPrice: 549
  },
  {
    id: 9,
    name: "Chia Seeds",
    category: "SEEDS",
    subCategory: "Superfood Seeds",
    retailPrice: 199,
    price200g: 379,
    quantity: 90,
    unit: "KG",
    imageUrl: null,
    description: "Superfood chia seeds, rich in omega-3 and fiber",
    isActive: true,
    createdAt: "2024-01-09T00:00:00Z",
    supplier: {
      id: 7,
      name: "Superfood Seeds Inc."
    },
    // Legacy fields for backwards compatibility
    price50g: 99,
    price100g: 199,
    price250g: 459,
    price500g: 849,
    emoji: "🌱",
    badge: "SUPERFOOD",
    rating: 4.6,
    reviews: 145
  },
  {
    id: 10,
    name: "Dates",
    category: "DRY FRUIT",
    subCategory: "Middle Eastern",
    retailPrice: 159,
    price200g: 299,
    quantity: 50,
    unit: "KG",
    imageUrl: null,
    description: "Sweet Medjool dates, natural energy booster",
    isActive: true,
    createdAt: "2024-01-10T00:00:00Z",
    supplier: {
      id: 8,
      name: "Desert Fruits Co."
    },
    // Legacy fields for backwards compatibility
    price50g: 79,
    price100g: 159,
    price250g: 369,
    price500g: 699,
    emoji: "🌿",
    badge: "FRESH",
    rating: 4.4,
    reviews: 87
  },
  // Combo Products
  {
    id: 11,
    name: "BUDGET COMBO 399",
    sku: "BUDGET-COMBO-399",
    price: 399,
    retailPrice: 399,
    totalCost: 298.5,
    isCombo: true,
    category: "NUT", // Default category for combos
    description: "Premium nuts and dry fruits combo at budget price",
    isActive: true,
    createdAt: "2025-08-24T18:14:03.464Z",
    items: [
      {
        quantityInGrams: 150,
        item: {
          id: 1,
          name: "Almond",
          subCategory: null,
          category: "NUT",
          imageUrl: null
        }
      },
      {
        quantityInGrams: 50,
        item: {
          id: 3,
          name: "Yellow raisins",
          subCategory: null,
          category: "DRY FRUIT",
          imageUrl: null
        }
      },
      {
        quantityInGrams: 50,
        item: {
          id: 4,
          name: "Black raisins",
          subCategory: null,
          category: "DRY FRUIT",
          imageUrl: null
        }
      },
      {
        quantityInGrams: 100,
        item: {
          id: 8,
          name: "Dry kiwi",
          subCategory: null,
          category: "DRY FRUIT",
          imageUrl: null
        }
      },
      {
        quantityInGrams: 200,
        item: {
          id: 10,
          name: "Black Dates",
          subCategory: "",
          category: "DRY FRUIT",
          imageUrl: null
        }
      },
      {
        quantityInGrams: 100,
        item: {
          id: 56,
          name: "Cashew Nuts",
          subCategory: "W320",
          category: "NUT",
          imageUrl: null
        }
      }
    ],
    emoji: "📦",
    badge: "COMBO",
    rating: 4.8,
    reviews: 45
  },
  {
    id: 12,
    name: "COMBO 499",
    sku: "COMBO-499",
    price: 499,
    retailPrice: 499,
    totalCost: 350,
    isCombo: true,
    category: "NUT", // Default category for combos
    description: "Premium nuts and dry fruits combo",
    isActive: true,
    createdAt: "2025-08-24T17:54:50.729Z",
    items: [
      {
        quantityInGrams: 150,
        item: {
          id: 56,
          name: "Cashew Nuts",
          subCategory: "W320",
          category: "NUT",
          imageUrl: null
        }
      },
      {
        quantityInGrams: 150,
        item: {
          id: 1,
          name: "Almond",
          subCategory: null,
          category: "NUT",
          imageUrl: null
        }
      },
      {
        quantityInGrams: 100,
        item: {
          id: 3,
          name: "Yellow raisins",
          subCategory: null,
          category: "DRY FRUIT",
          imageUrl: null
        }
      },
      {
        quantityInGrams: 100,
        item: {
          id: 4,
          name: "Black raisins",
          subCategory: null,
          category: "DRY FRUIT",
          imageUrl: null
        }
      },
      {
        quantityInGrams: 250,
        item: {
          id: 10,
          name: "Black Dates",
          subCategory: "",
          category: "DRY FRUIT",
          imageUrl: null
        }
      }
    ],
    emoji: "📦",
    badge: "COMBO",
    rating: 4.9,
    reviews: 62
  },
  {
    id: 88,
    name: "Premium Cashews",
    category: "NUT",
    subCategory: "Tree Nuts",
    retailPrice: 1200.00,
    price200g: 240,
    quantity: 100,
    unit: "KG",
    imageUrl: null,
    imageFilenames: ["88_1758334557504.jpg", "88_1758334557505.jpg"],
    description: "Premium quality cashews from Kerala",
    isActive: true,
    createdAt: "2024-01-01T00:00:00Z",
    supplier: {
      id: 1,
      name: "Kerala Cashew Co."
    },
    prices: {
      "50": 60,
      "100": 120,
      "200": 240,
      "250": 300,
      "500": 600
    },
    emoji: "🥜",
    badge: "PREMIUM",
    rating: 4.9,
    reviews: 89,
    originalPrice: 1200
  }
];

export const sampleCategories = [
  { name: 'NUT', count: 3, emoji: '🥜' },
  { name: 'SPICE', count: 4, emoji: '🌶️' },
  { name: 'DRY FRUIT', count: 1, emoji: '�' },
  { name: 'SEEDS', count: 1, emoji: '🌱' }
];
