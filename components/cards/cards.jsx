import Image from "next/image";
import "./cards.scss";

export const BasicCard = ({ image, alt, children }) => {
  return (
    <div className="card">
      <div className="cardImage">
        <Image
          layout="responsive"
          src={image}
          alt={alt}
          width={80}
          height={80}
        />
      </div>
      <div className="card_children">
        <p>{children}</p>
      </div>
    </div>
  );
};
