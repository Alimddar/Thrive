from typing import Union
from fastapi import FastAPI, Body
from ai.ai_engine import OfferMatchingEngine
from gemini import summarize_purchase_data
from fastapi.middleware.cors import CORSMiddleware
app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",  # Vite default port
        "http://localhost:3000",
        "http://localhost:3001",
        "http://localhost:3002",
        "http://localhost:3003",  # Current frontend port
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.post("/offers/")
def get_offers(user_profile: dict = Body(...)):
    # Load data from JSON file
    data = OfferMatchingEngine.load_data('ai/data.json')

    # Get personalized offers
    recommended_offers = OfferMatchingEngine.get_personalized_offers(
        user=user_profile,
        offers=data['MONTHLY_OFFERS'],
        top_n=5
    )

    return {"recommended_offers": recommended_offers}

@app.get("/offers/demo")
def get_demo_offers():
    # Load data from JSON file
    data = OfferMatchingEngine.load_data('ai/data.json')

    # Use the demo user from data.json
    recommended_offers = OfferMatchingEngine.get_personalized_offers(
        user=data['DEMO_USER'],
        offers=data['MONTHLY_OFFERS'],
        top_n=5
    )

    return {
        "user": data['DEMO_USER']['name'],
        "recommended_offers": recommended_offers
    }

@app.get("/products/")
def get_products():
    # Load products from JSON file
    products = OfferMatchingEngine.load_data('ai/products.json')

    return {"products": products}


@app.post("/products/purchase/")
def purchase_product(user_id: Union[int, str] = Body(...), product_id: Union[int, str] = Body(...)):
    # Load products from JSON file
    products = OfferMatchingEngine.load_data('ai/products.json')

    # Convert product_id to int for comparison
    product_id = int(product_id)

    # Find the product with matching id
    product = next((p for p in products if p['id'] == product_id), None)

    if product is None:
        return {"error": "Product not found", "product_id": product_id}

    # Load offers to check for applicable discounts
    data = OfferMatchingEngine.load_data('ai/data.json')
    offers = data['MONTHLY_OFFERS']

    # Map product categories to offer categories
    category_mapping = {
        'elektronika': 'electronics',
        'telefon': 'electronics',
        'geyim': 'clothing',
        'ev': 'home_decor',
        'kosmetika': 'home_decor',
        'kitab': 'home_decor'
    }

    product_price = product['price']
    product_category = category_mapping.get(product['category'], product['category'])

    # Find applicable offers
    applicable_offers = []
    for offer in offers:
        # Check if product category matches offer category
        offer_subcategory = offer.get('subcategory', '')

        # Match logic:
        # 1. Exact category match (e.g., "electronics" == "electronics")
        # 2. "all_electronics" pattern match (subcategory starts with "all_" AND category matches)
        # 3. Direct subcategory match
        category_matches = (
            offer['category'] == product_category or
            (offer_subcategory.startswith('all_') and offer['category'] == product_category) or
            offer_subcategory == product_category
        )

        if category_matches:
            # Check if purchase amount meets minimum requirement
            if product_price >= offer['conditions']['min_purchase']:
                # Calculate discount amount
                discount_percentage = offer['conditions']['discount_value']
                discount_amount = (product_price * discount_percentage) / 100

                # Apply max discount/cashback limit
                max_limit_key = 'max_cashback' if offer['conditions']['discount_type'] == 'cashback' else 'max_discount'
                max_limit = offer['conditions'].get(max_limit_key, float('inf'))
                discount_amount = min(discount_amount, max_limit)
                discount_type = offer['conditions']['discount_type']



                discount_type = offer['conditions']['discount_type']

                # Force cashback → instant discount
                if discount_type == "cashback":
                    discount_type = "instant_discount"

                applicable_offers.append({
                    "offer_id": offer['id'],
                    "offer_name": offer['campaign_name'],
                    "partner": offer['partner_name'],
                    "discount_type": discount_type,  # use the updated one
                    "discount_percentage": discount_percentage,
                    "discount_amount": round(discount_amount, 2),
                    "final_price": round(product_price - discount_amount, 2),
                    "cashback_amount": 0  # because we are not using cashback anymore
                })


    # Sort by discount amount (best offer first)
    applicable_offers.sort(key=lambda x: x['discount_amount'], reverse=True)

    # Prepare response
    response = {
        "user_id": user_id,
        "product": product,
        "status": "purchased",
        "original_price": product_price
    }

    if applicable_offers:
        best_offer = applicable_offers[0]
        response["discount_applied"] = True
        response["offer_details"] = best_offer
        response["message"] = f"Your purchase qualifies for '{best_offer['offer_name']}' from {best_offer['partner']}! You will get {best_offer['discount_percentage']}% {best_offer['discount_type']} ({best_offer['discount_amount']} AZN)"
        response["all_applicable_offers"] = applicable_offers
    else:
        response["discount_applied"] = False
        response["message"] = "No discount offers available for this product"

    return summarize_purchase_data(response)