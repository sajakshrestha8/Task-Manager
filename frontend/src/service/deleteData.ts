import { URL } from "@/constants/enum";
import axios from "axios";

export const deleteData = async (id: number) => {
  const TOKEN = `Bearer ${localStorage.getItem("token")}`;

  const res = await axios.delete(`${URL}/task/tasks/${id}`, {
    headers: {
      Authorization: TOKEN,
    },
  });

  return res;
};
