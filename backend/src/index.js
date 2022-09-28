
(async () => {

    const express = require('express')

    const app = express()

    const corsD = require("cors")

    const routes = require('../config/routes')

    const cors = corsD

    app.listen(3001)

    app.use(cors({
        origin: '*'
    }));

    app.use(routes)


})();

