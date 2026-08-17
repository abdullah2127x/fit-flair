# Sanity CMS Complete Setup Guide

## Overview
This guide contains the complete **MANUAL** setup documentation for Sanity CMS integration in a Next.js application. **All steps are explicit and manual - NO automated setup commands are used.** You will manually create each file and directory as specified. It includes manual file creation steps, file structure, configuration files, schemas, and scripts for importing and generating product data.

---

## 1. Manual Package Installation

### Description
Manually add required Sanity packages to your package.json dependencies. Do NOT use `sanity init` or any auto-setup commands. Create all files manually.

### Files

#### File: package.json (Dependencies Section)
**Location:** Root directory (`/package.json`)

**Step 1:** Open your `package.json` file

**Step 2:** Add these dependencies to the `dependencies` object:
```json
{
  "dependencies": {
    "sanity": "^4.5.0",
    "next-sanity": "^10.0.13",
    "@sanity/vision": "^4.5.0",
    "@sanity/image-url": "^1.1.0",
    "axios": "^1.11.0",
    "dotenv": "^17.2.1",
    "uuid": "^9.0.0",
    "inquirer": "^9.0.0"
  }
}
```

**Step 3:** Add this script to the `scripts` object:
```json
{
  "scripts": {
    "import-data": "node src/scripts/importData.mjs"
  }
}
```

**Step 4:** Run `npm install` to install the packages

**Explanation:**
- `sanity`: Core Sanity CMS package
- `next-sanity`: Official Next.js integration for Sanity
- `@sanity/vision`: GROQ query tool for Sanity Studio
- `@sanity/image-url`: Image URL builder for Sanity images
- `axios`: HTTP client for API requests
- `dotenv`: Environment variable management
- `uuid`: Generate unique IDs for document keys
- `inquirer`: Interactive CLI prompts for scripts

**Important:** Do NOT run `sanity init` or any automated setup. Create all configuration files manually as shown in this guide.

---

## 2. Environment Variables Setup

### Description
Manually create the `.env.local` file in the root directory with all required Sanity environment variables.

### Files

#### File: .env.local
**Location:** Root directory (`/.env.local`)

**Step 1:** Create a new file named `.env.local` in your project root directory

**Step 2:** Add the following content to the file:
```
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2025-08-20
SANITY_API_TOKEN=your_api_token_here
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000
```

**Step 3:** Replace the placeholder values with your actual Sanity project values

**Explanation:**
- `NEXT_PUBLIC_SANITY_PROJECT_ID`: Your Sanity project ID (found in Sanity dashboard)
- `NEXT_PUBLIC_SANITY_DATASET`: Dataset name (usually "production" or "development")
- `NEXT_PUBLIC_SANITY_API_VERSION`: API version date (format: YYYY-MM-DD)
- `SANITY_API_TOKEN`: API token with write permissions (from Sanity dashboard > API > Tokens)
- `NEXT_PUBLIC_API_BASE_URL`: Base URL for your Next.js application

**Where to get these values:**
1. **Project ID:** Go to https://sanity.io/manage → Select your project → Project Settings → Copy the Project ID
2. **Dataset:** Same location → Datasets tab → Usually "production" or "development"
3. **API Token:** Same location → API → Tokens → Create new token → Give it "Editor" permissions → Copy the token
4. **API Version:** Use current date in format `YYYY-MM-DD` (e.g., `2025-08-20`)
5. **API Base URL:** Your Next.js app URL (e.g., `http://localhost:3000` for development)

---

## 3. Sanity Configuration Files

### Description
Manually create the main Sanity configuration files in the root directory. These files configure Sanity Studio and CLI tools.

### Files

#### File: sanity.config.ts
**Location:** Root directory (`/sanity.config.ts`)

**Step 1:** Create a new file named `sanity.config.ts` in your project root directory

**Step 2:** Copy and paste the following code into the file:

```typescript
'use client'

/**
 * This configuration is used to for the Sanity Studio that's mounted on the `\src\app\studio\[[...tool]]\page.tsx` route
 */

import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import {apiVersion, dataset, projectId} from './src/sanity/env'
import {schema} from './src/sanity/schemaTypes'
import {structure} from './src/sanity/structure'

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  // Add and edit the content schema in the './sanity/schemaTypes' folder
  schema,
  plugins: [
    structureTool({structure}),
    // Vision is for querying with GROQ from inside the Studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({defaultApiVersion: apiVersion}),
  ],
})
```

**Explanation:**
- `basePath: '/studio'`: Sets the Studio URL path (accessible at `/studio`)
- `projectId`, `dataset`: Imported from env file
- `schema`: Imports all schema definitions from `src/sanity/schemaTypes`
- `structureTool`: Provides document structure in Studio sidebar
- `visionTool`: Enables GROQ query testing directly in Studio

---

#### File: sanity.cli.ts
**Location:** Root directory (`/sanity.cli.ts`)

**Step 1:** Create a new file named `sanity.cli.ts` in your project root directory

**Step 2:** Copy and paste the following code into the file:

```typescript
/**
* This configuration file lets you run `$ sanity [command]` in this folder
* Go to https://www.sanity.io/docs/cli to learn more.
**/
import { defineCliConfig } from 'sanity/cli'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET

export default defineCliConfig({ api: { projectId, dataset } })
```

**Explanation:**
- Configures Sanity CLI commands (like `sanity deploy`, `sanity dataset`)
- Reads project ID and dataset from environment variables
- Allows running Sanity CLI commands from project root

---

## 4. Environment Configuration

### Description
Manually create the environment configuration file that validates and exports environment variables.

### Files

#### File: src/sanity/env.ts
**Location:** `src/sanity/env.ts`

**Step 1:** Create the directory structure: `src/sanity/` (if it doesn't exist)

**Step 2:** Create a new file named `env.ts` inside `src/sanity/`

**Step 3:** Copy and paste the following code into the file:

```typescript
export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-08-20'

export const dataset = assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET,
  'Missing environment variable: NEXT_PUBLIC_SANITY_DATASET'
)

export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  'Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID'
)

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage)
  }

  return v
}
```

**Explanation:**
- `apiVersion`: API version with fallback default
- `dataset`: Validates dataset env variable exists
- `projectId`: Validates project ID env variable exists
- `assertValue`: Helper function that throws error if value is undefined
- This ensures the app fails fast with clear error messages if env vars are missing

---

## 5. Sanity Client Setup

### Description
Manually create client instances for reading and writing data to Sanity.

### Files

#### File: src/sanity/lib/client.ts
**Location:** `src/sanity/lib/client.ts`

**Step 1:** Create the directory structure: `src/sanity/lib/` (if it doesn't exist)

**Step 2:** Create a new file named `client.ts` inside `src/sanity/lib/`

**Step 3:** Copy and paste the following code into the file:

```typescript
import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Set to false if statically generating pages, using ISR or tag-based revalidation
})
```

**Explanation:**
- Creates read-only client for fetching data
- `useCdn: false`: Disables CDN for real-time data (required for ISR/SSG)
- Used throughout the app for querying Sanity data
- No token needed (read-only access)

---

#### File: src/sanity/lib/writeClient.ts
**Location:** `src/sanity/lib/writeClient.ts`

**Step 1:** Create a new file named `writeClient.ts` inside `src/sanity/lib/`

**Step 2:** Copy and paste the following code into the file:

```typescript
import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId } from '../env'

export const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

export default writeClient
```

**Explanation:**
- Creates write-enabled client for creating/updating/deleting documents
- `token`: Requires API token with write permissions
- Used in scripts and server-side operations that modify data
- `useCdn: false`: Ensures immediate consistency

---

#### File: src/sanity/lib/image.ts
**Location:** `src/sanity/lib/image.ts`

**Step 1:** Create a new file named `image.ts` inside `src/sanity/lib/`

**Step 2:** Copy and paste the following code into the file:

```typescript
import createImageUrlBuilder from '@sanity/image-url'
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

import { dataset, projectId } from '../env'

// https://www.sanity.io/docs/image-url
const builder = createImageUrlBuilder({ projectId, dataset })

export const urlFor = (source: SanityImageSource) => {
  return builder.image(source)
}
```

**Explanation:**
- Creates image URL builder for Sanity images
- `urlFor()`: Helper function to generate optimized image URLs
- Supports transformations (width, height, crop, etc.)
- Usage: `urlFor(image).width(800).url()`

---

#### File: src/sanity/lib/live.ts
**Location:** `src/sanity/lib/live.ts`

**Step 1:** Create a new file named `live.ts` inside `src/sanity/lib/`

**Step 2:** Copy and paste the following code into the file:

```typescript
// Querying with "sanityFetch" will keep content automatically updated
// Before using it, import and render "<SanityLive />" in your layout, see
// https://github.com/sanity-io/next-sanity#live-content-api for more information.
import { defineLive } from "next-sanity";
import { client } from './client'

export const { sanityFetch, SanityLive } = defineLive({ 
  client: client.withConfig({ 
    // Live content is currently only available on the experimental API
    // https://www.sanity.io/docs/api-versioning
    apiVersion: 'vX' 
  }) 
});
```

**Explanation:**
- Sets up live content updates (real-time preview)
- `sanityFetch`: Wrapper around client.fetch() that enables live updates
- `SanityLive`: React component to enable live updates (add to layout)
- Uses experimental API version 'vX' for live features
- Automatically updates content when changed in Sanity Studio

---

## 6. Studio Structure Configuration

### Description
Manually create the structure configuration file that defines the sidebar structure in Sanity Studio.

### Files

#### File: src/sanity/structure.ts
**Location:** `src/sanity/structure.ts`

**Step 1:** Create a new file named `structure.ts` inside `src/sanity/`

**Step 2:** Copy and paste the following code into the file:

```typescript
import type {StructureResolver} from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items(S.documentTypeListItems())
```

**Explanation:**
- Defines Studio sidebar structure
- `S.list()`: Creates a list view
- `.title('Content')`: Sets sidebar title
- `S.documentTypeListItems()`: Automatically lists all document types from schema
- Can be customized to create custom groupings, filters, or nested structures

---

## 7. Schema Types Index

### Description
Manually create the main schema registry file that exports all document types.

### Files

#### File: src/sanity/schemaTypes/index.ts
**Location:** `src/sanity/schemaTypes/index.ts`

**Step 1:** Create the directory structure: `src/sanity/schemaTypes/` (if it doesn't exist)

**Step 2:** Create a new file named `index.ts` inside `src/sanity/schemaTypes/`

**Step 3:** Copy and paste the following code into the file:

```typescript
import { type SchemaTypeDefinition } from "sanity";
import { fabric } from "./fabric";
import { product } from "./product";
import { color } from "./color";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [fabric, product, color],
};
```

**Explanation:**
- Central registry for all schema types
- Imports individual schema definitions
- Exports as `schema` object with `types` array
- Sanity Studio reads this to generate document types
- Add new schemas here to make them available in Studio

---

## 8. Main Schema: Product

### Description
Manually create the complete product schema file with all fields, validations, and conditional logic.

### Files

#### File: src/sanity/schemaTypes/product.ts
**Location:** `src/sanity/schemaTypes/product.ts`

**Step 1:** Create a new file named `product.ts` inside `src/sanity/schemaTypes/`

**Step 2:** Copy and paste the following code into the file:

```typescript
import { defineField, defineType } from "sanity";
import { v4 as uuidv4 } from "uuid";

export const product = defineType({
  name: "product",
  title: "Product",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Product Title",
      type: "string",
      validation: (Rule) =>
        Rule.required()
          .min(3)
          .max(100)
          .custom(async (value, context) => {
            if (!value) return true;

            const { document, getClient } = context as any;
            const client = getClient({ apiVersion: "2023-01-01" });

            // Fetch the existing product (published or draft)
            const currentDoc = await client.fetch(
              `*[_type == "product" && _id == $id][0]`,
              { id: document._id }
            );

            // If the title didn't change, skip uniqueness check
            if (currentDoc?.title === value) {
              return true;
            }

            // Otherwise check for duplicates
            const duplicate = await client.fetch(
              `*[_type == "product" && title == $title && _id != $id][0]`,
              { title: value, id: document._id }
            );

            return duplicate ? "This title is already taken" : true;
          }),
    }),

    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "subTitle",
      title: "Product Subtitle",
      type: "string",
      validation: (Rule) => Rule.required().min(3).max(60),
    }),

    defineField({
      name: "audience",
      title: "Audience",
      type: "string",
      options: {
        list: [
          { title: "Men", value: "men" },
          { title: "Women", value: "women" },
        ],
        layout: "radio",
        direction: "horizontal",
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Un Stitched", value: "unStitched" },
          { title: "Stitched", value: "stitched" },
          { title: "Ready To Wear", value: "readyToWear" },
        ],
        layout: "radio",
        direction: "horizontal",
      },
    }),

    defineField({
      name: "subCategory",
      title: "Sub Category",
      type: "string",
      options: {
        list: [
          { title: "Top", value: "top" },
          { title: "Bottom", value: "bottom" },
          { title: "2 Piece", value: "2piece" },
          { title: "3 Piece (Full Set)", value: "3piece" },
        ],
        layout: "radio",
        direction: "horizontal",
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "menOutfitType",
      title: "Men Outfit Type",
      type: "string",
      options: {
        layout: "radio",
        list: [
          { title: "Polo Shirt", value: "polo" },
          { title: "T-Shirt", value: "tshirt" },
          { title: "Formal Shirt", value: "shirt" },
          { title: "Kurta", value: "kurta" },
          { title: "Waistcoat", value: "waistcoat" },
          { title: "Formal Suit (2 Piece)", value: "2pieceSuit" },
          { title: "Formal Suit (3 Piece)", value: "3pieceSuit" },
          { title: "Sherwani", value: "sherwani" },
          { title: "Jeans", value: "jeans" },
          { title: "Trousers / Chinos", value: "trousers" },
          { title: "Shorts", value: "shorts" },
          { title: "Tracksuit / Gym Wear", value: "tracksuit" },
        ],
      },
      hidden: ({ parent }) => parent?.audience !== "men",
      validation: (Rule) =>
        Rule.custom((field, context) => {
          const parent = (context as { parent?: { audience?: string } }).parent;
          if (parent?.audience === "men" && !field) {
            return "Outfit type is required for men";
          }
          return true;
        }),
    }),

    defineField({
      name: "womenOutfitType",
      title: "Women Outfit Type",
      type: "string",
      options: {
        layout: "radio",
        list: [
          { title: "Kurti / Shirt", value: "kurti" },
          { title: "Polo Shirt", value: "polo" },
          { title: "T-Shirt", value: "tshirt" },
          { title: "Blouse / Tunic", value: "blouse" },
          { title: "Dress / Maxi", value: "dress" },
          { title: "Gown", value: "gown" },
          { title: "Saree", value: "saree" },
          { title: "Lehenga Choli", value: "lehenga" },
          { title: "Anarkali Suit", value: "anarkali" },
          { title: "2 Piece (Kurti + Trouser)", value: "2pieceSuit" },
          { title: "3 Piece (Kurti + Trouser + Dupatta)", value: "3pieceSuit" },
          { title: "Jeans / Trousers", value: "jeansTrousers" },
          { title: "Skirt", value: "skirt" },
          { title: "Leggings / Jeggings", value: "leggings" },
          { title: "Tracksuit / Gym Wear", value: "tracksuit" },
        ],
      },
      hidden: ({ parent }) => parent?.audience !== "women",
      validation: (Rule) =>
        Rule.custom((field, context) => {
          const parent = (context as { parent?: { audience?: string } }).parent;
          if (parent?.audience === "women" && !field) {
            return "Outfit type is required for women";
          }
          return true;
        }),
    }),

    defineField({
      name: "season",
      title: "Season",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "Summer", value: "summer" },
          { title: "Winter", value: "winter" },
        ],
        layout: "grid",
        direction: "horizontal",
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "designs",
      title: "Designs",
      type: "array",
      of: [{ type: "string" }],
      options: {
        layout: "grid",
        list: [
          { title: "Plain", value: "plain" },
          { title: "Printed", value: "printed" },
          { title: "Embroidered", value: "embroidered" },
          { title: "Block Print", value: "block_print" },
          { title: "Digital Print", value: "digital_print" },
          { title: "Geometric", value: "geometric" },
          { title: "Floral", value: "floral" },
          { title: "Abstract", value: "abstract" },
          { title: "Minimalist", value: "minimalist" },
        ],
      },
      validation: (Rule) => Rule.required().min(1),
    }),

    defineField({
      name: "occasions",
      title: "Occasions",
      type: "array",
      of: [{ type: "string" }],
      options: {
        layout: "grid",
        list: [
          { title: "Casual", value: "casual" },
          { title: "Formal", value: "formal" },
          { title: "Party / Festive", value: "party" },
          { title: "Wedding", value: "wedding" },
          { title: "Office / Workwear", value: "office" },
          { title: "Eid / Religious", value: "eid" },
        ],
      },
      validation: (Rule) => Rule.required().min(1),
    }),

    defineField({
      name: "fabric",
      title: "Fabric",
      type: "reference",
      to: [{ type: "fabric" }],
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "price",
      title: "Price",
      type: "number",
      validation: (Rule) => Rule.required().positive().precision(2),
    }),

    defineField({
      name: "variants",
      title: "Variants",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "color",
              title: "Color",
              type: "reference",
              to: [{ type: "color" }],
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "featuredImage",
              title: "Featured Image",
              type: "image",
              validation: (Rule) => Rule.required(),
              options: { hotspot: true },
            }),
            defineField({
              name: "additionalImages",
              title: "Additional Images",
              type: "array",
              of: [{ type: "image", options: { hotspot: true } }],
            }),
            defineField({
              name: "stock",
              title: "Stock",
              type: "number",
              validation: (Rule) =>
                Rule.required()
                  .min(0)
                  .error("Stock must be 0 or a positive number"),
            }),
          ],
        },
      ],
      validation: (Rule) =>
        Rule.min(1)
          .required()
          .error(
            "Image Error: At least 1 image is required, color should be different for each image"
          )
          .custom((variants?: Array<{ color?: { _ref?: string } }>) => {
            if (!variants) return true;

            const seen = new Set();
            for (const variant of variants) {
              const colorId = variant?.color?._ref;
              if (!colorId) continue;

              if (seen.has(colorId)) {
                return "You can't select the same color for multiple variants";
              }
              seen.add(colorId);
            }

            return true;
          }),
    }),

    defineField({
      name: "discount",
      title: "Discount (%)",
      type: "number",
      description: "Discount percentage applied to the product price",
      initialValue: 0,
      validation: (Rule) =>
        Rule.min(0).max(100).error("Discount must be between 0 and 100"),
    }),

    defineField({
      name: "description",
      title: "Description",
      type: "array",
      of: [{ type: "block" }],
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "relevantTags",
      title: "Relevant Tags",
      type: "array",
      of: [{ type: "string" }],
      options: {
        layout: "tags", // shows as tags instead of plain array
      },
      description:
        "Add relevant tags that describe the product. Useful for search and SEO.",
    }),

    defineField({
      name: "isFeatured",
      title: "Featured Product",
      description: "Featured products show on the home page",
      type: "boolean",
      initialValue: false,
    }),

    defineField({
      name: "isNewArrival",
      title: "New Arrival",
      description: "Newly launched products",
      type: "boolean",
      initialValue: false,
    }),

    defineField({
      name: "isPopular",
      type: "boolean",
      title: "Most Popular",
      initialValue: false,
    }),
  ],
});
```

**Explanation:**
- **Title Field**: Custom validation checks for duplicate titles using GROQ query
- **Slug Field**: Auto-generates from title, max 96 characters
- **Audience Field**: Radio buttons for Men/Women selection
- **Conditional Fields**: `menOutfitType` and `womenOutfitType` are hidden based on audience selection
- **Reference Fields**: `fabric` and `color` (in variants) reference other document types
- **Variants Array**: Contains color reference, featured image, additional images, and stock
- **Custom Validation**: Ensures no duplicate colors in variants array
- **Rich Text**: Description uses portable text (block content)
- **Tags Field**: Displays as tag chips in Studio
- **Boolean Flags**: Featured, new arrival, popular status flags

---

## 9. Reference Schema: Fabric

### Description
Manually create the fabric reference schema that is referenced by the product schema.

### Files

#### File: src/sanity/schemaTypes/fabric.ts
**Location:** `src/sanity/schemaTypes/fabric.ts`

**Step 1:** Create a new file named `fabric.ts` inside `src/sanity/schemaTypes/`

**Step 2:** Copy and paste the following code into the file:

```typescript
import { defineField, defineType } from "sanity";

export const fabric = defineType({
  name: "fabric",
  title: "Fabric",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Fabric/Material Name",
      type: "string",
      validation: (Rule) => Rule.required().min(2).max(30),
    }),
  ],
});
```

**Explanation:**
- Simple document type with single name field
- Used as reference in product schema (`fabric` field)
- Validation ensures name is 2-30 characters
- When referenced in product, shows as dropdown in Studio
- Can be extended with additional fields (description, image, etc.)

---

## 10. Reference Schema: Color

### Description
Manually create the color schema with name and hex code, referenced in product variants.

### Files

#### File: src/sanity/schemaTypes/color.ts
**Location:** `src/sanity/schemaTypes/color.ts`

**Step 1:** Create a new file named `color.ts` inside `src/sanity/schemaTypes/`

**Step 2:** Copy and paste the following code into the file:

```typescript
// ./schemas/color.ts
import { defineField, defineType } from "sanity";

export const color = defineType({
  name: "color",
  title: "Color",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Color Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "code",
      title: "Color Code",
      type: "string",
      description: "Hex code or CSS color (e.g. #FF0000, rgb(255,0,0))",
      validation: (Rule) =>
        Rule.required().regex(/^#([0-9A-Fa-f]{6})$/, {
          name: "hex color",
          invert: false,
        }),
    }),
  ],
});
```

**Explanation:**
- Two fields: name (e.g., "Red") and code (e.g., "#FF0000")
- Regex validation ensures hex code format (#RRGGBB)
- Referenced in product variants for color selection
- Used to display color swatches in frontend

---

## 11. Studio Page Route

### Description
Manually create the Next.js route that mounts Sanity Studio with authentication protection.

### Files

#### File: src/app/studio/[[...tool]]/page.tsx
**Location:** `src/app/studio/[[...tool]]/page.tsx`

**Step 1:** Create the directory structure: `src/app/studio/[[...tool]]/` (if it doesn't exist)
- Note: The folder name is literally `[[...tool]]` (with brackets)

**Step 2:** Create a new file named `page.tsx` inside `src/app/studio/[[...tool]]/`

**Step 3:** Copy and paste the following code into the file:

```typescript
/**
 * This route is responsible for the built-in authoring environment using Sanity Studio.
 * All routes under your studio path are handled by this file.
 */

import { NextStudio } from "next-sanity/studio";
import config from "../../../../sanity.config";
import { isAdminClerkId } from "@/lib/utils";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const dynamic = "force-dynamic";
export { metadata, viewport } from "next-sanity/studio";

export default async function StudioPage() {
  const { userId } = await auth();

  // If not logged in, just redirect to shop
  if (!userId) {
    return redirect("/shop");
  }

  // If the user is not admin, show "Start Shopping" page
  if (!isAdminClerkId(userId)) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-secondary via-white to-primary text-primary-foreground px-6">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 animate-pulse">
          Access Denied 🚫
        </h1>
        <p className="text-secondary-foreground max-w-md text-center mb-8">
          You can&apos;`t access the admin studio — but don&apos;`t worry!
          <br />
          Let&apos;`s get back to what matters most. 🛍️
        </p>
        <Button variant="secondary" size={"lg"} asChild>
          <Link href="/shop">Start Shopping</Link>
        </Button>
      </div>
    );
  }

  // If admin, show Sanity Studio
  return <NextStudio config={config} />;
}
```

**Explanation:**
- Catch-all route `[[...tool]]` handles all `/studio/*` paths
- Uses Clerk authentication to check if user is admin
- `NextStudio`: React component that renders Sanity Studio
- Imports config from root `sanity.config.ts`
- Non-admin users see access denied page
- Admin users see full Sanity Studio interface
- `force-dynamic`: Ensures server-side auth check on each request

---

## 12. Import Data Script

### Description
Manually create the script to import products, fabrics, and colors from JSON files or API into Sanity.

### Files

#### File: src/scripts/importData.mjs
**Location:** `src/scripts/importData.mjs`

**Step 1:** Create the directory structure: `src/scripts/` (if it doesn't exist)

**Step 2:** Create a new file named `importData.mjs` inside `src/scripts/`

**Step 3:** Copy and paste the following code into the file:

```javascript
import { createClient } from "@sanity/client";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import inquirer from "inquirer";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
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
const uploadedImages = {}; // { imageUrl: assetId }

async function uploadImageToSanity(imagePathOrUrl) {
  try {
    if (uploadedImages[imagePathOrUrl]) {
      console.log(`🔁 Already uploaded: ${imagePathOrUrl}`);
      return uploadedImages[imagePathOrUrl];
    }

    let buffer;
    let filename;

    if (imagePathOrUrl.startsWith("http")) {
      // 🌍 Remote URL
      console.log(`🌍 Fetching remote image: ${imagePathOrUrl}`);
      const response = await axios.get(imagePathOrUrl, {
        responseType: "arraybuffer",
      });
      buffer = Buffer.from(response.data);
      filename = imagePathOrUrl.split("/").pop();
    } else {
      // 📂 Local file (inside /public folder)
      console.log(`📂 Reading local image: ${imagePathOrUrl}`);
      const localPath = path.join(process.cwd(), "public", imagePathOrUrl);
      buffer = fs.readFileSync(localPath);
      filename = path.basename(localPath);
    }

    console.log(`⬆️ Uploading image to Sanity: ${filename}...`);
    const asset = await client.assets.upload("image", buffer, { filename });

    uploadedImages[imagePathOrUrl] = asset._id;

    console.log(`✅ Successfully uploaded: ${filename}`);
    console.log(`🆔 Sanity Asset ID: ${asset._id}`);

    return asset._id;
  } catch (error) {
    console.error("❌ Failed to upload:", imagePathOrUrl, error.message);
    return null;
  }
}

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
      subTitle: item.subTitle || "Not set the subTitle yet",
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
      isNewArrival: item.isNewArrival || false,
      isPopular: item.isPopular || false,
      discount: item.discount || 0,
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
      break;
    case "product":
      await importProducts();
      break;
    default:
      console.log("❌ Invalid type selected");
  }
};

run();
```

**Explanation:**
- **Environment Setup**: Loads env vars from `.env.local`
- **Image Upload**: `uploadImageToSanity()` handles both local files (`/public/...`) and remote URLs
- **Image Caching**: `uploadedImages` object prevents duplicate uploads
- **Reference Fetching**: `fetchReference()` finds existing documents by name and returns reference object
- **Data Fetching**: `fetchData()` calls API endpoint to get JSON data
- **Import Functions**: Separate functions for colors, fabrics, and products
- **Variant Processing**: Converts image paths to Sanity image references, creates color references
- **Portable Text**: Converts plain text description to Sanity block format
- **Interactive CLI**: Uses `inquirer` to prompt user for data type selection
- **Error Handling**: Checks for existing documents, handles upload failures gracefully

**Usage:**
```bash
npm run import-data
# Then select: fabric, color, or product
```

---

## 13. API Route for Import Data

### Description
Manually create the Next.js API route that serves JSON data files for the import script.

### Files

#### File: src/app/api/importData/route.ts
**Location:** `src/app/api/importData/route.ts`

**Step 1:** Create the directory structure: `src/app/api/importData/` (if it doesn't exist)

**Step 2:** Create a new file named `route.ts` inside `src/app/api/importData/`

**Step 3:** Copy and paste the following code into the file:

```typescript
import { NextRequest, NextResponse } from "next/server";
import fabrics from "@/data/forSanity/fabrics.json";
import colors from "@/data/forSanity/colors.json";
import products from "@/data/forSanity/products.json";

type DataType = "brand" | "fabric" | "color" | "product";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const typeParam = body.type;

    if (!typeParam) {
      return NextResponse.json(
        { error: "Type field is required in the request body" },
        { status: 400 }
      );
    }

    const type = typeParam.toLowerCase() as DataType;

    let data;

    switch (type) {
      case "fabric":
        data = fabrics;
        break;
      case "color":
        data = colors;
        break;
      case "product":
        data = products;
        break;
      default:
        return NextResponse.json(
          { error: `Invalid type: ${typeParam}` },
          { status: 400 }
        );
    }

    return NextResponse.json(data);
  } catch (err: any) {
    return NextResponse.json(
      { error: "Failed to process request", details: err.message },
      { status: 500 }
    );
  }
}
```

**Explanation:**
- POST endpoint that accepts `{ type: "fabric" | "color" | "product" }`
- Imports JSON files from `src/data/forSanity/` directory
- Returns corresponding JSON data based on type
- Used by `importData.mjs` script to fetch data
- Error handling for missing type or invalid requests

**Required JSON Files:**
- `src/data/forSanity/fabrics.json` - Array of fabric name strings
- `src/data/forSanity/colors.json` - Array of `{ name: string, code: string }` objects
- `src/data/forSanity/products.json` - Array of product objects matching schema

---

## 14. Generate Products JSON Script

### Description
Manually create the script to generate sample product JSON files for testing and importing into Sanity.

### Files

#### File: src/lib/genProdocts.js
**Location:** `src/lib/genProdocts.js`

**Step 1:** Create the directory structure: `src/lib/` (if it doesn't exist)

**Step 2:** Create a new file named `genProdocts.js` inside `src/lib/`

**Step 3:** Copy and paste the following code into the file:

```javascript
// generate-products.js
// Node.js script to generate 1000 product objects matching the provided Sanity schema shape.
// Usage: node generate-products.js
// Output: ./products.json

const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const OUT_FILE = path.join(process.cwd(), "src/data/forSanity/products.json");
const COUNT = 1000;

// Try to load fabric.json and colors.json if present, otherwise use built-in lists
function tryLoadJson(filename, fallback) {
  const p = path.join(__dirname, filename);
  try {
    if (fs.existsSync(p)) {
      const raw = fs.readFileSync(p, "utf8");
      return JSON.parse(raw);
    }
  } catch (err) {
    // ignore and fallback
  }
  return fallback;
}

const fabricsFallback = [
  "Chiffon", "Cotton", "Silk", "Linen", "Wool", "Polyester",
  "Velvet", "Satin", "Georgette", "Denim", "Organza", "Tulle",
  "Crepe", "Jersey", "Rayon", "Nylon", "Leather", "Fleece",
  "Chambray", "Poplin",
];

const colorsFallback = [
  { name: "Red", code: "#FF0000" },
  { name: "Blue", code: "#0000FF" },
  { name: "Green", code: "#008000" },
  { name: "Yellow", code: "#FFFF00" },
  { name: "Black", code: "#000000" },
  { name: "White", code: "#FFFFFF" },
  { name: "Pink", code: "#FFC0CB" },
  { name: "Purple", code: "#800080" },
  { name: "Orange", code: "#FFA500" },
  { name: "Brown", code: "#A52A2A" },
  { name: "Grey", code: "#808080" },
  { name: "Beige", code: "#F5F5DC" },
  { name: "Maroon", code: "#800000" },
  { name: "Turquoise", code: "#40E0D0" },
  { name: "Navy Blue", code: "#000080" },
  { name: "Olive", code: "#808000" },
  { name: "Teal", code: "#008080" },
  { name: "Lavender", code: "#E6E6FA" },
  { name: "Gold", code: "#FFD700" },
  { name: "Silver", code: "#C0C0C0" },
];

const fabrics = tryLoadJson(
  path.join(__dirname, "src/data/forSanity/fabrics.json"),
  fabricsFallback
);

const colorsJson = tryLoadJson(
  path.join(__dirname, "src/data/forSanity/colors.json"),
  colorsFallback
);

// We'll use color names for variant.color (like your examples)
const colorNames = Array.isArray(colorsJson)
  ? colorsJson.map((c) => (typeof c === "string" ? c : c.name))
  : colorsFallback.map((c) => c.name);

// Image pools separated by audience
const imagePoolCommon = [
  "/images/categories/bottom.webp",
  "/images/categories/full.webp",
  "/images/categories/readyToWear.webp",
  "/images/categories/top.webp",
  "/images/categories/unStitched.webp",
  "/images/fabrics/Chambray.webp",
  "/images/fabrics/Chiffon.webp",
  // ... more fabric images
];

const imagePoolMen = [
  "/images/men/formal-shirt.jpg",
  "/images/men/formal-suit.jpg",
  "/images/men/hodie.jpg",
  "/images/men/jeans.jpg",
  "/images/men/kurta.jpg",
  "/images/men/polo.jpg",
  "/images/men/sherwani.jpg",
  "/images/men/t-shirt.jpg",
  "/images/men/tracksuit.jpg",
  "/images/men/trouser.jpg",
];

const imagePoolWomen = [
  "/images/women/2-piece-suit.jpg",
  "/images/women/3-piece-suit.jpg",
  "/images/women/anarkali.jpg",
  "/images/women/dress.jpg",
  "/images/women/gown.jpg",
  "/images/women/jeans-trousers.jpg",
  "/images/women/kurti.jpg",
  "/images/women/lehenga.jpg",
  "/images/women/polo.jpg",
  "/images/women/skirt.jpg",
  "/images/women/t-shirt.jpg",
  "/images/women/tracksuit.jpg",
];

// Utility functions
function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function randPick(arr) {
  return arr[randInt(0, arr.length - 1)];
}
function randPickMany(arr, min = 1, max = Math.min(3, arr.length)) {
  const n = randInt(min, max);
  const out = new Set();
  while (out.size < n) out.add(arr[randInt(0, arr.length - 1)]);
  return Array.from(out);
}
function slugify(s) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// Schema-like option sets
const audiences = ["men", "women"];
const categories = ["unStitched", "stitched", "readyToWear"];
const subCategories = ["top", "bottom", "2piece", "3piece"];
const menOutfitTypes = [
  "polo", "tshirt", "shirt", "kurta", "waistcoat",
  "2pieceSuit", "3pieceSuit", "sherwani", "jeans",
  "trousers", "shorts", "tracksuit", "jogger", "hoodie", "blazer",
];
const womenOutfitTypes = [
  "kurti", "polo", "tshirt", "blouse", "dress", "gown",
  "saree", "lehenga", "anarkali", "2pieceSuit", "3pieceSuit",
  "jeansTrousers", "skirt", "leggings", "tracksuit",
];
const seasonsList = ["summer", "winter"];
const designsList = [
  "plain", "printed", "embroidered", "block_print",
  "digital_print", "geometric", "floral", "abstract", "minimalist", "striped",
];
const occasionsList = [
  "casual", "formal", "party", "wedding", "office", "eid", "gym",
];

// Helper to generate a title that looks varied
const titleAdjs = [
  "Classic", "Modern", "Elegant", "Casual", "Premium", "Urban",
  "Comfort", "Essential", "Sport", "Formal", "Festive", "Smart",
  "Cozy", "Chic", "Vintage",
];
const productNounsMen = [
  "Shirt", "Polo", "T-Shirt", "Kurta", "Suit", "Sherwani",
  "Jeans", "Tracksuit", "Hoodie", "Blazer", "Waistcoat", "Jogger", "Pants", "Jumpsuit",
];
const productNounsWomen = [
  "Kurti", "Dress", "Gown", "Saree", "Lehenga", "Anarkali",
  "Top", "Blouse", "Skirt", "Jeans", "Trousers", "Leggings", "Maxi", "Tunic",
];

function makeTitle(i, audience) {
  const adj = randPick(titleAdjs);
  const noun =
    audience === "men"
      ? randPick(productNounsMen)
      : randPick(productNounsWomen);
  // ensure uniqueness by index
  return `${adj} ${noun} ${i}`;
}

function makeVariantPool(productIndex, audience) {
  const numVariants = randInt(1, 4);
  const colorChoices = [...colorNames].sort(() => Math.random() - 0.5);
  const chosen = colorChoices.slice(0, numVariants);

  // Choose correct image pool
  const genderPool =
    audience === "men"
      ? [...imagePoolMen, ...imagePoolCommon]
      : [...imagePoolWomen, ...imagePoolCommon];

  return chosen.map((color) => {
    const featured = randPick(genderPool);
    const addCount = randInt(0, 3);
    const additional = Array.from({ length: addCount }, () =>
      randPick(genderPool)
    );
    return {
      color,
      featuredImage: featured,
      additionalImages: additional,
      stock: randInt(0, 100),
    };
  });
}

function makeProduct(i) {
  const audience = randPick(audiences);
  const title = makeTitle(i, audience);
  const subTitle = `${title} is the sub title of this product`;
  const slug = slugify(title) + "-" + i;
  const price = +(Math.random() * (15990 - 1200) + 1200).toFixed(2);
  const category = randPick(categories);
  const subCategory = randPick(subCategories);
  const menOutfitType =
    audience === "men" ? randPick(menOutfitTypes) : undefined;
  const womenOutfitType =
    audience === "women" ? randPick(womenOutfitTypes) : undefined;
  const season = randPickMany(seasonsList, 1, 2);
  const designs = randPickMany(designsList, 1, 2);
  const occasions = randPickMany(occasionsList, 1, 2);
  const fabric = randPick(fabrics);
  const discount = randInt(0, 50);
  const variants = makeVariantPool(i, audience);
  const description = `${title} — Comfortable, stylish and made from ${fabric}. Perfect for ${occasions.join(", ")}.`;
  const relevantTags = [
    title.split(" ")[1] || "Apparel",
    ...designs.slice(0, 1),
    ...occasions.slice(0, 1),
  ].map((t) => String(t));
  const isFeatured = Math.random() < 0.12; // ~12% featured
  const isNewArrival = Math.random() < 0.18;
  const isPopular = Math.random() < 0.2;

  const product = {
    _id: crypto.randomUUID
      ? crypto.randomUUID()
      : crypto.randomBytes(16).toString("hex"),
    title,
    subTitle,
    slug,
    price,
    audience,
    category,
    subCategory,
    ...(menOutfitType ? { menOutfitType } : {}),
    ...(womenOutfitType ? { womenOutfitType } : {}),
    season,
    designs,
    occasions,
    fabric,
    discount,
    isNewArrival,
    variants,
    description,
    relevantTags,
    isFeatured,
    isPopular,
  };

  return product;
}

console.log(`Generating ${COUNT} products...`);
const out = [];
for (let i = 1; i <= COUNT; i++) {
  out.push(makeProduct(i));
  if (i % 100 === 0) process.stdout.write(` ${i}`);
}
console.log("\nWriting to", OUT_FILE);
fs.writeFileSync(OUT_FILE, JSON.stringify(out, null, 2), "utf8");
console.log("Done. File created:", OUT_FILE);
```

**Explanation:**
- **Configuration**: `COUNT` sets number of products to generate (default: 1000)
- **Data Loading**: Tries to load `fabrics.json` and `colors.json`, falls back to hardcoded lists
- **Image Pools**: Separate image arrays for men, women, and common images
- **Random Utilities**: Helper functions for random selection and slug generation
- **Product Generation**: `makeProduct()` creates a single product with all required fields
- **Variant Generation**: `makeVariantPool()` creates 1-4 variants with different colors and images
- **Field Logic**: Conditionally includes `menOutfitType` or `womenOutfitType` based on audience
- **Probability Flags**: Randomly sets `isFeatured`, `isNewArrival`, `isPopular` with different probabilities
- **Output**: Writes JSON array to `src/data/forSanity/products.json`

**Usage:**
```bash
node src/lib/genProdocts.js
```

**Output:**
- Creates `src/data/forSanity/products.json` with array of product objects
- Each product matches the Sanity schema structure
- Ready to be imported using `importData.mjs` script

---

## 15. File Structure Summary

### Description
Complete directory structure for Sanity setup.

### Files

```
fit-flair/
├── sanity.config.ts                    # Main Sanity Studio config
├── sanity.cli.ts                       # Sanity CLI config
├── .env.local                          # Environment variables
├── package.json                        # Dependencies and scripts
│
├── src/
│   ├── app/
│   │   ├── studio/
│   │   │   └── [[...tool]]/
│   │   │       └── page.tsx            # Studio route with auth
│   │   └── api/
│   │       └── importData/
│   │           └── route.ts            # API endpoint for JSON data
│   │
│   ├── sanity/
│   │   ├── env.ts                      # Environment variable validation
│   │   ├── structure.ts                # Studio sidebar structure
│   │   │
│   │   ├── lib/
│   │   │   ├── client.ts               # Read-only Sanity client
│   │   │   ├── writeClient.ts          # Write-enabled Sanity client
│   │   │   ├── image.ts                # Image URL builder
│   │   │   └── live.ts                 # Live content updates
│   │   │
│   │   └── schemaTypes/
│   │       ├── index.ts                # Schema registry
│   │       ├── product.ts              # Main product schema
│   │       ├── fabric.ts               # Fabric reference schema
│   │       ├── color.ts                # Color reference schema
│   │       └── brand.ts                # Brand schema (optional)
│   │
│   ├── scripts/
│   │   └── importData.mjs              # Import script for Sanity
│   │
│   ├── lib/
│   │   └── genProdocts.js              # Generate products JSON
│   │
│   └── data/
│       └── forSanity/
│           ├── fabrics.json            # Fabric names array
│           ├── colors.json             # Color objects array
│           └── products.json           # Products array (generated)
```

**Explanation:**
- **Root Level**: Configuration files (`sanity.config.ts`, `sanity.cli.ts`)
- **src/app/studio**: Next.js route for Sanity Studio
- **src/app/api**: API routes for data serving
- **src/sanity**: All Sanity-related code
  - `env.ts`: Centralized env vars
  - `lib/`: Client instances and utilities
  - `schemaTypes/`: Document type definitions
- **src/scripts**: Import/export scripts
- **src/data/forSanity**: JSON data files for import

---

## 16. Quick Start Checklist

### Description
Step-by-step manual checklist to set up Sanity from scratch. Follow each step explicitly - do NOT use any automated setup commands.

### Files

#### Manual Setup Steps:

1. **Install Dependencies Manually**
   - Open `package.json`
   - Add dependencies to `dependencies` object (see section 1)
   - Add script to `scripts` object
   - Run `npm install` (this only installs packages, doesn't create files)

2. **Create Sanity Project (Online)**
   - Go to https://sanity.io/manage
   - Click "Create new project"
   - Fill in project name and organization
   - Note your Project ID and Dataset name from project settings

3. **Create Environment Variables File**
   - Create `.env.local` file in root directory
   - Add all required variables (see section 2)
   - Replace placeholder values with your actual Sanity project values

4. **Create Configuration Files (Root Directory)**
   - Create `sanity.config.ts` in root (see section 3)
   - Create `sanity.cli.ts` in root (see section 3)

5. **Create Sanity Directory Structure**
   - Create `src/sanity/` directory
   - Create `src/sanity/lib/` directory
   - Create `src/sanity/schemaTypes/` directory

6. **Create Environment Config File**
   - Create `src/sanity/env.ts` (see section 4)

7. **Create Client Files**
   - Create `src/sanity/lib/client.ts` (see section 5)
   - Create `src/sanity/lib/writeClient.ts` (see section 5)
   - Create `src/sanity/lib/image.ts` (see section 5)
   - Create `src/sanity/lib/live.ts` (see section 5)

8. **Create Structure Config**
   - Create `src/sanity/structure.ts` (see section 6)

9. **Create Schema Files**
   - Create `src/sanity/schemaTypes/index.ts` (see section 7)
   - Create `src/sanity/schemaTypes/fabric.ts` (see section 9)
   - Create `src/sanity/schemaTypes/color.ts` (see section 10)
   - Create `src/sanity/schemaTypes/product.ts` (see section 8)

10. **Create Studio Route**
    - Create `src/app/studio/` directory
    - Create `src/app/studio/[[...tool]]/` directory (folder name with brackets)
    - Create `src/app/studio/[[...tool]]/page.tsx` (see section 11)

11. **Create API Route**
    - Create `src/app/api/importData/` directory
    - Create `src/app/api/importData/route.ts` (see section 13)

12. **Create Import Script**
    - Create `src/scripts/` directory
    - Create `src/scripts/importData.mjs` (see section 12)

13. **Create JSON Generator (Optional)**
    - Create `src/lib/` directory (if doesn't exist)
    - Create `src/lib/genProdocts.js` (see section 14)

14. **Prepare Data Files**
    - Create `src/data/forSanity/` directory
    - Create `src/data/forSanity/fabrics.json` (array of fabric name strings)
    - Create `src/data/forSanity/colors.json` (array of `{name, code}` objects)
    - Create `src/data/forSanity/products.json` (or generate using script from section 14)

15. **Test Setup**
    - Run `npm run dev`
    - Visit `http://localhost:3000/studio`
    - Should see Sanity Studio interface (if authenticated)

16. **Import Data**
    - Run `npm run import-data`
    - Select data type (fabric, color, or product)
    - Verify data appears in Sanity Studio

**Important Notes:**
- Do NOT run `sanity init` or any automated Sanity setup commands
- Create all files manually as shown in each section
- Copy exact code from each section into the corresponding file
- Ensure directory structure matches exactly

---

## 17. Common Commands

### Description
Useful commands for working with Sanity.

### Files

#### Commands:

```bash
# Development
npm run dev                    # Start Next.js dev server
# Visit http://localhost:3000/studio for Sanity Studio

# Import Data
npm run import-data            # Run import script (interactive)

# Generate Products JSON
node src/lib/genProdocts.js    # Generate products.json file

# Sanity CLI (if installed globally)
sanity deploy                  # Deploy Studio to sanity.io
sanity dataset list            # List datasets
sanity documents query "*[_type == 'product']"  # Query documents
```

**Explanation:**
- `npm run dev`: Starts development server with Studio at `/studio`
- `npm run import-data`: Interactive script to import fabrics, colors, or products
- `node src/lib/genProdocts.js`: Generates sample products JSON file
- Sanity CLI commands require global installation: `npm install -g @sanity/cli`

---

## End of Guide

This guide contains all necessary information to set up, configure, and use Sanity CMS in your Next.js application. All file locations, code, and explanations are provided for easy reference.

