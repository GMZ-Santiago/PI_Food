import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getRecipeByName, handlePage } from "../../redux/actions";
import style from "./SearchBar.module.css";

const SearchBar = () => {
  const dispatch = useDispatch();
  const [recipeName, setRecipeName] = useState("");

  const handleChange = (event) => {
    setRecipeName(event.target.value);
  };

  const handleSearch = () => {
    dispatch(getRecipeByName(recipeName));
    dispatch(handlePage(1));
    setRecipeName("");
  };

  return (
    <div className={style.searchBarContainer}>
      <input
        type="text"
        placeholder="Buscar..."
        className={style.searchInput}
        value={recipeName}
        onChange={handleChange}
      />
      <button className={style.searchButton} onClick={handleSearch}>
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRztd-ZibFlJp72RLcg98OGBBFu6RcrGML2GQ&usqp=CAU"
          alt="Buscar"
          className={style.searchIcon}
        />
      </button>
    </div>
  );
};

export default SearchBar;
