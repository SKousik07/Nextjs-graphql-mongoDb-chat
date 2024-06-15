"use client"

import { LOGIN } from "@/constants";
import { useQuery } from "@apollo/client";

export const Login = () => {
 const { loading, error, data } = useQuery(LOGIN)
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1>Login</h1>
      <p>DATA: {data?.login}</p>
    </div>
  );
};

export default Login