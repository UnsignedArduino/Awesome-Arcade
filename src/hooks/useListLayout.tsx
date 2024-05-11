import React from "react";
import { ListLayout } from "@/components/AwesomeArcadeList/listLayout";

export default function useListLayout(): ListLayout {
  const [layout, setLayout] = React.useState<ListLayout>("masonry");

  React.useEffect(() => {
    const l = window.localStorage.getItem("listLayout");
    console.log(`Using layout ${l}`);
    if (l) {
      setLayout(l as ListLayout);
    } else {
      setLayout("masonry");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function onListLayoutChange(event: CustomEvent<ListLayout>) {
    console.log(`Using layout ${event.detail}`);
    setLayout(event.detail);
  }

  React.useEffect(() => {
    window.document.documentElement.addEventListener(
      "listlayoutchange",
      onListLayoutChange,
    );

    return () => {
      window.document.documentElement.removeEventListener(
        "listlayoutchange",
        onListLayoutChange,
      );
    };
  }, []);

  return layout;
}
