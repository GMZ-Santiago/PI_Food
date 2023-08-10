const validations = (recipe) => {

    let errors = {};

    if (!recipe.name) errors.name = "Por favor, introduce el nombre de la receta";

    if (!recipe.summary) errors.summary = "Por favor, introduce un breve resumen de la receta";

    if (!recipe.image) errors.image = "Por favor, introduce una imagen ilustrativa de la receta";

    if (!recipe.typeDiets || recipe.typeDiets.length === 0) errors.typeDiets = "Por favor, selecciona el tipo de dieta";
  
    return errors;
  }

  export default validations