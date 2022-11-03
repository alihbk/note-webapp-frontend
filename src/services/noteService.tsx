import { axiosContext } from "../config/axiosContext";

class noteService {
  async post(data: any) {
    let result: any = await axiosContext().post(`${"/api/note"}`, data);
    return result;
  }

  async patch(data: any, id: any) {
    let result: any = await axiosContext().patch(`${"/api/note"}/${id}`, data);
    return result;
  }

  async get(filter: string) {
    let result: any = await axiosContext().get(`${"/api/note?"}${filter}`);
    return result;
  }

  async delete(id: any) {
    let result: any = await axiosContext().delete(`${"/api/note"}/${id}`);
    return result;
  }
}

export default new noteService();
