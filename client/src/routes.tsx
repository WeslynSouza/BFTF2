import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from './pages/home';
import LoginCadastro from './pages/loginCadastro';
import Noticias from './pages/noticias';
import NoticiaPost from './pages/noticiasPost';
import Times from './pages/times';
import TimePerfil from './pages/timePerfil';
import Jogadores from './pages/jogadores';
import PageDivisao from './pages/divisao';
import Administracao from './pages/adiministracao';

function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path='/' exact component={Home}/>
                <Route path='/Login' component={LoginCadastro}/>
                <Route path='/Noticias' component={Noticias}/>
                <Route path='/NoticiaPost/:id' component={NoticiaPost}/>
                <Route path='/Times' component={Times}/>
                <Route path='/TimePerfil/:id' component={TimePerfil}/>
                <Route path='/Jogadores/:timeId' component={Jogadores}/>
                <Route path='/Divisoes' component={PageDivisao}/>
                <Route path='/Administracao' component={Administracao}/>
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;