import json
import random
import fabrics from "@/src/d ata/forSanity/fabrics.json"
import fabrics from "@/src/d ata/forSanity/N.json"

# Base data
categories = ["readyToWear", "unStitched", "stitched"]
subCategories = ["top", "bottom", "2piece", "3piece"]
audiences = ["men", "women"]
# fabrics = ["Cotton", "Linen", "Khaddar", "Silk", "Leather", "Chiffon", "Lawn", "Velvet", "Wool"]
brands = ["Sapphire", "Khaadi", "Gul Ahmed", "Alkaram", "J. Junaid Jamshed"]
colors = ["Black", "White", "Blue", "Red", "Green", "Brown", "Navy", "Olive", "Grey", "Beige"]
seasons = ["summer", "winter", "spring", "autumn"]
occasions = ["casual", "formal", "party", "outdoor", "work"]
designs = ["plain", "printed", "embroidered", "quilted", "striped"]
unstitched_names = [
    "Luxury Lawn Collection", "Summer Unstitched Set", "Classic Embroidered Suit", 
    "Printed 3 Piece", "Festive Lawn"
]
readytowear_names = [
    "Casual Shirt", "Formal Shirt", "Bomber Jacket", "Puffer Jacket", "Silk Kurta", 
    "Cotton Trouser", "Chino Pants", "Velvet Coat", "Denim Jacket", "Casual Hoodie"
]
unStitchedTags = ["Unstitched", "Lawn", "3 Piece", "Embroidery", "Summer"]
topTags = ["Shirt", "Kurta", "Jacket", "Hoodie", "Coat"]
bottomTags = ["Trouser", "Pant", "Shalwar", "Jeans", "Shorts"]
fullTags = ["Suit", "Dress", "Set", "Outfit", "2 Piece"]
sizesList = ["XS", "S", "M", "L", "XL", "XXL"]

# Base image URL
image_base_url = "https://example.com/images/{}.jpg"

products = []

for i in range(1000):
    category = random.choice(categories)
    subCategory = random.choice(subCategories) if category == "readyToWear" else ""
    fabric = random.choice(fabrics)
    color_options = random.sample(colors, k=random.randint(2, 4))
    
    # Choose product title
    if category == "unStitched":
        title = random.choice(unstitched_names)
        tags = random.sample(unStitchedTags, k=3)
        sizes = []
    else:
        title = random.choice(readytowear_names)
        sizes = random.sample(sizesList, k=random.randint(2, 6))
        if subCategory == "top":
            tags = random.sample(topTags, k=3)
        elif subCategory == "bottom":
            tags = random.sample(bottomTags, k=3)
        else:
            tags = random.sample(fullTags, k=3)

    # Variants section
    variants = []
    for color in color_options:
        featured_img_num = random.randint(1, 35)
        featuredImage = image_base_url.format(featured_img_num)
        additional_imgs = set()
        while len(additional_imgs) < 2:
            img_num = random.randint(1, 35)
            if img_num != featured_img_num:
                additional_imgs.add(image_base_url.format(img_num))
        variants.append({
            "color": color,
            "featuredImage": featuredImage,
            "additionalImages": list(additional_imgs),
            "stock": random.randint(5, 50)
        })

    product = {
        "title": title,
        "subTitle": f"{title} is the sub title of this product",
        "slug": f"{title.lower().replace(' ', '-')}-{i+1}",
        "price": round(random.uniform(1500, 12000), 2),
        "audience": random.choice(audiences),
        "category": category,
        "subCategory": subCategory,
        "season": random.sample(seasons, k=random.randint(1, 2)),
        "designs": random.sample(designs, k=random.randint(1, 2)),
        "occasions": random.sample(occasions, k=random.randint(1, 2)),
        "fabric": fabric,
        "discount": random.choice([0, 10, 15, 20, 25]),
        "isNewArrival": random.choice([True, False]),
        "variants": variants,
        "description": f"A {category} {fabric} {title} perfect for {random.choice(seasons)} {random.choice(['wear', 'fashion', 'collection'])}.",
        "relevantTags": tags,
        "isFeatured": random.choice([True, False]),
        "isPopular": random.choice([True, False])
    }

    products.append(product)

# Save to JSON file
file_path = "/mnt/data/products_dataset_1000_strong.json"
with open(file_path, "w") as f:
    json.dump(products, f, indent=2)

file_path
























# # Regenerate dataset with 1000 products using the same rules as before

# products = []

# for i in range(1000):
#     category = random.choice(categories)
#     subCategory = random.choice(subCategories) if category == "readyToWear" else ""
#     color = random.choice(colors)
    
#     # Pick 1 featured image
#     featured_img_num = random.randint(1, 35)
#     featuredImage = image_base_url.format(featured_img_num)
    
#     # Pick 2 additional images (ensure different from featured)
#     additional_imgs = set()
#     while len(additional_imgs) < 2:
#         img_num = random.randint(1, 35)
#         if img_num != featured_img_num:
#             additional_imgs.add(image_base_url.format(img_num))
    
#     # Choose a name based on category
#     if category == "unStitched":
#         title = random.choice(unstitched_names)
#         tags = random.sample(unStitchedTags, k=3)
#         sizes = []
#     else:
#         title = random.choice(readytowear_names)
#         sizes = random.sample(sizesList, k=random.randint(2,6))
#         if subCategory == "top":
#             tags = random.sample(topTags, k=3)
#         elif subCategory == "bottom":
#             tags = random.sample(bottomTags, k=3)
#         else:
#             tags = random.sample(fullTags, k=3)
    
#     product = {
#         "title": title,
#         "slug": f"{title.lower().replace(' ', '-')}-{i+1}",
#         "price": round(random.uniform(1500, 12000), 2),
#         "category": category,
#         "subCategory": subCategory,
#         "fabric": random.choice(fabrics),
#         "audience": random.choice(audiences),
#         "featuredImage": featuredImage,
#         "additionalImages": list(additional_imgs),
#         "description": f"A {category} {color} {title} perfect for {random.choice(['summer', 'winter', 'everyday wear', 'party wear'])}.",
#         "brand": random.choice(brands),
#         "color": color,
#         "isFeatured": random.choice([True, False]),
#         "tags": tags,
#         "sizes": sizes
#     }
#     products.append(product)

# # Save to JSON file
# file_path = "/mnt/data/products_dataset_1000.json"
# with open(file_path, "w") as f:
#     json.dump(products, f, indent=2)

# file_path
