"use client"

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import getDataFromToken from "@/helpers/getDataFromToken";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    const token = sessionStorage.getItem("auth-token");
    if (!token) {
      router.push("/login")
    }
    if(token){
      const userData = getDataFromToken(token)
      console.log("userData",userData)
    }
  }, []);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Home</h1>
    </main>
  );
}
