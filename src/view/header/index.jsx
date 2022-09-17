import { useContext, useEffect, useState } from 'react';
import { faHeadset } from "@fortawesome/free-solid-svg-icons"
import { faCircleUser } from "@fortawesome/free-solid-svg-icons"
import { faCartShopping } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { Context } from "../../context/provider";

import './style.scss'

const Header = () => {

    const [data, setData] = useState([])
    const [handler, setHandler] = useState([])
    const [searchFilter, setSearchFilter] = useState()
    const [inputTexto, setInputTexto] = useState('')

    const { setId } = useContext(Context);
    const { setDados } = useContext(Context);

    useEffect(() => {
        fetch("http://localhost:3001/tipos")
            .then((res) => res.json())
            .then((data) => {
                setData(data)
            })
    }, [])

    useEffect(() => {
        fetch("http://localhost:3001/listar")
            .then((res) => res.json())
            .then((data) => {
                setHandler(data[0])
            })
        handlesFilter()

        document.addEventListener("click", () => setInputTexto(""))
    }, [inputTexto])

    const handlesFilter = () => {
        const searchWord = inputTexto
        const newFilter = handler.filter((value) => {
            return value?.nome?.toLowerCase()?.includes(searchWord)
        })
        setSearchFilter(newFilter)
    }


    const localItens = (value) => {
        setInputTexto("")
        setDados(value)
        localStorage.setItem("imagem", value.imagem)
        localStorage.setItem("nome", value.nome)
        localStorage.setItem("descricao", value.descricao)
        localStorage.setItem("preco", value.preco)
        localStorage.setItem("estrelas", value.estrelas)
    }




    return (
        <>
            <div className='main-header'>
                <Link to="/">
                    <img src={require('../../img/logo.gif')} />
                </Link>
                <div className='container-input'>
                    <input type="text" value={inputTexto} onChange={e => setInputTexto(e.target.value)} />
                    {inputTexto != '' ? false : <div className='texto-busque-aqui'>Busque aqui</div>}

                    {
                        inputTexto != '' ?
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
                            :
                            false
                    }

                </div>
                <div className='content-conteiner'>
                    <FontAwesomeIcon icon={faCircleUser} className="icon" />
                    <FontAwesomeIcon icon={faCartShopping} className="icon" />
                    <FontAwesomeIcon icon={faHeadset} className="icon" />
                </div>
            </div>
            <div className='container-lista-links'>
                <ul className='container-lista'>
                    {
                        data[0]?.map(dados => {
                            return (
                                <Link to="/listagem" key={dados.id} onClick={() => setId(dados?.id)} style={dados?.id == 1 ? { borderLeft: "solid 1px #ffffff29", borderRight: "solid 1px #ffffff29" } : { borderRight: "solid 1px #ffffff29" }}>
                                    {dados?.nome}
                                </Link>
                            )
                        })
                    }
                </ul>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', width: "100%" }}>
                <img src={require("../../img/oferta.png")} style={{ width: "93.6%", cursor: "pointer" }} />
            </div>

        </>
    );
}

export default Header;
