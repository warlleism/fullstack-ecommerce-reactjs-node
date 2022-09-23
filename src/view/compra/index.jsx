import Header from '../header';
import { useEffect } from 'react';
import { ColorRing } from 'react-loader-spinner';
import { Context } from "../../context/provider";
import React, { useContext, useState } from 'react';
import { faPrint } from "@fortawesome/free-solid-svg-icons"
import { faBarcode } from "@fortawesome/free-solid-svg-icons"
import { faMobile } from "@fortawesome/free-solid-svg-icons"
import { faComputer } from "@fortawesome/free-solid-svg-icons"
import { faQrcode } from "@fortawesome/free-solid-svg-icons"
import { faCheck } from "@fortawesome/free-solid-svg-icons"
import { faCalendar } from "@fortawesome/free-solid-svg-icons"
import { faCreditCard } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './style.scss'

const Comprar = () => {

    const [data, setData] = useState([]);
    const { mobileBar } = useContext(Context);
    const [pagamento, setPagamento] = useState('credito')

    useEffect(() => {
        fetch("http://localhost:3001/carrinho/listar")
            .then((res) => res.json())
            .then((data) => {
                setData(data)
            })
    }, [])

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
                <>
                    {mobileBar == false &&
                        (
                            <div className='container-comprar'>
                                <ul className='lista-pagamento'>
                                    <li onClick={() => setPagamento("credito")}>
                                        <FontAwesomeIcon icon={faCreditCard} style={{ fontSize: "30px" }} className="icon cart" />
                                        <div>Cartão de crédito</div>
                                    </li>
                                    <li onClick={() => setPagamento("boleto")}>
                                        <FontAwesomeIcon icon={faBarcode} style={{ fontSize: "30px" }} className="icon cart" />
                                        <div>Boleto</div>
                                    </li>
                                    <li onClick={() => setPagamento("pix")}>
                                        <img src={require("../../img/icon-pagamento-pix.png")} />
                                        <div>Pix</div>
                                    </li>
                                </ul>
                                {
                                    pagamento == 'credito'
                                        ?
                                        <div className='pagamento-credito'>
                                            <div className='numero' style={{ display: 'flex', flexDirection: "column", width: "100%" }}>
                                                <label>Número do cartão</label>
                                                <input type="number" name="" id="" />
                                            </div>
                                            <div className='nome' style={{ display: 'flex', flexDirection: "column", width: "100%" }}>
                                                <label>Nome completo</label>
                                                <input type="text" name="" id="" />
                                            </div>
                                            <div className='validade' style={{ display: 'flex', flexDirection: "column", width: "100%" }}>
                                                <label>Validade</label>
                                                <input type="text" name="" id="" />
                                            </div>
                                            <div className='seguranca' style={{ display: 'flex', flexDirection: "column", width: "100%" }}>
                                                <label>código de segurança</label>
                                                <input type="text" name="" id="" />
                                            </div>
                                            <div className='parcelas' style={{ display: 'flex', flexDirection: "column", width: "100%" }}>
                                                <label>Número de parcelas</label>
                                                <select name="" id="">
                                                    <option value="">1x</option>
                                                    <option value="">2x</option>
                                                    <option value="">3x</option>
                                                    <option value="">4x</option>
                                                    <option value="">5x</option>
                                                </select>
                                            </div>
                                            <div className='salvar-cartao' style={{ display: 'flex', flexDirection: "row", width: "100%" }}>
                                                <input type="checkbox" name="" id="" style={{ marginRight: 10 }} />
                                                <label>salvar o cartão para compras futuras</label>
                                            </div>
                                            <div className='container-fechar-pedido'>
                                                <div className='container-total'>
                                                    <div className='total'>TOTAL:</div>
                                                    <div className='valor'>R$ {localStorage.getItem("valorTotal")}</div>
                                                </div>
                                                <div className='botao-fechar-pedido'>Fechar pedido</div>
                                            </div>

                                        </div>
                                        :
                                        pagamento == 'boleto'
                                            ?
                                            <div className='pagamento-boleto'>
                                                <div className='imprimir container-info' style={{ display: 'flex', flexDirection: "row", width: "100%" }}>
                                                    <FontAwesomeIcon className="icon-pagamento" icon={faPrint} />
                                                    <label>Imprima o boleto e pague no banco</label>
                                                </div>
                                                <div className='internet container-info' style={{ display: 'flex', flexDirection: "row", width: "100%" }}>
                                                    <FontAwesomeIcon className="icon-pagamento" icon={faComputer} />
                                                    <label>ou pague pela internet utilizando o código de barras do boleto</label>
                                                </div>
                                                <div className='calendario container-info' style={{ display: 'flex', flexDirection: "row", width: "100%" }}>
                                                    <FontAwesomeIcon className="icon-pagamento" icon={faCalendar} />
                                                    <label>o prazo de validade do boleto é de 1 dia util</label>
                                                </div>
                                                <div className='container-fechar-pedido'>
                                                    <div className='container-total'>
                                                        <div className='total'>TOTAL:</div>
                                                        <div className='valor'>R$ {localStorage.getItem("valorTotal")}</div>
                                                    </div>
                                                    <div className='botao-fechar-pedido'>Fechar pedido</div>
                                                </div>
                                            </div>
                                            :
                                            <div className='conteudo-pagamento-pix'>
                                                <div className='info-pix'>
                                                    <div className='img-pix-info'>
                                                        <img src={require("../../img/icon-pagamento-pix.png")} />
                                                        <div>Pagar com Pix</div>
                                                    </div>
                                                    <div className='info-pix-pagamento'>
                                                        Pague com Pix em qualquer dia e a qualquer hora! O pagamento é instantâneo, prático e pode ser feito em poucos segundos. É muito rápido e seguro :)
                                                    </div>
                                                </div>
                                                <div className='qrcode-info' >
                                                    <img src={require("../../img/qrcode.png")} />
                                                    <div className='container-info-icons'>
                                                        <div className='imprimir container-info'>
                                                            <FontAwesomeIcon className="icon-pagamento" icon={faMobile} />
                                                            <label>Imprima o boleto e pague no banco</label>
                                                        </div>
                                                        <div className='internet container-info'>
                                                            <FontAwesomeIcon className="icon-pagamento" icon={faQrcode} />
                                                            <label>ou pague pela internet utilizando o código de barras do boleto</label>
                                                        </div>
                                                        <div className='calendario container-info'>
                                                            <FontAwesomeIcon className="icon-pagamento" icon={faCheck} />
                                                            <label>o prazo de validade do boleto é de 1 dia util</label>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='container-fechar-pedido'>
                                                    <div className='container-total'>
                                                        <div className='total'>TOTAL:</div>
                                                        <div className='valor'>R$ {localStorage.getItem("valorTotal")}</div>
                                                    </div>
                                                    <div className='botao-fechar-pedido'>Fechar pedido</div>
                                                </div>
                                            </div>
                                }
                            </div>
                        )
                    }
                </>
            }
        </>
    );
}

export default Comprar;
