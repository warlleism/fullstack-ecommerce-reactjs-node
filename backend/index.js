
(async () => {

    const express = require('express')

    const app = express()

    const corsD = require("cors")

    const cors = corsD

    const db = require("./db");

    app.listen(3001)

    app.use(cors({
        origin: '*'
    }));

    //Rota para listagem de produtos
    app.get('/listar', async (req, res) => {
        const clientes = await db.listarProduto()
        res.send(clientes)
    })

    //Rota para listagem de tipos
    app.get('/tipos', async (req, res) => {
        const clientes = await db.listarTipos()
        res.send(clientes)
    })


})();

