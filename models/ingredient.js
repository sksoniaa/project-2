const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// the schema enforces the shape of the documents we create
// in the performers collection
const ingredientSchema = new Schema({
  name: {type: String, required: true, unique: true},
  number: Number,
  unit: {
    number: String,
    enum: ['tsp.', 'tbs.', 'fl oz', 'cup', 'lb', 'oz']
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Ingredient', ingredientSchema);