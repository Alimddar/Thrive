# Quick Start Guide - Intelligent Admin Panel

## 🚀 Getting Started in 5 Minutes

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Start the Application
```bash
npm run dev
```

### Step 3: Access the Application
- **Public Store**: http://localhost:5173
- **Admin Panel**: http://localhost:5173/admin

---

## 🎮 Testing the Personalized Discount System

### Simulate User Behavior

1. **Browse Products** (Visit http://localhost:5173)
   - Scroll through products - this tracks views automatically
   - Click on different categories using the filter sidebar
   - The system tracks which categories you view most

2. **Add Products to Cart**
   - Click "Səbətə əlavə et" (shopping cart icon)
   - This increases your engagement score for that category

3. **Make Purchases**
   - Click "İndi Al" (Buy Now) on products
   - Wait for the 5-second loading animation
   - This tracks purchases and builds your loyalty tier

4. **See Personalized Discounts**
   - After interacting with products, refresh the page
   - Products in categories you've interacted with will show personalized discounts
   - Look for the "Şəxsi Endirim" (Personalized Discount) badge

---

## 🎯 Viewing the Admin Dashboard

### Access Admin Panel
Navigate to: http://localhost:5173/admin

### Dashboard Overview

**Top Stats Cards:**
- Total products in system
- Products with active discounts
- Average discount percentage
- Total savings for users

**User Context Section:**
- **Weather Data**: Current season, temperature, location
- **Loyalty Level**: Your tier based on purchases
- **Shopping Patterns**: Most viewed/purchased categories

**Discount Criteria Breakdown:**
Shows how many products have each type of discount applied:
- Behavioral (based on browsing)
- Seasonal (based on weather)
- Loyalty (based on purchases)
- Frequency (based on recent activity)
- Cross-category (shopping across categories)

**Category Distribution:**
See your engagement score for each category

---

## 📦 Product Management

### Navigate to Products Page
Click "Məhsul İdarəsi" in the admin sidebar

### Features:

1. **Search Products**
   - Use the search box to find products by name or brand

2. **Filter by Category**
   - Select a category from the dropdown

3. **View Discount Details**
   - Click the blue eye icon or the criteria count button
   - See detailed breakdown of why each discount was applied

4. **Understand Discount Criteria**
   - Each product shows:
     - Original price
     - Discounted price
     - Total discount percentage
     - Number of criteria applied

5. **Detailed Modal**
   - Click to see full breakdown
   - Each criterion shows:
     - Title (e.g., "Behavioral Analysis")
     - Discount percentage contributed
     - Description of why it applies
     - Detailed metrics

---

## 📊 Analytics Dashboard

### Navigate to Analytics
Click "Analitika və Hesabatlar" in the sidebar

### Available Reports:

1. **Top Statistics**
   - Total views
   - Total purchases
   - Total revenue
   - Average conversion rate

2. **Category Views Bar Chart**
   - See which categories are most popular
   - Visual bar chart with percentages

3. **Revenue by Category**
   - Pie chart showing revenue distribution
   - Color-coded categories

4. **Conversion Rates**
   - View to purchase conversion for each category
   - Higher percentage = better performance

5. **Category Engagement**
   - Overall engagement scores
   - Breakdown of views, cart adds, and purchases

6. **30-Day Timeline**
   - Visual chart of activity over last 30 days
   - Blue bars = views
   - Green bars = purchases

7. **Discount Impact Analysis**
   - See how many products have discounts
   - Average discount amount
   - Total savings generated
   - Current loyalty tier

---

## 🧪 Testing Different Scenarios

### Scenario 1: New User (No History)
1. Clear browser data or use incognito mode
2. Visit the store
3. Products will have minimal or no personalized discounts
4. Admin panel will show "Bronze" or "None" loyalty tier

### Scenario 2: Loyal Customer
1. Purchase 5+ products from different categories
2. Reload the products page
3. See increased discounts across all categories
4. Admin panel shows "Silver" or "Gold" tier

### Scenario 3: Category Specialist
1. View and purchase multiple items from ONE category (e.g., "geyim")
2. Reload products page
3. See significantly higher discounts on that category
4. Other categories will have lower discounts

### Scenario 4: Seasonal Shopper
1. Note the current season in the Admin Dashboard
2. Products matching the season will have higher discounts
3. Example: In winter, clothing items with "coat", "jacket" in name get bonuses

---

## 🎨 Understanding the Color Coding

### Discount Criteria Colors:
- 🟣 **Purple** (#667eea): Behavioral discounts
- 🟠 **Orange** (#f59e0b): Seasonal discounts
- 🟢 **Green** (#10b981): Loyalty discounts
- 🟪 **Purple Variant** (#8b5cf6): Frequency discounts
- 🔵 **Cyan** (#06b6d4): Cross-category discounts

### Loyalty Tier Colors:
- **Platinum** (#a78bfa): 20+ purchases
- **Gold** (#fbbf24): 10-19 purchases
- **Silver** (#94a3b8): 5-9 purchases
- **Bronze** (#fb923c): 2-4 purchases
- **None** (#64748b): 0-1 purchases

---

## 🔍 Where User Data is Stored

All user behavior data is stored in your browser's localStorage under the key: `userBehaviorData`

### To View Raw Data:
1. Open browser DevTools (F12)
2. Go to "Application" or "Storage" tab
3. Click "Local Storage"
4. Look for `userBehaviorData`

### Data Structure:
```json
{
  "userId": "user_xxx",
  "purchaseHistory": [...],
  "browsingHistory": [...],
  "categoryPreferences": {...},
  "location": {...},
  "weatherData": {...}
}
```

### To Reset:
- Clear browser data
- Or use the "Clear Data" button (if implemented)
- Or manually delete from localStorage in DevTools

---

## 📱 Responsive Design

The admin panel is fully responsive:
- **Desktop**: Full sidebar navigation
- **Tablet**: Collapsible sidebar
- **Mobile**: Hamburger menu (sidebar toggles)

Test by resizing your browser window!

---

## 🐛 Troubleshooting

### Products Not Loading?
- Check browser console for errors
- Ensure `npm run dev` is running
- Clear browser cache and reload

### Discounts Not Showing?
- You may not have enough browsing history
- Try purchasing a few products first
- Check Admin Dashboard to see your engagement scores

### Admin Panel Blank?
- Ensure you're at http://localhost:5173/admin (not /admin/)
- Check for JavaScript errors in console
- Verify all admin files are present in `src/admin/`

### Styles Not Applied?
- Verify `admin-styles.css` is imported in App.jsx
- Clear browser cache
- Check DevTools console for CSS load errors

---

## 💡 Pro Tips

1. **View Discount Details**: Always click the eye icon to understand WHY a discount was applied

2. **Compare Products**: Look at products in different categories to see how behavior affects pricing

3. **Check Analytics**: The timeline chart shows patterns - purchase more on certain days to see the data

4. **Loyalty Tiers**: Try to reach different tiers to see how dramatically discounts change

5. **Seasonal Impact**: Check how weather/season affects clothing vs electronics vs other categories

6. **Reset to Test**: Use incognito mode to simulate new users without clearing your main browser data

---

## 🎓 Learning Exercises

### Exercise 1: Build Loyalty
- Start as a new user
- Purchase 10 products
- Watch your loyalty tier increase
- Observe how discounts improve

### Exercise 2: Category Focus
- Focus all purchases on one category
- See how that category gets premium discounts
- Compare to other categories you haven't purchased from

### Exercise 3: Cross-Shopping
- Purchase from 5+ different categories
- See the cross-category bonus apply
- Notice the small additional discounts

### Exercise 4: Seasonal Testing
- Note the current season
- Look for products that match seasonal keywords
- Compare their discounts to non-seasonal products

---

## 📞 Need Help?

Check the main [ADMIN_PANEL_README.md](./ADMIN_PANEL_README.md) for:
- Detailed architecture
- Algorithm explanations
- Customization options
- API documentation

---

**Happy Testing! 🎉**

Explore the intelligent discount system and see how user behavior dynamically shapes product pricing!
