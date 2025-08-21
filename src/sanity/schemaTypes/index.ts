import { type SchemaTypeDefinition } from "sanity";
import { fabric } from "./fabric";
import { product } from "./product";
import { brand } from "./brand";
import { color } from "./color";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [fabric, product, brand, color],
};
