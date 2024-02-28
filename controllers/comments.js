const RecipeModel = require('../models/recipe')

module.exports = {
  create,
  delete: deleteComment,
  edit,
  update
}

async function update(req, res) {
  const recipeDoc = await RecipeModel.findOne({'comments._id': req.params.id});
  console.log(recipeDoc, "<-- recipeDoc");
  const commentSubdoc = recipeDoc.comments.id(req.params.id);
  if (!commentSubdoc.user.equals(req.user._id)) return res.redirect(`/recipes/${recipeDoc._id}`);
  // Update the text of the comment
  console.log(req.body);
  commentSubdoc.content = req.body.content;
  try {
    await recipeDoc.save();
  } catch (e) {
    console.log(e.message);
  }
  // Redirect back to the book's show view
  res.redirect(`/recipes/${recipeDoc._id}`);
}

async function edit(req, res) {
   const recipeDoc = await RecipeModel.findOne({'comments._id': req.params.id});
   const comment = recipeDoc.comments.id(req.params.id);
   res.render('recipes', { comment });
}

async function deleteComment(req,res) {
  try{
    const recipeDoc = await RecipeModel.findOne({'comments._id': req.params.id})
    if (!recipeDoc) return res.redirect(`/recipes`)
    recipeDoc.comments.remove(req.params.id)
    recipeDoc.save()
    res.redirect(`/recipes/${recipeDoc._id}`)
  } catch(err) {
    res.send(err)
  }
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