import React, { useContext, useEffect, useState } from 'react';
import { Context } from "../../context/provider";

import './style.scss'

const Listagem = () => {

    const { id } = useContext(Context);

    useEffect(() => {
        fetch(`http://localhost:3001/listar/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setData(data)
            })
    }, [id ? id : true])

    const [data, setData] = useState([])

    return (
        <>
            <div className='main-container-listagem'>
                {data[0]?.map((e) => {
                    return (
                        <div className='conteiner-card'>
                            <div>
                                <img src={`data:image/png;base64,${e?.imagem}`} />
                                <div className='nome-produto'>{e?.nome}</div>
                            </div>
                            <div>
                                <div className='preco-produto'>{e?.preco}</div>
                                <div className='pagamento-produto'>À vista no PIX</div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </>
    );
}

export default Listagem;
