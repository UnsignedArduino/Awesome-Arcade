import { StaticImageData } from "next/image";

export type QuickLink = {
  name: string;
  description: string;
  link?: string | undefined;
  linkText?: string | undefined;
  image?: {
    darkTheme: StaticImageData;
    lightTheme: StaticImageData;
    altText: string;
  };
};
