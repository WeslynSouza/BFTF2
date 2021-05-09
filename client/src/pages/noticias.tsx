import { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Iframe from 'react-iframe';
import { FaTimes, FaPlus } from 'react-icons/fa';
import { Modal } from 'react-bootstrap';
import Menu from '../components/menu';
import Cabecalho from '../components/cabecalho';
import Rodape from '../components/rodape';
import Placeholder from '../components/placeholder';
import InputPesquisa from '../components/input-pesquisa';
import api from '../services/api';

import { FormEvent } from 'react';
import { ChangeEvent } from 'react';

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
    const [ show, setShow ] = useState(false);
    const [ reSearchActive, setReSearchActive ] = useState(false);

    const [ titulo, setTitulo ] = useState('');
    const [ conteudo, setConteudo ] = useState('');
    const [ images, setImages ] = useState<File[]>([]);
    const [ previewImages, setPreviewImages ] = useState<string[]>([]);

    useEffect(() => {
        api.get(`/posts/${pesquisa}`).then(res => {
            setPosts(res.data);
            setReSearchActive(false);
        })
    }, [pesquisa, reSearchActive]);

    async function handleSubmit(event: FormEvent){
        event.preventDefault();

        const data = new FormData();

        if(titulo === ''){
            alert('Você deve informar o titulo antes de realizar o envio.');
            return;
        }

        if(conteudo === ''){
            alert('Você deve informar o conteudo antes de realizar o envio.');
            return;
        }

        if(images.length === 0){
            alert('Você deve informar pelo menos uma imagem para realizar o envio.');
            return;
        }

        data.append('autorId', 'steamTeste');
        data.append('titulo', titulo);
        data.append('conteudo', conteudo);
        images.reverse().forEach(image => {
            data.append('imagens', image);
        })

        await api.post("post", data).then(res => {
            alert(res.data);
        });

        setReSearchActive(true);
        handleClose();
    }

    function handleSelectImage(event: ChangeEvent<HTMLInputElement>){

        if(!event.target.files){
            return;
        }
    
        const selectedImages= Array.from(event.target.files);

        setImages(selectedImages.concat(images));
    
        const selectedImagesPreview = selectedImages.map(image => {
            return URL.createObjectURL(image);
        }).concat(previewImages);
    
        setPreviewImages(selectedImagesPreview);
    }

    function handleRemoveImage(indice: number) {
        const imageArray = Array.from(previewImages);
        const imagesFileArray = Array.from(images);

        imageArray.splice(indice, 1);
        imagesFileArray.splice(indice, 1);
        
        setPreviewImages(imageArray);
        setImages(imagesFileArray);
    }

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function renderPosts() {
        if(posts[0] !== undefined) {
            return(
                posts.map(post => {
                    return(
                        <div className="post-caixa">
                            <Link to={`/NoticiaPost/${post.id}`}>
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
                        <button type='button' className='botao-criar' onClick={() => handleShow()}>Criar post +</button>

                        <Iframe src="https://discord.com/widget?id=649752881712332810&theme=dark" className='discord' url="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"></Iframe>
                    </div>
                </div>

            </div>
            <Rodape/>

            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header>
                    <Modal.Title>Criar Post</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="post-form">
                        <form>
                            <label htmlFor="titulo">Titulo</label>
                            <input onChange={event => setTitulo(event.target.value)} type="text" name='titulo' id='titulo'/>

                            <label htmlFor="conteudo">Conteudo</label>
                            <textarea onChange={event => setConteudo(event.target.value)} name="conteudo" id="conteudo" cols={40} rows={10}></textarea>

                            <label htmlFor="imagens">Imagens</label>
                            <div className="imagens">
                                {previewImages.map((image, indice) => {
                                    return (
                                        <div className="image-area" key={indice}>
                                            <img src={image} alt='imagem'/>
                                            <button type='button' onClick={() => handleRemoveImage(indice)}>
                                                <FaTimes/>
                                            </button>
                                        </div>
                                    )
                                })}

                                <label htmlFor='image[]' className="new-image">
                                    <FaPlus size={24} color="#15b6d6" />
                                </label> 
                            </div>
                            <input multiple onChange={handleSelectImage} accept="image/*" type="file" id="image[]"/>
                        </form>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button className='botao-enviar' onClick={handleSubmit}>Enviar</button>
                    <button className='botao-resetar' onClick={handleClose}>Voltar</button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}