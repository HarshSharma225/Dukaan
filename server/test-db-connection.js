const mongoose = require('mongoose');
require('dotenv').config();

async function testConnection() {
    console.log('🔍 Testing MongoDB Connection...\n');
    
    // Check if DB_URL exists
    if (!process.env.DB_URL) {
        console.error('❌ ERROR: DB_URL environment variable is not set');
        console.log('\n🔧 SOLUTION:');
        console.log('1. Go to your Render dashboard');
        console.log('2. Click on your backend service');
        console.log('3. Go to "Environment" tab');
        console.log('4. Add DB_URL variable with your MongoDB connection string');
        console.log('\nExample DB_URL:');
        console.log('mongodb+srv://username:password@cluster.mongodb.net/database');
        return;
    }
    
    const dbUrl = process.env.DB_URL.trim();
    console.log('📋 Current DB_URL:', dbUrl.substring(0, 20) + '...');
    
    // Validate format
    if (!dbUrl.startsWith('mongodb://') && !dbUrl.startsWith('mongodb+srv://')) {
        console.error('❌ ERROR: Invalid MongoDB connection string format');
        console.log('\n🔧 SOLUTION: Your DB_URL must start with:');
        console.log('- mongodb:// (for local MongoDB)');
        console.log('- mongodb+srv:// (for MongoDB Atlas)');
        return;
    }
    
    try {
        console.log('🔄 Attempting to connect...');
        await mongoose.connect(dbUrl);
        console.log('✅ SUCCESS: Database connected successfully!');
        
        // Test a simple query
        const collections = await mongoose.connection.db.listCollections().toArray();
        console.log('📊 Available collections:', collections.map(c => c.name));
        
        await mongoose.disconnect();
        console.log('🔌 Disconnected from database');
        
    } catch (error) {
        console.error('❌ ERROR: Failed to connect to database');
        console.error('Error details:', error.message);
        
        if (error.message.includes('Authentication failed')) {
            console.log('\n🔧 SOLUTION: Check your username and password in the connection string');
        } else if (error.message.includes('ENOTFOUND')) {
            console.log('\n🔧 SOLUTION: Check your cluster URL in the connection string');
        } else if (error.message.includes('ECONNREFUSED')) {
            console.log('\n🔧 SOLUTION: Check if your MongoDB server is running');
        }
    }
}

// Run the test
testConnection(); 