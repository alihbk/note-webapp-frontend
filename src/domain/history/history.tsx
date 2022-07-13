import { Link } from "react-router-dom";
import { getFromStorage } from "../../utility/storageService";
import styles from "./history.module.scss";
type Props = {};

const History = (props: Props) => {
  let historyData = getFromStorage("history");

  return (
    <div className={styles.main}>
      {historyData &&
        historyData?.map((x: any) => {
          return (
            <Link to={`/home/${x.username}`}>
              <div className={styles.item}>{x.username} </div>
            </Link>
          );
        })}
    </div>
  );
};

export default History;
