# Regenerate dataset with 1000 products using the same rules as before

products = []

for i in range(1000):
    category = random.choice(categories)
    subCategory = random.choice(subCategories) if category == "readyToWear" else ""
    color = random.choice(colors)
    
    # Pick 1 featured image
    featured_img_num = random.randint(1, 35)
    featuredImage = image_base_url.format(featured_img_num)
    
    # Pick 2 additional images (ensure different from featured)
    additional_imgs = set()
    while len(additional_imgs) < 2:
        img_num = random.randint(1, 35)
        if img_num != featured_img_num:
            additional_imgs.add(image_base_url.format(img_num))
    
    # Choose a name based on category
    if category == "unStitched":
        title = random.choice(unstitched_names)
        tags = random.sample(unStitchedTags, k=3)
        sizes = []
    else:
        title = random.choice(readytowear_names)
        sizes = random.sample(sizesList, k=random.randint(2,6))
        if subCategory == "top":
            tags = random.sample(topTags, k=3)
        elif subCategory == "bottom":
            tags = random.sample(bottomTags, k=3)
        else:
            tags = random.sample(fullTags, k=3)
    
    product = {
        "title": title,
        "slug": f"{title.lower().replace(' ', '-')}-{i+1}",
        "price": round(random.uniform(1500, 12000), 2),
        "category": category,
        "subCategory": subCategory,
        "fabric": random.choice(fabrics),
        "audience": random.choice(audiences),
        "featuredImage": featuredImage,
        "additionalImages": list(additional_imgs),
        "description": f"A {category} {color} {title} perfect for {random.choice(['summer', 'winter', 'everyday wear', 'party wear'])}.",
        "brand": random.choice(brands),
        "color": color,
        "isFeatured": random.choice([True, False]),
        "tags": tags,
        "sizes": sizes
    }
    products.append(product)

# Save to JSON file
file_path = "/mnt/data/products_dataset_1000.json"
with open(file_path, "w") as f:
    json.dump(products, f, indent=2)

file_path
