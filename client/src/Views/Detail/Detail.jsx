import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getRecipeById, cleanDetail } from "../../redux/actions";
import style from "./Detail.module.css";

const Detail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  // Obtener el detalle de la receta desde el estado de Redux
  const recipeDetail = useSelector((state) => state.recipeDetail);

  // Cargar los detalles de la receta al montar el componente
  useEffect(() => {
    dispatch(getRecipeById(id));

    // Limpieza al desmontar el componente
    return () => {
      dispatch(cleanDetail());
    };
  }, [dispatch, id]);

  // Función para eliminar etiquetas HTML del texto
  const stripHtmlTags = (html) => {
    const tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  };

  // Agrega console.log para depurar
  console.log("recipeDetail:", recipeDetail);

  // Renderizar el componente
  return (
    <div className={style.bigContainer}>
  {Object.keys(recipeDetail).length === 0 ? (
    <div className={style.loadContainer}>
      <span className={style.loader}></span>
    </div>
  ) : (
    <div className={style.container}>
      <div className={style.main}>
        {/* Botón para regresar a la lista de recetas */}
        <div className={style.closeBtnContainer}>
          <Link to={"/recipes"}>
            <button className={style.closeBtn}>X</button>
          </Link>
        </div>
        {/* Bloque de imagen de la receta */}
        <div className={style.block}>
          <img
            className={style.image}
            src={recipeDetail?.image}
            alt={recipeDetail?.name}
          />
        </div>
            {/* Bloque de información de la receta */}
            <div className={style.block}>
              <div className={style.info}>
                <div className={style.title}>
                  <h2>{recipeDetail?.name}</h2>
                </div>
                <div className={style.hScore}>
                  <ins>HealthScore:</ins>
                  <p>{recipeDetail?.healthScore}</p>
                </div>
                {/* Renderiza el resumen sin etiquetas HTML */}
                <p>{stripHtmlTags(recipeDetail?.summary)}</p>
              </div>
            </div>
            {/* Bloque de pasos de la receta */}
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
            {/* Bloque de tipos de dieta */}
            <div className={style.block}>
              <h2 className={style.subTitle}>Tipos de dieta</h2>
              <div className={style.dietsTags}>
                {recipeDetail?.TypeDiets?.map((diet) => (
                  <div key={diet} className={style.diet}>
                    {diet}
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
