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

    const [ usuarioState, setUsuarioState ] = useState('tabela');
    const [ postState, setPostState ] = useState('lista');

    function handleUsuarioState() {
        if(usuarioState === 'tabela') 
            return <UsuariosTabela functionAlterar={setUsuarioState}/>
        else
            return <UsuarioForm functionVoltar={setUsuarioState}/>
    }

    function handlePostState() {
        if(postState === 'lista') 
            return <PostList functionAlterar={setPostState}/>
        else
            return <PostForm functionVoltar={setPostState}/>
    }

    return (
        <div>
            <Menu/>
            <div className="container">
                <Cabecalho titulo='Administração' links={[{url: '/', titulo: 'Home'}, {url: '/administracao', titulo: 'Administração'}]}/>

                <div className="administracao-container">
                    <Tabs className='administracao-tab' defaultActiveKey='usuario' id='administracao-tab'>
                        <Tab className='administracao-tab-item' eventKey='usuario' title='Usuarios'>
                            {handleUsuarioState()}
                        </Tab>
                        <Tab className='administracao-tab-item' eventKey='times' title='Times'>
                            <TimesTabela/>
                        </Tab>
                        <Tab className='administracao-tab-item' eventKey='Divisoes' title='Divisões'>
                            <DivisoesTabela/>
                        </Tab>
                        <Tab className='administracao-tab-item' eventKey='Posts' title='Posts'>
                            {handlePostState()}
                        </Tab>
                    </Tabs>
                </div>
            </div>
            <Rodape/>
        </div>
        
    )
}