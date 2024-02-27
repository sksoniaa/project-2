const IngredientModel = require("../models/ingredient");
const RecipeModel = require('../models/recipe')

module.exports = {
  new: newIngredient,
  create,
  addToList,
  delete: deleteOne
}


// DELETE FUNCTION

  async function deleteOne(req, res) {
    try{
      const recipeDoc = await RecipeModel.findOne(req.params.recipeId)
      recipeDoc.ingredients.remove(req.params.id)
      recipeDoc.save()
      res.redirect(`/recipes/${req.params.recipeId}`)

    } catch(err) {
      res.send(err)
    }
  }

// ADDTOLIST FUNCTION
async function addToList(req, res) {
  try{
    const recipeDoc = await RecipeModel.findById(req.params.recipeId)
    recipeDoc.list.push(req.body.ingredientId)
    await recipeDoc.save()
    res.redirect(`/recipes/${req.params.recipeId}`)
  } catch(err) {
    res.send(err)
  }
}

// CREATE FUNCTION
async function create(req, res) {

  try{
    const createdIngredient = await IngredientModel.create(req.body);
    console.log(createdIngredient, "<-- created Ingredient")
    res.redirect('/ingredients/new')
  } catch(err) {
    res.send(err)
  }
}

// NEW FUNCTION
async function newIngredient(req, res) {
  try{
    const allIngredients = await IngredientModel.find({});
    res.render('ingredients/new', {
      title: 'Add Ingredient',
      ingredients: allIngredients,
    });
  } catch(err) {
    res.send(err)
  }
}