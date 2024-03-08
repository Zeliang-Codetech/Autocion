"use client";
import Link from "next/link";
import "./Topbar.scss";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAuth } from "../../../context/auth";
import { useEffect, useState } from "react";
import defaultDp from "../../../public/assets/Avatar.png";
import { RiMenu3Line, RiInformationLine } from "react-icons/ri";
import { GoTools } from "react-icons/go";
import { MdOutlineClose, MdOutlineHome, MdOutlineMail } from "react-icons/md";
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

  const [menu, setMenu] = useState(false);

  const toggleMenu = () => {
    setMenu(!menu);
  };

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
  useEffect(() => {
    getCartByUser();
  }, [auth.userId]);

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
        {auth && auth.token ? (
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
                <>
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
                      Cart
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
                </>
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
      {/**Mobile Navbar */}
      <div className="topbar_mobile">
        <div className="topbar_logo">
          <Image
            src={"/assets/logo_white.svg"}
            width={100}
            height={100}
            alt="logo"
          />
        </div>

        {!menu && (
          <RiMenu3Line
            onClick={toggleMenu}
            style={{ color: "white", cursor: "pointer", fontSize: "30px" }}
          />
        )}

        {menu && (
          <div className="menu_container" onClick={toggleMenu}>
            <div className="menuContents">
              <MdOutlineClose
                style={{
                  cursor: "pointer",
                  fontSize: "30px",
                  padding: "10px",
                  marginLeft: "auto",
                }}
              />

              {auth && auth.token ? (
                <>
                  <div className="profile-dropdown">
                    <div className="dp_container" onClick={toggleDropdown}>
                      {auth.image ? (
                        <Image
                          className="dp"
                          onClick={toggleDropdown}
                          src={auth.image}
                          alt={"profile_pic"}
                          width={50}
                          height={50}
                        />
                      ) : (
                        <Image
                          className="dp"
                          src={defaultDp}
                          alt={"profile_pic"}
                          width={50}
                          height={50}
                        />
                      )}
                    </div>

                    <div className="dropdown_links_container">
                      <h4>{userData}</h4>
                      <div className="topbar_links_container">
                        <Link className="topbar_links" href="/">
                          <MdOutlineHome /> Home
                        </Link>
                        <hr />
                        <Link className="topbar_links" href="#services">
                          <GoTools /> Services
                        </Link>
                        <hr />
                        <Link className="topbar_links" href="#about">
                          <RiInformationLine /> About
                        </Link>
                        <hr />
                        <Link className="topbar_links" href="#contact">
                          <MdOutlineMail /> Contact
                        </Link>
                      </div>
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
                        Cart
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
                  </div>
                </>
              ) : (
                <>
                  <div className="loginContainerMobile">
                    <div className="topbar_links_container">
                      <Link className="topbar_links" href="/">
                        <MdOutlineHome /> Home
                      </Link>
                      <hr />
                      <Link className="topbar_links" href="#services">
                        <GoTools /> Services
                      </Link>
                      <hr />
                      <Link className="topbar_links" href="#about">
                        <RiInformationLine /> About
                      </Link>
                      <hr />
                      <Link className="topbar_links" href="#contact">
                        <MdOutlineMail /> Contact
                      </Link>
                    </div>
                    <h4 className="pleaseLogin">Please login to continue</h4>
                    <button className="login_btn" onClick={navigate}>
                      Login
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Topbar;
