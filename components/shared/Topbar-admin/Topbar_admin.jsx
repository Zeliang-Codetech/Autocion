"use client";
import Image from "next/image";
import "./Topbar_admin.scss";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const Topbar_admin = () => {
  const router = useRouter();
  const handleLogout = () => {
    Cookies.remove("admin");
    router.push("/admin");
    toast.success("Logout succesfull");
  };
  return (
    <nav className="topbar_admin">
      <Image
        src={"/assets/logo_black.svg"}
        width={100}
        height={60}
        alt="logo"
        priority={true}
      />
      <div className="btn_container">
        <button onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
};

export default Topbar_admin;
