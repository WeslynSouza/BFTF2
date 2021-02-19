import { useState, FormEvent, ChangeEvent } from 'react';
import { useHistory } from 'react-router-dom';
import {FaTimes, FaPlus} from 'react-icons/fa';

type postForm = {
    functionVoltar: Function;
}

export default function PostForm({ functionVoltar }: postForm) {

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

    return (
        <div className="administracao-tab-container">
            <div className="tab-header">
                <h2>Alterar post</h2>
            </div>

            <form className='form-primary'>
                <fieldset>
                    <label htmlFor="Titulo">Titulo</label>
                    <input type="text" id='Titulo' placeholder='Titulo' value={titulo} 
                        name='Titulo' onChange={event => setTitulo(event.target.value)}/>
                </fieldset>

                <fieldset>
                    <label htmlFor="Conteudo">Conteudo</label>
                    <textarea name="Conteudo" placeholder='Conteudo' value={conteudo}
                        id="Conteudo" onChange={event => setConteudo(event.target.value)}></textarea>
                </fieldset>

                <fieldset>
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
                </fieldset>

                <div className="botoes-container">
                    <button className="botao-alterar">
                        Alterar
                    </button>
                    <button className="botao-voltar" onClick={() => functionVoltar('lista')}>
                        voltar
                    </button>
                </div>
            </form>
        </div>
    )
}