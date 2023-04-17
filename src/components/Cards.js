import CardItem from "./CardItem";
import { Outlet } from "react-router-dom";
import "./cards.scss";

function Cards({ cards }) {
  return (
    <>
      <Outlet />
      <div className="cards">
        {cards.map((card) => (
          <CardItem card={card} key={card.id} />
        ))}
      </div>
    </>
  );
}

export default Cards;
