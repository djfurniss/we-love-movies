const router = require("express").Router();
const reviewsRouter = require("../reviews/reviews.router");
const controller = require("./movies.controller");
const methodProhibited = require("../errors/methodProhibited");

//mounted to "/movies"
router
    .route("/")
    .get(controller.list)
    .all(methodProhibited)

router
    .route("/:movieId")
    .get(controller.read)
    .all(methodProhibited)
    
router
    .route("/:movieId/theaters")
    .get(controller.theatersWhereShowing)
    .all(methodProhibited)

router
    .route("/:movieId/reviews")
    .get(controller.movieExists, reviewsRouter) //rerouted to get resources from "/reviews" route
    .all(methodProhibited)

module.exports = router;