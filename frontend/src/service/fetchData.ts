import { URL } from "@/constants/enum";
import axios from "axios";

export const fetchData = async () => {
  const TOKEN = `Bearer ${localStorage.getItem("token")}`;
  const res = await axios.get(`${URL}/task/tasks`, {
    headers: {
      Authorization: TOKEN,
    },
  });
  console.log(res.data);

  return res.data;
};
