import React, { useState } from "react";
import "./cardItem.scss";
import { Link } from "react-router-dom";

function CardItem({ card }) {
  const examples = card.example?.split("\n") ?? [];

  return (
    <div className="card">
      <Link to={`card/${card.id}`} className="card__edit">
        View Detail &rarr;
      </Link>
      <div className="card__data">
        <div className="card__data--side card__data--front">
          <div className="card__data--front-en">{card.en}</div>{" "}
          <div className="card__data--front-pronunciation">
            {card.pronunciation}
          </div>
          <div className="card__data--front-examples">
            {/* {examples.map((example) => (
            <div>{example}</div>
          ))} */}
            {card.example}
          </div>
        </div>
        <div className="card__data--side card__data--back">
          <span className="card__data--back-tr">{card.tr}</span>
        </div>
      </div>
    </div>
  );
}

export default CardItem;
