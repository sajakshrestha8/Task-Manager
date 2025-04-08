import { URL } from "@/constants/enum";
import axios, { AxiosError } from "axios";
import { NavigateFunction } from "react-router-dom";

export const signup = async (
  userName: string,
  email: string,
  password: string,
  navigate: NavigateFunction
) => {
  try {
    const res = await axios.post(`${URL}/user/register`, {
      username: userName,
      email: email,
      password: password,
    });

    navigate("/login");
    console.log(res);
    return res;
  } catch (error) {
    if (error instanceof AxiosError) {
      return error.response?.data;
      //   setErrorMessage(error.response?.data);
    }
  }
};
