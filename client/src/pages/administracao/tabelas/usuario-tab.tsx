import { useEffect, useState } from 'react';
import InputPesquisa from '../../../components/input-pesquisa';
import Placeholder from '../../../components/placeholder';
import { FaPen, FaTrash } from 'react-icons/fa';
import { Table, Modal } from 'react-bootstrap';
import * as Classes from '../../../assets/assets';
import api from '../../../services/api';

type usuaiosTabela = {
    functionAlterar: Function
}

type Usuario = {
    steamId: number
    nick: string, 
    avatar: string,
    time: {
        nome: string,
        logo: string
    }, 
    classes: [],
}

export default function UsuariosTabela({ functionAlterar }: usuaiosTabela) {

    const [ pesquisa, setPesquisa ] = useState('');
    const [ usuarios, setUsuarios ] = useState<Usuario[]>([]);
    const [ show, setShow ] = useState(false);

    useEffect(() => {
        api.get('/usuario').then(res => {
            setUsuarios(res.data);
        })
    }, []);

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
                            <tr key={usuario.steamId}>
                                <td>
                                    <img src={usuario.avatar} alt="Avatar"/>
                                    {usuario.nick}
                                </td>
                                <td>
                                    <img src={usuario.time.logo} alt="logo"/>
                                    {usuario.time.nome}
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
                <Placeholder texto='Nenhum usuário foi cadastrado no sistema!'/>
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