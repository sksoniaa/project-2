const recipe = require('../models/recipe')
const RecipeModel = require('../models/recipe')

module.exports = {
  create
}

async function create(req, res) {
  console.log(req.user)

  try{
    const recipeDoc = await RecipeModel.findById(req.params.id)

    req.body.user = req.user._id
		req.body.userName = req.user.name
		req.body.userAvatar = req.user.avatar

    recipeDoc.comments.push(req.body);
    await recipeDoc.save()
    res.redirect(`/recipes/${req.params.id}`)

  } catch(err) {
    res.send(err)
  }
}