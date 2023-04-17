import React, { useEffect, useState } from "react";
import Cards from "./components/Cards";
import AddVocabulary from "./components/AddVocabulary";
import EditCard from "./components/EditCard";
import { Routes, Route } from "react-router-dom";
import useHttp from "./hooks/useHttp";

import "./App.css";

function App() {
  const [cards, setCards] = useState([]);
  const { isLoading, error, sendRequest: fetchVocabularies } = useHttp();

  useEffect(() => {
    const getData = (data) => {
      setCards(data);
    };
    fetchVocabularies(
      {
        url: process.env.REACT_APP_BASE_URL,
      },
      getData
    );
  }, [fetchVocabularies]);

  const addCard = (cardItem) => {
    setCards((prevCards) => prevCards.concat(cardItem));
  };
  const deleteVocabulary = (id) => {
    const newVocabularies = cards.filter((card) => card.id !== id);
    console.log(newVocabularies);
    setCards(newVocabularies);
  };

  const updateVocabulary = (id, item) => {
    const newVocabularies = cards.filter((card) => card.id !== id);
    console.log(newVocabularies);
    newVocabularies.push(item);
    setCards(newVocabularies);
  };

  return (
    <Routes>
      <Route path="/" element={<Cards cards={cards} />}>
        <Route path="/" element={<AddVocabulary onAddCard={addCard} />} />
      </Route>
      <Route
        path="/card/:cardId"
        element={
          <EditCard
            onUpdateVocabulary={updateVocabulary}
            onDeleteVocabulary={deleteVocabulary}
          />
        }
      />
    </Routes>
  );
}

export default App;
