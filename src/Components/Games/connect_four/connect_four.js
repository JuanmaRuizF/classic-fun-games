import { useState, useRef, useEffect } from "react";
import "../../../Styles/connect_four.css";
import create_grid_elements from "./create_grid";
import put_value_in_place from "./value_in_place";
import check_win_condition from "./check_win_condition";
import { Modal, Button } from "react-bootstrap";
import Navbar from "../../Navbar_components/Navbar";
import Sidebar from "../../Navbar_components/Sidebar";
import Submenu from "../../Navbar_components/Submenu";
import { useGlobalContext } from "../../../context";
import data from "./translation_data";
import Footer from "../../Footer_component/Footer";

const Connect_four = () => {
  let elements = useRef(create_grid_elements()); // para que no se ejecute siempre esto al renderizar de nuevo la pantalla
  const { closeSubmenu, language, updateLanguage } = useGlobalContext();
  useEffect(() => {
    updateLanguage();
  });

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
                  return 0;
                }
                return 0;
              }
              return 0;
            });
            return 0;
          }
          return 0;
        }
        return 0;
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
                  return 0;
                }
                return 0;
              }
              return 0;
            });
            return 0;
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

  const handleClose = () => {
    setGameWon(false);
    let new_board = { current: create_grid_elements() };
    elements = new_board;
    setGrid(new_board);
    setUsersTurn("green");
    setWinner("");
  };

  return (
    <>
      <div className="connect_four">
        <Navbar />
        <Sidebar />
        <Submenu />
        <div className="container" onMouseOver={closeSubmenu}>
          <div className="title">
            {language === "English"
              ? data["English"]["title"]
              : data["Spanish"]["title"]}
          </div>
          {gameWon ? (
            <Modal show={gameWon} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>
                  {language === "English"
                    ? data["English"]["gameFinish"]
                    : data["Spanish"]["gameFinish"]}
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {language === "English" ? (
                  <div>
                    {winner.charAt(0).toUpperCase() + winner.slice(1)}{" "}
                    {data["English"]["gameWon"]}
                  </div>
                ) : (
                  <div>
                    {winner === "green"
                      ? data["Spanish"]["gameWonGreen"]
                      : data["Spanish"]["gameWonRed"]}
                  </div>
                )}
              </Modal.Body>
              <Modal.Footer>
                <Button variant="primary" onClick={handleClose}>
                  {language === "English"
                    ? data["English"]["newGame"]
                    : data["Spanish"]["newGame"]}
                </Button>
              </Modal.Footer>
            </Modal>
          ) : (
            <div></div>
          )}

          <div className="center_div">
            <div className={users_turn}>
              {language === "English" ? (
                <div>
                  {users_turn.charAt(0).toUpperCase() + users_turn.slice(1)}'s
                  Turn
                </div>
              ) : users_turn === "green" ? (
                "Turno del verde"
              ) : (
                "Turno del rojo"
              )}
            </div>
          </div>

          <div className="grid-container">
            {grid.current.map((element) => {
              return (
                <div
                  className={element["class_name"]}
                  key={element["id"]}
                  onClick={() => {
                    handleClick(element["id"]);
                  }}
                ></div>
              );
            })}
          </div>
          <div className="center_div">
            <Button
              variant="primary"
              onClick={handleClose}
              className="restart_button"
            >
              {language === "English"
                ? data["English"]["newGame"]
                : data["Spanish"]["newGame"]}
            </Button>
          </div>
          <div className="text_info">
            {language === "English" ? (
              <h3>{data["English"]["rules"]}</h3>
            ) : (
              <h3>{data["Spanish"]["rules"]}</h3>
            )}

            {language === "English" ? (
              <ul>
                <li>{data["English"]["p1"]}</li>
                <li>{data["English"]["p2"]}</li>
                <li>{data["English"]["p3"]}</li>
                <li>{data["English"]["p4"]}</li>
              </ul>
            ) : (
              <ul>
                <li>{data["Spanish"]["p1"]}</li>
                <li>{data["Spanish"]["p2"]}</li>
                <li>{data["Spanish"]["p3"]}</li>
                <li>{data["Spanish"]["p4"]}</li>
              </ul>
            )}
          </div>
          {language === "English" ? (
            <Footer name={"Connect 4"}></Footer>
          ) : (
            <Footer name={"Conecta 4"}></Footer>
          )}
        </div>
      </div>
    </>
  );
};

export default Connect_four;
// } else {
//   setErrorMsg(true);
//   const timeout = setTimeout(() => {
//     setErrorMsg(false);
//   }, 3000);
// }
