# How to Run the FastAPI Application

## 1. Install Dependencies

```bash
pip install fastapi uvicorn sentence-transformers
```

## 2. Start the Server

```bash
cd /home/alimddar/Desktop/hackhaton-application/backend
uvicorn main:app --reload
```

The server will start at: `http://127.0.0.1:8000`

## 3. Test the Endpoints

### Option 1: Quick Demo (GET request - easiest!)

Open your browser or use curl:

```bash
curl http://127.0.0.1:8000/offers/demo
```

This uses the demo user from data.json automatically.

### Option 2: Custom User Profile (POST request)

Use curl with a custom user profile:

```bash
curl -X POST http://127.0.0.1:8000/offers/ \
  -H "Content-Type: application/json" \
  -d '{
    "id": "user_002",
    "name": "John Doe",
    "location": "Baku, Azerbaijan",
    "district": "Nasimi",
    "member_since": "2023-01-01",
    "purchase_history": [
        {
            "date": "2024-10-01",
            "partner": "TechZone Electronics",
            "category": "electronics",
            "subcategory": "smartphones",
            "amount": 1500
        }
    ],
    "preferences": {
        "favorite_categories": ["electronics", "sports"],
        "brands": ["Apple", "Samsung"],
        "shopping_style": "tech_enthusiast",
        "price_sensitivity": "medium",
        "seasonal_interest": ["winter_sports", "technology"]
    },
    "analytics": {
        "avg_monthly_spending": 2000,
        "purchase_frequency": 5,
        "preferred_partners": ["TechZone Electronics"],
        "active_hours": "18:00-22:00",
        "loyalty_score": 75
    }
}'
```

### Option 3: Interactive API Documentation

Open your browser and go to:
- **Swagger UI**: http://127.0.0.1:8000/docs
- **ReDoc**: http://127.0.0.1:8000/redoc

You can test all endpoints interactively from the Swagger UI!

## API Endpoints

1. `GET /` - Hello World test
2. `GET /offers/demo` - Get offers for demo user (no input needed)
3. `POST /offers/` - Get offers for custom user profile (requires JSON body)
