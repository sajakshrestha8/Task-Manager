import { URL } from "@/constants/enum";
import axios from "axios";

export const addTask = async (title: string, description: string) => {
  const TOKEN = `Bearer ${localStorage.getItem("token")}`;

  const res = await axios.post(
    `${URL}/task/tasks`,
    {
      title: title,
      description: description,
    },
    {
      headers: {
        Authorization: TOKEN,
      },
    }
  );
  console.log(res);
  return res;
};
