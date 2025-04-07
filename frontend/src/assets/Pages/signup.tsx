// import axios from "axios";
// import { useState } from "react";

const SignUp = () => {
  // const [user, setUser] = useState({
  //   username: username,
  //   email: email,
  //   password: password,
  // });
  // const handleSignUp = () => {
  //   axios
  //     .post("http://localhost:8000/user/register", {
  //       username: "Anjan Shrestha",
  //       email: "anjan@gmail.com",
  //       password: "anjan",
  //     })
  //     .then((res) => {
  //       console.log(res);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  return (
    <>
      <label htmlFor="email">Enter your UserName</label>
      <input type="text" placeholder="UserName" />
      <button>SignUp</button>
    </>
  );
};

export default SignUp;
