import { useUsers } from "../../hooks/useUsers";
import styles from "./userCard.module.scss";
type Props = { username: string };

const UserCard = (props: Props) => {
  let data = useUsers(props.username);
  return (
    <div className={styles.main}>
      {data ? (
        <>
          <img src={data?.avatar_url} alt="logo" />
          <h2>{data?.name}</h2>
          <h3>{data?.bio}</h3>
          <h4>
            <a target={"_blank"} href={data?.html_url}>
              {data?.html_url}
            </a>
          </h4>
        </>
      ) : (
        "User Not Found"
      )}
    </div>
  );
};

export default UserCard;
