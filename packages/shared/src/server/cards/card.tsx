import { ComponentType, FC, HTMLProps } from "react";
import styles from "./cards.module.scss";

export interface CardProps {
  href: string;
  title: string;
  description: string;
  linkComponent?: unknown;
}

/** Display component */
export function Card({ href, title, description, linkComponent }: CardProps) {
  const Link = (linkComponent || "a") as FC<{ to?: string } & HTMLProps<HTMLAnchorElement>>;
  return (
    <Link
      className={styles.card}
      href={href}
      rel="noopener noreferrer"
      target={linkComponent ? "" : "_blank"}>
      <h2>
        {title} <span>-&gt;</span>
      </h2>
      <p>{description}</p>
    </Link>
  );
}
