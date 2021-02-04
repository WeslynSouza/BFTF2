import { ChangeEvent, FormEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';
import Menu from '../../components/menu';
import Cabecalho from '../../components/cabecalho';

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

        setImages(selectedImages);
    
        const selectedImagesPreview = selectedImages.map(image => {
            return URL.createObjectURL(image);
        }).concat(previewImages);
    
        setPreviewImages(selectedImagesPreview);
    }

    return(
        <div className='cotainer'>
            <Menu/>
            <Cabecalho 
                titulo='Criar post' 
                links={[{titulo: 'Home', url: '/'}, {titulo: 'Noticias', url: '/Noticias'}]}/>

            <div className="post-form">
                <form onSubmit={handleSubmit}>
                    <label htmlFor="titulo">Titulo</label>
                    <input onChange={event => setTitulo(event.target.value)} type="text" name='titulo' id='titulo'/>

                    <label htmlFor="conteudo">Conteudo</label>
                    <textarea onChange={event => setConteudo(event.target.value)} name="conteudo" id="conteudo" cols={40} rows={10}></textarea>

                    <label htmlFor="imagens">Imagens</label>
                    <div className="imagens">
                        {previewImages.map(image => {
                            return (
                                <img key={image} src={image} alt='imagem'/>
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
    )
}