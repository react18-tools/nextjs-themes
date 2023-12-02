import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { createBrowserRouter, Link, Outlet, RouterProvider } from "react-router-dom";
import ForcedColorSchemePage from "./forced-color-scheme-page.tsx";
import ThemedPage from "./themed-page.tsx";
import { SharedRootLayout } from "shared-ui";

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
			<SharedRootLayout LinkElement={Link}>
				<Outlet />
			</SharedRootLayout>
		),
		children: routes,
	},
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>,
);
