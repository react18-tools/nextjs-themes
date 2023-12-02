import Link from "next/link";
import { ForcedPageLayout } from "shared-ui";

export default function ForcedColorSchemeLayout({ children }): JSX.Element {
	return (
		<ForcedPageLayout LinkElement={Link} scope="forcedColorScheme">
			{children}
		</ForcedPageLayout>
	);
}
