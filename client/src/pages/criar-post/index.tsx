import Menu from '../../components/menu';
import Cabecalho from '../../components/cabecalho';

export default function CriarPost() {

    return(
        <div className='cotainer'>
            <Menu/>
            <Cabecalho 
                titulo='Criar post' 
                links={[{titulo: 'Home', url: '/'}, {titulo: 'Noticias-feed', url: '/Noticias'}]}/>
        </div>
    )
}