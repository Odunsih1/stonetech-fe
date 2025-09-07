"use client";
import { useAppSelector } from "@/hooks/redux";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import AuthForm from "./AuthForm";

const AuthSection = () => {
  const router = useRouter();
  const user = useAppSelector((state) => state.auth.user);

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user, router]);

  if (user) {
    return null;
  }
  return <AuthForm />;
};

export default AuthSection;
