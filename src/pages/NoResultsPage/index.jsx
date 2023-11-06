import styles from "./NoResultsPage.module.css";

export default function NoResultsPage({
  mainMessage = "죄송합니다. 결과를 찾을 수 없습니다.",
  description
}) {
  return (
    <div className={styles.noResultsContainer}>
      <h2>{mainMessage}</h2>
      <p>{description}</p>
    </div>
  );
}
