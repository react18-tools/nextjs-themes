import React from "react";
import "./styles.css";
import { Cards, LandingPage } from "@repo/shared/dist/server";
import { ColorSwitch } from "nextjs-themes/color-switch";
import { Header, PageNavigatorCard, ThemeController } from "@repo/shared";
import { Link } from "react-router-dom";

/** Vite App */
function App() {
  return (
    <>
      <Header linkComponent={Link} />
      <LandingPage title="Vite Example">
        <ColorSwitch className="center" />
        <ThemeController />
        <Cards>
          <PageNavigatorCard LinkElement={Link} />{" "}
        </Cards>
      </LandingPage>
    </>
  );
}

export default App;
