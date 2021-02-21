import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import * as yup from 'yup';
import Classe from '../models/classe';

import Usuario from '../models/usuario';
import UsuarioView from '../views/usuarioView';

export default {

    async index(req: Request, res: Response) {

        const usuarioRepository = getRepository(Usuario);

        const usuarios = await usuarioRepository.find({
            relations: ['time', 'classes', 'posts']
        });

        return res.status(200).json(UsuarioView.renderMany(usuarios));
    },

    async show(req: Request, res: Response) {

        const { id } = req.params;

        const usuarioRepository = getRepository(Usuario);

        const usuario = await usuarioRepository.findOneOrFail( id , {
            relations: ['time', 'classes', 'posts']
        });

        return res.status(200).json(UsuarioView.render(usuario));
    },

    async create(req: Request, res: Response){
        const {
            steamId,
            nick,
            senha,
            acesso,
            classes
        } = req.body;

        const usuarioRepository = getRepository(Usuario);
        const classeRepository = getRepository(Classe);

        const classeUsuario: Array<Classe> = [];

        for (const i in classes) {
            if (Object.prototype.hasOwnProperty.call(classes, i)) {    
                classeUsuario.push( await classeRepository.findOneOrFail(classes[i]))
            }
        }

        const requestImages = req.files as Express.Multer.File[];
        const avatar = requestImages[0].filename;
        

        const data = {
            steamId,
            nick,
            senha,
            classes: classeUsuario,
            avatar,
            acesso,
            elegivel: 0,
        }

        const schema = yup.object().shape({
            steamId: yup.string().required(),
            nick: yup.string().required(),
            senha: yup.string().required(),
            classes: yup.array(),
            avatar: yup.string(),
            acesso: yup.number(),
            elegivel: yup.number()
        })

        await schema.validate(data, {
            abortEarly: false,
        })

        const usuario = usuarioRepository.create(data);

        await usuarioRepository.save(usuario);

        return res.status(201).json(usuario);
    }
}