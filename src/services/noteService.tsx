import { axiosContext } from "../config/axiosContext";

class noteService {
  async createNote(data: any) {
    let result: any = await axiosContext().post(`${"/api/note"}`, data);
    return result;
  }

  async get() {
    let result: any = await axiosContext().get(`${"/api/note"}`);
    return result;
  }
}

export default new noteService();
