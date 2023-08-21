import React from "react";
import { ClickCountListing } from "@/pages/old";

export const ClickCountContext = React.createContext<
  ClickCountListing | undefined
>(undefined);
