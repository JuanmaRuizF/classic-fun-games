import { useState, useRef, useEffect } from "react";
import "../../../Styles/connect_four.css";
import create_grid_elements from "./create_grid";
import put_value_in_place from "./value_in_place";
import check_win_condition from "./check_win_condition";
import { Modal, Button } from "react-bootstrap";

const Connect_four = () => {
  let elements = useRef(create_grid_elements()); // para que no se ejecute siempre esto al renderizar de nuevo la pantalla

  const handleClick = (key) => {
    if (users_turn === "green") {
      grid.current.map((element) => {
        if (element["id"] === key) {
          if (element["selected"] === "No") {
            let position = put_value_in_place(grid, key);
            grid.current.map((element_position) => {
              if (element_position.id === position) {
                element_position["selected"] = "Yes";
                element_position["class_name"] = "green-grid-item";
                setGrid(grid);
                setUsersTurn("red");
                if (check_win_condition(grid, position, users_turn)) {
                  setGameWon(true);
                  setWinner("green");
                }
              }
              return 0;
            });
            return 0;
          } else {
            setErrorMsg(true);
            const timeout = setTimeout(() => {
              setErrorMsg(false);
            }, 3000);
          }
          return 0;
        }
      });
    } else {
      grid.current.map((element) => {
        if (element["id"] === key) {
          if (element["selected"] === "No") {
            let position = put_value_in_place(grid, key);
            grid.current.map((element_position) => {
              if (element_position.id === position) {
                element_position["selected"] = "Yes";
                element_position["class_name"] = "red-grid-item";
                setGrid(grid);
                setUsersTurn("green");
                if (check_win_condition(grid, position, users_turn)) {
                  setGameWon(true);
                  setWinner("red");
                }
              }
            });
            return 0;
          } else {
            setErrorMsg(true);
            const timeout = setTimeout(() => {
              setErrorMsg(false);
            }, 3000);
          }
          return 0;
        }
        return 0;
      });
    }
  };

  const [users_turn, setUsersTurn] = useState("green");
  const [grid, setGrid] = useState(elements);
  const [gameWon, setGameWon] = useState(false);
  const [winner, setWinner] = useState("");
  const [errorMsg, setErrorMsg] = useState(false);

  const handleClose = () => {
    setGameWon(false);
    let new_board = { current: create_grid_elements() };
    elements = new_board;
    setGrid(new_board);
    setUsersTurn("green");
    setWinner("");
  };

  const is_green = () => {
    if (users_turn === "green") {
      return true;
    } else {
      return false;
    }
  };

  return (
    <>
      {gameWon ? (
        <Modal show={gameWon} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Game Finished</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {winner.charAt(0).toUpperCase() + winner.slice(1)} won the game
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleClose}>
              New Game
            </Button>
          </Modal.Footer>
        </Modal>
      ) : (
        <div></div>
      )}

      {is_green ? (
        <div className={users_turn}>
          {users_turn.charAt(0).toUpperCase() + users_turn.slice(1)}'s Turn
        </div>
      ) : (
        <div className={users_turn}>
          {users_turn.charAt(0).toUpperCase() + users_turn.slice(1)}'s Turn
        </div>
      )}
      {errorMsg ? <div>HOLAAAA</div> : <div></div>}
      <div className="grid-container">
        {grid.current.map((element) => {
          return (
            <div
              className={element["class_name"]}
              key={element["id"]}
              onClick={() => {
                handleClick(element["id"]);
              }}
            >
              {/* {element["id"]} */}
            </div>
          );
        })}
      </div>
      <Button
        variant="primary"
        onClick={handleClose}
        className="restart_button"
      >
        Restart
      </Button>
    </>
  );
};

export default Connect_four;
// setTimeout(function () {
//   alert("my message");
// }, 200);