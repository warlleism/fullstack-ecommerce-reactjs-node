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

    const { setId } = useContext(Context);

    useEffect(() => {
        fetch("http://localhost:3001/tipos")
            .then((res) => res.json())
            .then((data) => {
                setData(data)
            })
    }, [])

    const [inputTexto, setInputTexto] = useState('')

    return (
        <>
            <div className='main-header'>
                <Link to="/">
                    <img src={require('../../img/logo.gif')} />
                </Link>
                <div className='container-input'>
                    <input type="text" onChange={e => setInputTexto(e.target.value)} />
                    {inputTexto != '' ? false : <div className='texto-busque-aqui'>Busque aqui</div>}
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
