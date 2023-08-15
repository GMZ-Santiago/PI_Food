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
      🔍
      </button>
    </div>
  );
};

export default SearchBar;
