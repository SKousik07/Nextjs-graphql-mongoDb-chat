"use client";

import Loader from "@/components/common/Loader";
import { LOGIN } from "@/constants";
import { storeSessionToken } from "@/helpers/sessionTokenManager";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Login = () => {
  const [login, { data, loading, error }] = useMutation(LOGIN);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();

  const handleClick = (route: string) => {
    router.push(route);
  };

  const handleChange = (e: any) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const response = await login({
      variables: {
        email: user.email,
        password: user.password,
      },
    });
    if (response.data?.login?.success) {
      storeSessionToken(response.data?.login?.token);
      router.push("/");
      setUser({ ...user, email: "", password: "" });
    } else {
      console.log("error", response.data?.login?.message);
    }
  };
  return (
    <div
      className="flex flex-col h-[100%] w-[100%] items-center justify-center rounded-[10px] shadow-md shadow-gray-700
                    sm:flex-row sm:h-[70%] sm:w-[80%]"
    >
      <div
        className="w-[100%] h-[100%] bg-white rounded-l-none flex flex-col items-center justify-center text-black 
                     sm:w-[50%] sm:rounded-l-[10px] "
      >
        <h1 className="text-3xl font-bold mb-6">Login</h1>
        <form
          className="flex flex-col items-center justify-center"
          onSubmit={handleSubmit}
        >
          <input
            name="email"
            onChange={(e) => handleChange(e)}
            value={user.email}
            type="email"
            className="px-4 p-2 mb-4 w-full outline-none rounded-[10px] bg-gray-100"
            placeholder="Email"
          />
          <input
            name="password"
            onChange={(e) => handleChange(e)}
            value={user.password}
            type="password"
            className="px-4 p-2 mb-4 w-full outline-none rounded-[10px] bg-gray-100"
            placeholder="Password"
          />
          <button
            className="border-2 border-white px-4 py-2 rounded-[30px] mt-2 font-bold w-full bg-tertiary-dark text-white hover:opacity-80  disabled:pointer-events-none disabled:opacity-50"
            disabled={user.email === "" || user.password === ""}
          >
            {!loading ? "LOGIN" : <Loader />}
          </button>
        </form>
      </div>
      <div
        className="w-[100%] h-[100%] bg-tertiary-dark rounded-r-none flex flex-col items-center justify-center text-white
                      sm:w-[50%] sm:rounded-r-[10px]"
      >
        <h1 className="text-3xl font-bold">Welcome Back!</h1>
        <p className="m-4 text-center">
          Don't have an account? Start your journey now
        </p>
        <button
          onClick={() => handleClick("/signup")}
          className="border-2 border-white px-4 py-1 rounded-[30px] mt-2 text-md font-bold hover:bg-white hover:text-tertiary-dark hover:border-tertiary-dark "
        >
          SIGN UP
        </button>
      </div>
    </div>
  );
};

export default Login;
