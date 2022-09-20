function methodProhibited (req, res, next){
    res.status(405).json({error: `${req.method} method not allowed on this route.`})
};

module.exports = methodProhibited;