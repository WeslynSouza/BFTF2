import { ChangeEvent, FormEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FaPlus, FaTimes } from 'react-icons/fa';
import Menu from '../../components/menu';
import Cabecalho from '../../components/cabecalho';
import Rodape from '../../components/rodape';

import './style.css';

export default function CriarPost() {

    const history = useHistory();

    const [ titulo, setTitulo ] = useState('');
    const [ conteudo, setConteudo ] = useState('');
    const [ images, setImages ] = useState<File[]>([]);
    const [ previewImages, setPreviewImages ] = useState<string[]>([]);

    async function handleSubmit(event: FormEvent){
        event.preventDefault();

        const data = new FormData();

        data.append('titulo', titulo);
        data.append('conteudo', conteudo);
        images.forEach(image => {
            data.append('images', image);
        })

        alert('Cadastro realizado com sucesso!');

        history.push('/');
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

    return(
        <div>
            <Menu/>
            <div className='container'>
                <Cabecalho 
                    titulo='Criar post' 
                    links={[{titulo: 'Home', url: '/'}, {titulo: 'Noticias', url: '/Noticias'}, {titulo: 'Criar post', url: '/CriarPost'}]}/>

                <div className="post-form">
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="titulo">Titulo</label>
                        <input onChange={event => setTitulo(event.target.value)} type="text" name='titulo' id='titulo'/>

                        <label htmlFor="conteudo">Conteudo</label>
                        <textarea onChange={event => setConteudo(event.target.value)} name="conteudo" id="conteudo" cols={40} rows={10}></textarea>

                        <label htmlFor="imagens">Imagens</label>
                        <div className="imagens">
                            {previewImages.map((image, indice) => {
                                return (
                                    <div className="image-area">
                                        <img key={image} src={image} alt='imagem'/>
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
                        <input multiple onChange={handleSelectImage} type="file" id="image[]"/>

                        <div className="butoes">
                            <button type='submit' className='butao-enviar'>Enviar</button>
                            <button type="reset" className='butao-reset'>Limpar</button>
                        </div>
                    </form>
                </div>
            </div>
            <Rodape/>
        </div>
    )
}