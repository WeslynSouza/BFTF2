import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Menu from '../../components/menu';
import Cabecalho from '../../components/cabecalho';
import Rodape from '../../components/rodape';
import api from '../../services/api';

import Banner from '../../assets/banner1.jpg';

import './style.scss';

type Post = {
    titulo: string,
    autor: string,
    conteudo: string,
    imagens: Array<{
        id: number,
        url: string
    }>,
}

type PostParams = {
    id: string
}

export default function NoticiaPost() {

    const params = useParams<PostParams>();
    const [ post, setPost ] = useState<Post>({
        titulo: '',
        autor: '',
        conteudo: '',
        imagens: [{id: 1, url: ''}]
    });
    const [ activeImageIndex, SetActiveImageIndex ] = useState(0);

    useEffect(() => {
        api.get(`/post/${params.id}`).then(res => {
            setPost(res.data);
        })
    }, [params.id]);

    if(!post){
        return <p>Carregando...</p>
    }

    return (
        <div>
            <Menu/>
            <div className="container">
                <Cabecalho titulo="Post" links={[{url: '/', titulo: 'Home'}, {url: '/Noticias', titulo: 'Noticias'}, {url: '/NoticiaPost', titulo: 'Post'}]}/>

                <div className="post">
                    <img src={post.imagens[activeImageIndex].url} alt={post.titulo} className='post-img'/>

                    <div className="imagens">
                        {post.imagens.map((imagem, index) => {
                            return (
                                <img key={imagem.id} src={imagem.url} alt={post.titulo} 
                                    onClick={() => {
                                        SetActiveImageIndex(index);
                                    }}/>
                            )
                        })}
                    </div>

                    <div className="post-conteudo">
                        <div className="post-cabecalho">
                            <h1 className="titulo">{post.titulo}</h1>
                            <h5 className='autor'>Escrito por: {post.autor}</h5>
                        </div>
                        
                        <p>{post.conteudo}</p>
                    </div>
                </div>
            </div>
            <Rodape/>
        </div>
    )
}