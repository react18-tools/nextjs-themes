import { useRouter } from "next/router";

export default function PageWithForcedColorScheme() {
  const router = useRouter();
  const { theme } = router.query;
  return (
    <>
      <h1>
        Example page showing Themed page with <code>forcedTheme</code>
      </h1>
      <p>Theme is forced to {theme}</p>
    </>
  );
}
