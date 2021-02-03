import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Noticias from './pages/noticias';
import NoticiaPost from './pages/noticias-post';

function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path='/' exact component={Noticias}/>
                <Route path='/NoticiaPost' component={NoticiaPost}/>
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;