import getElement from "@/scripts/Utils/Element";
import React from "react";
import { MasonryLibContext } from "@/pages/_app";
import Masonry from "masonry-layout";

export default function useMasonry(
  id: string,
  enable: boolean = true,
): Masonry | null {
  const MasonryLib = React.useContext(MasonryLibContext);
  const masonryInstanceRef = React.useRef<Masonry | null>(null);

  React.useEffect(() => {
    if (MasonryLib !== null) {
      if (enable && masonryInstanceRef.current === null) {
        masonryInstanceRef.current = new MasonryLib.default(getElement(id), {
          // itemSelector: ".col",
          // columnWidth: ".col",
          percentPosition: true,
          // horizontalOrder: true,
        });
      } else if (!enable && masonryInstanceRef.current !== null) {
        masonryInstanceRef.current?.destroy?.();
        masonryInstanceRef.current = null;
      }
    }
  }, [MasonryLib, enable, id]);

  return masonryInstanceRef.current;
}
