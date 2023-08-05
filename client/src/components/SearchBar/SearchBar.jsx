import React, { useState } from "react";
import style from "./SearchBar.module.css"; // Importa tu archivo de estilos CSS

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(query);
  };

  return (
    <div className={style.searchBarContainer}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Buscar..."
          value={query}
          onChange={handleInputChange}
        />
        <button type="submit">Buscar</button>
      </form>
    </div>
  );
};

export default SearchBar;
