import { Link, useParams } from "react-router-dom";
import { ForceTheme } from "nextjs-themes";
import { ForcedPageLayout } from "shared-ui";

export default function ThemedPage() {
  const { theme } = useParams();
  return (
    <ForcedPageLayout LinkElement={Link} scope="forcedTheme">
      <ForceTheme theme={theme as string} />
      <p>Theme is forced to {theme}. Try changing theme or colorScheme and verify!</p>
    </ForcedPageLayout>
  );
}
