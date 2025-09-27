// import { NextRequest, NextResponse } from 'next/server';
// import connectDB from '@/lib/mongodb';
// import Product from '@/models/Product';

// export async function GET(request: NextRequest) {
//   try {
//     await connectDB();
    
//     const { searchParams } = new URL(request.url);
//     const page = parseInt(searchParams.get('page') || '1');
//     const limit = parseInt(searchParams.get('limit') || '12');
//     const audience = searchParams.get('audience');
//     const category = searchParams.get('category');
//     const subCategory = searchParams.get('subCategory');
//     const minPrice = searchParams.get('minPrice');
//     const maxPrice = searchParams.get('maxPrice');
//     const featured = searchParams.get('featured');
//     const newArrival = searchParams.get('newArrival');
//     const popular = searchParams.get('popular');
//     const search = searchParams.get('search');
//     const sort = searchParams.get('sort') || 'createdAt';
//     const order = searchParams.get('order') || 'desc';

//     // Build filter object
//     const filter: any = {};
    
//     if (audience) filter.audience = audience;
//     if (category) filter.category = category;
//     if (subCategory) filter.subCategory = subCategory;
//     if (featured === 'true') filter.isFeatured = true;
//     if (newArrival === 'true') filter.isNewArrival = true;
//     if (popular === 'true') filter.isPopular = true;
    
//     if (minPrice || maxPrice) {
//       filter.price = {};
//       if (minPrice) filter.price.$gte = parseFloat(minPrice);
//       if (maxPrice) filter.price.$lte = parseFloat(maxPrice);
//     }
    
//     if (search) {
//       filter.$or = [
//         { title: { $regex: search, $options: 'i' } },
//         { subTitle: { $regex: search, $options: 'i' } },
//         { description: { $regex: search, $options: 'i' } },
//         { relevantTags: { $in: [new RegExp(search, 'i')] } }
//       ];
//     }

//     // Build sort object
//     const sortObj: any = {};
//     sortObj[sort] = order === 'desc' ? -1 : 1;

//     const skip = (page - 1) * limit;
    
//     const [products, total] = await Promise.all([
//       Product.find(filter)
//         .sort(sortObj)
//         .skip(skip)
//         .limit(limit)
//         .lean(),
//       Product.countDocuments(filter)
//     ]);

//     const totalPages = Math.ceil(total / limit);

//     return NextResponse.json({
//       products,
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
//     console.error('Error fetching products:', error);
//     return NextResponse.json(
//       { error: 'Failed to fetch products' },
//       { status: 500 }
//     );
//   }
// }

// export async function POST(request: NextRequest) {
//   try {
//     await connectDB();
    
//     const body = await request.json();
//     const product = new Product(body);
//     await product.save();

//     return NextResponse.json(product, { status: 201 });

//   } catch (error) {
//     console.error('Error creating product:', error);
//     return NextResponse.json(
//       { error: 'Failed to create product' },
//       { status: 500 }
//     );
//   }
// }

import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ message: "Cart API works!" });
}
