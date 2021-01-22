import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import * as yup from 'yup';

import Divisao from '../models/divisao';

export default {

    async index(req: Request, res: Response) {

        const divisaoRepository = getRepository(Divisao);

        const divisoes = await divisaoRepository.find();

        return res.status(200).json(divisoes);
    },

    async show(req: Request, res: Response) {

        const { id } = req.params;

        const divisaoRepository = getRepository(Divisao);

        const divisao = await divisaoRepository.findOneOrFail( id );

        return res.status(200).json(divisao);
    },

    async create(req: Request, res: Response){
        const {
            nome
        } = req.body;

        const divisaoRepository = getRepository(Divisao);


        const data = {
            nome
        }

        const schema = yup.object().shape({
            nome: yup.string().required()
        })

        await schema.validate(data, {
            abortEarly: false,
        })

        const divisao = divisaoRepository.create(data);

        await divisaoRepository.save(divisao);

        return res.status(201).json(divisao);
    }
}