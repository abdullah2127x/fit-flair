import { bottomTags, fullTags, topTags, unStitchedTags } from "@/data/tags";
import { defineField, defineType } from "sanity";
import { v4 as uuidv4 } from "uuid";

export const productFields = [
  // Unstitched tags
  defineField({
    name: "unstitchedTags",
    title: "Unstitched Tags",
    type: "array",
    of: [{ type: "string" }],
    options: {
      layout: "grid",
      list: unStitchedTags.map((tag) => ({ title: tag, value: tag })),
    },
    hidden: ({ parent }) => parent?.category !== "unStitched",
  }),

  // Ready-to-Wear → Top
  defineField({
    name: "topTags",
    title: "Top Tags",
    type: "array",
    of: [{ type: "string" }],
    options: {
      layout: "grid",
      list: topTags.map((tag) => ({ title: tag, value: tag })),
    },
    hidden: ({ parent }) =>
      parent?.category !== "readyToWear" || parent?.subCategory !== "top",
  }),

  // Ready-to-Wear → Bottom
  defineField({
    name: "bottomTags",
    title: "Bottom Tags",
    type: "array",
    of: [{ type: "string" }],
    options: {
      layout: "grid",
      list: bottomTags.map((tag) => ({ title: tag, value: tag })),
    },
    hidden: ({ parent }) =>
      parent?.category !== "readyToWear" || parent?.subCategory !== "bottom",
  }),

  // Ready-to-Wear → Full
  defineField({
    name: "fullTags",
    title: "Full Outfit Tags",
    type: "array",
    of: [{ type: "string" }],
    options: {
      layout: "grid",
      list: fullTags.map((tag) => ({ title: tag, value: tag })),
    },
    hidden: ({ parent }) =>
      parent?.category !== "readyToWear" || parent?.subCategory !== "full",
  }),
];

export const product = defineType({
  name: "product",
  title: "Product",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Product Title",
      type: "string",
      validation: (Rule) => Rule.required().min(3).max(100),
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
      name: "brand",
      title: "Brand",
      type: "reference",
      to: [{ type: "brand" }],
      validation: (Rule) => Rule.required(),
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
          { title: "Ready to Wear", value: "readyToWear" },
        ],
        layout: "radio",
        direction: "horizontal",
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "subCategory",
      title: "Sub-Category",
      type: "string",
      options: {
        list: [
          { title: "Top", value: "top" },
          { title: "Bottom", value: "bottom" },
          { title: "Full", value: "full" },
        ],
        layout: "radio",
        direction: "horizontal",
      },
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.parent as { category?: string } | undefined;

          if (parent?.category === "readyToWear" && !value) {
            return "Sub-Category is required when Category is Ready To Wear.";
          }
          return true;
        }),

      hidden: ({ parent }) => parent?.category !== "readyToWear",
    }),

    ...productFields,

    defineField({
      name: "sizes",
      title: "Sizes",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: ["XS", "S", "M", "L", "XL", "XXL"],
        layout: "grid",
      },
      hidden: ({ parent }) => parent?.category !== "readyToWear",
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
      name: "featuredImage",
      title: "Featured Image",
      type: "image",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "additionalImages",
      title: "Additional Images",
      type: "array",
      of: [{ type: "image" }],
    }),

    // defineField({
    //   name: "stock",
    //   title: "Stock",
    //   type: "array",
    //   description:
    //     "Add stock per size (for Ready to Wear) or one entry for Unstitched",
    //   of: [
    //     {
    //       type: "object",
    //       fields: [
    //         {
    //           name: "size",
    //           title: "Size",
    //           type: "string",
    //           options: {
    //             list: [
    //               "Free Size (Unstitched)",
    //               "XS",
    //               "S",
    //               "M",
    //               "L",
    //               "XL",
    //               "XXL",
    //             ],
    //           },
    //         },
    //         {
    //           name: "quantity",
    //           title: "Quantity",
    //           type: "number",
    //           validation: (Rule) => Rule.min(0),
    //         },
    //       ],
    //     },
    //   ],
    // }),

    defineField({
      name: "color",
      title: "Color",
      type: "reference",
      to: [{ type: "color" }],
    }),

    defineField({
      name: "description",
      title: "Description",
      type: "array",
      of: [{ type: "block" }],
      validation: (Rule) => Rule.required(),
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
