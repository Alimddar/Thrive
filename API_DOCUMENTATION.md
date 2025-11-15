# API Documentation

## Base Information

**Base URL**: `http://localhost:8000` (Development)

**API Framework**: FastAPI

**Content-Type**: `application/json`

**Date Format**: ISO 8601 (YYYY-MM-DD)

**Currency**: AZN (Azerbaijani Manat)

---

## Table of Contents

1. [Health Check](#1-health-check)
2. [Get Personalized Offers](#2-get-personalized-offers)
3. [Get Demo Offers](#3-get-demo-offers)
4. [Get All Products](#4-get-all-products)
5. [Purchase Product](#5-purchase-product)
6. [Data Models](#data-models)
7. [Error Handling](#error-handling)

---

## Endpoints

### 1. Health Check

Check if the API is running.

**Endpoint**: `GET /`

**Authentication**: None

**Request**: No parameters required

**Response**:
```json
{
  "Hello": "World"
}
```

**Status Code**: `200 OK`

**Example cURL**:
```bash
curl -X GET http://localhost:8000/
```

---

### 2. Get Personalized Offers

Get AI-powered personalized offers based on user profile and purchase history.

**Endpoint**: `POST /offers/`

**Authentication**: None (Add your authentication later)

**Request Body**:
```json
{
  "name": "Aysel Mammadova",
  "location": "Baku, Azerbaijan",
  "district": "Nasimi",
  "member_since": "2022-05-15",
  "purchase_history": [
    {
      "date": "2024-10-15",
      "partner": "Madeera Furniture",
      "category": "furniture",
      "subcategory": "living_room",
      "amount": 850
    },
    {
      "date": "2024-09-22",
      "partner": "TechZone Electronics",
      "category": "electronics",
      "subcategory": "smartphones",
      "amount": 1200
    }
  ],
  "preferences": {
    "shopping_style": "quality_focused",
    "seasonal_interest": ["black_friday", "new_year"],
    "brands": ["Apple", "Samsung", "Madeera"]
  },
  "analytics": {
    "avg_monthly_spending": 1500,
    "purchase_frequency": 3.5,
    "loyalty_score": 85
  }
}
```

**Response**:
```json
{
  "recommended_offers": [
    {
      "id": "offer_001",
      "partner_id": "partner_001",
      "partner_name": "Madeera Furniture",
      "campaign_name": "Black Friday Furniture Sale",
      "description": "500 AZN üzeri mobilya alışverişinde %15 cashback",
      "category": "furniture",
      "subcategory": "all_furniture",
      "conditions": {
        "min_purchase": 500,
        "discount_type": "cashback",
        "discount_value": 15,
        "max_cashback": 150
      },
      "valid_from": "2024-11-01",
      "valid_until": "2024-11-30",
      "monthly_budget": 50000,
      "target_customers": ["new_home_buyers", "renovators", "high_spenders"],
      "seasonal": true,
      "tags": ["furniture", "home", "luxury", "black_friday"],
      "locations": ["Baku", "Sumqayit", "Ganja"],
      "location_specific": false,
      "match": {
        "match_score": 87.5,
        "similarity": 0.812,
        "bonus_points": 30,
        "method": "ai",
        "eligible": true
      }
    }
  ]
}
```

**Status Code**: `200 OK`

**Notes**:
- The system uses AI (SentenceTransformer) to match user profiles with offers
- Returns top 5 offers by default (configurable)
- Match score must be >= 40 for an offer to be eligible
- Offers are sorted by match_score in descending order

**Example cURL**:
```bash
curl -X POST http://localhost:8000/offers/ \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Aysel Mammadova",
    "location": "Baku, Azerbaijan",
    "district": "Nasimi",
    "member_since": "2022-05-15",
    "purchase_history": [
      {
        "date": "2024-10-15",
        "partner": "Madeera Furniture",
        "category": "furniture",
        "subcategory": "living_room",
        "amount": 850
      }
    ],
    "preferences": {
      "shopping_style": "quality_focused",
      "seasonal_interest": ["black_friday"],
      "brands": ["Apple"]
    },
    "analytics": {
      "avg_monthly_spending": 1500,
      "purchase_frequency": 3.5,
      "loyalty_score": 85
    }
  }'
```

**Example JavaScript (Fetch)**:
```javascript
const userProfile = {
  name: "Aysel Mammadova",
  location: "Baku, Azerbaijan",
  district: "Nasimi",
  member_since: "2022-05-15",
  purchase_history: [
    {
      date: "2024-10-15",
      partner: "Madeera Furniture",
      category: "furniture",
      subcategory: "living_room",
      amount: 850
    }
  ],
  preferences: {
    shopping_style: "quality_focused",
    seasonal_interest: ["black_friday"],
    brands: ["Apple"]
  },
  analytics: {
    avg_monthly_spending: 1500,
    purchase_frequency: 3.5,
    loyalty_score: 85
  }
};

fetch('http://localhost:8000/offers/', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(userProfile)
})
  .then(response => response.json())
  .then(data => console.log(data.recommended_offers))
  .catch(error => console.error('Error:', error));
```

---

### 3. Get Demo Offers

Get personalized offers using a pre-configured demo user profile (useful for testing).

**Endpoint**: `GET /offers/demo`

**Authentication**: None

**Request**: No parameters required

**Response**:
```json
{
  "user": "Aysel Mammadova",
  "recommended_offers": [
    {
      "id": "offer_001",
      "partner_id": "partner_001",
      "partner_name": "Madeera Furniture",
      "campaign_name": "Black Friday Furniture Sale",
      "description": "500 AZN üzeri mobilya alışverişinde %15 cashback",
      "category": "furniture",
      "subcategory": "all_furniture",
      "conditions": {
        "min_purchase": 500,
        "discount_type": "cashback",
        "discount_value": 15,
        "max_cashback": 150
      },
      "valid_from": "2024-11-01",
      "valid_until": "2024-11-30",
      "monthly_budget": 50000,
      "target_customers": ["new_home_buyers", "renovators", "high_spenders"],
      "seasonal": true,
      "tags": ["furniture", "home", "luxury", "black_friday"],
      "locations": ["Baku", "Sumqayit", "Ganja"],
      "location_specific": false,
      "match": {
        "match_score": 87.5,
        "similarity": 0.812,
        "bonus_points": 30,
        "method": "ai",
        "eligible": true
      }
    }
  ]
}
```

**Status Code**: `200 OK`

**Notes**:
- Uses the DEMO_USER profile from `ai/data.json`
- Useful for testing without sending user data
- Returns the same format as POST /offers/

**Example cURL**:
```bash
curl -X GET http://localhost:8000/offers/demo
```

**Example JavaScript (Fetch)**:
```javascript
fetch('http://localhost:8000/offers/demo')
  .then(response => response.json())
  .then(data => {
    console.log('Demo User:', data.user);
    console.log('Offers:', data.recommended_offers);
  })
  .catch(error => console.error('Error:', error));
```

---

### 4. Get All Products

Retrieve the complete product catalog.

**Endpoint**: `GET /products/`

**Authentication**: None

**Request**: No parameters required

**Response**:
```json
{
  "products": [
    {
      "id": 1,
      "name": "İPhone 15 Pro Max",
      "brand": "Apple",
      "category": "elektronika",
      "price": 2499,
      "rating": 4.8,
      "reviews": 324,
      "image": "https://buy.gazelle.com/cdn/shop/files/iPhone_15_Pro_Max_-_Black_Titanium.jpg",
      "badge": "Yeni",
      "description": "256GB, Titan Blue"
    },
    {
      "id": 2,
      "name": "Samsung Galaxy S24 Ultra",
      "brand": "Samsung",
      "category": "telefon",
      "price": 2199,
      "rating": 4.7,
      "reviews": 256,
      "image": "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=500&q=80",
      "badge": "Endirim",
      "description": "512GB, Titanium Gray"
    }
  ]
}
```

**Status Code**: `200 OK`

**Product Categories**:
- `elektronika` - Electronics
- `telefon` - Phones
- `geyim` - Clothing
- `ev` - Home
- `kosmetika` - Cosmetics
- `kitab` - Books

**Product Badges**:
- `Yeni` - New
- `Endirim` - Discount
- `Populyar` - Popular
- `null` - No badge

**Example cURL**:
```bash
curl -X GET http://localhost:8000/products/
```

**Example JavaScript (Fetch)**:
```javascript
fetch('http://localhost:8000/products/')
  .then(response => response.json())
  .then(data => {
    console.log('Products:', data.products);
    // Display products in your UI
    data.products.forEach(product => {
      console.log(`${product.name} - ${product.price} AZN`);
    });
  })
  .catch(error => console.error('Error:', error));
```

---

### 5. Purchase Product

Process a product purchase and automatically check for applicable discounts and cashback offers. The response includes an AI-generated summary of the purchase.

**Endpoint**: `POST /products/purchase/`

**Authentication**: None (Add your authentication later)

**Request Body**:
```json
{
  "user_id": "user_12345",
  "product_id": 1
}
```

**Parameters**:
- `user_id` (string | integer): User identifier
- `product_id` (string | integer): Product identifier from the products catalog

**Response** (With Discount Applied):
```json
{
  "status": "success",
  "original_data": {
    "user_id": "user_12345",
    "product": {
      "id": 1,
      "name": "İPhone 15 Pro Max",
      "brand": "Apple",
      "category": "elektronika",
      "price": 2499,
      "rating": 4.8,
      "reviews": 324,
      "image": "https://buy.gazelle.com/cdn/shop/files/iPhone_15_Pro_Max.jpg",
      "badge": "Yeni",
      "description": "256GB, Titan Blue"
    },
    "status": "purchased",
    "original_price": 2499,
    "discount_applied": true,
    "offer_details": {
      "offer_id": "offer_003",
      "offer_name": "Tech Enthusiast Smartphone Deal",
      "partner": "TechZone Electronics",
      "discount_type": "instant_discount",
      "discount_percentage": 12,
      "discount_amount": 299.88,
      "final_price": 2199.12,
      "cashback_amount": 0
    },
    "message": "Your purchase qualifies for 'Tech Enthusiast Smartphone Deal' from TechZone Electronics! You will get 12% instant_discount (299.88 AZN)",
    "all_applicable_offers": [
      {
        "offer_id": "offer_003",
        "offer_name": "Tech Enthusiast Smartphone Deal",
        "partner": "TechZone Electronics",
        "discount_type": "instant_discount",
        "discount_percentage": 12,
        "discount_amount": 299.88,
        "final_price": 2199.12,
        "cashback_amount": 0
      }
    ]
  },
  "summary": "You've purchased the İPhone 15 Pro Max (256GB, Titan Blue) from Apple. The original price was 2499 AZN, but you qualified for the 'Tech Enthusiast Smartphone Deal' from TechZone Electronics, giving you a 12% instant discount of 299.88 AZN. Your final amount to pay is 2199.12 AZN. Great savings on your new phone!"
}
```

**Response** (No Discount Available):
```json
{
  "status": "success",
  "original_data": {
    "user_id": "user_12345",
    "product": {
      "id": 3,
      "name": "Nike Air Max 270",
      "brand": "Nike",
      "category": "geyim",
      "price": 189,
      "rating": 4.5,
      "reviews": 189,
      "image": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80",
      "badge": "Populyar",
      "description": "Kişi idman ayaqqabısı"
    },
    "status": "purchased",
    "original_price": 189,
    "discount_applied": false,
    "message": "No discount offers available for this product"
  },
  "summary": "You've purchased Nike Air Max 270 (Kişi idman ayaqqabısı) from Nike for 189 AZN. Unfortunately, no discount offers were available for this purchase, so you'll pay the full price of 189 AZN."
}
```

**Response** (Product Not Found):
```json
{
  "status": "success",
  "original_data": {
    "error": "Product not found",
    "product_id": 999
  },
  "summary": "There was an error processing your request. The product with ID 999 could not be found in our catalog. Please check the product ID and try again."
}
```

**Status Codes**:
- `200 OK` - Purchase processed successfully
- Response status field indicates operation status

**Discount Types**:
- `instant_discount` - Immediately deducted from the price (affects `final_price`)
- `cashback` - Money returned after purchase (see `cashback_amount`)

**Category Mapping** (for offer matching):
- `elektronika` → `electronics`
- `telefon` → `electronics`
- `geyim` → `clothing`
- `ev` → `home_decor`
- `kosmetika` → `home_decor`
- `kitab` → `home_decor`

**Notes**:
- The endpoint automatically finds the best applicable offer for the product
- Multiple offers may apply; the best one is selected automatically
- `all_applicable_offers` contains all matching offers sorted by discount amount
- AI-powered summary is generated using Google Gemini 2.5 Flash
- The summary is user-friendly and in natural language

**Example cURL**:
```bash
curl -X POST http://localhost:8000/products/purchase/ \
  -H "Content-Type: application/json" \
  -d '{
    "user_id": "user_12345",
    "product_id": 1
  }'
```

**Example JavaScript (Fetch)**:
```javascript
const purchaseData = {
  user_id: "user_12345",
  product_id: 1
};

fetch('http://localhost:8000/products/purchase/', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(purchaseData)
})
  .then(response => response.json())
  .then(data => {
    console.log('Purchase Status:', data.status);
    console.log('AI Summary:', data.summary);

    const purchaseInfo = data.original_data;
    if (purchaseInfo.discount_applied) {
      console.log('Discount Applied!');
      console.log('Original Price:', purchaseInfo.original_price);
      console.log('Final Price:', purchaseInfo.offer_details.final_price);
      console.log('You Saved:', purchaseInfo.offer_details.discount_amount, 'AZN');
    } else {
      console.log('No discounts available');
      console.log('Price:', purchaseInfo.original_price, 'AZN');
    }
  })
  .catch(error => console.error('Error:', error));
```

**Example React Component**:
```javascript
import { useState } from 'react';

function PurchaseButton({ productId, userId }) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handlePurchase = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8000/products/purchase/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: userId, product_id: productId })
      });
      const data = await response.json();
      setResult(data);

      // Show the AI-generated summary to the user
      alert(data.summary);
    } catch (error) {
      console.error('Purchase failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={handlePurchase} disabled={loading}>
        {loading ? 'Processing...' : 'Purchase Now'}
      </button>

      {result && result.original_data.discount_applied && (
        <div className="discount-badge">
          Save {result.original_data.offer_details.discount_amount} AZN!
        </div>
      )}
    </div>
  );
}
```

---

## Data Models

### User Profile Model

```typescript
interface UserProfile {
  name: string;
  location: string;
  district: string;
  member_since: string; // ISO date format: "YYYY-MM-DD"
  purchase_history: PurchaseHistoryItem[];
  preferences: UserPreferences;
  analytics: UserAnalytics;
}

interface PurchaseHistoryItem {
  date: string; // ISO date format
  partner: string;
  category: string;
  subcategory: string;
  amount: number; // in AZN
}

interface UserPreferences {
  shopping_style: string; // e.g., "quality_focused", "bargain_hunter", "impulse_buyer"
  seasonal_interest: string[]; // e.g., ["black_friday", "new_year", "summer_sale"]
  brands: string[]; // e.g., ["Apple", "Samsung", "Nike"]
}

interface UserAnalytics {
  avg_monthly_spending: number; // in AZN
  purchase_frequency: number; // purchases per month
  loyalty_score: number; // 0-100
}
```

### Offer Model

```typescript
interface Offer {
  id: string;
  partner_id: string;
  partner_name: string;
  campaign_name: string;
  description: string;
  category: string;
  subcategory: string;
  conditions: OfferConditions;
  valid_from: string; // ISO date format
  valid_until: string; // ISO date format
  monthly_budget: number; // in AZN
  target_customers: string[];
  seasonal: boolean;
  tags: string[];
  locations: string[];
  location_specific: boolean;
  specific_districts?: string[]; // Optional, only if location_specific is true
  location_priority_boost?: number; // Optional bonus points
  match?: MatchScore; // Only present in personalized offers response
}

interface OfferConditions {
  min_purchase: number; // Minimum purchase amount in AZN
  discount_type: "cashback" | "instant_discount";
  discount_value: number; // Percentage (e.g., 15 for 15%)
  max_cashback?: number; // Maximum cashback amount in AZN
  max_discount?: number; // Maximum discount amount in AZN
}

interface MatchScore {
  match_score: number; // 0-100
  similarity: number | null; // 0-1 (null if rule-based matching)
  bonus_points: number;
  method: "ai" | "rule-based";
  eligible: boolean; // true if match_score >= 40
}
```

### Product Model

```typescript
interface Product {
  id: number;
  name: string;
  brand: string;
  category: string; // "elektronika", "telefon", "geyim", "ev", "kosmetika", "kitab"
  price: number; // in AZN
  rating: number; // 0-5
  reviews: number;
  image: string; // URL
  badge: string | null; // "Yeni", "Endirim", "Populyar", or null
  description: string;
}
```

### Purchase Response Model

```typescript
interface PurchaseResponse {
  status: "success" | "error";
  original_data: PurchaseData;
  summary: string; // AI-generated human-readable summary
  message?: string; // Only present if error
}

interface PurchaseData {
  user_id: string | number;
  product: Product;
  status: "purchased";
  original_price: number;
  discount_applied: boolean;
  offer_details?: OfferDetails; // Only if discount_applied is true
  message: string;
  all_applicable_offers?: OfferDetails[]; // Only if discount_applied is true
  error?: string; // Only if product not found
  product_id?: number; // Only if product not found
}

interface OfferDetails {
  offer_id: string;
  offer_name: string;
  partner: string;
  discount_type: "cashback" | "instant_discount";
  discount_percentage: number;
  discount_amount: number; // Actual discount amount in AZN
  final_price: number; // Price after discount (only for instant_discount)
  cashback_amount: number; // Cashback amount (only for cashback type)
}
```

---

## Error Handling

### Standard Error Response

Most errors will return with a 200 status code but with error information in the response body:

```json
{
  "error": "Error description",
  "product_id": 999
}
```

### Common Error Scenarios

1. **Product Not Found**:
```json
{
  "error": "Product not found",
  "product_id": 999
}
```

2. **Invalid User Profile** (Missing required fields):
The API may raise a validation error if required fields are missing. Ensure all fields in the UserProfile model are provided.

3. **AI Service Error**:
If the AI service (Gemini) fails, the purchase will still complete, but the summary might contain an error message. Check the `status` field in the response.

---

## Integration Tips

### Setting Up the Base URL

```javascript
// config.js
export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

// api.js
import { API_BASE_URL } from './config';

export const api = {
  getProducts: () =>
    fetch(`${API_BASE_URL}/products/`).then(res => res.json()),

  getPersonalizedOffers: (userProfile) =>
    fetch(`${API_BASE_URL}/offers/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userProfile)
    }).then(res => res.json()),

  purchaseProduct: (userId, productId) =>
    fetch(`${API_BASE_URL}/products/purchase/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: userId, product_id: productId })
    }).then(res => res.json())
};
```

### Error Handling Best Practices

```javascript
async function fetchProducts() {
  try {
    const response = await fetch('http://localhost:8000/products/');

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data.error) {
      console.error('API Error:', data.error);
      return null;
    }

    return data.products;
  } catch (error) {
    console.error('Network error:', error);
    return null;
  }
}
```

### TypeScript Integration

```typescript
// types.ts
export interface UserProfile {
  name: string;
  location: string;
  district: string;
  member_since: string;
  purchase_history: PurchaseHistoryItem[];
  preferences: UserPreferences;
  analytics: UserAnalytics;
}

// ... (add all other interfaces from Data Models section)

// api.ts
import type { UserProfile, Product, PurchaseResponse } from './types';

const API_BASE_URL = 'http://localhost:8000';

export const api = {
  async getProducts(): Promise<Product[]> {
    const response = await fetch(`${API_BASE_URL}/products/`);
    const data = await response.json();
    return data.products;
  },

  async getPersonalizedOffers(userProfile: UserProfile) {
    const response = await fetch(`${API_BASE_URL}/offers/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userProfile)
    });
    return response.json();
  },

  async purchaseProduct(userId: string, productId: number): Promise<PurchaseResponse> {
    const response = await fetch(`${API_BASE_URL}/products/purchase/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: userId, product_id: productId })
    });
    return response.json();
  }
};
```

---

## Running the Backend

### Development Server

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

The API will be available at: `http://localhost:8000`

Interactive API documentation will be available at:
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

### Production Deployment

For production, use a production-grade ASGI server:

```bash
pip install gunicorn
gunicorn main:app -w 4 -k uvicorn.workers.UvicornWorker
```

---

## CORS Configuration

If your frontend is running on a different domain/port, you'll need to enable CORS in the backend. The backend should be configured to allow requests from your frontend origin.

Example CORS setup (if not already configured):
```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

---

## Contact & Support

For questions or issues regarding the API, contact the backend development team.

**Last Updated**: 2025-11-15
