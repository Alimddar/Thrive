import google.generativeai as genai
import json

# Configure API key
genai.configure(api_key="AIzaSyCwAjdO_rxwtEmPt1fxusWzRQRmUIiz4zs")

# Initialize the model
model = genai.GenerativeModel('gemini-2.5-flash')

def summarize_purchase_data(purchase_data: dict) -> dict:
    """
    Takes purchase/product JSON data and returns a summarized version using Gemini AI.

    Args:
        purchase_data: Dictionary containing purchase information

    Returns:
        Dictionary with original data and AI-generated summary
    """
    try:
        # Convert the purchase data to a formatted JSON string
        json_data = json.dumps(purchase_data, indent=2, ensure_ascii=False)

        # Create a prompt for Gemini
        prompt = f"""
You are a helpful assistant that summarizes purchase information in a user-friendly way.

Here is the purchase data in JSON format:
{json_data}

Please provide a concise, natural language summary of this purchase that includes:
1. What product was purchased
2. The price information (original price and any discounts)
3. Any offers or cashback applied
4. The final amount the user will pay or save

Keep the summary brief, friendly, and easy to understand. Use Azerbaijani currency (AZN) where applicable.
IMPORTANT: Your response must be entirely in Azerbaijani language.
"""

        # Generate summary using Gemini
        response = model.generate_content(prompt)

        return {
            "status": "success",
            "original_data": purchase_data,
            "summary": response.text
        }

    except Exception as e:
        return {
            "status": "error",
            "message": str(e),
            "original_data": purchase_data
        }
