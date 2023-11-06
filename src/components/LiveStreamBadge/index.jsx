import styles from "./LiveStreamBadge.module.css";
import { CiStreamOn } from "react-icons/ci";

export default function LiveStreamBadge() {
  return (
      <div className={styles.wrapper}>
        <CiStreamOn size={20} />
        <span> 실시간 </span>
      </div>
  );
}
