import React, { useEffect } from "react";
import logo from "../../images/logo.png";
import { FaBars } from "react-icons/fa";
import { useGlobalContext } from "../../context";
import { Link } from "react-router-dom";
import "../../Styles/index.css";
import { Dropdown } from "react-bootstrap";

const Navbar = () => {
  const {
    openSidebar,
    openSubmenu,
    closeSubmenu,
    switchLanguage,
    language,
    updateLanguage,
  } = useGlobalContext();

  useEffect(() => {
    updateLanguage();
  });
  const displaySubmenu = (e) => {
    const page = e.target.textContent;
    const tempBtn = e.target.getBoundingClientRect();
    const center = (tempBtn.left + tempBtn.right) / 2;
    const bottom = tempBtn.bottom - 3;

    openSubmenu(page, { center, bottom });
  };
  const handleSubmenu = (e) => {
    if (!e.target.classList.contains("link-btn")) {
      closeSubmenu();
    }
  };

  return (
    <nav className="nav" onMouseOver={handleSubmenu}>
      <div className="nav-center">
        <div className="nav-header">
          <Link to="/">
            <img src={logo} className="nav-logo" alt="" />
          </Link>

          <button className="btn toggle-btn" onClick={openSidebar}>
            <FaBars />
          </button>
        </div>
        <ul className="nav-links">
          <li>
            <button className="link-btn" onMouseOver={displaySubmenu}>
              {language === "English" ? "games" : "juegos"}
            </button>
          </li>
          <li>
            <button className="link-btn" onMouseOver={displaySubmenu}>
              {language === "English" ? "about" : "acerca de"}
            </button>
          </li>

          <li>
            <Dropdown
              className="link-btn-language"
              size="lg"
              onSelect={(e) => {
                switchLanguage(e);
              }}
            >
              <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                {language === "English" ? "Language" : "Idioma"}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item eventKey="English">
                  {language === "English" ? "English" : "Inglés"}
                </Dropdown.Item>
                <Dropdown.Item eventKey="Spanish">
                  {language === "English" ? "Spanish" : "Español"}
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </li>
        </ul>
        {/* <button className="link-btn" onMouseOver={displaySubmenu}>
          about
        </button> */}
        {/* <button className="btn signin-btn">Sign in</button> */}
      </div>
    </nav>
  );
};

export default Navbar;
