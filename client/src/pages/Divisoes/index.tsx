import Menu from '../../components/menu';
import Cabecalho from '../../components/cabecalho';
import Rodape from '../../components/rodape';
import { Table } from 'react-bootstrap';

import './style.scss';

export default function Divisoes() {

    return (
        <div>
            <Menu/>
            <div className="container">
                <Cabecalho titulo='Divisões' links={[{url: '/', titulo: 'Home'},{url: '/Divisoes', titulo: 'Divisões'}]} />

                <div className="divisao-select">
                    <select name="Divisoes" id="Divisoes">
                        <option value="Divisao-academy">Divisão academy</option>
                    </select>
                </div>

                <div className="table-container">
                    <Table>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Time</th>
                                <th>Pontos</th>
                                <th>Partidas</th>
                                <th>Vitorias</th>
                                <th>Derrotas</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>Nome</td>
                                <td>30</td>
                                <td>10</td>
                                <td>8</td>
                                <td>2</td>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>Nome</td>
                                <td>30</td>
                                <td>10</td>
                                <td>8</td>
                                <td>2</td>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>Nome</td>
                                <td>30</td>
                                <td>10</td>
                                <td>8</td>
                                <td>2</td>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>Nome</td>
                                <td>30</td>
                                <td>10</td>
                                <td>8</td>
                                <td>2</td>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>Nome</td>
                                <td>30</td>
                                <td>10</td>
                                <td>8</td>
                                <td>2</td>
                            </tr>
                        </tbody>
                    </Table>
                </div>

                <h2 className='titulo-partidas'>Partidas</h2>

                <div className="partidas-container">
                    <div className="semana-container">
                        <h3>Semana 1</h3>
                        <div className="partida-box">
                            <div className="time1">
                                <h4>
                                    Time1
                                </h4>
                                <h4>
                                    2
                                </h4>
                            </div>
                            <div className="time2">
                                <h4>
                                    Time2
                                </h4>
                                <h4>
                                    1
                                </h4>
                            </div>
                        </div>

                        <div className="partida-box">
                            <div className="time1">
                                <h4>
                                    Time1
                                </h4>
                                <h4>
                                    2
                                </h4>
                            </div>
                            <div className="time2">
                                <h4>
                                    Time2
                                </h4>
                                <h4>
                                    1
                                </h4>
                            </div>
                        </div>
                    </div>

                    <div className="semana-container">
                        <h3>Semana 1</h3>
                        <div className="partida-box">
                            <div className="time1">
                                <h4>
                                    Time1
                                </h4>
                                <h4>
                                    2
                                </h4>
                            </div>
                            <div className="time2">
                                <h4>
                                    Time2
                                </h4>
                                <h4>
                                    1
                                </h4>
                            </div>
                        </div>

                        <div className="partida-box">
                            <div className="time1">
                                <h4>
                                    Time1
                                </h4>
                                <h4>
                                    2
                                </h4>
                            </div>
                            <div className="time2">
                                <h4>
                                    Time2
                                </h4>
                                <h4>
                                    1
                                </h4>
                            </div>
                        </div>
                    </div>

                    <div className="semana-container">
                        <h3>Semana 1</h3>
                        <div className="partida-box">
                            <div className="time1">
                                <h4>
                                    Time1
                                </h4>
                                <h4>
                                    2
                                </h4>
                            </div>
                            <div className="time2">
                                <h4>
                                    Time2
                                </h4>
                                <h4>
                                    1
                                </h4>
                            </div>
                        </div>

                        <div className="partida-box">
                            <div className="time1">
                                <h4>
                                    Time1
                                </h4>
                                <h4>
                                    2
                                </h4>
                            </div>
                            <div className="time2">
                                <h4>
                                    Time2
                                </h4>
                                <h4>
                                    1
                                </h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Rodape/>
        </div>
    )
}