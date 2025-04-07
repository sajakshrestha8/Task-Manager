import axios, { AxiosError } from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:8000/user/login", {
        email: email,
        password: password,
      });

      const token = res.data.token;
      localStorage.setItem("token", token);

      navigate("/");
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error);
        setErrorMessage(error.response?.data);
      }
    }
  };

  return (
    <>
      {errorMessage ? <div className="text-red">{errorMessage}</div> : null}
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
