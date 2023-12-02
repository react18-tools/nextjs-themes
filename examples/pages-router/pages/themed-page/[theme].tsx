import { useRouter } from "next/router";
import { ForceTheme } from "nextjs-themes";

export default function PageWithForcedColorScheme() {
  const router = useRouter();
  const { theme } = router.query;
  return (
    <>
      <h1>
        Example page showing Themed page with <code>forcedTheme</code>
      </h1>
      <ForceTheme theme={theme as string} />
      <p>Theme is forced to {theme}</p>
    </>
  );
}
