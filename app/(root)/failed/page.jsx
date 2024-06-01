import React from "react";
import "../success/style.scss";
import Link from "next/link";
import Image from "next/image";
import logo from "../../../public/assets/logo_white.svg";
import { FaArrowRightLong } from "react-icons/fa6";

const page = () => {
  return (
    <>
      <div className="success_container">
        <div className="headers">
          <div className="image">
            <Image src={logo} width={300} height={200} alt="logo" />
          </div>
          <h1>Payment failed!</h1>

          <Link className="link" href={"/orders"}>
            My orders <FaArrowRightLong />
          </Link>
        </div>
      </div>
    </>
  );
};

export default page;
