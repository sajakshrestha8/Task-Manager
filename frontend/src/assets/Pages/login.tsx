import axios from "axios";
import { useState } from "react";

interface props {
  checkAuth?: () => void;
}

const Login = (props: props) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = async () => {
    const res = await axios.post("http://localhost:8000/user/login", {
      email: email,
      password: password,
    });

    const token = res.data.token;
    localStorage.setItem("token", token);

    props?.checkAuth?.();
  };
  return (
    <>
      <form action="">
        <label htmlFor="email">Enter the Email</label>
        <input
          type="text"
          placeholder="Email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <label htmlFor="password">Enter the password</label>
        <input
          type="password"
          placeholder="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button
          onClick={(e) => {
            e.preventDefault();
            handleLogin();
          }}
        >
          Login
        </button>
      </form>
    </>
  );
};

export default Login;
