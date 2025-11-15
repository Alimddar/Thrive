// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
const API_TIMEOUT = 5000; // 5 seconds timeout

// Fetch with timeout helper
const fetchWithTimeout = async (url, options = {}, timeout = API_TIMEOUT) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
};

// API Service
export const api = {
  // Health Check
  healthCheck: async () => {
    try {
      const response = await fetchWithTimeout(`${API_BASE_URL}/`);
      return await response.json();
    } catch (error) {
      console.error('Health check failed:', error);
      console.warn('Backend is not available. Using fallback data.');
      throw error;
    }
  },

  // Get All Products
  getProducts: async () => {
    try {
      const response = await fetchWithTimeout(`${API_BASE_URL}/products/`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log('✅ Products loaded from API:', data.products.length);
      return data.products || [];
    } catch (error) {
      console.error('⚠️ Error fetching products from API:', error.message);
      console.warn('📦 Using mock data as fallback');
      throw error;
    }
  },

  // Get Personalized Offers
  getPersonalizedOffers: async (userProfile) => {
    try {
      const response = await fetch(`${API_BASE_URL}/offers/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userProfile)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.recommended_offers || [];
    } catch (error) {
      console.error('Error fetching personalized offers:', error);
      throw error;
    }
  },

  // Get Demo Offers
  getDemoOffers: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/offers/demo`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return {
        user: data.user,
        offers: data.recommended_offers || []
      };
    } catch (error) {
      console.error('Error fetching demo offers:', error);
      throw error;
    }
  },

  // Purchase Product
  purchaseProduct: async (userId, productId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/products/purchase/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: userId,
          product_id: productId
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error purchasing product:', error);
      throw error;
    }
  }
};

// Default user profile for demo/testing
export const DEFAULT_USER_PROFILE = {
  name: "Demo User",
  location: "Baku, Azerbaijan",
  district: "Nasimi",
  member_since: "2022-05-15",
  purchase_history: [
    {
      date: "2024-10-15",
      partner: "TechZone Electronics",
      category: "electronics",
      subcategory: "smartphones",
      amount: 1200
    }
  ],
  preferences: {
    shopping_style: "quality_focused",
    seasonal_interest: ["black_friday", "new_year"],
    brands: ["Apple", "Samsung"]
  },
  analytics: {
    avg_monthly_spending: 1500,
    purchase_frequency: 3.5,
    loyalty_score: 85
  }
};

export default api;
