import { ForceTheme } from "nextjs-themes/force-theme";

export default function PageWithForcedTheme() {
  return (
    <>
      <ForceTheme theme="" />
      <p className="center">Theme is forced to &quot;&quot;</p>
    </>
  );
}
