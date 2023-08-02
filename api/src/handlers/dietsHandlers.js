const {Diets} = require("../db");
const {getDiets} = require("../controllers/dietsControllers")

const getDietsHandler = async (req, res) => {
    try {
        const diets = await Diets.findAll()

        if(diets.length === 0) {
            await getDiets()
        }
        const dbDiets = await Diets.findAll()

        return res.status(200).json(dbDiets)
    } catch (error) {
        return res.status(400).json({error: error.message})
    }
}

module.exports = {
    getDietsHandler
}