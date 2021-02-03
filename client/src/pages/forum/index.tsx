import Iframe from 'react-iframe';
import Menu from '../../components/menu';
import Cabecalho from '../../components/cabecalho';

import img from '../../assets/banner.jpg';

import './style.css';

export default () => {
    return (
        <div className='container'>
            
            <Menu/>
            <Cabecalho titulo='Noticias' links={['home', 'forum-post']}/>

            <div className="conteudo">
                <div className="conteudo-centro">
                    <div className="post-caixa">
                        <div className='post-img' style={{background: `url(${img})`}}/>
                        <div className="post-conteudo">
                            <h2>Titulo titulo titulo</h2>
                        </div>
                    </div>
                    
                    <div className="post-caixa">
                        <div className='post-img' style={{background: `url(${img})`}}/>
                        <div className="post-conteudo">
                            <h2>Titulo titulo titulo</h2>
                        </div>
                    </div>

                    
                </div>

                <div className="conteudo-lateral">
                    <button type='button' className='butao-criar'>criar post +</button>

                    <Iframe src="https://discord.com/widget?id=649752881712332810&theme=dark" className='discord' url="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"></Iframe>
                </div>
            </div>

        </div>
    )
}