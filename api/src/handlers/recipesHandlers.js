const {getRecipeById, getRecipeByName, getAllRecipe, postRecipeController} = require("../controllers/recipesControllers");
const {Food, Recipe, Diets} = require("../db");

const getRecipeByIdHandler = async (req, res) => {
    const {idRecipe} = req.params

    try {
        const recipe = await getRecipeById(idRecipe)
        return res.status(200).json(recipe)
    } catch (error) {
        return res.status(400).send({error: error.message})
    }
}

const getRecipeHandler = async (req, res) => {
    try {
        const {name} = req.query
        const result = name ? await getRecipeByName(name) : await getAllRecipe()

        return res.status(200).json(result)
    } catch (error) {
        return res.status(400).json({error: error.message})
    }
}

const postRecipeHandler = async (req, res) => {
    try {
        await postRecipeController(req, res);
    } catch (error) {
        res.status(500).json({error: "An error occurred while creating the recipe"});
    }
}

module.exports = {
    getRecipeByIdHandler,
    getRecipeHandler,
    postRecipeHandler
}