import React from "react";
import { ClickCountListing } from "@/pages";

export const ClickCountContext = React.createContext<
  ClickCountListing | undefined
>(undefined);
