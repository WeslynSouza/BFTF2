import Menu from '../../components/menu';
import Cabecalho from '../../components/cabecalho';
import { FaPlus, FaTrash } from 'react-icons/fa';
import { Table } from 'react-bootstrap';
import img from '../../assets/perfilPaula.jpg';
import * as Classes from '../../assets/assets';

import './style.css';

export default function TimePerfil() {

    return (
        <div className="container">

            <Menu/>
            <Cabecalho titulo="Nome Time" links={[{titulo: 'Home', url:'/'}, {titulo: 'Times', url: '/Times'}, {titulo: 'Perfil', url: '/TimePerfil'}]} />

            <div className="time-container">
                <div className="time-infos">
                    <img src={img} alt="Logo"/>
                    <h2>Divisão: Nome</h2>
                    <h2>Lider: Nome</h2>
                </div>

                <div className="time-conteudo">
                    <div className="time-conteudo-cabecalho">
                        <h2>Jogadores</h2>
                        <button type='button'>
                            Adicionar jogador <FaPlus/>
                        </button>
                    </div>
                    
                    <Table>
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Classe</th>
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
                                    <img src={Classes.scout} alt="classe"/>
                                    <img src={Classes.soldierBlue} alt="classe"/>
                                    <img src={Classes.pyro} alt="classe"/>
                                    <img src={Classes.demoman} alt="classe"/>
                                    <img src={Classes.heavyBlue} alt="classe"/>
                                    <img src={Classes.engieneer} alt="classe"/>
                                    <img src={Classes.sniper} alt="classe"/>
                                    <img src={Classes.medic} alt="classe"/>
                                    <img src={Classes.spy} alt="classe"/>
                                </td>
                                <td>
                                    <button>
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
                                    <img src={Classes.scout} alt="classe"/>
                                    <img src={Classes.soldierBlue} alt="classe"/>
                                    <img src={Classes.pyro} alt="classe"/>
                                    <img src={Classes.demoman} alt="classe"/>
                                    <img src={Classes.heavyBlue} alt="classe"/>
                                    <img src={Classes.engieneer} alt="classe"/>
                                    <img src={Classes.sniper} alt="classe"/>
                                    <img src={Classes.medic} alt="classe"/>
                                    <img src={Classes.spy} alt="classe"/>
                                </td>
                                <td>
                                    <button>
                                        <FaTrash/>
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
            </div>

        </div>
    )
}