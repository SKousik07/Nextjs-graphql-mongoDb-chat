"use client"
import { useRouter } from "next/navigation";
import "../../styles/Auth.css"
import { useEffect } from "react";
import getDataFromToken from "@/helpers/getDataFromToken";

export default function AuthLayout({
    children, 
  }: {
    children: React.ReactNode
  }) {
    
    const router = useRouter()

    useEffect(() => {
      const token = sessionStorage.getItem("auth-token");
      if (token) {
        router.push("/")
      }
    }, []);

    return (
      <main className="full-screen-center">
        {children}
      </main>
    )
  }