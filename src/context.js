import React, { useState, useContext } from "react";
import {
  sublinks_eng,
  sublinks_esp,
} from "./Components/Navbar_components/data";
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);
  const [language, setLanguage] = useState("");
  const [page, setPage] = useState({ page: "", links: [] });
  const [location, setLocation] = useState({});
  const openSidebar = () => {
    setIsSidebarOpen(true);
  };

  const switchLanguage = (language) => {
    localStorage.setItem("language", language);
    setLanguage(localStorage.getItem("language"));
  };

  if (localStorage.getItem("language") === null) {
    switchLanguage("English");
  }

  const updateLanguage = () => {
    setLanguage(localStorage.getItem("language"));
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };
  const openSubmenu = (text, coordinates) => {
    let page = "";
    if (language === "English") {
      page = sublinks_eng.find((link) => link.page === text);
    } else {
      page = sublinks_esp.find((link) => link.page === text);
    }

    setPage(page);
    setLocation(coordinates);
    setIsSubmenuOpen(true);
  };
  const closeSubmenu = () => {
    setIsSubmenuOpen(false);
  };

  return (
    <AppContext.Provider
      value={{
        isSidebarOpen,
        openSidebar,
        closeSidebar,
        isSubmenuOpen,
        openSubmenu,
        closeSubmenu,
        page,
        location,
        language,
        switchLanguage,
        updateLanguage,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
