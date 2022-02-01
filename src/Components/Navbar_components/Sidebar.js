import React, { useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import { useGlobalContext } from "../../context";
import { sublinks_eng, sublinks_esp } from "./data";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const { isSidebarOpen, closeSidebar, language, updateLanguage } =
    useGlobalContext();

  useEffect(() => {
    updateLanguage();
  });
  return (
    <div
      className={`${
        isSidebarOpen ? "sidebar-wrapper show" : "sidebar-wrapper"
      }`}
    >
      <aside className="sidebar">
        <button className="close-btn" onClick={closeSidebar}>
          <FaTimes />
        </button>
        <div className="sidebar-links">
          {language === "English" ? (
            <div>
              {sublinks_eng.map((item, index) => {
                const { links, page } = item;
                return (
                  <article key={index}>
                    <h4>{page}</h4>
                    <div className="sidebar-sublinks">
                      {links.map((link, index) => {
                        const { url, icon, label } = link;
                        return (
                          <Link key={index} to={url}>
                            {icon}
                            {label}
                          </Link>
                        );
                      })}
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div>
              {sublinks_esp.map((item, index) => {
                const { links, page } = item;
                return (
                  <article key={index}>
                    <h4>{page}</h4>
                    <div className="sidebar-sublinks">
                      {links.map((link, index) => {
                        const { url, icon, label } = link;
                        return (
                          <Link key={index} to={url}>
                            {icon}
                            {label}
                          </Link>
                        );
                      })}
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
// <a key={index} href={url}>
//   {icon}
//   {label}
// </a>
