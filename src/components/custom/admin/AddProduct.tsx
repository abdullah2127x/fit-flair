import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";

type ProductForm = {
  title: string;
  subTitle: string;
  audience: "men" | "women";
  category?: string;
  subCategory: string;
  price: number;
  fabric: string; // ref id
  season: string[];
  designs: string[];
  occasions: string[];
  description: any[]; // portable text blocks
};

const AddProduct = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ProductForm>({
    defaultValues: { audience: "men", season: [], designs: [], occasions: [] },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add Product</CardTitle>
      </CardHeader>
      <CardContent>
        <form
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="Product title"
              {...register("title", {
                required: "Title is required",
                minLength: { value: 3, message: "At least 3 chars" },
              })}
            />
            {errors.title && (
              <p className="text-xs text-destructive mt-1">
                {errors.title.message}
              </p>
            )}
          </div>
          <div>
            <Label htmlFor="subTitle">Subtitle</Label>
            <Input
              id="subTitle"
              placeholder="Short subtitle"
              {...register("subTitle", { required: "Subtitle is required" })}
            />
            {errors.subTitle && (
              <p className="text-xs text-destructive mt-1">
                {errors.subTitle.message}
              </p>
            )}
          </div>
          <div>
            <Label>Audience</Label>
            <select
              className="w-full border rounded h-10 px-3 bg-background"
              {...register("audience", { required: "Audience is required" })}
            >
              <option value="men">Men</option>
              <option value="women">Women</option>
            </select>
            {errors.audience && (
              <p className="text-xs text-destructive mt-1">
                {errors.audience.message}
              </p>
            )}
          </div>
          <div>
            <Label>Sub Category</Label>
            <select
              className="w-full border rounded h-10 px-3 bg-background"
              {...register("subCategory", {
                required: "Sub category is required",
              })}
            >
              <option value="top">Top</option>
              <option value="bottom">Bottom</option>
              <option value="2piece">2 Piece</option>
              <option value="3piece">3 Piece</option>
            </select>
            {errors.subCategory && (
              <p className="text-xs text-destructive mt-1">
                {errors.subCategory.message}
              </p>
            )}
          </div>
          <div>
            <Label htmlFor="price">Price</Label>
            <Input
              id="price"
              type="number"
              step="0.01"
              placeholder="0.00"
              {...register("price", {
                required: "Price is required",
                valueAsNumber: true,
                min: { value: 0, message: "Price must be ≥ 0" },
              })}
            />
            {errors.price && (
              <p className="text-xs text-destructive mt-1">
                {errors.price.message}
              </p>
            )}
          </div>
          <div>
            <Label htmlFor="fabric">Fabric (Sanity ref id)</Label>
            <Input
              id="fabric"
              placeholder="fabric _id"
              {...register("fabric", { required: "Fabric is required" })}
            />
            {errors.fabric && (
              <p className="text-xs text-destructive mt-1">
                {errors.fabric.message}
              </p>
            )}
          </div>
          <div className="md:col-span-2">
            <Label htmlFor="season">Season (comma separated)</Label>
            <Input
              id="season"
              placeholder="summer,winter"
              {...register("season", {
                required: "Season is required",
                setValueAs: (v) =>
                  String(v || "")
                    .split(",")
                    .map((s: string) => s.trim())
                    .filter(Boolean),
              })}
            />
            {errors.season && (
              <p className="text-xs text-destructive mt-1">
                {errors.season.message}
              </p>
            )}
          </div>
          <div className="md:col-span-2">
            <Label htmlFor="designs">Designs (comma separated)</Label>
            <Input
              id="designs"
              placeholder="plain,printed"
              {...register("designs", {
                required: "Designs are required",
                setValueAs: (v) =>
                  String(v || "")
                    .split(",")
                    .map((s: string) => s.trim())
                    .filter(Boolean),
              })}
            />
            {errors.designs && (
              <p className="text-xs text-destructive mt-1">
                {errors.designs.message}
              </p>
            )}
          </div>
          <div className="md:col-span-2">
            <Label htmlFor="occasions">Occasions (comma separated)</Label>
            <Input
              id="occasions"
              placeholder="casual,formal"
              {...register("occasions", {
                required: "Occasions are required",
                setValueAs: (v) =>
                  String(v || "")
                    .split(",")
                    .map((s: string) => s.trim())
                    .filter(Boolean),
              })}
            />
            {errors.occasions && (
              <p className="text-xs text-destructive mt-1">
                {errors.occasions.message}
              </p>
            )}
          </div>
          {submitError && (
            <p className="text-sm text-destructive md:col-span-2">
              {submitError}
            </p>
          )}
          {submitSuccess && (
            <p className="text-sm text-green-600 md:col-span-2">
              {submitSuccess}
            </p>
          )}
          <div className="md:col-span-2 flex gap-3">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Creating..." : "Create product"}
            </Button>
            <Button type="button" variant="outline" onClick={() => reset()}>
              Reset
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddProduct;
