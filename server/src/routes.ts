import { Router } from 'express';
import multer from 'multer';
import uploadConfig from './config/uploads';

import UsuarioController from './controllers/usuarioController';
import ClasseController from './controllers/classeController';
import DivisaoController from './controllers/divisaoController';
import TimeController from './controllers/timeController';
import PostController from './controllers/postController';
import PartidaController from './controllers/partidaController';

const routes = Router();
const upload = multer(uploadConfig);

routes.post("/classe", ClasseController.create);
routes.get("/classe", ClasseController.index);
routes.get("/classe/:id", ClasseController.show);

routes.post("/usuario", upload.array('avatar'), UsuarioController.create);
routes.get("/usuario", UsuarioController.index);
routes.get("/usuario/:steamId", UsuarioController.show);

routes.post("/post", upload.array('imagens'), PostController.create);
routes.get("/post", PostController.index);
routes.get("/post/:id",  PostController.show);

routes.post("/divisao", DivisaoController.create);
routes.get("/divisao", DivisaoController.index);
routes.get("/divisao/:id", DivisaoController.show);

routes.post("/time", upload.array('logo'), TimeController.create);
routes.get("/time", TimeController.index);
routes.get("/time/:id", TimeController.show);

routes.post("/partida", PartidaController.create);
routes.get("/partida", PartidaController.index);
routes.get("/partida/:id", PartidaController.show);

export default routes;