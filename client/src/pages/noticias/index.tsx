import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Iframe from 'react-iframe';
import Menu from '../../components/menu';
import Cabecalho from '../../components/cabecalho';
import Rodape from '../../components/rodape';
import Placeholder from '../../components/placeholder';
import InputPesquisa from '../../components/input-pesquisa';
import api from '../../services/api';

import './style.scss';

type Post = {
    id: number;
    titulo: string,
    imagens: [{
        id: number,
        url: string
    }]
}

export default function Noticias() {

    const [ pesquisa, setPesquisa ] = useState('');
    const [ posts, setPosts ] = useState<Post[]>([]);

    useEffect(() => {
        api.get(`/posts/${pesquisa}`).then(res => {
            setPosts(res.data);
        })
    }, [pesquisa]);

    function renderPosts() {
        if(posts[0] !== undefined) {
            return(
                posts.map(post => {
                    return(
                        <div className="post-caixa">
                            <Link to={`/NoticiaPost/2`}>
                                <img className='post-img' src={post.imagens[0].url} alt='banner'/>
                            </Link>
                            <div className="post-conteudo">
                                <Link to={`/NoticiaPost/${post.id}`}>
                                    <h2>{post.titulo}</h2>
                                </Link>
                            </div>
                        </div>
                    )
                })
            )
        } else {
            return (
                <Placeholder texto='Nenhum post foi encontrado no sistema!'/>
            )
        }
    }

    return (
        <div>
            <Menu/>
            <div className='container'>
                <Cabecalho titulo='Noticias' links={[{url: '/', titulo: 'Home'}, {url: '/Noticias', titulo: 'Noticias'}]}/>

                <div className="conteudo">
                    <div className="conteudo-centro">
                        
                        <InputPesquisa value={pesquisa} 
                            setValue={setPesquisa} height='6rem' inputWidth='63rem' 
                            buttonWidth='7rem' fontInput='2.5rem' fontButton='3.2rem'/>

                        {renderPosts()}
                        
                    </div>

                    <div className="conteudo-lateral">
                        <Link to='/CriarPost'>
                            <button type='button' className='botao-criar'>Criar post +</button>
                        </Link>

                        <Iframe src="https://discord.com/widget?id=649752881712332810&theme=dark" className='discord' url="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"></Iframe>
                    </div>
                </div>

            </div>
            <Rodape/>
        </div>
    )
}