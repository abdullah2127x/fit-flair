// import { NextRequest, NextResponse } from 'next/server';
// import { auth } from '@clerk/nextjs/server';
// import connectDB from '@/lib/mongodb';
// import Cart from '@/models/Cart';

// export async function GET(request: NextRequest) {
//   try {
//     const { userId } = await auth();
    
//     if (!userId) {
//       return NextResponse.json(
//         { error: 'Unauthorized' },
//         { status: 401 }
//       );
//     }

//     await connectDB();
    
//     let cart = await Cart.findOne({ userId });
    
//     if (!cart) {
//       cart = new Cart({ userId, items: [] });
//       await cart.save();
//     }

//     return NextResponse.json(cart);

//   } catch (error) {
//     console.error('Error fetching cart:', error);
//     return NextResponse.json(
//       { error: 'Failed to fetch cart' },
//       { status: 500 }
//     );
//   }
// }

// export async function POST(request: NextRequest) {
//   try {
//     const { userId } = await auth();
    
//     if (!userId) {
//       return NextResponse.json(
//         { error: 'Unauthorized' },
//         { status: 401 }
//       );
//     }

//     await connectDB();
    
//     const body = await request.json();
//     const { productId, productTitle, productSlug, subTitle, price, discount, imageSrc, colorName, quantity } = body;

//     let cart = await Cart.findOne({ userId });
    
//     if (!cart) {
//       cart = new Cart({ userId, items: [] });
//     }

//     // Check if item already exists
//     const existingItemIndex = cart.items.findIndex(
//       item => item.productId === productId && item.colorName === colorName
//     );

//     if (existingItemIndex > -1) {
//       // Update quantity
//       cart.items[existingItemIndex].quantity += quantity;
//     } else {
//       // Add new item
//       cart.items.push({
//         productId,
//         productTitle,
//         productSlug,
//         subTitle,
//         price,
//         discount,
//         imageSrc,
//         colorName,
//         quantity
//       });
//     }

//     await cart.save();

//     return NextResponse.json(cart);

//   } catch (error) {
//     console.error('Error adding to cart:', error);
//     return NextResponse.json(
//       { error: 'Failed to add to cart' },
//       { status: 500 }
//     );
//   }
// }

// export async function PUT(request: NextRequest) {
//   try {
//     const { userId } = await auth();
    
//     if (!userId) {
//       return NextResponse.json(
//         { error: 'Unauthorized' },
//         { status: 401 }
//       );
//     }

//     await connectDB();
    
//     const body = await request.json();
//     const { productId, colorName, quantity } = body;

//     const cart = await Cart.findOne({ userId });
    
//     if (!cart) {
//       return NextResponse.json(
//         { error: 'Cart not found' },
//         { status: 404 }
//       );
//     }

//     const itemIndex = cart.items.findIndex(
//       item => item.productId === productId && item.colorName === colorName
//     );

//     if (itemIndex > -1) {
//       if (quantity <= 0) {
//         cart.items.splice(itemIndex, 1);
//       } else {
//         cart.items[itemIndex].quantity = quantity;
//       }
//     }

//     await cart.save();

//     return NextResponse.json(cart);

//   } catch (error) {
//     console.error('Error updating cart:', error);
//     return NextResponse.json(
//       { error: 'Failed to update cart' },
//       { status: 500 }
//     );
//   }
// }

// export async function DELETE(request: NextRequest) {
//   try {
//     const { userId } = await auth();
    
//     if (!userId) {
//       return NextResponse.json(
//         { error: 'Unauthorized' },
//         { status: 401 }
//       );
//     }

//     await connectDB();
    
//     const { searchParams } = new URL(request.url);
//     const productId = searchParams.get('productId');
//     const colorName = searchParams.get('colorName');

//     const cart = await Cart.findOne({ userId });
    
//     if (!cart) {
//       return NextResponse.json(
//         { error: 'Cart not found' },
//         { status: 404 }
//       );
//     }

//     if (productId && colorName) {
//       // Remove specific item
//       cart.items = cart.items.filter(
//         item => !(item.productId === productId && item.colorName === colorName)
//       );
//     } else {
//       // Clear entire cart
//       cart.items = [];
//     }

//     await cart.save();

//     return NextResponse.json(cart);

//   } catch (error) {
//     console.error('Error clearing cart:', error);
//     return NextResponse.json(
//       { error: 'Failed to clear cart' },
//       { status: 500 }
//     );
//   }
// }

import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ message: "Cart API works!" });
}
