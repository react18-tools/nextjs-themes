import styles from "./cards.module.scss";
import { Card, CardProps } from "./card";
import { ReactNode } from "react";

/** Component to render cards */
export function Cards({ cards, children }: { cards: CardProps[]; children: ReactNode }) {
  return (
    <div className={styles.cards}>
      {children}
      {cards.map(card => (
        <Card key={card.href} {...card} />
      ))}
    </div>
  );
}
