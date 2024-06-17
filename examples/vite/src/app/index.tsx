import React, { useCallback } from "react";
import "./styles.css";
import { Bars1 } from "react18-loaders/dist/server/bars/bars1";
import { LoaderContainer, useLoader } from "react18-loaders";
import { LandingPage, Layout } from "@repo/shared/dist/server";
import { ThemeSwitcher } from "nextjs-themes";
import { Demo, Header } from "@repo/shared";

/** Vite App */
function App(): JSX.Element {
  const { setLoading } = useLoader();
  const handleClick = useCallback(() => setLoading(true), []);
  return (
    <Layout>
      <ThemeSwitcher themeTransition="background .5s" />
      <Header />
      <LandingPage title="Vite Example">
        <Demo />
      </LandingPage>
      <button onClick={handleClick}>Show loader</button>
      <LoaderContainer>
        <Bars1 color="red" width={50} />
      </LoaderContainer>
    </Layout>
  );
}

export default App;
