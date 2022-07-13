import { axiosContext } from "../config/axiosContext";

class userService {
  async searchUser(username: string) {
    let result: any = await axiosContext().get(`${"users"}/${username}`);
    return result;
  }
}

export default new userService();
