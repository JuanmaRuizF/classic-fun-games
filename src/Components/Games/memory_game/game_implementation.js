import React from "react";
import "../../../Styles/memory_game.css";
import { useState, useEffect } from "react";
import SingleCard from "./single_card";
import LoadingComponent from "./loading";
import { Modal, Button } from "react-bootstrap";
import { IoMdSettings } from "react-icons/io";
import { useGlobalContext } from "../../../context";

const Memory_game = (props) => {
  const [pictures, setPictures] = useState([]);
  const [turns, setTurns] = useState(0);
  const [loading, setLoading] = useState(true);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [pairs, setPairs] = useState(0);
  const [gameFinished, setGameFinished] = useState(false);
  const { language } = useGlobalContext();

  const load_pictures = async () => {
    let cards = [];
    for (let i = 0; i < props.pairs; i++) {
      try {
        const response = await fetch("https://picsum.photos/200");
        cards.push({ img: response.url, match: false });
      } catch (error) {
        console.log(error.status);
      }
    }
    cards = [...cards, ...cards]
      .sort(() => 0.5 - Math.random())
      .map((card) => ({ ...card, id: Math.random() }));

    setPictures(cards);

    setLoading(false);
  };

  useEffect(() => {
    load_pictures();
    setChoiceOne(null);
    setChoiceTwo(null);
    setPairs(0);
    setGameFinished(false);
  }, []);

  const resetValues = () => {
    setChoiceTwo(null);
    setChoiceOne(null);

    setTurns(turns + 1);
    setDisabled(false);
  };

  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.img === choiceTwo.img) {
        setPictures((prevCards) => {
          return prevCards.map((card) => {
            if (card.img === choiceOne.img) {
              return { ...card, match: true };
            } else {
              return card;
            }
          });
        });
        setPairs((pairs) => pairs + 1);
        if (pairs === props.pairs - 1) {
          setGameFinished(true);
        }
        resetValues();
      } else {
        setTimeout(() => resetValues(), 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  const handleClose = () => {
    setGameFinished(false);
  };

  const newGame = () => {
    setLoading(true);
    load_pictures();
    setChoiceOne(null);
    setChoiceTwo(null);
    setPairs(0);
    setGameFinished(false);
    setTurns(0);
  };

  return (
    <>
      {loading ? (
        <LoadingComponent></LoadingComponent>
      ) : (
        <>
          <Modal show={gameFinished} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>
                {language === "English"
                  ? "Game Finished!"
                  : "Partida terminada"}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {language === "English" ? (
                <div>Game finished in {turns} turns</div>
              ) : (
                <div>Partida finalizada en {turns} turnos</div>
              )}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="primary" onClick={newGame}>
                {language === "English" ? "New Game" : "Nueva Partida"}
              </Button>
            </Modal.Footer>
          </Modal>

          <div className="title_container">
            <div></div>
            <div className="turns">
              {language === "English" ? "Turn:" : "Turno:"} {turns}
            </div>
            <div className="settings">
              <IoMdSettings
                size="2em"
                onClick={() => {
                  props.setPairs(null);
                  props.setDisplayGame(false);
                }}
              ></IoMdSettings>
            </div>
          </div>

          <div className={props.gridStyle}>
            {pictures.map((picture, i) => (
              <div key={i}>
                <SingleCard
                  picture={picture}
                  handleChoice={handleChoice}
                  flipped={
                    picture === choiceOne ||
                    picture === choiceTwo ||
                    picture.match
                  }
                  disabled={disabled}
                ></SingleCard>
              </div>
            ))}
          </div>
          <div className="new_game_button">
            <Button variant="primary" onClick={newGame}>
              {language === "English" ? "New Game" : "Nueva Partida"}
            </Button>
          </div>
        </>
      )}
    </>
  );
};

export default Memory_game;
