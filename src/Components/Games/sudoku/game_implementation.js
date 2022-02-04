import React from "react";
import { useGlobalContext } from "../../../context";
import "../../../Styles/sudoku.css";
import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import BoardElement from "./board_element";
import Buttons from "./button_numbers";
import data from "./translation_data";
import LoadingComponent from "./loading";

const Game_implementation = (props) => {
  const { closeSubmenu, language, updateLanguage } = useGlobalContext();
  const [initialBoard, setInitialBoard] = useState([]);
  const [unchangedBoard, setUnchangedBoard] = useState(null);
  const [selectedBox, setSelectedBox] = useState(null);
  const [selectedNumber, setSelectedNumber] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    generate_sudoku();
  }, []);

  useEffect(() => {
    if (selectedNumber > -1 && selectedBox > -1) {
      const copy_array = [...initialBoard];
      copy_array[selectedBox] = [selectedNumber, false];
      setSelectedBox(null);
      setInitialBoard(copy_array);
    }
  }, [selectedBox, selectedNumber]);

  const prepare_board_for_grid = (response, isInitialBoard) => {
    let board = [].concat(...response);

    if (isInitialBoard) {
      for (let i = 0; i < board.length; i++) {
        if (board[i] > 0) {
          board[i] = [board[i], true]; // board = [elemento, es valor inicial?]
        } else {
          board[i] = [board[i], false];
        }
      }
    } else {
      for (let i = 0; i < board.length; i++) {
        if (board[i] > 0 && initialBoard[i][1]) {
          board[i] = [board[i], true];
        } else {
          board[i] = [board[i], false];
        }
      }
    }
    return board;
  };

  const generate_sudoku = async () => {
    let board;
    setSelectedNumber(null);
    setSelectedBox(null);

    try {
      let response = await fetch(
        "https://sugoku.herokuapp.com/board?difficulty=" + props.difficulty
      );
      response = await response.json();
      setUnchangedBoard(response);

      board = prepare_board_for_grid(response["board"], true);
    } catch (error) {
      console.log(error.status);
    }
    setInitialBoard(board);
    setLoading(false);
  };

  //SOLVE FUNCTIONS
  const encodeBoard = (board) =>
    board.reduce(
      (result, row, i) =>
        result +
        `%5B${encodeURIComponent(row)}%5D${
          i === board.length - 1 ? "" : "%2C"
        }`,
      ""
    );
  const encodeParams = (params) =>
    Object.keys(params)
      .map((key) => key + "=" + `%5B${encodeBoard(params[key])}%5D`)
      .join("&");

  const solve_function = () => {
    fetch("https://sugoku.herokuapp.com/solve", {
      method: "POST",
      body: encodeParams(unchangedBoard),
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    })
      .then((response) => response.json())
      .then((response) => prepare_board_for_grid(response.solution), false)
      .then((response) => setInitialBoard(response))

      .catch(console.warn);
  };

  const validar = () => {
    fetch("https://sugoku.herokuapp.com/validate", {
      method: "POST",
      body: encodeParams(unchangedBoard),
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    })
      .then((response) => response.json())
      .then((response) => console.log(response));
  };

  return (
    <>
      {loading ? (
        <LoadingComponent></LoadingComponent>
      ) : (
        <>
          <div className="sudoku_grid">
            {initialBoard.map((element, i) => {
              return (
                <BoardElement
                  key={i}
                  element={element}
                  position={i}
                  setSelectedBox={setSelectedBox}
                ></BoardElement>
              );
            })}
          </div>
          <div className="button_numbers_grid">
            <Buttons
              setSelectedNumber={setSelectedNumber}
              selectedNumber={selectedNumber}
            ></Buttons>
          </div>
          <div className="button_options_grid">
            <Button
              onClick={() => {
                setLoading(true);
                generate_sudoku();
              }}
              className="button_options"
            >
              {language === "English" ? "New Sudoku" : "Nuevo Sudoku"}
            </Button>
            <Button onClick={solve_function} className="button_options">
              {language === "English" ? "Solve" : "Resolver"}
            </Button>
            <Button onClick={validar} className="button_options">
              {language === "English" ? "Validate" : "Validar"}
            </Button>

            <Button
              onClick={() => {
                props.setDisplayGame(false);
                props.setDifficulty("");
              }}
              className="button_options"
            >
              {language === "English" ? "Change settings" : "Cambiar ajustes"}
            </Button>
          </div>
        </>
      )}
    </>
  );
};

export default Game_implementation;
