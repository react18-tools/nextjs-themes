import { ForcedPageLayout } from "shared-ui";
import { ColorSchemeType, ForceColorScheme } from "nextjs-themes";
import { Link, useParams } from "react-router-dom";

export default function ForcedColorSchemePage() {
  const { colorScheme } = useParams();
  return (
    <ForcedPageLayout LinkElement={Link} scope="forcedColorScheme">
      <ForceColorScheme colorScheme={colorScheme as ColorSchemeType} />
      <p>
        Color scheme is forced to {colorScheme}. Thus, default-{colorScheme}-theme is applied
      </p>
    </ForcedPageLayout>
  );
}
