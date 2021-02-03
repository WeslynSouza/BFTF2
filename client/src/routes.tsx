import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Noticias from './pages/noticias';

function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path='/' exact component={Noticias}/>
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;