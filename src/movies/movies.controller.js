const service = require("./movies.service");
const asyncErrBoundary = require("../errors/asyncErrBoundary");

//---validation---
const movieExists = async (req, res, next) => {
    const movieId= parseInt(req.params.movieId);
    const movie = await service.read(movieId);
    if (movie){
        res.locals.movie = movie
        return next();
    } res.status(404).json({error: "Movie cannot be found."})
};

//---controls---
async function list (req, res, next) {
    const {is_showing} = req.query
    if(is_showing){
        const data = await service.isShowing()
        res.json({ data })
    }else{
        const data = await service.list()
        res.json({ data })
    };
};

async function read (req, res, next) {
    const { movie_id } = res.locals.movie
    const data = await service.read(movie_id)
    res.json({ data })
};

async function theatersWhereShowing (req, res, next) {
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
    ],movieExists
};