import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios, { AxiosError } from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [userName, setUserName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async () => {
    try {
      const res = await axios.post("http://localhost:8000/user/register", {
        username: userName,
        email: email,
        password: password,
      });

      navigate("/login");
      console.log(res);
    } catch (error) {
      if (error instanceof AxiosError) {
        setErrorMessage(error.response?.data);
      }
    }
  };

  const handleUserName = (value: string) => {
    setUserName(value);
  };

  const handleEmail = (value: string) => {
    setEmail(value);
  };

  const handlePassword = (value: string) => {
    setPassword(value);
  };

  return (
    <>
      {errorMessage ? <div>{errorMessage}</div> : null}
      <label htmlFor="username">UserName</label>
      <Input
        type="text"
        placeholder="UserName"
        onChange={(e) => handleUserName(e.target.value)}
      />
      <label htmlFor="email">Email</label>
      <Input
        type="email"
        placeholder="Email"
        onChange={(e) => handleEmail(e.target.value)}
      />
      <label htmlFor="password">Password</label>
      <Input
        type="password"
        placeholder="password"
        onChange={(e) => handlePassword(e.target.value)}
      />
      <Button
        onClick={(e) => {
          e.preventDefault();
          handleSignUp();
        }}
      >
        SignUp
      </Button>
    </>
  );
};

export default SignUp;
