// ===== Product Data =====
const products = [
    {
        id: 1,
        name: "Radiant Glow Serum",
        category: "skincare",
        price: 49.99,
        rating: 4.8,
        reviews: 256,
        icon: "fa-pump-soap"
    },
    {
        id: 2,
        name: "Hydrating Face Cream",
        category: "skincare",
        price: 39.99,
        rating: 4.7,
        reviews: 189,
        icon: "fa-spa"
    },
    {
        id: 3,
        name: "Volumizing Mascara",
        category: "makeup",
        price: 24.99,
        rating: 4.9,
        reviews: 342,
        icon: "fa-eye"
    },
    {
        id: 4,
        name: "Matte Lipstick Set",
        category: "makeup",
        price: 34.99,
        rating: 4.6,
        reviews: 278,
        icon: "fa-kiss-wink-heart"
    },
    {
        id: 5,
        name: "Repairing Hair Mask",
        category: "haircare",
        price: 29.99,
        rating: 4.8,
        reviews: 195,
        icon: "fa-feather"
    },
    {
        id: 6,
        name: "Nourishing Hair Oil",
        category: "haircare",
        price: 27.99,
        rating: 4.7,
        reviews: 167,
        icon: "fa-dropbox"
    },
    {
        id: 7,
        name: "Vitamin C Cleanser",
        category: "skincare",
        price: 32.99,
        rating: 4.9,
        reviews: 423,
        icon: "fa-lemon"
    },
    {
        id: 8,
        name: "Foundation Palette",
        category: "makeup",
        price: 44.99,
        rating: 4.5,
        reviews: 156,
        icon: "fa-palette"
    },
    {
        id: 9,
        name: "Anti-Aging Night Cream",
        category: "skincare",
        price: 54.99,
        rating: 4.8,
        reviews: 289,
        icon: "fa-moon"
    },
    {
        id: 10,
        name: "Hair Growth Serum",
        category: "haircare",
        price: 37.99,
        rating: 4.6,
        reviews: 201,
        icon: "fa-seedling"
    },
    {
        id: 11,
        name: "Eyeshadow Palette",
        category: "makeup",
        price: 42.99,
        rating: 4.7,
        reviews: 312,
        icon: "fa-star"
    },
    {
        id: 12,
        name: "Exfoliating Scrub",
        category: "skincare",
        price: 28.99,
        rating: 4.8,
        reviews: 245,
        icon: "fa-gem"
    }
];

// ===== Testimonials Data =====
const testimonials = [
    {
        id: 1,
        text: "Absolutely love the Radiant Glow Serum! My skin has never looked better. The results are visible within just a week of use.",
        rating: 5,
        name: "Sarah Johnson",
        role: "Verified Buyer",
        avatar: "fa-user"
    },
    {
        id: 2,
        text: "The quality of products from Burhan'Aesthetics is unmatched. Fast shipping and excellent customer service. Highly recommend!",
        rating: 5,
        name: "Emily Chen",
        role: "Beauty Enthusiast",
        avatar: "fa-user"
    },
    {
        id: 3,
        text: "I've tried many skincare brands, but nothing compares to this. My skin feels so hydrated and looks radiant. Worth every penny!",
        rating: 5,
        name: "Michael Brown",
        role: "Regular Customer",
        avatar: "fa-user"
    }
];

// ===== Shopping Cart =====
let cart = [];

// ===== DOM Elements =====
const introOverlay = document.getElementById('introOverlay');
const enterBtn = document.getElementById('enterBtn');
const mainContent = document.getElementById('mainContent');
const productsGrid = document.getElementById('productsGrid');
const filterBtns = document.querySelectorAll('.filter-btn');
const loadMoreBtn = document.getElementById('loadMoreBtn');
const cartBtn = document.getElementById('cartBtn');
const closeCart = document.getElementById('closeCart');
const cartSidebar = document.getElementById('cartSidebar');
const cartOverlay = document.getElementById('cartOverlay');
const cartItems = document.getElementById('cartItems');
const cartCount = document.getElementById('cartCount');
const cartTotal = document.getElementById('cartTotal');
const checkoutBtn = document.getElementById('checkoutBtn');
const searchBtn = document.querySelector('.search-btn');
const searchModal = document.getElementById('searchModal');
const closeSearch = document.getElementById('closeSearch');
const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');
const contactForm = document.getElementById('contactForm');
const newsletterForm = document.getElementById('newsletterForm');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navMenu = document.querySelector('.nav-menu');
const testimonialsSlider = document.getElementById('testimonialsSlider');
const navbar = document.querySelector('.navbar');

// ===== Initialize =====
document.addEventListener('DOMContentLoaded', () => {
    // Show intro animation
    setTimeout(() => {
        introOverlay.classList.add('hidden');
        mainContent.classList.add('visible');
    }, 3000);

    // Load products
    loadProducts(products);

    // Load testimonials
    loadTestimonials();

    // Load cart from localStorage
    loadCart();

    // Event listeners
    setupEventListeners();
});

// ===== Event Listeners =====
function setupEventListeners() {
    // Enter button
    enterBtn.addEventListener('click', () => {
        introOverlay.classList.add('hidden');
        mainContent.classList.add('visible');
    });

    // Filter buttons
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.dataset.filter;
            filterProducts(filter);
        });
    });

    // Load more
    loadMoreBtn.addEventListener('click', () => {
        // In a real app, this would load more products from backend
        showNotification('All products loaded!', 'success');
    });

    // Cart
    cartBtn.addEventListener('click', openCart);
    closeCart.addEventListener('click', closeCartSidebar);
    cartOverlay.addEventListener('click', closeCartSidebar);
    checkoutBtn.addEventListener('click', checkout);

    // Search
    searchBtn.addEventListener('click', openSearch);
    closeSearch.addEventListener('click', closeSearchModal);
    searchInput.addEventListener('input', searchProducts);

    // Contact form
    contactForm.addEventListener('submit', handleContactSubmit);

    // Newsletter
    newsletterForm.addEventListener('submit', handleNewsletterSubmit);

    // Mobile menu
    mobileMenuBtn.addEventListener('click', toggleMobileMenu);

    // Scroll effects
    window.addEventListener('scroll', handleScroll);

    // Smooth scroll for nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
                // Close mobile menu
                navMenu.classList.remove('active');
            }
        });
    });
}

// ===== Product Functions =====
function loadProducts(productsToShow) {
    productsGrid.innerHTML = '';
    
    productsToShow.forEach((product, index) => {
        const productCard = createProductCard(product);
        productCard.style.transitionDelay = `${index * 0.1}s`;
        productsGrid.appendChild(productCard);
        
        // Trigger animation
        setTimeout(() => {
            productCard.classList.add('show');
        }, 100);
    });
}

function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.dataset.category = product.category;
    
    const stars = generateStars(product.rating);
    
    card.innerHTML = `
        <div class="product-image">
            <i class="fas ${product.icon}"></i>
            <div class="product-actions">
                <button class="action-btn" onclick="addToWishlist(${product.id})">
                    <i class="far fa-heart"></i>
                </button>
                <button class="action-btn" onclick="quickView(${product.id})">
                    <i class="far fa-eye"></i>
                </button>
            </div>
        </div>
        <div class="product-info">
            <div class="product-category">${product.category}</div>
            <h3 class="product-name">${product.name}</h3>
            <div class="product-rating">
                <div class="stars">${stars}</div>
                <span class="rating-count">(${product.reviews})</span>
            </div>
            <div class="product-price">
                <span class="price">$${product.price.toFixed(2)}</span>
                <button class="add-to-cart" onclick="addToCart(${product.id})">
                    Add to Cart
                </button>
            </div>
        </div>
    `;
    
    return card;
}

function generateStars(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= Math.floor(rating)) {
            stars += '<i class="fas fa-star"></i>';
        } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
            stars += '<i class="fas fa-star-half-alt"></i>';
        } else {
            stars += '<i class="far fa-star"></i>';
        }
    }
    return stars;
}

function filterProducts(category) {
    const filtered = category === 'all' 
        ? products 
        : products.filter(p => p.category === category);
    loadProducts(filtered);
}

// ===== Cart Functions =====
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    
    saveCart();
    updateCartUI();
    showNotification('Product added to cart!', 'success');
    openCart();
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartUI();
    showNotification('Product removed from cart', 'info');
}

function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            saveCart();
            updateCartUI();
        }
    }
}

function updateCartUI() {
    // Update cart count
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalCount;
    
    // Update cart items
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-bag"></i>
                <p>Your cart is empty</p>
            </div>
        `;
        cartTotal.textContent = '$0.00';
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-image">
                    <i class="fas ${item.icon}"></i>
                </div>
                <div class="cart-item-info">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                    <div class="cart-item-quantity">
                        <button class="qty-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                        <span>${item.quantity}</span>
                        <button class="qty-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                    </div>
                </div>
                <button class="remove-item" onclick="removeFromCart(${item.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `).join('');
        
        // Update total
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        cartTotal.textContent = `$${total.toFixed(2)}`;
    }
}

function openCart() {
    cartSidebar.classList.add('open');
    cartOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeCartSidebar() {
    cartSidebar.classList.remove('open');
    cartOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

function saveCart() {
    localStorage.setItem('burhanCart', JSON.stringify(cart));
}

function loadCart() {
    const savedCart = localStorage.getItem('burhanCart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartUI();
    }
}

function checkout() {
    if (cart.length === 0) {
        showNotification('Your cart is empty!', 'error');
        return;
    }
    
    // In a real app, this would redirect to checkout page or open payment modal
    showNotification('Redirecting to checkout...', 'success');
    setTimeout(() => {
        alert('Checkout functionality would be implemented here with payment gateway integration.');
    }, 1000);
}

// ===== Search Functions =====
function openSearch() {
    searchModal.classList.add('active');
    searchInput.focus();
    document.body.style.overflow = 'hidden';
}

function closeSearchModal() {
    searchModal.classList.remove('active');
    document.body.style.overflow = '';
    searchInput.value = '';
    searchResults.innerHTML = '';
}

function searchProducts(e) {
    const query = e.target.value.toLowerCase().trim();
    
    if (query.length === 0) {
        searchResults.innerHTML = '';
        return;
    }
    
    const results = products.filter(p => 
        p.name.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query)
    );
    
    if (results.length === 0) {
        searchResults.innerHTML = `
            <div style="text-align: center; padding: 40px; color: var(--text-light);">
                <i class="fas fa-search" style="font-size: 3rem; margin-bottom: 20px; opacity: 0.3;"></i>
                <p>No products found</p>
            </div>
        `;
    } else {
        searchResults.innerHTML = results.map(product => `
            <div style="display: flex; align-items: center; gap: 15px; padding: 15px; border-bottom: 1px solid #eee; cursor: pointer;" 
                 onclick="addToCart(${product.id}); closeSearchModal();">
                <div style="width: 50px; height: 50px; background: var(--gradient-1); border-radius: 10px; 
                            display: flex; justify-content: center; align-items: center; color: white;">
                    <i class="fas ${product.icon}"></i>
                </div>
                <div style="flex: 1;">
                    <div style="font-weight: 600;">${product.name}</div>
                    <div style="color: var(--primary-color); font-weight: 600;">$${product.price.toFixed(2)}</div>
                </div>
                <button style="padding: 8px 15px; background: var(--gradient-1); color: white; 
                               border-radius: 50px; font-size: 0.85rem;">Add</button>
            </div>
        `).join('');
    }
}

// ===== Testimonials Functions =====
function loadTestimonials() {
    testimonialsSlider.innerHTML = testimonials.map(testimonial => `
        <div class="testimonial-card">
            <div class="testimonial-rating">${generateStars(testimonial.rating)}</div>
            <p class="testimonial-text">"${testimonial.text}"</p>
            <div class="testimonial-author">
                <div class="author-avatar">
                    <i class="fas ${testimonial.avatar}"></i>
                </div>
                <div class="author-info">
                    <h4>${testimonial.name}</h4>
                    <p>${testimonial.role}</p>
                </div>
            </div>
        </div>
    `).join('');
}

// ===== Form Handlers =====
function handleContactSubmit(e) {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
    };
    
    // In a real app, this would send data to backend
    console.log('Contact form submitted:', formData);
    
    showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
    contactForm.reset();
}

function handleNewsletterSubmit(e) {
    e.preventDefault();
    
    const email = e.target.querySelector('input').value;
    
    // In a real app, this would send email to backend
    console.log('Newsletter subscription:', email);
    
    showNotification('Thank you for subscribing!', 'success');
    e.target.reset();
}

// ===== Mobile Menu =====
function toggleMobileMenu() {
    navMenu.classList.toggle('active');
}

// ===== Scroll Effects =====
function handleScroll() {
    // Navbar scroll effect
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Active nav link based on scroll position
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// ===== Utility Functions =====
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas ${getNotificationIcon(type)}"></i>
        <span>${message}</span>
    `;
    
    // Add styles
    Object.assign(notification.style, {
        position: 'fixed',
        top: '100px',
        right: '20px',
        padding: '15px 25px',
        background: getNotificationColor(type),
        color: 'white',
        borderRadius: '10px',
        boxShadow: 'var(--shadow-md)',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        zIndex: '9999',
        animation: 'slideInRight 0.3s ease',
        fontFamily: 'Poppins, sans-serif'
    });
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

function getNotificationIcon(type) {
    switch(type) {
        case 'success': return 'fa-check-circle';
        case 'error': return 'fa-exclamation-circle';
        case 'info': return 'fa-info-circle';
        default: return 'fa-bell';
    }
}

function getNotificationColor(type) {
    switch(type) {
        case 'success': return '#28a745';
        case 'error': return '#dc3545';
        case 'info': return '#17a2b8';
        default: return '#6c757d';
    }
}

// Add notification animations to CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ===== Wishlist & Quick View (Placeholder Functions) =====
function addToWishlist(productId) {
    showNotification('Added to wishlist!', 'success');
}

function quickView(productId) {
    const product = products.find(p => p.id === productId);
    alert(`Quick View: ${product.name}\nPrice: $${product.price.toFixed(2)}\n\nFull quick view modal would open here.`);
}

// ===== Backend API Simulation =====
// In a real application, these would be actual API calls to a backend server

const API_BASE_URL = '/api'; // Replace with your actual backend URL

async function fetchProducts() {
    try {
        // Simulated API call
        // const response = await fetch(`${API_BASE_URL}/products`);
        // const data = await response.json();
        // return data;
        return products; // Return local data for demo
    } catch (error) {
        console.error('Error fetching products:', error);
        return [];
    }
}

async function submitContactForm(data) {
    try {
        // Simulated API call
        // const response = await fetch(`${API_BASE_URL}/contact`, {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(data)
        // });
        // return await response.json();
        console.log('Contact form data submitted to backend:', data);
        return { success: true };
    } catch (error) {
        console.error('Error submitting contact form:', error);
        throw error;
    }
}

async function subscribeNewsletter(email) {
    try {
        // Simulated API call
        // const response = await fetch(`${API_BASE_URL}/newsletter`, {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({ email })
        // });
        // return await response.json();
        console.log('Newsletter subscription sent to backend:', email);
        return { success: true };
    } catch (error) {
        console.error('Error subscribing to newsletter:', error);
        throw error;
    }
}

async function processOrder(orderData) {
    try {
        // Simulated API call
        // const response = await fetch(`${API_BASE_URL}/orders`, {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(orderData)
        // });
        // return await response.json();
        console.log('Order processed by backend:', orderData);
        return { success: true, orderId: Date.now() };
    } catch (error) {
        console.error('Error processing order:', error);
        throw error;
    }
}

// Console welcome message
console.log('%c Welcome to Burhan\'Aesthetics! ', 'background: linear-gradient(135deg, #f5e6d3, #d4a574); color: white; font-size: 20px; padding: 10px 20px; border-radius: 5px;');
console.log('Built with ❤️ for beauty lovers');
