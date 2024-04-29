import { smoothScrollHash } from "@/components/Linkable/Header";
import Link from "next/link";
import React from "react";

export default function HashLink({ url }: { url: string }): React.ReactNode {
  return (
    <Link className="ms-1" href={url} onClick={smoothScrollHash}>
      <i className="bi-link-45deg" />
    </Link>
  );
}
