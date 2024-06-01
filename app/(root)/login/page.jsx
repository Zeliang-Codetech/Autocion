"use client";
import Image from "next/image";
import "./login.scss";
import Link from "next/link";
import { Toaster, toast } from "sonner";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../../context/auth";
const page = () => {
  const [auth, setAuth] = useAuth();
  const [user, setUser] = useState({
    phone: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [error, setError] = useState(null);
  const handleChange = (e) => {
    setUser(() => ({ ...user, [e.target.name]: e.target.value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
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
          Authorization: process.env.TOKEN,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams(user).toString(),
      });
      const data = await response.json();

      if (data.status === 1) {
        toast.success("Login successful");
        setAuth({
          ...auth,
          fullname: data.user.fullname, // Access fullname from data.user
          token: data.token, // Access token from data
        });

        // Store user data in localStorage
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
            layout="responsive"
            width={450}
            height={450}
            alt="logo"
          />
        </div>
        <div className="login_form">
          <form action="Post">
            <input
              name="phone"
              type="text"
              onChange={handleChange}
              inputMode="numeric"
              pattern="[0-9]*"
              placeholder="Phone"
              maxLength="10"
              style={{
                WebkitAppearance: "none" /* Hide spin buttons in WebKit */,
                MozAppearance: "textfield" /* Hide spin buttons in Firefox */,
                appearance:
                  "textfield" /* Hide spin buttons in Edge and Safari */,
              }}
            />
            <input
              name="password"
              onChange={handleChange}
              type="password"
              placeholder="Password"
            />

            <button disabled={isLoading} onClick={handleSubmit}>
              {" "}
              {isLoading ? "Login in..." : "Login"}
            </button>
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
