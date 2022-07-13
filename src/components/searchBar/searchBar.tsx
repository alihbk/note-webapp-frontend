import { useState } from "react";
import { getFromStorage, saveToStorage } from "../../utility/storageService";
import Loading from "../loading/loading";
import styles from "./searchBar.module.scss";

type Props = {
  onSubmit: Function;
};

export const SearchBar = (props: Props) => {
  const [username, setUsername] = useState<string>();
  const [showLoading, setShowLoading] = useState(false);
  return showLoading ? (
    <Loading />
  ) : (
    <div className={styles.form}>
      <input
        type="text"
        name="username"
        value={username}
        onChange={(e) => {
          setUsername(e.target.value);
        }}
      />{" "}
      <button
        onClick={() => {
          setShowLoading(true);

          let newHistory = {
            id: Math.floor(Math.random() * (1000000 + 1)),
            username: username,
          };

          let cachedHistory = getFromStorage("history");
          if (cachedHistory) {
            cachedHistory.unshift(newHistory);
          } else {
            cachedHistory = [newHistory];
          }

          saveToStorage("history", cachedHistory);

          props.onSubmit(username);

          setShowLoading(false);
        }}
      >
        {"Search"}
      </button>
    </div>
  );
};
