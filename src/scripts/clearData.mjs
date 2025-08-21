// import { createClient } from "@sanity/client";
// import dotenv from "dotenv";

// dotenv.config({ path: ".env.local" });

// const {
//   NEXT_PUBLIC_SANITY_PROJECT_ID, // Sanity project ID
//   NEXT_PUBLIC_SANITY_DATASET, // Sanity dataset (e.g., "production")
//   SANITY_API_TOKEN, // Sanity API token
//   NEXT_PUBLIC_SANITY_API_VERSION,
// } = process.env;

// // Check if the required environment variables are provided
// if (!NEXT_PUBLIC_SANITY_PROJECT_ID || !SANITY_API_TOKEN) {
//   console.error(
//     "Missing required environment variables. Please check your .env.local file."
//   );
//   process.exit(1); // Stop execution if variables are missing
// }

// const client = createClient({
//   projectId: NEXT_PUBLIC_SANITY_PROJECT_ID,
//   dataset: NEXT_PUBLIC_SANITY_DATASET || "production",
//   token: SANITY_API_TOKEN,
//   apiVersion: NEXT_PUBLIC_SANITY_API_VERSION || "2025-01-15",
//   useCdn: false,
// });

// async function deleteData(productType) {
//   try {
//     const deletedData = await client.delete({
//       query: `*[_type == "${productType}"][0...999]`,
//     });

//     console.log("The deleted data is : ", deletedData);
//     console.log("🟢Data Deletion Completed Successfully!");
//   } catch (error) {
//     console.error("🔴Error Deleting Data:", error);
//   }
// }

// // deleteData("product");
// deleteData("brand");
// // product
// // brand
// // tag
// // category
import { createClient } from "@sanity/client";
import dotenv from "dotenv";
import inquirer from "inquirer";

dotenv.config({ path: ".env.local" });

const {
  NEXT_PUBLIC_SANITY_PROJECT_ID,
  NEXT_PUBLIC_SANITY_DATASET,
  SANITY_API_TOKEN,
  NEXT_PUBLIC_SANITY_API_VERSION,
} = process.env;

if (!NEXT_PUBLIC_SANITY_PROJECT_ID || !SANITY_API_TOKEN) {
  console.error(
    "Missing required environment variables. Please check your .env.local file."
  );
  process.exit(1);
}

const client = createClient({
  projectId: NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: NEXT_PUBLIC_SANITY_DATASET || "production",
  token: SANITY_API_TOKEN,
  apiVersion: NEXT_PUBLIC_SANITY_API_VERSION || "2025-01-15",
  useCdn: false,
});

async function deleteData(productType) {
  try {
    const deletedData = await client.delete({
      query: `*[_type == "${productType}"][0...999]`,
    });

    console.log(`🟢 Data of type "${productType}" deleted successfully!`);
    console.log("Deleted items:", deletedData);
  } catch (error) {
    console.error("🔴 Error Deleting Data:", error);
  }
}

// Prompt user to select which type to delete
async function promptDeletion() {
  const { typeToDelete } = await inquirer.prompt([
    {
      type: "list",
      name: "typeToDelete",
      message: "Select the data type you want to delete:",
      choices: ["product", "brand", "color", "fabric"],
    },
  ]);

  // Confirm before deletion
  const { confirmDelete } = await inquirer.prompt([
    {
      type: "confirm",
      name: "confirmDelete",
      message: `Are you sure you want to delete all "${typeToDelete}" items?`,
      default: false,
    },
  ]);

  if (confirmDelete) {
    await deleteData(typeToDelete);
  } else {
    console.log("❌ Deletion canceled.");
  }
}

promptDeletion();
