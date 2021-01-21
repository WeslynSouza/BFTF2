import { Router } from 'express';

import UsuarioController from './controllers/usuarioController';
import ClasseController from './controllers/classeController';

const routes = Router();

routes.post("/usuarios", UsuarioController.create);

routes.post("/classe", ClasseController.create);

export default routes;