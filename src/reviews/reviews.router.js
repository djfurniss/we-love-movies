const router = require("express").Router({mergeParams: true});
const controller = require("./reviews.controller");
const methodProhibited = require("../errors/methodProhibited");

//mounted to /reviews
router
    .route("/:reviewId")
    .put(controller.update)
    .delete(controller.delete)
    .all(methodProhibited)

//mounted from "/movies/:movieId/reviews" route
router
    .route("/:movieId/reviews")
    .get(controller.list)
    .all(methodProhibited)

module.exports = router;