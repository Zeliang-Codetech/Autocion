import Image from "next/image";
import "./login.scss";
import Link from "next/link";
const page = () => {
  return (
    <>
      <div className="login_container">
        <div className="login_image_container">
          <Image src={"/assets/logo_black.svg"} width={450} height={450} />
        </div>
        <div className="login_form">
          <form action="Post">
            <input type="number" placeholder="Mobile number" />
            <input type="password" placeholder="Password" />
            <button>Login</button>
            <button>Login with Google</button>
          </form>
          <div className="no_acc">
            Dont have an account?
            <Link href={"/register"}>Register</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
