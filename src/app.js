if (process.env.USER) require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const moviesRouter = require("./movies/movies.router");
const reviewsrouter = require("./reviews/reviews.router");
const theatersRouter = require("./theaters/theaters.router")

//---app level middleware---
app.use(cors());
app.use(express.json());

//---routes---
app.use("/movies", moviesRouter);
app.use("/reviews", reviewsrouter);
app.use("/theaters", theatersRouter);

//---not found---
app.use((req, res, next) => {
    res.status(404).json({error: `Page not found: ${req.path}`})
});

//---error handling---
app.use((err, req, res, next) => {
    const { status, message } = err
    res.status(status).json({message})
});

module.exports = app;
