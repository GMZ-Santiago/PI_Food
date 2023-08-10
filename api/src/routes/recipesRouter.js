const { Router } = require("express");
const { getRecipeHandler, getRecipeByIdHandler, postRecipeHandler } = require("../handlers/recipesHandlers");
const recipesRouter = Router();

recipesRouter.get("/", getRecipeHandler);
recipesRouter.get("/:idRecipe", getRecipeByIdHandler);
recipesRouter.post("/createRecipe", postRecipeHandler);

module.exports = recipesRouter;


// {
//     "nombre": "Pastel de Papa",
//     "resumen": "Consiste en una receta basada en papa y carne picada",
//     "indiceSalud": "85",
//     "pasos": "Trizar carne, condimentar, implementar en un recipite la papa y carne intercaladamente",
//     "dietas": "gluten free"
// }