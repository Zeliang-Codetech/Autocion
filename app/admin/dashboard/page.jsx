import Image from "next/image";
import "./dashboard.scss";
import Link from "next/link";
import PrivateRoute from "../../../Routes/AdminRoute";
import {
  MdHandyman,
  MdShoppingCart,
  MdPeople,
  MdArrowForwardIos,
} from "react-icons/md";
const page = () => {
  const greetings = () => {
    const time = new Date().getHours();
    if (time > 16) {
      return "Good Evening.";
    } else if (time > 12) {
      return "Good afternoon.";
    } else {
      return "Good Morning.";
    }
  };

  const smallCard = [
    {
      image: <MdPeople />,
      numbers: "23",
      title: "Total users",
      bg: "#47C36326",
      color: "#47C363",
      alt: "Total users",
    },
    {
      image: <MdHandyman />,
      numbers: "23",
      title: "Total services",
      bg: "#00B9FF29",
      color: "#00B9FF",
      alt: "Total services",
    },
    {
      image: <MdShoppingCart />,
      numbers: "23",
      title: "Order statistics",
      bg: "#FFA42626",
      color: "#ffa53e",
      alt: "Order statistics ",
    },
  ];

  const topProviders = [
    {
      image: "/assets/maruti_suzuki.svg",
      title: "Maruti Suzuki",
    },
    {
      image: "/assets/maruti_suzuki.svg",
      title: "Maruti Suzuki",
    },
  ];

  return (
    <PrivateRoute>
      <div className="dashboard_container">
        <div className="dashboard_row_1">
          <div className="dashboard_col_1">
            <div
              style={{ backgroundColor: "#01b7de", color: "white" }}
              className="dashboard_small_card"
            >
              <p>{greetings()}</p>
              <h3>Hello, Admin</h3>
              <p style={{ fontSize: "13px" }}>
                View Your Current Sales & Summary.
              </p>
            </div>
            {smallCard.map((cards) => {
              return (
                <>
                  <div key={cards.title} className="dashboard_small_card">
                    <div className="dashboard_small_card_content">
                      <span
                        className="dashboard_icons"
                        style={{
                          backgroundColor: cards.bg,
                          color: cards.color,
                        }}
                      >
                        {cards.image}
                      </span>
                      <div>
                        <h2>{cards.numbers}</h2>
                        <h4>{cards.title}</h4>
                      </div>
                    </div>

                    <Link
                      className="dashboard_link"
                      style={{ backgroundColor: cards.bg, color: cards.color }}
                      href={cards.title}
                    >
                      {cards.title}
                      <MdArrowForwardIos />
                    </Link>
                  </div>
                </>
              );
            })}
          </div>
          <div className="dashboard_col_2">Graph</div>
        </div>
        <div className="dashboard_row_1">
          <div className="dashboard_col_3 ">
            <div className="top_providers_heading">
              <h1>Top providers</h1>
              <select name="orders" id="order">
                <option value="Orders">Orders</option>
                <option value="Ratings">Ratings</option>
              </select>
            </div>
            <div className="dashboard_row_1">
              {topProviders.map((data, index) => {
                return (
                  <div key={index} className="top_providers_card">
                    <Image
                      className="top_providers_image"
                      src={data.image}
                      alt={data.title}
                      width={60}
                      height={60}
                    />
                    <h3>{data.title}</h3>
                  </div>
                );
              })}
            </div>
            <div className="dashboard_row_2">
              <div>
                <h1>Top providers</h1>
              </div>
              <div>asd</div>
              <div>asd</div>
            </div>
          </div>
          <div className="dashboard_col_4">
            <div>
              <h1>Top providers</h1>
            </div>
            <div>asd</div>
            <div>asd</div>
          </div>
        </div>
      </div>
    </PrivateRoute>
  );
};

export default page;
