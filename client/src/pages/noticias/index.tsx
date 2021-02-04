import Iframe from 'react-iframe';
import { Link } from 'react-router-dom';
import Menu from '../../components/menu';
import Cabecalho from '../../components/cabecalho';

import img from '../../assets/banner1.jpg';

import './style.css';

export default function Noticias() {
    return (
        <div className='container'>
            
            <Menu/>
            <Cabecalho titulo='Noticias' links={[{url: '/', titulo: 'Home'}, {url: '/Noticias', titulo: 'Noticias'}]}/>

            <div className="conteudo">
                <div className="conteudo-centro">
                    <div className="post-caixa">
                        <Link to='/NoticiaPost'>
                            <img className='post-img' src={img} alt='banner'/>
                        </Link>
                        <div className="post-conteudo">
                            <Link to='/NoticiaPost'>
                                <h2>Titulo titulo titulo</h2>
                            </Link>
                        </div>
                    </div>
                    
                    <div className="post-caixa">
                        <Link to='/NoticiaPost'>
                            <img className='post-img' src={img} alt='banner'/>
                        </Link>
                        <div className="post-conteudo">
                            <Link to='/NoticiaPost'>
                                <h2>Titulo titulo titulo</h2>
                            </Link>
                        </div>
                    </div>

                    
                </div>

                <div className="conteudo-lateral">
                    <Link to='/CriarPost'>
                        <button type='button' className='butao-criar'>criar post +</button>
                    </Link>

                    <Iframe src="https://discord.com/widget?id=649752881712332810&theme=dark" className='discord' url="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"></Iframe>
                </div>
            </div>

        </div>
    )
}