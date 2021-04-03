import { Request, Response } from 'express';
import { getRepository, Like } from 'typeorm';
import * as yup from 'yup';

import Time from '../models/time';
import Usuario from '../models/usuario';
import Divisao from '../models/divisao';
import TimeView from '../views/timeView';

export default {

    async index(req: Request, res: Response) {

        const timeRepository = getRepository(Time);

        const times = await timeRepository.find({
            relations: ['lider', 'divisao', 'jogadores']
        });

        return res.status(200).json(TimeView.renderMany(times));
    },

    async show(req: Request, res: Response) {

        const { id } = req.params;

        const timeRepository = getRepository(Time);

        const time = await timeRepository.findOneOrFail( id , {
            relations: ['lider', 'divisao', 'jogadores']
        });

        return res.status(200).json(TimeView.render(time));
    },

    async showMany(req: Request, res: Response) {

        const { nome } = req.params;

        const timeRepository = getRepository(Time);

        const time = await timeRepository.find({
            where: { nome: Like(`${nome}%`) },
            relations: ['lider', 'divisao', 'jogadores']
        });

        return res.status(200).json(TimeView.renderMany(time));
    },

    async create(req: Request, res: Response){
        const {
            liderId,
            nome,
        } = req.body;

        const timeRepository = getRepository(Time);
        const usuarioRepository = getRepository(Usuario);

        const lider = await usuarioRepository.findOneOrFail( liderId, {
            relations: ['time']
        } );

        if(lider.time) {
            return res.status(500).send('O jogador já está como lider de um time e por isso não pode cadastrar outro time.');
        }

        const jogadores = [ lider ];

        const requestImages = req.files as Express.Multer.File[];
        const logo = requestImages[0].filename;

        const data = {
            lider,
            nome,
            logo,
            jogadores
        }

        const schema = yup.object().shape({
            lider: yup.object().required(),
            nome: yup.string().required(),
            logo: yup.string(),
            jogadores: yup.array().required()
        })

        await schema.validate(data, {
            abortEarly: true,
        })

        const time = timeRepository.create(data);

        await timeRepository.save(time);

        return res.status(201).json(time);
    },

    async update(req: Request, res: Response) {

        const { id } = req.params;

        const {
            liderId,
            nome,
            divisaoId,
            jogador
        } = req.body;

        const timeRepository = getRepository(Time);    
        const usuarioRepository = getRepository(Usuario);
        const divisaoRepository = getRepository(Divisao);

        const time = await timeRepository.findOneOrFail( id, {
            relations: ['lider', 'divisao', 'jogadores']
        })

        let lider = time.lider;
        let divisao = time.divisao;
        let jogadores = time.jogadores;

        if( liderId !== undefined ) {
            lider = await usuarioRepository.findOneOrFail( liderId );
            if(lider.time) {
                return res.status(500).send('O jogador já está como lider de um time e por isso não pode cadastrar outro time.');
            }
        }

        if(divisaoId !== undefined) {
            divisao = await divisaoRepository.findOneOrFail( divisaoId );
        }

        if(jogador.length !== undefined){
            jogadores.concat(jogador);
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
                jogadores
            }

        const schema = yup.object().shape({
            id: yup.number().required(),
            lider: yup.object().required(),
            nome: yup.string().required(),
            divisao: yup.object(),
            logo: yup.string(),
            jogadores: yup.array().required()
        });

        await schema.validate(data, {
            abortEarly: true,
        });

        const newTime = timeRepository.create(data);

        await timeRepository.save(newTime);

        return res.status(201).json(newTime);
    },

    async delete(req: Request, res: Response) {

        const { id } = req.params;

        const timeRepository = getRepository(Time);

        const time = await timeRepository.findOneOrFail(id);

        await timeRepository.remove(time);

        return res.status(200).json(time);
    }
}