import styles from "./forkMe.module.css";

export default function ForkMe() {
  return (
    <a
      href="https://github.com/mayank1513/nextjs-themes"
      target="_blank"
      rel="noopener noreferrer"
      className={styles.ribbon}>
      Fork Me on GitHub
    </a>
  );
}
