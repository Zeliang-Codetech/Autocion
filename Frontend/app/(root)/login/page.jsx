"use client";
import Image from "next/image";
import "./login.scss";
import Link from "next/link";
import { Toaster, toast } from "sonner";
import { useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useAuth } from "../../../context/auth";
const page = () => {
  const [auth, setAuth] = useAuth();
  const [user, setUser] = useState({
    phone: "",
    password: "",
  });
  const router = useRouter();
  const [error, setError] = useState(null);
  const handleChange = (e) => {
    setUser(() => ({ ...user, [e.target.name]: e.target.value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      if (user.phone === "") {
        setError("Email field cannot be empty.");
        return;
      }
      if (user.password === "") {
        setError("Password field cannot be empty.");
        return;
      }
      const response = await fetch(`${process.env.API_KEY}/api/v1/login/user`, {
        method: "POST",
        headers: {
          Authorization: `token`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams(user).toString(),
      });
      const data = await response.json();
      console.log(data);
      if (data.status === 1) {
        toast.success("Login successfull");
        setAuth({ ...auth, fullname: data.fullname, token: data.token });
        localStorage.setItem("user", JSON.stringify(data));

        router.push("/");
      } else {
        if (data.message === "Login successful") {
          setError("");
        } else {
          setError(data.message);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="login_container">
        <div className="login_image_container">
          <Image
            src={"/assets/logo_black.svg"}
            width={450}
            height={450}
            alt="logo"
          />
        </div>
        <div className="login_form">
          <form action="Post">
            <input
              name="phone"
              onChange={handleChange}
              type="number"
              placeholder="Phone"
            />
            <input
              name="password"
              onChange={handleChange}
              type="password"
              placeholder="Password"
            />

            <button onClick={handleSubmit}>Login</button>
          </form>
          <p className={`${error ? "error" : "visibility_hidden"}`}>{error}</p>
          <div className="no_acc">
            Dont have an account?
            <Link href={"/register"}>Register</Link>
          </div>
        </div>
      </div>
      <Toaster
        toastOptions={{ className: "toast" }}
        position="top-center"
        richColors="true"
      />
    </>
  );
};

export default page;
