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
  ],
});
