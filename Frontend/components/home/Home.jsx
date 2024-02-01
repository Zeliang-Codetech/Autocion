import Image from "next/image";
import "./Home.scss";

const Home = () => {
  return (
    <div className="home_container">
      <div className="home_slogan">
        <h1>
          HONK IF YOU <br /> <span>LOVE CAR SERVICE</span> <br /> AT YOUR <br />{" "}
          <span>DOORSTEP!</span>
        </h1>
        <p>Northeast India’s Leading Auto-mobile Service Company</p>
        <button>Book service</button>
      </div>
      <div className="car_image">
        <Image
          src={"/assets/car_landing.svg"}
          width={500}
          height={500}
          alt="car"
        />
      </div>
    </div>
  );
};

export default Home;
