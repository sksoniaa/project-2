const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const commentSchema = new Schema({
  content: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    default: 5
  },
  // One to many relationship on the belongs to side
  user: {
    type: Schema.Types.ObjectId, // this is from mongoose
    ref: 'User' // this references this line mongoose.model('User', userSchema);
  },
  userName: String,
  userAvatar: String
}, {
  timestamps: true
})




// Enforces the shape of the documents (Think of objects)
// in our mongodb movies collection
const recipeSchema = new Schema({
  title: String,
  cuisine: String,
  diet: {
    type: String,
    enum: ['Paleo', 'Vegan', 'Low-Carb', 'Detox', 'Mediterranean', 'NotSure']
  },

  // Many to Many Relationship
  // Move has many Ingredients, Ingredients has many Movies
  // using referencing!
  list: [{
    type: Schema.Types.ObjectId, // this is from mongoose
    ref: 'Ingredient' // Ingredient is referencing the model name that 
    // you are creating the relationship with, mongoose.model('Ingredient', IngredientSchema);
  }],
  // One movie has many reviews, A review belongs to a movie 
  // Using embedding on the one side of the relationship
  comments: [commentSchema]
}, {
  timestamps: true
});

// Compile the schema into a model and export it
// Movie, creates a movies collection in our movies database
module.exports = mongoose.model('Recipe', recipeSchema);