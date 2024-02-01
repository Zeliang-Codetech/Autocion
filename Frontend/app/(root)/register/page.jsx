import Image from "next/image";
import "../login/login.scss";
const page = () => {
  return (
    <>
      <div className="login_container">
        <div className="login_image_container">
          <Image src={"/assets/logo_black.svg"} width={450} height={450} />
        </div>
        <div className="login_form">
          <form action="Post">
            <input type="text" placeholder="Fullname" />
            <input type="email" placeholder="Email" />
            <input type="number" placeholder="Mobile number" />
            <input type="password" placeholder="Password" />
            <input type="password" placeholder="Confirm Password" />
            <button>Sign Up</button>
            <button>Sign-up with Google</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default page;
