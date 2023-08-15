import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import Filters from "../Filters/Filters";
import style from "./NavBar.module.css";

const NavBar = () => {
  const allDiets = [
    { id: 1, name: "gluten free" },
    { id: 2, name: "dairy free" },
    { id: 3, name: "lacto ovo vegetarian" },
    { id: 4, name: "vegan" },
    { id: 5, name: "paleolithic" },
    { id: 6, name: "primal" },
    { id: 7, name: "whole 30" },
    { id: 8, name: "pescatarian" },
    { id: 9, name: "ketogenic" },
    { id: 10, name: "fodmap friendly" },
  ];

  return (
    <div className={style.mainContainer}>
      <Link to="/recipes">RECETAS</Link>
      <Link to="/create">CREAR RECETA</Link>
      <Link to="/about">SOBRE MÍ</Link> 
      <Filters allDiets={allDiets} />
      <SearchBar />
    </div>
  );
};

export default NavBar;
