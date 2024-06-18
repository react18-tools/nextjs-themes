import React from "react";
import { ColorSchemeType, ForceColorScheme } from "nextjs-themes";
import { Link, useParams } from "react-router-dom";
import { Header } from "@repo/shared";

export default function ForcedColorSchemePage() {
  const { colorScheme } = useParams();
  return (
    <>
      <Header linkComponent={Link} />
      <ForceColorScheme colorScheme={colorScheme as ColorSchemeType} />
      <p className="p">
        Color scheme is forced to {colorScheme} color scheme. Thus, default-{colorScheme}-theme is
        applied
      </p>
    </>
  );
}
