import { ReactNode } from "react";
import styles from "./landing-page.module.scss";
import { Logo } from "../logo";
import rebrandConfig from "@repo/scripts/rebrand.config.json";

interface LandingPageProps {
  title: string;
  children?: ReactNode;
}

const { owner, repo } = rebrandConfig;

/**
 * # LandingPage
 * library&#x27;s landing page
 */
export function LandingPage({ title, children }: LandingPageProps) {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>{title}</h1>
      <div className={[styles.center, styles.hero].join(" ")}>
        <h2>Craft your next amazing library using</h2>
        <Logo href={`https://github.com/${owner}/${repo}`} />
        <strong>Harness the full potential of React 18 Server Components!</strong>
      </div>
      {children}
    </main>
  );
}
