import React from "react";
import "./style.scss";
import Link from "next/link";
import Image from "next/image";
import logo from "../../../public/assets/logo_white.svg";

const page = () => {
  return (
    <>
      <div className="success_container">
        <div className="headers">
          <div className="image">
            <Image src={logo} width={300} height={200} alt="logo" />
          </div>
          <h1>Order completed!</h1>
          <h3>Thank you for choosing us.</h3>
          <Link className="link" href={"/orders"}>
            My orders
          </Link>
        </div>
      </div>
      ;
    </>
  );
};

export default page;
