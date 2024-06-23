import { ForceColorScheme } from "nextjs-themes/force-color-scheme";

export default function PageWithForcedColorScheme(): JSX.Element {
  return (
    <>
      <ForceColorScheme colorScheme="" />
      <p className="center">
        Color scheme is forced to &quot;&quot; (Empty string)
        <br />
        Thus, theme is applied irrespective of colorScheme
      </p>
    </>
  );
}
