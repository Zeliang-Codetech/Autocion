"use client";
import Image from "next/image";
import "./Contact.scss";
import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { toast } from "sonner";

const Contact = () => {
  const [isLoading, setIsLoading] = useState(false);
  const form = useRef();
  const sendEmail = (e) => {
    e.preventDefault();
    setIsLoading(true);
    emailjs
      .sendForm(
        `${process.env.EMAIL_JS_SERVICE}`,
        `${process.env.TEMPLATE_CODE_1}`,
        form.current,
        {
          publicKey: `${process.env.EMAIL_JS_PUBLIC_KEY}`,
        }
      )
      .then(
        () => {
          toast.success("Email sent.");
          setIsLoading(false);
        },
        (error) => {
          console.log("FAILED...", error.text);
        }
      );
  };

  return (
    <div className="contact_container" id="contact">
      <h1>CONTACT</h1>
      <div className="contact_content">
        <div className="form">
          <form ref={form} onSubmit={sendEmail}>
            <input type="text" placeholder="Fullname" name="from_name" />
            <input type="email" placeholder="Email" name="from_email" />
            <input
              name="from_phone"
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              placeholder="Phone"
              maxLength="10"
              style={{
                WebkitAppearance: "none" /* Hide spin buttons in WebKit */,
                MozAppearance: "textfield" /* Hide spin buttons in Firefox */,
                appearance:
                  "textfield" /* Hide spin buttons in Edge and Safari */,
              }}
            />

            <textarea
              name="message"
              placeholder="Message"
              rows="10"
              cols="20"
            />
            <button> {isLoading ? "Submitting..." : "Submit"}</button>
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
