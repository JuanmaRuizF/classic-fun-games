import React from "react";
import Navbar from "../../Navbar_components/Navbar";
import Sidebar from "../../Navbar_components/Sidebar";
import Submenu from "../../Navbar_components/Submenu";
import { useGlobalContext } from "../../../context";
import "../../../Styles/sudoku.css";
import { useState, useEffect } from "react";
import data from "./translation_data";
import { Button } from "react-bootstrap";

import GameImplementation from "./game_implementation";

const Sudoku = () => {
  const { closeSubmenu, language, updateLanguage } = useGlobalContext();
  const [displayGame, setDisplayGame] = useState(false);
  // const [difficulty, setDifficulty] = useState("hard");
  const [difficulty, setDifficulty] = useState("");
  useEffect(() => {
    updateLanguage();
  }, []);

  useEffect(() => {
    if (difficulty > "") {
      setDisplayGame(true);
    }
  }, [difficulty]);

  return (
    <>
      <div className="sudoku">
        <Navbar />
        <Sidebar />
        <Submenu />
        <div className="container" onMouseOver={closeSubmenu}>
          <div className="title">
            {language === "English"
              ? data["English"]["title"]
              : data["Spanish"]["title"]}
          </div>
          {displayGame ? (
            <GameImplementation
              difficulty={difficulty}
              setDifficulty={setDifficulty}
              setDisplayGame={setDisplayGame}
            ></GameImplementation>
          ) : (
            <>
              <div className="text_info_difficulty">
                <h3>
                  {" "}
                  {language === "English"
                    ? data["English"]["dificulty"]
                    : data["Spanish"]["dificulty"]}
                </h3>
              </div>
              <div className="new_game_button">
                <Button
                  variant="primary"
                  onClick={() => <>{setDifficulty("hard")}</>}
                >
                  {language === "English" ? "Hard" : "Difícil"}
                </Button>
              </div>
              <div className="new_game_button">
                <Button
                  variant="primary"
                  onClick={() => <>{setDifficulty("medium")}</>}
                >
                  {language === "English" ? "Medium" : "Medio"}
                </Button>
              </div>
              <div className="new_game_button">
                <Button
                  variant="primary"
                  onClick={() => <>{setDifficulty("easy")}</>}
                >
                  {language === "English" ? "Easy" : "Fácil"}
                </Button>
              </div>
            </>
          )}

          <div className="text_info">
            {language === "English" ? (
              <h3>{data["English"]["rules"]}</h3>
            ) : (
              <h3>{data["Spanish"]["rules"]}</h3>
            )}

            {language === "English" ? (
              <ul>
                {data["English"]["paragraphs"].map((paragraph, i) => {
                  return <li key={i}>{paragraph}</li>;
                })}
              </ul>
            ) : (
              <ul>
                {data["Spanish"]["paragraphs"].map((paragraph, i) => {
                  return <li key={i}>{paragraph}</li>;
                })}
              </ul>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Sudoku;

// board = [].concat(...response["board"]);
// for (let i = 0; i < board.length; i++) {
//   //[elemento, es valor inicial?]
//   if (board[i] > 0) {
//     board[i] = [board[i], true];
//   } else {
//     board[i] = [board[i], false];
//   }
// }
