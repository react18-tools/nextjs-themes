import { ForceTheme } from "nextjs-themes";

export default function PageWithForcedColorScheme({ params: { theme } }) {
  return (
    <>
      <ForceTheme theme={theme} />
      <p>Theme is forced to {theme}</p>
    </>
  );
}
