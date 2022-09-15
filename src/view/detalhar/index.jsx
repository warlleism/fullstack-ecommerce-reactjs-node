import { ColorRing } from 'react-loader-spinner';
import { Context } from "../../context/provider";
import React, { useContext } from 'react';
import { faStar } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Header from '../header';

import './style.scss'
import { useEffect } from 'react';

const Detalhar = () => {

    const { dados } = useContext(Context);

    const arrayQtdEstrelas = []

    function Stars() {

        const estrelasQtd = localStorage.getItem("estrelas").length

        const valor = estrelasQtd


        for (let i = 0; i < valor; i++) {
            arrayQtdEstrelas.push(i)
        }
    }

    return (
        <>
            {Stars()}
            <Header />
            {dados?.length == 0 ?
                < div style={{ height: "100%", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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
                <div className='main-container-detalhar'>
                    <div className='container-nome-preco-imagem'>
                        <div className='conteiner-produto-detalhar'>
                            <div className='conteiner-imagem'>
                                <img src={`data:image/png;base64,${localStorage.getItem("imagem") ? localStorage.getItem("imagem") : dados?.imagem}`} />
                            </div>
                            <div className='container-descricao'>
                                <div className='container-estrelas'>
                                    {
                                        arrayQtdEstrelas.map(() => {
                                            return (
                                                <FontAwesomeIcon style={{ fontSize: "2rem", cursor: "pointer", color: "yellow" }} icon={faStar} />
                                            )
                                        })
                                    }
                                </div>
                                <div className='nome-produto-detalhar'>{localStorage.getItem("nome") ? localStorage.getItem("nome") : dados?.nome}</div>
                                <div className='descricao-produto-detalhar'>{localStorage.getItem("descricao") ? localStorage.getItem("descricao") : dados?.descricao}</div>
                            </div>
                        </div>

                        <div className='container-produto-pagamento'>
                            <div className='preco-produto-detalhar'>{localStorage.getItem("preco") ? localStorage.getItem("preco") : dados?.preco}</div>
                        </div>
                    </div>
                </div>
            }
        </>
    );
}

export default Detalhar;
