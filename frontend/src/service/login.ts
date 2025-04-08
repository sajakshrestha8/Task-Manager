import { URL } from "@/constants/enum";
import axios, { AxiosError } from "axios";

export const login = async (navigate, email: string, password: string) => {
  try {
    const res = await axios.post(`${URL}/user/login`, {
      email: email,
      password: password,
    });

    const token = res.data.token;
    localStorage.setItem("token", token);
    navigate("/");
    return res;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log(error);
      return error.response?.data;
    }
  }
};
