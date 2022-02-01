import React from "react";
import Navbar from "../../Navbar_components/Navbar";
import Sidebar from "../../Navbar_components/Sidebar";
import Submenu from "../../Navbar_components/Submenu";
import { useGlobalContext } from "../../../context";
import "../../../Styles/memory_game.css";
import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import GameImplementation from "./game_implementation";
import data from "./translation_data";

const Memory_game = () => {
  const { closeSubmenu, language, updateLanguage } = useGlobalContext();

  const [displayGame, setDisplayGame] = useState(false);
  const [pairs, setPairs] = useState(null);
  const [gridStyle, setGridStyle] = useState("");

  useEffect(() => {
    updateLanguage();
  });
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
          <div className="title">
            {language === "English"
              ? data["English"]["title"]
              : data["Spanish"]["title"]}
          </div>

          {displayGame ? (
            <GameImplementation
              pairs={pairs}
              gridStyle={gridStyle}
              setDisplayGame={setDisplayGame}
              setPairs={setPairs}
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
                  onClick={() => (
                    <>
                      {setPairs(6)} {setGridStyle("card_grid_6")}
                    </>
                  )}
                >
                  {language === "English"
                    ? data["English"]["par6"]
                    : data["Spanish"]["par6"]}
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
                  {language === "English"
                    ? data["English"]["par8"]
                    : data["Spanish"]["par8"]}
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
                  {language === "English"
                    ? data["English"]["par10"]
                    : data["Spanish"]["par10"]}
                </Button>
              </div>
            </>
          )}

          <div className="text_info">
            <h3>
              {" "}
              {language === "English"
                ? data["English"]["rules"]
                : data["Spanish"]["rules"]}
            </h3>
            <ul>
              <li>
                {language === "English"
                  ? data["English"]["p1"]
                  : data["Spanish"]["p1"]}
              </li>
              <li>
                {language === "English"
                  ? data["English"]["p2"]
                  : data["Spanish"]["p2"]}
              </li>
              <li>
                {language === "English"
                  ? data["English"]["p3"]
                  : data["Spanish"]["p3"]}
              </li>
              <li>
                {language === "English"
                  ? data["English"]["p4"]
                  : data["Spanish"]["p4"]}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Memory_game;
