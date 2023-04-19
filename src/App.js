import React, { useEffect, useState, useContext } from "react";
import Cards from "./components/Cards";
import AddVocabulary from "./components/AddVocabulary";
import EditCard from "./components/EditCard";
import { Routes, Route } from "react-router-dom";
import useHttp from "./hooks/useHttp";
import VocabularyContext from "./store/vocabulary-context";

import "./App.css";

function App() {
  const vocabContext = useContext(VocabularyContext);
  const { isLoading, error, sendRequest: fetchVocabularies } = useHttp();

  useEffect(() => {
    const getData = (data) => {
      vocabContext.setAllVocabulariesFromDB(data);
    };
    fetchVocabularies(
      {
        url: process.env.REACT_APP_BASE_URL,
      },
      getData
    );
  }, [fetchVocabularies]);

  return (
    <Routes>
      <Route path="/" element={<Cards />}>
        <Route path="/" element={<AddVocabulary />} />
      </Route>
      <Route path="/card/:cardId" element={<EditCard />} />
    </Routes>
  );
}

export default App;
