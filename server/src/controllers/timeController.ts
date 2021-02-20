import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
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

    async create(req: Request, res: Response){
        const {
            liderId,
            nome,
            divisaoId,
        } = req.body;

        const timeRepository = getRepository(Time);
        const usuarioRepository = getRepository(Usuario);
        const divisaoRepository = getRepository(Divisao);

        const lider = await usuarioRepository.findOneOrFail( liderId );
        const divisao = await divisaoRepository.findOneOrFail( divisaoId );

        const jogadores = [ lider ];

        const requestImages = req.files as Express.Multer.File[];
        const logo = requestImages[0].filename;

        const data = {
            lider,
            nome,
            divisao,
            logo,
            jogadores
        }

        const schema = yup.object().shape({
            lider: yup.object().required(),
            nome: yup.string().required(),
            divisao: yup.object(),
            logo: yup.string(),
            jogadores: yup.array().required()
        })

        await schema.validate(data, {
            abortEarly: false,
        })

        const time = timeRepository.create(data);

        await timeRepository.save(time);

        return res.status(201).json(time);
    }
}