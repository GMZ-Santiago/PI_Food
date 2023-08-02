const {Router} = require("express");
const {getDietsHandler} = require("../handlers/dietsHandlers")
const dietsRouter = Router();

dietsRouter.use("/", getDietsHandler)

module.exports = dietsRouter