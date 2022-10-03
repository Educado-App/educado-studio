const cors = require('cors')

const corsConfig = {
    origin: 'http://127.0.0.1:5173',
    optionsSuccessStatus: 200,
    exposedHeaders: ['Content-Range', 'X-Content-Range']
}

module.exports = cors(corsConfig)