import { useState } from 'react';
import Placeholder from '../placeholder';

type Divisao = {
    nome: string,
    times: [],
    rodadas: [],
}

export default function Divisoes() {

    const [ divisao, setDivisao ] = useState<Divisao>(Object);

    function renderTab() {
        if(divisao.nome === '') {

        } else {
            return (
                <Placeholder texto='Nenhuma divisao foi cadastrada no sistema!'/>
            )
        }
    }

    return (
        <div className='administracao-tab-container'>
            <div className="tab-header">
                <h2>Divisões</h2>
            </div>

            {renderTab()}
        </div>
    )
}