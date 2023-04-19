import { useContext } from "react";
import CardItem from "./CardItem";
import { Outlet } from "react-router-dom";
import VocabularyContext from "../store/vocabulary-context";
import { selectAllVocabularies } from "../store/vocabulary-context";
import "./cards.scss";

function Cards() {
  const vocabContext = useContext(VocabularyContext);
  const vocabularies = vocabContext.getAllVocabularies();
  return (
    <>
      <Outlet />
      <div className="cards">
        {vocabularies.map((card) => (
          <CardItem card={card} key={card.id} />
        ))}
      </div>
    </>
  );
}

export default Cards;
