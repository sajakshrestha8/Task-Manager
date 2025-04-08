import { URL } from "@/constants/enum";
import axios from "axios";

export const signup = async (
  userName: string,
  email: string,
  password: string
) => {
  const res = await axios.post(`${URL}/user/register`, {
    username: userName,
    email: email,
    password: password,
  });

  return res;
};
