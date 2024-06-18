import React from "react";
import { Link, useParams } from "react-router-dom";
import { ForceTheme } from "nextjs-themes";
import { Header } from "@repo/shared";

export default function ThemedPage() {
  const { theme } = useParams();
  return (
    <>
      <Header linkComponent={Link} />
      <ForceTheme theme={theme as string} />
      <p className="center">
        Theme is forced to {theme} theme. Try changing theme or colorScheme and verify!
      </p>
    </>
  );
}
