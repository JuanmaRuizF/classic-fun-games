import "../Styles/error_page.css";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Navbar from "./Navbar_components/Navbar";
import Sidebar from "./Navbar_components/Sidebar";
import Submenu from "./Navbar_components/Submenu";
import { useGlobalContext } from "../context";

const Error = () => {
  const { closeSubmenu } = useGlobalContext();

  return (
    <>
      <Navbar />
      <Sidebar />
      <Submenu />

      <div className="error_page" onMouseOver={closeSubmenu}>
        <div className="align_center" onMouseOver={closeSubmenu}>
          <div>This page doesn't exist</div>
          <div>:(</div>
          <div>
            <Link to="/">
              <Button variant="secondary" className="home_page">
                Home page
              </Button>{" "}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Error;
