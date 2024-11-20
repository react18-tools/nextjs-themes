import type { ColorSchemeType } from "nextjs-themes";
import { ForceColorScheme } from "nextjs-themes/force-color-scheme";

interface PageWithForcedColorSchemeProps {
  params: Promise<{ colorScheme: ColorSchemeType }>;
}

export default async function PageWithForcedColorScheme({
  params,
}: PageWithForcedColorSchemeProps) {
  const { colorScheme } = await params;
  return (
    <>
      <ForceColorScheme colorScheme={colorScheme} />
      <p className="center">
        Color scheme is forced to {colorScheme}. Thus, default-{colorScheme}-theme is applied
      </p>
    </>
  );
}
