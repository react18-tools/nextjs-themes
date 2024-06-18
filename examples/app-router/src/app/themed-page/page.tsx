import { ForceTheme } from "nextjs-themes";

export default function PageWithForcedTheme(): JSX.Element {
  return (
    <>
      <ForceTheme theme="" />
      <p className="center">Theme is forced to &quot;&quot;</p>
    </>
  );
}
