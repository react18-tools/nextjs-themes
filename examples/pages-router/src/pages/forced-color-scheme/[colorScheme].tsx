import { useRouter } from "next/router";
import { ColorSchemeType, ForceColorScheme } from "nextjs-themes";

export default function PageWithForcedColorScheme() {
  const router = useRouter();
  const { colorScheme } = router.query;
  return (
    <div className="center">
      <h1>
        Example page showing <code>forcedColorScheme</code>
      </h1>
      <ForceColorScheme colorScheme={colorScheme as ColorSchemeType} />
      <p>Color scheme is forced to {colorScheme}</p>
      <p>Thus, default-{colorScheme}-theme is applied</p>
    </div>
  );
}
