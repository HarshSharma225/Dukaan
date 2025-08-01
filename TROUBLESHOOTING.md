# Troubleshooting Guide for E-commerce App

## ProductList Not Loading Products

### Issue Description
The ProductList page shows a loading state indefinitely and doesn't display any products after deployment.

### Root Causes & Solutions

#### 1. **API URL Configuration Issues** ✅ FIXED
**Problem:** Components were using hardcoded URLs instead of environment-based configuration.

**Solution Applied:**
- Updated all components to use `API_BASE_URL` from `src/config.js`
- Fixed components: `ProductList.jsx`, `Signup.jsx`, `Login.jsx`, `ProductDetails.jsx`, `Cart.jsx`, `CheckoutPage.jsx`

#### 2. **CORS Configuration Issues**
**Problem:** Frontend can't access backend due to CORS restrictions.

**Check:**
- Verify `FRONTEND_URL` environment variable is set correctly in Render
- Ensure the frontend domain is included in the CORS allowed origins

**Solution:**
```javascript
// In server/index.js
app.use(cors({
    origin: process.env.NODE_ENV === 'production' 
        ? [process.env.FRONTEND_URL || 'https://your-frontend-domain.com', 'http://localhost:5173'] 
        : "http://localhost:5173",
    credentials: true
}));
```

#### 3. **Database Connection Issues**
**Problem:** Backend can't connect to MongoDB, so `/products` endpoint fails.

**Check:**
- Verify `DB_URL` environment variable is set in Render
- Check if MongoDB Atlas cluster is accessible
- Ensure IP whitelist includes Render's IP addresses

**Debug Steps:**
1. Check Render logs for database connection errors
2. Test MongoDB connection string locally
3. Verify MongoDB Atlas network access settings

#### 4. **Environment Variables Not Set**
**Problem:** Required environment variables are missing in Render.

**Required Variables:**
```
NODE_ENV=production
DB_URL=mongodb+srv://username:password@cluster.mongodb.net/database
JWT_SECRET=your_secret_key
FRONTEND_URL=https://your-frontend-domain.com
```

#### 5. **Backend Service Not Running**
**Problem:** The backend service is down or not responding.

**Check:**
- Verify Render service status
- Check if `npm start` command is working
- Review Render deployment logs

### Debugging Steps

#### 1. **Check Browser Network Tab**
1. Open browser developer tools
2. Go to Network tab
3. Refresh the ProductList page
4. Look for failed requests to `/products` endpoint
5. Check response status and error messages

#### 2. **Check Render Logs**
1. Go to your Render dashboard
2. Click on your backend service
3. Go to "Logs" tab
4. Look for:
   - Database connection errors
   - Server startup errors
   - API request errors

#### 3. **Test API Endpoint Directly**
1. Try accessing `https://your-backend-domain.onrender.com/products` directly in browser
2. Check if it returns JSON data or an error

#### 4. **Verify Environment Configuration**
1. Check if `src/config.js` has correct API URL
2. Verify environment variables in Render dashboard
3. Ensure frontend is using the correct environment

### Common Error Messages & Solutions

#### "Failed to fetch" Error
- **Cause:** CORS issue or backend not accessible
- **Solution:** Check CORS configuration and backend status

#### "Network Error" 
- **Cause:** Backend service down
- **Solution:** Check Render service status and logs

#### "404 Not Found"
- **Cause:** Wrong API endpoint or backend not deployed
- **Solution:** Verify endpoint URL and backend deployment

#### "500 Internal Server Error"
- **Cause:** Backend error (database, code issue)
- **Solution:** Check Render logs for specific error details

### Quick Fix Checklist

- [ ] All components use `API_BASE_URL` instead of hardcoded URLs
- [ ] `DB_URL` environment variable is set in Render
- [ ] `JWT_SECRET` environment variable is set in Render
- [ ] `FRONTEND_URL` environment variable is set in Render
- [ ] MongoDB Atlas is accessible from Render
- [ ] Backend service is running and healthy
- [ ] CORS configuration allows frontend domain
- [ ] Frontend is deployed and accessible

### Testing Locally

To test if the issue is deployment-specific:

1. **Test Backend Locally:**
   ```bash
   cd server
   npm start
   curl http://localhost:5000/products
   ```

2. **Test Frontend Locally:**
   ```bash
   cd client/market
   npm run dev
   ```
   - Update `src/config.js` to use `http://localhost:5000` for development
   - Check if products load correctly

### Still Having Issues?

If the problem persists after following these steps:

1. **Check Render Status Page:** Ensure Render services are operational
2. **Review Recent Changes:** Check if recent code changes introduced the issue
3. **Contact Support:** If all else fails, contact Render support with your service logs 