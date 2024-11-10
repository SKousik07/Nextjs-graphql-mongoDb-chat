"use client";

import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import getDataFromToken from "@/helpers/getDataFromToken";
import SideBarContainer from "@/components/layout/SideBarContainer";
import MainContainer from "@/components/layout/MainContainer";
import { useUser } from "@/context";
import Loader from "@/components/common/Loader";
import { useQuery, useSubscription } from "@apollo/client";
import { GET_USER, HELLO } from "@/constants";
import { MESSAGE_SENT_SUBSCRIPTION } from "@/constants";

export default function Home() {
  const router = useRouter();
  const { state, dispatch } = useUser();
  const [token, setToken] = useState<string | null>(null);
  const [isTokenLoaded, setIsTokenLoaded] = useState(false);

  useEffect(() => {
    const authToken = sessionStorage.getItem("auth-token");
    setToken(authToken);
    setIsTokenLoaded(true);
  }, [router]);

  const userData: any = token ? getDataFromToken(token) : null;
  const { data, loading, error } = useQuery(GET_USER, {
    variables: {
      id: userData ? userData?.id : "",
    },
    skip: !userData,
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    if (data && data.user.username) {
      dispatch({
        type: "LOGIN",
        payload: {
          id: data.user.id,
          username: data.user.username,
          email: data.user.email,
        },
      });
    }
  }, [data]);

  const handleLogout = () => {
    // sessionStorage.removeItem("auth-token");
    setToken(null);
    dispatch({ type: "LOGOUT" });
  };

  useEffect(() => {
    if (isTokenLoaded && !token) {
      router.push("/login");
    }
  }, [isTokenLoaded, token, router]);

  return state.user ? (
    <main className="flex w-[100%] h-[100%] items-center justify-center">
      <SideBarContainer onLogOut={handleLogout} />
      <MainContainer user={state?.user} selectedUser={state?.selectedUser} />
    </main>
  ) : (
    <main className="flex w-100 h-screen items-center justify-center">
      <Loader size={60} />
    </main>
  );
}
