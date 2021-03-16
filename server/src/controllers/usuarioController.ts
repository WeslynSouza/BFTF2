import { Request, Response } from 'express';
import { getRepository, Like } from 'typeorm';
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

        const usuario = await usuarioRepository.findOneOrFail( id, {
            relations: ['time', 'classes', 'posts']
        });

        return res.status(200).json(UsuarioView.render(usuario));
    },

    async showMany(req: Request, res: Response) {

        const { nick } = req.params;

        const usuarioRepository = getRepository(Usuario);

        const usuario = await usuarioRepository.find({
           where:{ nick: Like(`${nick}%`) },
            relations: ['time', 'classes', 'posts']
        });

        return res.status(200).json(UsuarioView.renderMany(usuario));
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
    },

    async update(req: Request, res: Response) {

        const { steamId } = req.params;

        const {
            nick,
            acesso,
            classes,
            elegivel
        } = req.body;

        console.log(classes);

        const usuarioRepository = getRepository(Usuario);
        const classeRepository = getRepository(Classe);

        const usuario = await usuarioRepository.findOneOrFail( steamId, {
            relations: ['time', 'classes', 'posts']
        });

        const classeUsuario: Array<Classe> = [];

        if(classes) {
            for (const i in classes) {
                if (Object.prototype.hasOwnProperty.call(classes, i)) {    
                    classeUsuario.push( await classeRepository.findOneOrFail(Number(classes[i])))
                }
            }
        }

        let avatar = usuario.avatar;
        const requestImages = req.files as Express.Multer.File[];
        if(requestImages.length !== 0){
            avatar = requestImages[0].filename;
        }

        const data = {
            steamId,
            nick: nick || usuario.nick,
            senha: usuario.senha,
            acesso: acesso || usuario.acesso,
            avatar,
            classes: classeUsuario || usuario.classes,
            elegivel: Number(elegivel) || usuario.elegivel
        }

        const schema = yup.object().shape({
            steamId: yup.string().required(),
            nick: yup.string().required(),
            senha: yup.string().required(),
            classes: yup.array(),
            avatar: yup.string(),
            acesso: yup.number(),
            elegivel: yup.number()
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const newUsuario = usuarioRepository.create(data);

        await usuarioRepository.save(newUsuario);

        return res.status(201).json(newUsuario);
    }
}