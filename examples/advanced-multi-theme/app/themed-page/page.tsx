import { ForceTheme } from "nextjs-themes";

export default function PageWithForcedTheme() {
  return (
    <>
      <ForceTheme theme="" />
      <p>Theme is forced to &quot;&quot;</p>
    </>
  );
}
