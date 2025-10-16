{
  /*<Card>
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
                    {...register("subTitle", {
                      required: "Subtitle is required",
                    })}
                  />
                  {errors.subTitle && (
                    <p className="text-xs text-destructive mt-1">
                      {errors.subTitle.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label>Audience</Label>

                  <Controller
                    name="audience"
                    control={control}
                    rules={{ required: "Audience is required" }}
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className="w-full h-10 px-3 bg-background">
                          <SelectValue placeholder="Select Audience" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="men">Men</SelectItem>
                          <SelectItem value="women">Women</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />

                  {errors.audience && (
                    <p className="text-xs text-destructive mt-1">
                      {errors.audience.message}
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
                  <Label>Category</Label>
                  <Controller
                    name="category"
                    control={control}
                    rules={{ required: "Category is required" }}
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className="w-full h-10 px-3 bg-background">
                          <SelectValue placeholder="Select Category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="unStitched">
                            Un Stitched
                          </SelectItem>
                          <SelectItem value="stitched">Stitched</SelectItem>
                          <SelectItem value="readyToWear">
                            Ready To Wear
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.subCategory && (
                    <p className="text-xs text-destructive mt-1">
                      {errors.subCategory.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label>Sub Category</Label>
                  <Controller
                    name="subCategory"
                    control={control}
                    rules={{ required: "Sub category is required" }}
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className="w-full h-10 px-3 bg-background">
                          <SelectValue placeholder="Select Sub Category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="top">Top</SelectItem>
                          <SelectItem value="bottom">Bottom</SelectItem>
                          <SelectItem value="2piece">2 Piece</SelectItem>
                          <SelectItem value="3piece">3 Piece</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.subCategory && (
                    <p className="text-xs text-destructive mt-1">
                      {errors.subCategory.message}
                    </p>
                  )}
                </div>
                
                <Controller
                  name="outfitType"
                  control={control}
                  rules={{ required: "Outfit Type is required" }}
                  render={({ field }) => {
                    const outfitOptions =
                      watch("audience") === "men"
                        ? [
                            "Polo Shirt",
                            "T-Shirt",
                            "Formal Shirt",
                            "Kurta",
                            "Waistcoat",
                            "Formal Suit (2 Piece)",
                            "Formal Suit (3 Piece)",
                            "Sherwani",
                            "Jeans",
                            "Trousers / Chinos",
                            "Shorts",
                            "Tracksuit / Gym Wear",
                          ]
                        : [
                            "Kurti / Shirt",
                            "Polo Shirt",
                            "T-Shirt",
                            "Blouse / Tunic",
                            "Dress / Maxi",
                            "Gown",
                            "Saree",
                            "Lehenga Choli",
                            "Anarkali Suit",
                            "2 Piece (Kurti + Trouser)",
                            "3 Piece (Kurti + Trouser + Dupatta)",
                            "Jeans / Trousers",
                            "Skirt",
                            "Leggings / Jeggings",
                            "Tracksuit / Gym Wear",
                          ];

                    return (
                      <div>
                        <Label>Outfit Type</Label>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger className="w-full h-10 px-3 bg-background">
                            <SelectValue placeholder="Select Outfit Type" />
                          </SelectTrigger>
                          <SelectContent>
                            {outfitOptions.map((item) => (
                              <SelectItem key={item} value={item}>
                                {item}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {errors.outfitType && (
                          <p className="text-xs text-destructive mt-1">
                            {errors.outfitType.message}
                          </p>
                        )}
                      </div>
                    );
                  }}
                />

                <div>
                  <Label>Fabric</Label>
                  <Controller
                    name="fabric"
                    control={control}
                    rules={{ required: "Fabric is required" }}
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className="w-full h-10 px-3 bg-background">
                          <SelectValue placeholder="Select Fabric" />
                        </SelectTrigger>
                        <SelectContent>
                          {fabrics.map((fabric) => (
                            <SelectItem key={fabric._id} value={fabric._id}>
                              {fabric.title}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.fabric && (
                    <p className="text-xs text-destructive mt-1">
                      {errors.fabric.message}
                    </p>
                  )}
                </div>

                <div className="md:col-span-2 space-y-4">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Enter product description..."
                    {...register("description", {
                      required: "Description is required",
                    })}
                  />
                  {errors.description && (
                    <p className="text-red-500 text-sm">
                      {errors.description.message}
                    </p>
                  )}
                </div>                
                <div className="md:col-span-2 space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Variants</Label>
                    <Button
                      type="button"
                      onClick={() =>
                        append({
                          color: "",
                          featuredImage: null,
                          additionalImages: [],
                          stock: 0,
                        })
                      }
                    >
                      + Add Variant
                    </Button>
                  </div>

                  {fields.map((variant, index) => (
                    <Card key={variant.id} className="p-4 relative">
                      <button
                        type="button"
                        onClick={() => remove(index)}
                        className="absolute top-2 right-2 text-gray-500 hover:text-red-600"
                      >
                        <X size={18} />
                      </button>

                      <Controller
                        name={`variants.${index}.color`}
                        control={control}
                        rules={{ required: "Color is required" }}
                        render={({ field }) => (
                          <div className="mb-3">
                            <Label>Color</Label>
                            <Select
                              onValueChange={field.onChange}
                              value={field.value}
                            >
                              <SelectTrigger className="w-full h-10 px-3 bg-background">
                                <SelectValue placeholder="Select Color" />
                              </SelectTrigger>
                              <SelectContent>
                                {colors.map((color) => (
                                  <SelectItem key={color._id} value={color._id}>
                                    {color.title}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            {errors.variants?.[index]?.color && (
                              <p className="text-xs text-destructive mt-1">
                                {errors.variants[index].color.message}
                              </p>
                            )}
                          </div>
                        )}
                      />

                      
                      <div className="mb-3">
                        <Label>Featured Image</Label>
                        <Input
                          type="file"
                          accept="image/*"
                          {...register(`variants.${index}.featuredImage`, {
                            required: "Featured image is required",
                          })}
                        />
                        {errors.variants?.[index]?.featuredImage && (
                          <p className="text-xs text-destructive mt-1">
                            {errors.variants[index].featuredImage.message}
                          </p>
                        )}
                      </div>

                      
                      <div className="mb-3">
                        <Label>Additional Images</Label>
                        <Input
                          type="file"
                          multiple
                          accept="image/*"
                          {...register(`variants.${index}.additionalImages`)}
                        />
                      </div>

                      <div>
                        <Label>Stock</Label>
                        <Input
                          type="number"
                          min="0"
                          {...register(`variants.${index}.stock`, {
                            required: "Stock is required",
                            valueAsNumber: true,
                            min: {
                              value: 0,
                              message: "Stock cannot be negative",
                            },
                          })}
                        />
                        {errors.variants?.[index]?.stock && (
                          <p className="text-xs text-destructive mt-1">
                            {errors.variants[index].stock.message}
                          </p>
                        )}
                      </div>
                    </Card>
                  ))}
                </div>
                <Controller
                  name="season"
                  control={control}
                  rules={{ required: "Please select at least one season" }}
                  render={({ field }) => {
                    const handleChange = (value: string) => {
                      const newValue = field.value?.includes(value)
                        ? field.value.filter((v: string) => v !== value)
                        : [...(field.value || []), value];
                      field.onChange(newValue);
                    };

                    const seasonOptions = ["Summer", "Winter"];

                    return (
                      <div className="md:col-span-2">
                        <Label>Season</Label>
                        <div className="flex flex-wrap gap-4 mt-2">
                          {seasonOptions.map((season) => (
                            <div
                              key={season}
                              className="flex items-center space-x-2"
                            >
                              <Checkbox
                                id={season}
                                checked={field.value?.includes(season)}
                                onCheckedChange={() => handleChange(season)}
                              />
                              <label htmlFor={season} className="text-sm">
                                {season}
                              </label>
                            </div>
                          ))}
                        </div>
                        {errors.season && (
                          <p className="text-xs text-destructive mt-1">
                            {errors.season.message}
                          </p>
                        )}
                      </div>
                    );
                  }}
                />

                <Controller
                  name="designs"
                  control={control}
                  rules={{ required: "Please select at least one design" }}
                  render={({ field }) => {
                    const handleChange = (value: string) => {
                      const newValue = field.value?.includes(value)
                        ? field.value.filter((v: string) => v !== value)
                        : [...(field.value || []), value];
                      field.onChange(newValue);
                    };

                    const designOptions = [
                      "Plain",
                      "Printed",
                      "Embroidered",
                      "Block Print",
                      "Digital Print",
                      "Geometric",
                      "Floral",
                      "Abstract",
                      "Minimalist",
                    ];

                    return (
                      <div className="md:col-span-2">
                        <Label>Designs</Label>
                        <div className="flex flex-wrap gap-4 mt-2">
                          {designOptions.map((design) => (
                            <div
                              key={design}
                              className="flex items-center space-x-2"
                            >
                              <Checkbox
                                id={design}
                                checked={field.value?.includes(design)}
                                onCheckedChange={() => handleChange(design)}
                              />
                              <label htmlFor={design} className="text-sm">
                                {design}
                              </label>
                            </div>
                          ))}
                        </div>
                        {errors.designs && (
                          <p className="text-xs text-destructive mt-1">
                            {errors.designs.message}
                          </p>
                        )}
                      </div>
                    );
                  }}
                />

                <Controller
                  name="occasions"
                  control={control}
                  rules={{ required: "Please select at least one occasion" }}
                  render={({ field }) => {
                    const handleChange = (value: string) => {
                      const newValue = field.value?.includes(value)
                        ? field.value.filter((v: string) => v !== value)
                        : [...(field.value || []), value];
                      field.onChange(newValue);
                    };

                    const occasionOptions = [
                      "Casual",
                      "Formal",
                      "Party / Festive",
                      "Wedding",
                      "Office / Workwear",
                      "Eid / Religious",
                    ];

                    return (
                      <div className="md:col-span-2">
                        <Label>Occasions</Label>
                        <div className="flex flex-wrap gap-4 mt-2">
                          {occasionOptions.map((occasion) => (
                            <div
                              key={occasion}
                              className="flex items-center space-x-2"
                            >
                              <Checkbox
                                id={occasion}
                                checked={field.value?.includes(occasion)}
                                onCheckedChange={() => handleChange(occasion)}
                              />
                              <label htmlFor={occasion} className="text-sm">
                                {occasion}
                              </label>
                            </div>
                          ))}
                        </div>
                        {errors.occasions && (
                          <p className="text-xs text-destructive mt-1">
                            {errors.occasions.message}
                          </p>
                        )}
                      </div>
                    );
                  }}
                />
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
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => reset()}
                  >
                    Reset
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card> */
}
