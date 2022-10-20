const router = require('express').Router();   


// http://localhost:3000/api/jwt/demo/login
router.get('/login', (req, res, next) => {
    res.send({
        value: "hello world"
    });
});

// http://localhost:3000/api/jwt/demo/register
router.post('/register', function(req, res, next){
    res.send("Accepted");
});

module.exports = router;


