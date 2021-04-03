import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import * as yup from 'yup';

import Partida from '../models/partida';
import Time from '../models/time';
import Divisao from '../models/divisao';
import PartidaView from '../views/partidaView';

export default {

    async index(req: Request, res: Response) {

        const partidaRepository = getRepository(Partida);

        const partidas = await partidaRepository.find({
            relations: ['time1', 'time2', 'divisao']
        });

        return res.status(200).json(PartidaView.renderMany(partidas));
    },

    async show(req: Request, res: Response) {

        const { id } = req.params;

        const partidaRepository = getRepository(Partida);

        const partida = await partidaRepository.findOneOrFail( id , {
            relations: ['time1', 'time2', 'divisao']
        });

        return res.status(200).json(PartidaView.render(partida));
    },

    async create(req: Request, res: Response){
        const {
            timeId1,
            timeId2,
            divisaoId,
            dataHora
        } = req.body;

        const partidaRepository = getRepository(Partida);
        const timeRepository = getRepository(Time);
        const divisaoRepository = getRepository(Divisao);

        const time1 = await timeRepository.findOneOrFail(timeId1);
        const time2 = await timeRepository.findOneOrFail(timeId2);
        const divisao = await divisaoRepository.findOneOrFail(divisaoId);


        const data = {
            time1,
            time2,
            divisao,
            dataHora
        }

        const schema = yup.object().shape({
            time1: yup.object().required(),
            time2: yup.object().required(),
            divisao: yup.object().required(),
            dataHora: yup.string().required()
        })

        await schema.validate(data, {
            abortEarly: true,
        })

        const partida = partidaRepository.create(data);

        await partidaRepository.save(partida);

        return res.status(201).json(partida);
    }
}