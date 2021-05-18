import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import * as yup from 'yup';

import Classe from '../models/classe';
import ClasseView from '../views/classeView';

export default {

    async index(req: Request, res: Response) {

        const classeRepository = getRepository(Classe);

        try{
            const classes = await classeRepository.find();

            return res.status(200).json(ClasseView.renderMany(classes));
        } catch {
            return res.status(400).send("Nenhuma classe foi encontrada!");
        }
        
    },

    async show(req: Request, res: Response) {

        const { id } = req.params;

        const classeRepository = getRepository(Classe);

        try {
            const classe = await classeRepository.findOneOrFail( id );

            return res.status(200).json(ClasseView.render(classe));
        } catch {
            res.status(400).send("Classe não encontrada!");
        }
    },

    async create(req: Request, res: Response){

        const {
            nome
        } = req.body

        const classeRepository = getRepository(Classe);

        try {
            await classeRepository.findOneOrFail({
                where: { nome }
            })

            return res.status(400).send("Já existe uma classe com este nome!");
        } catch {
            const data = { 
                nome 
            };
    
            const schema = yup.object().shape({
                nome: yup.string().required()
            });
    
            await schema.validate(data, {
                abortEarly: true
            });
    
            try{
                const classe = classeRepository.create(data);
    
                await classeRepository.save(classe);
        
                return res.status(201).send("Classe criada com sucesso!");
            } catch {
                return res.status(400).send("Não foi possível realizar o cadastro!");
            }
        }
    }
}