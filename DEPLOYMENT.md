# Deployment Guide for E-commerce App

## Issues Fixed

### 1. Nodemon Not Found Error
The main issue was that the `package.json` was missing proper start scripts. This has been fixed by adding:

```json
{
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js"
  }
}
```

### 2. Port Configuration
Updated the server to use environment variables for the port:
```javascript
const port = process.env.PORT || 5000;
```

### 3. CORS Configuration
Updated CORS to handle both development and production environments.

## Deployment Steps

### Backend (Server) Deployment on Render

1. **Connect your GitHub repository to Render**
2. **Create a new Web Service**
3. **Configure the service:**
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Root Directory:** `server` (if your server is in a subdirectory)

4. **Environment Variables to set in Render:**
   ```
   NODE_ENV=production
   DB_URL=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   FRONTEND_URL=https://your-frontend-domain.com
   ```

5. **Important:** Make sure nodemon is in `dependencies` (not `devDependencies`) in your `package.json`

### Frontend (Client) Deployment

1. **Update API URLs:**
   - All components now use the `API_BASE_URL` from `src/config.js`
   - Set the environment variable `REACT_APP_API_URL` to your backend URL

2. **Deploy to your preferred platform (Vercel, Netlify, etc.)**

## Key Changes Made

### Server (`server/package.json`)
- Added `start` script: `"start": "node index.js"`
- Added `dev` script: `"dev": "nodemon index.js"`
- Moved `nodemon` to `dependencies`

### Server (`server/index.js`)
- Updated port to use environment variable: `process.env.PORT || 5000`
- Updated CORS configuration for production

### Client (`client/market/src/config.js`)
- Created configuration file for API URLs
- Supports both development and production environments

### Client Components
- Updated to use `API_BASE_URL` instead of hardcoded localhost URLs
- Example: `CheckoutPage.jsx` has been updated

## Common Issues and Solutions

### 1. Nodemon Not Found
**Cause:** Nodemon was in `devDependencies` and Render runs in production mode
**Solution:** Move nodemon to `dependencies` and add proper start script

### 2. Port Issues
**Cause:** Hardcoded port 5000
**Solution:** Use `process.env.PORT || 5000`

### 3. CORS Errors
**Cause:** Frontend trying to access backend on different domain
**Solution:** Update CORS configuration and use environment-specific API URLs

## References
- [Render Community Discussion on Nodemon Issues](https://community.render.com/t/nodemon-not-found-even-after-adding-it-as-a-dev-dependency/14419)
- [Render Nodemon Installation Issues](https://community.render.com/t/nodemon-not-installed-but-defined-in-package-json-and-yarn-install-run/13853) 