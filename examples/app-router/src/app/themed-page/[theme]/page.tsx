import { ForceTheme } from "nextjs-themes/force-theme";

interface PageProps {
  params: Promise<{ theme: string }>;
}

export default async function PageWithForcedTheme({ params }: PageProps) {
  const { theme } = await params;
  return (
    <>
      <ForceTheme theme={theme} />
      <p className="center">
        Theme is forced to {theme}. Try changing theme or colorScheme and verify!
      </p>
    </>
  );
}
