"use client";
import Image from "next/image";
import { Children, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Cookies from "js-cookie";
import logo from "../public/assets/logo_black.svg";

const PrivateRoute = ({ children }) => {
  const isAuthenticated = Cookies.get("admin");
  const router = useRouter();
  if (!isAuthenticated) {
    router.push("/admin");
  }
  return children;
};
export default PrivateRoute;
