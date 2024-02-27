var express = require('express');
var router = express.Router();
const recipeCtrl = require('../controllers/recipes')
const isLoggedIn = require('../config/auth')


router.get('/', recipeCtrl.index)
router.get('/new', recipeCtrl.new)

router.get('/:id', recipeCtrl.show)
router.post('/', recipeCtrl.create)



module.exports = router;
