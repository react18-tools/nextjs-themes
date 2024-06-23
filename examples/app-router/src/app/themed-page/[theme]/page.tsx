import { ForceTheme } from "nextjs-themes/force-theme";

interface PageProps {
  params: { theme: string };
}

export default function PageWithForcedTheme({ params: { theme } }: PageProps): JSX.Element {
  return (
    <>
      <ForceTheme theme={theme} />
      <p className="center">
        Theme is forced to {theme}. Try changing theme or colorScheme and verify!
      </p>
    </>
  );
}
