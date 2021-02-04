import Menu from '../../components/menu';
import Cabecalho from '../../components/cabecalho';

import Banner from '../../assets/banner1.jpg';

import './style.css';

export default function NoticiaPost() {
    return (
        <div className="container">
            <Menu/>
            <Cabecalho titulo="Post" links={[{url: '/', titulo: 'Home'}, {url: '', titulo: 'Noticias-feed'}]}/>

            <div className="post">
                <img src={Banner} alt="banner" className='post-img'/>

                <div className="imagens">
                    <img src={Banner} alt='img'/>
                    <img src={Banner} alt='img'/>
                    <img src={Banner} alt='img'/>
                </div>

                <div className="post-conteudo">
                    <h1 className="titulo">Titulo da noticia</h1>
                    <p>Texto texto Texto texto Texto texto Texto texto Texto texto Texto texto 
                        Texto texto Texto texto Texto texto Texto texto Texto texto Texto texto 
                        Texto texto Texto texto Texto texto Texto texto Texto texto Texto texto
                        Texto texto Texto texto Texto texto Texto texto Texto texto Texto texto
                        Texto texto Texto texto Texto texto Texto texto Texto texto Texto texto
                        Texto texto Texto texto Texto texto Texto texto Texto texto Texto texto</p>
                </div>
            </div>
        </div>
    )
}