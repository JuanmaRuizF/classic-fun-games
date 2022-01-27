import "../Styles/error_page.css";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Navbar from "./Navbar_components/Navbar";
import Sidebar from "./Navbar_components/Sidebar";
import Submenu from "./Navbar_components/Submenu";
const Error = () => {
  return (
    <>
      <div className="error_page">
        <Navbar />
        <Sidebar />
        <Submenu />
        <div className="align_center">
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
