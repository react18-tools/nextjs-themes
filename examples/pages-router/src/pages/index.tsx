import { Card, Cards, LandingPage } from "@repo/shared/dist/server";
import { ThemeController, PageNavigatorCard } from "@repo/shared";
import { ColorSwitch } from "nextjs-themes";
import Link from "next/link";

export const metadata = {
  title: "Nextjs Themes",
};

/** next.js landing page */
export default function Home(): JSX.Element {
  return (
    <LandingPage title="Next.js Example">
      <ColorSwitch className="center" />
      <ThemeController />
      <Cards>
        <Card
          title="Static Themed Page"
          href="static-black-theme"
          description="Example for non dynamic page with forced theme. Uses Component.them"
          linkComponent={Link}
        />
        <PageNavigatorCard LinkElement={Link} />
      </Cards>
    </LandingPage>
  );
}
