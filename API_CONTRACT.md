# API Contract Documentation

This document defines the JSON contract for all API endpoints used by the SpiceVault React application.

## Base URL
```
http://localhost:3000/api
```

## 1. Get All Products

### Endpoint
```
GET /api/items
```

### Response Format
```json
[
  {
    "id": 1,
    "name": "Premium Almonds",
    "description": "Fresh California almonds, rich in vitamin E",
    "price": 299,
    "originalPrice": 399,
    "rating": 4.8,
    "reviews": 124,
    "category": "nuts",
    "badge": "20% OFF",
    "emoji": "🥜",
    "prices": {
      "50": 149,
      "100": 299,
      "200": 549,
      "250": 649,
      "500": 1199
    }
  },
  {
    "id": 2,
    "name": "Kashmiri Red Chili",
    "description": "Authentic Kashmiri chilies, mild heat, vibrant color",
    "price": 149,
    "originalPrice": 199,
    "rating": 4.9,
    "reviews": 89,
    "category": "spices",
    "badge": "HOT",
    "emoji": "🌶️",
    "prices": {
      "50": 79,
      "100": 149,
      "200": 279,
      "250": 329,
      "500": 599
    }
  }
]
```

### Field Descriptions
- `id` (number, required): Unique product identifier
- `name` (string, required): Product name
- `description` (string, required): Product description
- `price` (number, required): Base price in INR
- `originalPrice` (number, optional): Original price before discount
- `rating` (number, required): Product rating (0-5)
- `reviews` (number, required): Number of reviews
- `category` (string, required): One of: "nuts", "spices", "herbs", "seeds", "blends", "organic"
- `badge` (string, optional): Product badge text (e.g., "20% OFF", "NEW", "HOT")
- `emoji` (string, required): Emoji representation of the product
- `prices` (object, optional): Weight-based pricing
  - `50` (number): Price for 50g
  - `100` (number): Price for 100g
  - `200` (number): Price for 200g
  - `250` (number): Price for 250g
  - `500` (number): Price for 500g

## 2. Get Single Product

### Endpoint
```
GET /api/items/:id
```

### Parameters
- `id` (number): Product ID

### Response Format
```json
{
  "id": 1,
  "name": "Premium Almonds",
  "description": "Fresh California almonds, rich in vitamin E",
  "price": 299,
  "originalPrice": 399,
  "rating": 4.8,
  "reviews": 124,
  "category": "nuts",
  "badge": "20% OFF",
  "emoji": "🥜",
  "prices": {
    "50": 149,
    "100": 299,
    "200": 549,
    "250": 649,
    "500": 1199
  }
}
```

### Error Response (404)
```json
{
  "error": "Product not found"
}
```

## 3. Search Products

### Endpoint
```
GET /api/items/search?q=query
```

### Parameters
- `q` (string): Search query

### Response Format
```json
[
  {
    "id": 1,
    "name": "Premium Almonds",
    "description": "Fresh California almonds, rich in vitamin E",
    "price": 299,
    "originalPrice": 399,
    "rating": 4.8,
    "reviews": 124,
    "category": "nuts",
    "badge": "20% OFF",
    "emoji": "🥜",
    "prices": {
      "50": 149,
      "100": 299,
      "200": 549,
      "250": 649,
      "500": 1199
    }
  }
]
```

## 4. Error Response Format

### General Error Response
```json
{
  "error": "Error message",
  "code": "ERROR_CODE",
  "details": "Additional error details"
}
```

### HTTP Status Codes
- `200`: Success
- `400`: Bad Request
- `404`: Not Found
- `500`: Internal Server Error

## 5. Sample Complete Product List

```json
[
  {
    "id": 1,
    "name": "Premium Almonds",
    "description": "Fresh California almonds, rich in vitamin E",
    "price": 299,
    "originalPrice": 399,
    "rating": 4.8,
    "reviews": 124,
    "category": "nuts",
    "badge": "20% OFF",
    "emoji": "🥜",
    "prices": {
      "50": 149,
      "100": 299,
      "200": 549,
      "250": 649,
      "500": 1199
    }
  },
  {
    "id": 2,
    "name": "Kashmiri Red Chili",
    "description": "Authentic Kashmiri chilies, mild heat, vibrant color",
    "price": 149,
    "originalPrice": 199,
    "rating": 4.9,
    "reviews": 89,
    "category": "spices",
    "badge": "HOT",
    "emoji": "🌶️",
    "prices": {
      "50": 79,
      "100": 149,
      "200": 279,
      "250": 329,
      "500": 599
    }
  },
  {
    "id": 3,
    "name": "Organic Turmeric",
    "description": "Pure organic turmeric powder, high curcumin",
    "price": 89,
    "originalPrice": null,
    "rating": 4.7,
    "reviews": 156,
    "category": "spices",
    "badge": "ORGANIC",
    "emoji": "🟡",
    "prices": {
      "50": 49,
      "100": 89,
      "200": 169,
      "250": 199,
      "500": 369
    }
  },
  {
    "id": 4,
    "name": "Mixed Walnuts",
    "description": "Premium walnuts, brain food, omega-3 rich",
    "price": 549,
    "originalPrice": 649,
    "rating": 4.6,
    "reviews": 78,
    "category": "nuts",
    "badge": "15% OFF",
    "emoji": "🥥",
    "prices": {
      "50": 279,
      "100": 549,
      "200": 999,
      "250": 1199,
      "500": 2199
    }
  },
  {
    "id": 5,
    "name": "Garam Masala Blend",
    "description": "Traditional Indian spice blend, freshly ground",
    "price": 99,
    "originalPrice": null,
    "rating": 4.9,
    "reviews": 203,
    "category": "blends",
    "badge": "BESTSELLER",
    "emoji": "🧂",
    "prices": {
      "50": 59,
      "100": 99,
      "200": 179,
      "250": 219,
      "500": 399
    }
  },
  {
    "id": 6,
    "name": "Fresh Mint Leaves",
    "description": "Dried mint leaves, perfect for tea and cooking",
    "price": 79,
    "originalPrice": null,
    "rating": 4.5,
    "reviews": 67,
    "category": "herbs",
    "badge": "NEW",
    "emoji": "🌿",
    "prices": {
      "50": 39,
      "100": 79,
      "200": 149,
      "250": 179,
      "500": 329
    }
  },
  {
    "id": 7,
    "name": "Black Peppercorns",
    "description": "Whole black pepper, freshly ground flavor",
    "price": 199,
    "originalPrice": 249,
    "rating": 4.8,
    "reviews": 112,
    "category": "spices",
    "badge": "20% OFF",
    "emoji": "⚫",
    "prices": {
      "50": 99,
      "100": 199,
      "200": 369,
      "250": 449,
      "500": 829
    }
  },
  {
    "id": 8,
    "name": "Cashew Nuts",
    "description": "Premium quality cashews, roasted to perfection",
    "price": 449,
    "originalPrice": 549,
    "rating": 4.7,
    "reviews": 93,
    "category": "nuts",
    "badge": "18% OFF",
    "emoji": "🥜",
    "prices": {
      "50": 229,
      "100": 449,
      "200": 829,
      "250": 999,
      "500": 1849
    }
  }
]
```

## 6. Notes

### Optional Fields
- `originalPrice`: Can be `null` or omitted if no discount
- `badge`: Can be omitted if no special badge
- `prices`: Can be omitted - app will calculate based on base price

### Category Values
Must be one of: `"nuts"`, `"spices"`, `"herbs"`, `"seeds"`, `"blends"`, `"organic"`

### Price Format
All prices should be in Indian Rupees (INR) as numbers (not strings)

### Search Behavior
The search endpoint should search across:
- Product name (case-insensitive)
- Product description (case-insensitive)  
- Product category (case-insensitive)

### Fallback Behavior
If the `prices` object is missing, the React app will calculate prices as:
- 50g = 50% of base price
- 100g = 100% of base price
- 200g = 180% of base price
- 250g = 220% of base price
- 500g = 400% of base price
