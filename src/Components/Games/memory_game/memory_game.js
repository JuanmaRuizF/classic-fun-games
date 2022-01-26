import React, { useRef } from "react";
import Navbar from "../../Navbar_components/Navbar";
import Sidebar from "../../Navbar_components/Sidebar";
import Submenu from "../../Navbar_components/Submenu";
import { useGlobalContext } from "../../../context";
import "../../../Styles/memory_game.css";
import { useState, useEffect } from "react";
import SingleCard from "./single_card";
import LoadingComponent from "./loading";
import { Modal, Button } from "react-bootstrap";

const Memory_game = () => {
  const { closeSubmenu } = useGlobalContext();

  const [pictures, setPictures] = useState([]);
  const [turns, setTurns] = useState(0);
  const [loading, setLoading] = useState(true);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [pairs, setPairs] = useState(0);
  const [gameFinished, setGameFinished] = useState(false);

  const load_pictures = async () => {
    let cards = [];
    for (let i = 0; i < 6; i++) {
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
        console.log(pairs);
        if (pairs === 5) {
          console.log("finished");
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
      <div className="memory_game">
        <Navbar />
        <Sidebar />
        <Submenu />
        <div className="container" onMouseOver={closeSubmenu}>
          <div className="title">Memory Game</div>

          {loading ? (
            <LoadingComponent></LoadingComponent>
          ) : (
            <>
              <Modal show={gameFinished} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Game Finished!</Modal.Title>
                </Modal.Header>
                <Modal.Body>Game finished in {turns} turns</Modal.Body>
                <Modal.Footer>
                  <Button variant="primary" onClick={newGame}>
                    New Game
                  </Button>
                </Modal.Footer>
              </Modal>
              <div className="turns">Turn: {turns}</div>
              <div className="card_grid">
                {pictures.map((picture) => (
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
                ))}
              </div>
              <div className="new_game_button">
                <Button variant="primary" onClick={newGame}>
                  New Game
                </Button>
              </div>

              <div className="text_info">
                <h3>Game Rules</h3>
                <ol>
                  <li>
                    There is a set number of cards. Each card has a duplicate.
                    The goal this game is to click both duplicates in the same
                    turn until all the cards are displayed.
                  </li>
                  <li>
                    All the pictures are obtained from a random picture API, so
                    each game is guaranteed to be different!
                  </li>
                  <li>
                    Try to display all the cards in the least number of turns!
                  </li>
                  <li>
                    To restart the game at any point, click the "restart" button
                  </li>
                </ol>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Memory_game;
