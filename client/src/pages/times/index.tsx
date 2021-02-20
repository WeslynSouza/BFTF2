import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Menu from '../../components/menu';
import Cabecalho from '../../components/cabecalho';
import Rodape from '../../components/rodape';
import InputPesquisa from '../../components/input-pesquisa';
import Placeholder from '../../components/placeholder';
import api from '../../services/api';

import './style.scss';

type Time = {
    id: number,
    nome: string,
    logo: string
}

export default function Times() {

    const [ pesquisa, setPesquisa ] = useState('');
    const [ times, setTimes ] = useState<Time[]>([]);

    useEffect(() => {
        api.get('/time').then(res => {
            setTimes(res.data);
        })
    }, []);

    function renderLista() {
        if(times.length !== 0) {
            return (
                <ul className='time-lista'>
                    {times.map(time => {
                        return (
                            <li className="time-lista-item" key={time.id}>
                                <Link to={`/TimePerfil/${time.id}`}>
                                    <img src={time.logo} alt="logo"/>
                                    <h2>{time.nome}</h2>
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            )
        } else {
            return (
                <Placeholder texto='Nenhum time foi encontrado no sistema!'/>
            )
        }
    }

    return (
        <div>
            <Menu/>
            <div className="container"> 
                <Cabecalho titulo='Times' links={[{url: '/', titulo: 'Home'}, {url: '/Times', titulo: 'Times'}]} />

                <div className="times-opcoes">
                    <InputPesquisa value={pesquisa} 
                        setValue={setPesquisa} height='6rem' inputWidth='65rem' 
                        buttonWidth='7rem' fontInput='2.5rem' fontButton='3.2rem'/>

                    <button className='butao-criar'>Criar time +</button>
                </div>

                {renderLista()}
                       
            </div>
            <Rodape/>
        </div>
    )
}