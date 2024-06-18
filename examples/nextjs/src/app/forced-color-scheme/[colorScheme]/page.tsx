import type { ColorSchemeType } from "nextjs-themes";
import { ForceColorScheme } from "nextjs-themes";

interface PageWithForcedColorSchemeProps {
  params: { colorScheme: ColorSchemeType };
}

export default function PageWithForcedColorScheme({
  params: { colorScheme },
}: PageWithForcedColorSchemeProps): JSX.Element {
  return (
    <>
      <ForceColorScheme colorScheme={colorScheme} />
      <p className="center">
        Color scheme is forced to {colorScheme}. Thus, default-{colorScheme}-theme is applied
      </p>
    </>
  );
}
