import React, { useEffect } from "react";
import Navbar from "../Navbar_components/Navbar";
import Sidebar from "../Navbar_components/Sidebar";
import Submenu from "../Navbar_components/Submenu";
import { useGlobalContext } from "../../context";
import "./About_Contact.css";
import { Link } from "react-router-dom";
import { GrMail } from "react-icons/gr";
import { BsLinkedin } from "react-icons/bs";
import { GiBriefcase } from "react-icons/gi";
import data from "./translation_data";

const Memory_game = () => {
  const { closeSubmenu, language, updateLanguage } = useGlobalContext();
  useEffect(() => {
    updateLanguage();
  });
  return (
    <>
      <Navbar />
      <Sidebar />
      <Submenu />
      <div className="about" onMouseOver={closeSubmenu}>
        <div className="container" onMouseOver={closeSubmenu}>
          <div className="title">
            {language === "English"
              ? data["English"]["About"]["title"]
              : data["Spanish"]["About"]["title"]}
          </div>

          <p className="about_info">
            {language === "English"
              ? data["English"]["About"]["about1"]
              : data["Spanish"]["About"]["about1"]}
          </p>
          <p className="paragraph_info">
            {language === "English"
              ? data["English"]["About"]["about2"]
              : data["Spanish"]["About"]["about2"]}
          </p>
          <div className="paragraph_info">
            <ul>
              {language === "English"
                ? data["English"]["About"]["futureGames"].map((game) => {
                    return <li key={game}>{game}</li>;
                  })
                : data["Spanish"]["About"]["futureGames"].map((game) => {
                    return <li key={game}>{game}</li>;
                  })}
            </ul>
          </div>
          <p className="paragraph_info">
            {language === "English"
              ? data["English"]["About"]["about3"]
              : data["Spanish"]["About"]["about3"]}
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
                    href="https://www.linkedin.com/in/juanmaruizf/"
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
          <div className="space"></div>
        </div>
      </div>
    </>
  );
};

export default Memory_game;
