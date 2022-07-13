import { useEffect, useState } from "react";
import { User } from "../entities/userModel";
import userService from "../services/userService";

export const useUsers = (userName: string) => {
  const [data, setData] = useState<User>();

  useEffect(() => {
    (async () => {
      try {
        let result = await userService.searchUser(userName);
        console.log("res", result);
        setData(result.data);
      } catch (e) {
        setData(undefined);
      }
    })();
  }, [userName]);

  return data;
};
