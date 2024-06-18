import React from "react";
import { createRoot } from "react-dom/client";
import App from "./app";
import "./index.css";
import ForcedColorSchemePage from "./app/forced-color-scheme-page";
import ThemedPage from "./app/themed-page";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { Layout } from "@repo/shared/dist/server";
import { ThemeSwitcher } from "nextjs-themes";
import { Header } from "@repo/shared";

const routes = [
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/forced-color-scheme/:colorScheme",
    element: <ForcedColorSchemePage />,
  },
  {
    path: "/themed-page/:theme",
    element: <ThemedPage />,
  },
];

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout>
        <Outlet />
      </Layout>
    ),
    children: routes,
  },
]);

const el = document.getElementById("root");
if (el) {
  const root = createRoot(el);
  root.render(
    <React.StrictMode>
      <ThemeSwitcher themeTransition="background .5s" />
      <RouterProvider router={router} />
    </React.StrictMode>,
  );
} else {
  throw new Error("Could not find root element");
}
