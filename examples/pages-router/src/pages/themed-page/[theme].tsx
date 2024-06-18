import { useRouter } from "next/router";
import { ForceTheme } from "nextjs-themes";

export default function PageWithForcedTheme() {
  const router = useRouter();
  const { theme } = router.query;
  return (
    <div className="center">
      <h1>
        Example page showing Themed page with <code>forcedTheme</code>
      </h1>
      <p>Theme is forced to {theme}</p>
      <ForceTheme theme={theme as string} />
    </div>
  );
}
