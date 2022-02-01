import React from "react";
import ReactDOM from "react-dom";
import "./Styles/index.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Error from "./Components/error_page";
import ConnectFour from "./Components/Games/connect_four/connect_four";
import MemoryGame from "./Components/Games/memory_game/memory_game";
import About from "./Components/About/About";
import Contact from "./Components/About/Contact";
import { AppProvider } from "./context";

ReactDOM.render(
  <React.StrictMode>
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="error" element={<Error />} />
          <Route path="connect_four" element={<ConnectFour />} />
          <Route path="memory_game" element={<MemoryGame />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />

          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
