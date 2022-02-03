import React from "react";
import Navbar from "../../Navbar_components/Navbar";
import Sidebar from "../../Navbar_components/Sidebar";
import Submenu from "../../Navbar_components/Submenu";
import { useGlobalContext } from "../../../context";
import "../../../Styles/sudoku.css";
import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import data from "./translation_data";
import BoardElement from "./board_element";
import Buttons from "./button_numbers";
import LoadingComponent from "./loading";

const Sudoku = () => {
  const { closeSubmenu, language, updateLanguage } = useGlobalContext();
  const [initialBoard, setInitialBoard] = useState([]);
  const [selectedBox, setSelectedBox] = useState(null);
  const [selectedNumber, setSelectedNumber] = useState(null);

  useEffect(() => {
    updateLanguage();
  }, []);

  useEffect(() => {
    if (selectedNumber > -1 && selectedBox > -1) {
      const copy_array = [...initialBoard];
      console.log(copy_array);
      copy_array[selectedBox] = selectedNumber;
      console.log(copy_array);
      setInitialBoard(copy_array);
      // console.log(initialBoard);
    }
  }, [selectedBox]);

  const generate_sudoku = async () => {
    let board;
    setSelectedNumber(null);
    setSelectedBox(null);
    try {
      let response = await fetch(
        "https://sugoku.herokuapp.com/board?difficulty=hard"
      );
      response = await response.json();
      board = [].concat(...response["board"]);
    } catch (error) {
      console.log(error.status);
    }
    setInitialBoard(board);
  };

  useEffect(() => {
    generate_sudoku();
  }, []);

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
          <div className="buttons_grid">
            <Buttons setSelectedNumber={setSelectedNumber}></Buttons>
          </div>
          <button onClick={generate_sudoku}>New Sudoku</button>
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
        </div>
      </div>
    </>
  );
};

export default Sudoku;
