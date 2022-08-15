const mongoose = require('mongoose');
const Schema = mongoose.Schema

const coffeeSchema = new Schema({
    name: String,
    alternate_names: {type: String, required: false},
    country_of_origin: String,
    type: String,
    coffee_base: String,
    main_ingredients: String,
    similar_drinks: String,
    preparation: String,
    taste: String,
    notes: String,
    img: {type: String, required: false}
}, {timestamps: true})


const coffeeCollection = mongoose.model('Coffee', coffeeSchema);

module.exports = coffeeCollection;