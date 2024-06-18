import { Cards, LandingPage } from "@repo/shared/dist/server";
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
        <Link href="./static-black-theme">dark</Link>
        <PageNavigatorCard LinkElement={Link} />
      </Cards>
    </LandingPage>
  );
}
