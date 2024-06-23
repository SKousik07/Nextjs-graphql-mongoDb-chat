"use client"

import { SIGNUP } from "@/constants";
import { useMutation } from "@apollo/client";
import { Telemetry } from "next/dist/telemetry/storage";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const Signup = () => {
  const router = useRouter()
  const [user,setUser] = useState({
    username: '',
    email: '',
    password: ''
  })
  const [signup, { data, loading, error }] = useMutation(SIGNUP);

  const handleClick = (route:string) => {
    router.push(route)
  }

  const handleChange = (e:any) => {
    setUser({...user, [e.target.name]:e.target.value})
  }

  const handleSubmit = async (e:any) => {
    e.preventDefault()
    console.log("signup-user", user)
    try {
      const response = await signup({
        variables: {
          email: user.email,
          password: user.password,
          username: user.username
        }
      })
      if(response.data?.signup?.success){
        router.push("/login")
        setUser({...user, username: '', email: '', password: ''})
      } 
      else{
        console.log("error",response.data?.signup?.message)
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="flex flex-col h-[100%] w-[100%] items-center justify-center rounded-[10px] shadow-md shadow-gray-700
                    sm:flex-row sm:h-[70%] sm:w-[80%]" >
      <div className="w-[100%] h-[100%] bg-secondary-dark rounded-l-none flex flex-col items-center justify-center text-white
                      sm:w-[50%] sm:rounded-l-[10px]">
          <h1 className="text-3xl font-bold">Hello, Friend!</h1>
          <p className="m-4 text-center">If you are already a member? let's Login now</p>
          <button onClick={()=> handleClick('/login')} className="border-2 border-white px-4 py-1 rounded-[30px] mt-2 text-md font-bold hover:bg-white hover:text-secondary-dark hover:border-secondary-dark " >
            LOGIN
          </button>
      </div>
      <div className="w-[100%] h-[100%] bg-white rounded-r-none flex flex-col items-center justify-center text-black 
                     sm:w-[50%] sm:rounded-r-[10px] ">
          <h1 className="text-3xl font-bold mb-6 mt-3">Sign Up</h1>
          <form className="flex flex-col items-center justify-center" onSubmit={handleSubmit}>
            <input name="username" onChange={(e)=>handleChange(e)} value={user.username} type="text" className="px-4 p-2 mb-4 outline-none border-2 border-gray-500 rounded-[30px]" placeholder="Username"/>
            <input name="email" onChange={(e)=>handleChange(e)} value={user.email} type="email" className="px-4 p-2 mb-4 outline-none border-2 border-gray-500 rounded-[30px]" placeholder="Email"/>
            <input name="password" onChange={(e)=>handleChange(e)} value={user.password} type="password" className="px-4 p-2 mb-4 outline-none border-2 border-gray-500 rounded-[30px]" placeholder="Password"/>
            <button className="border-2 border-white px-4 py-2 mb-2 rounded-[30px] mt-2 font-bold w-full bg-secondary-dark text-white hover:bg-secondary-light  disabled:pointer-events-none disabled:opacity-50"  disabled={ user.email === '' || user.password === '' || user.username === ''}>
              Signup
            </button>
          </form>       
      </div>
    </div>
  );
};

export default Signup