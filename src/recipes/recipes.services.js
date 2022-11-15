const Recipes = require("../models/recipes.models");
const recipeControllers = require("./recipes.controllers");

const getAllRecipes = (req, res) => {
  recipeControllers
    .getAllRecipes()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
};

const getRecipeById = (req, res) => {
  const id = req.params.recipe_id;

  recipeControllers
    .getRecipeById(id)
    .then((data) => {
      if (data) {
        res.status(200).json(data);
      } else {
        res.status(400).json({ message: `ID: ${id}, not exist` });
      }
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
};

const createRecipe = (req, res) => {
  const { title, description, urlImg, time, portions, categoryId, origin } =
    req.body;
  const userId = req.user.id;
  if (title && description && time && portions && categoryId) {
    Recipes.createRecipe({
      title,
      description,
      urlImg,
      time,
      portions,
      categoryId,
      origin,
      userId,
    })
      .then((data) => {
        res.status(201).json(data);
      })
      .catch((err) => {
        res.status(400).json({ message: err.message });
      });
  } else {
    res.status(400).json({
      message: "Invalid data",
      fields: {
        time: "string",
        description: "string",
        time: "number",
        portions: "number",
        categoryId: "number",
      },
    });
  }
};

const patchRecipe = (req, res) => {
  const { title, description, urlImg, time, portions, categoryId, origin } =
    req.body;
  const id = req.params.recipe_id;
  recipeControllers
    .updateRecipe(id, {
      title,
      description,
      urlImg,
      time,
      portions,
      categoryId,
      origin,
    })
    .then((data) => {
      if (data[0]) {
        res
          .status(200)
          .json({ message: `Recipe with ID: ${id} edited succesfully` });
      } else {
        res.status(404).json({ message: "invalid ID", id });
      }
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
};

const deleteRecipe = (req, res) => {
  const id = req.params.recipe_id;
  recipeControllers
    .deleteRecipe(id)
    .then((data) => {
      if (data) {
        res.status(204).json();
      } else {
        res.status(404).json({ message: "Invalid ID", id });
      }
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
};

const getMyRecipes = (req, res) => {
  const userId = req.user.id;
  recipeControllers
    .getMyRecipes(userId)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
};

module.exports = {
  getAllRecipes,
  getRecipeById,
  createRecipe,
  patchRecipe,
  deleteRecipe,
  getMyRecipes,
};
