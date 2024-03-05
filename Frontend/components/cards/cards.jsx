import Image from "next/image";
import "./cards.scss";

export const BasicCard = ({ image, alt, children }) => {
  return (
    <div className="card">
      <Image src={image} alt={alt} width={80} height={80} />
      <div className="card_children">
        <div>{children}</div>
      </div>
    </div>
  );
};
