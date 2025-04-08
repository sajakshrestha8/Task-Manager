import { URL } from "@/constants/enum";
import axios from "axios";

export const login = async (email: string, password: string) => {
  const res = await axios.post(`${URL}/user/login`, {
    email: email,
    password: password,
  });

  const token = res.data.token;
  localStorage.setItem("token", token);
  return res;
};
