import { URL } from "@/constants/enum";
import axios, { AxiosError } from "axios";

export const fetchData = async (navigate) => {
  const TOKEN = `Bearer ${localStorage.getItem("token")}`;
  try {
    const res = await axios.get(`${URL}/task/tasks`, {
      headers: {
        Authorization: TOKEN,
      },
    });
    console.log(res.data);

    return res.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.status === 403) {
        localStorage.clear();
        navigate("/login");
      }
    }
    console.log(error);
  }
};
