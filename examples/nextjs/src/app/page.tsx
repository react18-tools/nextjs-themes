import { LandingPage } from "@repo/shared/dist/server";
import { ThemeController } from "@repo/shared";

export const metadata = {
  title: "Nextjs Themes",
};

/** next.js landing page */
export default function Page(): JSX.Element {
  return (
    <LandingPage title="Next.js Example">
      <ThemeController />
      {/* <Demo /> */}
      {/* <MyButton /> */}
    </LandingPage>
  );
}
