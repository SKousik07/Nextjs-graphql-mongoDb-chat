"use client"

import { LOGIN } from "@/constants";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const Login = () => {
 const { loading, error, data } = useQuery(LOGIN)
 const [user,setUser] = useState({
  email: '',
  password: ''
 })
 const router = useRouter()

  const handleClick = (route:string) => {
    router.push(route)
  }

  const handleChange = (e:any) => {
    setUser({...user, [e.target.name]:e.target.value})
  }

  const handleSubmit = (e:any) => {
    e.preventDefault()
    console.log("login-user", user)
  }
  return (
    <div className="flex flex-col h-[100%] w-[100%] items-center justify-center rounded-[10px] shadow-md shadow-gray-700
                    sm:flex-row sm:h-[70%] sm:w-[80%]" >
      <div className="w-[100%] h-[100%] bg-white rounded-l-none flex flex-col items-center justify-center text-black 
                     sm:w-[50%] sm:rounded-l-[10px] ">
          <h1 className="text-3xl font-bold mb-6">Login</h1>
          <form className="flex flex-col items-center justify-center" onSubmit={handleSubmit}>
            <input name="email" onChange={(e)=>handleChange(e)} value={user.email} type="email" className="px-4 p-2 mb-4 outline-none border-2 border-gray-500 rounded-[30px]" placeholder="Email"/>
            <input name="password" onChange={(e)=>handleChange(e)} value={user.password} type="password" className="px-4 p-2 mb-4 outline-none border-2 border-gray-500 rounded-[30px]" placeholder="Password"/>
            <button  className="border-2 border-white px-4 py-2 rounded-[30px] mt-2 font-bold w-full bg-secondary-dark text-white hover:bg-secondary-light" >
              LOGIN
            </button>
          </form>       
      </div>
      <div className="w-[100%] h-[100%] bg-secondary-dark rounded-r-none flex flex-col items-center justify-center text-white
                      sm:w-[50%] sm:rounded-r-[10px]">
          <h1 className="text-3xl font-bold">Welcome Back!</h1>
          <p className="m-4 text-center">Don't have an account? Start your journey now</p>
          <button onClick={()=> handleClick('/signup')} className="border-2 border-white px-4 py-1 rounded-[30px] mt-2 text-md font-bold hover:bg-white hover:text-secondary-dark hover:border-secondary-dark " >
            SIGN UP
          </button>
      </div>
    </div>
  );
};

export default Login