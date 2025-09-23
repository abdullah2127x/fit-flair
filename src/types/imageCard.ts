type ImageCardBaseProps = {
  // always available
  id: string;
  src: string;
  slug: string;
  rounded?: "circle" | "square";
  aspectRatio?: "square" | "h-full";
  buttonText?: string;
  changeColorOnHover?: boolean;
};

export type ImageCardCollection = ImageCardBaseProps & {
  variant: "collection";
  title: string;
};

export type ImageCardShowcase = ImageCardBaseProps & {
  variant: "showcase";
  title: string;
  subTitle: string;
  price: number;
  colorName: string;
  tags: string[];
  discount?: number;
  showAddToCart?: boolean;
  showQuickView?: boolean;
  onQuickView?: (id: string, colorName: string) => void;
};

export type ImageCardMinimal = ImageCardBaseProps & {
  variant: "base";
  // no title, no price, just bare minimum
};
