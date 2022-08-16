const mongoose = require('mongoose');
const Schema = mongoose.Schema

const coffeeSchema = new Schema({
    name: String,
    alternate_names: String,
    country_of_origin: String,
    type: String,
    coffee_base: String,
    main_ingredients: String,
    similar_drinks: String,
    preparation: String,
    taste: String,
    notes: String,
    img: String
}, {timestamps: true})


const Coffee = mongoose.model('Coffee', coffeeSchema);

module.exports = Coffee;