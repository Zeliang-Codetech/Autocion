"use client";
import Link from "next/link";
import "./Topbar.scss";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAuth } from "../../../context/auth";
import { useEffect, useState } from "react";
import defaultDp from "../../../public/assets/Avatar.png";

import {
  MdLogout,
  MdOutlinePerson,
  MdOutlineShoppingCart,
} from "react-icons/md";
import { PiPackageLight } from "react-icons/pi";
import axios from "axios";

const Topbar = () => {
  const [auth, setAuth] = useAuth();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState("");

  const [cart, setCart] = useState([]);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const navigate = () => {
    router.push("/login");
  };

  const handleNavigate = (url) => {
    navigate(url);

    toggleDropdown();
  };

  const getCartByUser = async () => {
    try {
      const res = await axios.get(
        `${process.env.API_KEY}/api/v1/get/user/${auth.userId}`
      );
      setCart(res.data.cart);
      setUserData(res.data.message);
    } catch (error) {
      console.error("Error fetching cart data:", error);
    }
  };
  useEffect(() => {
    getCartByUser();
  }, [cart]);

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("user");
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    toast.success("Logout Successfull");
    toggleDropdown();
  };

  useEffect(() => {
    setIsLoading(false);
  }, []);

  return (
    <>
      <div className="topbar_container">
        <div className="topbar_logo">
          <Image
            src={"/assets/logo_white.svg"}
            width={150}
            height={100}
            alt="logo"
          />
        </div>
        <div className="topbar_links_container">
          <Link className="topbar_links" href="/">
            HOME
          </Link>

          <Link className="topbar_links" href="#services">
            SERVICES
          </Link>
          <Link className="topbar_links" href="#about">
            ABOUT
          </Link>

          <Link className="topbar_links" href="#contact">
            CONTACT
          </Link>
        </div>
        {auth.token ? (
          <>
            <div className="profile-dropdown">
              <div className="dp_container" onClick={toggleDropdown}>
                {auth.image ? (
                  <Image
                    className="dp"
                    onClick={toggleDropdown}
                    src={auth.image}
                    alt={"profile_pic"}
                    width={40}
                    height={40}
                  />
                ) : (
                  <Image
                    className="dp"
                    src={defaultDp}
                    alt={"profile_pic"}
                    width={40}
                    height={40}
                  />
                )}
              </div>
              {isOpen && (
                <div className="dropdown_links_container">
                  <h4>{userData}</h4>
                  <hr />
                  <Link
                    className="dropdown_links"
                    onClick={(e) => handleNavigate(e)}
                    href="/profile"
                  >
                    <MdOutlinePerson /> My Profile
                  </Link>
                  <hr />
                  <Link
                    className="dropdown_links"
                    onClick={handleNavigate}
                    href="/orders"
                  >
                    <PiPackageLight /> Orders
                  </Link>
                  <hr />

                  <Link
                    className="dropdown_links"
                    onClick={handleNavigate}
                    href="/cart"
                  >
                    <MdOutlineShoppingCart />
                    Cart ({cart?.length})
                  </Link>

                  <hr />
                  <Link
                    onClick={handleLogout}
                    className="dropdown_links"
                    href="/"
                  >
                    <MdLogout /> Logout
                  </Link>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            {!isLoading ? (
              <button className="login_btn" onClick={navigate}>
                Login
              </button>
            ) : (
              <p style={{ color: "white" }}>Loading..</p>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Topbar;
