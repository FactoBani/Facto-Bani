# Burhan'Aesthetics - Premium Beauty Store

A modern, professional e-commerce website for beauty and skincare products with a beautiful animated intro, responsive design, and full backend functionality.

## ✨ Features

### Frontend
- **Animated Intro** - Beautiful logo animation with product showcase
- **Responsive Design** - Works perfectly on all devices (mobile, tablet, desktop)
- **Product Catalog** - Filterable product grid with categories
- **Shopping Cart** - Full cart functionality with localStorage persistence
- **Search** - Real-time product search modal
- **Contact Form** - Professional contact form with validation
- **Newsletter** - Email subscription form
- **Testimonials** - Customer reviews section
- **Smooth Animations** - CSS animations and transitions throughout
- **Modern UI/UX** - Clean, elegant design with gradient effects

### Backend
- **RESTful API** - Complete API for products, orders, cart, and more
- **Product Management** - CRUD operations for products
- **Order Processing** - Handle customer orders
- **Contact Submissions** - Store contact form messages
- **Newsletter** - Manage email subscriptions
- **Cart Operations** - Server-side cart management
- **Error Handling** - Comprehensive error handling

## 📁 Project Structure

```
burhan-aesthetics/
├── index.html          # Main HTML file
├── css/
│   └── style.css       # All styles and animations
├── js/
│   └── main.js         # Frontend JavaScript
├── backend/
│   └── server.js       # Node.js Express backend
├── images/             # Product images (placeholder)
└── package.json        # Node.js dependencies
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Navigate to the project directory:**
```bash
cd burhan-aesthetics
```

2. **Install dependencies:**
```bash
npm install
```

3. **Start the backend server:**
```bash
npm start
```

Or for development with auto-reload:
```bash
npm run dev
```

4. **Open in browser:**
```
http://localhost:3000
```

## 🛍️ API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | Get all products |
| GET | `/api/products/:id` | Get single product |
| POST | `/api/orders` | Create new order |
| GET | `/api/orders` | Get all orders (Admin) |
| POST | `/api/contact` | Submit contact form |
| POST | `/api/newsletter` | Subscribe to newsletter |
| GET | `/api/cart` | Get cart |
| POST | `/api/cart/add` | Add item to cart |
| DELETE | `/api/cart/remove/:id` | Remove from cart |
| PUT | `/api/cart/update/:id` | Update cart item |

## 🎨 Customization

### Colors
Edit CSS variables in `css/style.css`:
```css
:root {
    --primary-color: #d4a574;
    --secondary-color: #f5e6d3;
    --accent-color: #e8b4b8;
}
```

### Products
Modify the products array in `js/main.js` or connect to the backend API.

### Backend Database
Replace the in-memory arrays in `backend/server.js` with a real database:
- MongoDB with Mongoose
- PostgreSQL with Sequelize
- MySQL with Knex

## 📱 Responsive Breakpoints

- Desktop: > 992px
- Tablet: 768px - 992px
- Mobile: < 768px
- Small Mobile: < 480px

## 🔧 Technologies Used

### Frontend
- HTML5
- CSS3 (with animations)
- JavaScript (ES6+)
- Font Awesome Icons
- Google Fonts (Playfair Display, Poppins)

### Backend
- Node.js
- Express.js
- CORS
- Body Parser

## 📝 To-Do / Future Enhancements

- [ ] User authentication (login/register)
- [ ] Payment gateway integration (Stripe/PayPal)
- [ ] Product image upload
- [ ] Admin dashboard
- [ ] Order tracking
- [ ] Email notifications
- [ ] Product reviews and ratings
- [ ] Wishlist functionality
- [ ] Social media sharing
- [ ] Multi-language support

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

## 👨‍💻 Author

Created for Burhan'Aesthetics

---

**Enjoy building your beauty store! 💄✨**
