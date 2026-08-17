# 🚀 Stripe Payment Integration Setup Guide

A comprehensive guide for setting up Stripe payment integration in your Fit-Flair e-commerce application.

## 📋 Table of Contents
- [Project Overview](#-project-overview)
- [Prerequisites](#-prerequisites)
- [Project Setup](#-project-setup)
- [Environment Setup](#-environment-setup)
- [Backend Setup](#-backend-setup)
- [Frontend Setup](#-frontend-setup)
- [Testing Payments](#-testing-payments)
- [Running the Project](#-running-the-project)
- [Deployment](#-deployment)
- [Troubleshooting](#-troubleshooting)
- [License & Credits](#-license--credits)

## 🎯 Project Overview

Fit-Flair is a modern e-commerce platform built with Next.js that integrates Stripe for secure payment processing. The application allows customers to:

- 🛍️ Browse and add products to cart
- 💳 Make secure payments using Stripe
- 📧 Receive order confirmations
- 🔍 Track order status

**Key Features:**
- ✅ Secure payment processing with Stripe
- 🎨 Modern, responsive design
- 🛒 Shopping cart functionality
- 📱 Mobile-friendly checkout
- 🔒 PCI compliance handled by Stripe

## 📦 Prerequisites

Before starting, ensure you have:

### Required Software
- **Node.js** (v18.0.0 or higher) - [Download here](https://nodejs.org/)
- **npm** (v8.0.0 or higher) or **yarn** (v1.22.0 or higher)
- **Git** - [Download here](https://git-scm.com/)

### Required Accounts
- **Stripe Account** - [Sign up here](https://dashboard.stripe.com/register)
- **MongoDB Account** (for order storage) - [Sign up here](https://www.mongodb.com/)

### Knowledge Requirements
- Basic understanding of JavaScript/TypeScript
- Familiarity with React/Next.js
- Basic knowledge of REST APIs

## ⚙️ Project Setup

### 1. Clone or Create Project

```bash
# Clone the existing repository
git clone <your-repo-url>
cd fit-flair

# Or create a new Next.js project
npx create-next-app@latest fit-flair --typescript --tailwind --app
```

### 2. Install Dependencies

```bash
# Install all required dependencies
npm install

# Key Stripe dependencies (already included):
# @stripe/stripe-js - Stripe.js for frontend
# @stripe/react-stripe-js - React wrapper for Stripe.js
# stripe - Stripe Node.js SDK for backend
```

### 3. Project Structure

```
fit-flair/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── payment-intent/     # Stripe payment intent API
│   │   │   ├── orders/              # Order management
│   │   │   └── webhooks/            # Stripe webhooks
│   │   ├── (checkout)/
│   │   │   └── get-payment/         # Payment page
│   │   └── shop/                    # Product pages
│   ├── components/
│   │   ├── custom/
│   │   │   ├── StripePayment.tsx    # Main payment component
│   │   │   └── checkOut/
│   │   │       └── CheckOutPage.tsx # Checkout form
│   │   └── ui/                      # UI components
│   ├── lib/
│   │   ├── convertToSubCurrency.ts  # Currency utility
│   │   └── mongodb.ts               # Database connection
│   ├── models/                      # Database models
│   └── redux/                       # State management
├── public/                          # Static assets
├── .env.local                       # Environment variables
└── package.json
```

## 🔐 Environment Setup

### 1. Get Stripe Keys

1. **Log in to Stripe Dashboard**: https://dashboard.stripe.com/login
2. **Get Test Keys**:
   - Go to "Developers" → "API keys"
   - Copy your **Publishable key** (starts with `pk_test_`)
   - Copy your **Secret key** (starts with `sk_test_`)
3. **For Production**: Repeat the same process with live keys

### 2. Create Environment File

Create a `.env.local` file in the root directory:

```bash
# Stripe Configuration
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
STRIPE_SECRET_KEY=sk_test_your_secret_key_here

# Database Configuration
MONGODB_URI=mongodb+srv://your-mongodb-connection-string

# Application URLs
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### 3. Environment Variables Explained

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Public Stripe key for frontend | ✅ |
| `STRIPE_SECRET_KEY` | Private Stripe key for backend | ✅ |
| `MONGODB_URI` | MongoDB connection string | ✅ |
| `NEXT_PUBLIC_BASE_URL` | Your application URL | ✅ |

## 🔧 Backend Setup

### 1. Payment Intent API Route

The payment intent is created in `src/app/api/payment-intent/route.ts`:

```typescript
import { NextRequest, NextResponse } from "next/server";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export async function POST(request: NextRequest) {
  try {
    const { amount } = await request.json();

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      automatic_payment_methods: { enabled: true },
    });

    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (err: unknown) {
    if (err instanceof Error) {
      return NextResponse.json(
        { error: err.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: "Unknown error occurred" },
      { status: 500 }
    );
  }
}
```

**Key Components:**
- ✅ **Amount**: Total order amount (in cents)
- ✅ **Currency**: Payment currency (USD)
- ✅ **Automatic Payment Methods**: Enables all Stripe payment methods
- ✅ **Error Handling**: Comprehensive error responses

### 2. Currency Conversion Utility

The `convertToSubCurrency` function converts dollars to cents:

```typescript
// src/lib/convertToSubCurrency.ts
export default function convertToSubCurrency(
  amount: number,
  factor = 100
): number {
  return Math.round(amount * factor);
}
```

**Usage:**
```typescript
const amountInCents = convertToSubCurrency(29.99); // Returns 2999
```

### 3. Webhook Setup (Optional)

For production, set up webhooks to handle payment events:

1. **Create webhook endpoint**: `src/app/api/webhooks/stripe/route.ts`
2. **Add endpoint in Stripe Dashboard**: Developers → Webhooks → Add endpoint
3. **Events to listen for**:
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
   - `checkout.session.completed`

## 🎨 Frontend Setup

### 1. Main Payment Component

The `StripePayment.tsx` component handles the payment flow:

```typescript
// Key features:
- Loads Stripe with publishable key
- Gets cart total from Redux store
- Handles empty cart state
- Configures payment elements
```

### 2. Checkout Form

The `CheckOutPage.tsx` component provides the payment form:

```typescript
// Key features:
- Stripe payment element
- Form validation
- Loading states
- Error handling
- Success redirect
```

### 3. Integration Steps

1. **Load Stripe**: Uses `@stripe/stripe-js` to load Stripe.js
2. **Create Elements**: Wraps checkout form with Elements provider
3. **Payment Element**: Renders Stripe's pre-built payment form
4. **Handle Submission**: Processes payment with error handling

## 🧪 Testing Payments

### 1. Test Card Numbers

Use these test card numbers in development:

| Card Number | Brand | Result |
|-------------|--------|---------|
| `4242 4242 4242 4242` | Visa | ✅ Success |
| `4000 0000 0000 0002` | Visa | ❌ Declined |
| `5555 5555 5555 4444` | Mastercard | ✅ Success |
| `3782 822463 10005` | American Express | ✅ Success |

### 2. Test Data

**Valid Expiry Date**: Any future date (e.g., `12/25`)
**Valid CVC**: Any 3-digit number (e.g., `123`)
**Valid ZIP**: Any 5-digit number (e.g., `12345`)

### 3. Testing Scenarios

1. **Successful Payment**: Use `4242 4242 4242 4242`
2. **Declined Payment**: Use `4000 0000 0000 0002`
3. **3D Secure**: Use `4000 0025 0000 3155`

### 4. Stripe Dashboard

Monitor test payments:
1. Go to Stripe Dashboard
2. Switch to "Test mode"
3. Check "Payments" section
4. View payment details and events

## 🚀 Running the Project

### 1. Development Mode

```bash
# Start the development server
npm run dev

# The application will run on:
# http://localhost:3000
```

### 2. Build for Production

```bash
# Build the application
npm run build

# Start production server
npm start
```

### 3. Environment Check

Ensure your `.env.local` file contains:
```bash
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
MONGODB_URI=mongodb+srv://...
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

## 🌐 Deployment

### 1. Environment Variables for Production

Update your `.env.local` with production values:

```bash
# Production Stripe keys (live mode)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_your_live_publishable_key
STRIPE_SECRET_KEY=sk_live_your_live_secret_key

# Production database
MONGODB_URI=mongodb+srv://your-production-db

# Production URL
NEXT_PUBLIC_BASE_URL=https://your-domain.com
```

### 2. Deployment Platforms

#### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables in Vercel dashboard
```

#### Railway
```bash
# Install Railway CLI
npm i -g @railway/cli

# Deploy
railway login
railway init
railway up
```

#### Render
```bash
# Connect GitHub repository to Render
# Set environment variables in Render dashboard
# Deploy automatically on push
```

### 3. Post-Deployment Checklist

- ✅ Update Stripe webhook URLs
- ✅ Add production domain to Stripe allowed domains
- ✅ Test payment flow in production
- ✅ Configure email notifications
- ✅ Set up monitoring and alerts

## 🔧 Troubleshooting

### Common Issues and Solutions

#### 1. "Invalid API Key" Error
**Problem**: Stripe keys not configured correctly
**Solution**:
```bash
# Check if keys are set
echo $NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
echo $STRIPE_SECRET_KEY

# Ensure keys are correct format:
# Publishable: pk_test_... (starts with pk_)
# Secret: sk_test_... (starts with sk_)
```

#### 2. "Stripe.js has not loaded yet"
**Problem**: Stripe.js not loaded before component mount
**Solution**:
```typescript
// Ensure Stripe is loaded before rendering payment form
if (!stripe || !elements) {
  return <div>Loading payment system...</div>;
}
```

#### 3. "No such payment_intent" Error
**Problem**: Payment intent not created or expired
**Solution**:
- Check if payment intent is created successfully
- Ensure client secret is passed correctly
- Verify payment intent hasn't expired (24h limit)

#### 4. CORS Issues
**Problem**: Cross-origin requests blocked
**Solution**:
```typescript
// In your API route
const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST',
  'Access-Control-Allow-Headers': 'Content-Type',
};
```

#### 5. Webhook Verification Failed
**Problem**: Webhook signature verification fails
**Solution**:
```typescript
// Ensure webhook secret is configured
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

// Use raw body for verification
const sig = request.headers['stripe-signature'];
const event = stripe.webhooks.constructEvent(rawBody, sig, webhookSecret);
```

### Debug Mode

Enable Stripe debug logging:
```typescript
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY, {
  maxNetworkRetries: 2,
  timeout: 10000,
  telemetry: false,
});
```

## 📄 License & Credits

### License
This project is licensed under the MIT License:

```
MIT License

Copyright (c) 2024 Fit-Flair

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

### Credits
- **Stripe Documentation**: [https://stripe.com/docs](https://stripe.com/docs)
- **Next.js Documentation**: [https://nextjs.org/docs](https://nextjs.org/docs)
- **React Stripe.js**: [https://stripe.com/docs/stripe-js/react](https://stripe.com/docs/stripe-js/react)

### Support
For support and questions:
- 📧 Email: support@fit-flair.com
- 💬 Discord: [Join our community](#)
- 📚 Documentation: [https://docs.fit-flair.com](#)

---

**⭐ If this guide helped you, please star the repository!**

**Happy coding! 🎉**