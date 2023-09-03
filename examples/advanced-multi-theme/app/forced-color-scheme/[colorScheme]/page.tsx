import type { ColorSchemeType } from "nextjs-themes";
import { ForceColorScheme } from "nextjs-themes";

export default function PageWithForcedColorScheme({
  params: { colorScheme },
}: {
  params: { colorScheme: ColorSchemeType };
}) {
  return (
    <>
      <ForceColorScheme colorScheme={colorScheme} />
      <p>
        Color scheme is forced to {colorScheme}. Thus, default-{colorScheme}-theme is applied
      </p>
    </>
  );
}
