import React from "react";
import { useGlobalContext } from "../../../context";
import "../../../Styles/sudoku.css";
import { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
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

  const [showError, setShowError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [gameWon, setGameWon] = useState(false);
  const [wonMsg, setWonMsg] = useState("");

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
    setGameWon(false);
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

  const display_msg_wrong = () => {
    setShowError(true);
    setTimeout(() => {
      setShowError(false);
    }, 15000);
  };

  const validate = () => {
    let array_without_boolean = [];

    for (let i = 0; i < initialBoard.length; i++) {
      array_without_boolean.push(initialBoard[i][0]);
    }
    //check if all grid is filled
    if (array_without_boolean.indexOf(0) > -1) {
      language === "English"
        ? setErrorMsg(
            "The sudoku is not complete. Please fill in all the grid to validate it."
          )
        : setErrorMsg(
            "El sudoku no está completado. Por favor, rellena todo el sudoku para poder validarlo."
          );
      display_msg_wrong();
      return;
    }

    let array_to_2d = []; //preparing values to validate them horizontally, vertically and in groups
    while (array_without_boolean.length)
      array_to_2d.push(array_without_boolean.splice(0, 9));

    //horizontal values validation
    let unique_horizontal;

    for (let i = 0; i < 9; i++) {
      unique_horizontal = [...new Set(array_to_2d[i])];
      if (unique_horizontal.length < 9) {
        language === "English"
          ? setErrorMsg("There is a duplicate value in row " + (i + 1))
          : setErrorMsg("Hay un valor duplicado en la fila " + (i + 1));
        display_msg_wrong();
        return;
      }
    }

    //vertical values validation
    let unique_vertical;

    for (let i = 0; i < 9; i++) {
      unique_vertical = [
        ...new Set([].concat(...[array_to_2d].map((x) => x.map((x) => x[i])))),
      ];
      if (unique_vertical.length < 9) {
        language === "English"
          ? setErrorMsg("There is a duplicate value in column " + (i + 1))
          : setErrorMsg("Hay un valor duplicado en la columna " + (i + 1));
        display_msg_wrong();
        return;
      }
    }

    //subgroup values validation
    let unique_group;
    let blocks = [];
    let ret = [];

    for (let h = 0; h < 3; h++) {
      array_to_2d.forEach((row) => {
        for (let i = 0; i < 3; i++) {
          blocks.push(row.shift());
        }
      });
    }
    for (let j = 0; j < 9; j++) {
      for (let k = 0; k < 9; k++) {
        if (!Array.isArray(ret[j])) {
          ret[j] = [];
        }
        ret[j].push(blocks.shift());
      }
    }

    let conversion_groups = {
      0: "(0,0)",
      1: "(1,0)",
      2: "(2,0)",
      3: "(0,1)",
      4: "(1,1)",
      5: "(2,1)",
      6: "(0,2)",
      7: "(1,2)",
      8: "(2,2)",
    };
    for (let i = 0; i < 9; i++) {
      unique_group = [...new Set(ret[i])];
      if (unique_group.length < 9) {
        language === "English"
          ? setErrorMsg(
              "There is a duplicate value in subgroup " + conversion_groups[i]
            )
          : setErrorMsg(
              "Hay un valor duplicado en el subgrupo " + conversion_groups[i]
            );
        display_msg_wrong();
        return;
      }
    }

    language === "English"
      ? setWonMsg("The sudoku is valid, congratulations!")
      : setWonMsg("El sudoku es válido, felicidades!");
    setGameWon(true);
  };

  const handleClose = () => {
    setGameWon(false);
  };

  return (
    <>
      {loading ? (
        <LoadingComponent></LoadingComponent>
      ) : (
        <>
          <div className="msgContainer">
            {showError ? (
              <div className="msg_error">{errorMsg}</div>
            ) : (
              <div></div>
            )}
          </div>

          <Modal show={gameWon} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>
                {language === "English"
                  ? "Game Finished!"
                  : "Partida terminada"}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>{wonMsg}</Modal.Body>
            <Modal.Footer>
              <Button variant="primary" onClick={generate_sudoku}>
                {language === "English" ? "New Game" : "Nueva Partida"}
              </Button>
            </Modal.Footer>
          </Modal>

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
            <Button onClick={validate} className="button_options">
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
