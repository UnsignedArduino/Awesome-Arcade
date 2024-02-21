import React from "react";

export type QuickLink = {
  name: string | React.ReactNode;
  subtitle?: string | React.ReactNode | null;
  description: string | React.ReactNode;
  link: string;
  linkText: string | React.ReactNode;
};
