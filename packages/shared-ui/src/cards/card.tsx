import styles from "./cards.module.css";

interface DocsProps {
  href: string;
  title: string;
  text: string;
}

export function Card({ href, title, text }: DocsProps) {
  return (
    <a className={styles.card} href={href} rel="noopener noreferrer" target="_blank">
      <h2>
        {title} <span>-&gt;</span>
      </h2>
      <p>{text}</p>
    </a>
  );
}
