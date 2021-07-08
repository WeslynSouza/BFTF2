import { useState, FormEvent, ChangeEvent, useEffect } from 'react';
import {FaTimes, FaPlus} from 'react-icons/fa';
import api from '../../services/api';

import './postForm.scss';

interface postFormProps {
    postId: string;
    functionVoltar: Function;
}

interface image {
    url: string
}

export default function PostForm({ functionVoltar, postId }: postFormProps) {

    const [ tituloPost, setTituloPost ] = useState('');
    const [ conteudoPost, setConteudoPost ] = useState('');
    const [ imagesPost, setImagesPost ] = useState<File[]>([]);
    const [ previewImages, setPreviewImages ] = useState<string[]>([]);

    async function handleFilePromise(url: string){
        return await fetch(url).then(res => res.blob().then(blob => new File([blob], url.split('-')[1], { type: 'image/png'})));
    }

    useEffect(() => {
        api.get(`/post/${postId}`).then(async res => {
            const { titulo, conteudo, imagens } = res.data;

            setTituloPost(titulo);
            setConteudoPost(conteudo);

            const imageArray = imagesPost.splice(0, imagesPost.length);
                
            await imagens.forEach(async (postImage: image) => {
                imageArray.push(await handleFilePromise(postImage.url));
            });
            
            setImagesPost(imageArray);

            console.log(imagesPost);
            
            const postImagesPreview = res.data.imagens.map((postImage: image) => new File([postImage.url.split('-', 2)[1]], postImage.url, {type: "image/png"}).name);
            setPreviewImages(postImagesPreview);
        }) 
    }, [])

    useEffect(() => {
        console.log(imagesPost);
    }, [imagesPost])

    async function handleSubmit(event: FormEvent){
        event.preventDefault();

        const data = new FormData();

        data.append('titulo', tituloPost);
        data.append('conteudo', conteudoPost);
        imagesPost.forEach(image => {
            data.append('imagens', image);
        })

        await api.put(`post/${postId}`, data).then(res => {
            alert(res.data);
        });

        functionVoltar('tabInicial');
    }

    function handleSelectImage(event: ChangeEvent<HTMLInputElement>){

        if(!event.target.files){
            return;
        }
    
        const selectedImages= Array.from(event.target.files);

        setImagesPost(selectedImages.concat(imagesPost));
    
        const selectedImagesPreview = selectedImages.map(image => {
            return URL.createObjectURL(image);
        }).concat(previewImages);
    
        setPreviewImages(selectedImagesPreview);
    }

    function handleRemoveImage(indice: number) {
        const imageArray = Array.from(previewImages);
        const imagesFileArray = Array.from(imagesPost);

        imageArray.splice(indice, 1);
        imagesFileArray.splice(indice, 1);
        
        setPreviewImages(imageArray);
        setImagesPost(imagesFileArray);
    }

    return (
        <div className="administracao-tab-container">
            <div className="tab-header">
                <h2>Alterar post</h2>
            </div>

            <form className='postForm' onSubmit={handleSubmit}>
                <fieldset>
                    <label htmlFor="Titulo">Titulo</label>
                    <input type="text" id='Titulo' placeholder='Titulo' value={tituloPost} 
                        name='Titulo' onChange={event => setTituloPost(event.target.value)}/>
                </fieldset>

                <fieldset>
                    <label htmlFor="Conteudo">Conteudo</label>
                    <textarea name="Conteudo" placeholder='Conteudo' value={conteudoPost}
                        id="Conteudo" onChange={event => setConteudoPost(event.target.value)}></textarea>
                </fieldset>

                <fieldset>
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
                </fieldset>

                <div className="botoes-container">
                    <button className="botao-alterar">
                        Alterar
                    </button>
                    <button className="botao-voltar" onClick={() => functionVoltar('tabInicial')}>
                        voltar
                    </button>
                </div>
            </form>
        </div>
    )
}