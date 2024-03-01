const RecipeModel = require('../models/recipe')
const IngredientModel = require('../models/ingredient');

module.exports = {
  new: newRecipe,
  create,
  index,
  show,
}



// SHOW FUNCTION
async function show(req, res) {
  try{
    const recipeFromTheDatabase = await RecipeModel
    .findById(req.params.id)
    .populate('list')
    .exec();
    
    
    console.log(recipeFromTheDatabase);
    
    const IngredientsNotInTheRecipe = await IngredientModel.find({_id: {$nin: recipeFromTheDatabase.list}});
    
    res.render('recipes/show', {
      recipe: recipeFromTheDatabase,
      ingredients: IngredientsNotInTheRecipe
    })
  } catch(err) {
    res.send(err)
  }
}

// INDEX FUNCTION
async function index(req, res) {
  try{
    const recipeFromTheDB = await RecipeModel.find({})
    
    res.render('recipes/index', {recipeDocs: recipeFromTheDB})
  } catch(err) {
    res.redirect('/')
  }
}

// CREATE FUNCTION
async function create(req, res) {
  for (let key in req.body) {
    if (req.body[key] === "") delete req.body[key];
  }
  try{
    const recipeFromTheDatabase = await RecipeModel.create(req.body);
    
    res.redirect(`/recipes/${recipeFromTheDatabase._id}`);
  } catch(err) {
    res.redirect("/recipes/new");
  }
}

// NEW FUNCTION
function newRecipe(req, res) {
  res.render('recipes/new')
}



