import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
const Listagem = React.lazy(() => import('../view/listagem'))
const Detalhar = React.lazy(() => import('../view/detalhar'))
const Carrinho = React.lazy(() => import('../view/carrinho'))
const Home = React.lazy(() => import('../view/home'))
const Comprar = React.lazy(() => import('../view/compra'))


export default function Rotas() {
    return (
        <Router>

            <Routes>

                <Route path="/"
                    element={
                        <React.Suspense fallback='Carregando...'>
                            <Home />
                        </React.Suspense>
                    } />

                <Route path="/listagem"
                    element={
                        <React.Suspense fallback='Carregando...'>
                            <Listagem />
                        </React.Suspense>
                    } />

                <Route path="/detalhar"
                    element={
                        <React.Suspense fallback='Carregando...'>
                            <Detalhar />
                        </React.Suspense>
                    } />

                <Route path="/carrinho"
                    element={
                        <React.Suspense fallback='Carregando...'>
                            <Carrinho />
                        </React.Suspense>
                    } />

                <Route path="/comprar"
                    element={
                        <React.Suspense fallback='Carregando...'>
                            <Comprar />
                        </React.Suspense>
                    } />

            </Routes>

        </Router >
    )
}
