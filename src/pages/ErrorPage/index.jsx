import styles from "./ErrorPage.module.css";

export default function ErrorPage({
  mainMessage = "죄송합니다! 문제가 발생했습니다.",
}) {
  return (
    <div className={styles.errorContainer}>
      <h2>{mainMessage}</h2>
      <p>
        잠시 후 다시 시도해 주세요. 문제가 지속될 경우 지원팀에 문의하십시오.
      </p>
    </div>
  );
}
