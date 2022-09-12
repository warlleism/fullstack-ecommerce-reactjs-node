import './style.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from "@fortawesome/free-solid-svg-icons"
import { faCartShopping } from "@fortawesome/free-solid-svg-icons"
import { faHeadset } from "@fortawesome/free-solid-svg-icons"
import { useState } from 'react';

const Header = () => {

    const [inputTexto, setInputTexto] = useState('')

    return (
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
    );
}

export default Header;
