"use client";
import Link from "next/link";
import "./Topbar.scss";
import Image from "next/image";
import { useRouter } from "next/navigation";
const Topbar = () => {
  const router = useRouter();

  const navigate = () => {
    router.push("/login");
  };

  return (
    <div className="topbar_container">
      <div className="topbar_logo">
        <Image
          src={"/assets/logo_white.svg"}
          width={100}
          height={50}
          alt="logo"
        />
      </div>
      <div className="topbar_links_container">
        <a className="topbar_links" href="/">
          HOME
        </a>

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
      <div>
        <button onClick={navigate}>Login</button>
      </div>
    </div>
  );
};

export default Topbar;
