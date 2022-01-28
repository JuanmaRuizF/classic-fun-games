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
  {
    page: "about",
    links: [
      { label: "about", icon: <FaBook />, url: "/about" },
      { label: "contact", icon: <FaBook />, url: "/contact" },
    ],
  },
];

export default sublinks;

// import { FaCreditCard, FaBook, FaBriefcase } from "react-icons/fa";
// import React from "react";
// const sublinks = [
//   {
//     page: "products",
//     links: [
//       { label: "payment", icon: <FaCreditCard />, url: "/products" },
//       { label: "terminal", icon: <FaCreditCard />, url: "/products" },
//       { label: "connect", icon: <FaCreditCard />, url: "/products" },
//     ],
//   },
//   {
//     page: "developers",
//     links: [
//       { label: "plugins", icon: <FaBook />, url: "/products" },
//       { label: "libraries", icon: <FaBook />, url: "/products" },
//       { label: "help", icon: <FaBook />, url: "/products" },
//       { label: "billing", icon: <FaBook />, url: "/products" },
//     ],
//   },
//   {
//     page: "company",
//     links: [
//       { label: "about", icon: <FaBriefcase />, url: "/products" },
//       { label: "customers", icon: <FaBriefcase />, url: "/products" },
//     ],
//   },
// ];

// export default sublinks;
