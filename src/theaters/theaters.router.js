const router = require("express").Router();
const controller = require("./theaters.controller");
const methodProhibited = require("../errors/methodProhibited")

//mounted to "/theaters"
router
    .route("/")
    .get(controller.list)
    .all(methodProhibited)

module.exports = router