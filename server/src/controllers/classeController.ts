import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import * as yup from 'yup';

import Classe from '../models/classe';

export default {

    async create(req: Request, res: Response){

        const {
            nome
        } = req.body

        const classeRepository = getRepository(Classe);

        const data = { 
            nome 
        };

        const schema = yup.object().shape({
            nome: yup.string().required()
        });

        await schema.validate(data, {
            abortEarly: false
        });

        const classe = classeRepository.create(data);

        await classeRepository.save(classe);

        return res.status(201).json(classe);

    }
}