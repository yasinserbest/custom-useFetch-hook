import React, { useState, useContext } from "react";
import useHttp from "../hooks/useHttp";
import VocabularyContext from "../store/vocabulary-context";
import "./AddVocabulary.scss";
function AddVocabulary() {
  const vocabCtx = useContext(VocabularyContext);

  const lastElementsId =
    Number(vocabCtx.getAllVocabularies().slice(-1)[0]?.id) + 1; //this is for id of new created element

  const [showForm, setshowForm] = useState(false);
  const [en, setEn] = useState();
  const [tr, setTr] = useState();
  const [pro, setPro] = useState();
  const [example, setExample] = useState();

  const { isLoading, error, sendRequest: addVocabulary } = useHttp();

  const addVocabularyHandler = (e) => {
    e.preventDefault();
    addVocabulary(
      {
        url: process.env.REACT_APP_BASE_URL,
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: {
          en,
          tr,
          pronunciation: pro,
          example,
          id: "" + lastElementsId, //convert to string
        },
      },
      (data) => vocabCtx.addVocabulary(data)
    );
  };
  return (
    <>
      <div className="addVocabulary">
        {!showForm && (
          <button
            className="addVocabulary__openForm"
            onClick={(prevState) => setshowForm(true)}
          >
            Add New Vocabulary
          </button>
        )}
        {showForm && (
          <form className="addVocabulary__form" onSubmit={addVocabularyHandler}>
            <span
              className="addVocabulary__closeForm"
              onClick={() => setshowForm(false)}
            >
              X
            </span>
            <label className="addVocabulary__label" htmlFor="en">
              English
            </label>
            <input
              className="addVocabulary__input"
              type="text"
              id="en"
              onChange={(e) => setEn(e.target.value)}
            />
            <label className="addVocabulary__label" htmlFor="tr">
              Turkish
            </label>
            <input
              className="addVocabulary__input"
              type="text"
              id="tr"
              onChange={(e) => setTr(e.target.value)}
            />
            <label className="addVocabulary__label" htmlFor="pro">
              Pronuanciation
            </label>
            <input
              className="addVocabulary__input"
              type="text"
              id="pro"
              onChange={(e) => setPro(e.target.value)}
            />
            <label className="addVocabulary__label" htmlFor="example">
              Example
            </label>
            <input
              className="addVocabulary__input"
              type="text"
              id="example"
              onChange={(e) => setExample(e.target.value)}
            />
            <button className="addVocabulary__saveBtn">SAVE</button>
          </form>
        )}
      </div>
    </>
  );
}

export default AddVocabulary;
