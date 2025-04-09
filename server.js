const express = require("express");
const mongoose = require('mongoose');
const gamesRoutes = require("./routes.js")
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());
const PORT = 5000;
const MONGO_URI = "mongodb+srv://vasylshlapak14:IeuLQZD4cYou0dIp@cluster0.xu6uy.mongodb.net/Games_DB?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log("Database Connection Error:", err));

app.use('/api', gamesRoutes);
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});