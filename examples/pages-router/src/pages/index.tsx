import { Cards, LandingPage } from "@repo/shared/dist/server";
import { ThemeController, PageNavigatorCard } from "@repo/shared";
import { ColorSwitch } from "nextjs-themes";
import Link from "next/link";

export const metadata = {
  title: "Nextjs Themes",
};
const cards = [
  {
    href: "https://react18-tools.github.io/nextjs-themes/",
    title: "Docs",
    description: "Check out the official documentation for more information.",
  },
  {
    href: "https://github.com/react18-tools/nextjs-themes/tree/main/examples",
    title: "More Examples",
    description:
      "Check out more examples on the official GitHub Repo. Feel free to suggest additional examples in the discussions section.",
  },
  {
    href: "https://github.com/react18-tools/nextjs-themes",
    title: "Star this repo",
    description:
      "Star this repo for your new library! This also motivates us and helps us understand that community is interested in this work.",
  },
];

/** next.js landing page */
export default function Home(): JSX.Element {
  return (
    <LandingPage title="Next.js Example">
      <ColorSwitch className="center" />
      <ThemeController />
      {/* <Demo /> */}
      {/* <MyButton /> */}
      <Cards cards={cards}>
        <PageNavigatorCard LinkElement={Link} />
      </Cards>
    </LandingPage>
  );
}
