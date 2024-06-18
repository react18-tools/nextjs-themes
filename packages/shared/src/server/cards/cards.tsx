import styles from "./cards.module.scss";
import { Card, CardProps } from "./card";
import { ReactNode } from "react";

export const cards = [
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

/** Component to render cards */
export function Cards({ children }: { children?: ReactNode }) {
  return (
    <div className={styles.cards}>
      {children}
      {cards.map(card => (
        <Card key={card.href} {...card} />
      ))}
    </div>
  );
}
