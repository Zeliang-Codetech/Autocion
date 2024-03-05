import Image from "next/image";
import "./Contact.scss";

const Contact = () => {
  return (
    <div className="contact_container" id="contact">
      <h1>CONTACT</h1>
      <div className="contact_content">
        <div className="form">
          <form action="POST">
            <input type="text" placeholder="Fullname" />
            <input type="email" placeholder="Email" />
            <input type="number" placeholder="Phone" />
            <textarea rows="10" cols="20" />
            <button>Submit</button>
          </form>
        </div>
        <div className="image">
          <Image
            src={"/assets/engine.svg"}
            width={300}
            height={300}
            alt="image"
          />
          <p>
            Address:H-Apartments, 2nd Floor, Zion Hospital road, House.no :
            1329, Jorapukhri, East Dimapur - 797116, Nagaland.
          </p>
          <div className="contact_details">
            <p>+91 936 603 0992 </p>
            <p>info@autocion.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
