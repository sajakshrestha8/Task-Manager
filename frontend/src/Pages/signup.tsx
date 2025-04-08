import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signup } from "@/service/signup";
import { AxiosError } from "axios";
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
      await signup(userName, email, password);
      navigate("/login");
    } catch (error) {
      if (error instanceof AxiosError) {
        setErrorMessage(error.response?.data.message);
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

      <div className="min-h-screen grid items-center justify-center ">
        <div className="max-w-2xl  p-[24px] rounded-xl flex border border-black">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSignUp();
            }}
          >
            <div className="grid gap-4">
              <div className="grid grid-row space-y-1">
                <div className="font-semibold tracking-tight text-2xl">
                  <label htmlFor="">Create an account</label>
                </div>
                <div className="text-sm text-muted-foreground">
                  <label htmlFor="">
                    Enter your email below to create an account
                  </label>
                </div>
              </div>
              <div className="grid gap-2">
                <label
                  htmlFor="username"
                  className="text-sm font-medium leading-none "
                >
                  Full Name
                </label>
                <Input
                  type="text"
                  placeholder="Enter the Username"
                  name="username"
                  className="border border-gray-400"
                  onChange={(e) => handleUserName(e.target.value)}
                  required
                />
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
                  onChange={(e) => handleEmail(e.target.value)}
                  required
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
                  onChange={(e) => handlePassword(e.target.value)}
                  required
                />
              </div>
              <div className="flex items-center ">
                <Button className="rounded-md w-full">Sign Up</Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;
