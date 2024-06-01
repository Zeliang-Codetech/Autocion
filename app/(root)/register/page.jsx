"use client";
import qs from "querystring";
import Image from "next/image";
import "../login/login.scss";
import { useState } from "react";
import { Toaster, toast } from "sonner";
import { useRouter } from "next/navigation";
const page = () => {
  const [userData, setUserData] = useState({
    fullname: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const Router = useRouter();

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setError(null);
      setIsLoading(true);
      const isMatched = userData.password === userData.confirmPassword;
      if (isMatched) {
        const formData = new URLSearchParams();
        formData.append("fullname", userData.fullname);
        formData.append("email", userData.email);
        formData.append("phone", userData.phone);
        formData.append("password", userData.password);

        const response = await fetch(
          `${process.env.API_KEY}/api/v1/create/user`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
            },
            body: formData.toString(),
          }
        );

        const data = await response.json();

        if (data.status === 1) {
          toast.success(data.message);
          setUserData({
            fullname: "",
            email: "",
            phone: "",
            password: "",
            confirmPassword: "",
          });
          Router.push("/login");
        } else {
          setError(data.message);
        }
      } else {
        setError("Passwords do not match");
      }
    } catch (error) {
      console.log(error);
      setError("Something went wrong, please try again."); // Generic error message
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = async (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
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
          <form method="POST">
            <input
              onChange={handleChange}
              name="fullname"
              type="text"
              placeholder="Fullname"
            />
            <input
              onChange={handleChange}
              name="email"
              type="email"
              placeholder="Email"
            />
            <input
              name="phone"
              onChange={handleChange}
              type="text"
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
            <input
              name="confirmPassword"
              onChange={handleChange}
              type="password"
              placeholder="Confirm Password"
            />
            <button disabled={isLoading} onClick={handleSubmit}>
              {isLoading ? "Signing Up..." : "Sign Up"}
            </button>
          </form>
          <p className="error">{error}</p>
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
