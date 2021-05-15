import { UsuarioProvider } from './contexts/usuarioContext';

import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/global.scss';
import './styles/styles.scss';

import Routes from './routes';

function App() {
  return (
    <div className="App">
      <UsuarioProvider>
        <Routes />
      </UsuarioProvider>
    </div>
  );
}

export default App;
