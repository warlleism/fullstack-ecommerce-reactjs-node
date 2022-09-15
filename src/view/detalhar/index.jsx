import React, { useContext } from 'react';
import { ColorRing } from 'react-loader-spinner';
import { Context } from "../../context/provider";
import Header from '../header';

import './style.scss'

const Detalhar = () => {

    const { dados } = useContext(Context);

    return (
        <>
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
                                <img src={`data:image/png;base64,${dados?.imagem}`} />
                            </div>
                            <div className='container-descricao'>
                                <div className='nome-produto-detalhar'>{dados?.nome}</div>
                                <div className='descricao-produto-detalhar'>{dados?.descricao}</div>
                            </div>
                        </div>

                        <div className='container-produto-pagamento'>
                            <div className='preco-produto-detalhar'>{dados?.preco}</div>
                        </div>

                    </div>
                    <div>
                    </div>
                </div>
            }
        </>
    );
}

export default Detalhar;
