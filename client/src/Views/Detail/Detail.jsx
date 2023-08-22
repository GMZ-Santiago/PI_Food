import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getRecipeById, cleanDetail } from "../../redux/actions";
import style from "./Detail.module.css";

const Detail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const recipeDetail = useSelector((state) => state.recipeDetail);

  useEffect(() => {
    dispatch(getRecipeById(id));

    return () => {
      dispatch(cleanDetail());
    };
  }, [dispatch, id]);

  console.log("Recipe Detail Steps:", recipeDetail?.steps);

  return (
    <div className={style.bigContainer}>
      {Object.keys(recipeDetail).length === 0 ? (
        <div className={style.loadContainer}>
          <span className={style.loader}></span>
        </div>
      ) : (
        <div className={style.container}>
          <div className={style.main}>
            <div className={style.closeBtnContainer}>
              <Link to={"/recipes"}>
                <button className={style.closeBtn}>X</button>
              </Link>
            </div>

            <div className={style.block}>
              <img
                className={style.image}
                src={recipeDetail?.image}
                alt={recipeDetail?.name}
              />
            </div>

            <div className={style.block}>
              <div className={style.info}>
                <div className={style.title}>
                  <h2>{recipeDetail?.name}</h2>
                </div>
                <div className={style.hScore}>
                  <ins>Índice de Salubilidad:</ins>
                  <p>{recipeDetail?.healthScore}</p>
                </div>

                <p>{recipeDetail?.summary}</p>
              </div>
            </div>

            <div className={style.block}>
              <div className={style.info}>
                <h2 className={style.subTitle}>Paso a paso</h2>
                <ol>
                  {recipeDetail?.steps?.map((step) => {
                    return <li key={step.number}>{step.step}</li>;
                  })}
                </ol>
              </div>
            </div>

            <div className={style.block}>
              <h2 className={style.subTitle}>Tipos de dieta</h2>
              <div className={style.dietsTags}>
                {recipeDetail?.dietsName?.map((diet, index) => (
                  <div key={index} className={style.diet}>
                    {diet.name || diet}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Detail;
