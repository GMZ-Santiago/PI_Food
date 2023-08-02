const { Router } = require("express");
const { getRecipeHandler, getRecipeByIdHandler, postRecipeHandler } = require("../handlers/recipesHandlers");
const recipesRouter = Router();

recipesRouter.get("/", getRecipeHandler);
recipesRouter.get("/:idRecipe", getRecipeByIdHandler);
recipesRouter.post("/createRecipe", postRecipeHandler);

module.exports = recipesRouter;
