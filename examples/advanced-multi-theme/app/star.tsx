import { ForkMe } from "@mayank1513/fork-me/server";
import { StarMe } from "@mayank1513/fork-me";
import styles from "./page.module.css";

export default function Star() {
  const url = `https://github.com/mayank1513/nestjs-themes`;
  return (
    <>
      <StarMe gitHubUrl={url} className={styles.card}>
        <h2>
          Star this repo <span>-&gt;</span>
        </h2>
        <p>Star this repo for your new library!</p>
      </StarMe>
      <ForkMe gitHubUrl={url} bgColor="var(--text-color)" textColor="var(--bg-color)" />
    </>
  );
}
