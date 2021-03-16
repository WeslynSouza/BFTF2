import { useEffect, useState } from 'react';
import InputPesquisa from '../../../components/input-pesquisa';
import Placeholder from '../../../components/placeholder';
import { FaPen, FaTrash } from 'react-icons/fa';
import { Table, Modal } from 'react-bootstrap';
import * as Classes from '../../../assets/assets';
import api from '../../../services/api';

interface usuaiosTabela {
    functionUsuarioId: Function,
    functionAlterar: Function
}

interface Classe {
    nome: string
}

interface Usuario {
    steamId: number
    nick: string, 
    avatar: string,
    time: {
        nome: string,
        logo: string
    }, 
    classes: Classe[],
}

export default function UsuariosTabela({ functionUsuarioId, functionAlterar }: usuaiosTabela) {

    const [ pesquisa, setPesquisa ] = useState('');
    const [ usuarios, setUsuarios ] = useState<Usuario[]>([]);
    const [ show, setShow ] = useState(false);

    useEffect(() => {
        api.get(`/usuarios/${pesquisa}`).then(res => {
            setUsuarios(res.data);
        })
    }, [pesquisa]);

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

                        let scout, soldier, pyro, demoman, heavy, engieneer, medic, sniper, spy;

                        usuario.classes.forEach(classe => {
                            switch(classe.nome){
                                case 'scout':
                                    scout = true;
                                    break;
                                case 'soldier':
                                    soldier = true;
                                    break;
                                case 'pyro':
                                    pyro = true;
                                    break;
                                case 'demoman':
                                    demoman = true;
                                    break;
                                case 'heavy':
                                    heavy = true;
                                    break;
                                case 'engieneer':
                                    engieneer = true;
                                    break;
                                case 'medic':
                                    medic = true;
                                    break;
                                case 'sniper':
                                    sniper = true;
                                    break;
                                case 'spy':
                                    spy = true;
                                    break;
                            }
                        })

                        return (
                            <tr key={usuario.steamId}>
                                <td>
                                    <img src={usuario.avatar} alt="Avatar"/>
                                    {usuario.nick}
                                </td>
                                <td>
                                    {usuario.time.logo === undefined ? 'Sem time' : <img src={usuario.time.logo} alt="logo"/> }
                                    {usuario.time.nome}
                                </td>
                                <td>
                                    <div>
                                        <img src={scout ? Classes.scoutBlue : Classes.scout } alt="classe"/>
                                        <img src={soldier ? Classes.soldierBlue : Classes.soldier } alt="classe"/>
                                        <img src={pyro ? Classes.pyroBlue : Classes.pyro } alt="classe"/>
                                        <img src={demoman ? Classes.demomanBlue : Classes.demoman } alt="classe"/>
                                        <img src={heavy ? Classes.heavyBlue : Classes.heavy } alt="classe"/>
                                        <img src={engieneer ? Classes.engieneerBlue : Classes.engieneer } alt="classe"/>
                                        <img src={medic ? Classes.medicBlue : Classes.medic } alt="classe"/>
                                        <img src={sniper ? Classes.sniperBlue : Classes.sniper } alt="classe"/>
                                        <img src={spy ? Classes.spyBlue : Classes.spy } alt="classe"/>
                                    </div>
                                </td>
                                <td>
                                    <button className='botao-alterar' onClick={() => [functionAlterar('usuarioForm'), functionUsuarioId(usuario.steamId)]}>
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