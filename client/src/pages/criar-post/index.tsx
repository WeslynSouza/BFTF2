import Menu from '../../components/menu';
import Cabecalho from '../../components/cabecalho';

import './style.css';

export default function CriarPost() {

    return(
        <div className='cotainer'>
            <Menu/>
            <Cabecalho 
                titulo='Criar post' 
                links={[{titulo: 'Home', url: '/'}, {titulo: 'Noticias-feed', url: '/Noticias'}]}/>

            <div className="post-form">
                <form>
                    <label htmlFor="titulo">Titulo</label>
                    <input type="text" name='titulo' id='titulo'/>

                    <label htmlFor="conteudo">Conteudo</label>
                    <textarea name="conteudo" id="conteudo" cols={40} rows={10}></textarea>

                    <label htmlFor="imagens">Imagens</label>
                    <input multiple type="file" name="imagens" id="imagens"/>

                    <div className="butoes">
                        <button type='button' className='butao-enviar'>Enviar</button>
                        <button type="reset" className='butao-reset'>Limpar</button>
                    </div>
                </form>
            </div>
        </div>
    )
}