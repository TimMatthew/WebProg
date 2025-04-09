const Game = require("./model.js");

class GamesDAO {
    static async createGame(gameData) {
        try {
            const newGame = new Game(gameData);
            await newGame.save();
            return newGame;
        } catch (err) {
            throw new Error("Error creating game: " + err.message);
        }
    }

    static async getGameById(gameId) {
        try {
            return await Game.findById(gameId);
        } catch (err) {
            throw new Error("Error fetching game: " + err.message);
        }
    }

    static async getAllGames() {
        try {
            return await Game.find();
        } catch (err) {
            throw new Error("Error fetching games: " + err.message);
        }
    }

    static async updateGame(gameId, updatedData) {
        try {
            return await Game.findByIdAndUpdate(gameId, updatedData, { new: true });
        } catch (err) {
            throw new Error("Error updating game: " + err.message);
        }
    }

    static async deleteGame(gameId) {
        try {
            return await Game.findByIdAndDelete(gameId);
        } catch (err) {
            throw new Error("Error deleting game: " + err.message);
        }
    }

    static async getGamesByFilter(filters) {
        try {
            return await Game.find(filters, null, null);
        } catch (err) {
            throw new Error("Error fetching filtered games: " + err.message);
        }
    }

    static async getTopRatedGames() {
        try {
            return await Game.find().sort({ metacritic_rating: -1 }).limit(10);
        } catch (err) {
            throw new Error("Error fetching top-rated games: " + err.message);
        }
    }

    static async getWorstRatedGames() {
        try {
            return await Game.find().sort({ metacritic_rating: 1 }).limit(10);
        } catch (err) {
            throw new Error("Error fetching worst-rated games: " + err.message);
        }
    }

    static async getDeveloperStats() {
        try {
            return await Game.aggregate([
                { $group: { _id: "$developer", games_developed: { $sum: 1 }, average_rating: { $avg: "$metacritic_rating" } } }
            ]);
        } catch (err) {
            throw new Error("Error generating developer stats report: " + err.message);
        }
    }

    static async getPublisherStats() {
        try {
            return await Game.aggregate([
                { $group: { _id: "$publisher", games_published: { $sum: 1 }, average_rating: { $avg: "$metacritic_rating" } } }
            ]);
        } catch (err) {
            throw new Error("Error generating publisher stats report: " + err.message);
        }
    }
}

module.exports = GamesDAO;
