# Bank Marketplace - İntelligent Admin Panel

## 🎯 Overview

This project implements a comprehensive admin panel with intelligent product management and personalized discount functionality. The system uses advanced algorithms to analyze user behavior, location, weather conditions, and shopping patterns to provide dynamic, personalized discounts across different product categories.

## ✨ Key Features

### 1. **Intelligent Discount Engine**
- **Multi-factor Analysis**: Calculates personalized discounts based on:
  - User behavior patterns (views, cart adds, purchases)
  - Seasonal/weather conditions
  - Customer loyalty tier
  - Purchase frequency
  - Cross-category shopping habits

- **Dynamic Pricing**: Products show different prices to different users based on their behavior
- **Transparent Criteria**: Every discount shows detailed reasoning for why it was applied

### 2. **User Behavior Tracking**
- Automatically tracks:
  - Product views
  - Cart additions
  - Purchases
  - Category preferences
  - Browsing patterns

- Stores data locally (localStorage) for persistence
- Calculates engagement scores for each category
- Analyzes shopping frequency and patterns

### 3. **Weather & Location Integration**
- Mock weather data based on seasons
- Location-aware discount calculations
- Season-specific product recommendations
- Temperature and condition-based pricing

### 4. **Admin Dashboard**
- **Overview Statistics**: Total products, discount coverage, average discounts, savings
- **User Context Display**: Weather, loyalty tier, shopping patterns
- **Discount Criteria Breakdown**: Visual representation of applied discount types
- **Category Distribution**: Detailed analytics by product category

### 5. **Product Management**
- Complete product listing with personalized discounts
- Filter by category and search
- View detailed discount criteria for each product
- See which factors contributed to each discount
- Export functionality (placeholder)

### 6. **Analytics & Reporting**
- **Category Analytics**: Views, purchases, revenue by category
- **Conversion Rates**: Track conversion from views to purchases
- **Engagement Scores**: Category-specific engagement metrics
- **Timeline Charts**: 30-day activity visualization
- **Discount Impact Analysis**: See how discounts affect purchasing

## 🏗️ Architecture

### File Structure

```
bank-marketplace/
├── src/
│   ├── admin/
│   │   ├── AdminLayout.jsx          # Admin panel layout with sidebar
│   │   └── pages/
│   │       ├── AdminDashboard.jsx   # Main admin dashboard
│   │       ├── ProductsAdmin.jsx    # Product management with discounts
│   │       ├── AnalyticsAdmin.jsx   # Analytics and reports
│   │       ├── UsersAdmin.jsx       # User management (placeholder)
│   │       └── SettingsAdmin.jsx    # Settings (placeholder)
│   ├── services/
│   │   ├── userBehaviorService.js   # User tracking and analysis
│   │   └── discountEngine.js        # Discount calculation engine
│   ├── components/
│   │   └── ProductCard.jsx          # Updated with tracking
│   ├── pages/
│   │   └── Products.jsx             # Updated with discount integration
│   ├── admin-styles.css             # Admin panel styles
│   └── App.jsx                      # Updated routing
```

### Core Services

#### **userBehaviorService.js**
Handles all user behavior tracking and analysis:

```javascript
// Track product view
trackProductView(product)

// Track cart addition
trackCartAdd(product)

// Track purchase
trackPurchase(product, quantity)

// Get weather data
getWeatherData()

// Analyze shopping patterns
analyzeShoppingPatterns()

// Check category frequency
isFrequentBuyerInCategory(category)
```

#### **discountEngine.js**
Calculates personalized discounts:

```javascript
// Calculate discount for a product
calculateDiscount(product)

// Apply discounts to all products
applyDiscountsToProducts(products)

// Get discount summary
getDiscountSummary(products)
```

## 📊 Discount Algorithm

### Discount Factors

1. **Behavioral Discount** (up to 15%)
   - Based on category engagement score
   - Weights: views (1pt), cart adds (3pts), purchases (5pts)
   - Tiers: 50+ score = 15%, 30-49 = 11.25%, 15-29 = 7.5%, 5-14 = 3.75%

2. **Seasonal Discount** (up to 10%)
   - Season-category relevance mapping
   - Specific product name matching
   - Weather condition multipliers
   - Example: Coats in winter get higher discounts

3. **Loyalty Discount** (up to 20%)
   - Platinum (20+ purchases): 20%
   - Gold (10+ purchases): 15%
   - Silver (5+ purchases): 10%
   - Bronze (2+ purchases): 5%
   - +3% bonus for category-specific loyalty

4. **Frequency Discount** (up to 15%)
   - Recent activity bonus
   - Last 7 days: 15%
   - Last 30 days: 11.25%
   - Last 90 days: 7.5%

5. **Cross-Category Discount** (up to 5%)
   - 5+ categories: 5%
   - 3+ categories: 3%

### Total Discount Calculation
- All factors are summed
- Maximum cap: 50% total discount
- Each factor is independently calculated and explained

## 🎨 UI Components

### Admin Sidebar
- Collapsible navigation
- Active route highlighting
- Icon-based menu items
- Logout button

### Dashboard Cards
- Stats overview with icons
- Color-coded information
- Hover effects
- Responsive grid layout

### Data Tables
- Sortable columns
- Product thumbnails
- Inline actions (view, edit, delete)
- Discount criteria badges
- Modal dialogs for details

### Charts & Analytics
- Bar charts for category views
- Pie chart legends for revenue
- Conversion rate visualizations
- Timeline activity charts
- Engagement score cards

## 🚀 Getting Started

### Prerequisites
- Node.js 14+
- npm or yarn

### Installation

1. Navigate to project directory:
```bash
cd bank-marketplace
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm run dev
```

4. Access the application:
- Public site: `http://localhost:5173`
- Admin panel: `http://localhost:5173/admin`

## 📱 Usage

### For Users (Public Site)

1. **Browse Products** (`/products`)
   - View products with personalized discounts
   - Filter by category, price, brand
   - Search products
   - Add to cart or buy now

2. **View Profile** (`/profile`)
   - See user information
   - Toggle discount settings

3. **Track Orders** (`/dashboard`)
   - View order history
   - Check order status

### For Admins (`/admin`)

1. **Dashboard** (`/admin`)
   - Overview of discount system
   - User behavior context
   - Discount criteria breakdown
   - Category distribution

2. **Products** (`/admin/products`)
   - View all products with applied discounts
   - Filter and search products
   - Click on discount criteria to see details
   - Understand why each discount was applied

3. **Analytics** (`/admin/analytics`)
   - Category performance metrics
   - Conversion rates
   - Revenue distribution
   - 30-day activity timeline
   - Discount impact analysis

## 💡 How Personalized Discounts Work

### Example Scenario

**User Profile:**
- Has purchased 3 clothing items in the past month
- Browses electronics frequently
- Location: Baku, Azerbaijan
- Season: Winter
- Loyalty Tier: Silver

**Product: Winter Coat (Clothing Category)**

Discount Breakdown:
1. **Behavioral**: 11.25% (High engagement with clothing)
2. **Seasonal**: 15% (Winter coat in winter season)
3. **Loyalty**: 13% (Silver tier + category loyalty bonus)
4. **Frequency**: 15% (Purchased clothing within 7 days)
5. **Cross-Category**: 3% (Shops in 3+ categories)

**Total Discount**: 57.25% → Capped at **50%**

**Original Price**: 200 ₼
**Discounted Price**: 100 ₼
**Savings**: 100 ₼

### Transparency

The admin panel shows:
- Each discount factor that was applied
- The exact percentage from each factor
- Detailed reasoning for each criterion
- User behavior data that influenced the discount
- Weather/season information
- Loyalty tier details

## 🔧 Customization

### Adjusting Discount Rules

Edit `src/services/discountEngine.js`:

```javascript
this.discountRules = {
  behaviorBased: 15,      // Max 15%
  seasonalBased: 10,      // Max 10%
  loyaltyBased: 20,       // Max 20%
  frequencyBased: 15,     // Max 15%
  crossCategory: 5        // Max 5%
};
```

### Adding New Seasons/Categories

Edit season-category mappings:

```javascript
this.seasonalRelevance = {
  winter: {
    geyim: { relevant: true, multiplier: 1.5 },
    // Add more categories
  }
};
```

### Modifying Loyalty Tiers

Change tier thresholds in discount calculation:

```javascript
if (totalPurchases >= 20) {
  tier = 'platinum';
  discount = 20;
}
// Modify thresholds as needed
```

## 📈 Data Flow

```
User Actions (View, Add to Cart, Purchase)
           ↓
userBehaviorService (Track & Store)
           ↓
Local Storage (Persist Data)
           ↓
discountEngine (Calculate Discounts)
           ↓
Products Display (Show Personalized Prices)
           ↓
Admin Dashboard (Analyze & Visualize)
```

## 🎯 Key Benefits

1. **Increased Conversion**: Personalized discounts encourage purchases
2. **Customer Loyalty**: Rewards frequent shoppers automatically
3. **Seasonal Optimization**: Right products promoted at the right time
4. **Data-Driven**: All decisions based on actual user behavior
5. **Transparency**: Users and admins understand discount reasoning
6. **Scalable**: Easy to add new discount factors or modify existing ones

## 🔐 Security Considerations

- Currently uses localStorage (client-side only)
- For production, implement:
  - Server-side user authentication
  - API for behavior tracking
  - Database storage for user data
  - Admin role-based access control
  - Rate limiting on discount calculations

## 🚧 Future Enhancements

### Planned Features

1. **Real Authentication**
   - JWT-based admin authentication
   - Role-based access control
   - Session management

2. **Backend Integration**
   - RESTful API for user behavior
   - Database storage (PostgreSQL/MongoDB)
   - Real-time discount updates
   - Server-side discount validation

3. **Advanced Analytics**
   - Predictive analytics
   - A/B testing for discount strategies
   - Customer lifetime value calculation
   - Churn prediction

4. **Weather API Integration**
   - Real-time weather data
   - Location-based API calls
   - Forecast-based promotions

5. **Machine Learning**
   - Product recommendation engine
   - Automated discount optimization
   - Anomaly detection in purchasing patterns

6. **Email Notifications**
   - Personalized discount alerts
   - Abandoned cart reminders
   - Loyalty tier achievements

## 📝 Notes

- All data is currently stored in browser localStorage
- Weather data is mocked based on current month
- Product images use external URLs
- No real payment integration
- Admin panel has no authentication (add before production)

## 🤝 Contributing

This is a demonstration project showing intelligent discount management. To extend:

1. Add real backend API integration
2. Implement user authentication
3. Connect to real weather API
4. Add payment processing
5. Implement email notifications
6. Add more sophisticated ML models

## 📄 License

This project is for educational and demonstration purposes.

---

**Built with React, Vite, and modern web technologies**
**Designed for intelligent, personalized e-commerce experiences**
