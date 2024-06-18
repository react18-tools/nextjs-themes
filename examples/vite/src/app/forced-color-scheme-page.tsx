import React from "react";
import { ColorSchemeType, ForceColorScheme } from "nextjs-themes";
import { useParams } from "react-router-dom";

export default function ForcedColorSchemePage() {
  const { colorScheme } = useParams();
  return (
    <>
      <ForceColorScheme colorScheme={colorScheme as ColorSchemeType} />
      <p>
        Color scheme is forced to {colorScheme} color scheme. Thus, default-{colorScheme}-theme is
        applied
      </p>
    </>
  );
}
