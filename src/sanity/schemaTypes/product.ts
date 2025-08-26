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

            // Check if another product already has the same title
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
      name: "audience",
      title: "Audience",
      type: "string",
      options: {
        list: [
          { title: "Man", value: "man" },
          { title: "Woman", value: "woman" },
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
          { title: "1 Piece (Shirt)", value: "1piece" },
          { title: "2 Piece (Shirt + Dupatta / Trouser)", value: "2piece" },
          { title: "3 Piece (Full Set)", value: "3piece" },
        ],
        layout: "radio",
        direction: "horizontal",
      },
      hidden: ({ parent }) => parent?.audience !== "woman", // only show if audience = women
      validation: (Rule) =>
        Rule.custom((field, context) => {
          const parent = (context as { parent?: { audience?: string } }).parent;
          if (parent?.audience === "woman" && !field) {
            return "Suit Type is required for women";
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
        Rule.custom((variants?: Array<{ color?: { _ref?: string } }>) => {
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
      name: "description",
      title: "Description",
      type: "array",
      of: [{ type: "block" }],
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "relevantKeywords",
      title: "Relevant Keywords",
      type: "array",
      of: [{ type: "string" }],
      options: {
        layout: "tags", // shows as tags instead of plain array
      },
      description:
        "Add relevant keywords that describe the product. Useful for search and SEO.",
    }),

    defineField({
      name: "isFeatured",
      title: "Featured Product",
      description: "Featured products show on the home page",
      type: "boolean",
      initialValue: false,
    }),

    defineField({
      name: "sku",
      title: "SKU",
      type: "string",
      description: "Unique product code",
      hidden: true, // prevent manual edits
      initialValue: () => uuidv4(), // auto-generate when a product is created
    }),
  ],
});
