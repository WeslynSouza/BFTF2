import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from './pages/home';
import Noticias from './pages/noticias';
import NoticiaPost from './pages/noticias-post';
import CriarPost from './pages/criar-post';
import Times from './pages/times';
import TimePerfil from './pages/time-perfil';
import Jogadores from './pages/jogadores';
import Divisoes from './pages/divisoes';
import Administracao from './pages/administracao';

function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path='/' exact component={Home}/>
                <Route path='/Noticias' component={Noticias}/>
                <Route path='/NoticiaPost' component={NoticiaPost}/>
                <Route path='/CriarPost' component={CriarPost}/>
                <Route path='/Times' component={Times}/>
                <Route path='/TimePerfil/:id' component={TimePerfil}/>
                <Route path='/Jogadores' component={Jogadores}/>
                <Route path='/Divisoes' component={Divisoes}/>
                <Route path='/Administracao' component={Administracao}/>
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;