import { Request, Response } from 'express';
import { getRepository, Like } from 'typeorm';
import * as yup from 'yup';
import Imagens from '../models/imagens';

import Post from '../models/post';
import Usuario from '../models/usuario';
import PostView from '../views/postView';

export default {

    async index(req: Request, res: Response) {

        const postRepository = getRepository(Post);

        const posts = await postRepository.find({
            relations: ['imagens', 'autor']
        });

        return res.status(200).json(PostView.renderMany(posts));
    },

    async show(req: Request, res: Response) {

        const { id } = req.params;

        const postRepository = getRepository(Post);

        const post = await postRepository.findOneOrFail( id , {
            relations: ['imagens', 'autor']
        });

        return res.status(200).json(PostView.render(post));
    },

    async showMany(req: Request, res: Response) {

        const { titulo } = req.params;

        const postRepository = getRepository(Post);

        const post = await postRepository.find({
            where: { titulo: Like(`${titulo}%`)},
            relations: ['imagens', 'autor']
        });

        return res.status(200).json(PostView.renderMany(post));
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
            abortEarly: true,
        })

        const post = postRepository.create(data);

        await postRepository.save(post);

        return res.status(201).send('O post foi criado com sucesso!');
    },

    async update(req: Request, res: Response) {

        const { id } = req.params;

        const {
            titulo,
            conteudo,
        } = req.body;

        const postRepository = getRepository(Post);
        const imagesRepository = getRepository(Imagens);

        const post = await postRepository.findOneOrFail( id, {
            relations: ['imagens', 'autor']
        });

        post.imagens.forEach(async image => {
            const oldImage = await imagesRepository.findOneOrFail(image.id);
            imagesRepository.delete(oldImage);
        })

        const requestImages = req.files as Express.Multer.File[];
        const imagens = requestImages.map(image => {
            return {
                path: image.filename
            }
        })

        const data = {
            id: Number(id),
            autor: post.autor,
            titulo: titulo === "" ? post.titulo : titulo,
            conteudo: conteudo === "" ? post.conteudo : conteudo,
            imagens
        }

        const schema = yup.object().shape({
            id: yup.number().required(),
            autor: yup.object().required(),
            titulo: yup.string().required(),
            conteudo: yup.string().required(),
            imagens: yup.array()
        })

        await schema.validate(data, {
            abortEarly: true,
        })

        const newPost = postRepository.create(data);

        await postRepository.save(newPost);

        return res.status(201).send('O post foi alterado com sucesso!');
    },

    async delete(req: Request, res: Response) {

        const { id } = req.params;

        const postRepository = getRepository(Post);

        const post = await postRepository.findOneOrFail( id );

        await postRepository.remove(post);

        return res.status(200).send("Post excluído com sucesso!");

    }
}