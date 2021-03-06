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

        try {
            const times = await timeRepository.find({
                where: { id: Not(1) },
                relations: ['lider', 'viceLider', 'divisao', 'jogadores']
            });
    
            return res.status(200).json(TimeView.renderMany(times));
        } catch {
            return res.status(400).send("Nenhum time foi encontrado!");
        }


    },

    async show(req: Request, res: Response) {

        const { id } = req.params;

        const timeRepository = getRepository(Time);

        try {
            const time = await timeRepository.findOneOrFail( id , {
                where: { id: Not(1) },
                relations: ['lider', 'viceLider', 'divisao', 'jogadores']
            });
    
            return res.status(200).json(TimeView.render(time));
        } catch {
            return res.status(400).send("Time não encontrado!");
        }


    },

    async showMany(req: Request, res: Response) {

        const { nome } = req.params;

        const timeRepository = getRepository(Time);

        const time = await timeRepository.find({
            where: { id: Not(1), nome: Like(`${nome}%`) },
            relations: ['lider', 'viceLider', 'divisao', 'jogadores']
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

            try {
                const lider = await usuarioRepository.findOneOrFail( liderId, {
                    where: { id: Not(1) },
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
            } catch {
                return res.status(400).send("Não foi possível realizar o cadastro!");
            }
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

        try{
            const time = await timeRepository.findOneOrFail( id, {
                where: { id: Not(1) },
                relations: [ 'lider', 'divisao', 'jogadores']
            })

            let { lider, viceLider, divisao, jogadores, ativo } = time

            if(ativo){
                return res.status(400).send("O time já está participando ativamente de um campeonato, por isso não poder sofrer alterações!");
            }

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
                viceLider,
                nome,
                divisao,
                logo,
                ativo: false,
                jogadores
            }

            const schema = yup.object().shape({
                id: yup.number().required(),
                lider: yup.object().required(),
                viceLider: yup.object(),
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
        } catch {
            return res.status(400).send("Não foi possível realizar a alteração!");
        }
    },

    async delete(req: Request, res: Response) {

        const { id } = req.params;

        const timeRepository = getRepository(Time);
        const usuarioRepository = getRepository(Usuario);

        try {

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
                        id: jogador.id,
                        nick: jogador.nick,
                        steamId: jogador.steamId,
                        senha: jogador.senha,
                        classes: jogador.classes,
                        avatar: jogador.avatar,
                        acesso: jogador.acesso,
                        elegivel: jogador.elegivel,
                        time: timePadrao,
                        posts: jogador.posts,
                        atividades: jogador.atividades
                    }

                    try {
                        const newJogador = usuarioRepository.create(dataJogador);

                        await usuarioRepository.save(newJogador);
                    } catch {
                        return res.status(400).send("Ocorreu um erro ao realizar a exclusão!");
                    }
                }
            }

            await timeRepository.remove(time);

            return res.status(200).json(TimeView.render(time));
        } catch {
            return res.status(400).send("Não foi possível realizar a exclusão!");
        }
    },

    async passingLeadership(req: Request, res: Response) {

        const { id, jogadorId } = req.params;

        const timeRepository = getRepository(Time);
        const jogadorRepository = getRepository(Usuario);

        try {
            const time = await timeRepository.findOneOrFail( id, {
                where: { id: Not(1) },
                relations: ['lider', 'viceLider', 'divisao', 'jogadores']
            });

            const novoLider = await jogadorRepository.findOneOrFail( jogadorId, {
                where: { id: Not(1) },
                relations: ['time', 'classes', 'posts', 'atividades']
            });

            if(novoLider.time.id != time.id){
                return res.status(400).send("O jogador não faz parte do time!");
            }

            const { lider, viceLider, nome, divisao, logo, ativo, jogadores } = time;

            if(viceLider == undefined){
                return res.status(400).send("Número insuficiente de jogadores no time!");
            }

            let data;

            if(novoLider.id == viceLider.id) {
                data = {
                    id: Number(id),
                    lider: novoLider,
                    viceLider: lider,
                    nome,
                    divisao,
                    logo,
                    ativo,
                    jogadores
                }
            } else {
                data = {
                    id: Number(id),
                    lider: novoLider,
                    viceLider,
                    nome,
                    divisao,
                    logo,
                    ativo,
                    jogadores
                }
            }

            const schema = yup.object().shape({
                id: yup.number().required(),
                lider: yup.object().required(),
                viceLider: yup.object(),
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

            return res.status(200).json(TimeView.render(newTime))

        } catch {
            return res.status(400).send("Erro ao passar a liderança!");
        }
    }
}