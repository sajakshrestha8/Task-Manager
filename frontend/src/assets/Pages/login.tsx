import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { URL } from "@/constants/enum";
import { login } from "@/service/login";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Bounce, toast, ToastContainer } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState(undefined);
  const navigate = useNavigate();

  const handleLogin = async () => {
    console.log(URL);
    const result = await login(navigate, email, password);
    console.log(result);

    setErrorMessage(result);
  };

  const notify = () => toast.warn(errorMessage);

  return (
    <>
      <div className="min-h-screen grid items-center justify-center">
        <div className="max-w-2xl border border-black p-[24px] rounded-xl flex gap-">
          <form
            action=""
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin();
            }}
          >
            <div className="grid gap-4">
              <div className="grid grid-row space-y-1">
                <div className="font-semibold tracking-tight text-2xl">
                  <label htmlFor="">Sign In</label>
                </div>
                <div className="text-sm text-muted-foreground">
                  <label htmlFor="">
                    Enter your email below to Login an account
                  </label>
                </div>
              </div>
              <div className="grid gap-2">
                <label
                  htmlFor="email"
                  className="text-sm font-medium leading-none "
                >
                  Email
                </label>
                <Input
                  type="email"
                  placeholder="Enter the Email"
                  name="email"
                  className="border border-gray-400"
                  required
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>
              <div className="grid gap-2">
                <label
                  htmlFor="password"
                  className="text-sm font-medium leading-none "
                >
                  Password
                </label>
                <Input
                  type="password"
                  placeholder="Enter the Password"
                  name="password"
                  className="border border-gray-400"
                  required
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </div>
              <div className="flex items-center ">
                <Button className="rounded-md w-full" onClick={notify}>
                  Sign In
                </Button>
                <ToastContainer
                  position="top-right"
                  autoClose={1000}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick={false}
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                  theme="dark"
                  transition={Bounce}
                />
              </div>
              <div>
                Dont have an account? <Link to={"/signup"}>Sign up</Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
