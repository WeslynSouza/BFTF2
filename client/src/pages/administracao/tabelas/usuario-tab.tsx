import { useState } from 'react';
import InputPesquisa from '../../../components/input-pesquisa';
import { FaPen, FaTrash } from 'react-icons/fa';
import { Table, Modal } from 'react-bootstrap';
import * as Classes from '../../../assets/assets';
import img from '../../../assets/perfilPaula.jpg';

import Placeholder from '../../../assets/barreira.svg';

type usuaiosTabela = {
    functionAlterar: Function
}

export default function UsuariosTabela({ functionAlterar }: usuaiosTabela) {

    type Usuario = {
        nome: string, 
        time: string, 
        classes: [],
    }

    const [ pesquisa, setPesquisa ] = useState('');
    const [ usuarios, setUsuarios ] = useState<Usuario[]>([]);
    const [ show, setShow ] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function renderTab() {
        if(usuarios.length !== 0){
            return (
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
                    {usuarios.map(usuario => {
                        return (
                            <tr key={usuario.nome}>
                                <td>
                                    <img src={img} alt="Avatar"/>
                                    {usuario.nome}
                                </td>
                                <td>
                                    <img src={img} alt="Avatar"/>
                                    {usuario.time}
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
                                    <button className='botao-alterar' onClick={() => functionAlterar('formulario')}>
                                        <FaPen/>
                                    </button>
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
                <div className='tab-placeholder'>
                    <img src={Placeholder} alt="barreira"/>
                    <h2>Nenhum usuário foi cadastrado no sistema</h2>
                </div>
            )
        }
    }

    return (
        <div className='administracao-tab-container'>
            <div className="tab-header">
                <h2>Tabela usuarios</h2>

                <InputPesquisa value={pesquisa}
                    setValue={setPesquisa} height='4rem' inputWidth='23.53rem' 
                    buttonWidth='5.7rem' fontInput='2.1rem' fontButton='2.6rem'/>
            </div>

            {renderTab()}

            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header>
                    <Modal.Title>Confirmar exclusão</Modal.Title>
                </Modal.Header>
                <Modal.Body>Deseja excluir o usuario: Nome usuario?</Modal.Body>
                <Modal.Footer>
                    <button className="botao-confirmar">Confirmar</button>
                    <button className="botao-voltar" onClick={handleClose}>Voltar</button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}