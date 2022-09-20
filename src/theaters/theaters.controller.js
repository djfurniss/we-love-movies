const service = require("./theaters.service");
const asyncErrBoundary = require("../errors/asyncErrBoundary")

async function list (req, res, next) {
    const data = await service.list();
    res.json({ data })
};

module.exports = {
    list: asyncErrBoundary(list),
};