import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  handlePage,
  resetFilters,
  filterByDiet,
  orderByName,
  orderByHs,
  filterByOrigin,
} from "../../redux/actions";
import style from "./Filters.module.css";

const FilterOption = ({ value, text }) => (
  <option value={value}>{text}</option>
);

const Filters = ({ allDiets }) => {
  const dispatch = useDispatch();

  const {
    filterDiet,
    filterOrigin,
    orderAlph,
    orderHS,
  } = useSelector((state) => state);

  const handleOrder = (event) => {
    dispatch(orderByName(event.target.value));
    dispatch(handlePage(1));
  };

  const handleHs = (event) => {
    dispatch(orderByHs(event.target.value));
    dispatch(handlePage(1));
  };

  const handleDiets = (event) => {
    dispatch(filterByDiet(event.target.value));
    dispatch(handlePage(1));
  };

  const handleOrigin = (event) => {
    dispatch(filterByOrigin(event.target.value));
    dispatch(handlePage(1));
  };

  const handleReset = () => {
    dispatch(resetFilters());
    dispatch(handlePage(1));
  };

  return (
    <div className={style.filters}>
      <div>
        <select onChange={handleOrder} value={orderAlph} className={style.classic}>
          <FilterOption value="Default" text="Predeterminado" />
          <FilterOption value="A" text="A-Z" />
          <FilterOption value="D" text="Z-A" />
        </select>

        <select onChange={handleHs} value={orderHS} className={style.classic}>
          <FilterOption value="M" text="Salubilidad al azar" />
          <FilterOption value="A" text="+ Salubilidad" />
          <FilterOption value="D" text="- Salubilidad" />
        </select>

        <select onChange={handleDiets} value={filterDiet} className={style.classic}>
          <FilterOption value="allDiets" text="Todas las dietas" />
          {allDiets?.map((diet) => (
            <FilterOption key={diet.id} value={diet.name} text={diet.name} />
          ))}
        </select>

        <select onChange={handleOrigin} value={filterOrigin} className={style.classic}>
          <FilterOption value="All" text="Todos los origenes" />
          <FilterOption value="api" text="API" />
          <FilterOption value="db" text="Base de Datos" />
        </select>
      </div>
      <button onClick={handleReset} className={style.btn}>
        LIMPIAR FILTROS
      </button>
    </div>
  );
};

export default Filters;
