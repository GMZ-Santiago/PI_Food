import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllRecipes, getTypeDiets } from "../../redux/actions";
import Card from "../../components/Card/Card";
import Paginate from "../../components/Paginate/Paginate";
import style from "./RecipeCards.module.css";

const RecipeCards = () => {
  const dispatch = useDispatch();
  const {
    allRecipes,
    recipes,
    allDiets,
    numPag,
    filterDiet,
    filterOrigin,
    orderAlph,
    orderHS,
  } = useSelector((state) => state);

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

  const filteredRecipes = recipes
    .filter((recipe) => {
      if (filterDiet !== "allDiets") {
        return recipe.dietsName.includes(filterDiet);
      }
      return true;
    })
    .filter((recipe) => {
      if (filterOrigin !== "All") {
        return filterOrigin === "api" ? !isNaN(recipe.id) : isNaN(recipe.id);
      }
      return true;
    });

  const sortedRecipes = filteredRecipes
    .sort((a, b) => {
      if (orderAlph === "A") {
        return a.name.localeCompare(b.name);
      } else if (orderAlph === "D") {
        return b.name.localeCompare(a.name);
      }
      return 0;
    })
    .sort((a, b) => {
      if (orderHS === "A") {
        return b.healthScore - a.healthScore;
      } else if (orderHS === "D") {
        return a.healthScore - b.healthScore;
      }
      return 0;
    });

  const viewRecipes = sortedRecipes.slice(start, end);

  return (
    <div>
      {recipes.length !== 0 && <Paginate cantPages={totalPages} numPag={numPag} />}
      {recipes.length === 0 ? (
        <div className={style.loadContainer}>
          <span className={style.loader}></span>
        </div>
      ) : (
        <div className={style.container}>
          {viewRecipes.map(({ id, name, image, dietsName, steps }) => (
            <Card
              key={id}
              id={id}
              name={name}
              image={image}
              dietsName={dietsName}
              steps={steps}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default RecipeCards;
