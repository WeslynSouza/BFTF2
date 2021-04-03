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
routes.get("/usuarios", UsuarioController.index);
routes.get("/usuarios/:nick", UsuarioController.showMany);
routes.get("/usuario/:id", UsuarioController.show);
routes.put("/usuario/:steamId", upload.array('avatar'), UsuarioController.update);

routes.post("/post", upload.array('imagens'), PostController.create);
routes.get("/posts", PostController.index);
routes.get("/post/:id",  PostController.show);
routes.get("/posts/:titulo", PostController.showMany);
routes.put("/post/:id", upload.array('imagens'), PostController.update);

routes.post("/divisao", DivisaoController.create);
routes.get("/divisao", DivisaoController.index);
routes.get("/divisao/:id", DivisaoController.show);

routes.post("/time", upload.array('logo'), TimeController.create);
routes.get("/times", TimeController.index);
routes.get("/time/:id", TimeController.show);
routes.get("/times/:nome", TimeController.showMany);
routes.put("/time/:id", upload.array('logo'), TimeController.update);
routes.delete("/time/:id", TimeController.delete);

routes.post("/partida", PartidaController.create);
routes.get("/partida", PartidaController.index);
routes.get("/partida/:id", PartidaController.show);

export default routes;