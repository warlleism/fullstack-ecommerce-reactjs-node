import './style.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from "@fortawesome/free-solid-svg-icons"
import { faCartShopping } from "@fortawesome/free-solid-svg-icons"
import { faHeadset } from "@fortawesome/free-solid-svg-icons"
import { useState } from 'react';

const Header = () => {

    const [inputTexto, setInputTexto] = useState('')

    return (
        <>
            <div className='main-header'>
                <img src={require('../../img/logo.gif')} />
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
                    <li style={{ borderLeft: "solid 1px #ffffff29", borderRight: "solid 1px #ffffff29" }}><a href="#">DEPARTAMENTOS</a></li>
                    <li style={{ borderRight: "solid 1px #ffffff29" }}><a href="#">LANÇAMENTOS</a></li>
                    <li style={{ borderRight: "solid 1px #ffffff29" }}><a href="#">PC GAMER</a></li>
                    <li style={{ borderRight: "solid 1px #ffffff29" }}><a href="#">ELETRÔNICOS</a> </li>
                    <li style={{ borderRight: "solid 1px #ffffff29" }}><a href="#"> OFERTA DO DIA</a></li>
                    <li style={{ borderRight: "solid 1px #ffffff29" }}><a href="#">BAIXE O APP</a></li>
                </ul>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', width: "100%" }}>
                <img src={require("../../img/oferta.png")} style={{ width: "93.6%", cursor: "pointer" }} />
            </div>
        </>
    );
}

export default Header;
