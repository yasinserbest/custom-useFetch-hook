import React, { useState, useEffect } from "react";

const VocabularyContext = React.createContext({
  vocabularies: [],
  setAllVocabulariesFromDB: (vocabularies) => {},
  getAllVocabularies: () => {},
  addVocabulary: (vocabulary) => {},
  deleteVocabulary: (id) => {},
  getVocabularyById: (id) => {},
  updateVocabulary: (id, item) => {},
});

export const VocabularyContextProvider = (props) => {
  const [vocabularies, setVocabularies] = useState([]);

  const getAllVocabularies = () => vocabularies.sort((a, b) => a.id - b.id);

  const getVocabularyById = (id) =>
    vocabularies.filter((vocabulary) => vocabulary.id == id);

  const setAllVocabulariesFromDB = (vocabularies) => {
    setVocabularies(vocabularies);
  };

  const addVocabulary = (vocabulary) => {
    setVocabularies((prevCards) => prevCards.concat(vocabulary));
  };

  const deleteVocabulary = (id) => {
    const newVocabularies = vocabularies.filter(
      (vocabulary) => vocabulary.id !== id
    );
    setVocabularies(newVocabularies);
  };

  const updateVocabulary = (id, item) => {
    const newVocabularies = vocabularies.filter(
      (vocabulary) => vocabulary.id !== id
    );
    newVocabularies.push(item);
    setVocabularies(newVocabularies);
  };

  return (
    <VocabularyContext.Provider
      value={{
        vocabularies: vocabularies,
        setAllVocabulariesFromDB,
        getAllVocabularies,
        addVocabulary,
        deleteVocabulary,
        updateVocabulary,
        getVocabularyById,
      }}
    >
      {props.children}
    </VocabularyContext.Provider>
  );
};
export default VocabularyContext;
