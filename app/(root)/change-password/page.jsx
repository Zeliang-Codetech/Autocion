"use client";
import React, {useEffect,  useState } from "react";
import "./style.scss";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";
const page = () => {
  const [password, setPassword] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [error, setError] = useState(null);
  const router = useRouter();
 // Retrieve user data from localStorage if available
  let userObject = "";
  userObject = typeof window !== "undefined" ? localStorage.getItem("user") : "";
useEffect(()=>{
      if (userObject != undefined) {
      userObject = JSON.parse(userString);
    } 
}, []);

  // Extract userId from userObject if available
  const userId = userObject ? userObject.user._id : null;

  const handleChange = async (e) => {
    setPassword({ ...password, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { oldPassword, newPassword, confirmNewPassword } = password;

    // Check if new password and confirm new password match
    if (newPassword !== confirmNewPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const res = await axios.put(
        `${process.env.API_KEY}/api/v1/user/updatePassword/${userId}`,
        {
          oldPassword,
          newPassword,
        }
      );

      if (res.data.status === 1) {
        toast.success(res.data.message);
      }
      setTimeout(() => {
        router.push("/");
      }, 2000); //
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <>
      <div className="changePassForm">
        <h1>Change Password</h1>
        <form>
          <input
            onChange={handleChange}
            placeholder="Old Password"
            name="oldPassword"
            type="password"
          />
          <input
            onChange={handleChange}
            placeholder="New Password"
            name="newPassword"
            type="password"
          />
          <input
            placeholder="Confirm New Password"
            name="confirmNewPassword"
            type="password"
            onChange={handleChange}
          />
          <button onClick={handleSubmit} type="submit">
            Submit
          </button>
          <p className="error">{error}</p>
        </form>
      </div>
    </>
  );
};

export default page;
