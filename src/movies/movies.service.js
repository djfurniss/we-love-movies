const knex = require("../db/connection");

//---services---
function list () {
    return knex("movies")
        .select("*")
        .orderBy("movie_id")
};

function isShowing () {
    return knex("movies_theaters as mt")
        .join("movies as m", "m.movie_id", "mt.movie_id")
        .select("m.*")
        .where("mt.is_showing", true)
        .distinct("m.movie_id")
        .orderBy("m.movie_id")
};

function read (movie_id) {
    return knex("movies")
        .select("*")
        .where({movie_id})
        .first()
};

function theatersWhereShowing (movie_id) {
    return knex("movies as m")
        .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
        .join("theaters as t", "t.theater_id", "mt.theater_id")
        .select("t.*")
        .where({"m.movie_id": movie_id, "mt.is_showing": true})
       
};

module.exports = {
    list,
    read,
    isShowing,
    theatersWhereShowing
};