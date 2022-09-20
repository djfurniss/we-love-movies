const service = require("./reviews.service");
const asyncErrBoundary = require("../errors/asyncErrBoundary");

//---validation---
const reviewExists = async (req, res, next) => {
    const reviewId = parseInt(req.params.reviewId);
    const review = await service.read(reviewId);
    if(review){
        res.locals.review = review
        return next();
    } res.status(404).json({error: "Review cannot be found."})
};

//---controls---
async function list (req, res, next) {
    const { movieId } = req.params
    const data = await service.list(movieId)
    res.json({ data })
};

async function update (req, res, next) {
    const { review_id } = res.locals.review
    const updatedReview = req.body.data
    const data = await service.update(review_id, updatedReview)
    res.json({ data })
};

async function destroy (req, res, next) {
    const { review_id } = res.locals.review
    await service.delete(review_id)
    res.sendStatus(204)
};

module.exports = {
    list: asyncErrBoundary(list),
    update: [
        asyncErrBoundary(reviewExists), 
        asyncErrBoundary(update)
    ],
    delete: [
        asyncErrBoundary(reviewExists),
        asyncErrBoundary(destroy)
    ]
};