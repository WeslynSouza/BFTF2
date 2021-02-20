import { useState } from 'react';
import Menu from '../../components/menu';
import Cabecalho from '../../components/cabecalho';
import Rodape from '../../components/rodape';

import Banner from '../../assets/banner1.jpg';

import './style.scss';

export default function NoticiaPost() {

    type Post = {
        titulo: string,
        conteudo: string,
        imagens: Array<string>,
    }

    const [ post, setPost ] = useState<Post>({titulo: 'teste', conteudo: 'teste', imagens: []});

    return (
        <div>
            <Menu/>
            <div className="container">
                <Cabecalho titulo="Post" links={[{url: '/', titulo: 'Home'}, {url: '/Noticias', titulo: 'Noticias'}, {url: '/NoticiaPost', titulo: 'Post'}]}/>

                <div className="post">
                    <img src={Banner} alt="banner" className='post-img'/>

                    <div className="imagens">
                        <img src={Banner} alt='img'/>
                        <img src={Banner} alt='img'/>
                        <img src={Banner} alt='img'/>
                    </div>

                    <div className="post-conteudo">
                        <h1 className="titulo">{post.titulo}</h1>
                        <p>{post.conteudo}</p>
                    </div>
                </div>
            </div>
            <Rodape/>
        </div>
    )
}