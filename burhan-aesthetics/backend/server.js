// Burhan'Aesthetics Backend API Server
// This is a Node.js Express backend server for the beauty store

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../')));

// ===== In-Memory Database (For Demo) =====
// In production, replace with actual database (MongoDB, PostgreSQL, etc.)

let products = [
    {
        id: 1,
        name: "Radiant Glow Serum",
        category: "skincare",
        price: 49.99,
        rating: 4.8,
        reviews: 256,
        icon: "fa-pump-soap",
        description: "A luxurious serum that enhances your natural glow",
        stock: 50,
        images: []
    },
    {
        id: 2,
        name: "Hydrating Face Cream",
        category: "skincare",
        price: 39.99,
        rating: 4.7,
        reviews: 189,
        icon: "fa-spa",
        description: "Deep hydration for all-day moisture",
        stock: 75,
        images: []
    },
    {
        id: 3,
        name: "Volumizing Mascara",
        category: "makeup",
        price: 24.99,
        rating: 4.9,
        reviews: 342,
        icon: "fa-eye",
        description: "Get fuller, longer lashes instantly",
        stock: 100,
        images: []
    }
];

let orders = [];
let contacts = [];
let newsletter = [];
let cart = [];

// ===== API Routes =====

// Get all products
app.get('/api/products', (req, res) => {
    const { category, search, sort } = req.query;
    
    let filteredProducts = [...products];
    
    // Filter by category
    if (category && category !== 'all') {
        filteredProducts = filteredProducts.filter(p => p.category === category);
    }
    
    // Search
    if (search) {
        const searchTerm = search.toLowerCase();
        filteredProducts = filteredProducts.filter(p => 
            p.name.toLowerCase().includes(searchTerm) ||
            p.description.toLowerCase().includes(searchTerm)
        );
    }
    
    // Sort
    if (sort) {
        switch(sort) {
            case 'price-asc':
                filteredProducts.sort((a, b) => a.price - b.price);
                break;
            case 'price-desc':
                filteredProducts.sort((a, b) => b.price - a.price);
                break;
            case 'rating':
                filteredProducts.sort((a, b) => b.rating - a.rating);
                break;
        }
    }
    
    res.json({
        success: true,
        count: filteredProducts.length,
        data: filteredProducts
    });
});

// Get single product
app.get('/api/products/:id', (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));
    
    if (!product) {
        return res.status(404).json({
            success: false,
            message: 'Product not found'
        });
    }
    
    res.json({
        success: true,
        data: product
    });
});

// Create new order
app.post('/api/orders', (req, res) => {
    const { customerInfo, items, total, paymentMethod } = req.body;
    
    if (!customerInfo || !items || items.length === 0) {
        return res.status(400).json({
            success: false,
            message: 'Invalid order data'
        });
    }
    
    const newOrder = {
        id: Date.now(),
        customerInfo,
        items,
        total,
        paymentMethod,
        status: 'pending',
        createdAt: new Date().toISOString()
    };
    
    orders.push(newOrder);
    
    // In production: Send confirmation email, update inventory, etc.
    
    res.status(201).json({
        success: true,
        message: 'Order created successfully',
        data: newOrder
    });
});

// Get all orders (Admin)
app.get('/api/orders', (req, res) => {
    res.json({
        success: true,
        count: orders.length,
        data: orders
    });
});

// Submit contact form
app.post('/api/contact', (req, res) => {
    const { name, email, subject, message } = req.body;
    
    if (!name || !email || !message) {
        return res.status(400).json({
            success: false,
            message: 'All fields are required'
        });
    }
    
    const contactEntry = {
        id: Date.now(),
        name,
        email,
        subject,
        message,
        createdAt: new Date().toISOString()
    };
    
    contacts.push(contactEntry);
    
    // In production: Send email notification
    
    res.json({
        success: true,
        message: 'Message sent successfully'
    });
});

// Subscribe to newsletter
app.post('/api/newsletter', (req, res) => {
    const { email } = req.body;
    
    if (!email) {
        return res.status(400).json({
            success: false,
            message: 'Email is required'
        });
    }
    
    // Check if already subscribed
    const exists = newsletter.find(n => n.email === email);
    if (exists) {
        return res.status(400).json({
            success: false,
            message: 'Already subscribed'
        });
    }
    
    newsletter.push({
        id: Date.now(),
        email,
        subscribedAt: new Date().toISOString()
    });
    
    res.json({
        success: true,
        message: 'Successfully subscribed to newsletter'
    });
});

// Cart operations
app.get('/api/cart', (req, res) => {
    res.json({
        success: true,
        data: cart
    });
});

app.post('/api/cart/add', (req, res) => {
    const { productId, quantity } = req.body;
    
    const product = products.find(p => p.id === productId);
    if (!product) {
        return res.status(404).json({
            success: false,
            message: 'Product not found'
        });
    }
    
    const existingItem = cart.find(item => item.productId === productId);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            productId,
            name: product.name,
            price: product.price,
            quantity,
            icon: product.icon
        });
    }
    
    res.json({
        success: true,
        message: 'Product added to cart',
        data: cart
    });
});

app.delete('/api/cart/remove/:productId', (req, res) => {
    const productId = parseInt(req.params.productId);
    cart = cart.filter(item => item.productId !== productId);
    
    res.json({
        success: true,
        message: 'Product removed from cart',
        data: cart
    });
});

app.put('/api/cart/update/:productId', (req, res) => {
    const productId = parseInt(req.params.productId);
    const { quantity } = req.body;
    
    const item = cart.find(item => item.productId === productId);
    if (!item) {
        return res.status(404).json({
            success: false,
            message: 'Item not found in cart'
        });
    }
    
    item.quantity = quantity;
    
    res.json({
        success: true,
        message: 'Cart updated',
        data: cart
    });
});

// ===== Serve Frontend =====
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../burhan-aesthetics/index.html'));
});

// ===== Error Handling =====
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: 'Something went wrong!'
    });
});

// ===== Start Server =====
app.listen(PORT, () => {
    console.log(`🚀 Burhan'Aesthetics Server running on port ${PORT}`);
    console.log(`📦 Visit: http://localhost:${PORT}`);
    console.log(`🛍️  API Endpoints:`);
    console.log(`   GET  /api/products - Get all products`);
    console.log(`   GET  /api/products/:id - Get single product`);
    console.log(`   POST /api/orders - Create new order`);
    console.log(`   POST /api/contact - Submit contact form`);
    console.log(`   POST /api/newsletter - Subscribe to newsletter`);
    console.log(`   GET  /api/cart - Get cart`);
    console.log(`   POST /api/cart/add - Add to cart`);
    console.log(`   DELETE /api/cart/remove/:id - Remove from cart`);
    console.log(`   PUT  /api/cart/update/:id - Update cart item`);
});

module.exports = app;
