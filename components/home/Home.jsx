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
        <a className="tel" href="tel:18004192621">
          <button>Toll free: 1800 419 2621</button>
        </a>
      </div>
      <div className="car_image">
        <Image
          src={"/assets/car_landing.svg"}
          width={600}
          height={600}
          layout="responsive"
          alt="car"
        />
      </div>
    </div>
  );
};

export default Home;
