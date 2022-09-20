const router = require("express").Router({mergeParams: true});
const methodProhibited = require("../errors/methodProhibited")
const controller = require("./reviews.controller")

// router.use((req, res, next) => {
//     console.log(req)
//     res.json({message:"here"})
// });

router
    .route("/:movieId/reviews")
    .get(controller.list)

//mounted to /reviews
router
    .route("/:reviewId")
    .put(controller.update)
    .delete(controller.delete)
    .all(methodProhibited)

module.exports = router;