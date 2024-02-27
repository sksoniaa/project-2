var express = require('express');
var router = express.Router();
const recipeCtrl = require('../controllers/recipes')

router.get('/', isLoggedIn, movieCtrl.index)

module.exports = router;
