import Link from "next/link";
import { ForcedPageLayout } from "shared-ui";

export default function ForcedThemeLayout({ children }): JSX.Element {
	return (
		<ForcedPageLayout LinkElement={Link} scope="forcedTheme">
			{children}
		</ForcedPageLayout>
	);
}
