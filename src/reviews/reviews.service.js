const knex = require("../db/connection");
const reduceProperties = require("../utils/reduce-properties");

//---property configs---
const addCategory = reduceProperties("review_id", {
    "preferred_name": ["critic", null, "preferred_name"],
    "surname": ["critic", null, "surname"],
    "organization_name": ["critic", null, "organization_name"]
});

//--- services ---

function list (movie_id) {
    return knex("movies as m")
        .join("reviews as r", "r.movie_id", "m.movie_id")
        .join("critics as c", "c.critic_id", "r.critic_id")
        .select("r.*", "c.*")
        .where({"m.movie_id": movie_id})
        .then(addCategory)
        .then(reviews=>{
            return reviews.map(review=>{
                review.critic = review.critic[0]
                return review;
            })
        })
};

function read (review_id) {
    return knex("reviews as r")
        .select("*")
        .join("critics as c", "c.critic_id", "r.critic_id")
        .where({ review_id })
        .then(addCategory)
        .then(reviews=>{
            return reviews.map(review=>{
                review.critic = review.critic[0]
                return review;
            })
        }).then(arr => arr[0])
};

function update (review_id, updatedReview) {
        knex("reviews")
        .select("*")
        .where({ review_id })
        .update(updatedReview, "*")
        .then(arr => arr[0])

        return read(review_id)
};

function destroy (review_id) {
    return knex("reviews")
        .where({ review_id })
        .del()
};

module.exports = {
    list,
    read,
    update,
    delete: destroy
};