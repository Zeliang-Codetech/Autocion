"use client";
import Image from "next/image";
import logo from "../../public/assets/logo_black.svg";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Cookies from "js-cookie";

export default function page() {
  const router = useRouter();
  const [user, setUser] = useState({
    phone: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const handleChange = (e) => {
    setUser(() => ({ ...user, [e.target.name]: e.target.value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const response = await fetch(`${process.env.API_KEY}/api/v1/login/user`, {
      method: "POST",
      headers: {
        Authorization: `token`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams(user).toString(),
    });
    const data = await response.json();
    if (data.status === 1) {
      if (data.user.role === "admin") {
        toast.success("Login successfull");
        setUser({ ...user });
        Cookies.set("admin", data.token);
        router.push("/admin/dashboard");
        return;
      } else {
        setError("Unauthorized");
      }
    } else {
      setError("Incorrect credentials, please try again.");
    }
  };
  return (
    <main className="admin_login_container">
      <div className="admin_login_card">
        <div>
          <Image src={logo} width={500} height={300} alt="logo" />
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
              onChange={handleChange}
              name="password"
              type="password"
              placeholder="Password"
            />
            <button disabled={isLoading} type="submit" onClick={handleSubmit}>
              {isLoading ? "Login In..." : "Login"}
            </button>
          </form>
          <p className="error">{error}</p>
        </div>
      </div>
    </main>
  );
}
