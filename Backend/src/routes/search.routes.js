const express = require("express");
const searchRouter = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");
const { search } = require("../controllers/search.controller");

searchRouter.get("/",authMiddleware,search)

module.exports = searchRouter;