import { ForceColorScheme } from "nextjs-themes";

export default function PageWithForcedColorScheme() {
  return (
    <>
      <ForceColorScheme colorScheme="" />
      <p>
        Color scheme is forced to &quot;&quot; (Empty string)
        <br />
        Thus, theme is applied irrespective of colorScheme
      </p>
    </>
  );
}
