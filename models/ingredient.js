const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// the schema enforces the shape of the documents we create
// in the performers collection
const ingredientSchema = new Schema({
  name: {type: String, required: true, unique: true},
  born: Date
}, {
  timestamps: true
});

module.exports = mongoose.model('Ingredient', ingredientSchema);