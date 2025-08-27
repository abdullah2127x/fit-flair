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

// Colors
async function importColors() {
  const colors = await fetchData("color"); // expects [{ name, code }]

  for (const colorItem of colors) {
    const { name, code } = colorItem;

    try {
      const existing = await client.fetch(
        `*[_type == "color" && name == $name]{_id}[0]`,
        { name }
      );

      if (existing) {
        console.log(`⚠️ Already exists: ${name} (ID: ${existing._id})`);
      } else {
        const result = await client.create({
          _type: "color",
          name,
          code,
        });
        console.log(`✅ Added color: ${result.name} (ID: ${result._id})`);
      }
    } catch (err) {
      console.error(`❌ Error adding color: ${name}`, err.message);
    }
  }

  console.log("🎉 All colors processed successfully!\n");
}

// Fabrics
async function importFabrics() {
  const items = await fetchData("fabric");
  console.log("the items are : ", items);

  for (const itemName of items) {
    try {
      const existing = await client.fetch(
        `*[_type == "fabric" && name == $name]{_id}[0]`,
        { name: itemName }
      );

      if (existing) {
        console.log(`⚠️ Already exists: ${itemName} (ID: ${existing._id})`);
      } else {
        const result = await client.create({ _type: "fabric", name: itemName });
        console.log(`✅ Added fabric: ${result.name} (ID: ${result._id})`);
      }
    } catch (err) {
      console.error(`❌ Error adding fabric : ${itemName}`, err.message);
    }
  }

  console.log(`🎉 All fabrics processed successfully!\n`);
}

// Products (with variants, images, references)
// async function importProducts() {
//   const products = await fetchData("product");

//   for (const item of products) {
//     console.log(`➡️ Processing Item: ${item.title}`);

//     // Prepare variants array
//     const variantsArray = [];
//     if (item.variants?.length) {
//       for (const variant of item.variants) {

//          season: item.season || [],
//       designs: item.designs || [],
//       occasions: item.occasions || [],
//       relevantTags: item.relevantTags || [],
//         // Upload featured image
//         let featuredImageRef = null;
//         if (variant.featuredImage) {
//           const uploaded = await uploadImageToSanity(variant.featuredImage);
//           if (uploaded)
//             featuredImageRef = {
//               _type: "image",
//               asset: { _type: "reference", _ref: uploaded },
//             };
//         }

//         // Upload additional images
//         let additionalImageRefs = [];
//         if (variant.additionalImages?.length) {
//           for (const img of variant.additionalImages) {
//             const uploaded = await uploadImageToSanity(img);
//             if (uploaded) {
//               additionalImageRefs.push({
//                 _key: uuidv4(),
//                 _type: "image",
//                 asset: { _type: "reference", _ref: uploaded },
//               });
//             }
//           }
//         }

//         // Color reference
//         const colorRef = await fetchReference("color", "name", variant.color);

//         variantsArray.push({
//           _key: uuidv4(),
//           color: colorRef,

//            season: item.season || [],
//       designs: item.designs || [],
//       occasions: item.occasions || [],
//       relevantTags: item.relevantTags || [],
//           featuredImage: featuredImageRef,
//           additionalImages: additionalImageRefs,
//           stock: variant.stock || 0,
//         });
//       }
//     }

//     // Description
//     const descriptionBlocks = item.description
//       ? [
//           {
//             _type: "block",
//             _key: uuidv4(),
//             style: "normal",
//             markDefs: [],
//             children: [
//               {
//                 _type: "span",
//                 _key: uuidv4(),
//                 text: item.description,
//                 marks: [],
//               },
//             ],
//           },
//         ]
//       : [];

//     // References
//     const fabricRef = await fetchReference("fabric", "name", item.fabric);

//     // Tags
//     const relevantTags = item.relevantTags || [];

//     const sanityItem = {
//       _type: "product",
//       title: item.title,
//       slug: {
//         _type: "slug",
//         current: item.slug || item.title.toLowerCase().replace(/\s+/g, "-"),
//       },
//       audience: item.audience,
//       category: item.category,
//       price: item.price,
//       fabric: fabricRef,
//       variants: variantsArray,

//       description: descriptionBlocks,

//        season: item.season || [],
//       designs: item.designs || [],
//       occasions: item.occasions || [],
//       relevantTags: item.relevantTags || [],

//       isFeatured: item.isFeatured || false,

//     };

//     const result = await client.create(sanityItem);
//     console.log(`✅ Uploaded: ${result._id}`);
//     console.log("----------------------------------------------------------\n");
//   }

//   console.log("🎉 Products import completed successfully!\n");
// }

// Products (with variants, images, references)
async function importProducts() {
  const products = await fetchData("product");

  for (const item of products) {
    console.log(`➡️ Processing Item: ${item.title}`);

    // -------------------- Variants --------------------
    const variantsArray = [];
    if (item.variants?.length) {
      for (const variant of item.variants) {
        // Upload featured image
        let featuredImageRef = null;
        if (variant.featuredImage) {
          const uploaded = await uploadImageToSanity(variant.featuredImage);
          if (uploaded)
            featuredImageRef = {
              _type: "image",
              asset: { _type: "reference", _ref: uploaded },
            };
        }

        // Upload additional images
        const additionalImageRefs = [];
        if (variant.additionalImages?.length) {
          for (const img of variant.additionalImages) {
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

        // Color reference
        const colorRef = await fetchReference("color", "name", variant.color);

        variantsArray.push({
          _key: uuidv4(),
          color: colorRef,
          featuredImage: featuredImageRef,
          additionalImages: additionalImageRefs,
          stock: variant.stock || 0,
        });
      }
    }

    // -------------------- Description --------------------
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

    // -------------------- References --------------------
    const fabricRef = await fetchReference("fabric", "name", item.fabric);

    // -------------------- Sanity Document --------------------
    const sanityItem = {
      _type: "product",
      title: item.title,
      slug: {
        _type: "slug",
        current: item.slug || item.title.toLowerCase().replace(/\s+/g, "-"),
      },
      audience: item.audience,
      category: item.category || null,
      subCategory: item.subCategory || null,
      menOutfitType: item.menOutfitType || null,
      womenOutfitType: item.womenOutfitType || null,
      price: item.price,
      fabric: fabricRef,
      variants: variantsArray,
      description: descriptionBlocks,
      season: item.season || [],
      designs: item.designs || [],
      occasions: item.occasions || [],
      relevantTags: item.relevantTags || [],
      isFeatured: item.isFeatured || false,
    };

    try {
      const result = await client.create(sanityItem);
      console.log(`✅ Uploaded: ${result._id}`);
      console.log(
        "----------------------------------------------------------\n"
      );
    } catch (err) {
      console.error(`❌ Failed to upload product: ${item.title}`, err.message);
    }
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
      choices: ["fabric", "color", "product"],
    },
  ]);

  switch (selectedType) {
    case "fabric":
      await importFabrics();
      break;
    case "color":
      await importColors();
    case "product":
      await importProducts();
      break;
    default:
      console.log("❌ Invalid type selected");
  }
};

run();
