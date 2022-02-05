import { FaInfoCircle, FaGamepad } from "react-icons/fa";
import React from "react";

const sublinks_eng = [
  {
    page: "games",
    links: [
      {
        label: "connect four",
        icon: <FaGamepad />,
        url: "/connect_four",
      },
      {
        label: "memory game",
        icon: <FaGamepad />,
        url: "/memory_game",
      },
      {
        label: "sudoku",
        icon: <FaGamepad />,
        url: "/sudoku",
      },
    ],
  },
  {
    page: "about",
    links: [
      {
        label: "about",
        icon: <FaInfoCircle />,
        url: "/about",
      },
      {
        label: "contact",
        icon: <FaInfoCircle />,
        url: "/contact",
      },
    ],
  },
];

const sublinks_esp = [
  {
    page: "juegos",
    links: [
      {
        label: "conecta 4",
        icon: <FaGamepad />,
        url: "/connect_four",
      },
      {
        label: "juego de memoria",
        icon: <FaGamepad />,
        url: "/memory_game",
      },
      {
        label: "sudoku",
        icon: <FaGamepad />,
        url: "/sudoku",
      },
    ],
  },
  {
    page: "acerca de",
    links: [
      {
        label: "acerca de",
        icon: <FaInfoCircle />,
        url: "/about",
      },
      {
        label: "contacto",
        icon: <FaInfoCircle />,
        url: "/contact",
      },
    ],
  },
];

export { sublinks_eng, sublinks_esp };
