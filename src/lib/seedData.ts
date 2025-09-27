import connectDB from './mongodb';
import Product from '@/models/Product';
import { IProduct } from '@/models/Product';

// Sample product data for seeding
const sampleProducts: Partial<IProduct>[] = [
  {
    title: "Jumpsuit Outfit",
    slug: "jumpsuit-outfit",
    subTitle: "Jumpsuit Outfit is the sub title of this product",
    price: 9590.92,
    audience: "men",
    category: "readyToWear",
    subCategory: "2piece",
    menOutfitType: "tracksuit",
    season: ["summer"],
    designs: ["plain"],
    occasions: ["casual"],
    fabric: "Wool",
    discount: 13,
    isNewArrival: true,
    variants: [
      {
        color: "Teal",
        colorCode: "#008080",
        featuredImage: "/images/men/tracksuit.jpg",
        additionalImages: ["/images/men/polo.jpg", "/images/men/t-shirt.jpg", "/images/men/formal-shirt.jpg"],
        stock: 25
      },
      {
        color: "Red",
        colorCode: "#FF0000",
        featuredImage: "/images/men/tracksuit.jpg",
        additionalImages: ["/images/men/jeans.jpg", "/images/men/trouser.jpg", "/images/men/kurta.jpg"],
        stock: 30
      }
    ],
    description: "A readyToWear Jumpsuit Outfit perfect for everyday wear.",
    relevantTags: ["Shorts", "Trouser", "Festive"],
    isFeatured: true,
    isPopular: true
  },
  {
    title: "Casual Shirt",
    slug: "casual-shirt",
    subTitle: "Casual Shirt is the sub title of this product",
    price: 4590.50,
    audience: "men",
    category: "readyToWear",
    subCategory: "2piece",
    menOutfitType: "shirt",
    season: ["summer"],
    designs: ["printed"],
    occasions: ["office"],
    fabric: "Cotton",
    discount: 25,
    isNewArrival: false,
    variants: [
      {
        color: "Red",
        colorCode: "#FF0000",
        featuredImage: "/images/men/formal-shirt.jpg",
        additionalImages: ["/images/men/polo.jpg", "/images/men/t-shirt.jpg", "/images/men/kurta.jpg"],
        stock: 40
      },
      {
        color: "Blue",
        colorCode: "#0000FF",
        featuredImage: "/images/men/formal-shirt.jpg",
        additionalImages: ["/images/men/jeans.jpg", "/images/men/trouser.jpg", "/images/men/formal-suit.jpg"],
        stock: 35
      }
    ],
    description: "A casual printed shirt suitable for office and daily wear.",
    relevantTags: ["Shirt", "Casual", "Office"],
    isFeatured: false,
    isPopular: false
  },
  {
    title: "Formal Suit",
    slug: "formal-suit",
    subTitle: "Formal Suit is the sub title of this product",
    price: 15990.00,
    audience: "men",
    category: "readyToWear",
    subCategory: "3piece",
    menOutfitType: "3pieceSuit",
    season: ["winter"],
    designs: ["plain"],
    occasions: ["formal"],
    fabric: "Wool",
    discount: 18,
    isNewArrival: false,
    variants: [
      {
        color: "Black",
        colorCode: "#000000",
        featuredImage: "/images/men/formal-suit.jpg",
        additionalImages: ["/images/men/polo.jpg", "/images/men/t-shirt.jpg", "/images/men/formal-shirt.jpg"],
        stock: 10
      },
      {
        color: "Navy Blue",
        colorCode: "#000080",
        featuredImage: "/images/men/formal-suit.jpg",
        additionalImages: ["/images/men/kurta.jpg", "/images/men/jeans.jpg", "/images/men/trouser.jpg"],
        stock: 12
      }
    ],
    description: "A premium formal suit perfect for winter weddings and office events.",
    relevantTags: ["Suit", "Formal", "Winter"],
    isFeatured: true,
    isPopular: true
  }
];

export async function seedProducts() {
  try {
    await connectDB();
    
    // Clear existing products
    await Product.deleteMany({});
    
    // Insert sample products
    const products = await Product.insertMany(sampleProducts);
    
    console.log(`✅ Seeded ${products.length} products successfully`);
    return products;
    
  } catch (error) {
    console.error('❌ Error seeding products:', error);
    throw error;
  }
}

export async function clearProducts() {
  try {
    await connectDB();
    
    const result = await Product.deleteMany({});
    
    console.log(`✅ Cleared ${result.deletedCount} products`);
    return result;
    
  } catch (error) {
    console.error('❌ Error clearing products:', error);
    throw error;
  }
}

// Run seeding if this file is executed directly
if (require.main === module) {
  seedProducts()
    .then(() => {
      console.log('Database seeding completed');
      process.exit(0);
    })
    .catch((error) => {
      console.error('Database seeding failed:', error);
      process.exit(1);
    });
}
