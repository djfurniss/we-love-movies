const service = require("./movies.service");
const asyncErrBoundary = require("../errors/asyncErrBoundary");

//---validation---
const movieExists = async (req, res, next) => {
    const movieId = parseInt(req.params.movieId);
    const movie = await service.read(movieId);
    if (movie){
        res.locals.movie = movie
        return next();
    } res.status(404).json({error: "Movie cannot be found."})
};

//---controls---
async function list (req, res, next) {
    const { is_showing } = req.query
    if(is_showing){ //this condition either lists  that are SHOWING if the search query is present
        const data = await service.isShowing()
        res.json({ data })
    }else{ // if the search query is not present, ALL movies are returned
        const data = await service.list()
        res.json({ data })
    };
};

async function read (req, res, next) { //returns one movie
    const { movie_id } = res.locals.movie
    const data = await service.read(movie_id)
    res.json({ data })
};

async function theatersWhereShowing (req, res, next) {//returns the theaters where one movie is showing
    const { movie_id } = res.locals.movie
    const data = await service.theatersWhereShowing(movie_id)
    res.json({ data })
};

module.exports = {
    list: asyncErrBoundary(list),
    read: [
        asyncErrBoundary(movieExists), 
        asyncErrBoundary(read)
    ],
    theatersWhereShowing: [
        asyncErrBoundary(movieExists), 
        asyncErrBoundary(theatersWhereShowing)
    ],
    movieExists //exported to use in moviesRouter: "movies/:movieId/reviews" route that's rerouted to reviewsRouter
};