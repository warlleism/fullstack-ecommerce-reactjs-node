import React, { useContext, useState } from 'react';
import { ColorRing } from 'react-loader-spinner';
import { Context } from "../../context/provider";
import { useEffect } from 'react';
import Header from '../header';

import './style.scss'
import axios from 'axios';

const Carrinho = () => {

    const [data, setData] = useState([]);
    const { setCarrinho } = useContext(Context);
    const [valor, setValor] = useState()

    const [acumulador, setAcumulador] = useState(0)

    useEffect(() => {
        fetch("http://localhost:3001/carrinho/listar")
            .then((res) => res.json())
            .then((data) => {
                setData(data)
            })
    }, [acumulador])

    const setarQuantidade = async (quantidade, id) => {
        setAcumulador(acumulador + 1)
        const res = await axios.post(`http://localhost:3001/carrinho/${quantidade}/${id}`)
        console.log(res)
    }

    useEffect(() => {
        setCarrinho(data[0]?.length)

        const reduceSalarios = data[0]?.reduce((valor, valorAtual) => valor + parseInt(valorAtual?.preco?.replace(/\D+/g, '')) * valorAtual?.quantidade, 0)
        setValor(reduceSalarios)

    }, [data])


    return (
        <>
            <Header />
            {data?.length == 0 ?
                <div style={{ height: "100%", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <ColorRing
                        visible={true}
                        height="130"
                        width="130"
                        ariaLabel="blocks-loading"
                        wrapperStyle={{}}
                        wrapperClass="blocks-wrapper"
                        colors={['#F9F871', '#691A55', '#AE3B59', '#E17053', '#FBB252']}
                    />
                </div>
                :
                <div className='main-container-carrinho'>
                    <div className='container-nome-preco-imagem'>
                        {
                            data[0]?.map((dados) => {
                                return (
                                    <div className='conteiner-produto-carrinho'>
                                        {console.log(dados)}
                                        <div className='conteiner-imagem'>
                                            <img src={`data:image/png;base64,${dados?.imagem}`} />
                                        </div>
                                        <div className='container-descricao'>
                                            <div className='nome-produto-carrinho'>{dados?.nome}</div>
                                            <div>R$ {valor ? valor : 0}</div>
                                        </div>
                                        <div className='quantidade'>
                                            <div className='operadores' onClick={() => setarQuantidade(dados?.quantidade - 1, dados?.id)}>-</div>
                                            <div>{dados?.quantidade}</div>
                                            <div className='operadores' onClick={() => setarQuantidade(dados?.quantidade + 1, dados?.id)}>+</div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            }
        </>
    );
}

export default Carrinho;
