export type HeroSlideProps = {
  title: string;
  subTitle: string;
  buttons: {
    label: string;
    href: string;
  }[];
  imageSide: "left" | "right";
  imageUrl: string;
  textColorAfterMd: "black" | "white";
};

export const heroSlideOne: HeroSlideProps = {
  title: "MAN ",
  subTitle: "INTERMIX '25",
  buttons: [
    {
      label: "UNSTITCHED",
      href: "/#",
    },
    {
      label: "STITCHED",
      href: "/#",
    },
  ],
  imageSide: "left",
  imageUrl: "/images/hero/heroSlideOneImage.webp",
  textColorAfterMd: "black",
};
export const heroSlideTwo: HeroSlideProps = {
  title: "UNSTITSHED ",
  subTitle: "FESTIVE '25",
  buttons: [
    {
      label: "SHOP NOW",
      href: "/#",
    },
  ],
  imageSide: "right",
  imageUrl: "/images/hero/heroSlideTwoImage.webp",
  textColorAfterMd: "black",
};
export const heroSlideThree: HeroSlideProps = {
  title: "READY TO WEAR ",
  subTitle: "INTERMIX '25 - NEW ARRIVALS",
  buttons: [
    {
      label: "SHOP NOW",
      href: "/#",
    },
  ],
  imageSide: "right",
  imageUrl: "/images/hero/heroSlideThreeImage.webp",
  textColorAfterMd: "white",
};
