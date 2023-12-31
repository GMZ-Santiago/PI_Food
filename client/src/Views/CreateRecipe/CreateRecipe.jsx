import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import style from "./CreateRecipe.module.css";
import { getTypeDiets, postRecipes } from "../../redux/actions";
import validations from "./validations";

const CreateRecipe = () => {
  const dispatch = useDispatch();
  const allDiets = useSelector((state) => state.allDiets);

  const [errors, setErrors] = useState({});
  const [recipe, setRecipe] = useState({
    name: "",
    summary: "",
    healthScore: 0,
    steps: [{ number: 1, step: "" }],
    image: "",
    typeDiets: [],
    dietsName: [],
  });

  useEffect(() => {
    if (allDiets.length === 0) {
      dispatch(getTypeDiets());
    }
  }, [allDiets.length, dispatch]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      [name]: value,
    }));
    setErrors(
      validations({
        ...recipe,
        [name]: value,
      })
    );
  };

  const handleDiets = (event) => {
    const dietId = event.target.value;
    const dietName = allDiets.find((diet) => diet.id === +dietId)?.name;

    if (!dietName) return;

    const isDietChecked = recipe.dietsName.includes(dietName);

    if (isDietChecked) {
      const updatedDietsId = recipe.typeDiets.filter((item) => item !== dietId);
      const updatedDietsName = recipe.dietsName.filter(
        (item) => item !== dietName
      );
      setRecipe({
        ...recipe,
        typeDiets: updatedDietsId,
        dietsName: updatedDietsName,
      });
    } else {
      setRecipe({
        ...recipe,
        typeDiets: [...recipe.typeDiets, dietId],
        dietsName: [...recipe.dietsName, dietName],
      });
    }
  };

  const handleSteps = (event, index, field) => {
    const newSteps = [...recipe.steps];
    newSteps[index][field] = event.target.value;
    setRecipe({
      ...recipe,
      steps: newSteps,
    });
  };

  const addStep = () => {
    const newStepNumber = recipe.steps.length + 1;
    setRecipe({
      ...recipe,
      steps: [...recipe.steps, { number: newStepNumber, step: "" }],
    });
  };

  const removeStep = (index) => {
    const newSteps = [...recipe.steps];
    newSteps.splice(index, 1);
    setRecipe({
      ...recipe,
      steps: newSteps,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validationErrors = validations(recipe);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      dispatch(postRecipes(recipe));
      setRecipe({
        name: "",
        summary: "",
        healthScore: 0,
        steps: [{ number: 1, step: "" }],
        image: "",
        typeDiets: [],
        dietsName: [],
      });
    }
  };

  const isFormValid =
    !errors.name &&
    !errors.summary &&
    !errors.healthScore &&
    !errors.image &&
    !errors.typeDiets &&
    recipe.steps.every((step) => !!step.step.trim());

  return (
    <div
      className={style.card}
      style={
        {
          /* ... */
        }
      }
    >
      <div className={style.cardHeader}>
        <div className={style.textHeader}>Crea tu receta!</div>
      </div>
      <div className={style.cardBody}>
        <form onSubmit={handleSubmit}>
          <div className={style.formGroup}>
            <label htmlFor="name">Nombre de la receta: </label>
            <input
              onChange={handleChange}
              type="text"
              name="name"
              value={recipe.name}
            />
            {errors.name && <p className={style.error}>{errors.name}</p>}
          </div>

          <div className={style.formGroup}>
            <label htmlFor="summary">Resumen de la receta: </label>
            <textarea
              onChange={handleChange}
              type="text"
              name="summary"
              value={recipe.summary}
            />
            {errors.summary && <p className={style.error}>{errors.summary}</p>}
          </div>

          <div className={style.formGroup}>
            <label htmlFor="healthScore">
              Índice de salubilidad:{" "}
              <b className={style.hsValue}>{recipe.healthScore}</b>{" "}
            </label>
            <input
              className={style.range}
              onChange={handleChange}
              type="range"
              name="healthScore"
              value={recipe.healthScore}
            />
            {errors.healthScore && (
              <p className={style.error}>{errors.healthScore}</p>
            )}
          </div>

          <div className={style.formGroup}>
            {errors.steps && <p className={style.error}>{errors.steps}</p>}
            <label htmlFor="steps">Pasos a seguir: </label>
            {recipe.steps.map((step, index) => (
              <div key={index} className={style.stepContainer}>
                <input
                  type="text"
                  onChange={(event) => handleSteps(event, index, "step")}
                  value={step.step}
                />
                {index > 0 && (
                  <button
                    type="button"
                    className={style.btn2}
                    onClick={() => removeStep(index)}
                  >
                    Eliminar paso
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              className={style.btn2}
              disabled={!recipe.steps[recipe.steps.length - 1].step}
              onClick={addStep}
            >
              Añadir paso
            </button>
          </div>

          <div className={style.formGroup}>
            <label htmlFor="image">Imagen</label>
            <input
              onChange={handleChange}
              type="text"
              name="image"
              value={recipe.image}
              placeholder="image_default.jpg"
            />
            {errors.image && <p className={style.error}>{errors.image}</p>}
          </div>

          <div className={style.formGroup}>
            <label htmlFor="Diets">Tipo de dieta</label>
            <div className={style.formDiet}>
              {allDiets?.map((diet) => (
                <div key={diet.id} className={style.dietsC}>
                  <label>{diet.name.toUpperCase()}</label>
                  <input
                    onChange={handleDiets}
                    type="checkbox"
                    name="typeDiets"
                    value={diet.id}
                  />
                </div>
              ))}
            </div>
            {errors.typeDiets && (
              <p className={style.error}>{errors.typeDiets}</p>
            )}
          </div>

          {Object.keys(errors).length > 0 && (
            <p className={style.adv}>
              Complete todos los campos necesarios para crear la receta.
            </p>
          )}

          <button
            type="submit"
            className={`${style.btn} ${isFormValid ? "" : style.btnDisabled}`}
          >
            Crear receta
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateRecipe;
