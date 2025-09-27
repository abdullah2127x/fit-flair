// import { NextRequest, NextResponse } from 'next/server';
// import { auth } from '@clerk/nextjs/server';
// import connectDB from '@/lib/mongodb';
// import Order from '@/models/Order';
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
    
//     const { searchParams } = new URL(request.url);
//     const page = parseInt(searchParams.get('page') || '1');
//     const limit = parseInt(searchParams.get('limit') || '10');
//     const status = searchParams.get('status');

//     const filter: any = { userId };
//     if (status) filter.status = status;

//     const skip = (page - 1) * limit;
    
//     const [orders, total] = await Promise.all([
//       Order.find(filter)
//         .sort({ createdAt: -1 })
//         .skip(skip)
//         .limit(limit)
//         .lean(),
//       Order.countDocuments(filter)
//     ]);

//     const totalPages = Math.ceil(total / limit);

//     return NextResponse.json({
//       orders,
//       pagination: {
//         page,
//         limit,
//         total,
//         totalPages,
//         hasNext: page < totalPages,
//         hasPrev: page > 1
//       }
//     });

//   } catch (error) {
//     console.error('Error fetching orders:', error);
//     return NextResponse.json(
//       { error: 'Failed to fetch orders' },
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
//     const { items, subtotal, shippingCost, tax, total, paymentMethod, paymentIntentId, shippingAddress, billingAddress } = body;

//     // Create order
//     const order = new Order({
//       userId,
//       items,
//       subtotal,
//       shippingCost,
//       tax,
//       total,
//       paymentMethod,
//       paymentIntentId,
//       shippingAddress,
//       billingAddress,
//       status: 'pending',
//       paymentStatus: paymentMethod === 'cod' ? 'pending' : 'paid'
//     });

//     await order.save();

//     // Clear user's cart after successful order
//     await Cart.findOneAndUpdate(
//       { userId },
//       { items: [] }
//     );

//     return NextResponse.json(order, { status: 201 });

//   } catch (error) {
//     console.error('Error creating order:', error);
//     return NextResponse.json(
//       { error: 'Failed to create order' },
//       { status: 500 }
//     );
//   }
// }

import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ message: "Cart API works!" });
}
