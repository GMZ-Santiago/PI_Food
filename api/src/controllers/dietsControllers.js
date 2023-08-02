const axios = require("axios");
const { Diets } = require("../db");
const { API_KEY } = process.env;
const API_URL = "https://api.spoonacular.com/recipes";

const getDiets = async () => {
  try {
    const response = await axios.get(
      `${API_URL}/complexSearch?apiKey=${API_KEY}&number=100&addRecipeInformation=true`
    );
    const results = response.data.results;
    const dataDiets = results.flatMap((recipe) => recipe.diets);
    const uniqueDiets = [...new Set(dataDiets)];
    const transformedData = uniqueDiets.map((diet) => ({
      name: diet,
    }));

    Diets.bulkCreate(transformedData);
  } catch (error) {
    return { error: "Error al conseguir las dietas de la API" };
  }
};

module.exports = { getDiets };
