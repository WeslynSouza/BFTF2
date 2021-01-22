import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import * as yup from 'yup';
import Classe from '../models/classe';

import Usuario from '../models/usuario';

export default {

    async index(req: Request, res: Response) {

        const usuarioRepository = getRepository(Usuario);

        const usuarios = await usuarioRepository.find({
            relations: ['avatar']
        });

        return res.status(200).json(usuarios);
    },

    async show(req: Request, res: Response) {

        const { id } = req.params;

        const usuarioRepository = getRepository(Usuario);

        const usuario = await usuarioRepository.findOneOrFail( id , {
            relations: ['avatar']
        });

        return res.status(200).json(usuario);
    },

    async create(req: Request, res: Response){
        const {
            steamId,
            nick,
            senha,
            acesso,
            classeID
        } = req.body;

        const usuarioRepository = getRepository(Usuario);
        const classeRepository = getRepository(Classe);

        const classeUsuario = await classeRepository.findOneOrFail(classeID);

        const requestImages = req.files as Express.Multer.File[];
        const avatar = {
            path: requestImages[0].filename
        };

        const data = {
            steamId,
            nick,
            senha,
            classes: [classeUsuario],
            avatar,
            acesso
        }

        const schema = yup.object().shape({
            steamId: yup.string().required(),
            nick: yup.string().required(),
            senha: yup.string().required(),
            classes: yup.array(),
            avatar: yup.object(),
            acesso: yup.number()
        })

        await schema.validate(data, {
            abortEarly: false,
        })

        const usuario = usuarioRepository.create(data);

        await usuarioRepository.save(usuario);

        return res.status(201).json(usuario);
    }
}