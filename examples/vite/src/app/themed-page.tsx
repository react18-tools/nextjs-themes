import React from "react";
import { useParams } from "react-router-dom";
import { ForceTheme } from "nextjs-themes";

export default function ThemedPage() {
  const { theme } = useParams();
  return (
    <>
      <ForceTheme theme={theme as string} />
      <p>Theme is forced to {theme} theme. Try changing theme or colorScheme and verify!</p>
    </>
  );
}
