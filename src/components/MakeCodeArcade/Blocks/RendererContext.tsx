import { MakeCodeArcadeBlockRenderer } from "@/components/MakeCodeArcade/Blocks/renderer";
import React from "react";

export const MakeCodeArcadeBlockRendererFunctionsContext =
  React.createContext<MakeCodeArcadeBlockRenderer | null>(null);

export default function MakeCodeArcadeBlockRendererContext({
  children,
}: {
  children: React.ReactNode;
}): React.ReactNode {
  const [renderer, setRenderer] =
    React.useState<MakeCodeArcadeBlockRenderer | null>(null);

  React.useEffect(() => {
    setRenderer(new MakeCodeArcadeBlockRenderer());
  }, []);

  return (
    <MakeCodeArcadeBlockRendererFunctionsContext.Provider value={renderer}>
      {children}
    </MakeCodeArcadeBlockRendererFunctionsContext.Provider>
  );
}
