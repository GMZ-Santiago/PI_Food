// require("dotenv").config();
// const axios = require("axios");
// const {Recipe, Diets} = require("../db");
// const {API_KEY} = process.env;
// const API_URL = `https://api.spoonacular.com/Recipes/complexSearch?apiKey=${API_KEY}&number=100&addRecipeInformation=true`
// const {Op} = require("sequelize");

// const getRecipeById = async (idRecipe) => {
//     try {
//         if (isNaN(+idRecipe)) {
//             const Recipe = await Recipe.findByPk(idRecipe, {include: [{model: Diets, through: {attributes: []}}]})
//             return Recipe
//         } else {
//             const {data} = await axios.get(`${API_URL}/${idRecipe}/information?apiKey=${API_KEY}`)

//             const Recipe = {
//                 id: idRecipe,
//                 name: data.title,
//                 image: data.image,
//                 healthScore: data.healthScore,
//                 summary: data.summary.replace(/(&nbsp;|<([^>]+)>)/ig, ""),
//                 dietsName: data.diets,
//                 steps: data.analyzedInstructions[0]?.steps.map((element) => {
//                     return {
//                         number: element.number,
//                         step: element.step
//                     }
//                 }),
//                 created: false
//             }
//             return Recipe
//         }
//     } catch (error) {
//         return {error: `No existe la receta con el ID: ${idRecipe}`}
//     }
// }

// const infoCleaner = (array) => array.map(Recipe => {
//     return {
//         id: Recipe.id,
//         name: Recipe.name,
//         dietsName: Recipe.diets,
//         image: Recipe.image,
//         summary: Recipe.summary.replace(/(&nbsp;|<([^>]+)>)/ig, ""),
//         healthScore: Recipe.healthScore,
//         steps: Recipe.Recipe.analyzedInstructions[0]?.steps.map((element) => {
//             return {
//                 number: element.number,
//                 step: element.step
//             }
//         }),
//         vegetarian: Recipe.vegetarian,
//         vegan: Recipe.vegan,
//         glutenFree: Recipe.glutenFree
//     }
// }) 
// const getAllRecipess = async () => {
//     const infoDb = await Recipe.findAl()

//     const {data} = await axios.get(`${API_URL}/complexSearch?apiKey=${API_KEY}&number=100&addRecipeInformation=true`)

//     const infoApi = data.results
//     const RecipeApi = infoCleaner(infoApi)

//     return[...RecipeApi, ...infoDb]
// }

// const getRecipeByName = async (name) => {
//     const {data} = await axios.get(`${API_URL}/complexSearch?titleMatch=${name}&apiKey=${API_KEY}&addRecipeInformation=true`)
//     const apiCoincidences = infoCleaner(data.results)
//     const dbCoincidences = await Recipe.findAll({
//         where: {name: {[Op.iLike]: `%${name}%`}},
//     })
//     return [...apiCoincidences, ...dbCoincidences]
// }

// const postRecipeController = async (req, res) => {
//     try {
//         const {name, image, summary, healthScore, steps, typeDiets, dietsName} = req.body;

//         if(!name || !image || !summary || !healthScore || !steps || !typeDiets || !dietsName) {
//             throw new Error ("All fields are required for validations")
//         }
    
//         const newRecipe = await Recipe.create({
//             name, image, summary, healthScore, steps, dietsName,
//         })
        
//         const selectedDiets = await Diets.findAll({where: {id: typeDiets}});
//         if(!selectedDiets.length) {
//             throw new Error ("No diet found with the provided IDs")
//         }
//         await newRecipe.addDiets(selectedDiets);

//         const resultRecipe = await Recipe.findByPk(newRecipe.id, {
//             include: [Diets],
//         })

//         res.status(200).json(resultRecipe);
//     } catch (error) {
//         if(error.message === "No diets found with the provided IDs") {
//             res.status(400).json({error: error.message});
//         } else if (error.message === "All fields are required for validation.") {
//             res.status(404).json({error: error.message});
//         } else {
//             res.status(500).json({error : "An error ocurred while creating the Recipe"});
//         }
//     }
// };


// module.exports = {
//     getAllRecipess,
//     getRecipeByName,
//     getRecipeById,
//     postRecipeController
// }


require("dotenv").config();
const axios = require("axios");
const { Recipe, Diets } = require("../db");
const { API_KEY } = process.env;
const API_URL = `https://api.spoonacular.com/Recipe/complexSearch?apiKey=${API_KEY}&number=100&addRecipeInformation=true`;
const { Op } = require("sequelize");

const getRecipeById = async (idRecipe) => {
    try {
        if (isNaN(+idRecipe)) {
            const recipe = await Recipe.findByPk(idRecipe, {
                include: [{ model: Diets, through: { attributes: [] } }],
            });
            return recipe;
        } else {
            const { data } = await axios.get(
                `${API_URL}&ids=${idRecipe}`
            );

            const recipeData = data[0];
            const recipe = {
                id: recipeData.id,
                name: recipeData.title,
                image: recipeData.image,
                healthScore: recipeData.healthScore,
                summary: recipeData.summary.replace(/(&nbsp;|<([^>]+)>)/gi, ""),
                dietsName: recipeData.diets,
                steps: recipeData.analyzedInstructions[0]?.steps.map((element) => {
                    return {
                        number: element.number,
                        step: element.step,
                    };
                }),
                created: false,
            };
            return recipe;
        }
    } catch (error) {
        return { error: `No existe la receta con el ID: ${idRecipe}` };
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

    const { data } = await axios.get(API_URL);

    const infoApi = data.results;
    const RecipeApi = infoApi.map((recipe) => formatRecipe(recipe));

    return [...RecipeApi, ...infoDb.map((recipe) => formatRecipe(recipe))];
};

const getRecipeByName = async (name) => {
    const { data } = await axios.get(
        `${API_URL}&titleMatch=${name}`
    );

    const apiCoincidences = data.results.map((recipe) => formatRecipe(recipe));

    const dbCoincidences = await Recipe.findAll({
        where: { name: { [Op.iLike]: `%${name}%` } },
        include: [{ model: Diets, through: { attributes: [] } }],
    });

    return [...apiCoincidences, ...dbCoincidences.map((recipe) => formatRecipe(recipe))];
};

const postRecipeController = async (req, res) => {
    try {
        const { name, image, summary, healthScore, steps, typeDiets, dietsName } = req.body;

        if (!name || !image || !summary || !healthScore || !steps || !typeDiets || !dietsName) {
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
            res.status(500).json({ error: "An error occurred while creating the recipe" });
        }
    }
};

module.exports = {
    getAllRecipe,
    getRecipeByName,
    getRecipeById,
    postRecipeController,
};
