import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import * as yup from 'yup';

import Post from '../models/post';
import Usuario from '../models/usuario';

export default {

    async index(req: Request, res: Response) {

        const postRepository = getRepository(Post);

        const posts = await postRepository.find({
            relations: ['imagens']
        });

        return res.status(200).json(posts);
    },

    async show(req: Request, res: Response) {

        const { id } = req.params;

        const postRepository = getRepository(Post);

        const post = await postRepository.findOneOrFail( id , {
            relations: ['imagens']
        });

        return res.status(200).json(post);
    },

    async create(req: Request, res: Response){
        const {
            autorId,
            titulo,
            conteudo
        } = req.body;

        const postRepository = getRepository(Post);
        const usuarioRepository = getRepository(Usuario);

        const autor = await usuarioRepository.findOneOrFail( autorId );

        const requestImages = req.files as Express.Multer.File[];
        const imagens = requestImages.map(image => {
            return {
                path: image.filename
            }
        })

        const data = {
            autor,
            titulo,
            conteudo,
            imagens
        }

        const schema = yup.object().shape({
            autor: yup.object().required(),
            titulo: yup.string().required(),
            conteudo: yup.string().required(),
            imagens: yup.array()
        })

        await schema.validate(data, {
            abortEarly: false,
        })

        const post = postRepository.create(data);

        await postRepository.save(post);

        return res.status(201).json(post);
    }
}