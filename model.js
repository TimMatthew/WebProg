const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema({
    game_title: { type: String, required: true },
    developer: { type: String, required: true },
    publisher: { type: String, required: true },
    release_year: { type: String, required: true },
    genres: { type: [String], required: true },
    metacritic_rating: { type: Number, required: true }
},{versionKey : false});

module.exports = mongoose.model('Games', gameSchema, 'Games');