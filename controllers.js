const GamesDAO = require("./DAO.js");

class GamesController {
    static async getAllGames(req, res) {
        try {
            const games = await GamesDAO.getAllGames();
            res.json(games);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    static async getGameById(req, res) {
        try {
            const game = await GamesDAO.getGameById(req.params.id);
            if (!game) return res.status(404).json({ message: "Game not found" });
            res.json(game);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    static async createGame(req, res) {
        try {
            const newGame = await GamesDAO.createGame(req.body);
            res.status(201).json(newGame);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }

    static async topRatedGames(req, res){
        try {
            const bestRatedGames = await GamesDAO.getTopRatedGames();
            res.json(bestRatedGames);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    static async topWorstGames(req, res){
        try {
            const worstRatedGames = await GamesDAO.getWorstRatedGames();
            res.json(worstRatedGames);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    static async updateGame(req, res) {
        try {
            const updatedGame = await GamesDAO.updateGame(req.params.id, req.body);
            if (!updatedGame) return res.status(404).json({ message: "Game not found" });
            res.json(updatedGame);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }

    static async filterGames(req, res) {
        try {

            const { game_title, genres, release_year, developer, publisher, metacritic_rating, minRate, maxRate } = req.query;

            const titleFilter = game_title ? { game_title: game_title } : {};
            const genresFilter = genres ? { genres: { $all: genres.split(",") } } : {};
            const yearFilter = release_year ? { release_year: release_year } : {};
            const simpleRatingFilter = metacritic_rating ? { metacritic_rating: metacritic_rating } : {};
            const developerFilter = developer ? { developer: developer } : {};
            const publisherFilter = publisher ? { publisher: publisher } : {};

            const ratingFilter = {};
            if (minRate) ratingFilter.$gte = minRate;
            if (maxRate) ratingFilter.$lte = maxRate;
            const ratingFinalFilter = Object.keys(ratingFilter).length > 0 ? { metacritic_rating: ratingFilter } : {};

            const filters = { ...titleFilter, ...genresFilter, ...yearFilter, ...developerFilter, ...publisherFilter, ...simpleRatingFilter, ...ratingFinalFilter };

            const filteredGames = await GamesDAO.getGamesByFilter(filters);
            res.json(filteredGames);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    static async deleteGame(req, res) {
        try {
            const deletedGame = await GamesDAO.deleteGame(req.params.id);
            if (!deletedGame) return res.status(404).json({ message: "Game not found" });
            res.json({ message: "DELETED" });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    static async getDeveloperStats(req, res) {
        try {
            const report = await GamesDAO.getDeveloperStats();
            res.json(report);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    static async getPublisherStats(req, res) {
        try {
            const report = await GamesDAO.getPublisherStats();
            res.json(report);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}

module.exports = GamesController;
