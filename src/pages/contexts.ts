import React from "react";
import { ClickCountListing } from "@/pages/index";

export const ClickCountContext = React.createContext<
  ClickCountListing | undefined
>(undefined);
