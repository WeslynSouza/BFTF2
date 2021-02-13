import { useState } from 'react';
import InputPesquisa from '../../../components/input-pesquisa';
import { FaPen, FaTrash } from 'react-icons/fa';
import { Table } from 'react-bootstrap';
import * as Classes from '../../../assets/assets';
import img from '../../../assets/perfilPaula.jpg';

export default function Usuarios() {

    const [ pesquisa, setPesquisa ] = useState('');

    return (
        <div className='administracao-table-container'>
            <div className="table-header">
                <h2>Tabela usuarios</h2>

                <InputPesquisa value={pesquisa}
                    setValue={setPesquisa} height='4rem' inputWidth='23.53rem' 
                    buttonWidth='5.7rem' fontInput='2.1rem' fontButton='2.6rem'/>
            </div>

            <Table>
                <thead>
                    <tr>
                        <th>Usuarios</th>
                        <th>Time</th>
                        <th>Classes</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <img src={img} alt="Avatar"/>
                            Nome jogador
                        </td>
                        <td>
                            <img src={img} alt="Avatar"/>
                            Nome jogador
                        </td>
                        <td>
                            <div>
                                <img src={Classes.scout} alt="classe"/>
                                <img src={Classes.soldierBlue} alt="classe"/>
                                <img src={Classes.pyro} alt="classe"/>
                                <img src={Classes.demoman} alt="classe"/>
                                <img src={Classes.heavyBlue} alt="classe"/>
                                <img src={Classes.engieneer} alt="classe"/>
                                <img src={Classes.sniper} alt="classe"/>
                                <img src={Classes.medic} alt="classe"/>
                                <img src={Classes.spy} alt="classe"/>
                            </div>
                        </td>
                        <td>
                            <button className='butao-alterar'>
                                <FaPen/>
                            </button>
                            <button className='butao-excluir'>
                                <FaTrash/>
                            </button>
                        </td>
                    </tr>

                    <tr>
                        <td>
                            <img src={img} alt="Avatar"/>
                            Nome jogador
                        </td>
                        <td>
                            <img src={img} alt="Avatar"/>
                            Nome jogador
                        </td>
                        <td>
                            <div>
                                <img src={Classes.scout} alt="classe"/>
                                <img src={Classes.soldierBlue} alt="classe"/>
                                <img src={Classes.pyro} alt="classe"/>
                                <img src={Classes.demoman} alt="classe"/>
                                <img src={Classes.heavyBlue} alt="classe"/>
                                <img src={Classes.engieneer} alt="classe"/>
                                <img src={Classes.sniper} alt="classe"/>
                                <img src={Classes.medic} alt="classe"/>
                                <img src={Classes.spy} alt="classe"/>
                            </div>
                        </td>
                        <td>
                            <button className='butao-alterar'>
                                <FaPen/>
                            </button>
                            <button className='butao-excluir'>
                                <FaTrash/>
                            </button>
                        </td>
                    </tr>
                </tbody>
            </Table>
        </div>
    )
}