const express = require('express');
const router = express.Router();
const GamesController = require('./controllers.js');

router.get('/games', GamesController.getAllGames);
router.get('/games/:id', GamesController.getGameById);
router.post('/games', GamesController.createGame);
router.put('/games/:id', GamesController.updateGame);
router.delete('/games/:id', GamesController.deleteGame);

router.get('/filter', GamesController.filterGames);
router.get('/stats/best-rated', GamesController.topRatedGames);
router.get('/stats/worst-rated', GamesController.topWorstGames);
router.get('/stats/developers', GamesController.getDeveloperStats);
router.get('/stats/publishers', GamesController.getPublisherStats);

module.exports = router;
