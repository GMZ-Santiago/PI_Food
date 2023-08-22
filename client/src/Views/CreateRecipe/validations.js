const validations = (recipe) => {
  const errors = {};

  const nameRegex = /^[\w\s]{3,35}$/;
  const summaryRegex = /^.{10,}$/;
  const imageRegex = /\.(jpg|jpeg|png|gif)$/i;
  
  if (!nameRegex.test(recipe.name)) {
    errors.name = "Por favor, introduce un nombre válido (entre 3 y 35 caracteres)";
  }

  if (!summaryRegex.test(recipe.summary)) {
    errors.summary = "El resumen debe tener al menos 10 caracteres";
  }

  if (!imageRegex.test(recipe.image)) {
    errors.image = "Por favor, introduce una imagen válida (formato: jpg, jpeg, png o gif)";
  }

  if (!recipe.typeDiets || recipe.typeDiets.length === 0) {
    errors.typeDiets = "Por favor, selecciona el tipo de dieta";
  }

  if (!recipe.steps.every(step => step.step.trim())) {
    errors.steps = "Por favor, completa todos los pasos";
  }

  return errors;
};

export default validations;
