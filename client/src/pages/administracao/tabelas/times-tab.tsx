import { useState } from 'react';
import InputPesquisa from '../../../components/input-pesquisa';
import Placeholder from '../../../components/placeholder';
import { Table, Modal } from 'react-bootstrap';
import { FaPen, FaTrash } from 'react-icons/fa';

import img from '../../../assets/perfilPaula.jpg';

export default function Times() {

    type Time = {
        nome: string,
        logo: string,
        lider: object,
        divisao: string
    }

    const [ pesquisa, setPesquisa ] = useState('');
    const [ times, setTimes ] = useState<Time[]>([]);
    const [ show, setShow ] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function renderTab() {
        if(times.length !== 0) {
            return (
                <Table>
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Lider</th>
                            <th>Divisão</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {times.map(time => {
                            return (
                                <tr key={time.nome}>
                                    <td>
                                        <img src={img} alt="Avatar"/>
                                        {time.nome}
                                    </td>
                                    <td>
                                        <img src={img} alt="Avatar"/>
                                        {time.lider}
                                    </td>
                                    <td>
                                        {time.divisao}
                                    </td>
                                    <td>
                                        <button className='botao-excluir' onClick={handleShow}>
                                            <FaTrash/>
                                        </button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            )
        } else {
            return (
                <Placeholder texto='Nenhum time foi cadastrado no sistema!'/>
            )
        }
    }

    return (
        <div className='administracao-tab-container'>

            <div className="tab-header">
                <h2>Tabela time </h2>

                <InputPesquisa value={pesquisa}
                    setValue={setPesquisa} height='4rem' inputWidth='23.53rem' 
                    buttonWidth='5.7rem' fontInput='2.1rem' fontButton='2.6rem'/>
            </div>

            {renderTab()}

            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header>
                    <Modal.Title>Confirmar exclusão</Modal.Title>
                </Modal.Header>
                <Modal.Body>Deseja excluir o time: Nome Time?</Modal.Body>
                <Modal.Footer>
                    <button className="botao-confirmar">Confirmar</button>
                    <button className="botao-voltar" onClick={handleClose}>Voltar</button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}