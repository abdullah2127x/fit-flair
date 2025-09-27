# Mongoose Database Setup for Sapphire Clone

This document outlines the complete Mongoose database setup for your e-commerce application.

## 🗄️ Database Models

### 1. Product Model (`src/models/Product.ts`)
- **Fields**: title, slug, subTitle, price, discount, audience, category, subCategory, variants, etc.
- **Features**: 
  - Product variants with different colors and stock
  - Search and filtering capabilities
  - Featured, new arrival, and popular product flags
  - Virtual fields for discounted price and total stock

### 2. User Model (`src/models/User.ts`)
- **Fields**: clerkId, email, firstName, lastName, phone, addresses, orders
- **Features**:
  - Integration with Clerk authentication
  - Multiple addresses (billing/shipping)
  - Order history tracking

### 3. Order Model (`src/models/Order.ts`)
- **Fields**: orderNumber, userId, items, pricing, addresses, status, payment info
- **Features**:
  - Automatic order number generation
  - Order status tracking
  - Payment status management
  - Shipping and billing addresses

### 4. Cart Model (`src/models/Cart.ts`)
- **Fields**: userId, items with product details and quantities
- **Features**:
  - Persistent cart storage
  - Quantity management
  - Virtual fields for totals

## 🔌 API Routes

### Products
- `GET /api/products` - List products with filtering and pagination
- `GET /api/products/[id]` - Get product by ID
- `GET /api/products/slug/[slug]` - Get product by slug
- `POST /api/products` - Create new product
- `PUT /api/products/[id]` - Update product
- `DELETE /api/products/[id]` - Delete product

### Cart
- `GET /api/cart` - Get user's cart
- `POST /api/cart` - Add item to cart
- `PUT /api/cart` - Update cart item quantity
- `DELETE /api/cart` - Remove item or clear cart

### Orders
- `GET /api/orders` - Get user's orders with pagination
- `GET /api/orders/[id]` - Get specific order
- `POST /api/orders` - Create new order
- `PUT /api/orders/[id]` - Update order status

### Users
- `GET /api/users` - Get user profile
- `POST /api/users` - Create user profile
- `PUT /api/users` - Update user profile

## 🛠️ Database Utilities

### DatabaseService (`src/lib/database.ts`)
Comprehensive service class with methods for:
- Product CRUD operations
- User management
- Cart operations
- Order management
- Search and filtering
- Analytics and reporting

### Connection Management (`src/lib/mongodb.ts`)
- Global connection caching
- Hot reload support in development
- Error handling

## 🌱 Data Seeding

### Seed Scripts
- `npm run seed-db` - Seed database with sample products
- `npm run clear-db` - Clear all products from database

### Sample Data
The seeding script includes sample products with:
- Multiple variants (colors, stock)
- Different categories and audiences
- Featured, new arrival, and popular flags
- Realistic pricing and descriptions

## 🔧 Environment Setup

Add to your `.env.local`:
```env
MONGODB_URI=mongodb://localhost:27017/sapphire-clone
# For production:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/sapphire-clone
```

## 📊 Key Features

### 1. Advanced Product Filtering
```typescript
// Example API calls
GET /api/products?audience=men&category=readyToWear&featured=true
GET /api/products?search=shirt&minPrice=1000&maxPrice=5000
GET /api/products?sort=price&order=asc&page=2&limit=20
```

### 2. Cart Management
- Persistent cart storage per user
- Quantity updates
- Item removal
- Cart clearing

### 3. Order Processing
- Automatic order number generation
- Status tracking (pending, processing, shipped, delivered, cancelled)
- Payment status management
- Address management

### 4. Search & Analytics
- Full-text search across products
- Product statistics
- Order analytics
- Revenue tracking

## 🚀 Usage Examples

### Fetching Products
```typescript
import DatabaseService from '@/lib/database';

// Get featured products
const featuredProducts = await DatabaseService.getFeaturedProducts(8);

// Search products
const searchResults = await DatabaseService.searchProducts('shirt', {
  audience: 'men',
  category: 'readyToWear'
});

// Get products with pagination
const { products, pagination } = await DatabaseService.getProducts(
  { audience: 'women' },
  1, // page
  12 // limit
);
```

### Cart Operations
```typescript
// Add to cart
await DatabaseService.addToCart(userId, {
  productId: 'product123',
  productTitle: 'Casual Shirt',
  productSlug: 'casual-shirt',
  subTitle: 'Comfortable cotton shirt',
  price: 2500,
  discount: 10,
  imageSrc: '/images/shirt.jpg',
  colorName: 'Blue',
  quantity: 2
});

// Update cart item
await DatabaseService.updateCartItem(userId, 'product123', 'Blue', 3);

// Remove from cart
await DatabaseService.removeFromCart(userId, 'product123', 'Blue');
```

### Order Management
```typescript
// Create order
const order = await DatabaseService.createOrder({
  userId: 'user123',
  items: cartItems,
  subtotal: 5000,
  shippingCost: 200,
  tax: 500,
  total: 5700,
  paymentMethod: 'stripe',
  paymentIntentId: 'pi_123',
  shippingAddress: { /* address object */ },
  billingAddress: { /* address object */ }
});

// Get user orders
const { orders } = await DatabaseService.getOrders('user123', 1, 10);
```

## 🔍 Database Indexes

The models include optimized indexes for:
- Product slug lookups
- Category and audience filtering
- Featured/popular product queries
- Order status filtering
- User-specific queries

## 🛡️ Security Features

- User authentication via Clerk
- User-specific data access
- Input validation and sanitization
- Error handling and logging

## 📈 Performance Optimizations

- Connection pooling
- Query optimization with indexes
- Lean queries for better performance
- Pagination for large datasets
- Virtual fields for computed values

This setup provides a robust foundation for your e-commerce application with MongoDB and Mongoose, offering excellent performance, scalability, and developer experience.
