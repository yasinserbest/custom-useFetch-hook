import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useHttp from "../hooks/useHttp";
import "./EditCard.scss";

function EditCard({ onDeleteVocabulary, onUpdateVocabulary }) {
  const { isLoading, error, sendRequest } = useHttp();
  const params = useParams();
  const navigate = useNavigate();

  const [card, setCard] = useState([]);

  useEffect(() => {
    const getData = (data) => {
      setCard(data);
    };
    sendRequest(
      {
        url: `${process.env.REACT_APP_BASE_URL}/${params.cardId}`,
      },
      getData
    );
  }, [sendRequest]);

  const onDeleteHandler = async (e) => {
    e.preventDefault();
    sendRequest({
      url: `${process.env.REACT_APP_BASE_URL}/${params.cardId}`,
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
    });
    onDeleteVocabulary(params.cardId);
    navigate("/");
  };
  const onUpdateHandler = async (e) => {
    e.preventDefault();
    sendRequest({
      url: `${process.env.REACT_APP_BASE_URL}/${params.cardId}`,
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: {
        en: card.en,
        tr: card.tr,
        pronunciation: card.pronunciation,
        example: card.example,
      },
    });
    onUpdateVocabulary(params.cardId, card);
    navigate("/");
  };

  return (
    <div className="editCard">
      <span className="editCard__backBtn" onClick={() => navigate(-1)}>
        &larr; Back
      </span>
      <form className="addVocabulary__form">
        <label className="addVocabulary__label" htmlFor="en">
          English
        </label>
        <input
          className="addVocabulary__input"
          type="text"
          id="en"
          onChange={(e) =>
            setCard((prevCard) => ({
              ...prevCard,
              en: e.target.value,
            }))
          }
          defaultValue={card.en}
        />
        <label className="addVocabulary__label" htmlFor="tr">
          Turkish
        </label>
        <input
          className="addVocabulary__input"
          type="text"
          id="tr"
          onChange={(e) =>
            setCard((prevCard) => ({
              ...prevCard,
              tr: e.target.value,
            }))
          }
          defaultValue={card.tr}
        />
        <label className="addVocabulary__label" htmlFor="pro">
          Pronuanciation
        </label>
        <input
          className="addVocabulary__input"
          type="text"
          id="pro"
          defaultValue={card.pronunciation}
          onChange={(e) =>
            setCard((prevCard) => ({
              ...prevCard,
              pronunciation: e.target.value,
            }))
          }
        />
        <label className="addVocabulary__label" htmlFor="example">
          Example
        </label>
        <input
          className="addVocabulary__input"
          type="text"
          id="example"
          defaultValue={card.example}
          onChange={(e) =>
            setCard((prevCard) => ({
              ...prevCard,
              example: e.target.value,
            }))
          }
        />
        <button onClick={onUpdateHandler} className="addVocabulary__saveBtn">
          SAVE
        </button>
      </form>

      <button onClick={onDeleteHandler}>DELETE</button>
    </div>
  );
  // return <button onClick={onDeleteHandler}>DELETE</button>;
}

export default EditCard;
