import { Request, Response } from 'express';
import { getRepository, Like, Not } from 'typeorm';
import * as yup from 'yup';

import Time from '../models/time';
import Usuario from '../models/usuario';
import Divisao from '../models/divisao';
import TimeView from '../views/timeView';

export default {

    async index(req: Request, res: Response) {

        const timeRepository = getRepository(Time);

        const times = await timeRepository.find({
            where: { id: Not(1) },
            relations: ['lider', 'divisao', 'jogadores']
        });

        return res.status(200).json(TimeView.renderMany(times));
    },

    async show(req: Request, res: Response) {

        const { id } = req.params;

        const timeRepository = getRepository(Time);

        const time = await timeRepository.findOneOrFail( id , {
            where: { id: Not(1) },
            relations: ['lider', 'divisao', 'jogadores']
        });

        return res.status(200).json(TimeView.render(time));
    },

    async showMany(req: Request, res: Response) {

        const { nome } = req.params;

        const timeRepository = getRepository(Time);

        const time = await timeRepository.find({
            where: { id: Not(1), nome: Like(`${nome}%`) },
            relations: ['lider', 'divisao', 'jogadores']
        });

        return res.status(200).json(TimeView.renderMany(time));
    },

    async create(req: Request, res: Response){
        const {
            liderId,
            nome,
            jogadoresIds
        } = req.body;

        const timeRepository = getRepository(Time);
        const usuarioRepository = getRepository(Usuario);
        const divisaoRepository = getRepository(Divisao);
        const jogadores = []

        try {
            await timeRepository.findOneOrFail({
                where: { nome: nome }
            })

            return res.status(400).send("Já existe um time cadastrado no sistema com esse nome, para realizar o cadastro, escolha outro nome e realize um novo envio!");
        } catch {

            const divisao = await divisaoRepository.findOneOrFail(1);

            const lider = await usuarioRepository.findOneOrFail( liderId, {
                relations: ['time']
            } );
    
            if(lider.time && lider.time.id !== 1) {
                return res.status(500).send('O jogador já está participando de outro, time e por isso não pode cadastrar outro time.');
            }
    
            jogadores.push(lider);

            if(jogadoresIds && jogadoresIds === []) {
                for (const i in jogadoresIds) {
                    if (Object.prototype.hasOwnProperty.call(jogadoresIds, i)) {  
                        jogadores.push( await usuarioRepository.findOneOrFail(jogadoresIds[i]));
                    }
                }
            } else if(jogadoresIds) {
                jogadores.push( await usuarioRepository.findOneOrFail(jogadoresIds))
            }
    
            const requestImages = req.files as Express.Multer.File[];
            let logo = '';
            if(requestImages.length > 0){
                logo = requestImages[0].filename;
            }
    
            const data = {
                lider,
                nome,
                divisao,
                logo,
                ativo: false,
                jogadores
            }
    
            const schema = yup.object().shape({
                lider: yup.object().required(),
                nome: yup.string().required(),
                divisao: yup.object().required(),
                logo: yup.string(),
                ativo: yup.boolean().required(),
                jogadores: yup.array().required()
            })
    
            await schema.validate(data, {
                abortEarly: true,
            })
    
            const time = timeRepository.create(data);
    
            await timeRepository.save(time);
    
            return res.status(201).send('O time foi criado com sucesso!');
        }

    },

    async update(req: Request, res: Response) {

        const { id } = req.params;

        const {
            nome,
            divisaoId,
            jogadoresIds,
        } = req.body;

        const usuarioRepository = getRepository(Usuario);
        const timeRepository = getRepository(Time);    
        const divisaoRepository = getRepository(Divisao);

        const time = await timeRepository.findOneOrFail( id, {
            where: { id: Not(1) },
            relations: [ 'lider', 'divisao', 'jogadores']
        })

        if(time.ativo){
            return res.status(400).send("O time já está participando ativamente de um campeonato, por isso não poder sofrer alterações!");
        }

        let lider = time.lider;
        let divisao = time.divisao;
        let jogadores = time.jogadores;

        if(divisaoId && divisaoId !== time.divisao.id ) {
            divisao = await divisaoRepository.findOneOrFail( divisaoId );
        } else if(divisaoId === '' && time.divisao.id !== 1){
            divisao = await divisaoRepository.findOneOrFail(1);
        }

        if(jogadoresIds == []){
            jogadoresIds.forEach( async (jogador: Usuario) => {
                jogadores.push(await usuarioRepository.findOneOrFail(jogador));
            })
        } else if(jogadoresIds) {
            jogadores.push(await usuarioRepository.findOneOrFail(jogadoresIds));
        }
        
        const requestImages = req.files as Express.Multer.File[];
        let logo = time.logo;
        if(requestImages.length !== 0) {
            logo = requestImages[0].filename;
        }
        
        const data = {
                id: Number(id),
                lider,
                nome,
                divisao,
                logo,
                ativo: false,
                jogadores
            }

        const schema = yup.object().shape({
            id: yup.number().required(),
            lider: yup.object().required(),
            nome: yup.string().required(),
            divisao: yup.object().required(),
            logo: yup.string(),
            ativo: yup.boolean().required(),
            jogadores: yup.array().required()
        });

        await schema.validate(data, {
            abortEarly: true,
        });

        const newTime = timeRepository.create(data);

        await timeRepository.save(newTime);

        return res.status(201).send('O time foi alterado com sucesso!');
    },

    async delete(req: Request, res: Response) {

        const { id } = req.params;

        const timeRepository = getRepository(Time);
        const usuarioRepository = getRepository(Usuario);

        const time = await timeRepository.findOneOrFail(id, {
            where: { id: Not(1) },
            relations: ['jogadores']
        });

        if(time.ativo){
            return res.status(400).send("O time já está participando ativamente de um campeonato, por isso não poder sofrer alterações!");
        }

        const timePadrao = await timeRepository.findOneOrFail(1);

        for (const i in time.jogadores) {
            if (Object.prototype.hasOwnProperty.call(time.jogadores, i)) {
                const jogador =  await usuarioRepository.findOneOrFail(time.jogadores[i].steamId, {
                    relations: ['time']
                })

                const dataJogador: Usuario = {
                    steamId: jogador.steamId,
                    nick: jogador.nick,
                    senha: jogador.senha,
                    classes: jogador.classes,
                    avatar: jogador.avatar,
                    acesso: jogador.acesso,
                    elegivel: jogador.elegivel,
                    time: timePadrao,
                    posts: jogador.posts
                }

                const newJogador = usuarioRepository.create(dataJogador);

                await usuarioRepository.save(newJogador);
            }
        }

        await timeRepository.remove(time);

        return res.status(200).json(TimeView.render(time));
    },

    async addPlayer(req: Request, res: Response) {
        const { id, steamId } = req.params;
        
        const timeRepository = getRepository(Time);
        const usuarioRepository = getRepository(Usuario);

        const time = await timeRepository.findOneOrFail(id, {
            where: { id: Not(1) },
            relations: ['lider', 'jogadores', 'divisao']
        });

        const jogador = await usuarioRepository.findOneOrFail(steamId, {
            relations: ['time', 'classes']
        });

        const { nick, senha, classes, avatar, acesso, elegivel } = jogador;

        const dataJogador = {
            steamId,
            nick,
            senha,
            classes,
            avatar,
            acesso,
            time,
            elegivel,
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

        await schema.validate(dataJogador, {
            abortEarly: true,
        });

        const newUsuario = usuarioRepository.create(dataJogador);

        await usuarioRepository.save(newUsuario);

        const timeAtualizado = await timeRepository.findOneOrFail(id, {
            where: { id: Not(1) },
            relations: ['lider', 'jogadores', 'divisao']
        });

        return res.status(201).json(TimeView.render(timeAtualizado));
    },

    async removePlayer(req: Request, res: Response) {

        const { steamId, id } = req.params;

        const timeRepository = getRepository(Time);
        const usuarioRepository = getRepository(Usuario);

        const timePadrao = await timeRepository.findOneOrFail(1);

        const time = await timeRepository.findOneOrFail(id, {
            where: { id: Not(1) },
            relations: ['lider']
        });

        const usuario = await usuarioRepository.findOneOrFail(steamId, {
            where: { steamId: Not(0)},
            relations: ['time', 'classes']
        });

        if(usuario.steamId == time.lider.steamId){
            return res.status(500).send('O lider não pode ser excluído do time!');
        }

        const { nick, senha, classes, avatar, acesso, elegivel } = usuario;

        const data = {
            steamId,
            nick,
            senha,
            classes,
            avatar,
            acesso,
            time: timePadrao,
            elegivel
        };

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

        const timeAtualizado = await timeRepository.findOneOrFail(id, {
            where: { id: Not(1) },
            relations: ['lider', 'jogadores', 'divisao']
        });

        return res.status(200).json(TimeView.render(timeAtualizado));
    }
}