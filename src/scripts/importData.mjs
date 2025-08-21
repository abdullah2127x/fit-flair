import { createClient } from "@sanity/client";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import inquirer from "inquirer";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

const {
  NEXT_PUBLIC_SANITY_PROJECT_ID,
  NEXT_PUBLIC_SANITY_DATASET,
  SANITY_API_TOKEN,
  NEXT_PUBLIC_SANITY_API_VERSION,
  NEXT_PUBLIC_API_BASE_URL,
} = process.env;

if (
  !NEXT_PUBLIC_SANITY_PROJECT_ID ||
  !SANITY_API_TOKEN ||
  !NEXT_PUBLIC_API_BASE_URL
) {
  console.error("❌ Missing required environment variables.");
  process.exit(1);
}

const client = createClient({
  projectId: NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: NEXT_PUBLIC_SANITY_DATASET || "production",
  token: SANITY_API_TOKEN,
  apiVersion: NEXT_PUBLIC_SANITY_API_VERSION || "2025-01-15",
  useCdn: false,
});

// ------------------- Helper Functions -------------------

// Upload image to Sanity
// it will behave as if same image comes twice so it upload it twice which gets more space and time to upload so create our custom chache and check
const uploadedImages = {}; // { imageUrl: assetId }
async function uploadImageToSanity(imageUrl) {
  try {
    // ✅ Check if already uploaded
    if (uploadedImages[imageUrl]) {
      console.log(`🔁 Already uploaded: ${imageUrl}`);
      return uploadedImages[imageUrl]; // return existing assetId
    }

    console.log(`📤 Uploading Image: ${imageUrl}`);
    const response = await axios.get(imageUrl, { responseType: "arraybuffer" });
    const buffer = Buffer.from(response.data);

    const asset = await client.assets.upload("image", buffer, {
      filename: imageUrl.split("/").pop(),
    });

    // ✅ Save to cache
    uploadedImages[imageUrl] = asset._id;

    return asset._id;
  } catch (error) {
    console.error("❌ Failed to Upload Image:", imageUrl, error.message);
    return null;
  }
}


// Generic helper to fetch reference by type + field
async function fetchReference(type, field, value) {
  if (!value) return null;
  try {
    const query = `*[_type == "${type}" && ${field} == $value]{_id}[0]`;
    const ref = await client.fetch(query, { value });
    return ref ? { _type: "reference", _ref: ref._id } : null;
  } catch (error) {
    console.error(`❌ Error fetching ${type} reference:`, error.message);
    return null;
  }
}

// Fetch data from API with POST + retry
async function fetchData(type, retries = 1) {
  try {
    const response = await axios.post(
      `${NEXT_PUBLIC_API_BASE_URL}/api/importData`,
      { type }
    );
    if (!Array.isArray(response.data)) {
      console.warn(
        `⚠️ API response for ${type} is not an array. Returning empty.`
      );
      return [];
    }
    return response.data;
  } catch (error) {
    if (retries > 0) {
      console.log(`🔁 Retry fetching ${type}...`);
      return fetchData(type, retries - 1);
    } else {
      console.error(`❌ Failed to fetch ${type} from API:`, error.message);
      return [];
    }
  }
}

// ------------------- Import Functions -------------------

// Brands / Fabrics / Colors
async function importSimpleType(type) {
  const items = await fetchData(type);

  for (const itemName of items) {
    try {
      const existing = await client.fetch(
        `*[_type == "${type}" && name == $name]{_id}[0]`,
        { name: itemName }
      );

      if (existing) {
        console.log(`⚠️ Already exists: ${itemName} (ID: ${existing._id})`);
      } else {
        const result = await client.create({ _type: type, name: itemName });
        console.log(`✅ Added ${type}: ${result.name} (ID: ${result._id})`);
      }
    } catch (err) {
      console.error(`❌ Error adding ${type}: ${itemName}`, err.message);
    }
  }

  console.log(`🎉 All ${type}s processed successfully!\n`);
}

// Products (with images, references, tags)
async function importProducts() {
  const products = await fetchData("product");

  for (const item of products) {
    console.log(`➡️ Processing Item: ${item.title}`);

    // Upload featured image
    let featuredImageRef = null;
    if (item.featuredImage) {
      const uploaded = await uploadImageToSanity(item.featuredImage);
      if (uploaded)
        featuredImageRef = {
          _type: "image",
          asset: { _type: "reference", _ref: uploaded },
        };
    }

    // Upload additional images
    let additionalImageRefs = [];
    if (item.additionalImages?.length) {
      for (const img of item.additionalImages) {
        const uploaded = await uploadImageToSanity(img);
        if (uploaded) {
          additionalImageRefs.push({
            _key: uuidv4(),
            _type: "image",
            asset: { _type: "reference", _ref: uploaded },
          });
        }
      }
    }

    // References
    const brandRef = await fetchReference("brand", "name", item.brand);
    const fabricRef = await fetchReference("fabric", "name", item.fabric);
    const colorRef = await fetchReference("color", "name", item.color);

    // Description
    const descriptionBlocks = item.description
      ? [
          {
            _type: "block",
            _key: uuidv4(),
            style: "normal",
            markDefs: [],
            children: [
              {
                _type: "span",
                _key: uuidv4(),
                text: item.description,
                marks: [],
              },
            ],
          },
        ]
      : [];

    // Tags
    const unstitchedTags =
      item.category === "unStitched" ? item.tags || [] : [];
    const topTags =
      item.category === "readyToWear" && item.subCategory === "top"
        ? item.tags || []
        : [];
    const bottomTags =
      item.category === "readyToWear" && item.subCategory === "bottom"
        ? item.tags || []
        : [];
    const fullTags =
      item.category === "readyToWear" && item.subCategory === "full"
        ? item.tags || []
        : [];

    const sanityItem = {
      _type: "product",
      title: item.title,
      slug: { _type: "slug", current: item.slug },
      price: item.price,
      category: item.category,
      subCategory: item.subCategory || null,
      fabric: fabricRef,
      audience: item.audience,
      description: descriptionBlocks,
      uploadedAt: item.uploadedAt,
      brand: brandRef,
      color: colorRef,
      isFeatured: item.isFeatured || false,
      sizes: item.sizes || [],
      featuredImage: featuredImageRef,
      additionalImages: additionalImageRefs,
      unstitchedTags,
      topTags,
      bottomTags,
      fullTags,
    };

    const result = await client.create(sanityItem);
    console.log(`✅ Uploaded: ${result._id}`);
    console.log("----------------------------------------------------------\n");
  }

  console.log("🎉 Products import completed successfully!\n");
}

// ------------------- Main -------------------

const run = async () => {
  const { selectedType } = await inquirer.prompt([
    {
      type: "list",
      name: "selectedType",
      message: "Which type of data do you want to import?",
      choices: ["brand", "fabric", "color", "product"],
    },
  ]);

  switch (selectedType) {
    case "brand":
    case "fabric":
    case "color":
      await importSimpleType(selectedType);
      break;
    case "product":
      await importProducts();
      break;
    default:
      console.log("❌ Invalid type selected");
  }
};

run();
