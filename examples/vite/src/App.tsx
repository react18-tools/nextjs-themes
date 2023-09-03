import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { ThemeSwitcher } from "nextjs-themes";
import { ForkMe } from "@mayank1513/fork-me/server";
import "./App.css";
import ColorSchemePreference from "./components/color-scheme-preference";
import ThemeSelector from "./components/theme-selector";
import DarkThemeSelector from "./components/dark-theme-selector";
import LightThemeSelector from "./components/light-theme-selector";
import styles from "./components/page.module.css";
import { StarMe } from "@mayank1513/fork-me";

function App() {
	return (
		<>
			<ThemeSwitcher />
			<div>
				<a href="https://vitejs.dev" target="_blank">
					<img src={viteLogo} className="logo" alt="Vite logo" />
				</a>
				<a href="https://react.dev" target="_blank">
					<img src={reactLogo} className="logo react" alt="React logo" />
				</a>
			</div>
			<h1>React18 Themes</h1>
			<div className="card">
				<StarMe gitHubUrl="https://github.com/mayank1513/nextjs-themes" />
				<p>
					Edit <code>src/App.tsx</code> and save to test HMR
				</p>
			</div>
			<div className={[styles.center, styles.prefs].join(" ")}>
				<div>
					<ColorSchemePreference />
					<ThemeSelector />
				</div>
				<div>
					<DarkThemeSelector />
					<LightThemeSelector />
				</div>
			</div>
			<ForkMe gitHubUrl="https://github.com/mayank1513/nextjs-themes" bgColor=" " />
		</>
	);
}

export default App;
