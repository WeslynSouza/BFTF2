import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import * as yup from 'yup';
import Classe from '../models/classe';

import Usuario from '../models/usuario';

export default {

    async create(req: Request, res: Response){
        const {
            steamID,
            nick,
            senha,
            acesso,
            classeID
        } = req.body;

        const usuarioRepository = getRepository(Usuario);
        const classeRepository = getRepository(Classe);

        const classeUsuario = await classeRepository.findOneOrFail(classeID);

        const data = {
            steamID,
            nick,
            senha,
            acesso,
            classes: [classeUsuario]
        }

        const schema = yup.object().shape({
            steamID: yup.string().required(),
            nick: yup.string().required(),
            senha: yup.string().required(),
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