import { Cards, LandingPage } from "@repo/shared/dist/server";
import { PageNavigatorCard, ThemeController } from "@repo/shared";
import { ColorSwitch } from "nextjs-themes";
import Link from "next/link";

export const metadata = {
  title: "Nextjs Themes",
};

/** next.js landing page */
export default function Page(): JSX.Element {
  return (
    <LandingPage title="Next.js Example">
      <ColorSwitch className="center" />
      <ThemeController />
      <Cards>
        <PageNavigatorCard LinkElement={Link} />{" "}
      </Cards>
    </LandingPage>
  );
}
