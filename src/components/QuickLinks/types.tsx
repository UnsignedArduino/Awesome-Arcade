import { StaticImageData } from "next/image";

export type QuickLink = {
  name: string;
  description: string;
  link: string;
  linkText: string;
  image?: {
    darkTheme: StaticImageData;
    lightTheme: StaticImageData;
    altText: string;
  };
};
