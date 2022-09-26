import { useContext, useEffect, useState } from 'react';
import { faHeadset } from "@fortawesome/free-solid-svg-icons"
import { faCircleUser } from "@fortawesome/free-solid-svg-icons"
import { faCartShopping } from "@fortawesome/free-solid-svg-icons"
import { faBars } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { Context } from "../../context/provider";
import $ from 'jquery';

import './style.scss'

const Header = (props) => {

    const [data, setData] = useState([])
    const [handler, setHandler] = useState([])
    const [searchFilter, setSearchFilter] = useState()
    const [inputTexto, setInputTexto] = useState('')
    const [dataCarrinho, setDataCarrinho] = useState([])
    const { setId } = useContext(Context);
    const { setDados } = useContext(Context);
    const { mobileBar, setMobileBar } = useContext(Context);

    useEffect(() => {
        fetch("http://localhost:3001/tipos")
            .then((res) => res.json())
            .then((data) => {
                setData(data)
            })
    }, [])

    useEffect(() => {
        fetch("http://localhost:3001/carrinho/listar")
            .then((res) => res.json())
            .then((data) => {
                setDataCarrinho(data)
            })
    }, [props.acumulador])


    useEffect(() => {
        fetch("http://localhost:3001/listar")
            .then((res) => res.json())
            .then((data) => {
                setHandler(data[0])
            })
        handlesFilter()

    }, [inputTexto])

    const handlesFilter = () => {
        const searchWord = inputTexto
        const newFilter = handler.filter((value) => {
            return value?.nome?.toLowerCase()?.includes(searchWord)
        })
        setSearchFilter(newFilter)
    }

    const localItens = (value) => {
        setDados(value)
        localStorage.setItem("imagem", value.imagem)
        localStorage.setItem("id", value.id)
        localStorage.setItem("nome", value.nome)
        localStorage.setItem("descricao", value.descricao)
        localStorage.setItem("preco", value.preco)
        localStorage.setItem("estrelas", value.estrelas)
    }

    const showMobileBar = (dado) => {
        setId(dado)
        setMobileBar(false)
    }

    const localItensInput = (value) => {
        setId(value)
        localStorage.setItem("id", value)
    }

    const categorias = [
        { nome: `pc gamer`, id: 1 },
        { nome: `notebook`, id: 2 },
        { nome: `smartphone`, id: 3 },
        { nome: `video game`, id: 4 },
        { nome: `cadeira gamer`, id: 5 },
        { nome: `processador`, id: 6 },
        { nome: `headset`, id: 7 },
    ]

    const setarDados = (id) => {
        localStorage.setItem("id", id)
        setId(id)
    }

    const searchInputEnter = () => {
        categorias.forEach((value) => {
            let data = value.nome.includes(inputTexto) ? setarDados(value.id) : false
            return data
        });
        document.addEventListener("click", () => setInputTexto(""))
    }

    return (
        <>
            <div className='main-header' id='header'>
                <Link to="/">
                    <img src={require('../../img/logo.gif')} />
                </Link>
                <form action="/listagem" className='container-input'>
                    <input type="text" value={inputTexto} onChange={e => setInputTexto(e.target.value)} />
                    <button style={{ position: 'absolute', right: -70, top: -15 }} id="btn" onClick={() => searchInputEnter()}><img src={require("../../img/botaoSearch.png")} style={{ maxWidth: 70 }} /></button>
                    {inputTexto != '' ? false : <div className='texto-busque-aqui'>Busque aqui</div>}
                    {
                        inputTexto &&
                        <div className='container-pesquisa' id='pesquisa'>
                            {
                                searchFilter?.map((data) => {
                                    return (
                                        <Link to="/detalhar" className='resultado-pesquisa' style={{ textDecoration: "none" }} onClick={() => localItens(data)}>
                                            <img src={`data:image/png;base64,${data?.imagem}`} alt="" />
                                            {data?.nome}
                                        </Link>
                                    )
                                })
                            }
                        </div>

                    }
                </form>
                <div className='content-conteiner'>
                    <FontAwesomeIcon icon={faCircleUser} className="icon user" />
                    <Link className='carrinho' to="/carrinho" onClick={() => showMobileBar()} >
                        <FontAwesomeIcon icon={faCartShopping} className="icon cart" />
                        <div>{dataCarrinho?.[0]?.length}</div>
                    </Link>
                    <FontAwesomeIcon icon={faHeadset} className="icon headset" />
                    <FontAwesomeIcon icon={faBars} className="icon bars" id='togler-close-padrao' style={{ outline: "none" }} onClick={() => setMobileBar(!mobileBar)} />
                </div>
            </div>
            <div className='container-lista-links'>
                <div className='container-lista'>
                    {
                        data[0]?.map(dados => {
                            return (
                                <Link to="/listagem" key={dados.id} onClick={() => localItensInput(dados?.id)} style={dados?.id == 1 ? { borderLeft: "solid 1px #ffffff29", borderRight: "solid 1px #ffffff29" } : { borderRight: "solid 1px #ffffff29" }}>
                                    {dados?.nome}
                                </Link>
                            )
                        })
                    }

                </div>
            </div>
            <div>
                {mobileBar &&
                    (
                        <div className='container-lista-links-mobile'>
                            <div className='container-lista-mobile'>
                                <Link to="/carrinho" style={{ fontWeight: 500, fontSize: "0.9rem", marginTop: 20, marginBottom: -50 }} onClick={() => showMobileBar()}>
                                    CARRINHO
                                </Link>
                                {
                                    data[0]?.map(dados => {
                                        return (
                                            <Link to="/listagem" key={dados.id} onClick={() => showMobileBar(dados?.id)} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                {dados?.nome}
                                            </Link>
                                        )
                                    })
                                }

                            </div>
                        </div>
                    )
                }
            </div>
            <div className='imagem-oferta' >
                <img src={require("../../img/oferta.png")} />
            </div>

        </>
    );
}

export default Header;
