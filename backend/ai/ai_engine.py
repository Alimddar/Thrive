import json

try:
    from sentence_transformers import SentenceTransformer, util
    AI_MODEL = SentenceTransformer('sentence-transformers/all-MiniLM-L6-v2')
    AI_AVAILABLE = True
except:
    AI_AVAILABLE = False

class OfferMatchingEngine:
    
    @staticmethod
    def load_data(json_path='data.json'):
        with open(json_path, 'r', encoding='utf-8') as f:
            return json.load(f)
    
    @staticmethod
    def create_user_profile_text(user):
        categories = [p['category'] for p in user['purchase_history']]
        subcategories = [p['subcategory'] for p in user['purchase_history']]
        partners = [p['partner'] for p in user['purchase_history']]
        
        profile = f"""
User Profile:
Location: {user['location']}
District: {user.get('district', 'Unknown')}
Member since: {user['member_since']}
Frequent purchases: {', '.join(set(categories))}
Preferred subcategories: {', '.join(set(subcategories))}
Favorite stores: {', '.join(set(partners))}
Shopping style: {user['preferences']['shopping_style']}
Average spending: {user['analytics']['avg_monthly_spending']} AZN monthly
Purchase frequency: {user['analytics']['purchase_frequency']} times per month
Seasonal interests: {', '.join(user['preferences']['seasonal_interest'])}
Brands: {', '.join(user['preferences']['brands'])}
Loyalty score: {user['analytics']['loyalty_score']}/100
        """.strip()
        
        return profile
    
    @staticmethod
    def create_offer_text(offer):
        location_info = f"Available in: {', '.join(offer['locations'])}"
        if offer.get('location_specific'):
            location_info += f" - LOCATION SPECIFIC for: {', '.join(offer.get('specific_districts', []))}"
        
        text = f"""
Offer Details:
Partner: {offer['partner_name']}
Campaign: {offer['campaign_name']}
Description: {offer['description']}
Category: {offer['category']} - {offer['subcategory']}
Minimum purchase: {offer['conditions']['min_purchase']} AZN
Discount: {offer['conditions']['discount_value']}% {offer['conditions']['discount_type']}
Target customers: {', '.join(offer['target_customers'])}
Tags: {', '.join(offer['tags'])}
Seasonal: {'Yes' if offer['seasonal'] else 'No'}
{location_info}
Valid until: {offer['valid_until']}
        """.strip()
        
        return text
    
    @staticmethod
    def calculate_match_score(user, offer):
        if not AI_AVAILABLE:
            return OfferMatchingEngine.calculate_rule_based_match(user, offer)
        
        try:
            user_text = OfferMatchingEngine.create_user_profile_text(user)
            offer_text = OfferMatchingEngine.create_offer_text(offer)
            
            user_embedding = AI_MODEL.encode(user_text)
            offer_embedding = AI_MODEL.encode(offer_text)
            
            similarity = util.cos_sim(user_embedding, offer_embedding).item()
            
            bonus = OfferMatchingEngine.calculate_bonuses(user, offer)
            
            final_score = min((similarity * 70) + bonus, 100)
            
            return {
                "match_score": round(final_score, 1),
                "similarity": round(similarity, 3),
                "bonus_points": bonus,
                "method": "ai",
                "eligible": final_score >= 40
            }
            
        except Exception:
            return OfferMatchingEngine.calculate_rule_based_match(user, offer)
    
    @staticmethod
    def calculate_bonuses(user, offer):
        bonus = 0
        
        user_categories = [p['category'] for p in user['purchase_history']]
        if offer['category'] in user_categories:
            bonus += 15
        
        user_partners = [p['partner'] for p in user['purchase_history']]
        if offer['partner_name'] in user_partners:
            bonus += 10
        
        user_subcategories = [p['subcategory'] for p in user['purchase_history']]
        if offer['subcategory'] in user_subcategories:
            bonus += 10
        
        user_style = user['preferences']['shopping_style']
        if user_style in offer['target_customers']:
            bonus += 8
        
        if offer['seasonal']:
            user_seasonal = user['preferences']['seasonal_interest']
            offer_tags = offer['tags']
            if any(interest in offer_tags for interest in user_seasonal):
                bonus += 7
        
        min_purchase = offer['conditions']['min_purchase']
        avg_spending = user['analytics']['avg_monthly_spending']
        if avg_spending >= min_purchase * 2:
            bonus += 5
        
        user_location = user.get('location', '').split(',')[0].strip()
        if user_location in offer['locations']:
            bonus += 10
        
        if offer.get('location_specific'):
            user_district = user.get('district', '')
            specific_districts = offer.get('specific_districts', [])
            if user_district in specific_districts:
                bonus += offer.get('location_priority_boost', 0)
        
        return bonus
    
    @staticmethod
    def calculate_rule_based_match(user, offer):
        score = 0
        
        user_categories = [p['category'] for p in user['purchase_history']]
        if offer['category'] in user_categories:
            score += 30
        
        user_partners = [p['partner'] for p in user['purchase_history']]
        if offer['partner_name'] in user_partners:
            score += 25
        
        min_purchase = offer['conditions']['min_purchase']
        avg_spending = user['analytics']['avg_monthly_spending']
        if avg_spending >= min_purchase:
            score += 20
        
        if offer['seasonal']:
            score += 15
        
        user_location = user.get('location', '').split(',')[0].strip()
        if user_location in offer['locations']:
            score += 15
        
        if offer.get('location_specific'):
            user_district = user.get('district', '')
            specific_districts = offer.get('specific_districts', [])
            if user_district in specific_districts:
                score += 35
        
        return {
            "match_score": min(score, 100),
            "similarity": None,
            "bonus_points": score,
            "method": "rule-based",
            "eligible": score >= 40
        }
    
    @staticmethod
    def get_personalized_offers(user, offers, top_n=5):
        offers_with_scores = []
        
        for offer in offers:
            match_result = OfferMatchingEngine.calculate_match_score(user, offer)
            
            if match_result['eligible']:
                offers_with_scores.append({
                    **offer,
                    "match": match_result
                })
        
        offers_with_scores.sort(key=lambda x: x['match']['match_score'], reverse=True)
        
        return offers_with_scores[:top_n]