import { Router } from 'express';

import UsuarioController from './controllers/usuarioController';
import ClasseController from './controllers/classeController';
import DivisaoController from './controllers/divisaoController';
import TimeController from './controllers/timeControler';

const routes = Router();

routes.post("/classe", ClasseController.create);
routes.get("/classe", ClasseController.index);
routes.get("/classe/:id", ClasseController.show)

routes.post("/usuario", UsuarioController.create);
routes.get("/usuario", UsuarioController.index);
routes.get("/usuario/:steamId", UsuarioController.show)

routes.post("/divisao", DivisaoController.create);
routes.get("/divisao", DivisaoController.index);
routes.get("/divisao/:id", DivisaoController.show)

routes.post("/time", TimeController.create);
routes.get("/time", TimeController.index);
routes.get("/time/:id", TimeController.show)

export default routes;