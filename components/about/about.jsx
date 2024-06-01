import Image from "next/image";
import "./about.scss";

const aboutData = [
  {
    id: "1",
    title: "DOORSTEP SERVICE",
    content: "We service/repair at your desired location.",
    image: "/assets/doorstep.svg",
  },
  {
    id: "2",
    title: "LUXURY CARS",
    content:
      "We service/repair luxury vehicles (Eg. BMW, Mercedes, Jaguar etc.)",
    image: "/assets/car.svg",
  },
  {
    id: "3",
    title: "ANY SEGMENT CAR",
    content: "We deal with LMV, MMV and HMV",
    image: "/assets/Hybrid.svg",
  },
  {
    id: "4",
    title: "100% TRANSPARENCY",
    content: "We maintain transparency in billing and parts requirements.",
    image: "/assets/transparent.svg",
  },
  {
    id: "5",
    title: "TIME-EFFICENT",
    content: "We deliver in the committed date",
    image: "/assets/Clock.svg",
  },
  {
    id: "6",
    title: "COST-EFFECTIVE",
    content: "We charge customers fairly",
    image: "/assets/cost.svg",
  },
];
const about = () => {
  return (
    <div className="about_container" id="about">
      <h1>WHY AUTOCION?</h1>
      <div className="about_content">
        {aboutData.map((data) => {
          return (
            <div key={data.id} className="aboutCard">
              <div className="aboutImage">
                <Image
                  layout="responsive"
                  src={data.image}
                  width={0}
                  height={0}
                  alt="image"
                />
              </div>
              <h5>{data.title}</h5>
              <p>{data.content}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default about;
