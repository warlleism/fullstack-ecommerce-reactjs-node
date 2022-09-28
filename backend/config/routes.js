const express = require('express')
const routes = express.Router()
const db = require('../src/db')

//Rota para listagem de produtos
routes.get('/listar', async (req, res) => {
    const clientes = await db.listarProduto()
    res.send(clientes)
})

//Rota para listagem de produtos destacados
routes.get('/listar/destaques', async (req, res) => {
    const clientes = await db.listarDestaques()
    res.send(clientes)
})

//Rota para listagem de tipos
routes.get('/tipos', async (req, res) => {
    const clientes = await db.listarTipos()
    res.send(clientes)
})

//Rota para adicionar produto ao carrinho
routes.post('/carrinho/:id/:nome/:preco/:quantidade', async (req, res) => {
    const clientes = await db.addCarrinho(req?.params?.id, req?.params?.nome, req?.params?.preco, req?.params?.quantidade)
    res.send(clientes)
})

//Rota para listar produtos no carrinho
routes.get('/carrinho/listar', async (req, res) => {
    const clientes = await db.listarProdutoCarrinho()
    res.send(clientes)
})

//Rota para aumentar quantidade de produto no carrinho
routes.post('/carrinho/:quantidade/:id', async (req, res) => {
    const clientes = await db.aumentarProdutoCarrinho(req?.params?.quantidade, req?.params?.id)
    res.send(clientes)
})

//Rota para listagem produto pelo id
routes.get('/listar/:id', async (req, res) => {
    const clientes = await db.listarProdutoId(req?.params?.id)
    res.send(clientes)
})

//Rota para deletar produto do carrinho
routes.delete('/carrinho/deletar/:id', async (req, res) => {
    const clientes = await db.deletarProdutoCarrinho(req?.params?.id)
    res.send(clientes)
})

module.exports = routes;