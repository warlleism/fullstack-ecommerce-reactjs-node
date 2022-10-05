import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from "@fortawesome/free-solid-svg-icons"
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"
import { useContext, useEffect, useState } from 'react';
import { ColorRing } from 'react-loader-spinner';
import { Context } from "../../context/provider";
import { Spinner } from '../../styled';
import { Link } from 'react-router-dom';
import BuscarMes from '../../util/mes';
import Header from '../header';

import './style.scss'

const Home = () => {

    useEffect(() => {
        fetch("http://localhost:3001/listar/destaques")
            .then((res) => res.json())
            .then((data) => {
                setData(data)
            })
    }, [])

    const date = new Date();
    const mes = date.getMonth() + 1;
    const [data, setData] = useState([])
    const [posicao, setPosicao] = useState(1.2)
    const [posicaoMobile, setPosicaoMobile] = useState(0)
    const { mobileBar } = useContext(Context);
    const { setDados } = useContext(Context);

    const Left = () => {
        posicao == 1.2 ? setPosicao(-24) : setPosicao(parseInt(posicao + 13))
    }

    const Rigth = () => {
        posicao == -24 ? setPosicao(1.2) : setPosicao(parseInt(posicao - 13))
    }

    const LeftMobile = () => {
        posicaoMobile == 0 ? setPosicaoMobile(-600) : setPosicaoMobile(parseInt(posicaoMobile + 100))
    }

    const RigthMobile = () => {
        posicaoMobile == -600 ? setPosicaoMobile(0) : setPosicaoMobile(parseInt(posicaoMobile - 100))
    }

    const localItens = (value) => {
        setDados(value)
        localStorage.setItem("imagem", value.imagem)
        localStorage.setItem("id", value.id)
        localStorage.setItem("nome", value.nome)
        localStorage.setItem("descricao", value.descricao)
        localStorage.setItem("preco", value.preco)
        localStorage.setItem("estrelas", value.estrelas)
    }

    return (
        <div>
            {console.log(posicaoMobile)}
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
                    {
                        mobileBar == false &&
                        (
                            <div className='main-conteiner-cards'>
                                <div className='play-content'><div>{BuscarMes(mes)} TECH</div></div>
                                <div className='conteiner-carrousel'>
                                    <div className='conteiner-arrow-left' style={{ zIndex: 9999, backgroundColor: "#f2f2f2", width: 52, left: 0, height: "100%" }}>
                                        <FontAwesomeIcon className='arrowLeft' style={{ fontSize: "2rem", cursor: "pointer", marginLeft: "10px", color: "#9d9d9dcf", borderRadius: 30, boxSizing: "border-box", padding: 7, backgroundColor: "#ffff" }} icon={faArrowLeft} onClick={() => Left()} />
                                    </div>
                                    <div className='container-carroussel-cards'>
                                        <div className='container-cards' style={{ transform: `translateX(${posicao}%)` }} >
                                            {data[0]?.map((e) => {
                                                return (
                                                    <Link key={e.id} to="/detalhar" className='cards' style={{ textDecoration: "none" }} onClick={() => localItens(e)}>
                                                        <div>
                                                            <img src={`data:image/png;base64,${e?.imagem}`} />
                                                            <div className='nome-produto'>{e?.nome}</div>
                                                        </div>
                                                        <div>
                                                            <div className='preco-produto'>{e?.preco}</div>
                                                            <div className='pagamento-produto'>À vista no PIX</div>
                                                        </div>
                                                    </Link>
                                                )
                                            })}
                                        </div>
                                    </div>
                                    <div className='conteiner-arrow-right' style={{ zIndex: 9999, backgroundColor: "#f2f2f2", width: 50, right: 0, height: "100%" }}>
                                        <FontAwesomeIcon className='arrowRigth' style={{ fontSize: "2rem", cursor: "pointer", marginRight: "10px", color: "#9d9d9dcf", borderRadius: 30, boxSizing: "border-box", padding: 7, backgroundColor: "#ffff" }} icon={faArrowRight} onClick={() => Rigth()} />
                                    </div>
                                </div>
                                <div className="container-mobile-carroussel">
                                    <div className='conteiner-arrow-right' style={{ display: 'flex', alignItems: 'center', position: 'absolute', left: 0, zIndex: 9999, backgroundColor: "#f2f2f2", width: 50, right: 0, height: "44%" }}>
                                        <FontAwesomeIcon className='arrowLeft' style={{ fontSize: "2rem", cursor: "pointer", marginLeft: 8, color: "#9d9d9dcf", borderRadius: 30, boxSizing: "border-box", padding: 7, backgroundColor: "#ffff" }} icon={faArrowLeft} onClick={() => LeftMobile()} />
                                    </div>
                                    <div className='container-carroussel-cards-mobile' style={{ transform: `translateX(${posicaoMobile}vw)` }}>
                                        {data[0]?.map((e) => {
                                            return (
                                                <Link key={e.id} to="/detalhar" className='cards-mobile' style={{ textDecoration: "none" }} onClick={() => localItens(e)}>
                                                    <img src={`data:image/png;base64,${e?.imagem}`} />
                                                    <div className='nome-produto'>{e?.nome}</div>
                                                </Link>
                                            )
                                        })}
                                    </div>
                                    <div className='conteiner-arrow-right' style={{ display: 'flex', alignItems: 'center', position: 'absolute', rigth: 0, zIndex: 9999, backgroundColor: "#f2f2f2", width: 50, right: 0, height: "44%" }}>
                                        <FontAwesomeIcon className='arrowRigth' style={{ fontSize: "2rem", cursor: "pointer", color: "#9d9d9dcf", marginLeft: 10, borderRadius: 30, boxSizing: "border-box", padding: 7, backgroundColor: "#ffff" }} icon={faArrowRight} onClick={() => RigthMobile()} />
                                    </div>
                                </div>
                                <div className="container-imagems-promocao">
                                    <img src={require('../../img/promocao1.png')} alt="" />
                                    <img src={require('../../img/promocao2.png')} alt="" />
                                </div>
                            </div>
                        )

                    }
                </>

            }


        </div>
    );
}

export default Home;
