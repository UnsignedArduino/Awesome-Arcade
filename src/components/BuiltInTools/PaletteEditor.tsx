import React from "react";
import { AllPalettes } from "@/components/BuiltInTools/palettes";

export default function PaletteEditor({
  palette,
  setPalette,
}: {
  palette: string | undefined;
  setPalette: (value: string | undefined) => void;
}): React.ReactNode {
  const [paletteName, setPaletteName] = React.useState("Custom");

  React.useEffect(() => {
    if (palette == null) {
      setPalette(
        "#000000,#ffffff,#ff2121,#ff93c4,#ff8135,#fff609,#249ca3,#78dc52,#003fad,#87f2ff,#8e2ec4,#a4839f,#5c406c,#e5cdc4,#91463d,#000000",
      );
    }
  }, [palette, setPalette]);

  React.useEffect(() => {
    setPaletteName("Custom");
    if (palette == null) {
      return;
    }
    for (const preset of AllPalettes) {
      if (preset.colors.join(",").toUpperCase() === palette.toUpperCase()) {
        setPaletteName(preset.name);
        break;
      }
    }
  }, [palette]);

  return (
    <details>
      <summary className="form-label">Palette ({paletteName})</summary>
      <div className="input-group mb-2">
        <span className="input-group-text">
          Select palette preset (clicking will overwrite current palette)
        </span>
        <select
          className="form-select"
          aria-label="Default select example"
          onChange={(e) => {
            setPalette(e.target.value);
          }}
        >
          {(() => {
            return AllPalettes.map((palette) => {
              return (
                <option key={palette.name} value={palette.colors.join(",")}>
                  {palette.name}
                </option>
              );
            });
          })()}
        </select>
      </div>
      <ol className="list-group list-group-numbered">
        {palette != null && palette.split(",").length > 0 ? (
          palette.split(",").map((color, index, colors) => {
            return (
              <li
                className="list-group-item d-flex align-items-start"
                key={`${color} at ${index}`}
              >
                {index == 0 ? (
                  <span className="ms-3">
                    <em>Reserved for transparency, cannot be changed.</em>
                  </span>
                ) : (
                  <div className="input-group ms-3">
                    <button
                      className="btn btn-secondary"
                      type="button"
                      disabled={index == 1}
                      onClick={() => {
                        const newColors = colors.slice();
                        const temp = newColors[index];
                        newColors[index] = newColors[index - 1];
                        newColors[index - 1] = temp;
                        setPalette(newColors.join(","));
                      }}
                    >
                      Move up
                    </button>
                    <button
                      className="btn btn-secondary"
                      type="button"
                      disabled={index == colors.length - 1}
                      onClick={() => {
                        const newColors = colors.slice();
                        const temp = newColors[index];
                        newColors[index] = newColors[index + 1];
                        newColors[index + 1] = temp;
                        setPalette(newColors.join(","));
                      }}
                    >
                      Move down
                    </button>
                    <input
                      type="color"
                      className="form-control form-control-color"
                      title={`Pick a color for index ${index + 1}`}
                      defaultValue={color.toUpperCase()}
                      onBlur={(e) => {
                        const newColors = colors.slice();
                        newColors[index] = e.target.value;
                        setPalette(newColors.join(","));
                      }}
                    />
                    <input
                      type="text"
                      className="form-control"
                      placeholder="#xxxxxx"
                      defaultValue={color.toUpperCase()}
                      onBlur={(e) => {
                        const newColors = colors.slice();
                        newColors[index] = e.target.value;
                        setPalette(newColors.join(","));
                      }}
                    />
                  </div>
                )}
              </li>
            );
          })
        ) : (
          <span>
            <em>No palette selected.</em>
          </span>
        )}
      </ol>
    </details>
  );
}
