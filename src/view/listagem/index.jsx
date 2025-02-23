import React, { useContext, useEffect, useState } from 'react';
import { ColorRing } from 'react-loader-spinner';
import { Context } from "../../context/provider";
import { Spinner, Card } from '../../styled/index';
import { Link } from "react-router-dom";
import Header from '../header';

import './style.scss'

const Listagem = () => {

    const { id } = useContext(Context);
    const { setDados } = useContext(Context);
    const { mobileBar } = useContext(Context);

    useEffect(() => {
        fetch(`http://localhost:3001/listar/${id ? id : localStorage.getItem("id")}`)
            .then((res) => res.json())
            .then((data) => {
                setData(data)
            })
    }, [id])

    const localItens = (value) => {
        setDados(value)
        localStorage.setItem("imagem", value.imagem)
        localStorage.setItem("id", value.id)
        localStorage.setItem("nome", value.nome)
        localStorage.setItem("descricao", value.descricao)
        localStorage.setItem("preco", value.preco)
        localStorage.setItem("estrelas", value.estrelas)
    }

    const [data, setData] = useState([])

    return (
        <>
            <Header />
            {data?.length == 0 ?
                <Spinner>
                    <ColorRing
                        visible={true}
                        height="130"
                        width="130"
                        ariaLabel="blocks-loading"
                        wrapperStyle={{}}
                        wrapperClass="blocks-wrapper"
                        colors={['#F9F871', '#691A55', '#AE3B59', '#E17053', '#FBB252']}
                    />
                </Spinner>
                :
                <>
                    {mobileBar == false &&
                        (
                            <div className='main-container-listagem'>
                                {data[0]?.map((e) => {
                                    return (
                                        <Link to="/detalhar" style={{ textDecoration: "none" }} onClick={() => localItens(e)}>
                                            <Card className='conteiner-card'>
                                                <div>
                                                    <img src={`data:image/png;base64,${e?.imagem}`} />
                                                    <div className='nome-produto'>{e?.nome}</div>
                                                </div>
                                                <div>
                                                    <div className='preco-produto'>{e?.preco}</div>
                                                    <div className='pagamento-produto'>À vista no PIX</div>
                                                </div>
                                            </Card>
                                        </Link>
                                    )
                                })}
                            </div>
                        )}
                </>
            }
        </>
    );
}

export default Listagem;
