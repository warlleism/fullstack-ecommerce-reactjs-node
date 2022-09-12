import { useEffect, useState } from 'react';
import { ColorRing } from 'react-loader-spinner';
import './style.scss'


const Home = () => {

    const [data, setData] = useState([])

    useEffect(() => {
        fetch("http://localhost:3001/listar")
            .then((res) => res.json())
            .then((data) => {
                setData(data)
            })

    }, [])

    return (
        <>
            {data?.length == 0 ?
                <div style={{ height: "100%", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <ColorRing
                        visible={true}
                        height="130"
                        width="130"
                        ariaLabel="blocks-loading"
                        wrapperStyle={{}}
                        wrapperClass="blocks-wrapper"
                        colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
                    />
                </div>
                :
                <>
                    {data[0]?.map((e) => {
                        return (
                            <div className='main-conteiner'>
                                <div className='container-descricao'>
                                <img id='img1' src={`data:image/png;base64,${e?.imagem}`} />
                                    <div className='texto1'>{e?.nome}</div>
                                    <div className='texto2'>{e?.preco}</div>
                                    <div className='texto3'>{e?.descricao}</div>
                                    <div className='texto4'>A partir de {e?.preco}</div>
                                    <div id='botao' className='texto5'>Comprar</div>
                                </div>
                            </div>
                        )
                    })}


                </>

            }


        </>
    );
}

export default Home;
