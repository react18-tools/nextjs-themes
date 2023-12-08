import type { PageNavigatorCardProps } from "./page-navigator-card";
import { PageNavigatorCard } from "./page-navigator-card";
import styles from "./cards.module.css";
import { StarMeCard } from "./star-me-card";
import { Card } from "./card";

export function Cards({ LinkElement }: PageNavigatorCardProps) {
  return (
    <div className={styles.cards}>
      <PageNavigatorCard LinkElement={LinkElement} />
      <Card href="https://react18-tools.github.io/nextjs-themes/" title="Docs" text="Explore the official docs." />
      <Card
        href="https://github.com/react18-tools/nextjs-themes"
        title="More Examples"
        text="Explore more examples on official GitHub Repo."
      />
      <StarMeCard />
    </div>
  );
}
