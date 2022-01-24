import { FaCreditCard, FaBook, FaBriefcase, FaGamepad } from "react-icons/fa";
import React from "react";
const sublinks = [
  {
    page: "games",
    links: [
      { label: "connect four", icon: <FaGamepad />, url: "/connect_four" },
      { label: "memory game", icon: <FaGamepad />, url: "/memory_game" },
      { label: "connect", icon: <FaGamepad />, url: "/products" },
    ],
  },
  // {
  //   page: "developers",
  //   links: [
  //     { label: "plugins", icon: <FaBook />, url: "/products" },
  //     { label: "libraries", icon: <FaBook />, url: "/products" },
  //     { label: "help", icon: <FaBook />, url: "/products" },
  //     { label: "billing", icon: <FaBook />, url: "/products" },
  //   ],
  // },
];

export default sublinks;
