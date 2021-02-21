import { useState } from 'react';
import Menu from '../../components/menu';
import Cabecalho from '../../components/cabecalho';
import Rodape from '../../components/rodape';
import { Tabs, Tab } from 'react-bootstrap';

import UsuariosTabela from './tabelas/usuario-tab';
import UsuarioForm from './formularios/usuario-form';
import TimesTabela from './tabelas/times-tab';
import DivisoesTabela from './tabelas/divisao-tab';
import PostList from './listas/post-list';
import PostForm from './formularios/post-form';

import './style.scss';

export default function Administracao() {

    const [ state, setState ] = useState('tabInicial');
    const [ usuarioId, setUsuarioId ] = useState('');
    const [ postId, setPostId ] = useState('');

    function handleState() {
        switch(state) {
            case "tabInicial":
                return (
                    <Tabs className='administracao-tab' defaultActiveKey='usuario' id='administracao-tab'>
                        <Tab className='administracao-tab-item' eventKey='usuario' title='Usuarios'>
                            <UsuariosTabela functionUsuarioId={setUsuarioId} functionAlterar={setState}/>
                        </Tab>
                        <Tab className='administracao-tab-item' eventKey='times' title='Times'>
                            <TimesTabela/>
                        </Tab>
                        <Tab className='administracao-tab-item' eventKey='Divisoes' title='Divisões'>
                            <DivisoesTabela/>
                        </Tab>
                        <Tab className='administracao-tab-item' eventKey='posts' title='Posts'>
                            <PostList functionPostId={setPostId} functionAlterar={setState}/>
                        </Tab>
                    </Tabs>
                );
            case "usuarioForm":
                return (
                    <Tabs className='administracao-tab' defaultActiveKey='usuario' id='administracao-tab'>
                        <Tab className='administracao-tab-item' eventKey='usuario' title='Alterar'>
                            <UsuarioForm functionVoltar={setState} usuarioId={usuarioId}/>
                        </Tab>
                    </Tabs>
                );
            case "postForm":
                return (
                    <Tabs className='administracao-tab' defaultActiveKey='posts' id='administracao-tab'>
                        <Tab className='administracao-tab-item' eventKey='posts' title='Alterar'>
                            <PostForm functionVoltar={setState} postId={postId}/>
                        </Tab>
                    </Tabs>
                );
        }
    }

    return (
        <div>
            <Menu/>
            <div className="container">
                <Cabecalho titulo='Administração' links={[{url: '/', titulo: 'Home'}, {url: '/administracao', titulo: 'Administração'}]}/>

                <div className="administracao-container">
                    {handleState()}
                </div>
            </div>
            <Rodape/>
        </div>
        
    )
}