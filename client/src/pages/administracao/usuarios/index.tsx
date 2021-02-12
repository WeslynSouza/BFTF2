import { useState } from 'react';
import InputPesquisa from '../../../components/input-pesquisa';
import { FaPen, FaTrash } from 'react-icons/fa';
import { Tab } from 'react-bootstrap';
import * as Classes from '../../../assets/assets';

import './style.css';

export default function Usuarios() {

    const [ pesquisa, setPesquisa ] = useState('');

    return (
        <div className='usuarios-tab-container'>
            <div className="usuarios-tab-infos">
                <h2>Tabela usuarios</h2>

                <InputPesquisa value={pesquisa}
                    setValue={setPesquisa} height='4rem' inputWidth='23.53rem' 
                    buttonWidth='5.7rem' fontInput='2.1rem' fontButton='2.6rem'/>
            </div>
        </div>
    )
}