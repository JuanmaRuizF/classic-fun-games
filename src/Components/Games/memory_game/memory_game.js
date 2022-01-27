import React from "react";
import Navbar from "../../Navbar_components/Navbar";
import Sidebar from "../../Navbar_components/Sidebar";
import Submenu from "../../Navbar_components/Submenu";
import { useGlobalContext } from "../../../context";
import "../../../Styles/memory_game.css";
import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import GameImplementation from "./game_implementation";

const Memory_game = () => {
  const { closeSubmenu } = useGlobalContext();

  const [displayGame, setDisplayGame] = useState(false);
  const [pairs, setPairs] = useState(null);
  const [gridStyle, setGridStyle] = useState("");

  useEffect(() => {
    if (pairs > 0) {
      setDisplayGame(true);
    }
  }, [pairs]);

  return (
    <>
      <div className="memory_game">
        <Navbar />
        <Sidebar />
        <Submenu />
        <div className="container" onMouseOver={closeSubmenu}>
          <div className="title">Memory Game</div>

          {displayGame ? (
            <GameImplementation
              pairs={pairs}
              gridStyle={gridStyle}
              setDisplayGame={setDisplayGame}
            ></GameImplementation>
          ) : (
            <>
              <div className="text_info_difficulty">
                <h3>Select difficulty</h3>
              </div>

              <div className="new_game_button">
                <Button
                  variant="primary"
                  onClick={() => (
                    <>
                      {setPairs(6)} {setGridStyle("card_grid_6")}
                    </>
                  )}
                >
                  6 pairs
                </Button>
              </div>

              <div className="new_game_button">
                <Button
                  variant="primary"
                  onClick={() => (
                    <>
                      {setPairs(8)} {setGridStyle("card_grid_8")}
                    </>
                  )}
                >
                  8 pairs
                </Button>
              </div>

              <div className="new_game_button">
                <Button
                  variant="primary"
                  onClick={() => (
                    <>
                      {setPairs(10)} {setGridStyle("card_grid_10")}
                    </>
                  )}
                >
                  10 pairs
                </Button>
              </div>
            </>
          )}

          <div className="text_info">
            <h3>Game Rules</h3>
            <ol>
              <li>
                There is a set number of cards. Each card has a duplicate. The
                goal this game is to click both duplicates in the same turn
                until all the cards are displayed.
              </li>
              <li>
                All the pictures are obtained from a random picture API, so each
                game is guaranteed to be different!
              </li>
              <li>
                Try to display all the cards in the least number of turns!
              </li>
              <li>
                To restart the game at any point, click the "restart" button
              </li>
            </ol>
          </div>
        </div>
      </div>
    </>
  );
};

export default Memory_game;
