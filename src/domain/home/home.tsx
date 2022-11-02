import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SearchBar } from "../../components/searchBar/searchBar";
import UserCard from "../../components/userCard/userCard";
import styles from "./home.module.scss";
import Button from '@mui/material/Button';

type Props = {};

const Home = (props: Props) => {
  const [username, setUsername] = useState<string>("");
  let params = useParams();

  useEffect(() => {
    if (params.usernameparam) {
      setUsername(params.usernameparam);
    }
  }, []);

  return (
    <div className={styles.main}>
      <SearchBar
        onSubmit={(e: string) => {
          console.log("e", e);
          setUsername(e);
        }}
      />
 <Button variant="contained">Hello World</Button>
      {username && <UserCard username={username} />}
    </div>
  );
};

export default Home;
