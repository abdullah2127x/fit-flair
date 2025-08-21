const { createClient } = require("@sanity/client");
const dotenv = require("dotenv");

dotenv.config();

const {
  NEXT_PUBLIC_SANITY_PROJECT_ID, // Sanity project ID
  NEXT_PUBLIC_SANITY_DATASET, // Sanity dataset (e.g., "production")
  SANITY_API_TOKEN, // Sanity API token
  NEXT_PUBLIC_SANITY_API_VERSION,
} = process.env;

// Check if the required environment variables are provided
if (!NEXT_PUBLIC_SANITY_PROJECT_ID || !SANITY_API_TOKEN) {
  console.error(
    "❌ Missing required environment variables. Please check your .env.local file."
  );
  process.exit(1); // Stop execution if variables are missing
}

const client = createClient({
  projectId: NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: NEXT_PUBLIC_SANITY_DATASET || "production",
  token: SANITY_API_TOKEN,
  apiVersion: NEXT_PUBLIC_SANITY_API_VERSION || "2025-01-15",
  useCdn: false,
});

// Function to delete a document by its ID
async function deleteData(id) {
  try {
    const deletedItem = await client.delete(id);
    console.log("✅ Deleted item:", deletedItem);
    console.log("Item deletion completed successfully!");
  } catch (error) {
    console.error("❌ Error deleting data:", error);
  }
}

// Replace with the ID of the document you want to delete
deleteData("S1Ttu9PjJQd6fUIn59A23W");
