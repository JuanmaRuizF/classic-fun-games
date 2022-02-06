import "./Styles/App.css";
import { Link } from "react-router-dom";
import React from "react";
import Navbar from "./Components/Navbar_components/Navbar";
import Sidebar from "./Components/Navbar_components/Sidebar";
import Submenu from "./Components/Navbar_components/Submenu";
import { useGlobalContext } from "./context";

function App() {
  const { closeSubmenu } = useGlobalContext();
  return (
    <div className="App">
      <Navbar />
      <Sidebar />
      <Submenu />

      <div className="content" onMouseOver={closeSubmenu}>
        <h3 className="main-title">Classic fun games</h3>
      </div>
      {/* <p className="content">
        <Link to="/error">Error page</Link>
      </p> */}
    </div>
  );
}

export default App;
