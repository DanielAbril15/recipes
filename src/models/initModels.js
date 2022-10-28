const Users = require("./users.models");
const Categories = require("./categories.models");
const Ingredients = require("./ingredients.models");
const Instructions = require("./instructions.models");
const RecipesIngredients = require("./recipes_ingredients.models");
const Recipes = require("./recipes.models");
const Types = require("./types.models");
const UsersIngredients = require("./users_ingredients.models");
const UsersRecipes = require("./users_recipes.models");

const initModels = () => {
  Users.hasMany(Recipes);
  Recipes.belongsTo(Users);

  Users.hasMany(UsersRecipes);
  UsersRecipes.belongsTo(Users);

  Recipes.hasMany(UsersRecipes);
  UsersRecipes.belongsTo(Recipes);

  Users.hasMany(UsersIngredients);
  UsersIngredients.belongsTo(Users);

  Ingredients.hasMany(UsersIngredients);
  UsersIngredients.belongsTo(Ingredients);
};

module.exports = initModels;
