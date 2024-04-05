import React, { useState, useRef } from "react";
import { BasicCard } from "../cards/cards";
import "./HeavyVehicle.scss";

import emailjs from "@emailjs/browser";
import Modal from "../modal/Modal";
import { toast } from "sonner";

const HeavyVehicle = () => {
  const [isLoading, setIsLoading] = useState(false);
  const form = useRef();
  const sendEmail = (e) => {
    e.preventDefault();
    setIsLoading(true);
    emailjs
      .sendForm(
        `${process.env.EMAIL_JS_SERVICE}`,
        `${process.env.TEMPLATE_CODE_2}`,
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
  const [popUp, setPopUp] = useState(false);

  const HMVData = [
    {
      id: "1",
      name: "HVM Parts",
      image: "/assets/excavator.svg",
    },
    {
      id: "2",
      name: "HVM Services",
      image: "/assets/construction.svg",
    },
    {
      id: "3",
      name: "Towing",
      image: "/assets/construction.svg",
    },
  ];
  return (
    <div className="hvm_container" id="services">
      <h1>HEAVY MOTOR VEHICLES</h1>
      <div className="hvm_content">
        {HMVData.map((data, index) => {
          return (
            <div
              key={index}
              className="hvm_card"
              onClick={() => setPopUp(true)}
            >
              <BasicCard image={data.image} alt={data.name}>
                {data.name}
              </BasicCard>
            </div>
          );
        })}
      </div>

      <Modal open={popUp} onClose={() => setPopUp(false)}>
        <div className="modal_container detail_modal">
          <h2 style={{ textAlign: "center", paddingBottom: "1rem" }}>
            Enquiry
          </h2>

          <form className="hvm_form" ref={form} onSubmit={sendEmail}>
            <input placeholder="Name" name="from_name" />
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              placeholder="Phone"
              maxLength="10"
              name="from_phone"
              style={{
                WebkitAppearance: "none" /* Hide spin buttons in WebKit */,
                MozAppearance: "textfield" /* Hide spin buttons in Firefox */,
                appearance:
                  "textfield" /* Hide spin buttons in Edge and Safari */,
              }}
            />
            <input placeholder="Email" name="from_email" />
            <input placeholder="Vehicle Details" name="vehicle_details" />
            <input placeholder="Location" name="location" />

            <div className="action_btn">
              <button
                disabled={isLoading}
                style={{ width: "100%" }}
                className="edit_btn"
              >
                {isLoading ? "Sending..." : "Send"}
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default HeavyVehicle;
