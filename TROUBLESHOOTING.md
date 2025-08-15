# Server 500 Error Troubleshooting Guide

## 🚨 URGENT: MongoDB Connection String Error

If you see this error: **"Invalid scheme, expected connection string to start with 'mongodb://' or 'mongodb+srv://'"**

### Quick Fix:
1. Go to your **Render dashboard**
2. Click on your **backend service**
3. Go to **"Environment"** tab
4. Find the **DB_URL** variable
5. Make sure it starts with `mongodb+srv://` or `mongodb://`

### Correct DB_URL Format:
```
mongodb+srv://username:password@cluster.mongodb.net/database_name
```

### Common Mistakes:
- ❌ `https://cluster.mongodb.net` (wrong protocol)
- ❌ `mongodb://cluster.mongodb.net` (missing credentials)
- ❌ `mongodb+srv://username@cluster.mongodb.net` (missing password)
- ✅ `mongodb+srv://username:password@cluster.mongodb.net/database`

### Test Your Connection:
Run this command locally to test your connection string:
```bash
cd server
node test-db-connection.js
```

---

## Quick Diagnosis Steps

### 1. Check Server Health
Visit: `https://dukaan-5.onrender.com/health`

This will tell you:
- If the server is running
- Database connection status
- Number of products in database

### 2. Check Database Connection
The most common cause of 500 errors is database connection issues.

**Symptoms:**
- 500 error on `/products` endpoint
- Server logs show "Database connection error"
- Health endpoint shows "database: disconnected"

**Solutions:**
1. Check your `DB_URL` environment variable in Render dashboard
2. Ensure MongoDB Atlas cluster is running
3. Verify network access and IP whitelist settings

### 3. Check Environment Variables
In your Render dashboard, ensure these environment variables are set:

```
DB_URL=mongodb+srv://username:password@cluster.mongodb.net/database
JWT_SECRET=your_secret_key
FRONTEND_URL=https://your-frontend-domain.com
```

### 4. Populate Database
If the database is empty, populate it with sample data:

```bash
curl -X POST https://dukaan-5.onrender.com/populate-products
```

Or visit: `https://dukaan-5.onrender.com/populate-products` in your browser

## Common Issues and Solutions

### Issue 1: Database Connection Failed
**Error:** "Database connection error: DB_URL environment variable is not set"

**Solution:**
1. Go to Render dashboard → Your service → Environment
2. Add `DB_URL` variable with your MongoDB connection string
3. Redeploy the service

### Issue 2: Empty Database
**Error:** `/products` returns empty array or 500 error

**Solution:**
1. Call the populate endpoint: `POST /populate-products`
2. Verify products exist: `GET /health`

### Issue 3: CORS Issues
**Error:** Frontend can't access backend

**Solution:**
1. Check CORS configuration in `server/index.js`
2. Ensure `FRONTEND_URL` is set correctly
3. Verify frontend domain is in allowed origins

### Issue 4: MongoDB Atlas Issues
**Error:** "MongoServerError: Authentication failed"

**Solutions:**
1. Check username/password in connection string
2. Verify database user has correct permissions
3. Check if IP address is whitelisted in MongoDB Atlas

## Debugging Commands

### Test Database Connection
```bash
curl https://dukaan-5.onrender.com/health
```

### Test Products Endpoint
```bash
curl https://dukaan-5.onrender.com/products
```

### Populate Database
```bash
curl -X POST https://dukaan-5.onrender.com/populate-products
```

## Render Deployment Checklist

- [ ] Environment variables are set in Render dashboard
- [ ] Build command is correct: `npm install`
- [ ] Start command is correct: `npm start`
- [ ] Port is set to `process.env.PORT`
- [ ] Service is deployed and running

## Local Development Testing

1. Create `.env` file in server directory:
```
DB_URL=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```

2. Install dependencies:
```bash
cd server
npm install
```

3. Start server:
```bash
npm start
```

4. Test endpoints:
```bash
curl http://localhost:5000/health
curl http://localhost:5000/products
```

## Emergency Fixes

### If nothing works, try this minimal setup:

1. **Reset environment variables** in Render
2. **Redeploy the service**
3. **Check Render logs** for specific error messages
4. **Test with health endpoint** first
5. **Populate database** if needed

### Contact Support
If issues persist:
1. Check Render service logs
2. Verify MongoDB Atlas status
3. Test with minimal configuration
4. Consider recreating the service if necessary 