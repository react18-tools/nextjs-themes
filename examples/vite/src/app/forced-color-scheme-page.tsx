import React from "react";
import { ColorSchemeType } from "nextjs-themes";
import { ForceColorScheme } from "nextjs-themes/force-color-scheme";
import { Link, useParams } from "react-router-dom";
import { Header } from "@repo/shared";

export default function ForcedColorSchemePage() {
  const { colorScheme } = useParams();
  return (
    <>
      <Header linkComponent={Link} />
      <ForceColorScheme colorScheme={colorScheme as ColorSchemeType} />
      <p className="center">
        Color scheme is forced to {colorScheme} color scheme. Thus, default-{colorScheme}-theme is
        applied
      </p>
    </>
  );
}
