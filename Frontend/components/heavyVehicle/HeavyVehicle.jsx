import React, { useState } from "react";
import { BasicCard } from "../cards/cards";
import "./HeavyVehicle.scss";
import Modal from "../modal/Modal";

const HeavyVehicle = () => {
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

          <form className="hvm_form">
            <input placeholder="Name" />
            <input placeholder="Contact Details" />
            <input placeholder="Email" />
            <input placeholder="Vehicle Details" />
            <input placeholder="Location" />

            <div className="action_btn">
              <button style={{ width: "100%" }} className="edit_btn">
                Submit
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default HeavyVehicle;
