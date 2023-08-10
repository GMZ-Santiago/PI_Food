import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllRecipes, getTypeDiets } from "../../redux/actions";
import Filters from "../../components/Filters/Filters";
import Card from "../../components/Card/Card";
import Paginate from "../../components/Paginate/Paginate";
import style from "./RecipeCards.module.css";

const RecipeCards = () => {
  const dispatch = useDispatch();
  const { allRecipes, recipes, allDiets, numPag } = useSelector(
    (state) => state
  );

  useEffect(() => {
    if (allRecipes.length === 0) {
      dispatch(getAllRecipes());
    }
    if (allDiets.length === 0) {
      dispatch(getTypeDiets());
    }
  }, [dispatch, allRecipes.length, allDiets.length]);

  const recipesPerPage = 9;
  const totalPages = Math.ceil(recipes.length / recipesPerPage);
  const start = (numPag - 1) * recipesPerPage;
  const end = start + recipesPerPage;
  const viewRecipes = Array.isArray(recipes) ? recipes.slice(start, end) : [];

  return (
    <div>
      <Filters allDiets={allDiets} />
      {recipes.length !== 0 && (
        <Paginate cantPages={totalPages} numPag={numPag} />
      )}
      {recipes.length === 0 ? (
        <div className={style.loadContainer}>
          <span className={style.loader}></span>
        </div>
      ) : (
        <div className={style.container}>
          {viewRecipes.map(({ id, name, image, dietsName, steps}) => (
            <Card
              name={name} // Mostrar solo el título de la receta
              key={id}
              id={id}
              image={image}
              dietsName={dietsName} // Mostrar los tipos de dietas
              steps={steps}//Mostrar las instrucciones
            />
          ))}
        </div>
      )}
      {recipes.length !== 0 && (
        <Paginate cantPages={totalPages} numPag={numPag} />
      )}
    </div>
  );
};

export default RecipeCards;
