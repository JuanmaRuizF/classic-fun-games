import React from "react";
import Navbar from "../../Navbar_components/Navbar";
import Sidebar from "../../Navbar_components/Sidebar";
import Submenu from "../../Navbar_components/Submenu";
import { useGlobalContext } from "../../../context";
import "../../../Styles/memory_game.css";

const Memory_game = () => {
  const { closeSubmenu } = useGlobalContext();
  return (
    <>
      <div className="memory_game">
        <Navbar />
        <Sidebar />
        <Submenu />
        <div className="container" onMouseOver={closeSubmenu}>
          <div className="title">Memory Game</div>
        </div>
      </div>
    </>
  );
};

export default Memory_game;
