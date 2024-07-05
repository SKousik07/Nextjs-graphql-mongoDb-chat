"use client"

import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import getDataFromToken from "@/helpers/getDataFromToken";
import SideBarContainer from "@/components/layout/SideBarContainer";
import MainContainer from "@/components/layout/MainContainer";
import { useUser } from "@/context";
import Loader from "@/components/common/Loader";
import { useQuery } from "@apollo/client";
import { GET_USER } from "@/constants";

export default function Home() {
  const router = useRouter();
  const { state, dispatch } = useUser()
  const token = sessionStorage.getItem("auth-token");

  const userData: any = token ? getDataFromToken(token) : null
  const { data, loading, error } = useQuery(GET_USER, {
    variables: {
      id: userData ? userData?.id : ''
    },
    skip: !userData
  })

  useEffect(() => {
    if (!token) {
      router.push("/login")
    }
  }, [token,router]);

  useEffect(() => {
    if (data && data.user) {
      dispatch({
        type: 'LOGIN',
        payload: {
          id: data.user.id,
          username: data.user.username,
          email: data.user.email
        }
      });
    }
  }, [data, dispatch]);

  useEffect(() => {
    const token = sessionStorage.getItem("auth-token");
    console.log("state-changed",state)
    if(!state.user && !token){
      router.push("/login")
    }
  }, [state])

  return (
    state.user ? (
      <main className="flex w-[100%] h-[100%] items-center justify-center">
        <SideBarContainer/>
        <MainContainer/>
      </main>
    )
    :
    <main className="flex w-100 h-screen items-center justify-center">
      <Loader size={60}/>
    </main>
  );
}
