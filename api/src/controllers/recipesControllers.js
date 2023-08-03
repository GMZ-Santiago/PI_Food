require("dotenv").config();
const axios = require("axios");
const { Recipe, Diets } = require("../db");
const { API_KEY } = process.env;
const API_URL = `https://api.spoonacular.com/recipes`;
const { Op } = require("sequelize");

const getRecipeById = async (id) => {
    if (isNaN(+id)) {
      const recetaId = await Recipe.findByPk(id, {include: [{model: Diets, through:{attributes:[]}}]})
    return recetaId
    } else {
      try {
        const response = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`);
        const recetaId = {
          id: response.data.id,
          title: response.data.title,
          image: response.data.image,
          summary: response.data.summary,
          healthScore: response.data.healthScore,
          analyzedInstructions: response.data.analyzedInstructions[0].steps,
          TypeDiets: response.data.diets,
          created: false   
        }
        return recetaId
      } catch (error) {
        return { error: `No existe la receta con ID: ${id}` };
      }
    }
  };

const formatRecipe = (recipe) => {
  return {
    id: recipe.id,
    name: recipe.name,
    image: recipe.image,
    healthScore: recipe.healthScore,
    summary: recipe.summary.replace(/(&nbsp;|<([^>]+)>)/gi, ""),
    dietsName: recipe.diets,
    steps: recipe.steps,
  };
};

const getAllRecipe = async () => {
  const infoDb = await Recipe.findAll({
    include: [{ model: Diets, through: { attributes: [] } }],
  });

  const { data } = await axios.get(`${API_URL}/complexSearch?apiKey=${API_KEY}&number=100&addRecipeInformation=true`);

  const infoApi = data.results;
  const RecipeApi = infoApi.map((recipe) => formatRecipe(recipe));

  return [...RecipeApi, ...infoDb.map((recipe) => formatRecipe(recipe))];
};

const getRecipeByName = async (name) => {
  const { data } = await axios.get(`${API_URL}/complexSearch?titleMatch=${name}&apiKey=${API_KEY}&addRecipeInformation=true`);

  const apiCoincidences = data.results.map((recipe) => formatRecipe(recipe));

  const dbCoincidences = await Recipe.findAll({
    where: { name: { [Op.iLike]: `%${name}%` } },
    include: [{ model: Diets, through: { attributes: [] } }],
  });

  return [
    ...apiCoincidences,
    ...dbCoincidences.map((recipe) => formatRecipe(recipe)),
  ];
};

const postRecipeController = async (req, res) => {
  try {
    const { name, image, summary, healthScore, steps, typeDiets, dietsName } =
      req.body;

    if (
      !name ||
      !image ||
      !summary ||
      !healthScore ||
      !steps ||
      !typeDiets ||
      !dietsName
    ) {
      throw new Error("All fields are required for validation.");
    }

    const newRecipe = await Recipe.create({
      name,
      image,
      summary,
      healthScore,
      steps,
      dietsName,
    });

    const selectedDiets = await Diets.findAll({ where: { id: typeDiets } });
    if (!selectedDiets.length) {
      throw new Error("No diets found with the provided IDs");
    }

    await newRecipe.addDiets(selectedDiets);

    const resultRecipe = await Recipe.findByPk(newRecipe.id, {
      include: [Diets],
    });

    res.status(200).json(formatRecipe(resultRecipe));
  } catch (error) {
    if (error.message === "No diets found with the provided IDs") {
      res.status(400).json({ error: error.message });
    } else if (error.message === "All fields are required for validation.") {
      res.status(404).json({ error: error.message });
    } else {
      res
        .status(500)
        .json({ error: "An error occurred while creating the recipe" });
    }
  }
};

module.exports = {
  getAllRecipe,
  getRecipeByName,
  getRecipeById,
  postRecipeController,
};
