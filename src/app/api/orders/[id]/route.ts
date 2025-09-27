// import { NextRequest, NextResponse } from 'next/server';
// import { auth } from '@clerk/nextjs/server';
// import connectDB from '@/lib/mongodb';
// import Order from '@/models/Order';

// export async function GET(
//   request: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     const { userId } = await auth();
    
//     if (!userId) {
//       return NextResponse.json(
//         { error: 'Unauthorized' },
//         { status: 401 }
//       );
//     }

//     await connectDB();
    
//     const order = await Order.findOne({ 
//       _id: params.id, 
//       userId 
//     });
    
//     if (!order) {
//       return NextResponse.json(
//         { error: 'Order not found' },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json(order);

//   } catch (error) {
//     console.error('Error fetching order:', error);
//     return NextResponse.json(
//       { error: 'Failed to fetch order' },
//       { status: 500 }
//     );
//   }
// }

// export async function PUT(
//   request: NextRequest,
//   { params }: { params: { id: string } }
// ) {
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
//     const { status, paymentStatus, trackingNumber, notes } = body;

//     const order = await Order.findOneAndUpdate(
//       { _id: params.id, userId },
//       { 
//         ...(status && { status }),
//         ...(paymentStatus && { paymentStatus }),
//         ...(trackingNumber && { trackingNumber }),
//         ...(notes && { notes })
//       },
//       { new: true, runValidators: true }
//     );
    
//     if (!order) {
//       return NextResponse.json(
//         { error: 'Order not found' },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json(order);

//   } catch (error) {
//     console.error('Error updating order:', error);
//     return NextResponse.json(
//       { error: 'Failed to update order' },
//       { status: 500 }
//     );
//   }
// }

import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ message: "Cart API works!" });
}
