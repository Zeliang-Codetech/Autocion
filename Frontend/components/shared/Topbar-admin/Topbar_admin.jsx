import Image from "next/image";
import "./Topbar_admin.scss";

const Topbar_admin = () => {
  return (
    <nav className="topbar_admin">
      <Image
        src={"/assets/logo_black.svg"}
        width={100}
        height={60}
        alt="logo"
        priority={true}
      />
    </nav>
  );
};

export default Topbar_admin;
