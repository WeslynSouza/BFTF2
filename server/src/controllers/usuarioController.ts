import { Request, response, Response } from 'express';
import { getRepository, Like, Not } from 'typeorm';
import * as yup from 'yup';
import Classe from '../models/classe';
import Time from '../models/time';

import Usuario from '../models/usuario';
import UsuarioView from '../views/usuarioView';

export default {

    async index(req: Request, res: Response) {

        const usuarioRepository = getRepository(Usuario);

        const usuarios = await usuarioRepository.find({
            where: { steamId: Not('0') },
            relations: ['time', 'classes', 'posts']
        });

        return res.status(200).json(UsuarioView.renderMany(usuarios));
    },

    async show(req: Request, res: Response) {

        const { id } = req.params;

        const usuarioRepository = getRepository(Usuario);

        const usuario = await usuarioRepository.findOneOrFail( id, {
            where: { steamId: Not('0') },
            relations: ['time', 'classes', 'posts']
        });

        return res.status(200).json(UsuarioView.render(usuario));
    },

    async showMany(req: Request, res: Response) {

        const { nick } = req.params;

        const usuarioRepository = getRepository(Usuario);

        const usuario = await usuarioRepository.find({
           where:{ steamId: Not('0'), nick: Like(`${nick}%`) },
            relations: ['time', 'classes', 'posts']
        });

        return res.status(200).json(UsuarioView.renderMany(usuario));
    },

    async create(req: Request, res: Response){
        const {
            steamId,
            nick,
            senha,
        } = req.body;

        const usuarioRepository = getRepository(Usuario);
        
        try {
            await usuarioRepository.findOneOrFail(steamId);

            return res.status(400).send("O usuário já está cadastrado no sistema!");
        } catch {
            const timeRepository = getRepository(Time);

            const timePadrao = await timeRepository.findOneOrFail(1);
    
            const requestImages = req.files as Express.Multer.File[];
            let avatar = '';
            if(requestImages.length > 0) {
                avatar = requestImages[0].filename;
            } 
            
    
            const data = {
                steamId,
                nick,
                senha,
                classes: [],
                avatar,
                acesso: 0,
                elegivel: 0,
                time: timePadrao
            }
    
            const schema = yup.object().shape({
                steamId: yup.string().required(),
                nick: yup.string().required(),
                senha: yup.string().required(),
                classes: yup.array(),
                avatar: yup.string(),
                acesso: yup.number(),
                elegivel: yup.number(),
                time: yup.object().required()
            })
    
            await schema.validate(data, {
                abortEarly: true,
            })
    
            const usuario = usuarioRepository.create(data);
    
            await usuarioRepository.save(usuario);
    
            return res.status(201).send('O usuário foi cadastrado com sucesso!');
        }
    },

    async update(req: Request, res: Response) {

        const { steamId } = req.params;

        const {
            nick,
            acesso,
            avatar,
            classes,
            elegivel
        } = req.body;

        const usuarioRepository = getRepository(Usuario);
        const classeRepository = getRepository(Classe);

        const usuario = await usuarioRepository.findOneOrFail( steamId, {
            where: { steamId: Not('0') },
            relations: ['time', 'classes', 'posts']
        });

        const classesAtualizadas: Array<Classe> = [];

        if(classes) {
            for (const i in classes) {
                if (Object.prototype.hasOwnProperty.call(classes, i)) {    
                    classesAtualizadas.push( await classeRepository.findOneOrFail(Number(classes[i])))
                }
            }
        }

        let newAvatar = usuario.avatar;
        const requestImages = req.files as Express.Multer.File[];
        if(avatar == ''){
            newAvatar = '';
        }
        if(requestImages.length !== 0){
            newAvatar = requestImages[0].filename;
        }

        const data = {
            steamId,
            nick: nick || usuario.nick,
            senha: usuario.senha,
            acesso: acesso || usuario.acesso,
            avatar: newAvatar,
            classes: classesAtualizadas.length == 0 ? usuario.classes : classesAtualizadas,
            elegivel: elegivel == '' ? usuario.elegivel : elegivel,
            time: usuario.time
        }

        const schema = yup.object().shape({
            steamId: yup.string().required(),
            nick: yup.string().required(),
            senha: yup.string().required(),
            classes: yup.array(),
            avatar: yup.string(),
            acesso: yup.number(),
            elegivel: yup.number(),
            time: yup.object().required(),
        });

        await schema.validate(data, {
            abortEarly: true,
        });

        const newUsuario = usuarioRepository.create(data);

        await usuarioRepository.save(newUsuario);

        return res.status(201).send('O usuário foi alterado com sucesso!');
    },

    async delete(req: Request, res: Response) {

        const { steamId } = req.params;

        const usuarioRepository = getRepository(Usuario);

        const usuario = await usuarioRepository.findOneOrFail( steamId, {
            where: { steamId: Not('0') },
        });

        await usuarioRepository.remove(usuario);

        return res.status(200).send('O usuário foi excluído com sucesso!');
    },

    async login(req: Request, res: Response) {

        const nick = req.body.nick || '';
        const senha = req.body.senha || '';

        const usuarioRepository = getRepository(Usuario);

        await usuarioRepository.findOneOrFail( nick, {
            relations: [ 'time', 'posts', 'classes' ]
        }).then(usuario => {
            if(usuario){
                if(senha != usuario.senha){
                    return res.status(400).send({ errors: 'Senha incorreta!'});
                }
                return res.status(200).json(UsuarioView.render(usuario));
            }
        }).catch(() => {
            return res.status(400).send({ errors: "Não foi possível realizar o login!"});
        })
    }
}