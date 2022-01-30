import React from "react";
import Navbar from "../Navbar_components/Navbar";
import Sidebar from "../Navbar_components/Sidebar";
import Submenu from "../Navbar_components/Submenu";
import { useGlobalContext } from "../../context";
import "./About_Contact.css";
import { Link } from "react-router-dom";
import { GrMail } from "react-icons/gr";
import { BsLinkedin } from "react-icons/bs";
import { GiBriefcase } from "react-icons/gi";

const Memory_game = () => {
  const { closeSubmenu } = useGlobalContext();
  return (
    <>
      <Navbar />
      <Sidebar />
      <Submenu />
      <div className="about" onMouseOver={closeSubmenu}>
        <div className="container" onMouseOver={closeSubmenu}>
          <div className="title">About</div>

          <p className="about_info">
            Games are fun! That's what I thought when deciding to work on this
            project. This website is intended to present an implementation of
            several of the best classic games, while giving them a personal
            touch.
          </p>
          <p className="paragraph_info">
            There are many more games in mind that are planned to be implemented
            in the future. Some of them are the following:
          </p>
          <p className="paragraph_info">
            <ul>
              <li>Hangman</li>
              <li>Tetris</li>
              <li>Higher/Lower</li>
              <li>Dino Runner</li>
            </ul>
          </p>
          <p className="paragraph_info">
            Want another game to be implemented? Found any problems? Contact me:
          </p>

          <table className="table_icons">
            <tbody>
              <tr>
                <th>
                  <Link to="/contact" className="otherButton">
                    <GrMail size="3em"></GrMail>
                  </Link>
                </th>
                <th>
                  <a
                    href="https://www.linkedin.com/in/juan-manuel-ruiz-fr%C3%A1nquiz-b227a2218/"
                    className="otherButton"
                    target="blank"
                  >
                    <BsLinkedin size="3em"></BsLinkedin>
                  </a>
                </th>
                <th>
                  <a
                    href="https://juanmaruizf.github.io/my-portfolio/"
                    className="otherButton"
                    target="blank"
                  >
                    <GiBriefcase size="3em"></GiBriefcase>
                  </a>
                </th>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Memory_game;
