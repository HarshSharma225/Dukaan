# CORS Debugging Guide

## Quick CORS Fix

If you're experiencing CORS issues, here's the most permissive configuration you can use temporarily:

```javascript
// Replace your current CORS configuration with this:
app.use(cors({
    origin: true, // Allow all origins
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));
```

## Step-by-Step CORS Debugging

### 1. Check Browser Console
1. Open your frontend application
2. Open browser developer tools (F12)
3. Go to Console tab
4. Look for CORS error messages like:
   - "Access to fetch at '...' from origin '...' has been blocked by CORS policy"
   - "No 'Access-Control-Allow-Origin' header is present"

### 2. Check Network Tab
1. In developer tools, go to Network tab
2. Refresh the page or trigger the API call
3. Look for failed requests (red entries)
4. Click on failed requests to see the response headers

### 3. Test API Directly
1. Try accessing your API endpoint directly in browser:
   ```
   https://your-backend-domain.onrender.com/products
   ```
2. If it works, the issue is CORS-related
3. If it doesn't work, the issue is with the backend itself

### 4. Check Environment Variables
1. In your Render dashboard, go to your backend service
2. Check Environment tab
3. Verify `FRONTEND_URL` is set correctly
4. Make sure it matches your actual frontend domain

### 5. Update CORS Configuration
Based on the [CORS npm package documentation](https://www.npmjs.com/package/cors), use this configuration:

```javascript
const corsOptions = {
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        
        const allowedOrigins = [
            'http://localhost:5173',  // Development
            'http://localhost:3000',  // Alternative dev port
            'https://dukaan-5.onrender.com', // Your backend domain
            process.env.FRONTEND_URL // Production frontend URL
        ].filter(Boolean); // Remove undefined values
        
        if (allowedOrigins.indexOf(origin) !== -1 || process.env.NODE_ENV !== 'production') {
            callback(null, true);
        } else {
            console.log('CORS blocked origin:', origin);
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // Handle preflight requests
```

### 6. Common CORS Issues and Solutions

#### Issue: "Origin not allowed"
**Solution:** Add your frontend domain to the allowed origins array

#### Issue: "Credentials not allowed"
**Solution:** Make sure `credentials: true` is set in CORS config

#### Issue: "Method not allowed"
**Solution:** Add the required HTTP method to the `methods` array

#### Issue: "Headers not allowed"
**Solution:** Add required headers to the `allowedHeaders` array

### 7. Testing CORS Locally

To test if CORS works locally:

```bash
# Test with curl
curl -H "Origin: http://localhost:5173" \
     -H "Access-Control-Request-Method: GET" \
     -H "Access-Control-Request-Headers: Content-Type" \
     -X OPTIONS \
     http://localhost:5000/products
```

### 8. Production CORS Checklist

- [ ] `FRONTEND_URL` environment variable is set in Render
- [ ] Frontend domain is in the `allowedOrigins` array
- [ ] `credentials: true` is set for cookie support
- [ ] All required HTTP methods are included
- [ ] All required headers are included
- [ ] Preflight requests are handled with `app.options('*', cors())`

### 9. Emergency CORS Fix

If nothing else works, use this configuration temporarily:

```javascript
// WARNING: This allows all origins - use only for debugging
app.use(cors({
    origin: '*',
    credentials: false, // Must be false when origin is '*'
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));
```

**Note:** This configuration is not secure for production but can help identify if the issue is CORS-related.

## References
- [CORS npm package documentation](https://www.npmjs.com/package/cors)
- [Express.js CORS guide](https://enable-cors.org/server_expressjs.html)
- [CORS debugging guide](https://jonathanmh.com/p/how-to-enable-cors-in-express-js-node-js/) 