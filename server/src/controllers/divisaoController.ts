import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import * as yup from 'yup';

import Divisao from '../models/divisao';
import DivisaoView from '../views/divisaoView';

export default {

    async index(req: Request, res: Response) {

        const divisaoRepository = getRepository(Divisao);

        try {
            const divisoes = await divisaoRepository.find({
                relations: ['partidas', 'times']
            });
    
            return res.status(200).json(DivisaoView.renderMany(divisoes));
        } catch {
            return res.status(400).send("Nenhuma divisão foi encontrada!");
        }
    },

    async show(req: Request, res: Response) {

        const { id } = req.params;

        const divisaoRepository = getRepository(Divisao);

        try {
            const divisao = await divisaoRepository.findOneOrFail( id , {
                relations: ['partidas', 'times']
            });
    
            return res.status(200).json(DivisaoView.render(divisao));
        } catch {
            return res.status(400).send("Divisão não encontrada!");
        }
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
            abortEarly: true,
        })

        try {
            const divisao = divisaoRepository.create(data);

            await divisaoRepository.save(divisao);
    
            return res.status(201).send("Divisão criada com sucesso!");
        } catch {
            return res.status(400).send("Não foi possível realizar o cadastro!");
        }
    }
}